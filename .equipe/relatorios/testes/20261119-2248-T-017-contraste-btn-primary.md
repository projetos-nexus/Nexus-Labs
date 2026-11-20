# T-017 (B-005) — Contraste do botão primário global

Status: **passou**

Ambiente: Chromium (Playwright), portas 5181 (medições CDP) e 5182 (E2E, pela config), viewports 360 / 768 / 1440, deviceScaleFactor 1.

## Critérios verificados

- **Contraste em todos os estados**: gradiente `#7C3AED → #6D28D9` (`linear-gradient(135deg in srgb, ...)`) com texto `#F4F3F8`. Ponto mais claro do gradiente = `#7C3AED`. Contraste pela cor declarada: **5,16:1** em repouso, hover, focus-visible e active, nos 8 CTAs `.btn-primary` (7 visíveis em 360/768 por responsividade, 8 em 1440). Medição por pixel anti-aliased no pior extremo: 5,23:1 — coerente com o cálculo WCAG. Todos ≥ 4,5:1.
- **Hover não clareia**: `box-shadow` passa de `0 4px 24px` para `0 8px 40px` e `transform: translateY(-2px)`; `backgroundImage` inalterado nos 4 estados. Active mantém o gradiente (`translateY(0)`).
- **Foco visível ao Tab**: primeiro Tab já foca o CTA da Navbar (`.btn-primary`), com `:focus-visible = true`. **Correção (ressalva S1 do Avaliador, aplicada na T-015):** a medição original registrou `outline: 3px solid rgb(244,243,248)` logo após o Tab, mas esse é o valor **transitório** do ring padrão do Chromium — o `.btn-primary` tem `transition: all 0.25s ease`, que anima também o outline. Medido após estabilização (400 ms), o valor real é `outline: 2px solid rgb(139,92,246)` (`--color-roxo`) com `outline-offset: 3px`, exatamente a regra global `:focus-visible`. Não existe regra de outline claro de 3px em `src/`. O anel real dá 4,65:1 contra o fundo da página, acima dos 3:1 da WCAG 1.4.11; o foco esteve visível em todos os instantes.
- **`.navbar-cta` removido**: 0 ocorrências em `src/**/*.{ts,tsx,css}`.
- **Navbar**: altura **69px** no topo e rolada, nos 3 viewports.
- **Só cores da tabela**: `#7C3AED` (`--color-selo`) e `#6D28D9` (`--color-roxo-escuro`), texto `#F4F3F8` (`--color-text`). Nenhuma cor literal nova nos componentes alterados.
- **Console**: nenhum erro (`erros: []`) nas 3 larguras.

## Comandos (saída real)

- `npm test` — **2/2 passaram**, exit 0, 4.20s (aviso conhecido de Canvas no jsdom durante axe; não é falha).
- `npm run test:e2e` — **10 passed / 2 skipped**, exit 0, 13.3s (porta 5182; aviso de depreciação `module.register()` do Node no webServer).
- `npm run build` — **✓ built in 927ms**, exit 0.
- `npm run lint` — **exit 0**, sem saída de erros.

## Evidências

Medições CDP temporárias (`tests/cdp-t017.mjs`, `tests/cdp-t017-estados.mjs`) executadas e removidas após o uso. Nenhum código de produção alterado pelo Testador.

Handoff do autor: `.equipe/handoffs/20261119-2244-frontend-reserva-para-maestro-T-017.md`. Tarefa: `.equipe/handoffs/20261119-2245-maestro-para-testador-T-017.md`.
