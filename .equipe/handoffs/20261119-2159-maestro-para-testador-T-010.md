[TAREFA] Teste da T-010 — Remover PNGs antigos sem uso
Para: Testador | Autor: Tarefas-Rapidas (opencode)
Handoff do autor: .equipe/handoffs/20261119-2159-tarefas-rapidas-para-maestro-T-010.md
Verificar:
- Os 9 PNG removidos de src/assets/logos/ não são referenciados em src/, index.html ou public/.
- Mantidos: nexus-labs-icon.png, nexus-labs-watermark-text.png, SVGs, README.txt. Observação do Maestro: src/assets/logos/favicon.png foi mantido porque o grep casou com /favicon.png do index.html, que é o arquivo de public/ — confirme se o de src/assets/logos é de fato usado; se não for, registre como observação (não é bug da T-010).
- Na porta 5181: Navbar, Footer, marca d'água e mockup do Hero exibem imagens; nenhuma requisição 404; console limpo.
- npm run build e npm run lint passam.
Resultado: handoff "passou" ou [BUG] ao Maestro. Depois volte à T-008.
