# Painel de controle

Atualizado: 2026-11-19 21:13 por Maestro principal

## Tarefas

| ID | Tarefa | Responsável | CLI em uso | Status | Depende de | Bloqueio | Reprovações | Atualizado |
|---|---|---|---|---|---|---|---|---|
| P-001 | Auditoria site atual × nova identidade + referências | Pesquisador | opencode (reserva) | concluido | - | - | 0 | 17/11 19:35 |
| T-001 | Higiene: avaliar package-lock, remover react-router-dom, instalar @fontsource (Inter, Montserrat, Michroma) e deps de teste (vitest, testing-library, jsdom, axe, playwright) | Backend | codex (principal) | concluido | - | - | 0 | 19/11 21:22 |
| T-002 | Paleta nova no globals.css (tokens), sem azul/verde, textos secundários #A09CB8, prefers-reduced-motion | Frontend | antigravity (principal) | concluido | - | - | 0 | 19/11 21:22 |
| T-003 | (1º) unificar nomes dos tokens: roxo, lilas, lilas-mid, selo, text-muted — remover purple-* e --color-muted; MotionConfig reducedMotion="user" na raiz; depois cores inline → tokens: Hero, Dashboard, Prova visual, CTA | Frontend | antigravity (principal) | a-fazer | T-002 | - | 0 | 19/11 19:25 |
| T-004 | Cores inline → tokens: demais componentes (Frontend) + data/projects.ts (Backend) | Frontend + Backend | antigravity / codex | a-fazer | T-002 | - | 0 | 19/11 19:25 |
| T-005 | Tipografia: Montserrat nos títulos via token, remover 33 fontFamily inline, Michroma na assinatura | Frontend | antigravity (principal) | a-fazer | T-001 | - | 0 | 19/11 19:25 |
| T-006 | Validar os 5 PNGs, logos provisórios na Navbar/Footer + aria-label/aria-expanded do menu mobile | Frontend | antigravity (principal) | concluido | T-002 (mesmo agente) | - |  1 | 19/11 21:46 |
| T-007 | Head: favicon, apple-touch, theme-color #0B0A12, OG provisória (og:url/canonical aguardam domínio) | Backend | codex (principal) | a-fazer | T-006 | domínio pendente (parcial) | 0 | 19/11 19:25 |
| T-008 | Infra de testes: smoke + axe (Vitest) e e2e 360/768/1440 (Playwright) | Testador | opencode (principal) | a-fazer | T-001 | - | 0 | 19/11 19:25 |
| T-009 | Remover src/index.css e src/App.css órfãos (limpeza de PNGs sem uso vira T-010 após T-006) | Tarefas Rápidas | opencode | concluido | - | teste na mesma CLI (opencode); avaliação em claude | 0 | 19/11 21:19 |
| T-010 | Remover PNGs antigos sem uso em src/assets/logos (após T-006) | Tarefas Rápidas | opencode | a-fazer | T-006 | - | 0 | 19/11 21:46 |
| T-011 | Ajustar tamanho do logo na Navbar (hoje 22,4px desktop / 15,4px mobile por causa do max-width) | Frontend | antigravity (principal) | a-fazer | - | - | 0 | 19/11 21:46 |

Status: `a-fazer` · `em-andamento` · `em-teste` · `em-avaliacao` · `em-seguranca` · `reprovado` · `bloqueado` · `concluido`
Marque "revisão na mesma CLI" na coluna Bloqueio quando autor e revisor rodaram na mesma CLI.

## Agentes

| Agente | Principal | Reserva | Ativo agora | Cota (último script) |
|---|---|---|---|---|
| Maestro | Claude Code | Codex | principal | - |
| Backend / Plataforma | Codex | OpenCode | principal | - |
| Frontend | Antigravity | Codex | principal | - |
| Testador | OpenCode | Codex | principal | - |
| Avaliador | Claude Code | OpenCode | principal | - |
| Pesquisador | Codex | OpenCode | principal | - |
| Red Team | Codex | OpenCode | principal | - |
| Blue Team | OpenCode | Codex | principal | - |
| Tarefas Rápidas | OpenCode | sem reserva | principal | - |

## Travas de arquivo

| Arquivo | Agente | Tarefa | Até | Dono da área ciente |
|---|---|---|---|---|

## Achados de segurança abertos

| ID | Severidade | Status | Responsável |
|---|---|---|---|
| A-001 (npm audit) | 8 altas, 10 moderadas, 1 baixa — todas em devDependencies (Testador) — a triar | aberto | Red Team (fim do ciclo 01) |
