# [TESTE] T-010 — Remover PNGs antigos sem uso em `src/assets/logos/`

Resultado: **PASSOU** · Testador (opencode, principal) · 2026-11-19 22:03

Escopo conforme `.equipe/handoffs/20261119-2159-maestro-para-testador-T-010.md`. Autor: Tarefas-Rapidas (opencode), handoff `.equipe/handoffs/20261119-2159-tarefas-rapidas-para-maestro-T-010.md`.

## 1. Remoções e referências

`git status --short -- src/assets/logos` confirma exatamente as 9 remoções do handoff (favicon-64, logo dark/light, mono-white, tagline dark/light, vertical-dark, whatsapp-cover, whatsapp-profile). `git diff --stat`: 9 arquivos, 0 inserções, apenasRemoções binárias.

Busca pelos 9 nomes em `src/`, `index.html` e `public/` (exceto `public/nova-identidade/`, que é só leitura): **0 referências**.

## 2. Arquivos mantidos

`src/assets/logos/` contém apenas: `favicon.png`, `logo-nexus-labs-abreviado.svg`, `logo-nexus-labs-linha-unica.svg`, `nexus-labs-icon.png`, `nexus-labs-watermark-text.png`, `README.txt`.

Mockup do Hero, Navbar/Footer e marca d'água seguem usando os assets corretos (ver seção 3).

## 3. Renderização na porta 5181 (Chrome headless via CDP, 1440×900)

Foram encontradas 5 imagens no DOM, todas carregadas (`complete && naturalWidth > 0`):

| Contexto | Arquivo | Natural | Alt |
|---|---|---|---|
| header (Navbar) | `logo-nexus-labs-linha-unica.svg` | 300×21 | Nexus Labs |
| section (mockup Hero) | `nexus-labs-icon.png` | 512×512 | Nexus Labs |
| footer | `logo-nexus-labs-abreviado.svg` | 300×74 | Nexus Labs |
| marca d'água | `nexus-labs-icon.png` | 512×512 | (vazio, decorativo) |
| marca d'água | `nexus-labs-watermark-text.png` | 800×200 | (vazio, decorativo) |

A marca d'água foi carregada após rolagem até o fim da página por causa do `loading="lazy"`.

`httpErros=[]` (nenhum 404), `consoleErros=[]`, `excecoes=[]`.

## 4. Build e lint

```
npm run build → ✓ 2150 modules transformed, ✓ built in 629ms, exit 0
                 dist contém apenas nexus-labs-icon e nexus-labs-watermark-text como PNGs
npm run lint  → exit 0, sem erros
```

## 5. Observação (não é bug da T-010)

`src/assets/logos/favicon.png` foi mantido porque o grep casou com `/favicon.png`. Confirmei que **nenhum arquivo `.ts`/`.tsx` em `src/` importa esse PNG**: ele só aparece no próprio `README.txt` ("Copie favicon.png para public/favicon.png"). O `index.html` referencia `/favicon.png?v=3` e `/favicon.png`, que são servidos por `public/favicon.png` (existe). Portanto o exemplar em `src/assets/logos/` é provavelmente redundante — mas removê-lo não faz parte do escopo desta tarefa e não configura bug da entrega. Sugestão: avaliar limpeza em tarefa futura.
