[TAREFA] T-006 — Logos provisórios da nova identidade + acessibilidade do menu mobile
Para: Frontend | Depende de: nenhuma (fazer DEPOIS de entregar T-002; são sequenciais para você)
Contexto: Os 5 PNGs da nova identidade estão em public/nova-identidade/ (somente leitura). O Pesquisador não conseguiu vê-los; o mapeamento da P-001 Anexo C.2 é só inferido. Kaio vai mandar SVG depois; agora é provisório.
ATUALIZAÇÃO 19/11 21:15: o Kaio entregou as 5 versões em SVG em public/nova-identidade/ (*.svg). Use os SVG (não os PNG). Nunca recolorir/distorcer.
Critério de aceite:
- Abrir e conferir visualmente os 5 PNGs; registrar no handoff o que cada um contém de fato.
- Copiar (não mover) para src/assets/logos/ os SVG escolhidos e aplicar: Navbar → "Linha única" (ou a mais adequada à altura 32–38px); Footer → versão com assinatura. Manter alt="Nexus Labs" e proporção (nunca distorcer/recolorir).
- Navbar.tsx: botão do menu mobile com aria-label ("Abrir menu"/"Fechar menu") e aria-expanded.
- Não remover os PNGs antigos (limpeza é T-009, depois de você).
- Não mexer em favicon/index.html/public (T-007 do Backend usa o seu handoff).
- npm run build e lint passando; conferir em 360px e 1440px.
Arquivos/áreas: src/components/Navbar.tsx, src/components/Footer.tsx, src/assets/logos/
Trava concedida: nenhuma
Entregar para: Maestro → Testador
Branch: ciclo/01-identidade (não troque de branch, não faça commit). Decisões do Kaio em .equipe/notas/MAESTRO-ESTADO.md; auditoria em .equipe/pesquisas/P-001-auditoria-identidade.md. Mantenha sua passagem atualizada. Ao terminar: salve o [HANDOFF] em .equipe/handoffs/ e rode maestri ask "Maestro" "<handoff resumido + caminho do arquivo>". Eu repasso ao Testador.
