[TAREFA] P-001 — Auditoria do site atual × nova identidade + referências
Para: Pesquisador | Depende de: nenhuma
Contexto: Vamos transformar o site atual (React+Vite+TS+Tailwind 4) no portfólio da Nexus Labs com a nova identidade (.equipe/REGRAS-COMUNS.md seção 2; imagens em public/nova-identidade/, somente leitura). Preciso disso para propor o ciclo 1 ao Kaio.
Critério de aceite:
- Auditoria de CORES: toda cor usada hoje (src/styles/globals.css e hex/rgba soltos em src/**) × tabela da identidade; o que mapeia, o que sai, onde o azul #4DA3FF aparece e quanto pesa visualmente.
- Auditoria de FONTES: onde Inter, Space Grotesk etc. são carregadas e usadas; o que muda para Montserrat/Michroma; opções de carregamento (Google Fonts vs. self-host/@fontsource) com impacto em desempenho.
- Auditoria de LOGOS: como o logo é feito hoje (Navbar, Footer, favicon, marca d'água) × as 5 versões da marca; quais arquivos em public/nova-identidade/ servem para cada lugar (formato, se há SVG).
- Auditoria de SEÇÕES: seções atuais (src/pages/Home.tsx) × seções da marca (Sobre, Serviços, Projetos, Processo, Orçamento, Contato): manter, fundir, criar, remover.
- Achados extras relevantes (acessibilidade, SEO no index.html, peso do bundle, testes existentes ou não).
- 3 a 5 referências de portfólios premium de estúdios de software, com link, data de acesso e o que vale copiar de cada (estrutura, não visual).
- Recomendação objetiva sobre: manter/remover o azul; fonte do corpo (Inter x alternativa).
- Formato [PESQUISA] das REGRAS-COMUNS. Não editar nada fora de .equipe/pesquisas/.
Arquivos/áreas: salvar em .equipe/pesquisas/P-001-auditoria-identidade.md
Trava concedida: nenhuma
Entregar para: Maestro (via maestri ask "Maestro" com resumo curto + caminho do arquivo)
