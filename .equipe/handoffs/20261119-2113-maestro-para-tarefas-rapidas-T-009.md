[TAREFA] T-009 — Remover CSS órfão
Para: Tarefas-Rapidas | Depende de: nenhuma
Contexto: src/index.css e src/App.css são do template Vite e não são importados (main.tsx só importa ./styles/globals.css).
Critério de aceite:
- Confirmar com grep que nenhum arquivo em src/ importa index.css ou App.css; se algum importar, PARE e me avise.
- Apagar src/index.css e src/App.css.
- npm run build e npm run lint passando (informar saída real).
- Não tocar em nenhum outro arquivo. (A limpeza dos PNGs sem uso fica para depois da T-006.)
Arquivos/áreas: src/index.css, src/App.css
Trava concedida: src/index.css e src/App.css — Tarefas-Rapidas — T-009 — até a entrega
Entregar para: Maestro → Testador
Branch: ciclo/01-identidade (não troque de branch, não faça commit). Decisões do Kaio em .equipe/notas/MAESTRO-ESTADO.md; auditoria em .equipe/pesquisas/P-001-auditoria-identidade.md. Mantenha sua passagem atualizada. Ao terminar: salve o [HANDOFF] em .equipe/handoffs/ e rode maestri ask "Maestro" "<handoff resumido + caminho do arquivo>". Eu repasso ao Testador.
