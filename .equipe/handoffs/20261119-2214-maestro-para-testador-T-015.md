[TAREFA] T-015 — Contraste real no e2e (axe no Playwright) + ajustes do parecer da T-008 — e teste da T-014
Para: Testador | Depende de: T-014 (entregue pelo Backend)
Contexto: parecer .equipe/relatorios/avaliacao/T-008.md (lacuna de contraste e sugestões S2–S7). A T-014 instalou @axe-core/playwright 4.14.0 e criou "npm run typecheck" para tests/, e2e/ e configs; ele sai com código 2 por erros de tipo em 4 arquivos seus (lista em .equipe/handoffs/20261119-2213-backend-para-maestro-T-014.md).
Critério de aceite:
- Teste da T-014: confirme que package.json/lock e tsconfig mudaram só no necessário, que npm run build não foi afetado e que @axe-core/playwright roda. Registre no relatório (seção própria "T-014").
- e2e com @axe-core/playwright nas 3 larguras (360/768/1440): sem violações critical/serious, INCLUINDO color-contrast. Violações reais do site viram [BUG] (sem mascarar).
- Corrigir os erros de tipo nos seus arquivos de teste: npm run typecheck com código 0.
- S2: não fixar o número do WhatsApp (importar de src/config/contact.ts ou validar padrão wa.me/\d+). S3: não amarrar o teste à implementação do aria-controls (validar: se o atributo existir, o id existe). S6: setup sem extensão duplicada. S7: checagem de links mais rápida.
- Menu mobile no e2e também em 768 (o menu compacto passou a valer < 900px na T-011; hoje o teste só roda em 360).
- Ressalva do Avaliador na T-017: o seu relatório da T-017 cita um outline de foco de 3px claro que não existe no código (o foco real é 2px roxo). Confira a medição e corrija o relatório da T-017 se for o caso.
- Remover tests/cdp-t011.mjs se era só verificação pontual da T-011 (ou movê-lo para .equipe/relatorios/testes/).
- npm test, npm run test:e2e (podem falhar só por bugs reais documentados), typecheck, build, lint.
Arquivos/áreas: tests/**, e2e/**, vitest.config.ts, playwright.config.ts
Entregar para: Maestro → Avaliador (que revisa T-014 e T-015 juntas)
Prioridade: depois de terminar os testes de T-011, T-013 e T-003.
