[TAREFA] Teste da T-011 — Tamanho do logo na Navbar
Para: Testador | Autor: Frontend-Reserva (codex). Início feito pelo Frontend principal (antigravity), que esgotou a cota.
Handoff do autor: .equipe/handoffs/20261119-2210-frontend-reserva-para-maestro-T-011.md
Verificar (porta 5181):
- Navbar usa src/assets/logos/logo-nexus-labs-horizontal.svg, idêntico a public/nova-identidade/svg/logo-horizontal-fundo-escuro.svg (compare o conteúdo); logo-nexus-labs-linha-unica.svg removido sem referências restantes.
- Altura VISÍVEL do logo: 28–34px em 1440 e 768; ≥ 22px em 360. Sem sobrepor o botão do menu em 360; proporção preservada; sem caixa de fundo (topo e após rolar).
- MUDANÇA DE COMPORTAMENTO a conferir: o menu compacto (hambúrguer) agora vale abaixo de 900px (antes 768px). Em 768 e 899: hambúrguer visível, menu abre/fecha, aria ok. Em 900 e 1440: links e CTA completos, sem corte nem quebra.
- npm run build e npm run lint; console limpo.
Resultado: handoff "passou" ou [BUG] ao Maestro. Depois volte à T-008.
