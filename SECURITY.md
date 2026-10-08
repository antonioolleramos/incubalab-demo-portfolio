# Segurança e separação do sistema real

## Objetivo

Permitir a avaliação pública de uma **interface fictícia**, sem exposição do código e da infraestrutura do sistema institucional que continua em produção.

## Diferenças para a aplicação institucional

O projeto profissional privado utiliza autenticação, sessões, gerenciamento de usuários, permissões, trilhas de auditoria, banco PostgreSQL/Prisma e rotas de backend, entre outras funcionalidades. São componentes mais complexos e não estão presentes nesta demo. Confira a tabela comparativa no [README](README.md).

Os recursos mencionados não representam uma avaliação formal de segurança da aplicação privada.

## O que foi deliberadamente excluído

- Qualquer parte do código-fonte original (não se trata de sanitizar o backend existente).
- Autenticação, sessões, roles, proteção de rotas, chaves, senhas e tokens.
- ORM, estrutura do banco de produção, migradores, seeds institucionais e strings de conexão.
- URLs de APIs privadas, login remoto, analytics, serviços de hospedagem ou banco institucional.
- Usuários, emails, nomes de pessoas, planilhas e dados originais.
- Logos, materiais de marca e assets visuais de terceiros.

## Arquitetura

`index.html → styles.css + app.js` (compilado de `src/app.ts`).

A amostra é renderizada inteiramente no navegador. Usa `localStorage` para cadastros fictícios; não há chamadas `fetch`, `XMLHttpRequest`, WebSocket nem código no servidor. A página pode ser servida por qualquer host de arquivos estáticos.

## Limites

- **Não é um sistema de autenticação.** Não oferece proteção de contas, armazenamento seguro de informações sensíveis ou segregação multiusuário.
- **Não use dados pessoais ou institucionais reais** no formulário: tudo permanece no navegador atual e poderia ser visto por quem tiver acesso a esse navegador.
- É uma **demonstração**, não uma substituição do produto em produção. Sua funcionalidade não atesta a segurança do sistema original.
- Publicar esta cópia não torna impossível identificar vulnerabilidades no sistema original por outros meios; reduz apenas a exposição direta do seu código privado neste repositório.
- A publicação da relação com a organização, marca ou experiência institucional pode depender de autorização dos responsáveis.

## Revisão antes de publicar

- [ ] Verificar que o repositório foi criado **vazio e separado** (não transferir histórico Git privado).
- [ ] Confirmar que o ZIP contém somente os arquivos listados no README.
- [ ] Verificar que nenhum `.env`, backup, credencial ou dado real foi adicionado.
- [ ] Não copiar do projeto em produção novos recursos sem revisão e autorização.
- [ ] Confirmar autorização antes de citar ou exibir a marca institucional no portfólio.
