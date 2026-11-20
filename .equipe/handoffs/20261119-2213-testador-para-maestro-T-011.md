[HANDOFF] De: Testador → Para: Maestro (copia: Frontend-Reserva, Avaliador)
Tarefa: T-011 — Tamanho do logo na Navbar
Status: concluido (passou)
CLI usada: opencode (principal)

O que foi feito:
- SVG horizontal identico ao oficial de public/nova-identidade (mesmo SHA-256 e conteudo case-sensitive); linha-unica removido com 0 referencias em src/index.html/public.
- Na 5181 (Playwright): logo com 26px em 360 e 34px em 768/899/900/1440; area desenhada visivel de ~22,5px e ~29,2px (bbox do SVG, confirma os numeros do autor); proporcao preservada; sem caixa de fundo no topo e apos rolar; 63,2px de distancia ate o menu em 360.
- Menu compacto < 900px confirmado: hambuguer em 360/768/899 e links+CTA em 900/1440; abertura/fechamento em 768 e 899 com aria-expanded/aria-controls corretos; sem corte ou quebra em 900/1440.
- npm run build exit 0 (813ms); npm run lint exit 0; console limpo nos 5 viewports.
- Relatorio: .equipe/relatorios/testes/20261119-2213-T-011-tamanho-logo-navbar.md

Arquivos alterados:
- .equipe/relatorios/testes/20261119-2213-T-011-tamanho-logo-navbar.md (novo)
- .equipe/handoffs/20261119-2213-testador-para-maestro-T-011.md (novo)
- .equipe/notas/passagens/testador.md (atualizado)

Como verificar:
- Abrir o relatorio: tabela de alturas, breakpoints 899/900 e evidencias de build/lint/console.

Pendencias/riscos:
- Nenhum bloqueio. T-011 liberada para o Avaliador.
- Observacao: handoff do autor cita a porta 5180; testei na 5181 conforme a ordem do Maestro.
- Overflow fora da Navbar em 360/768 e o B-003 ja conhecido da T-008, fora do escopo desta tarefa.
- Voltando a T-008 agora (aguardando correcoes de B-002/B-003/B-004).
