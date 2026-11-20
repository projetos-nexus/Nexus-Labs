[TAREFA] T-018 — B-006: textos em roxo com contraste abaixo de AA
Para: Frontend-Reserva | Depende de: nenhuma
Contexto: Achado do Avaliador na reavaliação da T-015 (.equipe/relatorios/avaliacao/T-014-T-015.md): o axe marca esses nós como "incomplete" (fundo tingido/gradiente), então o teste automático não os reprova, mas a medição manual deu 4,0–4,2:1, abaixo de 4,5:1.
Casos conhecidos (procure outros iguais): ProjectCard ('6+'), VisualProofSection ('KPIs…', 'Agente'), ProcessSection (números das etapas), CTASection ('Iniciado', provável).
Critério de aceite:
- Todo TEXTO em roxo #8B5CF6 (token roxo) sobre fundo escuro/tingido passa a lilas-mid (#A78BFA) ou lilas (#C4B5FD), com contraste ≥ 4,5:1 medido contra o fundo REAL (inclusive tingimentos/gradientes). Roxo continua permitido em ícones, bordas, linhas e fundos (não-texto, mínimo 3:1).
- Varrer todos os componentes por texto com cor roxo e listar no handoff cada ocorrência, antes/depois e contraste medido.
- Só cores da tabela; visual coerente em 360/1440.
- npm test, npm run test:e2e, typecheck, build, lint.
Arquivos/áreas: src/components/**, src/styles/globals.css se necessário
Entregar para: Maestro → Testador
Regras: branch ciclo/01-identidade (não troque de branch, não faça commit). Porta 5180. Ao terminar: salve o [HANDOFF] em .equipe/handoffs/ e rode maestri ask "Maestro" "<handoff resumido + caminho>".
