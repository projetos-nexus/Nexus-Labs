# [TESTE] T-016 — Últimas cores fora da paleta (Navbar e Home)

Resultado: **PASSOU** · Testador (opencode, principal) · 2026-11-19 22:39

Handoffs: `.equipe/handoffs/20261119-2222-maestro-para-testador-T-016.md` (Maestro) e `.equipe/handoffs/20261119-2222-frontend-reserva-para-maestro-T-016.md` (autor Frontend-Reserva/codex). Tabela de cores: `.equipe/REGRAS-COMUNS.md` §2.

## 1. Varredura de cores em `src/`

Varredura de todos os hex em `.ts/.tsx/.css`:

```
hex usados: #0B0A12,#13101F,#3A3550,#7C3AED,#8B5CF6,#A09CB8,#A78BFA,#C4B5FD,#F4F3F8
            + #4818,#4819,#4820,#4821,#887
```

Os cinco "fora da tabela" (`#4818/#4819/#4820/#4821` em `VisualProofSection.tsx:92-95` e `#887` na linha 186) são **IDs de pedidos/chamados em texto**, não cores. Nenhuma cor literal fora da tabela. As 5 `rgba()` em `src/data/projects.ts` são derivadas diretas de `#8B5CF6`, `#A78BFA` e `#C4B5FD`:

```
rgba(139,92,246,0.12) = #8B5CF6 · rgba(167,139,250,0.12) = #A78BFA
rgba(196,181,253,0.1) = #C4B5FD · rgba(196,181,253,0.12) = #C4B5FD · rgba(139,92,246,0.1) = #8B5CF6
```

- `react.svg` e `vite.svg`: **removidos** de `src/assets/` com **0 referências** em `src/` ✓
- `src/pages/Home.tsx:15`: `background: var(--color-bg)` = `#0B0A12` ✓

## 2. Navbar — estados e geometria (360/768/1440)

Playwright na 5181. Altura do `<header>` medida em todos os estados:

| Estado | 360 | 768 | 1440 |
|---|---|---|---|
| topo | 69 px | 69 px | 69 px |
| após rolar (bg `rgba(11,10,18,0.88)`) | 69 px | 69 px | 69 px |
| hover | 69 px | 69 px | 69 px |
| menu mobile aberto | 69 px | 69 px | n/a (botão oculto) |

`position: fixed` em todos; geometria idêntica à de antes ✓. `aria-expanded` do botão alterna `false → true` e o rótulo muda de "Abrir menu" para "Fechar menu" ao abrir ✓. Console/pageerror limpos (`[]`).

## 3. Contraste da Navbar

Links do menu mobile (`#mobile-nav-menu`, renderizado **fora** do `<header>`), medidos com composição correta de alpha sobre a pilha de ancestors:

```
itens Serviços/Projetos/Processo/Diferenciais: 19,02:1
CTA "Quero meu sistema premium" (menu):       19,02:1
links desktop (navbar-link, #A09CB8):          7,45:1
CTA desktop (normal):                          17,84:1 (texto puro sobre o gradiente composto)
```

**Axe `@axe-core/playwright` com regra `color-contrast`** em topo, hover e menu aberto nos 3 viewports: **0 violações** em todos os 9 cenários. Observação: o axe reportou 48-50 nós como `incomplete` (gradientes/transparências que ele não resolve sozinho) — não são falhas, mas exigem medição suplementar (feita abaixo).

### CTA desktop em hover — 4,57:1 (confere com o autor)

O CTA usa `background: linear-gradient(135deg, color-mix(--color-roxo 30%, --color-selo), --color-selo)` e `::before` branco 12% que vai a `opacity: 0.2` no hover (`Navbar.tsx:168`). Medição por pixel (screenshot + `sharp`, amostrando só o padding interno, sem texto e sem o `inset 0 1px` branco que contaminava a borda), usando a **cor de texto pura** `#F4F3F8` (não a média anti-aliased dos glifos):

| Estado | Pior pixel | Média do fundo |
|---|---|---|
| normal | **4,75:1** | 4,95:1 |
| hover | **4,57:1** | 4,87:1 |

O resultado do hover (4,57:1) **confere com os 4,56:1 medidos pelo autor** (diferença de arredondamento) e atende ao mínimo AA de 4,5:1. Repetido 3× com espera de 1 s após o hover: estável.

Nota metodológica: uma primeira tentativa usando a média dos pixels claros do texto (anti-aliasing: ~`rgb(241,238,248)` em vez de `#F4F3F8`) produziu 4,39:1 no hover — valor **descartado por ser artefato de medição**. Como as bordas do CTA são um gradiente, o WCAG não define "pior pixel"; o axe classifica esses nós como `incomplete` e a leitura correta é com a cor declarada do texto. Nenhum bug.

## 4. Comandos

```
npm test           → 2 passed, 2 passed, exit 0
npm run test:e2e   → 10 passed, 2 skipped, exit 0 (porta 5182)
npm run build      → exit 0
npm run lint       → exit 0, sem erros
```

## 5. Conclusão

Paleta limpa em todo `src/`; geometria da Navbar preservada; contraste ≥ 4,5:1 em todos os estados (inclusive CTA em hover: 4,57:1, conferindo com o autor); SVGs de exemplo removidos sem referências; fundo da Home correto. Nenhum bug registrado. Nenhum código de produção foi alterado pelo Testador; nenhum commit/branch foi feito. Scripts temporários de medição removidos.
