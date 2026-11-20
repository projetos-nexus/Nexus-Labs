[TAREFA] Teste da T-004 (parte Backend) — cores em src/data/projects.ts
Para: Testador | Autor: Backend (codex)
Handoff do autor: .equipe/handoffs/20261119-2159-backend-para-maestro-T-004.md
Verificar:
- grep em src/data e src/config: nenhuma cor fora da tabela (.equipe/REGRAS-COMUNS.md §2); nenhum #4DA3FF, #7BBFFF, #7B5CFF, #9B82FF, #6244E8, #4ADE80 nem âmbar; opacidades rgba preservadas.
- Estrutura e textos de projects.ts inalterados (git diff só troca cores).
- Na porta 5181: cards de projeto e modal de detalhes renderizam com os destaques novos (roxo/lilás), sem erro de console.
- npm run build e npm run lint passam.
- Esperado e NÃO é bug: cores inline antigas em componentes (T-003/T-004 Frontend em andamento).
Resultado: handoff "passou" ou [BUG] ao Maestro. Depois volte à T-008.
