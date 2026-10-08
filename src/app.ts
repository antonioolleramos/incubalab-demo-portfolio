/**
 * IncubaLab Portfolio Demo — aplicação independente e deliberadamente sem backend.
 * Todos os dados, marcas e métricas aqui são fictícios.
 * Nenhum arquivo, rota, credencial ou código de autenticação do projeto institucional é utilizado.
 */
type View = "dashboard" | "empresas" | "preincubacao" | "maturidade" | "programas" | "eventos" | "editais" | "hackathons" | "taxas" | "bolsas" | "mai" | "indicadores" | "relatorios" | "historico" | "sobre";
type Stage = "Incubada" | "Pré-incubada" | "Pós-incubada" | "Desligada";
type ProgramStatus = "Em andamento" | "Inscrições abertas" | "Concluído";
interface Company { id: number; name: string; sector: string; stage: Stage; deepTech: boolean; since: string }
interface DemoEvent { id: number; name: string; date: string; category: string; audience: number }
interface Program { id: number; name: string; description: string; category: string; capacity: number; enrolled: number; status: ProgramStatus; progress: number }
interface DemoData { companies: Company[]; events: DemoEvent[]; signedPrograms: number[] }
const STORAGE_KEY = "incubalab-public-portfolio-v1";
const SECTORS = ["Tecnologia", "Saúde", "Sustentabilidade", "Educação", "Indústria", "Agrotech"];
const STAGES: Stage[] = ["Incubada", "Pré-incubada", "Pós-incubada", "Desligada"];
const INITIAL: DemoData = {
  companies: [
    {id:1,name:"Verde Orbital",sector:"Sustentabilidade",stage:"Incubada",deepTech:true,since:"2025-04"},
    {id:2,name:"Aqua Lume",sector:"Tecnologia",stage:"Incubada",deepTech:false,since:"2024-11"},
    {id:3,name:"Lumina Circular",sector:"Indústria",stage:"Pré-incubada",deepTech:true,since:"2026-02"},
    {id:4,name:"Educa Ponte",sector:"Educação",stage:"Pós-incubada",deepTech:false,since:"2023-07"},
    {id:5,name:"Raiz Digital",sector:"Agrotech",stage:"Incubada",deepTech:false,since:"2025-08"},
    {id:6,name:"Bio Estação",sector:"Saúde",stage:"Incubada",deepTech:true,since:"2024-06"},
    {id:7,name:"Nexo Farol",sector:"Tecnologia",stage:"Pré-incubada",deepTech:false,since:"2026-03"},
    {id:8,name:"Vento Novo Labs",sector:"Sustentabilidade",stage:"Pós-incubada",deepTech:true,since:"2022-11"},
    {id:9,name:"Horizonte Ímpar",sector:"Educação",stage:"Desligada",deepTech:false,since:"2023-03"},
    {id:10,name:"Mosaico Vivo",sector:"Indústria",stage:"Incubada",deepTech:false,since:"2025-10"}
  ],
  events:[
    {id:1,name:"Encontro de Empreendedorismo",date:"2026-10-22",category:"Workshop",audience:85},
    {id:2,name:"Conexões de Inovação",date:"2026-11-06",category:"Networking",audience:120},
    {id:3,name:"Oficina de Modelos de Negócio",date:"2026-11-18",category:"Capacitação",audience:42},
    {id:4,name:"Mostra de Projetos",date:"2026-12-03",category:"Evento",audience:150}
  ],
  signedPrograms:[]
};
const PROGRAMS: Program[] = [
  {id:1,name:"Impulso Empreendedor",description:"Trilha de desenvolvimento de negócios com oficinas, mentorias e acompanhamento de metas.",category:"Aceleração",capacity:30,enrolled:21,status:"Em andamento",progress:70},
  {id:2,name:"Ideia ao Mercado",description:"Jornada de validação de soluções, descoberta de clientes e desenvolvimento de protótipos.",category:"Pré-incubação",capacity:25,enrolled:17,status:"Inscrições abertas",progress:43},
  {id:3,name:"Conexão Científica",description:"Programa demonstrativo de aproximação entre pesquisa aplicada e novos empreendimentos.",category:"Pesquisa aplicada",capacity:20,enrolled:20,status:"Concluído",progress:100},
  {id:4,name:"Laboratório Aberto",description:"Capacitações práticas para equipes que desejam transformar soluções em negócios.",category:"Capacitação",capacity:40,enrolled:26,status:"Em andamento",progress:58}
];
const BOLSAS = [
  {code:"BOL-001",role:"Participante demo 01",program:"Pesquisa aplicada",modality:"Iniciação",period:"2026/2027",status:"Vigente"},
  {code:"BOL-002",role:"Participante demo 02",program:"Inovação industrial",modality:"Graduação",period:"2025/2026",status:"Vigente"},
  {code:"BOL-003",role:"Participante demo 03",program:"Pesquisa aplicada",modality:"Graduação",period:"2024/2026",status:"Encerrada"},
  {code:"BOL-004",role:"Participante demo 04",program:"Pesquisa aplicada",modality:"Iniciação",period:"2026/2027",status:"Vigente"},
  {code:"BOL-005",role:"Participante demo 05",program:"Inovação industrial",modality:"Pesquisa",period:"2025/2026",status:"Encerrada"}
];
const NAV_MAIN:{view:View;label:string;ico:string}[] = [
  {view:"dashboard",label:"Visão geral",ico:"dashboard"},
  {view:"empresas",label:"Empresas",ico:"building"},
  {view:"preincubacao",label:"Pré-incubação",ico:"layers"},
  {view:"maturidade",label:"Maturidade",ico:"trend"},
  {view:"programas",label:"Programas",ico:"rocket"},
  {view:"eventos",label:"Eventos",ico:"calendar"},
  {view:"editais",label:"Eventos e editais",ico:"file"},
  {view:"hackathons",label:"Hackathons",ico:"rocket"},
  {view:"taxas",label:"Taxas de incubação",ico:"wallet"},
  {view:"bolsas",label:"Bolsas de pesquisa",ico:"graduation"},
  {view:"mai",label:"MAI-DAI",ico:"users"},
  {view:"indicadores",label:"Indicadores",ico:"trend"},
  {view:"relatorios",label:"Relatórios",ico:"file"}
];
const NAV_OTHER:{view:View;label:string;ico:string}[]=[{view:"historico",label:"Histórico da demo",ico:"clock"},{view:"sobre",label:"Sobre esta demo",ico:"info"}];
/** Módulos adicionais escritos apenas para a demonstração estática. */
type RegisterKey = "pre" | "maturity" | "notices" | "hackathons" | "fees" | "mai";
interface DemoRow { id:number; [field:string]:string|number }
interface Activity { id:number; when:string; action:string; detail:string }
interface ExtendedData { records: Record<RegisterKey,DemoRow[]>; activity:Activity[] }
type FieldType = "text" | "date" | "month" | "number" | "select";
interface Field { key:string; label:string; type:FieldType; options?:string[]; min?:number; max?:number }
interface RegisterSpec { name:string; info:string; key: RegisterKey; fields:Field[]; statusKey:string; metrics:string }
const REGISTER_SPECS:Record<RegisterKey,RegisterSpec>={
 pre:{key:"pre",name:"Pré-incubação",info:"Acompanhe inscrições, ideias e etapas de desenvolvimento de projetos fictícios.",statusKey:"status",metrics:"Projetos em avaliação",fields:[
  {key:"project",label:"Projeto",type:"text"},{key:"company",label:"Equipe / empreendimento",type:"text"},{key:"area",label:"Área",type:"select",options:["Tecnologia","Saúde","Educação","Indústria","Sustentabilidade","Agrotech"]},
  {key:"status",label:"Etapa",type:"select",options:["Inscrito","Em avaliação","Selecionado","Em desenvolvimento","Concluído"]},
  {key:"date",label:"Data de inscrição",type:"date"},{key:"mentor",label:"Mentoria",type:"text"}]},
 maturity:{key:"maturity",name:"Maturidade empresarial",info:"Diagnóstico demonstrativo em cinco dimensões, com médias recalculadas a cada edição.",statusKey:"cycle",metrics:"Avaliações registradas",fields:[
  {key:"company",label:"Empresa",type:"text"},{key:"cycle",label:"Ciclo",type:"select",options:["2025","2026","2027"]},
  {key:"strategy",label:"Estratégia (0–100)",type:"number",min:0,max:100},{key:"technology",label:"Tecnologia (0–100)",type:"number",min:0,max:100},
  {key:"market",label:"Mercado (0–100)",type:"number",min:0,max:100},{key:"management",label:"Gestão (0–100)",type:"number",min:0,max:100},{key:"impact",label:"Impacto (0–100)",type:"number",min:0,max:100}]},
 notices:{key:"notices",name:"Eventos e editais",info:"Gestão ilustrativa de chamadas, oportunidades e editais com datas e filtros.",statusKey:"status",metrics:"Editais abertos",fields:[
  {key:"title",label:"Título",type:"text"},{key:"type",label:"Tipo",type:"select",options:["Edital","Chamada","Oportunidade"]},
  {key:"deadline",label:"Prazo",type:"date"},{key:"status",label:"Situação",type:"select",options:["Aberto","Em análise","Encerrado"]},{key:"slots",label:"Vagas",type:"number",min:0,max:10000}]},
 hackathons:{key:"hackathons",name:"Hackathons",info:"Simule a organização e acompanhamento de desafios de inovação.",statusKey:"status",metrics:"Desafios em andamento",fields:[
  {key:"name",label:"Desafio",type:"text"},{key:"theme",label:"Temática",type:"text"},{key:"date",label:"Data",type:"date"},
  {key:"teams",label:"Equipes",type:"number",min:0,max:10000},{key:"status",label:"Situação",type:"select",options:["Inscrições abertas","Em andamento","Concluído"]}]},
 fees:{key:"fees",name:"Taxas de incubação",info:"Controle financeiro estritamente fictício com competências, vencimentos e pagamentos.",statusKey:"status",metrics:"Parcelas pendentes",fields:[
  {key:"company",label:"Empresa",type:"text"},{key:"competence",label:"Competência",type:"month"},{key:"amount",label:"Valor (R$)",type:"number",min:0,max:1000000},
  {key:"due",label:"Vencimento",type:"date"},{key:"status",label:"Situação",type:"select",options:["Pago","Pendente","Atrasado"]}]},
 mai:{key:"mai",name:"Programa MAI-DAI",info:"Painel ilustrativo de bolsas e orientações, sem nomes ou dados acadêmicos reais.",statusKey:"status",metrics:"Bolsas vigentes",fields:[
  {key:"person",label:"Bolsista fictício",type:"text"},{key:"modality",label:"Modalidade",type:"select",options:["ITI-A","GM","GD"]},
  {key:"company",label:"Empresa",type:"text"},{key:"advisor",label:"Orientador fictício",type:"text"},
  {key:"year",label:"Ano",type:"select",options:["2024","2025","2026","2027"]},{key:"status",label:"Situação",type:"select",options:["Vigente","Encerrada"]}]}
};
const INITIAL_EXTENDED:ExtendedData={records:{
 pre:[{id:1,project:"Plataforma de educação oceânica",company:"Equipe Mar Aberto",area:"Educação",status:"Em desenvolvimento",date:"2026-04-02",mentor:"Mentoria A"},{id:2,project:"Sensores urbanos de baixo custo",company:"Equipe Horizonte",area:"Tecnologia",status:"Selecionado",date:"2026-06-17",mentor:"Mentoria B"},{id:3,project:"Reuso de resíduos industriais",company:"Equipe Circular",area:"Sustentabilidade",status:"Em avaliação",date:"2026-09-05",mentor:"Mentoria C"},{id:4,project:"Saúde conectada",company:"Equipe Cuidar",area:"Saúde",status:"Inscrito",date:"2026-10-01",mentor:"Mentoria A"}],
 maturity:[{id:1,company:"Verde Orbital",cycle:"2026",strategy:78,technology:89,market:64,management:71,impact:88},{id:2,company:"Aqua Lume",cycle:"2026",strategy:72,technology:76,market:83,management:69,impact:80},{id:3,company:"Bio Estação",cycle:"2026",strategy:91,technology:87,market:59,management:78,impact:74},{id:4,company:"Raiz Digital",cycle:"2026",strategy:65,technology:71,market:58,management:72,impact:85}],
 notices:[{id:1,title:"Chamada de projetos inovadores",type:"Edital",deadline:"2026-11-16",status:"Aberto",slots:12},{id:2,title:"Seleção para mentorias",type:"Chamada",deadline:"2026-10-29",status:"Em análise",slots:20},{id:3,title:"Programa piloto de prototipagem",type:"Oportunidade",deadline:"2026-08-15",status:"Encerrado",slots:10}],
 hackathons:[{id:1,name:"Maré de Ideias",theme:"Economia azul",date:"2026-11-28",teams:12,status:"Inscrições abertas"},{id:2,name:"Hack Circular",theme:"Sustentabilidade",date:"2026-09-12",teams:17,status:"Concluído"},{id:3,name:"Conexões Tech",theme:"Cidades inteligentes",date:"2026-12-05",teams:8,status:"Em andamento"}],
 fees:[{id:1,company:"Verde Orbital",competence:"2026-10",amount:320,due:"2026-10-15",status:"Pago"},{id:2,company:"Aqua Lume",competence:"2026-10",amount:320,due:"2026-10-15",status:"Pendente"},{id:3,company:"Bio Estação",competence:"2026-09",amount:250,due:"2026-09-15",status:"Atrasado"},{id:4,company:"Raiz Digital",competence:"2026-10",amount:300,due:"2026-10-15",status:"Pago"},{id:5,company:"Nexo Farol",competence:"2026-11",amount:260,due:"2026-11-15",status:"Pendente"}],
 mai:[{id:1,person:"Participante Fictício A",modality:"ITI-A",company:"Verde Orbital",advisor:"Orientador Exemplo 01",year:"2026",status:"Vigente"},{id:2,person:"Participante Fictício B",modality:"GM",company:"Aqua Lume",advisor:"Orientador Exemplo 02",year:"2026",status:"Vigente"},{id:3,person:"Participante Fictício C",modality:"GD",company:"Bio Estação",advisor:"Orientador Exemplo 03",year:"2025",status:"Encerrada"},{id:4,person:"Participante Fictício D",modality:"ITI-A",company:"Raiz Digital",advisor:"Orientador Exemplo 01",year:"2026",status:"Vigente"}]
 },activity:[{id:1,when:"2026-10-08 09:00",action:"Demonstração iniciada",detail:"Base fictícia carregada no navegador."}]};
const EXTRA_STORAGE_KEY="incubalab-public-portfolio-extended-v2";
function validRow(item:unknown,spec:RegisterSpec):item is DemoRow {
 if(!item||typeof item!=="object")return false;
 const row=item as DemoRow;
 if(!Number.isSafeInteger(row.id)||row.id<1)return false;
 return spec.fields.every(f=>{const v=row[f.key];if(f.type==="number")return typeof v==="number"&&Number.isFinite(v)&&v>=(f.min??0)&&v<=(f.max??1000000);
 return typeof v==="string"&&v.length<=120&&v.length>0&&(!f.options||f.options.includes(v))&&(f.type!=="date"||/^\d{4}-\d{2}-\d{2}$/.test(v))&&(f.type!=="month"||/^\d{4}-\d{2}$/.test(v));});
}
function readExtended():ExtendedData{
 try{const parsed=JSON.parse(localStorage.getItem(EXTRA_STORAGE_KEY)||"null") as ExtendedData;
 if(!parsed||typeof parsed!=="object"||!parsed.records||!Array.isArray(parsed.activity))throw Error("empty");
 const records={} as Record<RegisterKey,DemoRow[]>;
 for(const k of Object.keys(REGISTER_SPECS) as RegisterKey[]){records[k]=Array.isArray(parsed.records[k])?parsed.records[k].slice(0,250).filter(row=>validRow(row,REGISTER_SPECS[k])):structuredClone(INITIAL_EXTENDED.records[k])}
 const activity=parsed.activity.slice(0,80).filter(x=>x&&Number.isSafeInteger(x.id)&&typeof x.when==="string"&&x.when.length<35&&typeof x.action==="string"&&x.action.length<100&&typeof x.detail==="string"&&x.detail.length<160);
 return {records,activity};
 }catch{return structuredClone(INITIAL_EXTENDED)}
}
let extended:ExtendedData=readExtended();
let registerSearch="",registerStatus="";
let editingRecordKey:RegisterKey|null=null;
let editingRecordId:number|null=null;
function storeExtended(){try{localStorage.setItem(EXTRA_STORAGE_KEY,JSON.stringify(extended))}catch{}}
function auditDemo(action:string,detail:string){const stamp=new Date().toLocaleString("pt-BR");extended.activity.unshift({id:Math.max(0,...extended.activity.map(e=>e.id))+1,when:stamp,action:action.slice(0,90),detail:detail.slice(0,140)});extended.activity=extended.activity.slice(0,80);storeExtended()}
function avgMaturity(row:DemoRow):number{return Math.round((["strategy","technology","market","management","impact"].reduce((n,k)=>n+Number(row[k]||0),0)/5)*10)/10}
function money(n:number):string{return new Intl.NumberFormat("pt-BR",{style:"currency",currency:"BRL"}).format(n)}

const PATHS:Record<string,string>={
  dashboard:'<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/>',
  building:'<rect x="4" y="3" width="16" height="18" rx="1"/><path d="M9 21v-5h6v5M8 7h1m6 0h1M8 11h1m6 0h1"/>',
  rocket:'<path d="M4 17c-2 1-2 3-2 4 1 0 3 0 4-2M12 14l-3-3c3-5 6-7 12-8-1 6-3 9-8 12l-1-1ZM9 11 5 10l-3 5 4 1m7-2 1 4 5-3-1-4M9 15l-2 2"/>',
  calendar:'<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M7 3v4m10-4v4M3 10h18"/>',
  graduation:'<path d="m2 9 10-5 10 5-10 5L2 9Zm4 3v5c4 3 8 3 12 0v-5M22 9v7"/>',
  trend:'<path d="M3 18h18M4 15l5-6 4 3 6-8M15 4h4v4"/>',
  file:'<path d="M5 3h9l5 5v13H5V3Zm9 0v5h5M8 13h8M8 17h6"/>',
  info:'<circle cx="12" cy="12" r="9"/><path d="M12 11v6m0-10v.1"/>',
  plus:'<path d="M12 5v14M5 12h14"/>',
  search:'<circle cx="11" cy="11" r="7"/><path d="m16 16 5 5"/>',
  export:'<path d="M12 3v12m-4-4 4 4 4-4M4 17v4h16v-4"/>',
  arrow:'<path d="M5 12h14m-6-6 6 6-6 6"/>',
  pencil:'<path d="M5 18 4 21l4-1 12-12-3-3L5 18ZM15 7l3 3"/>',
  trash:'<path d="M5 7h14M9 7V4h6v3M7 7l1 14h8l1-14M10 11v6m4-6v6"/>',
  x:'<path d="M5 5l14 14M19 5 5 19"/>',
  menu:'<path d="M3 7h18M3 12h18M3 17h18"/>',
  check:'<path d="m4 12 5 5L20 6"/>',
  users:'<path d="M16 20v-2c0-2-2-4-4-4H5c-2 0-4 2-4 4v2M8 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm11-7a4 4 0 0 1 0 8m0 2c2 0 4 2 4 4v2"/>',
  layers:'<path d="m12 3 9 5-9 5-9-5 9-5Zm-9 9 9 5 9-5m-18 5 9 5 9-5"/>',
  activity:'<path d="M2 12h4l3-7 6 14 3-7h4"/>',
  clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l4 2"/>',
  print:'<path d="M6 9V3h12v6M6 17H4V9h16v8h-2M6 15h12v6H6z"/>',
  refresh:'<path d="M20 7V3l-3 3a8 8 0 0 0-14 6m1 5v4l3-3a8 8 0 0 0 14-6"/>',
  wallet:'<rect x="2" y="5" width="20" height="15" rx="3"/><path d="M2 9h20M16 14h3"/>'
};
function icon(name:string,size=18):string {return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${PATHS[name]||PATHS.info}</svg>`}
function h(v:unknown):string {return String(v??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;"}[c]||c))}
function readData():DemoData {
  try {
    const raw=JSON.parse(localStorage.getItem(STORAGE_KEY)||"") as Partial<DemoData>;
    if (!Array.isArray(raw.companies) || !Array.isArray(raw.events) || !Array.isArray(raw.signedPrograms)) throw Error("invalid store");
    const companies=raw.companies.slice(0,300).filter(c=>c&&Number.isSafeInteger(c.id)&&c.id>0&&typeof c.name==="string"&&c.name.length<=55&&SECTORS.includes(c.sector)&&STAGES.includes(c.stage)&&typeof c.deepTech==="boolean"&&/^\d{4}-\d{2}$/.test(c.since));
    const events=raw.events.slice(0,300).filter(e=>e&&Number.isSafeInteger(e.id)&&e.id>0&&typeof e.name==="string"&&e.name.length<=70&&typeof e.category==="string"&&e.category.length<=25&&/^\d{4}-\d{2}-\d{2}$/.test(e.date)&&Number.isInteger(e.audience)&&e.audience>=0&&e.audience<=100000);
    const signedPrograms=raw.signedPrograms.filter(id=>Number.isInteger(id)&&PROGRAMS.some(p=>p.id===id));
    return {companies,events,signedPrograms};
  } catch { return structuredClone(INITIAL) }
}
let data:DemoData=readData();
let view:View=isView(location.hash.slice(1))?location.hash.slice(1) as View:"dashboard";
let searchTerm="",stageFilter="",programFilter="";
let mobileOpen=false;
let activeModal:"company"|"event"|"record"|null=null;
let editingCompanyId:number|null=null;
let editingEventId:number|null=null;
let toastTimer:ReturnType<typeof setTimeout>|undefined;
function isView(candidate:string):candidate is View {return [...NAV_MAIN,...NAV_OTHER].some(x=>x.view===candidate)}
function saveData(){try {localStorage.setItem(STORAGE_KEY,JSON.stringify(data))}catch { /* demo continua em memória se o navegador bloquear armazenamento */ }}
function number(v:number){return new Intl.NumberFormat("pt-BR").format(v)}
function byDate(a:string,b:string){return a.localeCompare(b)}
function formatDate(date:string){if(!/^\d{4}-\d{2}-\d{2}$/.test(date))return "Data inválida";return new Date(`${date}T12:00:00`).toLocaleDateString("pt-BR")}
function pill(status:string){const css=status==="Incubada"||status==="Vigente"||status==="Em andamento"?"green":status==="Pré-incubada"||status==="Inscrições abertas"?"blue":status==="Pós-incubada"||status==="Concluído"||status==="Pendente"||status==="Em avaliação"?"orange":status==="Atrasado"?"gray":status==="Pago"||status==="Aberto"||status==="Selecionado"?"green":"gray";return `<span class="status ${css}">${h(status)}</span>`}
function header(title:string,subtitle:string,actions=""){return `<div class="heading-row"><div><div class="eyebrow">Painel / ${h(title)}</div><h1>${h(title)}</h1><p class="subtitle">${h(subtitle)}</p></div>${actions?`<div class="heading-actions">${actions}</div>`:""}</div>`}
function button(action:string,text:string,sty="secondary",ico?:string){return `<button type="button" class="btn ${sty}" data-action="${h(action)}">${ico?icon(ico,15):""}${h(text)}</button>`}
function stat(label:string,value:string|number,desc:string,ico:string){return `<article class="card stat"><div class="stat-top"><div class="stat-label">${h(label)}</div><div class="stat-icon">${icon(ico)}</div></div><div class="stat-number">${h(value)}</div><div class="stat-desc">${h(desc)}</div></article>`}
function barList(values:{name:string;count:number}[]){const max=Math.max(1,...values.map(v=>v.count));return `<div class="grid-bars">${values.map(v=>`<div class="bar-row"><span>${h(v.name)}</span><div class="bar-track"><div class="bar-fill" style="width:${Math.max(0,Math.min(100,v.count/max*100)).toFixed(1)}%"></div></div><span class="bar-count">${v.count}</span></div>`).join("")}</div>`}
function stats():{total:number;active:number;tech:number;programs:number}{return {total:data.companies.length,active:data.companies.filter(x=>x.stage==="Incubada").length,tech:data.companies.filter(x=>x.deepTech).length,programs:PROGRAMS.filter(x=>x.status!=="Concluído").length}}
function sectionCard(title:string,desc:string,content:string,more=""){return `<section class="card section-card"><div class="section-head"><div><h3 class="card-title">${h(title)}</h3><p class="card-desc">${h(desc)}</p></div>${more}</div>${content}</section>`}
function formatMonth(date:string){const d=new Date(`${date}T12:00:00`);return d.toLocaleDateString("pt-BR",{month:"short"}).replace(".","").toUpperCase()}
function dashboard():string {const s=stats();const sectorCounts=SECTORS.map(name=>({name,count:data.companies.filter(c=>c.sector===name).length})).filter(x=>x.count>0).sort((a,b)=>b.count-a.count);
const statusCounts=[{name:"Incubada",count:data.companies.filter(x=>x.stage==="Incubada").length,color:"#087b73"},{name:"Pré-incubada",count:data.companies.filter(x=>x.stage==="Pré-incubada").length,color:"#52c9af"},{name:"Outras",count:data.companies.filter(x=>x.stage!=="Incubada"&&x.stage!=="Pré-incubada").length,color:"#b6e9da"}];let pos=0;const gradients=statusCounts.map(v=>{const start=pos;pos+=v.count/Math.max(1,s.total)*100;return `${v.color} ${start.toFixed(1)}% ${pos.toFixed(1)}%`}).join(",");
const latest=data.companies.slice(-4).reverse();return `${header("Visão geral","Acompanhe os indicadores e atividades do ecossistema fictício.",button("export","Exportar CSV","secondary","export"))}
<section class="hero"><div><div class="hero-kicker">Bem-vindo à IncubaLab Demo</div><h2>Transformando dados em decisões.</h2><p>Uma experiência interativa de gestão de incubadoras, construída do zero com dados totalmente fictícios e sem conexão institucional.</p></div><div>${button("go-empresas","Explorar empresas","primary","arrow")}</div></section>
<div class="stats">${stat("Empresas cadastradas",number(s.total),"Base de demonstração", "building")}${stat("Empresas incubadas",number(s.active),"Em acompanhamento", "rocket")}${stat("Deep Techs",number(s.tech),"Projetos tecnológicos", "activity")}${stat("Programas em atividade",number(s.programs),"Inclui inscrições abertas", "layers")}</div>
<div class="cols">${sectionCard("Empresas por segmento","Distribuição atual do cadastro fictício",barList(sectorCounts))}${sectionCard("Etapa de incubação","Participação das empresas por status",`<div class="donut-layout"><div class="donut" style="background:conic-gradient(${gradients})"><div class="donut-inner"><div><div class="donut-num">${s.total}</div><small>empresas</small></div></div></div><div class="legend">${statusCounts.map(c=>`<div class="legend-item"><span class="legend-dot" style="background:${c.color}"></span>${h(c.name)} <strong>${c.count}</strong></div>`).join("")}</div></div>`)}</div>
<div class="cols cols-even">${sectionCard("Empresas recentes","Registros demonstrativos",`<div class="list-rows">${latest.map(c=>`<div class="list-row"><div class="list-symbol">${icon("building")}</div><div class="list-main"><strong>${h(c.name)}</strong><span>${h(c.sector)} · Desde ${h(c.since.slice(0,4))}</span></div>${pill(c.stage)}</div>`).join("")}</div>`,button("go-empresas","Ver todas","small secondary","arrow"))}
${sectionCard("Próximos eventos","Agenda criada exclusivamente para demonstração",`<div class="list-rows">${data.events.slice().sort((a,b)=>byDate(a.date,b.date)).slice(0,4).map(e=>`<div class="list-row"><div class="list-symbol">${icon("calendar")}</div><div class="list-main"><strong>${h(e.name)}</strong><span>${formatDate(e.date)} · ${h(e.category)}</span></div></div>`).join("")||'<div class="empty">Nenhum evento cadastrado.</div>'}</div>`,button("go-eventos","Agenda","small secondary","arrow"))}</div>
 ${sectionCard("Operações da incubadora","Módulos adicionais para explorar com dados fictícios",`<div class="shortcut-grid">${[{v:"preincubacao",t:"Pré-incubação",d:extended.records.pre.length+" projetos"},{v:"maturidade",t:"Maturidade",d:extended.records.maturity.length+" avaliações"},{v:"editais",t:"Editais",d:extended.records.notices.length+" chamadas"},{v:"hackathons",t:"Hackathons",d:extended.records.hackathons.length+" desafios"},{v:"taxas",t:"Taxas",d:extended.records.fees.length+" parcelas"},{v:"mai",t:"MAI-DAI",d:extended.records.mai.length+" bolsas"}].map(x=>`<button class="shortcut" data-action="navigate" data-view="${x.v}"><span class="shortcut-mark">${icon("arrow",16)}</span><span><strong>${x.t}</strong><small>${x.d}</small></span></button>`).join("")}</div>`)}
 `}
function companiesPage():string{const filtered=data.companies.filter(c=>(!stageFilter||c.stage===stageFilter)&&(!searchTerm||`${c.name} ${c.sector}`.toLowerCase().includes(searchTerm.toLowerCase())));return `${header("Empresas","Gerencie um cadastro independente com dados inventados.",button("open-company","Nova empresa","primary","plus"))}
<div class="stats">${stat("Total",data.companies.length,"Todos os registros","building")}${stat("Incubadas",data.companies.filter(x=>x.stage==="Incubada").length,"Atualmente ativas","rocket")}${stat("Pré-incubadas",data.companies.filter(x=>x.stage==="Pré-incubada").length,"Em validação","layers")}${stat("Deep Techs",data.companies.filter(x=>x.deepTech).length,"Empresas tecnológicas","activity")}</div>
<section class="card"><div class="panel-toolbar"><div class="toolbar-left"><div class="search">${icon("search")}<input id="company-search" class="input" value="${h(searchTerm)}" placeholder="Buscar empresa ou setor..." aria-label="Buscar empresa"></div><select id="stage-filter" class="select" aria-label="Filtrar estágio"><option value="">Todos os estágios</option>${STAGES.map(x=>`<option ${stageFilter===x?"selected":""}>${x}</option>`).join("")}</select></div>${button("export","Exportar CSV","small secondary","export")}</div>
<div class="table-scroll"><table class="table"><thead><tr><th>Empresa</th><th>Segmento</th><th>Estágio</th><th>Deep Tech</th><th>Início</th><th style="text-align:right">Ações</th></tr></thead><tbody>${filtered.map(c=>`<tr><td><div class="company-name"><span class="company-dot">${h(c.name.slice(0,1))}</span>${h(c.name)}</div></td><td>${h(c.sector)}</td><td>${pill(c.stage)}</td><td>${c.deepTech?pill("Sim"):"Não"}</td><td>${h(c.since)}</td><td><div class="table-acts"><button class="icon-btn" title="Editar ${h(c.name)}" aria-label="Editar ${h(c.name)}" data-action="edit-company" data-id="${c.id}">${icon("pencil")}</button><button class="icon-btn" title="Excluir ${h(c.name)}" aria-label="Excluir ${h(c.name)}" data-action="delete-company" data-id="${c.id}">${icon("trash")}</button></div></td></tr>`).join("")}</tbody></table>${!filtered.length?`<div class="empty">${icon("search",30)}Nenhuma empresa corresponde aos filtros.</div>`:""}</div></section><p class="section-note">${filtered.length} de ${data.companies.length} empresas exibidas · Suas alterações ficam somente neste navegador.</p>`}
function programsPage():string{const programs=PROGRAMS.filter(p=>!programFilter||p.status===programFilter);return `${header("Programas","Acompanhe iniciativas e simule participações sem enviar nenhum dado.")}
<div class="panel-toolbar card" style="margin-bottom:20px"><div class="toolbar-left"><select id="program-filter" class="select" aria-label="Filtrar programas"><option value="">Todos os programas</option>${["Em andamento","Inscrições abertas","Concluído"].map(x=>`<option ${programFilter===x?"selected":""}>${x}</option>`).join("")}</select></div><span class="subtitle">${programs.length} programas</span></div>
<div class="program-grid">${programs.map(p=>{const signed=data.signedPrograms.includes(p.id),joined=p.enrolled+(signed?1:0);return `<section class="card program-card"><div class="program-top"><div class="program-symbol">${icon("rocket",22)}</div>${pill(p.status)}</div><h3>${h(p.name)}</h3><p>${h(p.description)}</p><div class="program-meta"><span>${h(p.category)}</span><b>${joined}/${p.capacity} participantes</b></div><div class="bar-track"><div class="bar-fill" style="width:${Math.min(100,joined/p.capacity*100)}%"></div></div><div class="program-footer"><span class="subtitle">${p.progress}% da trilha concluída</span><button class="btn small ${signed?"ghost":"primary"}" data-action="join-program" data-id="${p.id}" ${signed||p.status==="Concluído"||joined>=p.capacity?"disabled":""}>${signed?"Inscrição simulada ✓":p.status==="Concluído"?"Finalizado":"Simular inscrição"}</button></div></section>`}).join("")}</div><p class="section-note">A inscrição é apenas uma interação visual local e não representa participação em um programa real.</p>`}
function eventsPage():string {return `${header("Eventos","Cadastre eventos de exemplo para explorar a agenda.",button("open-event","Novo evento","primary","plus"))}
<section class="event-cards">${data.events.slice().sort((a,b)=>byDate(a.date,b.date)).map(e=>`<article class="card event-card"><div class="date-box"><strong>${h(e.date.slice(8,10))}</strong><small>${formatMonth(e.date)}</small></div><div class="event-info"><h3>${h(e.name)}</h3><p>${formatDate(e.date)} · ${h(e.category)}</p></div><span class="status blue">${h(e.category)}</span><div class="event-summary">Público estimado<br><strong>${number(e.audience)} pessoas</strong></div><button class="icon-btn" title="Editar evento" aria-label="Editar ${h(e.name)}" data-action="edit-event" data-id="${e.id}">${icon("pencil")}</button><button class="icon-btn" title="Excluir evento" aria-label="Excluir ${h(e.name)}" data-action="delete-event" data-id="${e.id}">${icon("trash")}</button></article>`).join("")||'<div class="card empty">Nenhum evento cadastrado.</div>'}</section><p class="section-note">As datas e quantidades são fictícias; os registros novos permanecem só no seu navegador.</p>`}
function scholarshipsPage():string{return `${header("Bolsas de pesquisa","Exemplo de acompanhamento de bolsas com participantes fictícios.")}
<div class="stats">${stat("Bolsas cadastradas",BOLSAS.length,"Amostra demonstrativa","graduation")}${stat("Vigentes",BOLSAS.filter(x=>x.status==="Vigente").length,"Em acompanhamento","activity")}${stat("Encerradas",BOLSAS.filter(x=>x.status==="Encerrada").length,"Registros históricos","clock")}${stat("Modalidades",new Set(BOLSAS.map(x=>x.modality)).size,"Tipos distintos","layers")}</div>
<section class="card"><div class="table-scroll"><table class="table"><thead><tr><th>Código</th><th>Participante</th><th>Programa</th><th>Modalidade</th><th>Período</th><th>Status</th></tr></thead><tbody>${BOLSAS.map(b=>`<tr><td><span class="code-tag">${h(b.code)}</span></td><td>${h(b.role)}</td><td>${h(b.program)}</td><td>${h(b.modality)}</td><td>${h(b.period)}</td><td>${pill(b.status)}</td></tr>`).join("")}</tbody></table></div></section><p class="section-note">Este módulo é apenas ilustrativo. Nenhum nome, vínculo ou valor foi retirado de planilhas reais.</p>`}

function metricStrip(key:RegisterKey):string {
 const rows=extended.records[key];
 if(key==="fees"){
  const paid=rows.filter(x=>x.status==="Pago");const unpaid=rows.filter(x=>x.status!=="Pago");
  return `<div class="stats">${stat("Lançamentos",rows.length,"Parcelas demonstrativas","wallet")}${stat("Recebido",money(paid.reduce((n,r)=>n+Number(r.amount),0)),"Valores fictícios","check")}${stat("A receber",money(unpaid.reduce((n,r)=>n+Number(r.amount),0)),"Pendentes e atrasados","clock")}${stat("Atrasos",rows.filter(x=>x.status==="Atrasado").length,"Simulação de acompanhamento","activity")}</div>`;
 }
 if(key==="maturity"){
  const mean=rows.length?Math.round(rows.reduce((n,r)=>n+avgMaturity(r),0)/rows.length):0;
  return `<div class="stats">${stat("Avaliações",rows.length,"Ciclos fictícios","trend")}${stat("Média geral",mean+"%","Média das cinco dimensões","activity")}${stat("Maior avaliação",(rows.length?Math.max(...rows.map(avgMaturity)):0)+"%","Nesta amostra","rocket")}${stat("Empresas avaliadas",new Set(rows.map(r=>r.company)).size,"Cadastros ilustrativos","building")}</div>`;
 }
 const status=REGISTER_SPECS[key].statusKey;
 const counts=[...new Set(rows.map(x=>String(x[status])))].map(x=>({name:x,count:rows.filter(r=>String(r[status])===x).length})).sort((a,b)=>b.count-a.count);
 return `<div class="stats">${stat("Registros",rows.length,"Base fictícia","file")}${stat("Categorias",counts.length,"Situações distintas","layers")}${stat("Mais frequente",counts[0]?.name||"—",counts[0]?counts[0].count+" ocorrências":"Sem registros","trend")}${stat("Atualização","Local","Salvo neste navegador","check")}</div>`;
}
function registerPage(key:RegisterKey):string {
 const spec=REGISTER_SPECS[key],rows=extended.records[key];
 const terms=registerSearch.toLocaleLowerCase("pt-BR");
 const matching=rows.filter(r=>(!terms||spec.fields.some(f=>String(r[f.key]??"").toLocaleLowerCase("pt-BR").includes(terms)))&&(!registerStatus||String(r[spec.statusKey])===registerStatus));
 const statusOptions=[...new Set(rows.map(r=>String(r[spec.statusKey])))].sort();
 let extraPanel="";
 if(key==="maturity"){
  const dimensions=[{name:"Estratégia",f:"strategy"},{name:"Tecnologia",f:"technology"},{name:"Mercado",f:"market"},{name:"Gestão",f:"management"},{name:"Impacto",f:"impact"}];
  extraPanel=sectionCard("Média por dimensão","Recalculada a partir das avaliações desta amostra",barList(dimensions.map(d=>({name:d.name,count:rows.length?Math.round(rows.reduce((sum,r)=>sum+Number(r[d.f]),0)/rows.length):0}))));
 }
 if(key==="pre"||key==="mai"||key==="notices"||key==="hackathons"){
  extraPanel=sectionCard("Distribuição por situação","Dados recalculados automaticamente",barList(statusOptions.map(status=>({name:status,count:rows.filter(x=>x[spec.statusKey]===status).length}))));
 }
 if(key==="fees"){
  extraPanel=sectionCard("Resumo por situação","Valores fictícios, não representam recebimentos institucionais",barList(["Pago","Pendente","Atrasado"].map(name=>({name,count:rows.filter(r=>r.status===name).length}))));
 }
 const tableHeader=spec.fields.map(f=>`<th>${h(f.label)}</th>`).join("");
 const cells=(r:DemoRow)=>spec.fields.map(f=>{const val=r[f.key];const value=f.key==="amount"?money(Number(val)):f.type==="date"?formatDate(String(val)):String(val);const displayed=f.key==="status"?pill(value):f.key==="project"||f.key==="title"||f.key==="name"?`<strong>${h(value)}</strong>`:`${h(value)}`;return `<td>${displayed}</td>`}).join("");
 return `${header(spec.name,spec.info,`${button("open-record","Novo registro","primary","plus")}${button("export-records","Exportar CSV","secondary","export")}`)}
 ${metricStrip(key)}
 <div class="module-layout">${extraPanel}</div>
 <section class="card"><div class="panel-toolbar"><div class="toolbar-left"><div class="search">${icon("search")}<input id="register-search" class="input" placeholder="Pesquisar registros..." value="${h(registerSearch)}" aria-label="Pesquisar registros"></div><select id="register-status" class="select"><option value="">Todos os filtros</option>${statusOptions.map(x=>`<option value="${h(x)}" ${registerStatus===x?"selected":""}>${h(x)}</option>`).join("")}</select></div><span class="section-note">${matching.length} de ${rows.length} registros</span></div>
 <div class="table-scroll"><table class="table"><thead><tr>${tableHeader}<th>Ações</th></tr></thead><tbody>${matching.map(r=>`<tr>${cells(r)}<td><div class="table-acts"><button class="icon-btn" data-action="edit-record" data-id="${r.id}" title="Editar registro" aria-label="Editar registro">${icon("pencil")}</button><button class="icon-btn" data-action="delete-record" data-id="${r.id}" title="Excluir registro" aria-label="Excluir registro">${icon("trash")}</button></div></td></tr>`).join("")}</tbody></table>${matching.length?"":'<div class="empty">Nenhum registro encontrado. Experimente alterar os filtros.</div>'}</div></section>
 <p class="section-note">Conteúdo exclusivamente fictício. As mudanças são locais e não afetam o sistema profissional.</p>`;
}
function activityPage():string{
 return `${header("Histórico da demonstração","Registro local de ações realizadas neste navegador; não é o sistema de auditoria institucional.",button("export-history","Exportar histórico","secondary","export"))}
 <div class="notice"><strong>Histórico ilustrativo.</strong> Este painel não representa auditoria de segurança ou usuários reais. Os registros permanecem apenas no navegador.</div>
 <section class="card activity-card"><div class="list-rows">${extended.activity.map(x=>`<div class="list-row"><div class="list-symbol">${icon("clock")}</div><div class="list-main"><strong>${h(x.action)}</strong><span>${h(x.detail)}</span></div><span class="event-summary">${h(x.when)}</span></div>`).join("")}</div></section>`;
}
function recordForm(key:RegisterKey,id:number|null):string{
 const spec=REGISTER_SPECS[key],row=id!==null?extended.records[key].find(r=>r.id===id):null;
 return `<form id="record-form"><div class="form-grid">${spec.fields.map(f=>{
 const value=row?.[f.key]??(f.type==="number"?0:f.type==="date"?"2026-11-01":f.type==="month"?"2026-11":f.options?.[0]||"");
 const ctrl=f.type==="select"?`<select class="select" name="${h(f.key)}" required>${(f.options||[]).map(o=>`<option value="${h(o)}" ${o===value?"selected":""}>${h(o)}</option>`).join("")}</select>`:
 `<input class="input" name="${h(f.key)}" type="${f.type}" value="${h(value)}" ${f.type==="number"?`min="${f.min??0}" max="${f.max??1000000}" step="${key==="fees"?"0.01":"1"}"`:'maxlength="100"'} required>`;
 return `<label class="field ${["project","title","name"].includes(f.key)?"full":""}">${h(f.label)}${ctrl}</label>`}).join("")}</div><div class="modal-footer">${button("close-modal","Cancelar","secondary")}<button class="btn primary" type="submit">${id===null?"Salvar cadastro":"Salvar alterações"}</button></div></form>`;
}
function openRecordModal(key:RegisterKey,id:number|null=null){
 if(id!==null&&!extended.records[key].some(r=>r.id===id))return;
 editingRecordKey=key;editingRecordId=id;activeModal="record";
 document.getElementById("modal-root")?.remove();const overlay=document.createElement("div");overlay.className="modal-overlay";overlay.id="modal-root";
 overlay.innerHTML=`<section class="modal modal-large" role="dialog" aria-modal="true" aria-label="${id===null?"Cadastrar":"Editar"} ${h(REGISTER_SPECS[key].name)}"><div class="modal-top"><div><h2>${id===null?"Novo registro":"Editar registro"}</h2><p class="subtitle">${h(REGISTER_SPECS[key].name)} · Dados fictícios</p></div><button class="icon-btn" data-action="close-modal" aria-label="Fechar">${icon("x")}</button></div>${recordForm(key,id)}</section>`;
 document.body.appendChild(overlay);(overlay.querySelector("input,select") as HTMLElement|null)?.focus();
}
function exportRowsCSV(rows:unknown[][],filename:string){const content="\uFEFF"+rows.map(row=>row.map(safeCSV).join(";")).join("\r\n");const blob=new Blob([content],{type:"text/csv;charset=utf-8"});const url=URL.createObjectURL(blob);const link=document.createElement("a");link.href=url;link.download=filename;document.body.appendChild(link);link.click();link.remove();setTimeout(()=>URL.revokeObjectURL(url),1500);notify("Exportação local concluída com dados fictícios.")}
function exportRegister(key:RegisterKey){const spec=REGISTER_SPECS[key];exportRowsCSV([spec.fields.map(f=>f.label),...extended.records[key].map(r=>spec.fields.map(f=>r[f.key]))],`${key}-demo-ficticia.csv`)}

function indicatorsPage():string{const s=stats();const sectors=SECTORS.map(x=>({name:x,count:data.companies.filter(c=>c.sector===x).length})).filter(x=>x.count).sort((a,b)=>b.count-a.count);const recent=[6,8,7,9,11,10,12,14,13,17,15,18];return `${header("Indicadores","Visão analítica baseada apenas nos dados demonstrativos.",button("print","Imprimir relatório","secondary","print"))}
<div class="stats">${stat("Empresas em acompanhamento",s.active,"Status incubada","building")}${stat("Segmentos atendidos",new Set(data.companies.map(x=>x.sector)).size,"Áreas distintas","layers")}${stat("Deep Techs",s.tech,"Classificação de exemplo","activity")}${stat("Público previsto",number(data.events.reduce((n,e)=>n+e.audience,0)),"Agenda demonstrativa","users")}</div>
<div class="cols">${sectionCard("Evolução ilustrativa","Série inteiramente simulada; não são métricas institucionais",`<div style="height:230px;display:grid;align-items:center"><svg role="img" aria-label="Gráfico ilustrativo de atividade mensal crescente" viewBox="0 0 670 240" style="width:100%;height:auto;max-height:235px"><defs><linearGradient id="area" x1="0" x2="0" y1="0" y2="1"><stop stop-color="#2cc0a7" stop-opacity=".32"/><stop offset="1" stop-color="#2cc0a7" stop-opacity="0"/></linearGradient></defs>${[45,90,135,180].map(y=>`<path d="M12 ${y}H658" stroke="#eaf1f0" stroke-dasharray="5 5"/>`).join("")}<path d="M12 192 ${recent.map((v,i)=>`L${12+i*58.7} ${215-v*9.6}`).join(" ")} L658 215 L12 215 Z" fill="url(#area)"/><path d="M${recent.map((v,i)=>`${12+i*58.7} ${215-v*9.6}`).join(" L")}" fill="none" stroke="#09917f" stroke-width="4" stroke-linejoin="round" stroke-linecap="round"/>${recent.map((v,i)=>`<circle cx="${12+i*58.7}" cy="${215-v*9.6}" r="4" fill="#fff" stroke="#09917f" stroke-width="2"/>`).join("")}</svg></div><div style="display:flex;justify-content:space-between;color:#9caeb0;font-size:10px"><span>JAN</span><span>MAR</span><span>MAI</span><span>JUL</span><span>SET</span><span>DEZ</span></div>`)}${sectionCard("Distribuição setorial","Atualizada ao editar o cadastro de empresas",barList(sectors))}</div>
<div class="cols cols-even">${sectionCard("Maturidade por dimensão","Médias provenientes das avaliações fictícias",barList(["strategy","technology","market","management","impact"].map((key,i)=>({name:["Estratégia","Tecnologia","Mercado","Gestão","Impacto"][i],count:extended.records.maturity.length?Math.round(extended.records.maturity.reduce((n,r)=>n+Number(r[key]),0)/extended.records.maturity.length):0}))))}${sectionCard("Situação de taxas","Parcelas demonstrativas por situação",barList(["Pago","Pendente","Atrasado"].map(name=>({name,count:extended.records.fees.filter(r=>r.status===name).length}))))}</div>
 <div class="notice"><strong>Transparência:</strong> os totais de empresas, setores, maturidade e taxas são calculados a partir da amostra fictícia deste navegador. A curva mensal é ilustrativa, sem relação com dados da incubadora real.</div>`}
function reportsPage():string{return `${header("Relatórios","Explore como indicadores podem ser organizados e exportados.")}
<div class="report-grid"><article class="card report-card"><div class="stat-icon">${icon("building")}</div><h3>Empresas cadastradas</h3><p>Exporte as empresas e seus estágios para um arquivo CSV com dados fictícios.</p>${button("export","Exportar empresas","primary","export")}</article><article class="card report-card"><div class="stat-icon">${icon("calendar")}</div><h3>Agenda de eventos</h3><p>Gere um CSV contendo os eventos e públicos previstos nesta demonstração.</p>${button("export-events","Exportar eventos","secondary","export")}</article><article class="card report-card"><div class="stat-icon">${icon("file")}</div><h3>Resumo visual</h3><p>Prepare uma versão de impressão com os indicadores apresentados na tela.</p>${button("print-dashboard","Visualizar e imprimir","secondary","print")}</article>${(Object.keys(REGISTER_SPECS) as RegisterKey[]).map(k=>`<article class="card report-card"><div class="stat-icon">${icon(k==="fees"?"wallet":k==="mai"?"graduation":"file")}</div><h3>${h(REGISTER_SPECS[k].name)}</h3><p>Exporte ${extended.records[k].length} registros fictícios para um arquivo CSV local.</p><button type="button" class="btn secondary" data-action="export-kind" data-kind="${k}">${icon("export",15)} Exportar CSV</button></article>`).join("")}</div>
<div class="notice" style="margin-top:20px"><strong>Exportação local:</strong> os arquivos CSV são gerados diretamente pelo seu navegador, sem upload de dados a qualquer servidor.</div>`}
function aboutPage():string{return `${header("Sobre esta demonstração","Uma amostra pública feita para portfólio, independente da aplicação institucional.")}
<div class="cols cols-even"><section class="card section-card"><div class="eyebrow">O que esta demo faz</div><h3 class="card-title" style="font-size:18px;margin-bottom:14px">Interface demonstrativa e interativa</h3><p class="subtitle" style="font-size:12px">Uma recriação independente dos conceitos de gestão de incubadoras, sem copiar código do backend privado. Inclui dashboards, cadastros editáveis, pré-incubação, maturidade, programas, eventos, editais, hackathons, taxas, MAI-DAI, indicadores e exportação de dados.</p><ul class="info-list"><li>TypeScript, HTML semântico, CSS responsivo</li><li>Dados sintéticos, definidos no próprio projeto</li><li>Persistência exclusivamente em localStorage</li><li>Nenhuma dependência para abrir no navegador</li></ul></section><section class="card section-card"><div class="eyebrow">O que esta demo não contém</div><h3 class="card-title" style="font-size:18px;margin-bottom:14px">Sem acesso à produção</h3><p class="subtitle" style="font-size:12px">Nenhum componente de autenticação real, integração com Neon ou Render, banco institucional, usuários de produção, API protegida, senha, chave ou configuração da aplicação original.</p><ul class="info-list"><li>Não realiza login nem possui contas reais</li><li>Não envia dados para serviços externos</li><li>Não usa identidade visual ou logotipo institucional</li><li>Não possui PostgreSQL, Prisma nem backend</li><li>Não inclui gerenciamento real de usuários nem permissões; o histórico exibido é apenas local e ilustrativo</li><li>Não inclui importação Excel nem a implementação institucional desses módulos</li><li>Não é o sistema completo de produção</li></ul></section></div>
<div class="notice gold"><strong>O sistema profissional completo é mais complexo.</strong> A aplicação original (privada e utilizada em ambiente institucional) emprega Next.js, React, TypeScript, PostgreSQL e Prisma, com login, sessões, permissões, administração de usuários, auditoria, backend, importação de planilhas e módulos mais amplos de gestão. <strong>Nada disso é publicado nesta demonstração estática.</strong> Esta amostra funciona só no navegador com dados fictícios e não representa a arquitetura ou o nível de complexidade do projeto real. A existência de controles de segurança no sistema privado não equivale a uma auditoria independente.</div>
<div style="margin-top:18px">${button("reset","Restaurar dados fictícios","secondary","refresh")}</div>`}
function navItems(items:{view:View;label:string;ico:string}[]){return items.map(item=>`<button class="nav-button ${view===item.view?"active":""}" data-action="navigate" data-view="${item.view}" ${view===item.view?'aria-current="page"':""}><span class="nav-icon">${icon(item.ico,17)}</span>${h(item.label)}</button>`).join("")}
function page(){switch(view){case "dashboard":return dashboard();case "empresas":return companiesPage();case "preincubacao":return registerPage("pre");case "maturidade":return registerPage("maturity");case "programas":return programsPage();case "eventos":return eventsPage();case "editais":return registerPage("notices");case "hackathons":return registerPage("hackathons");case "taxas":return registerPage("fees");case "bolsas":return scholarshipsPage();case "mai":return registerPage("mai");case "indicadores":return indicatorsPage();case "relatorios":return reportsPage();case "historico":return activityPage();case "sobre":return aboutPage();}}
function render(preserveSearchFocus=false){const focused=preserveSearchFocus&&["company-search","register-search"].includes((document.activeElement as HTMLElement|null)?.id||"");const fieldId=(document.activeElement as HTMLElement|null)?.id;const old=focused?document.getElementById(fieldId||"") as HTMLInputElement:null;const pos=old?.selectionStart??0;const label=([...NAV_MAIN,...NAV_OTHER].find(n=>n.view===view)?.label||"Visão geral");document.getElementById("app")!.innerHTML=`<div class="shell"><div class="menu-overlay ${mobileOpen?"open":""}" data-action="close-menu"></div><aside class="sidebar ${mobileOpen?"open":""}" aria-label="Navegação principal"><div class="brand"><div class="brand-mark">${icon("layers",23)}</div><div><div class="brand-name">IncubaLab</div><div class="brand-sub">PORTFOLIO DEMO</div></div></div><div class="nav-group">PRINCIPAL</div><nav class="nav">${navItems(NAV_MAIN)}</nav><div class="nav-group">INFORMAÇÕES</div><nav class="nav">${navItems(NAV_OTHER)}</nav><div class="sidebar-foot"><span class="mini-label"><span class="pulse"></span>DADOS FICTÍCIOS</span><p class="foot-copy">Dados 100% fictícios. Sem conexão com serviços externos ou ambientes reais.</p></div></aside>
<div class="main-area"><header class="topbar"><div class="breadcrumbs"><button class="mobile-brand" data-action="toggle-menu" aria-label="Abrir menu">${icon("menu")}</button><span>IncubaLab</span><span>/</span><strong>${h(label)}</strong></div><div class="top-right"><span class="top-demo">● MODO DEMONSTRAÇÃO</span><div class="avatar" title="Perfil fictício" aria-label="Perfil fictício">DE</div></div></header><div class="demo-disclaimer"><strong>Demo simplificada e independente:</strong> a solução profissional completa inclui login, permissões, sessões, banco PostgreSQL, auditoria e muito mais. Esta versão pública utiliza apenas dados fictícios. <button type="button" data-action="navigate" data-view="sobre">Entenda as diferenças →</button></div><main class="content">${page()}<footer class="footer-small">IncubaLab Demo · Projeto independente para portfólio · Nenhum dado real é utilizado · ${new Date().getFullYear()}</footer></main></div></div>`;if(focused){const input=document.getElementById(fieldId||"") as HTMLInputElement|null;input?.focus();input?.setSelectionRange(pos,pos)}}
function notify(message:string){document.getElementById("demo-toast")?.remove();const n=document.createElement("div");n.className="toast";n.id="demo-toast";n.setAttribute("role","status");n.textContent=message;document.body.appendChild(n);clearTimeout(toastTimer);toastTimer=setTimeout(()=>n.remove(),3700)}
function goto(next:View){view=next;mobileOpen=false;location.hash=next;searchTerm="";stageFilter="";programFilter="";registerSearch="";registerStatus="";render();window.scrollTo(0,0)}
function modalBody(type:"company"|"event",id:number|null=null):string {if(type==="company"){const c=id!==null?data.companies.find(x=>x.id===id):undefined;return `<form id="company-form"><div class="form-grid"><label class="field full">Nome da empresa <input class="input" name="name" maxlength="55" required value="${h(c?.name||"")}" placeholder="Ex.: Nova Ideia Labs" autofocus></label><label class="field">Segmento <select class="select" name="sector" required>${SECTORS.map(s=>`<option ${s===c?.sector?"selected":""}>${h(s)}</option>`).join("")}</select></label><label class="field">Estágio <select class="select" name="stage" required>${STAGES.map(s=>`<option ${s===c?.stage?"selected":""}>${h(s)}</option>`).join("")}</select></label><label class="field">Mês de ingresso <input class="input" name="since" type="month" value="${h(c?.since||"2026-10")}" required></label><label class="field" style="justify-content:flex-end"><span>Classificação</span><span style="display:flex;align-items:center;gap:9px;margin-top:6px;font-weight:500"><input type="checkbox" name="deepTech" ${c?.deepTech?"checked":""}> Deep Tech</span></label></div><div class="modal-footer">${button("close-modal","Cancelar","secondary")}<button type="submit" class="btn primary">${c?"Salvar alterações":"Cadastrar empresa"}</button></div></form>`}const ev=id!==null?data.events.find(x=>x.id===id):undefined;return `<form id="event-form"><div class="form-grid"><label class="field full">Nome do evento <input class="input" name="name" required maxlength="70" value="${h(ev?.name||"")}" placeholder="Ex.: Oficina de inovação" autofocus></label><label class="field">Data <input class="input" type="date" name="date" value="${h(ev?.date||"2026-11-25")}" required></label><label class="field">Categoria <select class="select" name="category">${["Workshop","Networking","Capacitação","Evento"].map(x=>`<option ${x===ev?.category?"selected":""}>${x}</option>`).join("")}</select></label><label class="field full">Público estimado <input class="input" type="number" name="audience" min="0" max="100000" value="${ev?.audience??30}" required></label></div><div class="modal-footer">${button("close-modal","Cancelar","secondary")}<button type="submit" class="btn primary">${ev?"Salvar alterações":"Cadastrar evento"}</button></div></form>`}
function openModal(type:"company"|"event",id:number|null=null){activeModal=type;editingCompanyId=id;editingEventId=type==="event"?id:null;document.getElementById("modal-root")?.remove();const overlay=document.createElement("div");overlay.className="modal-overlay";overlay.id="modal-root";overlay.innerHTML=`<section class="modal" role="dialog" aria-modal="true" aria-label="${type==="company"?id!==null?"Editar empresa":"Nova empresa":id!==null?"Editar evento":"Novo evento"}"><div class="modal-top"><h2>${type==="company"?id!==null?"Editar empresa":"Cadastrar empresa":id!==null?"Editar evento":"Cadastrar evento"}</h2><button class="icon-btn" data-action="close-modal" aria-label="Fechar janela">${icon("x")}</button></div>${modalBody(type,id)}</section>`;document.body.appendChild(overlay);(overlay.querySelector("[autofocus]") as HTMLElement|null)?.focus()}
function closeModal(){activeModal=null;editingCompanyId=null;editingEventId=null;editingRecordKey=null;editingRecordId=null;document.getElementById("modal-root")?.remove()}
function safeCSV(v:unknown):string{let str=String(v??"");if(/^[\s\t]*[=+@-]/.test(str)) str="'"+str;return '"'+str.replace(/"/g,'""')+'"'}
function exportCSV(kind:"companies"|"events") {const rows:unknown[][]=kind==="companies"?[["Empresa","Setor","Estágio","Deep Tech","Início"],...data.companies.map(c=>[c.name,c.sector,c.stage,c.deepTech?"Sim":"Não",c.since])]:[["Evento","Data","Categoria","Público estimado"],...data.events.map(e=>[e.name,e.date,e.category,e.audience])];const text="\uFEFF"+rows.map(row=>row.map(safeCSV).join(";")).join("\r\n");const blob=new Blob([text],{type:"text/csv;charset=utf-8"});const url=URL.createObjectURL(blob);const link=document.createElement("a");link.href=url;link.download=kind==="companies"?"empresas-ficticias.csv":"eventos-ficticios.csv";document.body.appendChild(link);link.click();link.remove();setTimeout(()=>URL.revokeObjectURL(url),1500);notify("Arquivo CSV fictício gerado no navegador.")}
function keyFromView(next:View):RegisterKey|null{const mapping:Partial<Record<View,RegisterKey>>={preincubacao:"pre",maturidade:"maturity",editais:"notices",hackathons:"hackathons",taxas:"fees",mai:"mai"};return mapping[next]||null}
function clickAction(e:MouseEvent){const target=e.target as HTMLElement;const elem=target.closest<HTMLElement>("[data-action]");if(!elem)return;const action=elem.dataset.action||"";const id=Number(elem.dataset.id);switch(action){case "navigate":if(isView(elem.dataset.view||""))goto(elem.dataset.view as View);break;case "go-empresas":goto("empresas");break;case "go-eventos":goto("eventos");break;case "toggle-menu":mobileOpen=!mobileOpen;render();break;case "close-menu":mobileOpen=false;render();break;case "open-company":openModal("company");break;case "edit-company":if(data.companies.some(c=>c.id===id))openModal("company",id);break;case "delete-company":{const company=data.companies.find(c=>c.id===id);if(company&&confirm(`Excluir a empresa fictícia "${company.name}"?`)){data.companies=data.companies.filter(c=>c.id!==id);saveData();auditDemo("Empresa excluída",company.name);render();notify("Empresa removida apenas desta demonstração.")}break}case "open-event":openModal("event");break;case "edit-event":if(data.events.some(e=>e.id===id))openModal("event",id);break;case "delete-event":{const ev=data.events.find(x=>x.id===id);if(ev&&confirm(`Excluir o evento fictício "${ev.name}"?`)){data.events=data.events.filter(x=>x.id!==id);saveData();auditDemo("Evento excluído",ev.name);render();notify("Evento removido apenas desta demonstração.")}break}case "join-program":if(!data.signedPrograms.includes(id)&&PROGRAMS.some(p=>p.id===id&&p.status!=="Concluído")){data.signedPrograms.push(id);saveData();auditDemo("Inscrição simulada","Programa "+id);render();notify("Inscrição simulada: não foi enviada a nenhum programa.")}break;case "open-record":{const key=keyFromView(view);if(key)openRecordModal(key);break}
 case "edit-record":{const key=keyFromView(view);if(key)openRecordModal(key,id);break}
 case "delete-record":{const key=keyFromView(view);if(key){const row=extended.records[key].find(r=>r.id===id);if(row&&confirm("Excluir este registro fictício?")){extended.records[key]=extended.records[key].filter(r=>r.id!==id);auditDemo("Exclusão de registro",REGISTER_SPECS[key].name);render();notify("Registro excluído desta demo.")}}break}
 case "export-records":{const key=keyFromView(view);if(key)exportRegister(key);break}case "export-kind":{const key=elem.dataset.kind as RegisterKey;if(Object.prototype.hasOwnProperty.call(REGISTER_SPECS,key))exportRegister(key);break}
 case "export-history":exportRowsCSV([["Data e hora","Ação","Descrição"],...extended.activity.map(r=>[r.when,r.action,r.detail])],"historico-demo.csv");break;
 case "close-modal":closeModal();break;case "export":exportCSV("companies");break;case "export-events":exportCSV("events");break;case "print":window.print();break;case "print-dashboard":goto("dashboard");setTimeout(()=>window.print(),200);break;case "reset":if(confirm("Restaurar todos os dados fictícios desta demonstração?")){data=structuredClone(INITIAL);extended=structuredClone(INITIAL_EXTENDED);saveData();storeExtended();render();notify("Todos os dados fictícios foram restaurados.")}break}}
function submitAction(e:SubmitEvent){const form=e.target as HTMLFormElement;if(form.id!=="company-form"&&form.id!=="event-form"&&form.id!=="record-form")return;e.preventDefault();
 if(form.id==="record-form"){
  if(!editingRecordKey)return;const key=editingRecordKey,spec=REGISTER_SPECS[key],fields=new FormData(form);const row:DemoRow={id:editingRecordId??Math.max(0,...extended.records[key].map(r=>r.id))+1};
  for(const field of spec.fields){const raw=String(fields.get(field.key)??"").trim();if(!raw||raw.length>100){notify("Preencha todos os campos (até 100 caracteres).");return}
   if(field.type==="number"){const n=Number(raw);if(!Number.isFinite(n)||n<(field.min??0)||n>(field.max??1000000)){notify("Número fora do intervalo permitido.");return}row[field.key]=n}
   else{if(field.options&&!field.options.includes(raw)){notify("Selecione uma opção válida.");return}
    if(field.type==="date"&&!/^\d{4}-\d{2}-\d{2}$/.test(raw)){notify("Data inválida.");return}
    if(field.type==="month"&&!/^\d{4}-\d{2}$/.test(raw)){notify("Mês inválido.");return}row[field.key]=raw}
  }
  if(editingRecordId===null)extended.records[key].push(row);else extended.records[key]=extended.records[key].map(x=>x.id===editingRecordId?row:x);
  auditDemo(editingRecordId===null?"Registro incluído":"Registro editado",spec.name);closeModal();render();notify("Dados fictícios salvos neste navegador.");return;
 }
const fields=new FormData(form);const name=String(fields.get("name")||"").trim();if(name.length<2||name.length>70){notify("Informe um nome válido.");return}if(form.id==="company-form"){const sector=String(fields.get("sector")),stage=String(fields.get("stage")) as Stage,since=String(fields.get("since"));if(!SECTORS.includes(sector)||!STAGES.includes(stage)||!/^\d{4}-\d{2}$/.test(since)){notify("Revise os campos da empresa.");return}const id=editingCompanyId??Math.max(0,...data.companies.map(c=>c.id))+1;const newCompany:Company={id,name:name.slice(0,55),sector,stage,deepTech:fields.has("deepTech"),since};if(editingCompanyId===null)data.companies.push(newCompany);else data.companies=data.companies.map(c=>c.id===editingCompanyId?newCompany:c);notify(editingCompanyId===null?"Empresa fictícia cadastrada.":"Empresa fictícia atualizada.")}else{const date=String(fields.get("date")),category=String(fields.get("category")),audience=Number(fields.get("audience"));if(!/^\d{4}-\d{2}-\d{2}$/.test(date)||!Number.isInteger(audience)||audience<0||audience>100000){notify("Revise os campos do evento.");return}const event:DemoEvent={id:editingEventId??Math.max(0,...data.events.map(x=>x.id))+1,name:name.slice(0,70),date,category,audience};if(editingEventId===null)data.events.push(event);else data.events=data.events.map(x=>x.id===editingEventId?event:x);notify(editingEventId===null?"Evento fictício cadastrado.":"Evento fictício atualizado.")}saveData();auditDemo(form.id==="company-form"?"Empresa salva":"Evento salvo",name);closeModal();render()}
document.addEventListener("click",e=>clickAction(e));
document.addEventListener("submit",e=>submitAction(e));
document.addEventListener("input",e=>{const target=e.target as HTMLInputElement;if(target.id==="company-search"){searchTerm=target.value;render(true)}else if(target.id==="register-search"){registerSearch=target.value;render(true)}});
document.addEventListener("change",e=>{const target=e.target as HTMLSelectElement;if(target.id==="stage-filter"){stageFilter=target.value;render()}else if(target.id==="program-filter"){programFilter=target.value;render()}else if(target.id==="register-status"){registerStatus=target.value;render()}});
document.addEventListener("keydown",e=>{if(e.key==="Escape"&&activeModal)closeModal()});
window.addEventListener("hashchange",()=>{const candidate=location.hash.slice(1);if(isView(candidate)&&candidate!==view){view=candidate;render()}});
render();
