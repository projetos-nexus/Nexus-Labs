[TAREFA] Teste da T-003 — Tokens unificados, MotionConfig e cores inline (Hero, Dashboard, Prova visual, CTA)
Para: Testador | Autor: Frontend-Reserva (codex)
Handoff do autor: .equipe/handoffs/20261119-2213-frontend-reserva-para-maestro-T-003.md
Verificar (porta 5181):
- globals.css: uma só nomenclatura (roxo, lilas, lilas-mid, selo, text-muted); nenhum --color-purple*/--color-muted; só cores da tabela.
- Hero.tsx, InteractiveDashboardMockup.tsx, VisualProofSection.tsx, CTASection.tsx: nenhuma cor hex/rgba literal fora da tabela; nada de azul/verde; orbe do Hero em roxo/lilás.
- MotionConfig reducedMotion="user" em App.tsx: com emulação prefers-reduced-motion: reduce, animações do framer-motion (entrada do Hero, contadores, dashboard) não se movem.
- Visual coerente em 360/768/1440 (sem regressão grave de contraste/legibilidade; texto sobre fundo ≥ 4,5:1 nos blocos alterados).
- npm test, npm run test:e2e (B-003 de overflow ainda esperado — T-012), build e lint.
- Esperado e NÃO é bug: fontes ainda Space Grotesk/Google (T-005), cores antigas em Services/Process/TargetAudience/Diferenciais/ProjectCard/Modal/Footer (T-004 Frontend).
Resultado: handoff "passou" ou [BUG] ao Maestro.
