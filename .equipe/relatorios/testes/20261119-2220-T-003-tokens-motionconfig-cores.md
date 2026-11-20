# [TESTE] T-003 — Tokens unificados, MotionConfig e cores inline (Hero, Dashboard, Prova visual, CTA)

Resultado: **PASSOU** · Testador (opencode, principal) · 2026-11-19 22:20

Handoffs: `.equipe/handoffs/20261119-2214-maestro-para-testador-T-003.md` (Maestro — notei que o nome é 2214, não 2213) e `.equipe/handoffs/20261119-2213-frontend-reserva-para-maestro-T-003.md` (autor Frontend-Reserva/codex). Tabela de cores: `.equipe/REGRAS-COMUNS.md` §2.

## 1. Tokens em `src/styles/globals.css`

Nomenclatura única: `--color-bg`, `--color-surface`, `--color-surface-alt`, `--color-border`, `--color-border-strong`, `--color-roxo`, `--color-lilas`, `--color-lilas-mid`, `--color-selo`, `--color-text`, `--color-text-muted`.

- **0 ocorrências** de `--color-purple*` ou `--color-muted` (nomenclaturas antigas).
- Hex literais presentes: `#0B0A12`, `#13101F`, `#3A3550`, `#8B5CF6`, `#C4B5FD`, `#A78BFA`, `#7C3AED`, `#F4F3F8`, `#A09CB8` — **todos da tabela**. Derivações usam `color-mix()`.
- Sem `--color-blue*`; nenhuma cor antiga (`#7B5CFF`, `#4DA3FF`, `#0B0B0F`).

## 2. Cores nos quatro componentes

Varredura por hex/rgba literal em `Hero.tsx`, `InteractiveDashboardMockup.tsx`, `VisualProofSection.tsx` e `CTASection.tsx`:

```
Hero.tsx                        → 0
InteractiveDashboardMockup.tsx  → 0
VisualProofSection.tsx          → 0  (os "#4821" etc. são IDs de pedidos, não cores)
CTASection.tsx                  → 0
```

Nenhum uso de azul/verde por nome. O único `blue` restante é o comentário `{/* Blue orb - bottom right */}` em `Hero.tsx:47`, **desatualizado**: a cor real foi trocada. Orbes medidos no 5181 (1440×900):

| Orbe | Cor computada | Hex equivalente |
|---|---|---|
| 700 px ( Hero ) | `color(srgb 0.545098 0.360784 0.964706 / 0.18)` | `#8B5CF6` (roxo) |
| 600 px (Hero) | `color(srgb 0.654902 0.545098 0.980392 / 0.14)` | `#A78BFA` (lilás-mid) |

O antigo orbe azul `#4DA3FF` não existe mais.

## 3. MotionConfig / prefers-reduced-motion

`src/App.tsx:1,6,8` usa `import { MotionConfig } from 'framer-motion'` e `<MotionConfig reducedMotion="user">` envolvendo a aplicação.

Teste com Playwright em 1440×900, leitura imediata após `domcontentloaded` (antes da animação terminar):

| Modo | `header` transform | `h1` do Hero transform |
|---|---|---|
| `emulateMedia({ reducedMotion: 'reduce' })` | `none` | `none` |
| `no-preference` | `matrix(1,0,0,1,0,-27.60)` | `matrix(1,0,0,1,0,9.42)` |

Com `reduce`, **não há movimento** (transform `none` desde o início); sem reduce, há `translateY` típico da entrada. Após 800 ms, ambos chegam a `transform: none` e `opacity: 1`. Os quatro componentes usam apenas animações declarativas (`motion.*` com `initial`/`animate`, sem `useMotionValue`/`animate()` imperativos), todas cobertas pelo `MotionConfig`.

## 4. Contraste e visual (360 / 768 / 1440)

Cálculo WCAG 2.1 no 5181 para todos os elementos de texto visíveis em `main` (h1/h2/p/a/button/span), contra o fundo `rgb(11,10,18)` do `body`:

```
360  → 0 textos abaixo de 4,5:1
768  → 0 textos abaixo de 4,5:1
1440 → 0 textos abaixo de 4,5:1
errosConsole = []
```

Nenhuma regressão grave de contraste/legibilidade nos blocos alterados.

Conforme o handoff, **não são bugs desta tarefa**: fontes ainda Space Grotesk/Google (T-005) e cores antigas em Services/Process/TargetAudience/Diferenciais/ProjectCard/Modal/Footer (T-004 Frontend).

## 5. Comandos

```
npm test           → 2 passed, 2 passed, exit 0
npm run test:e2e   → 10 passed, 2 skipped, exit 0 (porta 5182; 12 testes, 3 viewports)
                     Obs: o handoff previa B-003 ainda falhando, mas a T-012 já corrigiu o overflow
                     e as 3 checagens de rolagem horizontal passaram.
npm run build      → ✓ 2153 modules transformed, ✓ built in 1,05s, exit 0
npm run lint       → exit 0, sem erros
```

## 6. Conclusão

Critérios atendidos; nenhum bug novo no escopo. Nenhum código de produção foi alterado pelo Testador; nenhum commit/branch foi feito. Scripts temporários de medição removidos.
