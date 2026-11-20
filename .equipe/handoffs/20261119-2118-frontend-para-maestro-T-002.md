[HANDOFF] De: Frontend → Para: Maestro
Tarefa: T-002 — Paleta nova nos tokens (globals.css)
Status: concluído
CLI usada: antigravity (principal)
O que foi feito:
- Substituída a paleta de tokens em `src/styles/globals.css` (@theme) pela tabela oficial da nova identidade visual (#0B0A12, #13101F, #3A3550, #F4F3F8, #A09CB8, #8B5CF6, #C4B5FD, #A78BFA, #7C3AED, #6D28D9, #FAFAFC, #14121F).
- Removidos completamente os tokens `--color-blue` e `--color-blue-light`.
- Ajustados `.gradient-text` e `.gradient-text-warm` para utilizar apenas degradês em roxo e lilás (#8B5CF6 / #C4B5FD / #A78BFA).
- Efeitos `.glow-purple` atualizados para #8B5CF6; criado `.glow-lilas` (#A78BFA) e mantido alias compatível `.glow-blue` apontando para lilás médio (#A78BFA) para evitar quebras até T-003/T-004.
- `--color-text-subtle` e `--color-text-muted` unificados em #A09CB8 para garantir conformidade de contraste WCAG AA (>= 4,5:1).
- `.btn-primary` migrado para degradê #8B5CF6 -> #7C3AED e `.btn-secondary` para borda #3A3550 e texto #F4F3F8.
- `:focus-visible` atualizado para outline sólido com #8B5CF6.
- Adicionado bloco de acessibilidade `@media (prefers-reduced-motion: reduce)` anulando durações de animações/transições e definindo scroll suave como auto.
- Nenhuma cor fora da tabela oficial foi mantida no arquivo (apenas rgba derivadas diretamente dos hexadecimais da tabela).

Arquivos alterados:
- `src/styles/globals.css`

Como verificar:
1. `npm run build` -> build sem erros (`tsc -b && vite build`).
2. `npm run lint` -> eslint sem erros.
3. Testar execução local do Vite em porta dedicada (ex.: 5180) -> status 200 OK.
4. Inspecionar `src/styles/globals.css` -> zero tokens azuis, paleta 100% conforme `REGRAS-COMUNS.md`.

Pendências/riscos:
- Cores inline nos componentes ainda existem e serão substituídas nas tarefas T-003 e T-004.
- O alias `.glow-blue` deve ser removido após T-003/T-004.
