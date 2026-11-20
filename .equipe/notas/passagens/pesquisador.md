# Passagem — pesquisador
Atualizado: 2026-11-17 20:05 por reserva (OpenCode)
Tarefa atual: P-001 — Auditoria do site atual × nova identidade + referências de portfólios premium — CONCLUÍDA
Feito até agora:
- Pesquisa entregue em `.equipe/pesquisas/P-001-auditoria-identidade.md` (formato [PESQUISA] + anexos A–F).
- Auditoria de cores: paleta antiga mapeada × tabela nova; azul #4DA3FF = 59 usos em 13 arquivos (peso em Dashboard/Prova visual/Processo/Hero/CTA); verde #4ADE80 e #6244E8 fora da tabela; index.css/App.css órfãos.
- Auditoria de fontes: Inter e Space Grotesk no index.html + 33 usos inline de Space Grotesk em 13 arquivos; Montserrat/Michroma; Google Fonts × @fontsource × variable fonts.
- Auditoria de logos: 5 PNGs @1x sem SVG mapeados para os 5 lugares; limitação declarada (modelo não vê imagem).
- Auditoria de seções: 11 blocos atuais → 6 seções da marca + Hero; fusões Prova visual→Projetos e Público-alvo+Diferenciais→Sobre; CTA→Orçamento; Footer→Contato.
- Extras: contraste AA falha em textos @0,2–0,4 (1,78–3,80:1); sem prefers-reduced-motion; botão do menu sem aria-label; og:url placeholder; sem testes; react-router-dom não usado.
- 4 referências premium abertas (Instrument, Metalab, Locomotive, Hello Monday) + 3 fontes oficiais, todas com data de acesso.
- Recomendações ao Kaio: remover azul → #A78BFA; manter Inter no corpo; trocar Space Grotesk → Montserrat; pedir SVGs.
Próximo passo exato: aguardar nova tarefa do Maestro. Se ele pedir revisão, ajustar somente `.equipe/pesquisas/**` e esta passagem.
Arquivos em edição (não terminados): nenhum
Decisões tomadas nesta tarefa: nenhuma (pesquisa apenas recomenda; decisões de azul/fonte/SVG ficam com Kaio)
Dúvidas abertas: Kaio precisa decidir manutenção do azul, fonte do corpo e export SVG; Frontend precisa validar visualmente o mapeamento dos PNGs.
