[TAREFA] Teste da T-018 — B-006: textos em roxo com contraste abaixo de AA
Para: Testador | Autor: Frontend-Reserva (codex)
Handoff do autor: .equipe/handoffs/20261119-2309-frontend-reserva-para-maestro-T-018.md
Verificar (porta 5181, 360/768/1440):
- Os nós do parecer (ProjectCard '6+', VisualProof 'KPIs…'/'Agente', números de etapa do Processo, CTASection 'Iniciado') e os 9 textos + 8 títulos com gradiente alterados: contraste ≥ 4,5:1 medido contra o FUNDO REAL (composição dos tingimentos/gradientes por baixo, não só o fundo da página). Para .gradient-text, medir o ponto mais escuro do gradiente.
- Varrer TODOS os textos com cor roxo/lilás (inclusive as 4 abas do Dashboard do Hero): nenhum abaixo de 4,5:1.
- Acentos decorativos roxos (ícones, linhas, bordas) com ≥ 3:1 (não-texto).
- Só cores da tabela; visual coerente com a identidade.
- npm test, npm run test:e2e, typecheck, build, lint. ATENÇÃO: package.json/lock mudaram no S-001 (atualização de ferramentas) — se algo quebrar por isso, registre separado.
- Corrija a seção 10 do relatório da T-015 (ela afirma que esses nós já tinham sido medidos).
Resultado: handoff "passou" ou [BUG] ao Maestro.
