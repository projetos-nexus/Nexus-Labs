# Rodada de segurança do ciclo 01

**4 achados (0 críticos / 0 altos / 1 médio / 3 baixos).**

| ID | Severidade | Onde | Status |
| --- | --- | --- | --- |
| [S-001](S-001-dependencias-de-ferramentas.md) | Média | Dependências de ferramentas | Fechado após reverificação |
| [S-002](S-002-cabecalhos.md) | Baixa | Configuração HTTP | Fechado após reverificação local |
| [S-003](S-003-retrato-no-artefato.md) | Baixa | Retrato no artefato estático | Aberto |
| [S-004](S-004-sprite-icones-orfao.md) | Baixa | Sprite SVG órfão no artefato | Fechado após reverificação local |

A revisão foi defensiva, com leitura de código, triagem de avisos e consultas HTTP passivas ao preview em `127.0.0.1:5184`. O site publicado ficou fora dos testes. A base foi `21a115b` em `ciclo/01-identidade`. Os comandos usaram a árvore disponível, que já tinha alterações de terceiros na infraestrutura de testes. A comparação do lockfile com o commit mostrou a adição de `@axe-core/playwright`, sem mudança nas versões dos pacotes já presentes. A conferência independente pelo Red-Team-Reserva foi concluída em 19/11 23:00 (ver seção abaixo).

- **A-001.** O audit completo retornou 19 entradas (8 altas, 10 moderadas e 1 baixa). A árvore de produção retornou zero. Caminhos, exposição e versões de referência estão em S-001.
- **Bundle.** A busca por padrões comuns de credenciais e mapas não encontrou candidatos. O e-mail e o número de contato identificados correspondem às referências públicas no código. A inspeção do artefato não revelou comentários sensíveis. A busca foi heurística.
- **HTML e arquivos públicos.** O HTML aponta para imagens locais e para o ponto de entrada próprio. Fontes são servidas do bundle. `public/nova-identidade` é copiada para `dist/`, incluindo variantes da marca e os dois retratos tratados em S-003.
- **Links e entradas.** Links com `target="_blank"` usam `noopener noreferrer`. WhatsApp usa destino fixo e codifica a mensagem com `encodeURIComponent`. O Gmail usa um destino declarado diretamente no código. A revisão estática não identificou redirecionamento dirigido por entrada do visitante, inserção de HTML a partir da URL ou rotas em `api/`.
- **Scripts e testes.** A geração de imagens é manual. Os arquivos de teste e seus scripts não aparecem em `dist/`. O build padrão executa TypeScript e Vite.
- **Verificações.** `npm run build` e `npm run lint` passaram. `npm test` passou com 2 testes e um aviso de canvas do jsdom. `npm run typecheck` falhou com TS2339 no matcher `toHaveNoViolations` em `tests/home.acessibilidade.test.tsx:29`. A suíte E2E padrão está configurada para a porta 5182 e ficou fora desta execução.

## Conferência independente — Red-Team-Reserva (opencode)

Realizada em 19/11 23:00 sobre a mesma árvore (`21a115b`, `ciclo/01-identidade`), em CLI diferente da da rodada original. Nenhum teste foi feito contra o site publicado; as requisições HTTP ficaram restritas ao preview local em loopback na porta 5186.

**Revisão dos achados existentes — concordo com os três, sem ajuste de severidade:**

- **S-001 (média):** `npm audit` reproduziu 19 entradas (1 baixa, 10 moderadas, 8 altas) e `npm audit --omit=dev` retornou `found 0 vulnerabilities`. As altas ficam em ferramentas de lint/build (`vite`, `postcss`, `nanoid`, `source-map-js`, `browserslist`, `brace-expansion`, `sharp`, `zod`), sem superfície de visitante. Média é adequada: o risco real é no ambiente local de desenvolvimento, inclusive no Windows, e não no bundle.
- **S-002 (baixa):** o preview em `127.0.0.1:5186` respondeu 200 sem CSP, X-Frame-Options, X-Content-Type-Options, Referrer-Policy e Permissions-Policy. Sem sessão ou área autenticada, baixa continua correto.
- **S-003 (baixa):** varredura de bytes em PNG/WebP de `src/assets/`, `public/` e `dist/assets/` encontrou `caBX`/`C2PA` apenas nas duas fotos em `public/nova-identidade/foto/`. Nenhum PNG usado na interface carrega esses blocos. Baixa mantida.

**Passada própria:** `npm run build` passou (2153 módulos, 447,85 kB de JS, 19,25 kB de CSS) e não gerou `.map` nem `sourceMappingURL`; o bundle só contém o e-mail e o número de WhatsApp já públicos no código, e os únicos matches de `password` pertencem ao runtime do React. Não há `dangerouslySetInnerHTML`, `innerHTML`, `eval`, `fetch`, `localStorage`, `postMessage`, parâmetros de URL ou diretório `api/`. Os 13 usos de `target="_blank"` têm `rel="noopener noreferrer"`. O WhatsApp usa número fixo e `encodeURIComponent` na mensagem; o Gmail usa endereço literal. `index.html` e `dist/index.html` carregam apenas scripts e favicons locais, sem scripts de terceiros.

**Resultado:** 1 novo achado, [S-004](S-004-sprite-icones-orfao.md) (baixa) — `public/icons.svg` não é usado em nenhum lugar e ainda é servido em `/icons.svg` no artefato final. As demais verificações não revelaram novos problemas. A reverificação das correções do Blue Team continua com o Red-Team principal.

