[HANDOFF] De: Testador → Para: Maestro
Tarefa: T-001 — Higiene, fontes self-host e deps de teste
Status: concluído (passou)
CLI usada: opencode (principal)

O que foi feito:
- react-router-dom ausente do manifesto/lock e nenhum import em src/ ou index.html.
- Fontsource (3 pacotes) e 6 devDeps de teste presentes; scripts test e test:e2e ok; 3 caminhos CSS resolvem no node_modules.
- npm ls --depth=0 sem missing/invalid; não rodei npm ci na raiz, conforme instrução; git diff --check no escopo, exit 0.
- npm run build (2150 módulos, 650ms) e npm run lint passaram.
- Dev na 5181 com HTTP 200 e console limpo via CDP (sem erros, excecoes, 4xx ou falhas de rede).
- npm audit: 19 vulnerabilidades (1 baixa, 10 moderadas, 8 altas), todas em devDependencies (--omit=dev retorna 0). Registrado, nao corrigido.
- Relatorio: .equipe/relatorios/testes/20261119-2120-T-001-verificacao-higiene-deps.md

Arquivos alterados:
- .equipe/relatorios/testes/20261119-2120-T-001-verificacao-higiene-deps.md (novo)
- .equipe/handoffs/20261119-2120-testador-para-maestro-T-001.md (novo)
- .equipe/notas/passagens/testador.md (atualizado ao fim das duas tarefas)

Como verificar:
- Abrir o relatorio; repetir npm ls --depth=0, npm run build, npm run lint e npm audit.

Pendencias/riscos:
- Audit segue para o Red Team; nenhum bloqueio.
- npm test / test:e2e sem suites ate a T-008.
- git diff --check global aponta linha em branco no EOF de .equipe/notas/passagens/backend.md (fora do escopo).
