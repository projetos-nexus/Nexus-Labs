[ACHADO] S-002 — Políticas de segurança HTTP ausentes na configuração versionada
Severidade: baixa
Onde: configuração de hospedagem na raiz e resposta local de `/`.

Como reproduzir:

1. Confira a ausência de `vercel.json` e `vercel.ts` na raiz.
2. Com o preview em `127.0.0.1:5184`, execute `curl.exe -sSI http://127.0.0.1:5184/` e inspecione os cabeçalhos.

Impacto: faltam controles explícitos para restringir fontes de conteúdo, limitar incorporação em frames, impedir interpretação de tipos MIME incorretos, controlar referenciadores e limitar recursos do navegador. A home é pública, sem sessão ou área autenticada, o que limita o impacto de enquadramento neste ciclo.

Evidência: resposta local HTTP 200 com `Content-Type: text/html`, sem CSP (incluindo `frame-ancestors`), X-Frame-Options, X-Content-Type-Options, Referrer-Policy e Permissions-Policy. O comportamento da Vercel permanece sem verificação direta. HSTS também está ausente no preview HTTP e é documentado como cabeçalho da plataforma. [Documentação de cabeçalhos de resposta da Vercel](https://vercel.com/docs/headers/response-headers).

Sugestão de defesa: versionar os cabeçalhos de segurança compatíveis com a aplicação, incluindo `frame-ancestors 'none'` se não houver incorporação legítima, `X-Content-Type-Options: nosniff`, política explícita de referenciador e restrições para recursos não usados. Validar a CSP com estilos inline e animações antes da aplicação. [Configuração de cabeçalhos da Vercel](https://vercel.com/docs/project-configuration/vercel-json#headers).

## Reverificação — 2026-11-19 23:02

**Status: fechado na configuração versionada.** O `vercel.json` declara seis cabeçalhos em `/(.*)`, com `frame-ancestors 'none'` e sem rewrites. O Chromium recebeu a política por interceptação de respostas do preview em `127.0.0.1:5184`, pois o Vite serve o artefato sem interpretar a configuração da Vercel.

Em 360 e 1440 px, a página retornou HTTP 200 e renderizou com zero violações de CSP e zero erros de página ou de requisição. Em cada largura, cinco imagens e duas faces de fonte carregaram. Os 15 links de WhatsApp/Gmail conservaram destino, target e rel na comparação com o preview de referência. A verificação dos links foi feita no DOM.

Build, lint e dois testes unitários passaram. A exceção `unsafe-inline` está restrita a `style-src`. A aplicação dos cabeçalhos pela Vercel e o comportamento do HSTS em HTTPS seguem sem verificação em deploy.
