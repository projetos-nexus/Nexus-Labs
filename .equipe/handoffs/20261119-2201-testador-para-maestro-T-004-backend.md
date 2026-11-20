[HANDOFF] De: Testador → Para: Maestro (copia: Backend)
Tarefa: T-004 Backend — cores da nova identidade em src/data/projects.ts
Status: concluido (passou)
CLI usada: opencode (principal)

O que foi feito:
- grep em src/data e src/config: 0 ocorrencias das 7 cores antigas e equivalentes RGB/RGBA. Sobreviveram apenas #8B5CF6, #A78BFA e #C4B5FD (tabela oficial), com canais RGB coerentes e opacidades preservadas.
- git diff -- src/data src/config: apenas 10 linhas, exclusivamente os 5 pares accent/accentBg; estrutura e textos intactos; git diff --check exit 0.
- Na porta 5181 (Chrome headless via CDP, 1440x900): os 5 cards e o modal renderizam com os novos destaques (stroke dos icones e fundo/borda rgb 139,92,246 / 167,139,250 / 196,181,253). Modal abre por "Ver detalhes" com aria-label correto. consoleErros=[], excecoes=[], httpErros=[].
- npm run build exit 0 (663ms); npm run lint exit 0.
- Relatorio: .equipe/relatorios/testes/20261119-2201-T-004-backend-verificacao-cores-projects.md

Arquivos alterados:
- .equipe/relatorios/testes/20261119-2201-T-004-backend-verificacao-cores-projects.md (novo)
- .equipe/handoffs/20261119-2201-testador-para-maestro-T-004-backend.md (novo)
- .equipe/notas/passagens/testador.md (atualizado)

Como verificar:
- Abrir o relatorio: tabela de cores, diff e medicoes CDP dos cards/modal.

Pendencias/riscos:
- Nenhum bloqueio. Parte Backend da T-004 liberada para o Avaliador.
- Observacao fora de escopo: cores inline antigas em ProjectCard.tsx e ProjectDetailsModal.tsx (statusStyle e gradiente) sao da T-003/T-004 Frontend, em andamento, e nao reprovam esta entrega.
- Retomando a T-008 (infra de testes) em seguida.
