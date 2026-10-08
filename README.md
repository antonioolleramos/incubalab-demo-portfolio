# IncubaLab — Painel de Gestão de Incubadoras (Demo Interativa)

**Demonstração pública e independente, criada para o portfólio de Antonio Ollé Ramos.** É uma aplicação estática em TypeScript, HTML e CSS com dados integralmente **fictícios**, elaborada para apresentar uma experiência interativa de gestão de incubadoras.

> [!IMPORTANT]
> **O sistema profissional original é significativamente mais complexo e permanece privado.** É uma aplicação **full-stack** com **Next.js, React, TypeScript, Node.js, PostgreSQL e Prisma**, que contempla login, sessões gerenciadas no servidor, diferentes permissões, administração de usuários, controles contra tentativas abusivas de acesso, trilhas de auditoria, operações no backend, importação/exportação de planilhas, múltiplos módulos de gestão e infraestrutura própria de hospedagem e banco. **Esses mecanismos e seu código-fonte não foram publicados nesta demo.** A aplicação pública foi desenvolvida separadamente, não acessa o sistema original nem contém seu banco, tokens, credenciais ou regras internas privadas.
>
> Esta descrição de mecanismos presentes no sistema privado **não equivale a uma auditoria ou garantia de segurança**.

## ▶ Abrir imediatamente (sem instalar nada)

1. Baixe este repositório pelo botão **Code → Download ZIP** ou clone-o.
2. Extraia o ZIP.
3. Abra **`index.html`** no Chrome, Edge ou Firefox.
4. Explore os módulos, cadastre e edite dados fictícios, faça pesquisas, aplique filtros e exporte relatórios CSV.

**Não precisa instalar Node.js, Docker ou banco de dados.** O arquivo `app.js` já vem compilado e é carregado pelo `index.html`.

As alterações de teste são guardadas no `localStorage` do navegador (quando permitido pelo navegador). O projeto **não** envia dados a servidores externos. Não insira dados reais ou sigilosos nesta aplicação de demonstração.

## ✨ Módulos disponíveis nesta demo

| Módulo | O que pode fazer |
| --- | --- |
| **Dashboard** | Contadores, distribuição de empresas, agenda, evolução ilustrativa e atalhos para outros módulos |
| **Empresas** | Cadastrar, editar, excluir, pesquisar, filtrar por estágio e exportar CSV |
| **Pré-incubação** | Acompanhar projetos, equipes, áreas, mentoria e etapas; cadastrar, editar, excluir, pesquisar, filtrar e exportar |
| **Maturidade empresarial** | Avaliar cinco dimensões (estratégia, tecnologia, mercado, gestão, impacto), visualizar médias e exportar |
| **Programas** | Visualizar trilhas, vagas, progresso e simular localmente uma inscrição |
| **Eventos** | Agenda com criação, edição, exclusão e exportação CSV |
| **Eventos e editais** | Chamadas com prazo, vagas, situação e controles de cadastro, pesquisa e exportação |
| **Hackathons** | Acompanhar desafios fictícios, equipes e situações com operações de cadastro |
| **Taxas de incubação** | Lançamentos de exemplo, competências, vencimentos, situação, resumos e exportação CSV |
| **Bolsas de pesquisa** | Visão informativa de registros totalmente genéricos |
| **MAI-DAI** | Bolsas e modalidades fictícias, vínculos e orientações de exemplo com cadastro e filtros |
| **Indicadores** | Gráficos da amostra, distribuição de empresas, dimensões de maturidade e situação das taxas |
| **Relatórios** | Exportação CSV dos cadastros e impressão do painel |
| **Histórico da demo** | Registro local e ilustrativo das alterações do visitante (não é auditoria de segurança) |
| **Sobre esta demo** | Limites do projeto público, explicação das diferenças e restauração da base fictícia |

A tela de empresas e os módulos adicionais **permitem operações reais sobre a amostra fictícia no navegador**, não apenas imagens ou telas estáticas. Os módulos sem formulário próprio são explicitamente demonstrativos.

## 🧠 Solução profissional privada × Demo pública

| Item | Sistema completo privado | Esta demo pública |
| --- | --- | --- |
| Arquitetura | Full-stack, Next.js / React / Node.js | Frontend HTML, CSS e TypeScript |
| Dados | Banco PostgreSQL com Prisma | Dados sintéticos em `localStorage` |
| Autenticação | Login, contas e sessões no servidor | Sem login ou contas |
| Permissões | Regras de acesso, perfis e rotas protegidas | Sem acesso multiusuário ou restrições reais |
| Gestão de usuários | Cadastro e administração de contas | Não implementado |
| Proteção do acesso | Controles de autenticação e tentativas de login | Não implementado |
| Auditoria | Registros institucionais de operações | Apenas histórico ilustrativo local |
| Recursos institucionais | Fluxos, integrações e regras completas | Simulações independentes dos conceitos de gestão |
| Importação e relatórios | Processos de importação de planilhas e exportação do backend | CSV local e impressão; não importa Excel |
| Infraestrutura | Servidores de aplicação e banco separados | Arquivos estáticos, sem infraestrutura |
| Dados reais | Restritos a usuários autorizados | **Nenhum dado institucional real** |

**A demo não equivale à implementação, arquitetura, regras de negócio nem ao nível de segurança do sistema original.** As informações de produção não são acessíveis pelo projeto público.

## 🧰 Tecnologias desta demonstração

- **TypeScript** para a lógica da interface (`src/app.ts`);
- **HTML5** para a página de entrada (`index.html`);
- **CSS3** responsivo (`styles.css`);
- **JavaScript** compilado (`app.js`, sem dependências de runtime);
- **Web Storage API** (`localStorage`) para persistência local, quando disponível;
- **Node.js test runner** para testes automatizados.

A demonstração é independente de frameworks web em tempo de execução. Não há código de backend, chamadas `fetch`, contas, banco de dados, SDKs privados ou requisições a endpoints externos.

## 🔁 Como funcionam as interações

- Cadastros, filtros e indicadores operam exclusivamente sobre a base local fictícia.
- Os registros alterados são refletidos em tabelas, contadores e gráficos da própria demo.
- Exportações CSV são geradas no navegador, sem upload para servidores.
- O histórico local registra ações demonstrativas, **não** usuários reais, autenticação ou auditoria institucional.
- **Restaurar dados fictícios**, em **Sobre esta demo**, recoloca a amostra inicial.

## 👩‍💻 Desenvolvimento e testes (opcional)

Quem quiser **alterar o código-fonte** precisará do Node.js e TypeScript. Para apenas abrir o `index.html`, não precisa executar estes comandos.

```bash
npm install
npm run check
npm run build
npm test
```

Os testes cobrem o render inicial, navegação, pesquisas, cadastros/edições/exclusões, estatísticas, exportação CSV, validação de entradas e verificações de isolamento do código. O projeto tem também um [guia de segurança](SECURITY.md).

## 📁 Estrutura

```text
incubalab-demo-portfolio/
├── index.html           # Abrir este arquivo diretamente no navegador
├── app.js               # JavaScript já compilado
├── styles.css           # Layout responsivo
├── src/
│   └── app.ts           # Código-fonte TypeScript
├── assets/
│   └── favicon.svg      # Ícone genérico da demonstração
├── tests/
│   └── demo.test.cjs    # Testes automatizados
├── package.json
├── tsconfig.json
├── README.md
├── SECURITY.md
└── .gitignore
```

## 🌐 Publicação no GitHub Pages

O GitHub Pages pode hospedar o projeto sem build:

1. Crie um repositório novo, separado do sistema privado, como `incubalab-demo-portfolio`.
2. Envie **todos** os arquivos e pastas acima preservando a estrutura original.
3. Abra **Settings → Pages → Build and deployment**.
4. Escolha **Deploy from a branch**, branch `main`, pasta `/(root)` e salve.
5. O GitHub mostrará o endereço da demo após concluir a publicação.

> Não misture este repositório com o original nem copie seu histórico de commits. Não envie `.env`, tokens, backups, planilhas reais, scripts internos, migrações privadas ou imagens institucionais. Revise também os textos que fazem referência à experiência profissional antes da publicação, conforme as autorizações pertinentes.

## Transparência e créditos

Os nomes, eventos, indicadores, valores e entidades contidos nos exemplos são inventados e **não representam dados da instituição**. A identidade **IncubaLab** é uma criação genérica para esta demonstração e não utiliza a marca do sistema institucional.

**Portfólio de Antonio Ollé Ramos.** Aplicação independente de demonstração, inspirada apenas no conjunto geral de problemas que um sistema de gestão de incubadoras resolve. A solução profissional institucional original permanece privada.
