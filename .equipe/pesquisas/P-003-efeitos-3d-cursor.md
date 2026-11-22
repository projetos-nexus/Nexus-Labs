# [PESQUISA] P-003 — Como usar 3D que reage ao cursor sem comprometer o portfólio?

**Recomendação.** Começar com CSS 3D e o Framer Motion que o projeto já usa. Aplicar profundidade discreta à decoração do Hero da Home e, se fizer sentido após o piloto, a uma camada visual dos cartões em Serviços e Projetos. Manter a composição estática em toque e movimento reduzido e experimentar Canvas 2D antes de considerar WebGL.

## Por quê

A Home já tem título, CTAs e um mockup interativo no Hero. A experiência de cursor pode acrescentar profundidade à moldura desse mockup sem empilhar outra cena sobre os controles. A raiz já usa `MotionConfig reducedMotion="user"` e o projeto inclui Framer Motion 12.38.0, React 19.2.6 e Vite 8.3.8. O primeiro piloto pode reaproveitar a stack e manter o conteúdo, a marca e a conversão no HTML normal.

## Alternativas consideradas

Estimativas de transferência incremental em **KB gzip** (1 KB = 1.000 bytes), além do build atual. Faixas de planejamento, sem medição de um protótipo. Assets, decodificação, execução JS e GPU têm custos próprios. Nas três opções de cena, o peso incremental esperado para toque ou movimento reduzido é **0 KB de JS de cena**, desde que a elegibilidade venha antes do import e do preload.

| Opção | Prós, contras e esforço | Peso incremental estimado | LCP, TBT e INP no mobile |
| --- | --- | --- | --- |
| **CSS 3D + Motion** | Baixo. Perspectiva, camadas e tilt com APIs existentes. Funciona com o layout atual. Muitas camadas promovidas aumentam memória de GPU e filtros podem gerar repintura. | **1–5 KB** de código e CSS, se Motion estiver no trecho já carregado. Medir a diferença de imports no bundle. | Esperado neutro com conteúdo visível, slot estável e sem listeners no toque. Em ponteiro fino, limitar trabalho por frame e evitar layout reativo. |
| **Canvas 2D procedural** | Médio. Rede de pontos e linhas com profundidade simulada e sem biblioteca. Exige controlar resize, densidade, visibilidade e descarte. A alternativa shader puro em GLSL requer WebGL e tratamento de contexto, com mais custo. | **3–12 KB** para Canvas 2D sem assets, lazy. | Esperado neutro em toque se o chunk ficar ausente. Se um dispositivo elegível carregar o efeito, desenho contínuo ou DPR alto pode piorar TBT e competir com a pintura das interações. |
| **Three.js + R3F, Drei seletivo** | Alto. Profundidade e geometria reais. Mais JS, inicialização de contexto, custo GPU e testes de fallback. Geometria procedural e materiais simples reduzem o custo. Drei só se um helper demonstrar benefício. | **250–650 KB** de JS lazy como ordem de grandeza para cena curta, sem texturas nem modelos. Imports e tree-shaking alteram o total. | Esperado neutro em toque com bloqueio antes do download. Em aparelhos elegíveis, importar antes do Hero ou compilar shaders durante a primeira interação pode afetar LCP, TBT e resposta. Avaliar em perfil separado. |
| **Spline** | Rápido para autoria visual. Médio a alto para integrar, auditar e manter o runtime exportado. Viewer hospedado externamente fica bloqueado. Exportação local depende das funcionalidades efetivamente executadas. | **~592 KB** gzip para o artefato WebGL standalone de referência, mais cena e assets. O runtime modular distribui esse custo em chunks e o total depende dos caminhos ativados. | Mesmo condicionado, a inicialização em aparelhos elegíveis tem o maior risco de disputar CPU/GPU com o conteúdo. Mobile de toque só evita a carga se o viewer ficar completamente ausente. |

Âncoras para as estimativas em 22/11/2026. Foram compactados em memória os arquivos distribuídos no registro npm: Three 0.187.0, `three.module.js` 130,1 KB e `three.core.js` 291,5 KB gzip. R3F 9.8.2, entrada ESM web 2,5 KB e chunk ESM de eventos 160,9 KB gzip. Spline runtime 2.0.211, standalone WebGL 592,4 KB gzip. Esses números referem-se a arquivos de distribuição, que podem diferir do bundle final minificado. Para comparar o protótipo, medir o delta dos chunks iniciais e a soma gzip dos chunks e assets solicitados para ativar a cena, contando dependências compartilhadas uma vez. Anotar assets separadamente.

## Aplicação por página e por dispositivo

1. **Home.** Manter H1, botões e visual estático com dimensões reservadas. Aplicar perspectiva só à camada decorativa atrás do mockup ou na moldura, preservando a superfície interativa e seus alvos. Limitar o tilt a cerca de 4° por eixo, como ponto de partida. Usar Motion Values, capturar o último `pointermove` e consolidar cálculo no máximo uma vez por frame. Medir coordenadas em uma região fixa e separar a camada transformada. Preferir transformações a animar posição, tamanho ou sombras grandes. Voltar à posição neutra ao sair.
2. **Serviços e Projetos.** Usar tilt só na imagem decorativa do cartão sob o ponteiro, se o piloto justificar. Links, texto e contornos de foco ficam em plano estável. Páginas Sobre, Processo, Orçamento e Contato recebem decoração estática. Usar um efeito principal por viewport como ponto de partida.
3. **Toque e movimento reduzido.** Ativar o módulo após hidratação apenas quando houver `(hover: hover) and (pointer: fine)` e ausência de movimento reduzido. Em híbridos, só reagir a eventos de mouse. Ouvir mudanças de preferência e desmontar o efeito se a condição deixar de valer. Preservar o mockup e os CTAs utilizáveis por todos. Usar `useReducedMotion` no efeito para desativar também opacidade animada caso seja usada, pois a configuração global preserva alguns tipos de animação.
4. **Cena opcional em fase posterior.** Restringir Canvas/WebGL à Home e importar após a janela crítica do Hero. Estratégia conservadora: permitir a carga após `load`, Hero visível, primeiro paint do visual estático e um período ocioso, com ativação em botão separado como opção para controle total. `load` e idle são heurísticas, não garantem LCP concluído. Confirmar a ordem no trace e manter o pôster visível, preferindo adiar mais se a carga disputar o paint principal. Evitar prefetch ou preload pela navegação. Se a cena não for relevante na primeira visita, carregar por solicitação explícita.
5. **Aparelhos fracos e erros.** Começar sempre estático. Na opção WebGL, checar WebGL2 e preferir recusa de contexto com desempenho muito reduzido quando disponível. Renderizar sob demanda (`frameloop="demand"`), limitar DPR inicialmente a 1–1,5, usar um canvas, poucos objetos e evitar sombras, pós-processamento e texturas no piloto. Pausar com Hero fora da viewport ou aba oculta. Após inicialização, se o tempo de frame permanecer alto sob interação, reduzir resolução ou voltar ao estático pelo resto da visita. Conservar pôster em caso de falha de import, perda de contexto ou renderização. Liberar listeners, frames e recursos ao sair da rota.

## Conceitos de marca

- **Moldura NX em camadas.** O mockup fica estável à frente de três planos escuros. A borda lilás do plano de trás acompanha a direção do cursor com deslocamento curto. No estado neutro, os planos sugerem a união dos componentes de um sistema.
- **Rede de conexões.** Poucos nós roxos nas margens se ligam em trajetórias curtas. O cursor destaca somente as conexões próximas, sem perseguir o usuário nem mudar a área de leitura. No estático, a rede conserva a mesma composição. Canvas 2D é suficiente para esse conceito.
- **Monograma em profundidade.** Um contorno decorativo acompanha o NX numa área própria ao lado do texto. O cursor altera suavemente o ponto de vista da moldura, com a assinatura oficial aplicada intacta e nas cores aprovadas. WebGL só entra se essa profundidade exigir geometria real.

## Acessibilidade

- Aplicar `aria-hidden="true"` e `pointer-events: none` somente na camada decorativa, sem filhos focáveis. Receber o ponteiro pelo contêiner existente e manter canvas, camadas e mockups puramente decorativos fora da ordem de tabulação. Os controles reais do mockup e os links continuam no DOM com nome, foco e comportamento próprios.
- Informações, ações e feedback continuam acessíveis sem hover. Tab, Shift+Tab e Enter seguem a ordem normal. A decoração não muda foco nem desloca o alvo. Caso exista botão de ativação da cena, mantê-lo fora da camada oculta e acessível por teclado.
- Sem flashes, pulsos abruptos ou movimento autônomo. Manter texto sobre superfície estável da identidade para garantir pelo menos 4,5:1 no texto normal e 3:1 no grande em qualquer posição. Conferir também contraste das bordas relevantes e foco visível.

## Compatibilidade e CSP

- **React / Vite.** CSS e Canvas 2D usam APIs do navegador. Motion já integra com a versão do repo. No registro, R3F 9.8.2 declara React e React DOM >=19 <19.4 e Three >=0.156. Drei 10.7.9 declara React e React DOM ^19, Fiber ^9 e Three >=0.159. Three 0.187.0 atende aos peers. Validar um build com Vite 8 antes de aprovar a integração e montar o canvas no cliente para preservar a pré-renderização proposta na P-002.
- **CSP vigente.** `vercel.json` tem `default-src 'self'`, `script-src 'self'`, `connect-src 'self'`, `img-src 'self' data:` e `style-src 'self' 'unsafe-inline'`. `frame-src` e `worker-src` não aparecem. Para workers, a cadeia de fallback é `child-src`, `script-src`, `default-src`. Portanto o módulo de worker de mesma origem pode ser permitido, enquanto um worker gerado com URL `blob:` não deve ser presumido permitido. A permissão de estilo inline não se estende a scripts.
- **CSS, Motion, Canvas 2D e WebGL básico.** Código empacotado e hospedado na origem. CSS e Canvas 2D propostos dispensam workers, WASM e `unsafe-eval`. Uma cena procedural Three/R3F com shader GLSL compilado pelo WebGL também pode dispensar todos eles. Compilar GLSL no contexto gráfico é diferente de compilar WebAssembly. Evitar no piloto decodificadores Draco/KTX2, helpers que busquem assets externos e dependências com workers em blob ou WASM, até verificar o caminho de execução real. Servir os assets e chunks usados pela cena na mesma origem.
- **Spline.** Viewer, iframe ou arquivo de cena em domínio externo ficam fora da política atual. A exportação self-hosted é uma possibilidade documentada. Inspeção do pacote 2.0.211 encontrou referências a `WebAssembly`, `new Worker`, `createObjectURL` e `new Function` em arquivos do standalone WebGL e em chunks opcionais. Isso identifica pontos a testar, sem provar execução em toda cena. WASM pode exigir `wasm-unsafe-eval` ou `unsafe-eval` conforme o navegador e o caminho; `new Function` executado exige `unsafe-eval`. Manter Spline fora do piloto e só reconsiderar com exportação concreta que funcione sob a mesma CSP, sem depender de ampliar diretivas.

## Como validar o piloto

- Servir o build de produção em localhost com os mesmos headers do `vercel.json`. O servidor dev Vite, com HMR, não representa o carregamento de produção nem valida essa CSP por si só. No navegador, conferir Network e violações de CSP durante carregamento e uso, inclusive após trocar de rota. Verificar que toque e movimento reduzido recebem zero requests dos chunks da cena, que o pôster sobrevive a falha do WebGL e que o efeito para em aba oculta e fora da tela.
- Medir baseline e variante nas mesmas condições, com cache frio e Lighthouse mobile. Usar mediana de três a cinco execuções, registrando versão, aparelho, rede e CPU. Aplicar a meta de **≥ 90 nas quatro categorias** (Performance, Acessibilidade, Boas práticas e SEO) à Home, aos índices de Serviços e Projetos e às rotas que receberem efeitos. Usar como referências LCP ≤ 2,5 s e TBT ≤ 200 ms na leitura de laboratório. Se a variante falhar, manter o visual estático e identificar no trace o chunk, a tarefa longa ou o paint responsável.
- Lighthouse de navegação não comprova INP. Usar trace com cliques, toques e teclado no menu, mockup e CTAs, sobretudo enquanto a cena inicializa, e observar se há tarefas longas ou frames travados. Hover isolado não integra INP, mas pode atrasar interações seguintes. Quando houver amostras suficientes em produção, acompanhar INP no percentil 75, com referência de ≤ 200 ms.
- Conferir teclado, foco, contraste nos extremos de movimento, preferência reduzida antes e depois de carregar a página, toque sem cursor, pointer fino em desktop e um dispositivo menos potente. Cobrir caso de asset ausente ou contexto indisponível.

## Referências de estúdios e portfólios

Acesso em 22/11/2026. Referências de comportamento e técnicas relatadas pelos autores; as páginas não foram auditadas nesta pesquisa para atribuir pontuação Lighthouse.

- **14islands.** O estúdio documenta a versão com WebGL progressivo em que o HTML e os hovers sobrevivem à falta de WebGL, com cena adicionada somente quando elegível. Adotar a manutenção do conteúdo e o descarte dos objetos, sem replicar a composição visual. [Estúdio](https://www.14islands.com/) · [Relato técnico](https://develop.14islands.com/journal/progressive-enhancement-with-webgl-and-react)
- **basement.studio.** O case do Digital HQ descreve uma apresentação simplificada enquanto o 3D chega e separação entre cena e conteúdo estruturado. Adotar a sequência de exibição e o cuidado com trabalho na thread principal. [Estúdio](https://basement.studio/) · [Case técnico](https://basement.studio/ai/post/new-digital-hq-pt-1)
- **Bruno Simon.** O portfólio trata mouse, teclado, toque e gamepad como entradas distintas e oferece opção de qualidade. Adotar a adaptação por dispositivo e a degradação visual; a mecânica de exploração pertence àquele portfólio. [Portfólio](https://bruno-simon.com/)

## Impacto no projeto

Frontend, custo baixo para piloto em `src/components/Hero.tsx` e estilos, aproveitando a configuração em `src/App.tsx`. Cartões entram depois de validar o Hero. Plataforma só precisa revisar dependências caso avance para R3F. Testador mede Lighthouse, interações e fallback no build local e Blue Team verifica a política aplicada. A meta e os resultados de performance da futura variante dependem do piloto medido.

## Fontes técnicas

Acesso em 22/11/2026.

- [Motion Values](https://motion.dev/docs/react-motion-value) · [Motion e acessibilidade](https://motion.dev/docs/react-accessibility) · [W3C, animação por interação](https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html)
- [R3F, instalação e compatibilidade React](https://r3f.docs.pmnd.rs/getting-started/installation) · [R3F, renderização sob demanda e desempenho](https://r3f.docs.pmnd.rs/advanced/scaling-performance)
- [MDN, CSP script-src](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Security-Policy/script-src) · [MDN, CSP worker-src](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Security-Policy/worker-src) · [Spline, exportação local](https://docs.spline.design/exporting-your-scene/web/exporting-as-self-hosted-project)
- [Chrome, pontuação Lighthouse](https://developer.chrome.com/docs/lighthouse/performance/performance-scoring) · [LCP](https://web.dev/articles/lcp) · [TBT](https://web.dev/articles/tbt) · [INP](https://web.dev/articles/inp)

## Verificação local

Lint e TypeScript de aplicação passaram. O build de produção do Vite passou em memória, com `build.write=false`. Vitest passou com 2 testes e emitiu aviso do jsdom sobre falta de implementação de contexto Canvas no ambiente de testes. Lighthouse, E2E e CSP em runtime ainda precisam do piloto. O site Nexus publicado não foi testado.

