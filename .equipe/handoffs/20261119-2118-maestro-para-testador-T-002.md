[TAREFA] Teste da T-002 — Paleta nova nos tokens (globals.css)
Para: Testador | Autor: Frontend (antigravity)
Handoff do autor: .equipe/handoffs/20261119-2118-frontend-para-maestro-T-002.md
Verificar:
- src/styles/globals.css: só cores da tabela de .equipe/REGRAS-COMUNS.md §2 (hex ou rgba derivadas); nenhum --color-blue*.
- Contraste: --color-text-muted/subtle (#A09CB8) sobre #0B0A12 e #13101F ≥ 4,5:1 (calcule e registre).
- prefers-reduced-motion: com emulação "reduce" (Playwright/Chrome), animações CSS desligadas.
- :focus-visible visível ao navegar por Tab (porta 5181).
- npm run build e npm run lint passam.
- Esperado e NÃO é bug: cores inline nos componentes ainda antigas (T-003/T-004), azul ainda aparecendo em componentes, fontes ainda do Google (T-005).
Resultado: handoff "passou" ou [BUG] ao Maestro, com arquivo em .equipe/relatorios/testes/.
