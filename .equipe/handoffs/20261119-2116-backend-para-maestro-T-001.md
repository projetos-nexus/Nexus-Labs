[HANDOFF] De: Backend → Para: Maestro (encaminhar ao Testador e ao Frontend)
Tarefa: T-001 — Higiene, fontes self-host e dependências de teste
Status: concluído
CLI usada: codex (principal)

O que foi feito:
- Retirado react-router-dom após busca sem ocorrências de react-router em src/. O diff anterior do lockfile continha ajustes de dependências opcionais do Rolldown e de metadados de peers. O npm atualizou o lockfile junto com o manifesto.
- Instalados os pacotes Fontsource para Inter, Montserrat e Michroma. O Google Fonts permanece em index.html até a T-005 aplicar estes imports e trocar as famílias no CSS:
  - import '@fontsource-variable/inter' — família 'Inter Variable', pesos 100–900.
  - import '@fontsource-variable/montserrat' — família 'Montserrat Variable', pesos 100–900.
  - import '@fontsource/michroma/400.css' — família 'Michroma', peso 400.
- Instaladas as dependências de desenvolvimento vitest, @testing-library/react, @testing-library/jest-dom, jsdom, vitest-axe e @playwright/test. Scripts test (vitest run) e test:e2e (playwright test) prontos para a T-008, que fará as configurações e suítes.

Arquivos alterados: package.json e package-lock.json. Registro de passagem em .equipe/notas/passagens/backend.md.

Como verificar:
- npm ci --no-audit passou em uma cópia limpa com os mesmos manifesto e lockfile. Na raiz, npm ci encontrou EPERM ao tentar remover um binário do Lightning CSS em uso. npm install --no-audit recompôs as dependências da raiz.
- npm run build e npm run lint passaram na raiz e na cópia. Os três caminhos CSS de Fontsource resolveram para arquivos instalados e suas famílias foram conferidas.
- npm test e npm run test:e2e iniciaram as respectivas ferramentas na cópia limpa e retornaram código 1 por ausência de testes. A T-008 proverá as suítes.
- git diff --check passou para os dois arquivos de dependências.

Pendências/riscos:
- O npm reportou 19 vulnerabilidades antes e depois de adicionar as dependências de teste (1 baixa, 10 moderadas, 8 altas). O npm também emitiu um aviso sobre o script de instalação do sharp.
- A cópia de validação ficou em .maestri/validacao-t001 (ignorada pelo Git). A política do executor bloqueou a remoção recursiva.
