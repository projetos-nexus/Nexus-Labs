[HANDOFF] De: Testador → Para: Maestro (encaminhar ao Avaliador, que revisa T-014 e T-015 juntas)
Tarefa: T-015 — axe real no e2e, ajustes S2/S3/S6/S7 + teste da T-014
Status: concluído
CLI usada: opencode (principal)
O que foi feito: Auditada a T-014 (package.json/lock/tsconfig com só o necessário, playwright-core deduped, build intacto). Adicionado axe real do @axe-core/playwright em 360/768/1440: 0 violações critical/serious e color-contrast avaliado nos 3 viewports (1 pass, 0 violations, 1 incomplete por limitação do axe em gradientes, sem mascaramento). Aplicados S2 (número do WhatsApp vem de src/config/contact.ts), S3 (aria-controls validado só se existir), S6 (setup sem extensão duplicada + tipagem do matcher para Vitest 5), S7 (checagem de links mais rápida). Menu mobile passou a rodar em 360 e 768. Conferida e corrigida a ressalva do Avaliador na T-017: o outline 3px claro era valor transitório da transição de 0,25s; o real é 2px roxo com offset 3px. Relatório da T-017 atualizado.
Arquivos alterados: e2e/home.spec.ts, tests/setup.ts, tests/vitest-axe.d.ts (novo). Relatório: .equipe/relatorios/testes/20261119-2258-T-015-axe-contraste-typecheck.md. Nenhum código de produção, nenhum package.json, nenhum commit.
Como verificar: npm run typecheck (exit 0), npm test (2/2), npm run test:e2e (14 passed/1 skipped), npm run build e npm run lint (exit 0).
Pendências/riscos: nenhum. Avisos conhecidos de Canvas no jsdom e module.register() deprecado no webServer do Playwright não afetam os resultados. cdp-t011.mjs já estava removido; nenhum script temporário restou.
