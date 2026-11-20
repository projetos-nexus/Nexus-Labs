# [TESTE] T-004 Backend — cores da nova identidade em `src/data/projects.ts`

Resultado: **PASSOU** · Testador (opencode, principal) · 2026-11-19 22:01

Escopo conforme `.equipe/handoffs/20261119-2159-maestro-para-testador-T-004-backend.md`. Autor: Backend (codex), handoff `.equipe/handoffs/20261119-2159-backend-para-maestro-T-004.md`.

## 1. Cores em `src/data` e `src/config`

Busca pelas cores antigas e equivalentes RGB/RGBA (`#4DA3FF`, `#7BBFFF`, `#7B5CFF`, `#9B82FF`, `#6244E8`, `#4ADE80`, `#F59E0B`; `77,163,255`, `123,191,255`, `123,92,255`, `155,130,255`, `98,68,232`, `74,222,128`, `245,158,11`):

**0 ocorrências.**

Cores restantes no escopo — todas da tabela oficial (REGRAS-COMUNS §2):

| Linha | Campo | Valor | Cor da tabela | Opacidade |
|---|---|---|---|---|
| 45/46 | `accent` / `accentBg` (KMZ Nexus) | `#8B5CF6` / `rgba(139,92,246,0.12)` | roxo da marca | 0,12 |
| 77/78 | `accent` / `accentBg` (Help Desk) | `#A78BFA` / `rgba(167,139,250,0.12)` | lilás médio | 0,12 |
| 110/111 | `accent` / `accentBg` (Financeiro) | `#C4B5FD` / `rgba(196,181,253,0.1)` | lilás | 0,1 |
| 142/143 | `accent` / `accentBg` (Agente Nexus) | `#C4B5FD` / `rgba(196,181,253,0.12)` | lilás | 0,12 |
| 175/176 | `accent` / `accentBg` (Gestão Operacional) | `#8B5CF6` / `rgba(139,92,246,0.1)` | roxo da marca | 0,1 |

Os canais RGB de cada `accentBg` correspondem exatamente ao `accent` (139/92/246, 167/139/250, 196/181/253) e as opacidades originais foram preservadas.

## 2. Diff — só troca de cores

`git diff -- src/data src/config`: 10 linhas alteradas, exclusivamente os 5 pares `accent`/`accentBg`. Estrutura, textos, ícones, status, IDs e campos do modal inalterados. O âmbar `#F59E0B` de Gestão Operacional virou `#8B5CF6`. `git diff --check -- src/data src/config` → exit 0 (apenas aviso de LF→CRLF do Git, inofensivo).

## 3. Renderização na porta 5181 (Chrome headless via CDP, 1440×900)

Cards — fundo/borda do ícone e cor do link "Comprar ou adaptar" (todos os RGBs novos):

| Projeto | Fundo do ícone | Borda | `stroke` do ícone | Cor do link |
|---|---|---|---|---|
| KMZ Nexus | rgba(139,92,246,0.12) | rgba(139,92,246,0.25) | rgb(139,92,246) | — (card featured usa outro estilo) |
| Help Desk | rgba(167,139,250,0.12) | rgba(167,139,250,0.19) | rgb(167,139,250) | rgb(167,139,250) |
| Financeiro | rgba(196,181,253,0.1) | rgba(196,181,253,0.19) | rgb(196,181,253) | rgb(196,181,253) |
| Agente Nexus | rgba(196,181,253,0.12) | rgba(196,181,253,0.19) | rgb(196,181,253) | rgb(196,181,253) |
| Gestão Operacional | rgba(139,92,246,0.1) | rgba(139,92,246,0.19) | rgb(139,92,246) | rgb(139,92,246) |

Modal (abertura por "Ver detalhes" do card featured): `aria-label="Detalhes do projeto KMZ Nexus"`, `box-shadow` com `rgba(139,92,246,0.094)`, topo `linear-gradient` iniciando em `rgb(139,92,246)`, fundo do ícone `rgba(139,92,246,0.12)` e `stroke` `rgb(139,92,246)`.

Console CDP: `consoleErros=[]`, `excecoes=[]`, `httpErros=[]`.

## 4. Build e lint

```
npm run build → ✓ 2150 modules transformed, ✓ built in 663ms, exit 0
npm run lint  → exit 0, sem erros
```

## 5. Observação fora do escopo — NÃO é bug desta tarefa

O modal/cards ainda têm cores inline antigas em componentes (`#4ADE80`, `#4DA3FF`, `#9B82FF` em `statusStyle` de `ProjectCard.tsx` e `ProjectDetailsModal.tsx`, e `#4DA3FF` no gradiente do topo do modal). Conforme o handoff, isso é trabalho da T-003/T-004 Frontend, em andamento, e **não reprova** a parte Backend.

## 6. Limitação

Não foi possível inspecionar imagens visualmente neste modelo; a validação foi feita por estilos computados, diff e metadados via CDP.
