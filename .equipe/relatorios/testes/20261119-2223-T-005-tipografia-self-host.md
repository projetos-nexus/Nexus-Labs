# [TESTE] T-005 — Tipografia self-host

Resultado: **PASSOU** · Testador (opencode, principal) · 2026-11-19 22:23

Handoffs: `.equipe/handoffs/20261119-2215-maestro-para-testador-T-005.md` (Maestro) e `.equipe/handoffs/20261119-2214-frontend-reserva-para-maestro-T-005.md` (autor Frontend-Reserva/codex).

## 1. Rede e arquivos locais (5181, Playwright)

```
requisições a fonts.googleapis.com / fonts.gstatic.com → 0 (360, 768, 1440)
arquivos woff2 baixados por viewport                    → 2 (inter-latin + montserrat-latin)
erros de console / pageerror                            → []
```

O build gera os WOFF2 locais: `inter-*.woff2`, `montserrat-*.woff2` e `michroma-*.woff2/woff` em `dist/assets/`. O navegador baixa apenas os subconjuntos latinos necessários.

`grep` em `src/` (`.ts`, `.tsx`, `.css`) e `index.html`: **0 ocorrências** de `Space Grotesk`, `fonts.googleapis` ou `fonts.gstatic`. `src/main.tsx:3-5` importa `@fontsource-variable/inter`, `@fontsource-variable/montserrat` e `@fontsource/michroma/400.css`; `globals.css:16-18` define `--font-sans: "Inter Variable"`, `--font-display: "Montserrat Variable"` e `--font-assinatura: "Michroma"`.

## 2. Diff de `index.html`

`git diff -- index.html` contém **apenas a remoção das 6 linhas do bloco "Fonts"** (2 `preconnect` + `<link>` do Google com Inter e Space Grotesk). O restante do `<head>` está intacto.

## 3. Fontes computadas (5181)

| Elemento | 360 | 768 | 1440 |
|---|---|---|---|
| `body` | `"Inter Variable", sans-serif` | igual | igual |
| `h1`, `h2`, `h3`, `h4` e títulos de seção | `"Montserrat Variable", sans-serif` | igual | igual |

`document.fonts.status = "loaded"` e `document.fonts.check()` = `true` para Inter e Montserrat nos três viewports.

**Michroma:** `check('16px "Michroma"')` = `false` e nenhum elemento tem `font-family` Michroma na página. Isso **não é bug**: conforme o handoff do autor, a assinatura da marca é SVG na Navbar e no Footer, e não há assinatura em texto — logo a fonte é importada e disponibilizada no build, mas não precisa ser baixada. O critério do Maestro condicionava o carregamento a "onde houver assinatura em texto".

## 4. FOIT / CLS / layout

Medição com `PerformanceObserver` de `layout-shift` injetado antes da navegação:

```
CLS = 0 em 360, 768 e 1440
```

Após `document.fonts.ready` e 900 ms, todos os títulos estão visíveis e com `font-family` final — sem texto invisível prolongado e sem salto de layout.

Todos os títulos medidos (H1, H2, H3 e títulos de seção) têm a borda direita **dentro do viewport** em 360/768/1440 (margens de 8 a 290 px). Não houve estouro ou quebra estranha após a troca para Montserrat, que é mais larga.

## 5. Comandos

```
npm test           → 2 passed, 2 passed, exit 0
npm run test:e2e   → 10 passed, 2 skipped, exit 0 (porta 5182)
                     Obs: o handoff previa B-003 ainda falhando, mas a T-012 já corrigiu o overflow.
npm run build      → ✓ 2153 modules transformed, ✓ built in 1,17s, exit 0
npm run lint       → exit 0, sem erros
```

## 6. Conclusão

Critérios atendidos; nenhum bug novo no escopo. Nenhum código de produção foi alterado pelo Testador; nenhum commit/branch foi feito. Script temporário de medição removido.
