[PARECER] T-004 (parte Backend) — APROVADO
Autor: Backend (codex) | Avaliador: claude
Resumo: Os 5 pares `accent`/`accentBg` de `src/data/projects.ts` foram migrados para cores da tabela oficial. Os canais RGB do fundo batem com o destaque e as opacidades originais foram preservadas. O âmbar #F59E0B saiu. O diff tem só 10 linhas de valores de cor; estrutura, textos e IDs ficaram intactos.

Obrigatórios (bloqueiam aprovação):
- nenhum

Sugestões (não bloqueiam esta parte; encaminhar para a T-004 Frontend):
- [S1] (importante, acessibilidade) ProjectCard.tsx:232-234 — o link "Comprar ou adaptar" usa `color: accent` em texto de 0,78rem/600 sobre `accentBg`. Com #8B5CF6 (Gestão Operacional, card não destacado), o contraste fica abaixo de AA. Medi 4,42:1 sobre #13101F e estimo ~4,2:1 com o fundo tingido de 10%; o mínimo é 4,5:1. O âmbar anterior não tinha esse problema, então é uma regressão de contraste introduzida pela troca. #A78BFA (6,9:1) e #C4B5FD (10,1:1) passam. Há duas correções possíveis. (a) No componente, a T-004 Frontend usa uma cor de texto clara (por exemplo, #C4B5FD ou #F4F3F8) e deixa o `accent` só para ícone, borda e fundo. Essa é a que eu prefiro, porque mantém o roxo da marca nos destaques. (b) Nos dados, trocar o `accent` de Gestão Operacional para #A78BFA. O Maestro decide qual seguir; o Testador deve medir o contraste ao fechar a T-004.
- [S2] projects.ts:110/142 e 45/175 — com só 3 cores para 5 projetos, há pares iguais: Financeiro e Agente Nexus em #C4B5FD, KMZ Nexus e Gestão Operacional em #8B5CF6. Isso é coerente com a paleta restrita da identidade. Se a diferenciação por cor for desejada, ela deve vir de outro recurso (ícone ou categoria), não de cores fora da tabela.

Aderência à identidade visual: ok — todas as cores são da tabela de REGRAS-COMUNS §2 (#8B5CF6, #A78BFA, #C4B5FD), sem azul, verde ou âmbar.
Aderência ao requisito: ok — só valores de cor alterados em `src/data`; nada em `src/config` precisou mudar.
Verificação do Testador: conferida — busca das cores antigas com 0 ocorrências, cores computadas nos cards e no modal via CDP, build e lint com exit 0, console limpo. O contraste do link não foi medido pelo Testador (ver S1).
