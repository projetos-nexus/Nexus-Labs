[ACHADO] S-004 — Sprite SVG de terceiros sem uso é publicado no artefato
Severidade: baixa
Onde: `public/icons.svg` (copiado para `dist/icons.svg`; servido em `/icons.svg`)

Como reproduzir:

1. Execute `npm run build` e confirme a presença de `dist/icons.svg` (5.031 bytes).
2. Busque `icons.svg` em `src/`, `index.html`, `vite.config.ts`, `scripts/` e arquivos de configuração: não há nenhuma referência de uso.
3. Com o preview apenas em loopback (`node node_modules/vite/bin/vite.js preview --port 5186 --strictPort --host 127.0.0.1`), execute `curl.exe -sSI http://127.0.0.1:5186/icons.svg`: HTTP 200, `Content-Type: image/svg+xml`, `Content-Length: 5031`.

Impacto: o site expõe publicamente um arquivo estático que nenhuma tela, folha de estilo ou script utiliza. Isso aumenta a superfície publicada sem benefício e coloca no pacote símbolos de marcas de terceiros (Bluesky, Discord, entre outros) e cores fora da paleta Nexus Labs (`#aa3bff`). Não há segredos, credenciais ou dados pessoais no arquivo; o risco é de exposição desnecessária e poluição do artefato final.

Evidência: o arquivo data de 17/11 e sobreviveu às limpezas de ativos. A busca por `icons.svg` em `src/**`, `index.html`, `vite.config.ts`, `scripts/**` e configs retornou zero ocorrências. O `dist/index.html` referencia apenas os favicons e a OG image, todos em uso. O parecer da T-007 (.equipe/relatorios/avaliacao/T-007.md, item S5) já apontava o arquivo como pendente de confirmação de uso; a conferência confirma que ele não é usado e chega ao bundle. A verificação HTTP foi feita somente no preview local, em loopback, na porta 5186.

Sugestão de defesa: remover `public/icons.svg` se a limpeza for confirmada. Se o sprite voltar a ser necessário, movê-lo para `src/assets/` e referenciá-lo de forma explícita, para que o build inclua apenas ativos efetivamente usados.

## Reverificação — 2026-11-19 23:03

**Status: fechado.** O sprite está ausente de `public/` e de `dist/` após novo build. A busca nas fontes, scripts, configurações consultadas e artefato não encontrou referências a `icons.svg`.

Em `127.0.0.1:5184`, `GET /icons.svg` com `Accept: image/svg+xml` retornou HTTP 404. Com o cabeçalho padrão do curl, a resposta foi HTTP 200 com `Content-Type: text/html` e corpo idêntico ao de `/`, confirmando o fallback do Vite.

Build, lint e os dois testes unitários passaram. O jsdom emitiu o aviso conhecido sobre canvas.
