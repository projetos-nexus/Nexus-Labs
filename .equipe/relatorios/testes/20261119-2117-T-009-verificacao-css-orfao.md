# [TESTE] T-009 — Remoção de CSS órfão

Resultado: **PASSOU** · Testador (opencode, principal) · 2026-11-19 21:17

Escopo conforme handoff `.equipe/handoffs/20261119-2115-maestro-para-testador-T-009.md`.
Foram ignoradas, conforme instrução, as alterações em `package.json` / `package-lock.json` (T-001) e em `src/styles/` (T-002).

## 1. Arquivos removidos e imports residuais

`git status --short` (recorte):

```
 D src/App.css
 D src/index.css
```

Busca por `(index|App)\.css`:

- `src/` → **Nenhuma ocorrência encontrada**
- `index.html` → **Nenhuma ocorrência encontrada**

`src/main.tsx` importa apenas `./styles/globals.css`; `src/App.tsx` importa apenas `./pages/Home`.

## 2. Build e lint (saída real)

```
> npm run build
> tsc -b && vite build

vite v8.0.12 building client environment for production...
(node:5636) [DEP0205] DeprecationWarning: `module.register()` is deprecated. Use `module.registerHooks()` instead.
✓ 2150 modules transformed.
dist/index.html                                          3.81 kB │ gzip:   1.00 kB
dist/assets/nexus-labs-watermark-text-5aY3fuVt.png      17.99 kB
dist/assets/logo-nexus-labs-dark-DPsFWRed.png           65.12 kB
dist/assets/nexus-labs-icon-XDUHHCSO.png                75.70 kB
dist/assets/logo-nexus-labs-tagline-dark-CsYg4fM8.png  107.86 kB
dist/assets/index-esWWG7ly.css                          10.71 kB │ gzip:   3.18 kB
dist/assets/index-Cj9KMWjw.js                          436.29 kB │ gzip: 125.70 kB
✓ built in 632ms
Exit code: 0

> npm run lint
> eslint .
Exit code: 0 (sem saída de erros)
```

O aviso `DEP0205` é do Node/Vite, é informativo e não é erro.

## 3. Site no ar (porta 5181 — nunca 5173)

```
> npm run dev -- --port 5181 --strictPort
VITE v8.0.12 ready in 248 ms
➜  Local: http://localhost:5181/
```

`GET http://localhost:5181/` → **status 200**; HTML sem `index.css` e sem `App.css`; referências a `/@vite/client`, `/@react-refresh`, `/src/main.tsx` e folha de estilo.

## 4. Renderização, console e rede (Chrome headless via CDP)

Verificação feita com Chrome headless + CDP (sem instalar dependências; Playwright browsers não estão disponíveis neste ambiente). Saída real:

```json
{
  "url": "http://localhost:5181/",
  "render": {
    "title": "Nexus Labs — Sistemas premium, automações e IA para empresas",
    "bodyBg": "rgb(11, 10, 18)",
    "bodyColor": "rgb(244, 243, 248)",
    "bodyFont": "Inter, sans-serif",
    "h1Font": "\"Space Grotesk\", sans-serif",
    "h1Text": "Sistemas premium para empresas que querem operar no próximo nível",
    "secoes": 8,
    "rootChildren": 1,
    "linksWhats": 13,
    "inicioTexto": "Serviços Projetos Processo Diferenciais Quero meu sistema SISTEMAS COM IA INTEGRADA ...",
    "folhasEstilo": 13
  },
  "consoleErros": [],
  "excecoes": [],
  "logErros": [],
  "httpErros": [],
  "falhasRede": [],
  "totalEventos": 345
}
```

Conferências:

- Fundo `rgb(11,10,18)` = `#0B0A12` e texto `rgb(244,243,248)` = `#F4F3F8` — identidade visual ok.
- Corpo em Inter e H1 em Space Grotesk — estado atual esperado (troca para Montserrat é T-005, não deste escopo).
- 8 seções montadas com conteúdo real; 13 links `wa.me` presentes; nenhum 4xx/5xx e nenhuma falha de rede.

## 5. Ocorrências transitórias do ambiente (não são bugs da T-009)

1. **Primeira tentativa de build/lint falhou** com `'tsc' não é reconhecido` / `'eslint' não é reconhecido`. Causa: `node_modules/.bin` estava sendo recriado pela instalação da T-001, que rodava em paralelo. Repetindo os comandos após a instalação, ambos passaram (saída acima).
2. **Primeira subida do dev caiu com `EBUSY`** porque o perfil temporário do Chrome usado na checagem CDP estava dentro de `tests/` e o watcher do Vite tentou monitorar o `cache.db` do navegador. O perfil foi movido para o temp do sistema e o servidor reiniciado; a checagem final rodou sem erros.

## 6. Ressalva

Não foi feita comparação pixel a pixel com uma versão anterior do site. A conclusão de que o visual não mudou baseia-se em: (a) os dois arquivos removidos não eram importados por nenhum outro arquivo; (b) apenas `globals.css` continua carregando; (c) a renderização final está íntegra e consistente com a identidade.

## 7. Arquivos de teste

Nenhum teste de produção foi alterado. O script temporário de checagem CDP foi removido após a execução; a saída real ficou registrada neste relatório.
