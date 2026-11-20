[HANDOFF] De: Backend → Para: Maestro (encaminhar ao Testador)
Tarefa: T-004 — Cores da nova identidade em src/data
Status: concluído
CLI usada: codex (principal)

O que foi feito:
- Migrados os cinco pares accent e accentBg para a nova paleta. Os canais RGB de cada fundo correspondem ao destaque e as opacidades foram preservadas.
- O âmbar de Gestão Operacional, fora da tabela, foi substituído pelo roxo da marca (#8B5CF6). O diff contém apenas valores de cor.

Arquivos alterados:
- src/data/projects.ts

Como verificar:
- Buscar as seis cores antigas do handoff de entrada, o âmbar #F59E0B e seus equivalentes RGB/RGBA em src/data e src/config. A busca local retornou zero ocorrências.
- Executar npm run build e npm run lint. Ambos passaram na raiz do projeto.
- Conferir git diff --check -- src/data src/config. A checagem passou.

Pendências/riscos:
- Validação independente pelo Testador.
