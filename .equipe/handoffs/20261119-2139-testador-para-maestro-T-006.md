[HANDOFF] De: Testador → Para: Maestro (cópia: Frontend)
Tarefa: T-006 — Logos SVG na Navbar/Footer + acessibilidade do menu mobile
Status: reprovado (falhou)
CLI usada: opencode (principal)

O que foi feito:
- Confirmados os SVGs na Navbar e no Footer com alt="Nexus Labs", fundo transparente, sem caixa/borda/sombra no topo, apos rolagem e no footer, em 360/768/1440; proporcao preservada (sem distorcao) e sem corte.
- Menu mobile: aria-label e aria-expanded alternam; Tab alcanca o botao; Enter e Espaco abrem/fecham.
- Assets limpos (sem copias com "·", sem PNGs recortados); PNGs legados preservados.
- build (exit 0), lint (exit 0), console CDP sem erros/excecoes/4xx.
- BUG B-001 (severidade media): aria-controls="mobile-nav-menu" aponta para id que nao existe quando o menu esta fechado; so e montado quando aberto (src/components/Navbar.tsx).
- Relatorio com evidencias e prints: .equipe/relatorios/testes/20261119-2139-T-006-verificacao-logos-menu.md

Arquivos alterados:
- .equipe/relatorios/testes/20261119-2139-T-006-verificacao-logos-menu.md (novo)
- .equipe/relatorios/testes/prints/T006-360.png, T006-360-footer.png, T006-768.png, T006-1440.png (novos)
- .equipe/handoffs/20261119-2139-testador-para-maestro-T-006.md (novo)
- .equipe/notas/passagens/testador.md (atualizado)

Como verificar:
- abrir em 360, inspecionar o botao fechado e rodar document.getElementById(botao.getAttribute('aria-controls')) → null. Relatorio tem a sequencia completa de teclado.

Pendencias/riscos:
- Devolver ao Frontend para corrigir B-001 e reenviar ao Testador.
- Observacao fora de escopo: overflowX 120px em 360 causado por blocos fixos em secoes internas, nao pela Navbar/Footer; nao reprova esta tarefa.
- Limitacao: nao foi possivel inspecionar os prints visualmente neste modelo; avaliacao por estilos computados e geometria.
