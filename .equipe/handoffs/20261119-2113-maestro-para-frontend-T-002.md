[TAREFA] T-002 — Paleta nova nos tokens (globals.css)
Para: Frontend | Depende de: nenhuma
Contexto: Kaio decidiu remover o azul (#4DA3FF/#7BBFFF) e o verde (#4ADE80); o lilás médio #A78BFA substitui o azul. Tabela oficial em .equipe/REGRAS-COMUNS.md seção 2; mapeamento sugerido em P-001 Anexo A.1.
Critério de aceite:
- src/styles/globals.css: @theme com a paleta oficial (bg #0B0A12, surface #13101F, border #3A3550, text #F4F3F8, muted #A09CB8, roxo #8B5CF6, lilás #C4B5FD, lilás médio #A78BFA, selo #7C3AED). Sem nenhuma cor fora da tabela no arquivo (rgba derivadas das cores da tabela são permitidas).
- Remover tokens --color-blue*; .gradient-text e .glow-blue/glows passam a usar só roxo/lilás (renomear .glow-blue se fizer sentido e manter alias até T-003/T-004 trocarem os usos, para não quebrar componentes).
- --color-text-subtle e textos secundários com contraste ≥ 4,5:1 sobre o fundo (use #A09CB8).
- Adicionar @media (prefers-reduced-motion: reduce) desligando animações/transições CSS.
- Não mexer em componentes nesta tarefa (cores inline são T-003/T-004).
- npm run build e npm run lint passando; verificar no navegador (porta diferente de 5173, ex.: npm run dev -- --port 5180) que nada quebrou visualmente.
Arquivos/áreas: src/styles/globals.css
Trava concedida: nenhuma
Entregar para: Maestro → Testador
Branch: ciclo/01-identidade (não troque de branch, não faça commit). Decisões do Kaio em .equipe/notas/MAESTRO-ESTADO.md; auditoria em .equipe/pesquisas/P-001-auditoria-identidade.md. Mantenha sua passagem atualizada. Ao terminar: salve o [HANDOFF] em .equipe/handoffs/ e rode maestri ask "Maestro" "<handoff resumido + caminho do arquivo>". Eu repasso ao Testador.
