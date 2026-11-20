# [TESTE] T-011 — Tamanho do logo na Navbar

Resultado: **PASSOU** · Testador (opencode, principal) · 2026-11-19 22:13

Escopo conforme `.equipe/handoffs/20261119-2210-maestro-para-testador-T-011.md`. Autor: Frontend-Reserva (codex), início pelo Frontend principal (antigravity). Handoff do autor: `.equipe/handoffs/20261119-2210-frontend-reserva-para-maestro-T-011.md`.

Observação: o handoff do autor cita a porta 5180; o teste foi feito na **5181** conforme a ordem do Maestro (a 5181 já estava ativa).

## 1. SVG oficial e limpeza do antigo

- `src/assets/logos/logo-nexus-labs-horizontal.svg` e `public/nova-identidade/svg/logo-horizontal-fundo-escuro.svg` têm o **mesmo SHA-256** (`992ED6553B1AA928B2BA0EDB7024A30FE43C6FDF52F87B57F58F9BC6C438BA70`) e conteúdo idêntico na comparação case-sensitive. Área somente leitura de `public/nova-identidade/` preservada.
- `logo-nexus-labs-linha-unica.svg` foi removido (`git status`: ` D`) e há **0 referências** a ele em `src/`, `index.html` e `public/` (fora `nova-identidade`). O novo SVG é importado em `src/components/Navbar.tsx:4` e usado no `<img class="navbar-logo">`.
- `git diff` de `Navbar.tsx`: troca do import/src, remoção do `style` inline do `<img>` e mudança dos media queries (ver item 3).

## 2. Altura visível e proporção (Playwright, 5181)

| Viewport | Caixa do `<img>` | Área desenhada visível* | Proporção render / natural |
|---|---|---|---|
| 360×900 | 26,00 px | ~22,5 px | 8,1076 / 8,1081 |
| 768×900 | 34,00 px | ~29,2 px | 8,1080 / 8,1081 |
| 899×900 | 34,00 px | ~29,2 px | 8,1080 / 8,1081 |
| 900×900 | 34,00 px | ~29,2 px | 8,1080 / 8,1081 |
| 1440×900 | 34,00 px | ~29,2 px | 8,1080 / 8,1081 |

\* O SVG tem `viewBox="0 0 450 55.92"` com `width="600" height="74"`; o `getBBox()` do conteúdo desenhado é `y=2.98, height=47.71`, ou seja, ~85% do viewBox. Por isso a área efetivamente visível (29,2 px / 22,5 px) é menor que a caixa do elemento (34 px / 26 px). **As duas medições atendem ao critério**: 28–34 px em 768/1440 e ≥ 22 px em 360. Os números confirmam os do autor do handoff (29,25 px e 22,5 px).

- Proporção preservada (diferença < 0,001); nenhuma distorção.
- `background-color` do `<img>` = `rgba(0, 0, 0, 0)` em 1440 **no topo e após rolar até 300 px** — sem caixa de fundo. O `<header>` passa de transparente para `rgba(11, 11, 15, 0.88)` ao rolar, conforme esperado; isso não é caixa no logo.
- Em 360: distância entre a borda direita do logo (234,8 px) e a borda esquerda do botão do menu (298 px) = **63,2 px** — sem sobreposição.
- `carregado=true` (natural 600×74) em todos os viewports.

## 3. Mudança de comportamento: menu compacto abaixo de 900 px

| Viewport | Hambúrguer (`.show-mobile`) | Links + CTA (`.hidden-mobile`) |
|---|---|---|
| 360 | visível | ocultos |
| 768 | visível | ocultos |
| 899 | visível | ocultos |
| 900 | oculto | visíveis (4 links + CTA) |
| 1440 | oculto | visíveis (4 links + CTA) |

Abertura/fechamento por clique testado em **768 e 899**:

```
antes:     aria-expanded="false", sem aria-controls
aberto:    aria-expanded="true", aria-controls="mobile-nav-menu", #mobile-nav-menu visível
fechado:   aria-expanded="false", sem aria-controls, #mobile-nav-menu removido do DOM
```

Sem corte ou quebra em 900/1440: os 4 links e o CTA estão na mesma linha (`top` idêntico), o CTA termina em 876 px (900) e 1296 px (1440) — dentro do viewport — e há 14,8 px de folga entre o logo (termina em 299,67 px) e o primeiro link (começa em 314,5 px) em 900.

A implementação usa `@media (width < 900px)` e `@media (min-width: 900px)` em `Navbar.tsx:167-179`, aplicando `display: flex !important` / `none !important` aos dois grupos.

## 4. Build, lint e console

```
npm run build → ✓ 2150 modules transformed, ✓ built in 813ms, exit 0
                dist traz logo-nexus-labs-horizontal-DxOxEQbw.svg (18,07 kB)
npm run lint  → exit 0, sem erros
console (5181, 360/768/899/900/1440) → erros=[], pageerror=[]
```

## 5. Observação

O autor relatou "overflow fora da Navbar em 360 e 768" e "lint inicial encontrou test-results em remoção concorrente". O overflow é o **B-003** já registrado na T-008 (elementos decorativos `position:absolute`, com `body{overflow-x:hidden}`), fora do escopo desta tarefa. O lint rodou limpo agora. Nenhum código de produção foi alterado pelo Testador; nenhum commit/branch foi feito.
