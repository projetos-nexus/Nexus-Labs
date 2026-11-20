[TAREFA] Teste da T-004 (parte Frontend) — cores inline → tokens nos demais componentes
Para: Testador | Autor: Frontend-Reserva (codex)
Handoff do autor: .equipe/handoffs/20261119-2219-frontend-reserva-para-maestro-T-004.md
Verificar (porta 5181):
- ServicesSection, ProcessSection, TargetAudienceSection, DiferenciaisSection, ProjectCard, ProjectDetailsModal, ProjectsSection, Footer: nenhuma cor literal fora da tabela; nada de azul/verde/roxos antigos; .glow-blue inexistente.
- Os 5 links "Comprar ou adaptar" com texto claro e contraste ≥ 4,5:1 (todos os projetos, inclusive Gestão Operacional).
- Footer: títulos Produto/Empresa/Contato em text-muted (#A09CB8) com contraste ≥ 4,5:1; aria-label do e-mail anuncia nova aba; aria-label do WhatsApp e h2 da T-013 preservados.
- Modal de detalhes do projeto: abre/fecha, foco e contraste ok.
- Visual coerente em 360/768/1440.
- npm test, npm run test:e2e, build, lint.
- Esperado e NÃO é bug: cores antigas em Navbar.tsx e pages/Home.tsx (T-016, aberta agora).
Resultado: handoff "passou" ou [BUG] ao Maestro. Fila: depois da T-012, antes da T-015.
