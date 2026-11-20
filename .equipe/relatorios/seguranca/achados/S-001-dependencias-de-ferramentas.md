[ACHADO] S-001 — Dependências vulneráveis nas ferramentas de desenvolvimento
Severidade: média
Onde: `package.json`, `package-lock.json`, ferramentas de build, lint, desenvolvimento e geração de imagens.

Como reproduzir:

1. Execute `npm audit --json` e confira o campo `metadata.vulnerabilities`.
2. Compare com `npm audit --omit=dev` e use `npm ls brace-expansion browserslist nanoid postcss sharp source-map-js vite zod --all` para confirmar os caminhos.

Impacto: o Vite merece prioridade neste projeto porque há avisos de execução de comandos e acesso a arquivos no servidor de desenvolvimento, inclusive no Windows. O risco depende da exposição desse servidor e dos pré-requisitos dos avisos. No fluxo estático, Vite, PostCSS e Tailwind executam no build, que processa fontes do repositório. Lint, testes e scripts de imagem são comandos separados. O bundle serve a aplicação compilada e a auditoria da árvore de produção retornou zero.

Evidência: 19 entradas de pacotes no audit completo (8 altas, 10 moderadas e 1 baixa). Os oito pacotes abaixo têm severidade alta no registro. A severidade média deste achado considera a superfície local e de build. As versões de referência abaixo são os pisos indicados pelas faixas do audit, com disponibilidade consultada no registro. Valide a resolução final com novo audit.

| Pacote instalado | Caminho | Exposição no projeto | Possível correção |
| --- | --- | --- | --- |
| `brace-expansion@5.0.6` | ESLint e typescript-eslint → minimatch → brace-expansion | Expansão de padrões durante lint. Os padrões vêm da configuração e dos argumentos do comando. | Atualizar os pais ou avaliar override para 5.0.12 ou superior. |
| `browserslist@4.28.2` | eslint-plugin-react-hooks → @babel/core → @babel/helper-compilation-targets → browserslist | Consultas e estatísticas no fluxo do plugin de lint. Entrada dinâmica de visitantes ausente. | Resolver 4.28.7 ou superior. |
| `nanoid@3.3.12` | Vite → PostCSS → nanoid | Dependência da árvore de build. Os avisos dependem de argumentos de geração de IDs. A interface pública não fornece esses argumentos. | Atualizar PostCSS ou resolver 3.3.18 ou superior na série 3. |
| `postcss@8.5.14` | Vite → PostCSS | Processamento de CSS do repositório no build. Os avisos dependem de CSS e condições de carregamento de mapas anteriores. | Resolver 8.5.23 ou superior na série 8. |
| `sharp@0.34.5` | Dependência direta usada por `scripts/` | Decodificação durante a geração manual de imagens. O build padrão pode instalar o pacote, mas não chama esses scripts. | Atualizar para 0.35.5 ou superior e verificar os scripts de imagem. |
| `source-map-js@1.2.1` | Vite → PostCSS e @tailwindcss/vite → @tailwindcss/node | Processamento de mapas no tooling de CSS. O risco depende de mapas não confiáveis entrarem nesse processamento. | Resolver 1.2.2 ou superior nos dois caminhos. |
| `vite@8.0.12` | Direto, também compartilhado por plugins e Vitest | Executado no build. Avisos reportados concentram-se no servidor de desenvolvimento e nos seus middlewares. O preview da rodada usou loopback. | Atualizar para 8.1.6 ou superior na série 8 e validar a compatibilidade dos plugins. |
| `zod@4.4.3` | eslint-plugin-react-hooks, também via zod-validation-error | Validação no tooling de lint. O site não possui API que exponha o validador a visitantes. | Resolver 4.6.6 ou superior na série 4. |

As entradas moderadas incluem minimatch, baseline-browser-mapping e pacotes ESLint/TypeScript ESLint afetados transitivamente. A entrada baixa é @babel/core. Atualize as dependências diretas primeiro e reavalie alertas transitivos após a resolução do lockfile.


## Reverificação — 2026-11-19 23:10

**Status: fechado.** Os audits completo e com `--omit=dev` retornaram zero. A árvore instalada confirmou Vite 8.3.8, sharp 0.35.5, ESLint 10.15.0 e typescript-eslint 8.73.0.

Os quatro overrides tratam os alertas remanescentes nas dependências transitivas: `@babel/core` 7.29.13, `baseline-browser-mapping` 2.11.39, `browserslist` 4.29.6 e `zod` 4.6.7. As versões resolvidas estão acima das faixas afetadas reportadas na rodada original. A árvore foi validada com `npm ls` e pelos dois audits.

Build, lint, typecheck e 2 testes unitários passaram. A suíte E2E teve 14 aprovados e 1 ignorado por desenho no desktop, usando uma configuração temporária para o preview em 127.0.0.1:5184. Os comandos foram executados com as alterações da T-018 presentes na árvore de trabalho.

O gerador foi executado em cópia temporária com sharp 0.35.5. Dimensões e pixels decodificados coincidiram nos cinco ativos. Os bytes de `favicon.png` e `favicon-48.png` diferiram na regeneração. Os cinco originais em `public/` ficaram sem alterações no Git.
