# [TESTE] T-001 — Higiene, fontes self-host e dependências de teste

Resultado: **PASSOU** · Testador (opencode, principal) · 2026-11-19 21:20

Escopo conforme `.equipe/handoffs/20261119-2117-maestro-para-testador-T-001.md`. Autor: Backend (codex).

## 1. package.json

Verificado por leitura direta e `Select-String`:

- `react-router-dom` **ausente** de `package.json` e de `package-lock.json` (nenhuma ocorrência).
- Busca por `react-router` em `src/` → **Nenhuma ocorrência encontrada**; em `index.html` → **Nenhuma ocorrência encontrada**.
- Fontes presentes em `dependencies`: `@fontsource-variable/inter@^5.3.0`, `@fontsource-variable/montserrat@^5.3.0`, `@fontsource/michroma@^5.3.0`.
- DevDeps de teste presentes: `vitest@^5.1.1`, `@testing-library/react@^16.3.3`, `@testing-library/jest-dom@^8.0.0`, `jsdom@^31.0.1`, `vitest-axe@^0.1.0`, `@playwright/test@^1.65.1`.
- Scripts: `"test": "vitest run"` e `"test:e2e": "playwright test"`.

Resolução real dos três caminhos Fontsource:

```
@fontsource-variable/inter => file:///C:/dev/portifolio-nexus/node_modules/@fontsource-variable/inter/index.css
@fontsource-variable/montserrat => file:///C:/dev/portifolio-nexus/node_modules/@fontsource-variable/montserrat/index.css
@fontsource/michroma/400.css => file:///C:/dev/portifolio-nexus/node_modules/@fontsource/michroma/400.css
```

## 2. Lockfile e árvore de dependências

`npm ls --depth=0` — sem `missing`, `invalid`, `UNMET`, `ERESOLVE` ou `extraneous`. Árvore com 28 pacotes de primeiro nível, incluindo as três Fontsource e as seis de teste.

Não foi rodado `npm ci` na raiz, conforme instrução (o servidor do Kaio na 5173 trava binários). `git diff --check -- package.json package-lock.json` → exit 0.

## 3. Build e lint (saída real)

```
> npm run build
> tsc -b && vite build

vite v8.0.12 building client environment for production...
(node:6756) [DEP0205] DeprecationWarning: `module.register()` is deprecated. Use `module.registerHooks()` instead.
✓ 2150 modules transformed.
dist/index.html                    3.81 kB │ gzip:   1.00 kB
dist/assets/index-9jpLn5ev.css     11.04 kB │ gzip:   3.23 kB
dist/assets/index-CfbtDspT.js     436.29 kB │ gzip: 125.70 kB
✓ built in 650ms
Exit code: 0

> npm run lint
> eslint .
Exit code: 0 (sem erros)
```

## 4. Site na porta 5181 e console

Servidor já ativo em `http://localhost:5181/` (nunca 5173): `GET /` → status 200.

Chrome headless via CDP (sem novas dependências; browsers do Playwright não estão instalados neste ambiente):

```json
{
  "modo": "console",
  "url": "http://localhost:5181/",
  "resultado": {
    "title": "Nexus Labs — Sistemas premium, automações e IA para empresas",
    "bodyBg": "rgb(11, 10, 18)",
    "bodyColor": "rgb(244, 243, 248)",
    "bodyFont": "Inter, sans-serif",
    "h1Font": "\"Space Grotesk\", sans-serif",
    "secoes": 8,
    "rootChildren": 1,
    "linksWhats": 13,
    "inicioTexto": "Serviços Projetos Processo Diferenciais Quero meu sistema ..."
  },
  "consoleErros": [],
  "excecoes": [],
  "logErros": [],
  "httpErros": [],
  "falhasRede": [],
  "totalEventos": 351
}
```

Console sem erros/avisos, nenhuma exceção, nenhum 4xx/5xx e nenhuma falha de rede. Conforme esperado, as fontes ainda são do Google (troca para Fontsource é T-005).

## 5. npm audit (somente registro)

```
ALL={"info":0,"low":1,"moderate":10,"high":8,"critical":0,"total":19}
PROD_ONLY={"info":0,"low":0,"moderate":0,"high":0,"critical":0,"total":0}
TOTAL_DEPS={"prod":12,"dev":302,"optional":71,"peer":7,"peerOptional":0,"total":313}
```

Os 19 achados (1 baixa, 10 moderadas, 8 altas) são **todos de dependências de desenvolvimento** — `npm audit --omit=dev` retorna 0. O total confere com o handoff do autor. Nada foi corrigido; segue para o Red Team, conforme instrução. O aviso sobre o script de instalação do `sharp` também foi registrado.

## 6. Ressalvas

- `npm test` e `npm run test:e2e` não foram executados como critério desta tarefa: não há suítes ainda (T-008). O autor já havia registrado retorno 1 por ausência de testes na cópia de validação.
- O `git diff --check` global aponta uma linha em branco no EOF de `.equipe/notas/passagens/backend.md`, arquivo fora do escopo desta tarefa; no escopo T-001 o resultado é limpo (exit 0).
