# [PESQUISA] P-001 — Auditoria do site atual × nova identidade + referências de portfólios premium

**Para:** Maestro · **Por:** Pesquisador-Reserva (OpenCode) · **Data:** 17/11/2026 · **Status:** entregue

## Recomendação

Remover o azul `#4DA3FF` e substituí-lo pelo lilás médio `#A78BFA` nos 59 pontos onde ele aparece (concentrado em dashboard, prova visual e processo), deixando `#8B5CF6` como acento único — a decisão final de manter ou não o azul é do Kaio. Manter **Inter** no corpo e trocar apenas **Space Grotesk → Montserrat** nos títulos, com **Michroma** restrito à assinatura "NEXUS LABS"; antes de qualquer ajuste visual, corrigir os textos com opacidade ≤ 0,4 para `#A09CB8`, que hoje falham WCAG AA.

## Por quê

- A identidade nova é monotemática em roxo/lilás (`#8B5CF6`, `#A78BFA`, `#C4B5FD`, `#7C3AED`). O azul não existe na tabela e hoje funciona como **segundo acento**, não como detalhe: aparece em 13 arquivos, no gradiente `.gradient-text` (10 usos), na orbe de 600px do Hero, em linhas de separação, glows e ícones de status.
- Os textos secundários do site são feitos de `rgba(255,255,255,0.2–0.4)` sobre `#0B0B0F`. Medido: 0,2 → **1,78:1**, 0,25 → 2,15:1, 0,4 → 3,80:1. O WCAG 2.2 SC 1.4.3 exige **4,5:1** para texto normal. O `#A09CB8` da nova tabela dá **7,43:1** e resolve de uma vez.
- A tipografia atual foi carregada só no `index.html` (Google Fonts) e replicada em 13 componentes via `fontFamily` inline. Trocar o nome da fonte é barato agora; depois da migração, espalhado em inline styles, fica caro.

## Alternativas consideradas

- **Manter o azul como "cor funcional de dados"** (métricas do dashboard) — prós: distingue dados de interface e evita 59 edições; contras: cor fora da identidade, exige decisão registrada do Kaio e mantém dois acentos concorrentes. Recomendação: só se o Kaio aprovar explicitamente.
- **Trocar Inter por Montserrat também no corpo** — prós: coerência total com a marca; contras: Montserrat é mais larga e cansa em parágrafos longos, e as REGRAS-COMUNS dizem manter Inter até decisão do Kaio.
- **Google Fonts (atual) × @fontsource self-host** — Google: pró = zero trabalho de build; contra = DNS/TCP extras, sem version lock e telemetria. @fontsource: pró = performance, versão travada no `package.json`, offline e privacidade; contra = mais uma dependência (só Backend pode instalar) e pesa no bundle local. Caminho intermediário: manter Google com **variable fonts** (`wght@100..900`) e `display=swap`, reduzindo 10 requisições de peso para 2 arquivos.
- **PNG @1x × SVG para os logos novos** — os 5 arquivos entregues são PNG @1x (sem SVG). Pró: leves (27–45 KB); contra: não escalam em retina/OG e não permitem recolorir N/X por CSS. Recomenda-se pedir export SVG ao Kaio.

## Impacto no projeto

| Área | Arquivos afetados | Custo |
|---|---|---|
| Cores | `src/styles/globals.css` (toda a paleta `@theme`, gradientes, glows, scrollbar, foco) + 12 componentes com hex/rgba inline + `index.html` (`theme-color`) | Médio — mecânico, mas 59 pontos de azul |
| Fontes | `index.html` (link Google), `globals.css` (`--font-*`, `body`, `h1–h4`) e 13 componentes com `"Space Grotesk"` inline | Baixo-médio; instalação de `@fontsource` depende do Backend |
| Logos | `Navbar.tsx`, `Footer.tsx`, `BrandWatermark.tsx`, `InteractiveDashboardMockup.tsx`, `index.html`, `public/favicon.png`, `public/og-nexus-labs.png` | Médio — troca de assets + decisão de SVG |
| Seções | `src/pages/Home.tsx` e 6 componentes de seção | Médio — fundir seções mexe em layout |
| A11y/SEO | `globals.css`, componentes com texto `rgba`, `index.html` | Baixo, mas bloqueante para aprovação |
| Testes | Nenhum teste existe hoje | Alto se entrar no ciclo 1 (precisa de Vitest + axe-core) |

---

# Anexo A — Auditoria de CORES

## A.1 Paleta atual (`src/styles/globals.css`, linhas 3–19)

| Token atual | Valor | Destino na identidade | Ação |
|---|---|---|---|
| `--color-bg` | `#0B0B0F` | `#0B0A12` | Ajuste sutil de matiz (usado também em `body`, `<html>`, Home.tsx:15, Navbar, scrollbar) |
| `--color-surface` | `#12121A` | `#13101F` | Renomear valor |
| `--color-surface-alt` | `#1A1A26` | sem equivalente | Fundir em `#13101F` ou manter como variação local (decisão do Frontend) |
| `--color-border` | `rgba(255,255,255,0.08)` | `#3A3550` | Trocar alpha por borda sólida |
| `--color-border-strong` | `rgba(255,255,255,0.14)` | `#3A3550` | Idem |
| `--color-purple` | `#7B5CFF` | `#8B5CF6` | Mapeado |
| `--color-purple-light` | `#9B82FF` | `#C4B5FD` | Mapeado (melhora contraste de 5,5:1 → 10,64:1) |
| `--color-blue` | `#4DA3FF` | **não existe** | Remover → `#A78BFA` (recomendação) |
| `--color-blue-light` | `#7BBFFF` | **não existe** | Remover → `#C4B5FD` |
| `--color-text` | `#FFFFFF` | `#F4F3F8` | Mapeado |
| `--color-text-muted` | `rgba(255,255,255,0.6)` | `#A09CB8` | Mapeado |
| `--color-text-subtle` | `rgba(255,255,255,0.35)` | `#A09CB8` | **Falha AA hoje (3,12:1)** → mapear |

## A.2 Cores fora da tabela encontradas em `src/**`

| Cor | Ocorrências | Onde | Destino sugerido |
|---|---|---|---|
| `#4DA3FF` | 35 | CTASection, DiferenciaisSection, Dashboard, VisualProof, Process, Services, ProjectCard, projects.ts… | `#A78BFA` |
| `rgba(77,163,255,…)` | 24 | mesmos arquivos + Footer + globals.css (`.glow-blue`) | `rgba(167,139,250,…)` |
| `#7B5CFF` / `rgba(123,92,255,…)` | 23 + 65 | paleta base, gradientes, glows, focus, selection, scrollbar | `#8B5CF6` / `rgba(139,92,246,…)` |
| `#9B82FF` | 22 | badges e destaques | `#C4B5FD` |
| `#4ADE80` | 16 | status "Implantação"/pulse em CTASection | **Fora da tabela** — decidir com Kaio; sugerir `#C4B5FD` ou texto neutro |
| `#6244E8` | 1 | gradiente de `.btn-primary` | `#7C3AED` |
| `#0F0F16`, `#12121A`, `#1A1A26` (rgba) | vários | glass cards e fundos de cards | `#13101F` |
| Paleta de template | ~20 | `src/index.css` + `src/App.css` (`#aa3bff`, `#c084fc`, `#16171d`, `#f4f3ec`) | **Arquivos órfãos** — `main.tsx` importa só `styles/globals.css`. Sugere-se remover |

## A.3 Peso visual do azul (#4DA3FF / rgba 77,163,255) — 59 usos em 13 arquivos

| Arquivo | Usos | Peso visual |
|---|---:|---|
| `InteractiveDashboardMockup.tsx` | 13 | Alto — cor de dados do mockup principal do Hero |
| `VisualProofSection.tsx` | 9 | Alto — toda a seção de prova visual |
| `ProcessSection.tsx` | 6 | Médio — etapas e linha do tempo |
| `TargetAudienceSection.tsx` | 4 | Médio |
| `DiferenciaisSection.tsx` | 4 | Médio — 4 dos 8 cards usam azul como `accent` |
| `styles/globals.css` | 4 | Alto — `--color-blue`, `--color-blue-light`, `.gradient-text`, `.glow-blue` |
| `ServicesSection.tsx` | 3 | Médio |
| `CTASection.tsx` | 3 | Alto — gradiente da linha superior do card |
| `ProjectCard.tsx` | 3 | Médio |
| `data/projects.ts`, `Footer.tsx`, `ProjectDetailsModal.tsx` | 2 cada | Baixo |
| `Hero.tsx` | 1 | Alto — orbe de 600px com blur 40px no canto inferior direito |

**Leitura:** o azul é o "segundo acento" do site, presente justamente nas seções de maior valor comercial (Hero, Prova visual, CTA, Diferenciais). Não é uma troca de 2 linhas de CSS.

---

# Anexo B — Auditoria de FONTES

## B.1 Onde hoje

- `index.html:52–57`: `preconnect` para `fonts.googleapis.com` e `fonts.gstatic.com` + CSS2 com `Inter:wght@300;400;500;600;700` e `Space+Grotesk:wght@400;500;600;700;800`, `display=swap`.
- `globals.css:17–18`: `--font-sans: "Inter"`, `--font-display: "Space Grotesk"`.
- `globals.css:33–46`: `body` usa Inter; `h1–h4` usam Space Grotesk com `letter-spacing: -0.02em`.
- **33 ocorrências** de `"Space Grotesk"` em **13 arquivos** — todos os componentes de seção repetem `fontFamily` inline (Hero, Services, TargetAudience, Projects, Process, VisualProof, Diferenciais, CTA, Footer, ProjectCard, ProjectDetailsModal, Dashboard, globals.css).
- `index.css:14–16` e `App.css` usam `system-ui/Segoe UI/Roboto`, mas são órfãos.

## B.2 O que muda

| Elemento | Hoje | Nova identidade | Ação |
|---|---|---|---|
| Corpo | Inter | Inter (até decisão do Kaio) | Manter |
| Títulos h1–h4 | Space Grotesk | **Montserrat** | Trocar em 13 arquivos |
| Assinatura "NEXUS LABS" | — | **Michroma** (linha única) | Adicionar em Navbar/Footer |
| Monograma NX | — | **Montserrat 800** | Usar na versão abreviada |
| "NEXUS" / "LABS" espaçado | — | Montserrat 500–600, tracking largo | Usar nos selos |

## B.3 Carregamento — impacto em desempenho

- **Atual (Google Fonts):** 2 preconnects + 1 stylesheet + até 10 arquivos de fonte (5 pesos × 2 famílias). O próprio Google recomenda pedir só os pesos usados ou um range variável; `display=swap` já está correto.
- **@fontsource (self-host):** elimina DNS/TCP extras, trava versão no `package.json`, funciona offline e evita telemetria do Google. Custo: nova dependência (Backend instala) e arquivos no bundle.
- **Híbrido recomendado se ficar no Google:** `family=Inter:wght@100..900&family=Montserrat:wght@100..900&display=swap` + `family=Michroma` separado, e `text=` para a assinatura (o Google afirma redução de até 90% no arquivo quando se pede só os glifos necessários).

---

# Anexo C — Auditoria de LOGOS

## C.1 Como está hoje

| Lugar | Arquivo | Tamanho | Observação |
|---|---|---:|---|
| Navbar | `src/assets/logos/logo-nexus-labs-dark.png` | 65 KB | 38px desktop / 32px mobile, `alt="Nexus Labs"` |
| Footer | `logo-nexus-labs-tagline-dark.png` | 108 KB | 52px |
| Marca d'água (ícone) | `nexus-labs-icon.png` | 76 KB | fixed, bottom-left, opacity 0,52 |
| Marca d'água (texto) | `nexus-labs-watermark-text.png` | 18 KB | fixed, bottom-right, opacity 0,52, some-se no mobile |
| Dashboard do Hero | `nexus-labs-icon.png` | 76 KB | reaproveitado em 28px |
| Favicon | `public/favicon.png` | 76 KB | `?v=3` e `apple-touch-icon` no `index.html` |
| OG/Twitter | `public/og-nexus-labs.png` | 585 KB | imagem antiga |
| Não referenciados | `mono-white` (273 KB), `tagline-light`, `light`, `vertical-dark`, `whatsapp-cover` (1,24 MB), `whatsapp-profile` (1,30 MB), `favicon-64.png` | ~3 MB | candidatos a limpeza |

## C.2 Nova identidade (somente leitura)

`public/nova-identidade/` contém **5 PNGs, todos com alpha, nenhum SVG**:

| Arquivo | Dimensão | Peso | Uso sugerido (provisório — conferir visualmente) |
|---|---|---:|---|
| `2 · Escuro + LABS@1x.png` | 1080×1080 | 45 KB | arte quadrada: OG, placeholder, selo grande |
| `2e · LABS vertical@1x.png` | 1080×1080 | 45 KB | marca d'água / ícone quadrado |
| `2 · Linha única@1x.png` | 880×560 | 30 KB | Navbar e Footer (assinatura Michroma) |
| `4 · Selo LABS@1x.png` | 880×560 | 28 KB | cartões, badges, seção "Sobre" |
| `5 · Abreviado NX@1x.png` | 880×560 | 28 KB | favicon, watermark compacto, mockup do Hero |

**Mapeamento para as 5 versões da marca (REGRAS-COMUNS §2):** "Escuro + LABS" → marca principal; "LABS vertical" → marca d'água; "Linha única" → cabeçalho/rodapé; "Selo LABS" → badges; "Abreviado NX" → favicon/ícone.

**Limitação declarada:** este modelo não aceita entrada de imagem, então **não foi possível conferir visualmente** o conteúdo dos PNGs nem a cor exata do N/X em cada arquivo. O mapeamento acima é inferido por nome, dimensão e pela descrição das regras — o Frontend deve validar antes de trocar. Recomenda-se pedir ao Kaio as versões em SVG (ou @2x) para retina e para permitir a regra "N branco / X roxo".

---

# Anexo D — Auditoria de SEÇÕES

## D.1 Seções atuais (`src/pages/Home.tsx`)

`Navbar` → `Hero` → `Serviços` (#servicos) → `Público-alvo` (sem id) → `Projetos` (#projetos) → `Prova visual` (sem id) → `Processo` (#processo) → `Diferenciais` (#diferenciais) → `CTA` (#cta) → `Footer` → `BrandWatermark`.

## D.2 Mapa para as seções da marca

| Atual | Ação | Resultado na marca | Justificativa |
|---|---|---|---|
| Hero | **Manter** | Abertura (fora da lista, mas essencial) | Headline + CTA + stats + mockup; é a vitrine |
| Público-alvo + Diferenciais | **Fundir** | **Sobre** (criar) | Hoje não existe "Sobre"; esses dois blocos respondem "para quem" e "por que nós" |
| Serviços | **Manter** | Serviços | Já bate com os 3 pilares |
| Projetos + Prova visual | **Fundir** | Projetos | Prova visual é vitrine de UI, não seção autônoma; reduz 400+ linhas e 9 usos de azul |
| Processo | **Manter** | Processo | Já alinhado |
| CTA | **Renomear** | **Orçamento** | Já tem "Próximo passo" + WhatsApp; vira a seção de orçamento |
| Footer | **Manter + âncora** | Contato | Já tem WhatsApp/e-mail; adicionar `id="contato"` |
| BrandWatermark | **Remover (recomendado)** | — | `position: fixed`, `z-index: 30`, opacity 0,52 — pode sobrepor modal e polui o visual premium. Decisão do Kaio |

**Ordem resultante sugerida:** Hero → Sobre → Serviços → Projetos → Processo → Orçamento → Contato. Exatamente as 6 seções da marca + a abertura.

---

# Anexo E — Achados extras

## E.1 Acessibilidade (bloqueante)

1. **Contraste AA falha** em textos `rgba(255,255,255,0.2–0.4)` sobre `#0B0B0F`: 1,78:1 / 2,15:1 / 2,59:1 / 3,12:1 / 3,80:1. Exemplos reais: `Footer.tsx:231` (`Feito com precisão…`, @0,2), `Footer.tsx:228` (@0,25), `Navbar.tsx:59` e quase todos os eyebrow de seção (@0,4). Corrigir para `#A09CB8` (7,43:1) ou no mínimo @0,5 (5,32:1). Referência: WCAG 2.2 SC 1.4.3.
2. **Sem `prefers-reduced-motion` em nenhum arquivo**, apesar do uso intenso de Framer Motion (`Hero`, `Navbar`, modal, seções). Adicionar `@media (prefers-reduced-motion: reduce)` em `globals.css`.
3. **Botão do menu mobile sem `aria-label`** (`Navbar.tsx:91–106`) — só ícones `Menu`/`X`; adicionar `aria-label` e `aria-expanded`.
4. Já ok: `lang="pt-BR"`, `:focus-visible` com outline, `role="dialog"` + `aria-label` no modal, imagens decorativas com `alt=""` + `aria-hidden`.

## E.2 SEO / head

- `index.html:39–40`: `og:url` ainda é `https://seudominio.com.br` (TODO). **Bloqueante para publicar.**
- `theme-color: #0B0B0F` → trocar para `#0B0A12`.
- Falta `canonical`, `twitter:site` e OG image nova (a atual tem 585 KB e usa o logo antigo).
- Não existe `vercel.json` — deploy previsto, mas sem config de roteamento/cache.

## E.3 Peso e dependências

- **Não rodei `npm run build`** para não gerar `dist/` fora da minha área; os números abaixo são de código e arquivos, não de bundle medido. O Frontend/Backend deve medir na entrega.
- 10 pesos de fonte via Google (Inter 5 + Space Grotesk 5) — usar variable fonts reduz para 2–3 arquivos.
- `react-router-dom@7.15.0` está no `package.json` mas **não é importado em nenhum `.ts`/`.tsx`** (`App.tsx` só renderiza `Home`). Candidato a remoção — precisa de decisão do Maestro/Backend.
- `framer-motion` e `lucide-react` são usados; `sharp` está em devDependencies (provavelmente para gerar os assets).
- ~3 MB em PNGs não referenciados em `src/assets/logos/` (WhatsApp cover/profile e mono-white).
- **Nenhum teste existe**: sem `*.test.*`, sem `vitest.config`, sem `playwright.config`, sem pastas `tests/` ou `e2e/`. Sugere-se incluir smoke test + `axe-core` no ciclo 1 para travar os contrastes.

---

# Anexo F — Referências de portfólios premium (estrutura, não visual)

| # | Site | Link | Acessado | O que vale copiar |
|---|---|---|---|---|
| 1 | Instrument | https://instrument.com/ | 17/11/2026 | Nav enxuta (Work / Services / About / Contact); proposta em uma frase ("We make brands, products, websites, and campaigns"); "Recent work" com filtros por tipo; client roster como prova social; **um CTA final único** ("Start a Project"). |
| 2 | Metalab | https://www.metalab.com/ | 17/11/2026 | Headliner com posicionamento + prova de longevidade ("Since 2006") + verbo de entrega ("design, build, and ship"). Sem carrossel: uma frase e um botão. |
| 3 | Locomotive | https://locomotive.ca/ | 17/11/2026 | "Featured work" com poucos casos + "See all projects"; parágrafo curto de agência; área de artigos/cultura separada da home; contato com e-mail e endereço reais. |
| 4 | Hello Monday | https://hellomonday.com/ | 17/11/2026 | Vitrine filtrável por tipo de entrega (Experiences / Platform / Branding / Products) e **contatos segmentados por intenção** (new business / general / careers) — modelo direto para separar Orçamento de Contato na Nexus Labs. |

Padrão comum aos 4: poucas seções, um CTA por página, prova de trabalho antes de depoimentos, e contato como destino final. Nenhum deles usa "Diferenciais" como seção separada — reforça a fusão em "Sobre".

---

# Fontes

- W3C — WCAG 2.2, SC 1.4.3 Contrast (Minimum): https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html — acessado em 17/11/2026.
- Fontsource — Introduction (self-hosted fonts: performance, version locking, privacidade, offline): https://fontsource.org/docs/ — acessado em 17/11/2026.
- Google Fonts — CSS API v2 (variable fonts, `display=swap`, `text=`, otimização de latência): https://developers.google.com/fonts/docs/css2 — acessado em 17/11/2026.
- Instrument: https://instrument.com/ — acessado em 17/11/2026.
- Metalab: https://www.metalab.com/ — acessado em 17/11/2026.
- Locomotive: https://locomotive.ca/ — acessado em 17/11/2026.
- Hello Monday: https://hellomonday.com/ — acessado em 17/11/2026.

**Limitações da pesquisa:** `websearch` foi cancelado pela ferramenta; usei `webfetch` direto e só citei páginas que responderam. `Active Theory` (https://activetheory.net/) respondeu apenas o título e por isso **não** foi usado como referência. Não foi possível visualizar as imagens `public/nova-identidade/` neste modelo; o mapeamento de logos é provisório e precisa de validação visual pelo Frontend. Nenhuma decisão foi tomada nesta pesquisa — apenas recomendações ao Maestro/Kaio.
