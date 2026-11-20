[TAREFA] T-010 — Remover PNGs antigos sem uso em src/assets/logos
Para: Tarefas-Rapidas | Depende de: T-006 (concluída)
Critério de aceite:
- Para cada PNG em src/assets/logos/, grep em src/, index.html e public/ pelo nome do arquivo. Apague SOMENTE os que não têm nenhuma referência.
- NÃO apagar: nexus-labs-icon.png e nexus-labs-watermark-text.png (usados por BrandWatermark e InteractiveDashboardMockup), nenhum .svg, nem README.txt.
- Listar no handoff o que foi apagado e o tamanho total liberado.
- npm run build e npm run lint ok.
Arquivos/áreas: só os PNG sem uso de src/assets/logos/
Trava concedida: PNGs sem uso em src/assets/logos/ — Tarefas-Rapidas — T-010 — até a entrega
Entregar para: Maestro → Testador
Regras: branch ciclo/01-identidade (não troque de branch, não faça commit). Ao terminar: salve o [HANDOFF] em .equipe/handoffs/ e rode maestri ask "Maestro" "<handoff resumido + caminho>".
