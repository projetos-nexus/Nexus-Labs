[TAREFA] T-017 — B-005: contraste do botão primário global abaixo de AA
Para: Frontend-Reserva | Depende de: nenhuma
Contexto: Achado do Avaliador no parecer da T-016 (.equipe/relatorios/avaliacao/T-016.md). O .btn-primary global (8 CTAs, inclusive o do Hero) tem texto #F4F3F8 sobre #8B5CF6 = 3,84:1 (~3,2:1 no hover), abaixo de AA (4,5:1). Origem: T-002.
Critério de aceite:
- .btn-primary: texto #F4F3F8 com contraste ≥ 4,5:1 em TODO o gradiente, em repouso, hover, focus-visible e active. Sugestão: gradiente usando #7C3AED → #6D28D9 (cores da tabela) e hover que escurece/realça sem clarear. Só cores da tabela.
- Remover a variação local .navbar-cta da Navbar e usar o .btn-primary global corrigido (mesma geometria da Navbar: altura 69px inalterada).
- Medir e registrar no handoff o pior caso de contraste de cada estado, nos 8 CTAs (listar onde estão).
- Visual coerente com a identidade em 360/768/1440.
- npm test, npm run test:e2e, build, lint.
Arquivos/áreas: src/styles/globals.css, src/components/Navbar.tsx (e componentes só se usarem estilos locais de botão primário)
Entregar para: Maestro → Testador
Regras: branch ciclo/01-identidade (não troque de branch, não faça commit). Porta 5180. Ao terminar: salve o [HANDOFF] em .equipe/handoffs/ e rode maestri ask "Maestro" "<handoff resumido + caminho>".
