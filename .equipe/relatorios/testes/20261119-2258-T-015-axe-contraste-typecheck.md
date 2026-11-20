# T-015 — Contraste real no e2e (axe no Playwright), ajustes S2/S3/S6/S7 e teste da T-014

Status: **passou** · Testador (opencode, principal) · 2026-11-19 22:58
Correção do O1 (reprovação do Avaliador): **passou** · 2026-11-19 23:02 · ver §2 e §9.

Handoffs: `.equipe/handoffs/20261119-2214-maestro-para-testador-T-015.md` (critérios), `.equipe/handoffs/20261119-2213-backend-para-maestro-T-014.md` (dependência), `.equipe/handoffs/20261119-2305-avaliador-para-testador-T-015.md` (reprovação O1). Pareceres: `.equipe/relatorios/avaliacao/T-008.md` e `.equipe/relatorios/avaliacao/T-014-T-015.md`.

Ambiente: Playwright/Chromium em 360, 768 e 1440 (webServer na porta 5182, `--strictPort`); verificações pontuais na 5181; Vitest 5.1.1 + jsdom; axe real via `@axe-core/playwright` 4.14.0.

## 1. Teste da T-014 (seção própria)

| Verificação | Resultado |
|---|---|
| `package.json` | ✓ só 2 acréscimos necessários: script `typecheck` (`tsc --project tsconfig.test.json`) e `@axe-core/playwright@^4.14.0` em devDependencies. Nenhuma outra linha mudou (diff auditado) |
| `package-lock.json` | ✓ 17 inserções, todas referentes a `@axe-core/playwright@4.14.0` (entrada do pacote, `axe-core ~4.14.0`, engines e peerDependency). Nenhuma alteração em outras dependências |
| `tsconfig.test.json` | ✓ presente e sem divergências; inclui `tests/**/*`, `e2e/**/*`, `vitest.config.ts` e `playwright.config.ts`, com `allowJs`/`checkJs` para cobrir os `.mjs` |
| Versões coerentes | ✓ `npm ls`: `@axe-core/playwright@4.14.0` e `@playwright/test@1.65.1` compartilham `playwright-core@1.65.1` deduped |
| `@axe-core/playwright` roda | ✓ teste e2e de axe executou nas 3 larguras com `new AxeBuilder({ page })` e o import padrão resolveu para o construtor |
| Build não afetado | ✓ `npm run build` exit 0 após a instalação |

## 2. Axe real no navegador (lacuna S1 da T-008)

Novo teste `e2e/home.spec.ts:99` roda em 360/768/1440 com tags `wcag2a`, `wcag2aa`, `wcag21a`, `wcag21aa`. Resultado: **0 violações critical/serious nos 3 viewports**; nenhuma violação de qualquer impacto foi registrada.

**Correção do O1 (obrigatório da reprovação):** o `analyze()` agora roda depois de `revelarConteudo(page)`, que usa `page.emulateMedia({ reducedMotion: 'reduce' })` e rola com `mouse.wheel(0, 600)` até `scrollY + innerHeight >= scrollHeight`, aguarda 900 ms, volta ao topo e então mede. Antes, 262 de 332 textos estavam com `opacity: 0` por `inView` do framer-motion e o axe via só 16+50 nós.

Contagem de **nós** (não de regras) após a correção, com 0 textos invisíveis nos 3 viewports:

```
[axe chromium-360]  color-contrast (nós): {"passou":32,"violou":0,"incompleto":284}; textos invisíveis: 0
[axe chromium-768]  color-contrast (nós): {"passou":33,"violou":0,"incompleto":285}; textos invisíveis: 0
[axe chromium-1440] color-contrast (nós): {"passou":34,"violou":0,"incompleto":289}; textos invisíveis: 0
```

Total avaliado: 316 / 318 / 323 nós (antes: 66 em todos). O valor de 1440 (34+289) confere exatamente com a medição independente do Avaliador. O teste falha explicitamente se a cobertura cair abaixo de 100 nós, se a regra não aparecer em nenhuma lista ou se houver violação critical/serious.

O `incomplete` (284/285/289 nós) vem de gradientes, `glass` translúcido e sobreposições — causa: *"background color could not be determined due to a background gradient"* ou *"partially overlaps other elements"*. É limitação conhecida do axe, **não é violação e não foi mascarado**: a contagem está no log e o contraste desses elementos já foi medido ponto a ponto na T-002/T-016/T-017. Conforme a sugestão S2 do Avaliador, a afirmação de cobertura automatizada vale para os nós `passes`; para os CTAs com gradiente, a medição por pixel da T-017 continua sendo a referência.

## 3. Ajustes do parecer

- **S2** — `e2e/home.spec.ts` importa `WHATSAPP_NUMBER` de `src/config/contact.ts` e monta o regex a partir dele. Nenhum número fixo no teste. ✓
- **S3** — o teste não exige mais `aria-controls` com o menu fechado. Agora valida: se o atributo existir, o alvo existe no DOM (e fica visível com o menu aberto). ✓
- **S6** — `tests/setup.ts` mantém apenas `expect.extend(matchers)`; removido o import redundante `vitest-axe/extend-expect`. Como o Vitest 5 não reconhece a declaração antiga em `namespace Vi`, adicionei `tests/vitest-axe.d.ts` com a augmentação correta do módulo `vitest` (mantém `toHaveNoViolations` tipado). ✓
- **S7** — substituído o laço de `isVisible()` em todos os links por `expect(links.first()).toBeVisible()`; comentário corrigido. ✓
- **Menu mobile em 768** — o teste antes exclusivo de 360 agora roda em 360 e 768 (menu compacto vale abaixo de 900px desde a T-011); segue pulado em 1440. ✓

## 4. Ressalva do Avaliador na T-017 (S1)

Medição controlada (Playwright + CDP, 1440, foco por Tab) confirmou que o Avaliador tem razão:

```
logo apos o Tab: outline "3px solid rgb(244, 243, 248)", offset 0px
apos 400 ms:     outline "2px solid rgb(139, 92, 246)", offset 3px, :focus-visible=true
```

O valor claro de 3px era o ring padrão do Chromium capturado em transição — `.btn-primary` tem `transition: all 0.25s ease`, que anima também o outline. O estilo real, estável, é o da regra global `:focus-visible` (2px `--color-roxo`, offset 3px). **Corrigi o relatório da T-017** (`.equipe/relatorios/testes/20261119-2248-T-017-contraste-btn-primary.md`) para registrar o valor correto e a explicação. Nenhum código de produção foi alterado.

## 5. Limpeza

`tests/cdp-t011.mjs` já estava removido do working tree (`D` no git status); os demais scripts temporários `cdp-*` também não existem. Nenhum script temporário desta tarefa permaneceu.

## 6. Comandos (saída real)

```
npm run typecheck  -> exit 0, sem erros (antes: TS2339 em home.acessibilidade.test.tsx:29)
npm test           -> Test Files 2 passed (2), Tests 2 passed (2), exit 0, 3.52s
npm run test:e2e   -> 14 passed, 1 skipped, exit 0, 29.6s (15 testes; o pulado é o menu em 1440)
npm run build      -> ✓ built in 884ms, exit 0
npm run lint       -> exit 0, sem erros
```

Avisos conhecidos e não bloqueantes: `HTMLCanvasElement.getContext()` no jsdom durante axe (o `color-contrast` é medido no navegador, não no jsdom); `module.register()` deprecado no webServer do Playwright; e, após `emulateMedia({ reducedMotion: 'reduce' })`, o framer-motion emite um `console.warn` dizendo que as animações podem não aparecer como esperado. O teste de console considera apenas `console.error` e `pageerror`, portanto continua passando.

## 7. Arquivos alterados (área do Testador)

- `e2e/home.spec.ts` — axe real com rolagem e contagem de nós (O1), S2, S3, S7, menu em 768.
- `tests/setup.ts` — S6.
- `tests/vitest-axe.d.ts` — novo, tipagem do matcher para Vitest 5.
- Relatório da T-017 corrigido (item "Foco visível ao Tab").

Nenhum código de produção, nenhum `package.json`, nenhum commit/branch.

## 8. Conclusão

Critérios da T-015 e da T-014 atendidos; nenhum bug **no escopo da T-015**. A lacuna de contraste apontada pelo Avaliador na T-008 está coberta por teste automatizado em navegador real nos 3 viewports, com cobertura integral de **nós avaliados** (316/318/323, contra 66 antes da correção do O1). A conferência manual de contraste foi amostrada (§10) e, fora dela, o Avaliador encontrou o B-006 — 7 textos roxos em fundos tingidos, em correção na T-018.

## 9. Correção do O1 — registro da reprovação

Reprovação: `.equipe/handoffs/20261119-2305-avaliador-para-testador-T-015.md`, parecer `.equipe/relatorios/avaliacao/T-014-T-015.md`.

| Item | Antes | Depois |
|---|---|---|
| Estado dos textos no `analyze()` | 262/332 com opacidade efetiva < 0,1 (`inView` do framer-motion) | 0 invisíveis nos 3 viewports |
| Nós `color-contrast` em 1440 | 16 aprovados + 50 incompletos | 34 aprovados + 289 incompletos |
| Cobertura total | 66 nós | 316 / 318 / 323 nós (360 / 768 / 1440) |
| Log | contava regras (sempre 0 ou 1) | conta `nodes.length` de cada lista |

A correção usa `reducedMotion: 'reduce'` mais rolagem progressiva até o fim da página (`mouse.wheel(0, 600)` com espera de 120 ms por passo, limite de 60 passos), 900 ms de espera final e retorno ao topo antes do `analyze()`. Nenhuma regra foi desabilitada ou mascarada; as violações critical/serious seguem causando falha. Nenhum código de produção foi alterado.

## 10. Conferência manual de uma amostra dos nós `incomplete` (pedido do Maestro)

Rodei uma verificação pontual em 1440 com a página totalmente revelada, usando `withRules(['color-contrast'])`: **289 incompletos e 34 aprovados** — exatamente os números do parecer. Para cada nó amostrado medi a cor de texto computada contra o pior fundo plausível (gradiente mais claro; translúcido composto sobre `#0B0A12`), com opacidade efetiva 1,0 em todos:

| Alvo (axe) | Texto | Contraste manual |
|---|---|---|
| `.navbar-link[href$="#servicos"]` | Serviços | 7,45:1 |
| `.navbar-link[href$="#projetos"]` | Projetos | 7,45:1 |
| `.navbar-link[href$="#processo"]` | Processo | 7,45:1 |
| `.navbar-link[href$="#diferenciais"]` | Diferenciais | 7,45:1 |
| `a[href$="#cta"]` | Quero meu sistema (CTA navbar) | 5,16:1 |
| `section:nth-child(1) ... > div` | Sistemas com IA integrada | 9,83:1 |
| `h1` | Sistemas premium para empresas... | 17,84:1 |
| `h1 > .gradient-text` | operar no próximo nível | 4,65:1 a 10,67:1 (ver nota) |
| `section:nth-child(1) ... > p` | A Nexus Labs cria plataformas... | 7,45:1 |
| `p > span` | controle, velocidade e resultado. | 17,84:1 |
| `.hero-ctas > .btn-primary` | Quero meu sistema premium | 5,16:1 |
| `.btn-secondary` | Ver projetos prontos | 17,84:1 |

**Nota sobre `.gradient-text`:** uma primeira medição genérica tratou o `background-image` como fundo e apontou 1,67:1 — falso positivo. O CSS (`src/styles/globals.css:71-76`) usa `background-clip: text` e `-webkit-text-fill-color: transparent`, ou seja, o gradiente `#8B5CF6 → #C4B5FD` é a **cor do texto**, e o fundo real é `#0B0A12`. O contraste correto vai de **4,65:1** (`#8B5CF6`) a **10,67:1** (`#C4B5FD`), ambos acima de 4,5:1. O mesmo vale para `.gradient-text-warm` (`#C4B5FD → #A78BFA → #8B5CF6`, 7,24:1 a 10,67:1). Nenhum dos 12 nós amostrados revelou violação real.

O motivo reportado pelo axe para 11 dos 12 nós foi *"background color could not be determined due to a background gradient"* (o fundo da página é um gradiente); para `h1`, *"partially overlaps other elements"*. Isso confirma que os `incomplete` são limitação do axe sobre gradientes/transparências. O script temporário (`tests/cdp-t015-incomplete.mjs`) foi removido após o uso.

**Ressalva posterior (B-006 / T-018):** a amostra acima é apenas uma amostra — **não** cobre os 289 nós incompletos, e a frase "o contraste desses elementos já foi medido ponto a ponto" da seção 2 **não se aplica** a todos eles. O Avaliador encontrou, fora dos 12 nós conferidos, **7 textos roxos/lilás com contraste estimado entre 4,0 e 4,2:1** sobre fundos tingidos de roxo: o "6+" do ProjectCard, "KPIs…" e "Agente" na VisualProofSection, os números das etapas na ProcessSection e provavelmente "Iniciado" na CTASection. Isso virou o **B-006**, em correção pelo Frontend-Reserva na **T-018**. Quando o teste da T-018 chegar, esses nós devem ser medidos contra a **cor real do fundo onde o texto está**, considerando o tingimento da camada de baixo (não apenas o fundo da página), com varredura de todos os textos com cor roxa ou lilás. Nenhum código de produção foi alterado nesta revisão do relatório.

**Encerramento do B-006 pela T-018:** a T-018 foi executada e **passou**. Os nós citados acima foram medidos contra o fundo real nos 3 viewports: `6+` 6,18–6,52:1, `KPIs em tempo real` 6,64:1, `Agente` 6,58–6,59:1, `01`/`05` 6,34:1, `Iniciado` 6,21–6,22:1 e `hoje` 6,84–6,88:1. Os 8 títulos com gradiente ficaram entre 6,11 e 7,24:1. Relatório completo: `.equipe/relatorios/testes/20261119-2330-T-018-fundo-real-B-006.md`. A ressalva desta seção permanece válida como registro histórico: a amostra de 12 nós da T-015 nunca cobriu os 289 incompletos.
