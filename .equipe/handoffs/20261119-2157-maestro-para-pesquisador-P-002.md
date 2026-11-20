[TAREFA] P-002 — Estrutura multipágina do portfólio
Para: Pesquisador | Depende de: nenhuma
Contexto: O Kaio pediu que o site deixe de ser uma página única e vire uma estrutura de PÁGINAS, em que cada página explique e especifique de forma detalhada os seus segmentos. Também quer uma FOTO dele no portfólio (pessoa real na página). Seções da marca: Sobre, Serviços, Projetos, Processo, Orçamento, Contato. Stack: React 19 + Vite 8 + TS + Tailwind 4 + Framer Motion, deploy na Vercel. (react-router-dom foi removido na T-001 por não ser usado; pode voltar se for a recomendação.) Site publicado de referência: https://nexuscomerc.vercel.app/ (só leitura). Auditoria anterior: .equipe/pesquisas/P-001-auditoria-identidade.md.

Critério de aceite:
1. MAPA DE PÁGINAS (rotas em pt-BR), ex.: / (Home resumida que leva às páginas), /sobre (com a foto do Kaio), /servicos + uma subpágina por serviço/segmento, /projetos + uma página de caso por projeto, /processo, /orcamento, /contato, 404. Para cada página: objetivo, blocos de conteúdo (o que explicar em detalhe), CTA principal e qual conteúdo atual (componentes/dados em src/) é reaproveitado. Levante os serviços/segmentos e projetos que já existem no código (src/data, src/components) e diga onde falta conteúdo que o Kaio precisa fornecer.
2. ARQUITETURA: roteamento recomendado (React Router v7 modo biblioteca vs. alternativas) e como garantir SEO por página numa SPA na Vercel (pré-renderização/SSG das rotas, title/description/OG por página, sitemap.xml, rewrites no vercel.json). Compare 2–3 opções com prós, contras, custo e impacto no Lighthouse.
3. FOTO: requisitos (AVIF/WebP + fallback, tamanhos responsivos, peso-alvo, resolução mínima a pedir ao Kaio), tratamento visual para o tema escuro e a identidade (sem distorcer, alt descritivo), onde usar (Sobre, talvez Home).
4. NAVEGAÇÃO: menu, breadcrumbs nas subpáginas, transições com framer-motion respeitando reduced-motion, rolagem ao topo ao trocar de página.
5. 2–3 referências de sites de estúdio/profissional multipágina com página de serviço detalhada e página "Sobre" com foto do fundador (links + data de acesso).

Formato [PESQUISA]. Não edite nada fora de .equipe/pesquisas/ e da sua passagem.
Entrega: .equipe/pesquisas/P-002-estrutura-multipagina.md
Ao terminar: maestri ask "Maestro" "P-002 pronta: <resumo de 3 linhas> — arquivo: <caminho>"
