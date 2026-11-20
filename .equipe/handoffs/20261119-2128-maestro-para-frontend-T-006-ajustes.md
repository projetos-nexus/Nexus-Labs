[TAREFA] T-006 — AJUSTES (devolvida pelo Maestro antes do teste)
Para: Frontend | Depende de: nenhuma
Contexto: A inspeção dos PNGs e a acessibilidade do menu (aria-label/aria-expanded/aria-controls) estão ótimas e ficam. Mas a instrução atualizada pedia SVG, e há duplicação de assets.
Critério de aceite:
- Navbar e Footer importam SVG (não PNG). Motivo: nitidez em telas retina (pedido do Kaio).
- Os SVG usados no site devem ter fundo TRANSPARENTE: remover o path de fundo escuro (rgb ≈ #0B0A12), o fundo claro (#FAFAFC) e todos os glifos da metade clara; remover o bloco de metadados c2pa; viewBox justo no conteúdo (sem margem sobrando). Não alterar cor, forma ou proporção dos glifos que ficam. (Hoje o SVG/PNG recortado tem fundo sólido #0B0A12, que vira um retângulo visível sobre a Navbar translúcida e o Footer #13101F.)
- src/assets/logos/: NÃO manter as 10 cópias com "·" no nome (os originais já estão em public/nova-identidade/) nem os PNG recortados. Ficam só os SVG efetivamente usados: logo-nexus-labs-linha-unica.svg (Navbar) e logo-nexus-labs-abreviado.svg (Footer). Os PNG antigos (logo-nexus-labs-dark.png etc.) continuam lá para a T-010.
- Conferir no navegador (porta 5180) em 360px e 1440px, inclusive com a Navbar após rolar (fundo translúcido): nenhuma caixa/retângulo em volta do logo.
- npm run build e npm run lint passando.
Arquivos/áreas: src/components/Navbar.tsx, src/components/Footer.tsx, src/assets/logos/
Entregar para: Maestro → Testador
Ao terminar: atualize o handoff (novo arquivo em .equipe/handoffs/) e rode maestri ask "Maestro" "<resumo + caminho>".
