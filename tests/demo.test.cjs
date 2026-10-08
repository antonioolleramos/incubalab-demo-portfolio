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
