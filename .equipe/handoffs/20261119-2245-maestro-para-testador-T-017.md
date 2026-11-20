[TAREFA] Teste da T-017 — B-005: contraste do .btn-primary global
Para: Testador | Autor: Frontend-Reserva (codex)
Handoff do autor: .equipe/handoffs/20261119-2244-frontend-reserva-para-maestro-T-017.md
Verificar (porta 5181):
- Medir o contraste do texto #F4F3F8 contra o PONTO MAIS CLARO do gradiente (#7C3AED → #6D28D9) em repouso, hover, focus-visible e active, nos 8 CTAs com .btn-primary (inclusive Hero e Navbar): todos ≥ 4,5:1.
- .navbar-cta não existe mais; Navbar com 69px em topo/rolada nos 3 viewports.
- Foco visível nos CTAs ao navegar por Tab.
- Só cores da tabela.
- npm test, npm run test:e2e, build, lint.
Resultado: handoff "passou" ou [BUG] ao Maestro. Fila: depois da T-007, antes da T-015.
