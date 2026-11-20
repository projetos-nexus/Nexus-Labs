[HANDOFF] De: Testador → Para: Maestro (copia: Avaliador, Backend, Frontend)
Tarefa: T-008 — Infraestrutura de testes (Vitest + axe + Playwright 360/768/1440)
Status: concluido (infra pronta e funcional; suites vermelhas apenas por bugs reais do site)
CLI usada: opencode (principal)

O que foi feito:
- Criados vitest.config.ts (jsdom + jest-dom + setup), tests/setup.ts, tests/home.smoke.test.tsx e tests/home.acessibilidade.test.tsx.
- Criados playwright.config.ts (webServer na porta 5182, nunca 5173) e e2e/home.spec.ts com 3 viewports (360x740, 768x1024, 1440x900) e 4 testes (console, overflow, links, menu mobile 360 por clique e teclado).
- Confirmado que vitest-axe@0.1.0 FUNCIONA com vitest 5.1.1 (matcher executou e reportou violacoes corretamente). NAO pedir troca ao Backend.
- Instalado o Chromium do Playwright no usuario (C:\Users\1kmz\AppData\Local\ms-playwright\chromium-1255 + headless shell + ffmpeg). Nenhuma dependencia de package.json alterada.
- npm run build exit 0 (1.01s); npm run lint exit 0.
- npm test: 1 passou / 1 falhou -> B-002 (serious link-name, 2 links de icone do Footer) e B-004 (moderate heading-order, logado sem mascarar).
- npm run test:e2e: 8 passaram / 2 falharam / 2 skips -> B-003 (conteudo 480px em 360 e 776px em 768; scrollX=0 porque body tem overflow-x:hidden).
- Relatorio completo: .equipe/relatorios/testes/20261119-2208-T-008-infra-testes.md

Arquivos alterados:
- vitest.config.ts, playwright.config.ts (novos)
- tests/setup.ts, tests/home.smoke.test.tsx, tests/home.acessibilidade.test.tsx (novos)
- e2e/home.spec.ts (novo)
- .equipe/relatorios/testes/20261119-2208-T-008-infra-testes.md (novo)
- .equipe/handoffs/20261119-2208-testador-para-maestro-T-008.md (novo)
- .equipe/notas/passagens/testador.md (atualizado)

Como verificar:
- Rodar npm test e npm run test:e2e. A infra sobe sozinha na 5182. Bugs B-002/B-003/B-004 estao no relatorio com passos, evidencia e arquivos provaveis.

Pendencias/riscos:
- Encaminhar B-002 e B-004 ao Frontend (Footer: aria-label nos links de icone e hierarquia de headings) e B-003 ao Frontend (elementos decorativos absolute com largura fixa em Hero/CTA/Projects/Process/Services e CTA hidden-mobile da Navbar).
- As suites foram deixadas vermelhas de proposito, sem skip/filtro/mascaramento, conforme o criterio (falhar so por problema real do site, documentado como BUG).
- Depois das correcoes, reexecutar npm test e npm run test:e2e para fechar a T-008.
- Nenhum commit/branch feito; nenhum codigo de producao alterado.
