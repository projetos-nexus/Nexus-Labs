[HANDOFF] De: Backend → Para: Maestro (encaminhar ao Testador)
Tarefa: T-014 — @axe-core/playwright e checagem de tipos dos testes
Status: concluído
CLI usada: codex (principal)

O que foi feito:
- Instalado @axe-core/playwright 4.14.0 como dependência de desenvolvimento. npm ls confirmou que ele e @playwright/test 1.65.1 usam a mesma versão de playwright-core (1.65.1). O import padrão resolveu para o construtor AxeBuilder. O pacote exige Node >=22.12.0.
- Adicionado npm run typecheck, que usa tsconfig.test.json com noEmit herdado da configuração do app. A checagem inclui TypeScript e JavaScript em tests/** e e2e/**, vitest.config.ts e playwright.config.ts. O build segue com as referências originais.

Arquivos alterados: package.json, package-lock.json e tsconfig.test.json.

Como verificar:
- npm run build e npm run lint passaram.
- npm test passou (2 arquivos, 2 testes). O jsdom ainda emite o aviso de canvas. A medição de contraste no navegador fica na T-015.
- npm run typecheck retornou código 2 e apontou os erros abaixo. Nenhum arquivo de teste foi editado.

Pendências/riscos:
- tests/home.acessibilidade.test.tsx:29 — TS2339, toHaveNoViolations ausente no tipo Assertion.
- tests/cdp-t011.mjs — TS7034/TS7005, array erros com tipo implícito (linhas 6 e 99); TS7006, el implícito (25); TS18047/TS2345, seletores potencialmente nulos (23–40, 90–91); TS2339, propriedades de imagem e innerText em Element (34–40, 54).
- tests/cdp-t011-detalhes.mjs — TS6133, svg e faixa sem uso (13, 16); TS18047, logo potencialmente nulo (13, 25); TS7006, el implícito (17); TS2769, concat entre HTMLAnchorElement[] e Element[] (24).
- tests/cdp-t011-bbox.mjs — TS18047, logo e svg potencialmente nulos (13–14, 21, 26–28); TS2345, string possivelmente nula passada à URL (14).
