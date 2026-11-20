# Painel de controle

Atualizado: 2026-11-19 23:30 por Maestro principal

## Tarefas

| ID | Tarefa | Responsável | CLI em uso | Status | Depende de | Bloqueio | Reprovações | Atualizado |
|---|---|---|---|---|---|---|---|---|
| P-001 | Auditoria site atual × nova identidade + referências | Pesquisador | opencode (reserva) | concluido | - | - | 0 | 17/11 19:35 |
| T-001 | Higiene: avaliar package-lock, remover react-router-dom, instalar @fontsource (Inter, Montserrat, Michroma) e deps de teste (vitest, testing-library, jsdom, axe, playwright) | Backend | codex (principal) | concluido | - | - | 0 | 19/11 21:22 |
| T-002 | Paleta nova no globals.css (tokens), sem azul/verde, textos secundários #A09CB8, prefers-reduced-motion | Frontend | antigravity (principal) | concluido | - | - | 0 | 19/11 21:22 |
| T-003 | (1º) unificar nomes dos tokens: roxo, lilas, lilas-mid, selo, text-muted — remover purple-* e --color-muted; MotionConfig reducedMotion="user" na raiz; depois cores inline → tokens: Hero, Dashboard, Prova visual, CTA | Frontend | codex (reserva) | concluido | T-002 | - | 0 | 19/11 22:22 |
| T-004 | Cores inline → tokens: demais componentes (Frontend) + data/projects.ts (Backend) | Frontend + Backend | antigravity / codex | concluido | T-002 | - | 0 | 19/11 21:58 |
| T-005 | Tipografia: Montserrat nos títulos via token, remover 33 fontFamily inline, Michroma na assinatura | Frontend | codex (reserva) | concluido | T-001 | - | 0 | 19/11 22:24 |
| T-006 | Validar os 5 PNGs, logos provisórios na Navbar/Footer + aria-label/aria-expanded do menu mobile | Frontend | antigravity (principal) | concluido | T-002 (mesmo agente) | - |  1 | 19/11 21:46 |
| T-007 | Head: favicon (nova identidade), apple-touch, theme-color #0B0A12, OG provisória (og:url/canonical aguardam domínio); remover src/assets/logos/favicon.png redundante e atualizar README.txt de logos (trava Frontend) | Backend | codex (principal) | concluido | T-006 | domínio pendente (parcial); favicon.svg corrigido |  1 | 19/11 22:52 |
| T-008 | Infra de testes: smoke + axe (Vitest) e e2e 360/768/1440 (Playwright) | Testador | opencode (principal) | concluido | T-001 | - | 0 | 19/11 22:12 |
| T-009 | Remover src/index.css e src/App.css órfãos (limpeza de PNGs sem uso vira T-010 após T-006) | Tarefas Rápidas | opencode | concluido | - | teste na mesma CLI (opencode); avaliação em claude | 0 | 19/11 21:19 |
| T-010 | Remover PNGs antigos sem uso em src/assets/logos (após T-006) | Tarefas Rápidas | opencode | concluido | T-006 | - | 0 | 19/11 22:04 |
| T-011 | Ajustar tamanho do logo na Navbar (hoje 22,4px desktop / 15,4px mobile por causa do max-width) | Frontend | codex (reserva) | concluido | - | - | 0 | 19/11 22:15 |
| P-002 | Estrutura multipágina (mapa de páginas, roteamento + SEO, foto do Kaio, navegação, referências) | Pesquisador | codex (principal) | concluido | - | - | 0 | 19/11 22:01 |
| T-012 | B-003: vazamento horizontal em 360/768 (orbs absolutas em Hero, CTA, Projects/ProjectCard, Process, Services; CTA da Navbar em 768) | Frontend | codex (reserva) | concluido | T-003 | - | 0 | 19/11 22:29 |
| T-013 | B-002 + B-004: aria-label nos links de ícone e hierarquia de títulos no Footer | Tarefas Rápidas | opencode | concluido | - | teste na mesma CLI (opencode) | 0 | 19/11 22:17 |
| T-014 | Backend: instalar @axe-core/playwright e incluir tests/, e2e/ e configs de teste na checagem de tipos (S5) | Backend | codex (principal) | concluido | - | - | 0 | 19/11 23:02 |
| T-015 | Testador: axe no Playwright (contraste real) nas 3 larguras + ajustes S2, S3, S6, S7 do parecer da T-008 | Testador | opencode (principal) | concluido | T-014 | - | 1 | 19/11 23:05 |
| T-016 | Cores fora da paleta restantes: Navbar.tsx (rgba(11,11,15,…), rgba(255,255,255,…)) e pages/Home.tsx (#0B0B0F) → tokens | Frontend | codex (reserva) | concluido | - | lacuna do Maestro na divisão de tarefas | 0 | 19/11 22:42 |
| T-017 | B-005 (alta): .btn-primary global com texto #F4F3F8 sobre #8B5CF6 = 3,84:1 (< AA) em 8 CTAs; corrigir gradiente e remover .navbar-cta | Frontend | codex (reserva) | concluido | - | - | 0 | 19/11 22:49 |
| T-018 | B-006: 7 textos em roxo #8B5CF6 sobre fundos tingidos com 4,0–4,2:1 (ProjectCard '6+', VisualProof 'KPIs…'/'Agente', números de etapa do Processo, CTASection 'Iniciado') → lilas-mid | Frontend | codex (reserva) | concluido | - | - | 0 | 19/11 23:30 |

Status: `a-fazer` · `em-andamento` · `em-teste` · `em-avaliacao` · `em-seguranca` · `reprovado` · `bloqueado` · `concluido`
Marque "revisão na mesma CLI" na coluna Bloqueio quando autor e revisor rodaram na mesma CLI.

## Agentes

| Agente | Principal | Reserva | Ativo agora | Cota (último script) |
|---|---|---|---|---|
| Maestro | Claude Code | Codex | principal | - |
| Backend / Plataforma | Codex | OpenCode | principal | - |
| Frontend | Antigravity | Codex | RESERVA (Antigravity esgotado até ~26/11 21:10) | - |
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
| S-001 (npm audit, ex-A-001) | média (8 altas só em devDeps; produção = 0) | FECHADO (audit 0/0, reverificado) | Blue Team |
| S-002 cabeçalhos HTTP | baixa | FECHADO (vercel.json; reverificado pelo Red Team 23:02; validar na Vercel no preview) | Blue Team |
| S-003 retrato em public/ sem uso | baixa | decisão do Kaio | Maestro/Kaio |
| S-004 sprite icons.svg órfão em public/ | baixa | FECHADO (reverificado) | Tarefas Rápidas |
