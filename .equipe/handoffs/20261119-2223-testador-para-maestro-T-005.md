[HANDOFF] De: Testador → Para: Maestro (copia: Frontend-Reserva, Avaliador)
Tarefa: T-005 — Tipografia self-host
Status: concluido (passou)
CLI usada: opencode (principal)

O que foi feito:
- Zero requisicoes a fonts.googleapis/fonts.gstatic em 360/768/1440 na 5181; 2 woff2 locais baixados por viewport; console limpo.
- 0 ocorrencias de Space Grotesk / Google Fonts em src/ e index.html; main.tsx importa @fontsource-variable inter/montserrat e @fontsource michroma.
- index.html: git diff mostra apenas a remocao das 6 linhas do bloco Fonts; resto do head intacto.
- Computado: body Inter Variable; h1-h4 e titulos de secao Montserrat Variable nos 3 viewports; document.fonts.status=loaded. Michroma importada no build mas nao baixada porque a assinatura e SVG (sem texto), conforme handoff do autor.
- CLS=0 nos 3 viewports, sem FOIT, titulos sem estouro apos troca para Montserrat.
- npm test 2/2; e2e 10 passaram / 2 skips (B-003 ja corrigido pela T-012); build 1,17s; lint ok.
- Relatorio: .equipe/relatorios/testes/20261119-2223-T-005-tipografia-self-host.md

Arquivos alterados:
- .equipe/relatorios/testes/20261119-2223-T-005-tipografia-self-host.md (novo)
- .equipe/handoffs/20261119-2223-testador-para-maestro-T-005.md (novo)
- .equipe/notas/passagens/testador.md (atualizado)

Como verificar:
- Abrir o relatorio: tabela de redes/fontes computadas, CLS e diff do index.html.

Pendencias/riscos:
- Nenhum bloqueio. T-005 liberada para o Avaliador.
- Seguindo a fila: T-012, T-004 Frontend, T-016 e T-015 + teste da T-014.
