[TAREFA] T-013 — Footer acessível (B-002 e B-004)
Para: Tarefas-Rapidas | Depende de: nenhuma
Contexto: A suíte axe da T-008 achou 2 bugs no Footer. Detalhes em .equipe/relatorios/testes/20261119-2208-T-008-infra-testes.md (seções 4 e 6).
Critério de aceite:
- B-002: os links só de ícone do Footer (WhatsApp com <MessageCircle/> e e-mail com <Mail/>) ganham aria-label descritivo em pt-BR: "Conversar no WhatsApp (abre em nova aba)" e "Enviar e-mail para a Nexus Labs". Os ícones ficam com aria-hidden="true".
- B-004: os títulos das colunas do Footer (hoje <h4>, ~linhas 133, 159, 185) passam a <h2> (ou <h3> se houver h2 antes no footer), mantendo EXATAMENTE o mesmo visual (aplique a classe/estilo atual; tamanho, peso e cor iguais).
- Não mude nenhuma outra coisa no Footer (cores e fontes inline são de outras tarefas).
- npm test: as violações link-name e heading-order somem (o teste de axe pode continuar falhando só por outros bugs, se houver). npm run build e npm run lint ok.
Arquivos/áreas: src/components/Footer.tsx
Trava concedida: src/components/Footer.tsx — Tarefas-Rapidas — T-013 — até a entrega (o Frontend-Reserva está ciente e não mexe no Footer até lá)
Entregar para: Maestro → Testador
Regras: branch ciclo/01-identidade (não troque de branch, não faça commit). Ao terminar: salve o [HANDOFF] em .equipe/handoffs/ e rode maestri ask "Maestro" "<handoff resumido + caminho>".
