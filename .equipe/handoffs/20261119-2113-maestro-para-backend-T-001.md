[TAREFA] T-001 — Higiene do projeto, fontes self-host e dependências de teste
Para: Backend | Depende de: nenhuma
Contexto: Ciclo 01 (fundação da identidade). Kaio decidiu fontes self-host: Inter (corpo), Montserrat (títulos), Michroma (assinatura). Testes ainda não existem.
Critério de aceite:
- package-lock.json: avaliar a alteração pendente do npm install e deixar consistente com package.json (npm ci funciona).
- Remover react-router-dom (confirmar com grep que não é importado em src/).
- Instalar @fontsource-variable/inter, @fontsource-variable/montserrat e @fontsource/michroma (ou equivalentes oficiais). NÃO importar nos componentes (isso é T-005 do Frontend); só deixar instalado e informar no handoff os imports exatos a usar.
- Remover do index.html o <link>/preconnect do Google Fonts SOMENTE se o Frontend já tiver os imports; senão, deixar e anotar como pendência para T-005 (não quebrar o visual).
- Instalar devDeps de teste: vitest, @testing-library/react, @testing-library/jest-dom, jsdom, vitest-axe (ou @axe-core/react/axe-core), @playwright/test. Adicionar scripts "test" (vitest run) e "test:e2e" (playwright test) no package.json. Configs (vitest.config.ts/playwright.config.ts) são do Testador (T-008): não criar.
- npm run build e npm run lint passando; informar resultado real.
Arquivos/áreas: package.json, package-lock.json, index.html (só fontes, se aplicável).
Trava concedida: nenhuma
Entregar para: Maestro → Testador
Branch: ciclo/01-identidade (não troque de branch, não faça commit). Decisões do Kaio em .equipe/notas/MAESTRO-ESTADO.md; auditoria em .equipe/pesquisas/P-001-auditoria-identidade.md. Mantenha sua passagem atualizada. Ao terminar: salve o [HANDOFF] em .equipe/handoffs/ e rode maestri ask "Maestro" "<handoff resumido + caminho do arquivo>". Eu repasso ao Testador.
