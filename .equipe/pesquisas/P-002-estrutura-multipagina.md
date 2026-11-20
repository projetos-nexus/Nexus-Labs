# [PESQUISA] P-002 — Como estruturar o portfólio multipágina da Nexus Labs?

**Recomendação.** Usar React Router v7 em Framework Mode com pré-renderização estática de todas as rotas publicadas e navegação React após hidratação. Manter a Home curta, dar URLs próprias às ofertas e aos projetos e apresentar o retrato real do Kaio em Sobre. Publicar serviços e projetos com a profundidade que o material aprovado permite.

## Por quê

O catálogo cabe em um build estático, e o HTML específico de cada URL entrega conteúdo e metadados já na primeira resposta. O código atual tem uma única entrada (`src/main.tsx` → `App.tsx` → `pages/Home.tsx`), com navegação por âncoras e detalhes dos projetos em modal. O `index.html` tem metadados globais e `og:url` provisória. A URL publicada respondeu HTTP 200 via curl em 19/11/2026. O leitor web não conseguiu abrir o site, por isso o inventário abaixo se baseia no código local.

## Mapa de páginas

Slugs em pt-BR, minúsculos, sem acentos e com hífens. Nas subpáginas de serviço, explicar público, problema, entregáveis, integrações, limites e exemplos. Nos projetos, usar um modelo comum com contexto, solução, recursos, adaptação, imagens e resultados comprovados quando disponíveis. As opções marcadas como demonstração ou oferta devem manter esse enquadramento na página.

| Rota | Objetivo e conteúdo | CTA principal | Reaproveitamento e lacunas |
| --- | --- | --- | --- |
| `/` | Apresentar a proposta em uma frase, resumir ofertas, destacar um projeto e encaminhar para Sobre e Processo. | Conhecer serviços | `Hero`, cartões de `ServicesSection` e projeto em destaque de `ProjectsSection`. Levar a demonstração pesada para sua rota de projeto se o comparativo de desempenho favorecer. |
| `/sobre` | Apresentar o Kaio com retrato, papel, trajetória, motivação, forma de trabalhar e tipos de cliente atendidos. | Conversar com a Nexus Labs | `TargetAudienceSection` e `DiferenciaisSection`. Kaio fornece nome público, papel, bio, foto e credenciais publicáveis. |
| `/servicos` | Ajudar a escolher uma oferta. Resumo por problema, vínculo com casos e cards para os detalhes. | Explorar serviços | `ServicesSection` e cenários de `TargetAudienceSection`. Confirmar a inclusão de sites. |
| `/servicos/sistemas-sob-medida` | Explicar sistemas para fluxos internos, dashboards, permissões, relatórios, exportações e integrações. Vincular KMZ Nexus, Help Desk, Financeiro e Gestão Operacional conforme o escopo. | Solicitar orçamento de sistema | Card de sistemas e `src/data/projects.ts`. Confirmar integração, migração, treinamento e suporte ofertados. |
| `/servicos/automacoes-inteligentes` | Mostrar gatilhos, dados de entrada, ações, APIs e WhatsApp, com exemplo de notificação ou chamado. Explicar operação e tratamento de exceções. | Solicitar orçamento de automação | Card de automações, Agente Nexus e `VisualProofSection`. Pedir integrações disponíveis e fluxo real publicável. |
| `/servicos/ia-integrada` | Explicar agentes, análise e decisão assistida. Descrever fontes de informação, limites do agente, encaminhamento humano e exemplo de atendimento. | Conversar sobre IA | Card de IA e Agente Nexus. Pedir capacidades validadas, integrações e exemplo de uso autorizado. |
| `/servicos/sites-sob-medida` | Oferta candidata. Explicar sites institucionais, portfólios ou landing pages conforme escopo confirmado, com entregáveis, publicação, SEO e manutenção. | Solicitar orçamento de site | As regras comuns mencionam sites e `TargetAudienceSection` sinaliza presença profissional. O catálogo atual tem três cards, sem oferta própria de sites. Pedir escopo, exemplo, manutenção e aprovação antes de publicar a quarta rota. |
| `/projetos` | Organizar os cinco projetos por tipo e status atual (pronto, adaptável ou sob medida), com destaque inicial para KMZ Nexus. | Ver detalhes do KMZ Nexus | `ProjectsSection`, `ProjectCard`, `projects.ts`. Cartões passam a apontar para páginas compartilháveis. |
| `/projetos/kmz-nexus` | Detalhar pedidos, programação, carregamento e indicadores, com sequência de telas e possibilidade de adaptação. | Quero adaptar o KMZ Nexus | Dados e conteúdo de `ProjectDetailsModal` e `InteractiveDashboardMockup` identificado como demonstração. Pedir telas autorizadas, contexto da entrega e resultados verificados. |
| `/projetos/help-desk` | Mostrar abertura, triagem, prioridades, fluxo por setor, histórico e avaliação. | Quero adaptar o Help Desk | Dados e detalhes do modal. Pedir telas e confirmação de SLA e integrações disponíveis. |
| `/projetos/financeiro` | Descrever fontes, indicadores, filtros e exportações. | Quero um painel financeiro | Dados do modal e exemplo de dashboard em `VisualProofSection` como ilustração. Pedir telas anonimizadas e indicadores que podem ser divulgados. |
| `/projetos/agente-nexus` | Explicar diálogo, notificações, abertura de chamado e passagem para atendimento humano, se disponível. | Quero um agente para meu negócio | Dados do projeto e fluxo ilustrativo de `VisualProofSection`. Pedir exemplos autorizados e capacidades confirmadas. |
| `/projetos/gestao-operacional` | Mostrar um fluxo de etapas, responsáveis, permissões, histórico e indicadores. Explicar a personalização e a relação com o KMZ Nexus. | Quero mapear minha operação | Dados do projeto, detalhes do modal e ilustração de `VisualProofSection`. Pedir exemplo de fluxo e confirmar se é oferta, demonstração ou entrega real. |
| `/processo` | Explicar diagnóstico, protótipo, desenvolvimento, implantação e evolução. Dar entregáveis, marcos de aprovação e participação do cliente por etapa. | Iniciar diagnóstico | `ProcessSection`. Pedir confirmação de revisões, responsabilidades e suporte pós-entrega. |
| `/orcamento` | Preparar o pedido. Pedir objetivo, situação atual, escopo, integrações e prazo. Explicar como a Nexus estima e qual é o próximo passo. | Enviar briefing pelo WhatsApp | `CTASection` e `src/config/contact.ts`; abrir WhatsApp com mensagem contextualizada pelo serviço ou projeto. Confirmar perguntas mínimas, condições e prazo de retorno. |
| `/contato` | Oferecer conversa, e-mail e canais oficiais. Indicar orçamento para quem já tem escopo. | Falar no WhatsApp | `Footer` e `src/config/contact.ts`. Confirmar canais, horários e prazo de resposta publicáveis. |
| URL inexistente (HTTP 404) | Explicar que o endereço não existe e oferecer atalhos para Serviços e Projetos. | Voltar ao início | Layout, `Navbar` e `Footer`. Prever rota curinga para navegação interna e documento estático `404.html` no output. |

Os segmentos hoje aparecem como dores em `TargetAudienceSection` (planilhas, dependência de WhatsApp, falta de visibilidade, processos específicos, tarefas repetitivas e presença profissional) e como categorias no catálogo (gestão operacional, atendimento interno, gestão financeira, IA e WhatsApp e processos internos). Distribuir esses cenários pelas ofertas e projetos correspondentes. Uma página por setor faria sentido quando Kaio trouxer conteúdo próprio que sustente essa promessa. Confirmar status, prazos e tipos de contratação do catálogo antes de republicá-los. Pedir contexto, papel da Nexus, evidências e autorização de divulgação de cada entrega para apresentá-la como estudo de caso. Identificar os números dos mockups como ilustrativos.

## Arquitetura e alternativas consideradas

| Opção | Vantagens | Desvantagens e custo | Efeito esperado no Lighthouse |
| --- | --- | --- | --- |
| **React Router v7 Framework Mode + SSG** | Plugin do Vite, rotas aninhadas, divisão por rota e HTML/data gerados no build. Mantém componentes React e navegação cliente. | Médio. Adaptar shell, scripts, plugin, entradas e layout. Validar componentes com DOM durante o build e preservar hidratação. | Pode antecipar o LCP com conteúdo e imagem já descobertos no HTML. Hidratação e animações ainda podem consumir a thread principal. |
| React Router v7 em modo biblioteca (Declarative/Data) + SPA | Baixo custo inicial. Introduzir `react-router`, layout e rotas; Data Mode oferece `ScrollRestoration`. | Head atualizado pelo cliente tem cobertura variável entre robôs e prévias sociais. Para equivalência com SSG, adicionar pipeline próprio de renderização e hidratação, com custo médio a alto. | SPA pode atrasar o LCP até baixar e executar JS. Divisão por rota reduz JS inicial, mas o resultado depende do conteúdo real. |
| Vite MPA com HTML por entrada | Mantém Vite e entrega documentos independentes. Navegação nativa e 404 estático. | Médio a alto. Para preservar HTML de conteúdo e evitar duplicação, montar geração por templates e registro de rotas. Cada clique entre páginas carrega outro documento. | Pode reduzir TBT se hidratar apenas partes interativas. Cada carregamento de página precisa ser medido com as mesmas condições. |

Compatibilidade verificada no registro npm em 19/11/2026. `react-router@7.18.6` declara React/React DOM >=18, e `@react-router/dev@7.18.6` declara Vite ^8.0.0 e TypeScript ^6.0.0 entre as faixas aceitas. O Vite 8.0.12 declara Node ^20.19.0 ou >=22.12.0. O Tailwind 4 permanece no pipeline de Vite, com teste de build junto dos plugins. A compatibilidade declarada permite um piloto com as versões do repo. A integração do build e do preset da Vercel ainda precisa de validação.

### Vercel e SEO por página

1. Declarar rotas com layout comum e usar `ssr: false` com `prerender` enumerando todas as URLs publicadas, incluindo os slugs dos serviços e projetos. Gerar a lista e o sitemap a partir do mesmo catálogo. O React Router gera HTML e arquivos de dados no output de cliente. Manter conteúdo inicial visível antes da hidratação e concentrar uso de `window`, `document` e observadores em efeitos cliente.
2. No deploy, conferir preset e output (`build/client` no build padrão) no Preview. Servir diretamente os artefatos estáticos. Se a URL limpa precisar de ajuste, usar rewrites pontuais das URLs válidas para seus HTMLs gerados no `vercel.json` e testar a resposta. Reservar o fallback SPA para rotas cliente deliberadamente previstas. Com a Home pré-renderizada, o fallback se chama `__spa-fallback.html`. Um rewrite universal para `/index.html` serviria o HTML da Home e poderia transformar erros em soft 404; para a arquitetura estática, preservar o 404 real da Vercel com `404.html` no output, inclusive para slugs desconhecidos.
3. Renderizar no documento inicial um `title`, uma `description`, um canonical absoluto e metadados Open Graph por rota (`og:title`, `og:description`, `og:type`, `og:url`, `og:image`, `og:image:alt`); manter `pt-BR` no documento e `pt_BR` no OG. Exemplo de título: “Sistemas sob medida para empresas | Nexus Labs”. Usar imagem pública absoluta de marca ou do caso conforme o material aprovado. Definir o domínio de produção antes de publicar canonicals, OG e sitemap e evitar indexação dos previews.
4. Gerar `/sitemap.xml` com URLs absolutas, canônicas, públicas, indexáveis e com status 200. Referenciar no `robots.txt` e enviar no Search Console após confirmar o domínio. Usar links HTML rastreáveis no menu, nos cards e entre ofertas e casos.
5. Verificar URL direta e recarga em uma subpágina de serviço e uma de projeto. Conferir HTML bruto (título, conteúdo, descrição, OG e canonical), arquivos de dados, sitemap, prévia social e status HTTP real da URL desconhecida. Comparar mediana de três rodadas móveis de Lighthouse na Home, em Sobre e no caso com mockup, com a mesma configuração de rede e CPU. Avaliar LCP, TBT, CLS e SEO. As diferenças previstas na tabela são hipóteses, sem pontuação medida nesta pesquisa.

## Foto do Kaio

- Pedir retrato original autorizado para uso público, vertical com espaço para corte e resolução mínima útil de **1.200 × 1.500 px após o corte**. Propor enquadramento 4:5 de busto, rosto em evidência e fundo neutro. Usar a foto em `/sobre` junto da apresentação; na Home, considerar uma miniatura junto do link para Sobre se houver espaço e orçamento de transferência.
- Usar `picture` com AVIF, WebP e JPEG de fallback, `srcset` e `sizes` ajustados ao slot real. Ponto de partida: 320, 480, 768 e 1.200 px de largura. Alvos propostos por variante entregue: até 80 KB no mobile e 150 KB no desktop em AVIF/WebP, ajustados após inspeção do rosto. O repo já inclui Sharp e `scripts/optimize-images.mjs`, que podem servir de base.
- Declarar dimensões proporcionais para reservar espaço. Usar `object-fit: cover` com ponto focal no rosto, mantendo cor da pele e proporção. Aplicar borda `#3A3550` e detalhe de marca fora da imagem, sobre o fundo escuro. Alt sugerido: “Retrato de Kaio, [papel confirmado] da Nexus Labs”. Se a foto for o LCP em Sobre, carregar sem lazy e considerar `fetchpriority="high"`. Usar lazy apenas abaixo da dobra. Exportar derivados sem metadados privados.

## Navegação

- Layout compartilhado com logo apontando para `/`, links a Sobre, Serviços, Projetos, Processo e Contato e “Solicitar orçamento” em destaque. Menu móvel com botão nomeado, `aria-expanded`, `aria-controls`, escape para fechar, retorno de foco ao botão ao dispensar e fechamento ao selecionar destino.
- Indicar rota ativa com `aria-current="page"` quando houver correspondência exata; nas subpáginas, realçar visualmente a seção mãe. Breadcrumb visível com `nav aria-label="Caminho da página"`, lista ordenada e links aos ancestrais, por exemplo Início › Serviços › Automações inteligentes.
- Em navegação nova, restaurar o topo e mover o foco para o título ou conteúdo principal quando a rota mudar no cliente. Preservar rolagem de voltar/avançar com `ScrollRestoration` no Framework Mode e respeitar fragmentos. Manter IDs de âncoras antigas que ainda apontem para blocos da Home ou inserir links no destino legado, pois o fragmento não chega ao servidor.
- Usar Framer Motion para transição breve (faixa inicial de 120–180 ms), sem atrasar a exibição do título ou do CTA. Aplicar `MotionConfig reducedMotion="user"` e `useReducedMotion` para eliminar a transição de rota, inclusive a opacidade, quando o usuário pedir movimento reduzido. Desativar rolagem suave nessa preferência.

## Referências de portfólios

- **Superbrick** apresenta o fundador Matthew Bishop com retrato em Sobre e detalha desenvolvimento por entregáveis, processo e projetos relacionados. Para a Nexus Labs, é referência para conectar oferta técnica, evidência e pessoa responsável. Acesso em 19/11/2026. [Sobre](https://superbrick.studio/about) · [Desenvolvimento](https://superbrick.studio/services/development)
- **Coastform Studio** usa retrato e trajetória de Rob Lucas em Sobre. A página de sites explica entregáveis e etapas e leva a trabalhos publicados. Para a Nexus Labs, é referência para escrever uma página humana de fundador e uma página de serviço com escopo concreto. Acesso em 19/11/2026. [Sobre](https://coastformstudio.com/about) · [Web Design](https://coastformstudio.com/web-design)

## Impacto no projeto

- **Frontend, custo médio.** Extrair layout de `src/pages/Home.tsx` com Navbar e Footer compartilhados. Criar módulos de página, breadcrumbs e estados de navegação. Reaproveitar cards e detalhes dos modais em páginas. Coordenar com T-003 a preferência global de movimento e com as alterações de identidade em andamento.
- **Plataforma e Blue Team, custo médio.** Ajustar `package.json`, `vite.config.ts`, configuração do Router, catálogos de `src/data`, pipeline de retrato e geração de metadados e sitemap. Alinhar com T-007 para preservar favicon, cor de tema e OG. Blue Team cuida de `vercel.json` se o Preview mostrar necessidade de rewrite.
- **Conteúdo e teste.** A profundidade editorial depende de bio, foto autorizada, escopo das ofertas, domínio e material dos casos. Testar navegação, histórico, teclado, movimento reduzido, recarga e respostas HTTP no Preview, além dos viewports previstos pela T-008.

## Fontes técnicas

Todas abertas em 19/11/2026.

- [React Router, modos](https://reactrouter.com/start/modes) · [Pré-renderização na versão 7.18.6](https://reactrouter.com/7.18.6/how-to/pre-rendering) · [Build do Vite e MPA](https://vite.dev/guide/build.html)
- [Vercel, React Router](https://vercel.com/docs/frameworks/frontend/react-router) · [Vercel, Vite](https://vercel.com/docs/frameworks/frontend/vite) · [Configuração do projeto](https://vercel.com/docs/project-configuration) · [Páginas 404](https://vercel.com/docs/routing/custom-404-pages)
- [Google Search Central, SEO com JavaScript](https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics) · [Sitemaps](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap) · [Open Graph](https://ogp.me/)
- [MDN, imagens responsivas](https://developer.mozilla.org/en-US/docs/Web/HTML/Guides/Responsive_images) · [W3C WAI, breadcrumbs](https://www.w3.org/WAI/ARIA/apg/patterns/breadcrumb/) · [Motion, animações acessíveis](https://motion.dev/docs/react-accessibility) · [Chrome, métricas do Lighthouse](https://developer.chrome.com/docs/lighthouse/performance/performance-scoring)

## Verificação local

`npm run lint` passou. TypeScript de aplicação passou com `tsc -p tsconfig.app.json --noEmit --incremental false`. `npm run test -- --no-cache` encerrou com código 1 por ausência de arquivos de teste no momento da consulta. Build e E2E não executados para manter as gravações nas duas áreas autorizadas. A arquitetura foi avaliada como proposta, sem implementação ou medição de Lighthouse.

