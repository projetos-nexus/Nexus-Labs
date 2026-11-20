[TAREFA] Teste da T-012 — B-003: vazamento horizontal em 360/768
Para: Testador | Autor: Frontend-Reserva (codex)
Handoff do autor: .equipe/handoffs/20261119-2216-frontend-reserva-para-maestro-T-012.md
Verificar:
- npm run test:e2e: testes de "não tem rolagem horizontal" passando em 360, 768 e 1440 (scrollWidth ≤ clientWidth + 1). Conferir também 900.
- Diagnóstico original (seção 5 do seu relatório da T-008): orbes de Hero, CTASection, ProjectsSection/ProjectCard, ProcessSection, ServicesSection — confirme que nenhuma vaza, mesmo SEM o overflow-x: hidden do body (teste removendo-o temporariamente via DevTools/CDP, não no código).
- Visual no desktop (1440) sem mudança perceptível nas orbes e na seção Processo; animações de entrada dos cartões do Processo continuam (e respeitam reduced-motion).
- npm test, build, lint.
Resultado: handoff "passou" ou [BUG] ao Maestro. Fila: depois da T-005, antes da T-015.
