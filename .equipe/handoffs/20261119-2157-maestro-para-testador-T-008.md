[TAREFA] T-008 — Infraestrutura de testes (smoke + acessibilidade + e2e responsivo)
Para: Testador | Depende de: T-001 (concluída)
Contexto: dependências já instaladas (vitest, @testing-library/react, @testing-library/jest-dom, jsdom, vitest-axe, @playwright/test) e scripts "test" e "test:e2e" no package.json. Sugestão do Avaliador: confirmar que vitest-axe@0.1.0 funciona com vitest 5; se não, peça a troca ao Maestro (só o Backend mexe no package.json).
Critério de aceite:
- vitest.config.ts (jsdom, setup com jest-dom) + tests/: smoke que renderiza <App/> sem erro e teste axe sem violações críticas/sérias na Home (as que existirem hoje viram [BUG], sem mascarar).
- playwright.config.ts com webServer na porta 5182 (nunca 5173) e viewports 360x740, 768x1024, 1440x900 (Chromium). e2e/: Home carrega sem erro de console, sem rolagem horizontal, menu mobile abre/fecha em 360, links principais visíveis.
- npm test e npm run test:e2e passando (ou falhando só por problema real do site, documentado como [BUG]).
- Pode instalar o Chromium do Playwright (npx playwright install chromium) no usuário; informe no handoff.
- Escreva testes estáveis: a estrutura de páginas vai mudar no ciclo 02, então evite depender de textos que vão mudar; prefira papéis/landmarks.
Arquivos/áreas: vitest.config.ts, playwright.config.ts, tests/**, e2e/**, .equipe/relatorios/testes/**
Entregar para: Maestro → Avaliador
Regras: branch ciclo/01-identidade (não troque de branch, não faça commit). Ao terminar: salve o [HANDOFF] em .equipe/handoffs/ e rode maestri ask "Maestro" "<handoff resumido + caminho>".
