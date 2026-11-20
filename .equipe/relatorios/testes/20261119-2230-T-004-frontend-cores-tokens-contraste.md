# [TESTE] T-004 (parte Frontend) — cores inline → tokens nos demais componentes

Resultado: **PASSOU** · Testador (opencode, principal) · 2026-11-19 22:30

Handoffs: `.equipe/handoffs/20261119-2219-maestro-para-testador-T-004-frontend.md` (Maestro) e `.equipe/handoffs/20261119-2219-frontend-reserva-para-maestro-T-004.md` (autor Frontend-Reserva/codex). Observação do Avaliador (via Maestro): link "Comprar ou adaptar" com `#8B5CF6` daria ~4,3:1 — verificado abaixo como **já corrigido**.

## 1. Cores literais nos 8 componentes

Varredura por hex/rgba literal em `ServicesSection`, `ProcessSection`, `TargetAudienceSection`, `DiferenciaisSection`, `ProjectCard`, `ProjectDetailsModal`, `ProjectsSection` e `Footer`:

```
ServicesSection.tsx        → 0
ProcessSection.tsx         → 0
TargetAudienceSection.tsx  → 0
DiferenciaisSection.tsx    → 0
ProjectCard.tsx            → 0
ProjectDetailsModal.tsx    → 0
ProjectsSection.tsx        → 0
Footer.tsx                 → 0
```

- Nenhum `blue`/`green`/`cyan`/`teal`/`emerald` por nome e nenhum hex antigo (`#7B5CFF`, `#4DA3FF`, `#0B0B0F`). Tudo usa `var(--color-*)` e `color-mix()` da tabela.
- `.glow-blue`: **0 ocorrências** em todo `src/` (alias removido na T-003, confirmado).
- Conforme o handoff, cores antigas em `Navbar.tsx` e `pages/Home.tsx` **não são bugs desta tarefa** (T-016).

## 2. Links "Comprar ou adaptar" — 5 links

Medição WCAG no 5181 em 360/768/1440. Os 5 links usam `color: var(--color-text)` = `rgb(244,243,248)` sobre fundo `rgb(11,10,18)`:

```
contraste de cada um dos 5 links = 17,84:1  (≥ 4,5:1 ✓)
```

A observação do Avaliador (`#8B5CF6` ~4,3:1) **não se aplica mais ao estado atual**: o author trocou o texto para claro. Os fundos dos links são transparências lilás/roxo (`color-mix`) que não reduzem o contraste medido.

## 3. Footer

- Títulos **Produto / Empresa / Contato**: `color: rgb(160,156,184)` = `--color-text-muted` (`#A09CB8`), contraste **7,45:1** nos 3 viewports (≥ 4,5:1 ✓).
- `aria-label` do e-mail: `"Enviar e-mail para a Nexus Labs (abre em nova aba)"` — anuncia a nova aba ✓.
- `aria-label` do WhatsApp: `"Conversar no WhatsApp (abre em nova aba)"` — preservado ✓.
- `h2` com aria-label e link `wa.me/5591984219075` da T-013 preservados ✓.

## 4. Modal de detalhes do projeto

Teste de interação em 1440 (Playwright):

```
abriu via clique no card                 → true
foco ao abrir                            → BUTTON (aria-label "Fechar modal")
role="dialog" / aria-modal="true"        → presentes
contraste: 16 textos medidos, 0 abaixo de 4,5:1
fechou com Escape                        → true
```

Console/pageerror limpos (`[]`) em todas as larguras e na interação do modal.

## 5. Comandos

```
npm test           → 2 passed, 2 passed, exit 0
npm run test:e2e   → 10 passed, 2 skipped, exit 0 (porta 5182)
npm run build      → ✓ 2153 modules transformed, ✓ built in 907ms, exit 0
npm run lint       → exit 0, sem erros
```

## 6. Conclusão

Critérios atendidos; observação do Avaliador confirmada como já resolvida; nenhum bug novo no escopo. Nenhum código de produção foi alterado pelo Testador; nenhum commit/branch foi feito. Script temporário de medição removido.
