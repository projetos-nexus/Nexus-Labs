# [TESTE] T-012 — B-003: vazamento horizontal

Resultado: **PASSOU** · Testador (opencode, principal) · 2026-11-19 22:28

Handoffs: `.equipe/handoffs/20261119-2216-maestro-para-testador-T-012.md` (Maestro) e `.equipe/handoffs/20261119-2216-frontend-reserva-para-maestro-T-012.md` (autor Frontend-Reserva/codex). Diagnóstico original: seção 5 do relatório da T-008 (`20261119-2208-T-008-infra-testes.md`).

## 1. Largura do documento (360 / 768 / 900 / 1440)

Medição via Playwright/CDP na porta 5181, **com** e **sem** `overflow-x: hidden` do `body`/`html` (removido só no DOM do navegador via `style.overflowX = 'visible'`, nunca no código):

| Viewport | `clientWidth` | `scrollWidth` (hidden) | `scrollWidth` (visible) | `scrollX` após `scrollTo(500,0)` |
|---|---|---|---|---|
| 360 | 360 | 360 | 360 | 0 |
| 768 | 768 | 768 | 768 | 0 |
| 900 | 900 | 900 | 900 | 0 |
| 1440 | 1440 | 1440 | 1440 | 0 |

Critério `scrollWidth <= clientWidth + 1` atendido nos 4 viewports, inclusive sem o `overflow-x: hidden`. Tentativa de rolagem horizontal não produz deslocamento (`scrollX = 0`). Console/pageerror limpos (`[]`). **B-003 confirmado corrigido.**

## 2. Elementos decorativos

Varredura de todos os elementos com `getBoundingClientRect()` além do viewport. Ainda existem orbes/elementos `position: absolute` cuja caixa excede a largura visível (ex.: glow de 700 px em Hero, 600 px em CTA, 320 px em Projetos), **mas todos são recortados por um ancestor** com `overflow-x: hidden`/`clip` (section da Hero, `#servicos`, cards). Exemplos medidos em 360:

```
orbes Hero/CTA/Projetos → recorte em <section> overflow-x:hidden, largura 360
decorativos #servicos   → recorte em <div> overflow-x:hidden, largura 312
```

O documento não vaza: os excedentes são puramente visuais e confinados, sem afetar `scrollWidth`. Não há regressão.

## 3. Diff das mudanças do autor

- `src/components/Footer.tsx`: linha glow do topo passou de `width: '600px'` para `width: 'min(100%, 600px)'` (era o estouro original), com `color-mix()` do token `--color-roxo`.
- `src/components/ProcessSection.tsx`: acentos dos cartões trocados de hex literais (`#7B5CFF`, `#4DA3FF`, ...) por tokens (`--color-roxo`, `--color-lilas-mid`) + `color-mix()`, e `overflowX: 'clip'` na seção `#processo`.

## 4. Visual e animações do Processo (1440)

Seção `#processo` com `overflowX: 'clip'`; estrutura e orbes inalterados nodesktop. Sequência de `transform` dos cartões capturada frame a frame via `requestAnimationFrame`:

**`reducedMotion: reduce`** — transform salta `-32px → none` em **um único passo** (t=2 ms → t=75 ms), sem valores intermediários; a opacidade sobe gradualmente (0 → 1 em ~600 ms). Ou seja: nenhum movimento percebível, apenas fade — comportamento correto do `MotionConfig reducedMotion="user"` (framer-motion desliga transformações e mantém opacidade).

**`no-preference`** — transform interpola suavemente (`-32 → -28.16 → -12.31 → 0`), animação de entrada preservada.

Conclusão: animações de entrada continuam existindo e respeitam `reduced-motion`. **Não é bug** (não houve registro de B-005).

## 5. Comandos

```
npm test           → 2 passed, 2 passed, exit 0 (isolado; ver observação)
npm run test:e2e   → 10 passed, 2 skipped, exit 0 (porta 5182; 12 testes, 3 viewports)
npm run build      → ✓ 2153 modules transformed, ✓ built in 1,97s, exit 0
npm run lint       → exit 0, sem erros
```

Observação: numa primeira rodada com os 4 comandos em **paralelo**, `npm test` falhou 2/2 com ~6 s por teste (timeouts por contenção de CPU, não erro de código). Rodado isolado logo em seguida, passou 2/2 em 4,89 s. Resultado válido: **passou**.

## 6. Conclusão

B-003 corrigido e verificado de forma dedicada; nenhum bug novo no escopo. Nenhum código de produção foi alterado pelo Testador; nenhum commit/branch foi feito. Os 3 scripts temporários de medição (`cdp-t012*.mjs`) foram removidos.
