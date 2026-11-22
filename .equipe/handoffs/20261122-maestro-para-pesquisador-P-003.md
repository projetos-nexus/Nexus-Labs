[TAREFA] P-003 — Efeitos 3D interativos (reagem ao cursor) sem quebrar desempenho e acessibilidade
Para: Pesquisador | Depende de: P-002 (concluída)
Contexto: O Kaio quer o site em várias páginas (P-002) e efeitos 3D que reajam ao cursor de quem entra, para prender a atenção. Restrições já aprovadas: identidade escura roxo/lilás (.equipe/REGRAS-COMUNS.md §2), Lighthouse mobile ≥ 90 nas 4 categorias, contraste AA, navegação por teclado, prefers-reduced-motion respeitado, CSP já versionada em vercel.json (default-src 'self'; script-src 'self'; sem CDNs externos). Stack: React 19 + Vite 8 + TS + Tailwind 4 + Framer Motion. Site atual: localhost (não testar o publicado).

Critério de aceite:
1. OPÇÕES (3 a 4) com prós/contras, peso em KB gzip, custo de implementação e impacto esperado em LCP/TBT/INP no mobile:
   - CSS 3D + Framer Motion (tilt/parallax por cursor em cartões, camadas com profundidade);
   - Three.js via @react-three/fiber (+ drei) com cena leve (ex.: monograma NX ou rede de "conexões" — nexus — reagindo ao cursor), carregada sob demanda (lazy, após o LCP, só em telas com ponteiro fino);
   - shader/canvas 2D leve (partículas/rede) como alternativa intermediária;
   - Spline ou similar: avaliar e dizer se é viável com a CSP atual (provavelmente não, por carregar de domínio externo).
2. RECOMENDAÇÃO com estratégia em camadas: onde usar 3D (Hero da Home? cabeçalho de cada página? cartões de serviço/projeto?), o que acontece em celular/toque (sem cursor), em prefers-reduced-motion e em aparelho fraco (fallback estático), e como não bloquear o conteúdo nem o LCP.
3. IDEIAS DE CONCEITO coerentes com a marca "Nexus = conexão" (2 a 3 propostas descritas em texto, sem código): o que o visitante vê e como reage ao cursor.
4. Acessibilidade: elementos 3D decorativos (aria-hidden), sem interferir em foco/teclado, sem flashes, contraste do texto sobre a cena preservado.
5. Compatibilidade com React 19 / Vite 8 / a CSP atual (WebGL não precisa de domínio externo; confirmar se algo exige 'unsafe-eval' ou worker).
6. 2 a 3 referências de sites de estúdio/portfólio com 3D interativo bem feito e rápido (links + data de acesso), e o que copiar (comportamento, não visual).
Formato [PESQUISA]. Não edite nada fora de .equipe/pesquisas/ e da sua passagem.
Entrega: .equipe/pesquisas/P-003-efeitos-3d-cursor.md
Ao terminar: maestri ask "Maestro" "P-003 pronta: <resumo de 3 linhas> — arquivo: <caminho>"
