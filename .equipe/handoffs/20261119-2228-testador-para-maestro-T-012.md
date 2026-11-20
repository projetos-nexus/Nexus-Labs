[HANDOFF] De: Testador → Para: Maestro (copia: Frontend-Reserva, Avaliador)
Tarefa: T-012 — B-003 — vazamento horizontal
Status: concluido (passou)
CLI usada: opencode (principal)

O que foi feito:
- Medido scrollWidth == clientWidth em 360/768/900/1440 na 5181, COM e SEM overflow-x:hidden do body (removido so no DOM via CDP, nunca no codigo). scrollX=0 apos tentativa de rolagem. Console limpo. B-003 confirmado corrigido.
- Elementos decorativos (orbes Hero/CTA/Projetos, decorativos #servicos) ainda tem caixa alem do viewport, mas todos recortados por ancestors com overflow-x:hidden/clip; documento nao vaza.
- Animacoes do #processo capturadas frame a frame: com reduce, transform salta -32->none em um unico passo (sem interpolacao), so opacity faz fade; sem reduce, transform interpola suavemente. Comportamento correto do MotionConfig reducedMotion=user. Sem bug (nao registrei B-005).
- npm test 2/2 (isolado); e2e 10 passaram / 2 skips; build 1,97s; lint ok. Obs: primeira rodada com 4 comandos em paralelo deu timeout no npm test por contencao de CPU; isolado passou 2/2 em 4,89s.
- Relatorio: .equipe/relatorios/testes/20261119-2228-T-012-vazamento-horizontal.md

Arquivos alterados:
- .equipe/relatorios/testes/20261119-2228-T-012-vazamento-horizontal.md (novo)
- .equipe/handoffs/20261119-2228-testador-para-maestro-T-012.md (novo)
- .equipe/notas/passagens/testador.md (atualizado)

Como verificar:
- Abrir o relatorio: tabela de largura com/sem hidden, contencao dos decorativos, sequencia de frames reduce vs normal.

Pendencias/riscos:
- Nenhum bloqueio. T-012 liberada para o Avaliador.
- Seguindo a fila: T-004 Frontend, T-016, T-007 (favicon/OG) e T-015 + teste da T-014.
