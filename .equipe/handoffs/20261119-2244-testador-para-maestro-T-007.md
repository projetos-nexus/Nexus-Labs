[HANDOFF] De: Testador → Para: Maestro (copia: Backend, Avaliador)
Tarefa: T-007 — Favicon, apple-touch, theme-color e OG provisoria
Status: concluido (passou)
CLI usada: opencode (principal)

O que foi feito:
- favicon.svg byte-identico ao oficial logo-icone-nx-fundo-escuro.svg (hash SHA-256); cores #F4F3F8 e #8B5CF6 da tabela.
- PNGs 32x32 (679B), 48x48 (1001B), apple-touch 180x180 (3603B, sem alfa), todos com fundo #0B0A12 e proporcao do conteudo ~1,92 (oficial 1,914) — sem distorcao. Script usa fit:contain + flatten e logo horizontal oficial centralizado na OG 1200x630 (19337B < 300KB).
- index.html: theme-color #0B0A12, og/twitter image apontando a OG nova, og:image:alt e og:locale pt_BR, lang pt-BR, 0 ocorrencias de seudominio.com.br. og:url/canonical ausentes com TODO (decisao do Kaio — esperado, nao bug).
- GET direto aos 5 arquivos na 5181: todos HTTP 200 com content-type correto; 0 falhas HTTP; console limpo. Chromium headless nao pede favicon sozinho, entao validei via API.
- favicon.png redundante removido de src/assets/logos com 0 referencias; README.txt lista so os 4 arquivos existentes.
- npm test 2/2; e2e 10 passaram / 2 skips; build 1,15s; lint ok.
- Relatorio: .equipe/relatorios/testes/20261119-2244-T-007-favicon-og.md

Arquivos alterados:
- .equipe/relatorios/testes/20261119-2244-T-007-favicon-og.md (novo)
- .equipe/handoffs/20261119-2244-testador-para-maestro-T-007.md (novo)
- .equipe/notas/passagens/testador.md (atualizado)

Como verificar:
- Abrir o relatorio: tabela de arquivos/dimensoes, tags do index.html, GETs HTTP 200 e limpeza.

Pendencias/riscos:
- Nenhum bloqueio. T-007 liberada para o Avaliador.
- Limitacao: nao inspecionei imagens visualmente; validacao por bytes/dimensoes/cores/proporcoes e uso dos SVGs oficiais.
- Proxima e ultima: T-015 + teste da T-014.
