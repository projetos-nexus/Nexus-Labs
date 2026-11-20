[TAREFA] Teste da T-005 — Tipografia self-host
Para: Testador | Autor: Frontend-Reserva (codex)
Handoff do autor: .equipe/handoffs/20261119-2214-frontend-reserva-para-maestro-T-005.md
Verificar (porta 5181):
- Nenhuma requisição a fonts.googleapis.com/fonts.gstatic.com (aba Network/CDP); fontes servidas localmente (woff2 do build).
- Computado: body em "Inter Variable"; h1–h4 e títulos de seção em "Montserrat Variable"; Michroma carregada (onde houver assinatura em texto). grep sem "Space Grotesk" em src/ e index.html.
- Sem FOIT/texto invisível prolongado; sem saltos de layout perceptíveis (CLS) no carregamento.
- index.html: só as linhas de fontes mudaram (trava T-005); resto do head intacto.
- Visual coerente em 360/768/1440 (títulos sem quebra estranha ou estouro após a troca para Montserrat, que é mais larga).
- npm test, npm run test:e2e (B-003 de overflow ainda esperado — T-012), build e lint.
Resultado: handoff "passou" ou [BUG] ao Maestro. Entra na sua fila depois da T-003 e antes da T-015.
