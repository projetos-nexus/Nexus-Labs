[TAREFA] Teste da T-001 — Higiene, fontes self-host e deps de teste
Para: Testador | Autor: Backend (codex)
Handoff do autor: .equipe/handoffs/20261119-2116-backend-para-maestro-T-001.md
Verificar:
- package.json: react-router-dom removido e nenhum import restante; @fontsource-variable/inter, @fontsource-variable/montserrat, @fontsource/michroma presentes; devDeps vitest, @testing-library/react, @testing-library/jest-dom, jsdom, vitest-axe, @playwright/test; scripts test e test:e2e.
- package-lock.json consistente: npm ls sem erros de "missing/invalid" (não rode npm ci na raiz: o servidor do Kaio na 5173 trava binários; se precisar, use cópia em .maestri/).
- npm run build e npm run lint passam.
- Site sobe na porta 5181 sem erro no console (visual ainda com Google Fonts, é esperado).
- npm audit: apenas registre o resumo (19 vulnerabilidades: 1 baixa, 10 moderadas, 8 altas) e se são de dependências de produção ou dev. Não corrija (vai para o Red Team).
Resultado: handoff "passou" ou [BUG] ao Maestro, com arquivo em .equipe/relatorios/testes/.
