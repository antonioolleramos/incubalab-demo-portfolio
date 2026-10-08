const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.resolve(__dirname, '..');
const js = fs.readFileSync(path.join(root, 'app.js'), 'utf8');
const ts = fs.readFileSync(path.join(root, 'src/app.ts'), 'utf8');

function boot() {
  const handlers = {};
  const store = new Map();
  const app = { innerHTML: '' };
  const body = { appended:[], appendChild(x){this.appended.push(x)} };
  const notices = [];
  const elements = { app };
  const document = {
    activeElement: null,
    body,
    addEventListener: (type, cb) => { handlers[type] = cb },
    getElementById: (id) => elements[id] || null,
    createElement: (tag) => {
      const elem = {
        tag, style: {}, innerHTML: '', setAttribute() {},
        appendChild() {}, remove() {}, click() { notices.push({clicked:tag,href:this.href,download:this.download}) },
        querySelector(){return null}
      };
      return elem;
    }
  };
  const location = {hash:''};
  const window = {addEventListener:()=>{},scrollTo:()=>{},print:()=>{notices.push('printed')}};
  const localStorage = {getItem:k=>store.get(k)||null,setItem:(k,v)=>store.set(k,v)};
  const FormData = function(form){return {get:(n)=>form.values[n],has:(n)=>Boolean(form.values[n])}};
  const context = vm.createContext({document,window,localStorage,location,FormData,Blob,URL:{createObjectURL:()=> 'blob:dummy',revokeObjectURL:()=>{}},setTimeout:()=>0,clearTimeout:()=>{},structuredClone,Intl,Date,Number,Math,Array,Set,String,JSON,console,confirm:()=>true});
  vm.runInContext(js,context,{filename:'app.js'});
  return {context,handlers,app,store,notices};
}
function run(x, js){return vm.runInContext(js,x.context)}

test('compilado inicia o dashboard sem dependência de rede',()=>{
  const x=boot();
  assert.match(x.app.innerHTML, /IncubaLab/);
  assert.match(x.app.innerHTML, /Empresas cadastradas/);
  assert.equal(run(x,'data.companies.length'), 10);
  assert.equal(run(x,'data.events.length'), 4);
});

test('navegação e filtro de empresas são renderizados',()=>{
  const x=boot(); run(x,'goto("empresas")');
  assert.match(x.app.innerHTML, /Verde Orbital/);
  assert.match(x.app.innerHTML, /Nexo Farol/);
  x.handlers.input({target:{id:'company-search',value:'Verde'}});
  assert.match(x.app.innerHTML, /Verde Orbital/);
  assert.doesNotMatch(x.app.innerHTML, /Nexo Farol/);
});

test('cadastro, edição e exclusão fictícios funcionam',()=>{
  const x=boot();run(x,'goto("empresas")');
  const submit=(values)=>x.handlers.submit({target:{id:'company-form',values},preventDefault(){}});
  submit({name:'Empresa Teste',sector:'Tecnologia',stage:'Incubada',since:'2026-10',deepTech:'on'});
  assert.equal(run(x,'data.companies.length'),11);
  assert.match(x.app.innerHTML,/Empresa Teste/);
  const newId=run(x,'data.companies.at(-1).id');
  run(x,`editingCompanyId=${newId}`);
  submit({name:'Empresa Atualizada',sector:'Saúde',stage:'Pré-incubada',since:'2026-08'});
  assert.match(x.app.innerHTML,/Empresa Atualizada/);
  assert.equal(run(x,'data.companies.length'),11);
  x.handlers.click({target:{closest:()=>({dataset:{action:'delete-company',id:String(newId)}})}});
  assert.equal(run(x,'data.companies.length'),10);
});

test('entrada HTML não é interpretada como marcação no nome da empresa',()=>{
  const x=boot();run(x,'goto("empresas")');
  x.handlers.submit({target:{id:'company-form',values:{name:'<img src=x onerror=alert(1)>',sector:'Tecnologia',stage:'Incubada',since:'2026-10'}},preventDefault(){}});
  assert.match(x.app.innerHTML,/&lt;img/);
  assert.doesNotMatch(x.app.innerHTML,/<img src=x onerror/);
});

test('inscrição em programa é somente local e não duplica',()=>{
  const x=boot();run(x,'goto("programas")');
  const click = {target: {closest: () => ({dataset: {action:'join-program',id:'2'}})}};
  x.handlers.click(click); x.handlers.click(click);
  assert.equal(run(x,'data.signedPrograms.length'),1);
});

test('eventos podem ser cadastrados com dados fictícios',()=>{
  const x=boot();run(x,'goto("eventos")');
  x.handlers.submit({target:{id:'event-form',values:{name:'Evento Novo',date:'2026-12-11',category:'Workshop',audience:'55'}},preventDefault(){}});
  assert.match(x.app.innerHTML,/Evento Novo/);
  assert.equal(run(x,'data.events.length'),5);
});

test('exportação CSV gera download local, sem chamada de API',()=>{
  const x=boot();run(x,'exportCSV("companies")');
  assert.equal(x.notices.find(i=>typeof i==='object'&&i.clicked==='a').download,'empresas-ficticias.csv');
  assert.match(run(x,"safeCSV('=2+2')"),/^"'/);
});

test('limpar os dados restaura a amostra padrão',()=>{
  const x=boot();run(x,'data.companies.pop(); saveData();');
  assert.equal(run(x,'data.companies.length'),9);
  run(x,'data=structuredClone(INITIAL); saveData(); render();');
  assert.equal(run(x,'data.companies.length'),10);
});

test('não há URLs externas, código de produção ou APIs de rede no código executável',()=>{
  const code=(ts+'\n'+js).replaceAll('http://www.w3.org/2000/svg',''); // namespace XML/SVG, não é rede
  for(const forbidden of [/https?:\/\//i,/postgresql:\/\//i,/\bfetch\s*\(/i,/XMLHttpRequest/i,/WebSocket\s*\(/i,/process\.env\./i,/neon\.tech/i,/onrender\.com/i,/innovatio\./i,/prisma\.\w+\(/i]){
    assert.equal(forbidden.test(code), false, `Encontrado marcador proibido: ${forbidden}`);
  }
  const html=fs.readFileSync(path.join(root,'index.html'),'utf8');
  assert.match(html, /src="app.js"/);
  assert.match(html, /href="styles.css"/);
  assert.equal(/https?:\/\//i.test(html), false);
});

test('os seis módulos adicionais renderizam formulários e listas sem backend',()=>{
 const x=boot();
 for(const [view,key,title] of [
  ['preincubacao','pre','Pré-incubação'],['maturidade','maturity','Maturidade empresarial'],
  ['editais','notices','Eventos e editais'],['hackathons','hackathons','Hackathons'],
  ['taxas','fees','Taxas de incubação'],['mai','mai','Programa MAI-DAI']]){
  run(x,`goto('${view}')`);
  assert.match(x.app.innerHTML,new RegExp(title));
  assert.match(x.app.innerHTML,/Novo registro/);
  assert.equal(run(x,`extended.records.${key}.length`)>0,true);
 }
});

test('cadastro, edição e exclusão dos seis novos módulos atualizam o armazenamento local',()=>{
 for(const key of ['pre','maturity','notices','hackathons','fees','mai']){
  const x=boot();
  const sample=run(x,`structuredClone(extended.records.${key}[0])`);
  const len=run(x,`extended.records.${key}.length`);
  const {id,...fields}=sample;
  // FormData do teste retorna os mesmos campos que o formulário geraria.
  const values=Object.fromEntries(Object.entries(fields).map(([k,v])=>[k,String(v)]));
  values[Object.keys(values)[0]] = key==='maturity' ? 'Empresa Nova' : 'Registro Novo';
  run(x,`editingRecordKey='${key}';editingRecordId=null`);
  x.handlers.submit({target:{id:'record-form',values},preventDefault(){}});
  assert.equal(run(x,`extended.records.${key}.length`),len+1,key);
  const newid=run(x,`extended.records.${key}.at(-1).id`);
  assert.equal(x.store.has('incubalab-public-portfolio-extended-v2'),true);
  assert.equal(run(x,'extended.activity[0].action'),'Registro incluído');
  values[Object.keys(values)[0]] = key==='maturity' ? 'Empresa Editada' : 'Registro Editado';
  run(x,`editingRecordKey='${key}';editingRecordId=${newid}`);
  x.handlers.submit({target:{id:'record-form',values},preventDefault(){}});
  assert.equal(run(x,`extended.records.${key}.length`),len+1,key);
  run(x,`view=${JSON.stringify({pre:'preincubacao',maturity:'maturidade',notices:'editais',hackathons:'hackathons',fees:'taxas',mai:'mai'}[key])}`);
  x.handlers.click({target:{closest:()=>({dataset:{action:'delete-record',id:String(newid)}})}});
  assert.equal(run(x,`extended.records.${key}.length`),len,key);
 }
});

test('pesquisa e filtros nos novos módulos alteram os registros visíveis',()=>{
 const x=boot();run(x,'goto("preincubacao")');
 assert.match(x.app.innerHTML,/Plataforma de educação oceânica/);
 x.handlers.input({target:{id:'register-search',value:'Sensores urbanos'}});
 assert.match(x.app.innerHTML,/Sensores urbanos/);
 assert.doesNotMatch(x.app.innerHTML,/Plataforma de educação oceânica/);
 x.handlers.change({target:{id:'register-status',value:'Concluído'}});
 assert.doesNotMatch(x.app.innerHTML,/>Sensores urbanos/);
});

test('maturidade média e totais de taxas reagem a mudanças de cadastro',()=>{
 const x=boot();
 assert.equal(run(x,'avgMaturity(extended.records.maturity[0])'),78);
 assert.equal(run(x,'extended.records.fees.reduce((n,r)=>n+Number(r.amount),0)'),1450);
 run(x,'extended.records.maturity[0].market=94');
 assert.equal(run(x,'avgMaturity(extended.records.maturity[0])'),84);
});

test('exportação de módulos e histórico gera CSV local',()=>{
 const x=boot();
 run(x,'exportRegister("fees")');
 assert.equal(x.notices.find(i=>typeof i==='object'&&i.download==='fees-demo-ficticia.csv')?.clicked,'a');
 run(x,'goto("historico")');
 assert.match(x.app.innerHTML,/Histórico da demonstração/);
});

test('nomes HTML enviados aos novos cadastros são escapados',()=>{
 const x=boot();
 run(x,`editingRecordKey='pre';editingRecordId=null`);
 const values={project:'<img src=x onerror=alert(1)>',company:'Equipe Teste',area:'Educação',status:'Inscrito',date:'2026-11-11',mentor:'Pessoa fictícia'};
 x.handlers.submit({target:{id:'record-form',values},preventDefault(){}});
 run(x,'goto("preincubacao")');
 assert.match(x.app.innerHTML,/&lt;img/);
 assert.doesNotMatch(x.app.innerHTML,/<img src=x onerror/);
});

test('não permite taxa fora da faixa e rejeita opção inválida',()=>{
 const x=boot();run(x,`editingRecordKey='fees';editingRecordId=null`);
 const values={company:'Empresa fictícia',competence:'2026-10',amount:'-1',due:'2026-10-11',status:'Pago'};
 x.handlers.submit({target:{id:'record-form',values},preventDefault(){}});
 assert.equal(run(x,'extended.records.fees.length'),5);
 values.amount='100';values.status='ADMIN';
 x.handlers.submit({target:{id:'record-form',values},preventDefault(){}});
 assert.equal(run(x,'extended.records.fees.length'),5);
});

test('restaurar dados restaura também os registros ampliados',()=>{
 const x=boot();run(x,'extended.records.fees.pop();storeExtended()');
 assert.equal(run(x,'extended.records.fees.length'),4);
 x.handlers.click({target:{closest:()=>({dataset:{action:'reset'}})}});
 assert.equal(run(x,'extended.records.fees.length'),5);
});

test('eventos existentes podem ser editados sem duplicar',()=>{
 const x=boot();run(x,'editingEventId=1');
 x.handlers.submit({target:{id:'event-form',values:{name:'Encontro Editado',date:'2026-10-22',category:'Workshop',audience:'75'}},preventDefault(){}});
 assert.equal(run(x,'data.events.length'),4);
 assert.equal(run(x,'data.events[0].name'),'Encontro Editado');
});
