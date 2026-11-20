[TAREFA] T-014 — @axe-core/playwright e checagem de tipos dos testes
Para: Backend | Depende de: T-008 (concluída)
Contexto: Parecer da T-008 (.equipe/relatorios/avaliacao/T-008.md): o axe em jsdom não mede contraste; precisamos do axe rodando no navegador real (Playwright). E os arquivos de teste não entram no tsc (sugestão S5).
Critério de aceite:
- Instalar @axe-core/playwright como devDependency (versão compatível com @playwright/test já instalado).
- Fazer tests/**, e2e/**, vitest.config.ts e playwright.config.ts passarem por checagem de tipos: tsconfig próprio (ex.: tsconfig.test.json referenciado no tsconfig.json ou script "typecheck") sem afetar o build do app. Se surgirem erros de tipo nos testes, NÃO os corrija (área do Testador): liste no handoff.
- npm run build, npm run lint e npm test continuam rodando (npm test pode falhar só por B-002/B-003, bugs do site já encaminhados).
Arquivos/áreas: package.json, package-lock.json, tsconfig*.json
Entregar para: Maestro → Testador
Regras: branch ciclo/01-identidade (não troque de branch, não faça commit). Ao terminar: salve o [HANDOFF] em .equipe/handoffs/ e rode maestri ask "Maestro" "<handoff resumido + caminho>".
