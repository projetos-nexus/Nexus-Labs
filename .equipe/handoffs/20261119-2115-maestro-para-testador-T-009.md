[TAREFA] Teste da T-009 — Remover CSS órfão
Para: Testador | Autor: Tarefas-Rapidas (opencode)
Handoff do autor: .equipe/handoffs/20261119-2114-tarefas-rapidas-para-maestro-T-009.md
Verificar:
- src/index.css e src/App.css removidos; nenhum import restante (grep em src/ e index.html).
- npm run build e npm run lint passam.
- Site sobe (npm run dev -- --port 5181, NUNCA 5173) e o visual não mudou (fundo, fontes, seções carregam; sem erro no console).
- Ignore as alterações em package.json/package-lock.json (são da T-001, em andamento) e em src/styles (T-002, em andamento).
Resultado: se passar, envie handoff "passou" ao Maestro; se falhar, [BUG] ao Maestro. Arquivo em .equipe/relatorios/testes/ e handoff em .equipe/handoffs/.
