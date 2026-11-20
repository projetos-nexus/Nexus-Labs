[PARECER] T-004 (parte Frontend) — APROVADO
Autor: Frontend-Reserva (codex) | Avaliador: claude
Resumo: Os 8 componentes (Services, Process, TargetAudience, Diferenciais, ProjectCard, ProjectDetailsModal, Projects e Footer) ficaram sem nenhuma cor literal; tudo passou para `var(--color-*)` e `color-mix()` com tokens da tabela. As três sugestões anteriores foram atendidas: links "Comprar ou adaptar" em `--color-text` (17,8:1; antes ~4,3:1 com #8B5CF6), títulos do Footer em `--color-text-muted` (7,45:1; antes ~3,1:1) e `aria-label` do e-mail com "(abre em nova aba)".

O que avaliei como T-004: as trocas de cor nos 8 arquivos e os 3 ajustes acima. Fontes (T-005), `overflowX: clip` e largura da linha do Footer (T-012), e `aria-label`/`h2` (T-013) já foram aprovados nos respectivos pareceres.

Conferências do Avaliador:
- Contagem de hex/rgba literais nos 8 arquivos: 0 em todos. Tokens usados: `text` (80), `text-muted` (53), `roxo` (33), `lilas-mid` (28), `lilas` (25), `surface` (10), `bg` (3); todos definidos no `globals.css`.
- Não sobrou nenhuma concatenação de alfa em hex sobre o accent (`${accent}40`/`30`), que quebraria se o accent virasse token. As bordas viraram `color-mix(in srgb, ${accent} 18.8%, transparent)`, equivalente exato do antigo sufixo `30` (0x30/255 = 18,8%). A conversão é fiel.
- Modal: `role="dialog"`, `aria-modal`, foco no botão Fechar, Escape fecha e 16 textos ≥ 4,5:1 (medido pelo Testador).

Obrigatórios (bloqueiam aprovação):
- nenhum

Sugestões (não bloqueiam):
- [S1] ProjectCard.tsx:6-10 e ProjectDetailsModal.tsx:7 — `statusStyle` está **duplicado** nos dois arquivos (já era antes; a T-004 só migrou as cores nas duas cópias). Extrair para um módulo único (por exemplo, `src/data/projectStatus.ts` ou junto de `projects.ts`) evita que as cópias divirjam no ciclo 02.
- [S2] ProjectCard.tsx:7 e :9 — "Projeto pronto" e "Sob medida" ficaram com o mesmo estilo (`--color-lilas`). Hoje o selo só se distingue pelo texto. Se a diferença de status tiver valor comercial (pronto para usar × sob medida), diferenciar com outro token (por exemplo, `--color-roxo` no fundo ou na borda) ou com um ícone. Isso vale junto com a decisão de cores de status pendente da T-003 (S1).
- [S3] A medição de contraste do Testador usa o fundo do `body`. Nos links com `accentBg` (tinta de 10–12%) o contraste real é um pouco menor, mas com `--color-text` (17,8:1) a folga é enorme, então não há risco. A ressalva fica só para o S1 da T-008 (axe em navegador real).

Aderência à identidade visual: ok — zero cores fora da tabela nos 8 componentes, sem azul, verde ou âmbar.
Aderência ao requisito: ok — cores migradas para tokens, contraste AA nos pontos apontados e nome acessível do e-mail completo. As cores restantes em `Navbar.tsx` e `pages/Home.tsx` estão corretamente fora do escopo (T-016).
Verificação do Testador: conferida — 0 literais, 5 links medidos em 3 viewports, títulos do Footer, interação do modal, test 2/2, e2e 10 passed/2 skipped (skips intencionais), build e lint com exit 0.
