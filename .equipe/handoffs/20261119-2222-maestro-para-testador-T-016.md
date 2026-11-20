[TAREFA] Teste da T-016 — Últimas cores fora da paleta (Navbar e Home)
Para: Testador | Autor: Frontend-Reserva (codex)
Handoff do autor: .equipe/handoffs/20261119-2222-frontend-reserva-para-maestro-T-016.md
Verificar (porta 5181):
- grep em src/ (tsx/ts/css): nenhuma cor literal fora da tabela (.equipe/REGRAS-COMUNS.md §2); rgba só derivada de cores da tabela.
- Navbar: no topo, após rolar, hover dos links e do CTA, e menu mobile aberto (360/768): medidas iguais às de antes e contraste de texto ≥ 4,5:1 em todos os estados (o autor mediu 4,56:1 no CTA em hover).
- Home: fundo #0B0A12.
- src/assets/react.svg e src/assets/vite.svg removidos sem referências (extra do autor, aceito pelo Maestro).
- npm test, npm run test:e2e, build, lint.
Resultado: handoff "passou" ou [BUG] ao Maestro. Fila: depois da T-004 Frontend, antes da T-015.
