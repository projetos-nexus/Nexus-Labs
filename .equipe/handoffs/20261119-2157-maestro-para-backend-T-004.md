[TAREFA] T-004 (parte Backend) — Cores da nova identidade em src/data
Para: Backend | Depende de: nenhuma
Contexto: projects.ts tem cores de destaque com o azul antigo e roxos antigos. O Kaio decidiu remover azul e verde; o lilás médio #A78BFA substitui o azul.
Critério de aceite:
- Em src/data/** e src/config/**, toda cor passa a ser da tabela de .equipe/REGRAS-COMUNS.md §2: #4DA3FF→#A78BFA, #7BBFFF→#C4B5FD, #7B5CFF→#8B5CF6, #9B82FF→#C4B5FD, #6244E8→#7C3AED, #4ADE80→#C4B5FD; rgba equivalentes com os canais da cor nova.
- Não mudar estrutura de dados nem textos.
- grep sem nenhuma dessas cores antigas em src/data e src/config; build e lint ok.
Arquivos/áreas: src/data/**, src/config/**
Entregar para: Maestro → Testador
Regras: branch ciclo/01-identidade (não troque de branch, não faça commit). Ao terminar: salve o [HANDOFF] em .equipe/handoffs/ e rode maestri ask "Maestro" "<handoff resumido + caminho>".
