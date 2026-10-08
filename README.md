# IncubaLab — Demo pública de gestão de incubadoras

**Demonstração interativa e independente, criada para portfólio, com TypeScript e dados 100% fictícios.**

> [!IMPORTANT]
> **Esta demonstração é uma versão simplificada para apresentação. Não é o sistema original nem uma cópia de seu código-fonte.** O projeto profissional completo é **full-stack, mais complexo e permanece privado**, pois é utilizado em ambiente institucional com usuários e dados reais. Seus mecanismos de segurança, login, regras de negócio, integrações e infraestrutura **não foram publicados aqui**.

## 🧩 O sistema completo é muito mais amplo

O sistema profissional que motivou este estudo de interface possui uma arquitetura **Next.js, React, TypeScript, Node.js, PostgreSQL e Prisma**. Além dos painéis e cadastros, o projeto original contempla funcionalidades e mecanismos que **não fazem parte desta demo pública**:

- **Autenticação e segurança da aplicação:** login com credenciais, sessões gerenciadas no servidor, encerramento/invalidação de sessões, proteção de rotas privadas, verificação de permissões, perfis de acesso e medidas de proteção de tentativas de login.
- **Gestão de usuários:** administração de contas, atribuição de papéis e alteração de senha.
- **Auditoria e rastreabilidade:** registro e consulta de operações administrativas e eventos relevantes do sistema.
- **Backend e persistência reais:** rotas e operações no servidor, validações, regras de negócio e acesso a banco **PostgreSQL** por meio do **Prisma ORM**, com dados persistidos e acessados conforme as permissões.
- **Gestão institucional mais abrangente:** empresas e histórico de acompanhamento, pré-incubação, programas, iniciativas Deep Tech, MAI-DAI, maturidade, eventos/editais, hackathons, taxas de incubação, indicadores e relatórios.
- **Importação e exportação de dados:** importação de planilhas Excel, consultas, filtros e exportação de relatórios.
- **Infraestrutura de aplicação:** serviços de hospedagem e banco de dados separados, configuração de ambientes e operação multiusuário.

**Essas características descrevem recursos e decisões arquiteturais do projeto original; não constituem uma certificação ou auditoria de sua segurança.** O código, as credenciais, os dados, os modelos internos e a infraestrutura do projeto institucional não estão disponíveis neste repositório.

### Comparação objetiva

| Aspecto | Sistema original (privado) | IncubaLab (esta demo pública) |
| --- | --- | --- |
| Arquitetura | Aplicação full-stack em Next.js/React/Node.js | Aplicação estática em HTML, CSS e TypeScript |
| Login, contas e sessões | Autenticação e sessões gerenciadas no servidor | Sem login, contas ou sessões |
| Permissões e perfis | Controle de acesso por papéis e rotas | Sem controle de acesso multiusuário |
| Segurança da autenticação | Controles de sessão e de tentativas de login | Não implementa autenticação |
| Usuários e auditoria | Administração de usuários e registros de auditoria | Sem contas e sem trilha de auditoria |
| Persistência de dados | PostgreSQL com Prisma ORM | Somente `localStorage` do navegador |
| Backend e APIs | Operações e validações no servidor | Nenhum backend ou API remota |
| Módulos de gestão | Módulos institucionais mais abrangentes | Dashboard, cadastros e módulos ilustrativos |
| Planilhas e relatórios | Importação Excel e exportações de relatórios | Exportação local simples para CSV |
| Dados | Informações institucionais com acesso restrito | Nomes e números inteiramente fictícios |
| Implantação | Infraestrutura de aplicação e banco de dados | Abre como arquivo estático ou pelo GitHub Pages |

**Objetivo do repositório:** permitir que recrutadores explorem a experiência visual e algumas interações de gestão, sem expor a aplicação institucional. A demo **não reproduz integralmente** as funcionalidades, arquitetura, interface ou complexidade da solução original.

## ▶️ Teste em menos de um minuto

1. Baixe ou clone este repositório.
2. Abra `index.html` com Chrome, Edge ou Firefox.
3. Navegue pelos menus e experimente as funcionalidades. **Não precisa instalar nada.**

Alternativamente, sirva a pasta com `python -m http.server 8000` e abra `http://localhost:8000`.

**Não há tela de login**, banco de dados, servidor de aplicação ou necessidade de Docker. Não há chave, conta de demonstração ou qualquer conexão com sistemas em produção.

## Funcionalidades disponíveis

- **Dashboard:** contadores, gráficos e evolução ilustrativa.
- **Empresas:** busca, filtro, cadastro, edição e exclusão de empresas fictícias.
- **Programas:** acompanhamento visual e simulação local de inscrição.
- **Eventos:** agenda, cadastro e exclusão de eventos de exemplo.
- **Bolsas:** tabela ilustrativa com participantes genéricos.
- **Indicadores e relatórios:** dados fictícios e exportação CSV local.
- **Restaurar amostra:** em “Sobre esta demo”, redefina os dados iniciais.

Os cadastros feitos pelo visitante permanecem no `localStorage` **do próprio navegador**. Não são enviados pela internet nem sincronizados com outros usuários.

## Tecnologias desta versão pública

- **TypeScript** — lógica tipada em `src/app.ts`;
- **HTML5** — estrutura semântica;
- **CSS3** — dashboard responsivo sem frameworks;
- **JavaScript** gerado a partir do TypeScript (`app.js`);
- **localStorage** — estado do navegador para simular persistência.

Não existem bibliotecas de autenticação, serviços externos ou dependências necessárias para **executar** a demonstração. O projeto não é apresentado como uma implementação full-stack.

### Relação com o projeto profissional

A descrição das diferenças entre o sistema profissional privado e esta implementação independente está detalhada na seção **“O sistema completo é muito mais amplo”**, no início deste README. Nenhuma parte do backend, da autenticação ou do banco institucional foi transferida para a demonstração.

## Desenvolvimento e compilação

O JavaScript já está gerado, então quem visita **não precisa do Node.js**. Caso queira modificar `src/app.ts`:

```bash
npm install
npm run build
```

Para rodar os testes automatizados de lógica e segurança:

```bash
npm test
```

## Estrutura

```text
index.html          Entrada da demonstração
styles.css          Estilos responsivos
app.js              JavaScript já compilado (necessário para abrir)
src/app.ts          Código-fonte TypeScript
assets/favicon.svg  Ícone genérico criado para a demonstração
SECURITY.md         Modelo de isolamento e limites de segurança
tests/              Testes com Node.js, sem conexão à internet
```

## Publicação no GitHub Pages

Esta versão não necessita de build no servidor:

1. Publique todos os arquivos acima em um repositório **independente**.
2. No GitHub, vá a **Settings → Pages**.
3. Em **Build and deployment**, selecione **Deploy from a branch**.
4. Selecione a branch `main` e a pasta `/ (root)`.
5. Salve. O GitHub indicará o endereço público quando a publicação terminar.

**Não publique neste repositório** arquivos `.env`, backups, banco de dados, código do sistema institucional ou histórico de commits do projeto original.

## Transparência

- Todos os nomes, empresas, pessoas genéricas, datas e métricas são **fictícios**.
- O nome e a identidade visual "IncubaLab" foram criados apenas para este exercício demonstrativo.
- Não há logotipo nem identidade visual institucional.
- Exportar CSV gera o arquivo no navegador do visitante.
- Não há login real, controle de acesso, envio de formulários ou dados permanentes no servidor.

**Créditos:** demonstração independente desenvolvida para o portfólio de Antonio Ollé Ramos. O sistema institucional original não é distribuído aqui. A divulgação de vínculos, autoria institucional, marcas e detalhes do projeto real depende de autorização dos respectivos responsáveis.
