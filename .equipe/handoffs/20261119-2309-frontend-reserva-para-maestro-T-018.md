[HANDOFF] De: Frontend-Reserva → Para: Maestro
Tarefa: T-018 — B-006 — contraste de texto sobre fundos tingidos
Status: concluído
CLI usada: codex (reserva)
O que foi feito: Troquei roxo por lilás médio nos nove textos e no extremo roxo dos oito títulos com gradiente. Mantive os acentos decorativos. Menor contraste após a correção: 6,18:1. Varredura do DOM nas quatro abas do Dashboard sem texto sólido restante na cor roxa.
Arquivos alterados: src/components/{ProjectCard,VisualProofSection,ProcessSection,CTASection,InteractiveDashboardMockup}.tsx e src/styles/globals.css.
Como verificar: Porta 5180 em 360 e 1440 px, console sem erros. Amostrei o fundo renderizado sob os pixels de texto, com e sem a pintura dos glifos. Comparei #8B5CF6 e #A78BFA contra esse mesmo fundo. Nos títulos, usei o extremo mais escuro de cada gradiente como limite conservador. Capturas em .equipe/relatorios/frontend-qa. Typecheck, build e lint passaram. Vitest 2/2 na repetição. E2E 14 passaram, 1 skip previsto.
Pendências/riscos: A primeira execução do Vitest atingiu o timeout do axe e a repetição passou sem alteração. O E2E usa 5182 na configuração do Testador.

| Texto | 360 px, antes → depois (razão :1) | 1440 px, antes → depois (razão :1) |
| --- | --- | --- |
| ProjectCard — 6+ | 4,19 → 6,52 | 3,97 → 6,18 |
| Prova visual — KPIs em tempo real | 4,27 → 6,64 | 4,27 → 6,64 |
| Prova visual — Gráficos interativos | 4,27 → 6,64 | 4,27 → 6,64 |
| Prova visual — Visão estratégica | 4,27 → 6,64 | 4,27 → 6,64 |
| Prova visual — Agente | 4,22 → 6,57 | 4,23 → 6,59 |
| Processo — 01 | 4,07 → 6,34 | 4,07 → 6,34 |
| Processo — 05 | 4,07 → 6,34 | 4,07 → 6,34 |
| CTA — Iniciado | 4,00 → 6,22 | 3,99 → 6,21 |
| Dashboard / Carregamentos — hoje | 4,40 → 6,84 | 4,40 → 6,84 |
| Hero — operar no próximo nível | 4,02 → 6,25 | 4,28 → 6,66 |
| Serviços — operar com mais controle | 4,65 → 7,24 | 4,65 → 7,24 |
| Público-alvo — sair do improviso | 4,65 → 7,24 | 4,65 → 7,24 |
| Projetos — acelerar sua operação | 4,62 → 7,19 | 4,62 → 7,19 |
| Prova visual — em ação | 4,65 → 7,24 | 4,65 → 7,24 |
| Processo — sem improviso | 4,58 → 7,12 | 4,61 → 7,17 |
| Diferenciais — em vantagem operacional | 4,65 → 7,24 | 4,62 → 7,19 |
| CTA — sistema premium? | 4,47 → 6,95 | 4,49 → 6,99 |
