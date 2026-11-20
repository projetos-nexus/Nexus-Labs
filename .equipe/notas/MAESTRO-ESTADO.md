# Estado do projeto (mantido pelo Maestro ativo)

Atualizado: 2026-11-19 23:30 por principal (Claude Code)

## Objetivo
Portfólio profissional da Nexus Labs em `C:\dev\portifolio-nexus`, com a nova identidade visual (ver `.equipe/REGRAS-COMUNS.md`, seção 2).

## Critério de pronto do projeto
APROVADO pelo Kaio em 19/11 19:25: nova identidade sem cores fora da paleta; seções Sobre, Serviços, Projetos, Processo, Orçamento, Contato (+ Hero); responsivo 360–1440 px; contraste AA + teclado + prefers-reduced-motion; build, lint e testes (unitários + axe + e2e em 360/768/1440) passando; Lighthouse mobile ≥ 90 nas 4; SEO mínimo (og:url real, canonical, OG nova); zero achado crítico/alto aberto; preview Vercel aprovado pelo Kaio.

## Site publicado (referência do "antes")
- https://nexuscomerc.vercel.app/ — versão atual que será refatorada. Referência do "antes" na P-001 e no ciclo 01. Red Team: proibido testar/atacar; só leitura e comparação visual.

## Servidor local (terminal Dev-Local)
- Terminal "Dev-Local" (Shell, pasta do projeto), conectado ao Maestro e ao Maestro-Reserva. Só o Maestro ativo usa. Palavra-chave do Kaio: "sobe o dev" → procedimento em REGRAS-COMUNS.md ("Servidor local para o Kaio"). Porta 5173 reservada ao Kaio; Testador/Red Team usam outra porta nos próprios terminais.
- Testado em 19/11 19:02: subiu sem erro em http://localhost:5173/ (Vite 8.0.12).

## Decisões tomadas (resumo; detalhes no LOG-MAESTRO.md)
- P-001 concluída: .equipe/pesquisas/P-001-auditoria-identidade.md
- Commit ab1247b (Kaio, 17/11 19:37): .gitignore com .maestri/. Decisão 3 parcialmente atendida.

## Decisões do Kaio (19/11 19:25)
- Azul #4DA3FF e verde #4ADE80: REMOVER → lilás médio #A78BFA (acento único #8B5CF6).
- Corpo: MANTER Inter; títulos Montserrat; assinatura Michroma; fontes self-host (@fontsource).
- Seções: APROVADA a reorganização Hero → Sobre → Serviços → Projetos → Processo → Orçamento → Contato; REMOVER marca d'água fixa.
- Critério de pronto: APROVADO com os 3 acréscimos.
- Logos: SVG recebidos; public/nova-identidade/svg/ = 16 SVG sem fundo do Kaio para uso no site (commit 4d5e51a).
- Foto do Kaio no portfólio (Sobre, talvez Home): Kaio vai fornecer; requisitos na P-002.
- Estrutura MULTIPÁGINA com páginas detalhando cada segmento (ciclo 02).

## Decisões em aberto (aguardando o Kaio)
- Domínio para og:url/canonical (decidir depois; T-007 fica parcial).
- Push/merge no GitHub: só com OK explícito.

## Bloqueios de ferramenta
- Codex: RESOLVIDO 17/11 19:42 — a 0.169.1 saiu sem binário win32; fixado em 0.169.0. Não atualizar o Codex (escolher "Skip until next version").
- Antigravity: logado (Gemini 3.8 Flash) em 19/11.

## Roteiro da refatoração
- Ciclo 01 — Fundação da identidade (branch ciclo/01-identidade): paleta, tipografia, logos provisórios, higiene, infra de testes, a11y miúda. T-001..T-009.
- Ciclo 02 — ESTRUTURA MULTIPÁGINA (pedido do Kaio 19/11): site deixa de ser página única; páginas Home, Sobre (com foto do Kaio), Serviços + subpáginas por segmento, Projetos + casos, Processo, Orçamento, Contato, 404; cada página detalha seus segmentos. Base: P-002. Textos novos passam pelo Kaio.
- Ciclo 03 — Qualidade e publicação (ciclo/03-publicacao): logos SVG, OG nova, domínio, responsivo 360–1440, Lighthouse ≥ 90, Red/Blue final, preview Vercel aprovado pelo Kaio.

## Ciclo atual
Ciclo: 01 — fundação da identidade · Branch: ciclo/01-identidade (criar ao iniciar)
Status: CICLO 01 CONCLUÍDO em 19/11 (18 tarefas + 4 achados; último commit db83cb5). Pendente só S-003 (foto, decisão do Kaio). Relatório enviado ao Kaio. Próximo: ciclo 02 (multipágina) após decisões do Kaio.
Ondas: 1) T-001, T-002, T-006, T-009 em paralelo · 2) T-003, T-004, T-005, T-008 · 3) T-007 · fim: Red → Blue → Red.

## Agentes ativos agora
Ver `PAINEL.md` e `node .equipe/cota/verificar-cota.mjs`.

## Backlog anotado para o ciclo 02
- Remover .gradient-text-warm (0 usos) — sugestão T-018.
- Regra "roxo #8B5CF6 não é cor de texto pequeno" (texto em lilas/lilas-mid) — propor ao Kaio para REGRAS-COMUNS e travar no e2e.
- Padronizar breakpoints (T-011); extrair statusStyle de ProjectCard/Modal (T-004).
- Script agregado "verificar" (lint + typecheck + test) — sugestão T-014.
- Validar cabeçalhos (vercel.json/HSTS) no preview da Vercel.
- Reavaliar import da Michroma no fim do ciclo 02.
