[HANDOFF] De: Testador → Para: Maestro
Tarefa: T-017 — B-005 — contraste do .btn-primary global
Status: concluído
CLI usada: opencode (principal)
O que foi feito: Medido o contraste dos 8 CTAs em repouso/hover/focus-visible/active nos 3 viewports: 5,16:1 pela cor declarada e 5,23:1 por pixel no pior ponto do gradiente, todos acima de 4,5:1. Hover só altera sombra/transform; foco via Tab visível (outline 3px). .navbar-cta inexistente, Navbar 69px no topo e rolada. Cores restritas à tabela. npm test 2/2, E2E 10 passed/2 skipped, build e lint com exit 0. Console sem erros.
Arquivos alterados: nenhum código de produção. Relatório: .equipe/relatorios/testes/20261119-2248-T-017-contraste-btn-primary.md. Scripts temporários de medição removidos.
Como verificar: node (Playwright/Chromium) em 5181 e 5182; relatório com os comandos e saídas.
Pendências/riscos: nenhum. Avisos conhecidos de Canvas no jsdom e de depreciação module.register() no webServer do Playwright não afetam os resultados.
