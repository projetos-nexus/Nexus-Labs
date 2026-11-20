# [TESTE] T-006 — Logos SVG na Navbar/Footer + acessibilidade do menu mobile

Resultado final: **PASSOU** (B-001 corrigido e retestado em 21:43) · Testador (opencode, principal)
Resultado original (21:39): FALHOU por B-001 — mantido no histórico abaixo.

Escopo conforme `.equipe/handoffs/20261119-2135-maestro-para-testador-T-006.md`. Autor: Frontend (antigravity), com ajustes em `.equipe/handoffs/20261119-2135-frontend-para-maestro-T-006.md`.

## 1. [BUG] B-001 — `aria-controls` aponta para id inexistente com o menu fechado

Tarefa: T-006 | Severidade: **média**

Ambiente: Chrome headless via CDP · viewport 360×740 · `http://localhost:5181/`

Passos para reproduzir:
1. Abrir o site em 360 px sem interação.
2. Localizar o botão do menu (`aria-label="Abrir menu"`).
3. Avaliar `document.getElementById(botao.getAttribute('aria-controls'))`.

Resultado esperado: `aria-controls` referenciar um elemento existente no DOM — ou o atributo não deve estar presente enquanto o alvo não existe.

Resultado obtido: `aria-controls="mobile-nav-menu"`, mas `getElementById('mobile-nav-menu')` retorna `null` no estado fechado. O elemento `#mobile-nav-menu` só é montado quando `mobileOpen === true` (`AnimatePresence`), e é removido ao fechar.

Evidência (CDP):

```
focoInicial:      label="Abrir menu"  expanded="false"  alvoExiste=false
aposEnterAbrir:   label="Fechar menu" expanded="true"   alvoExiste=true
aposEnterFechar:  label="Abrir menu"  expanded="false"  alvoExiste=false
aposEspacoAbrir:  label="Fechar menu" expanded="true"   alvoExiste=true
aposEspacoFechar: label="Abrir menu"  expanded="false"  alvoExiste=false
```

Arquivo provável: `src/components/Navbar.tsx` (linhas 91–96, botão; linhas 116–119, montagem condicional de `#mobile-nav-menu`). Sugestão, não correção: manter o container montado e controlar apenas visibilidade/animância, ou omitir `aria-controls` enquanto o menu estiver fechado.

## 2. Itens que passaram

### Logos

- Navbar importa `logo-nexus-labs-linha-unica.svg`; Footer importa `logo-nexus-labs-abreviado.svg`; ambos com `alt="Nexus Labs"`.
- Os dois SVGs têm viewBox justa (`142 93.5 370 26.5` e `213 76.5 232 57`), `role="img"` e `aria-label`. Nenhum contém `#0B0A12`, `<rect>` ou metadados c2pa — fundo 100% transparente.

Medições nos três viewports (topo / após rolagem / footer):

| Viewport | Logo Navbar (caixa → conteúdo renderizado) | Logo Footer | Fundo/borda/sombra | Header ao rolar |
|---|---|---|---|---|
| 360×740 | 220×22 → 220×15,4 (ratio 14,286) | 187,2×46 → 186,5×46 (ratio 4,054) | transparente / 0px / none | rgba(11,11,15,0.88) + blur(20px) |
| 768×900 | 320×32 → 320×22,4 (ratio 14,286) | 187,2×46 → 186,5×46 | idem | idem |
| 1440×900 | 320×32 → 320×22,4 | 187,2×46 → 186,5×46 | idem | idem |

`objectFit: contain` em ambos; conteúdo renderizado preserva a proporção natural em todos os cenários — **sem distorção e sem corte**. Não há caixa, borda, sombra ou `background-image` no `<img>` nem no `<a>` pai, inclusive com a navbar translúcida após rolagem.

Ressalva: em 360 px a caixa do logo mede 22 px de altura, mas o conteúdo visível ocupa ~15,4 px porque `max-width: 220px` limita a largura com `object-fit: contain`. Não é corte nem distorção; apenas a altura visual efetiva é menor que a da caixa.

### Menu mobile e teclado

- `aria-label` alterna corretamente: "Abrir menu" → "Fechar menu" → "Abrir menu".
- `aria-expanded` alterna `false` → `true` → `false`.
- Tab alcança o botão em 2 passos (logo → botão) e `:focus-visible` está ativo.
- Enter e Espaço abrem e fecham o menu (sequência completa na Evidência acima).
- Sem colisão entre logo e botão em nenhum viewport; logo inteiro dentro da tela.

### Assets

- `src/assets/logos/`: **0** arquivos com "·" no nome e nenhum PNG recortado provisório.
- PNGs legados preservados (`logo-nexus-labs-dark.png`, `logo-nexus-labs-tagline-dark.png`, etc.), conforme esperado para a T-010.

### Build, lint e console

```
npm run build  → ✓ 2150 modules transformed, ✓ built in 681ms, exit 0
                 dist/assets/logo-nexus-labs-abreviado-Dx9Yocu2.svg   6.95 kB
                 dist/assets/logo-nexus-labs-linha-unica-stzr1iX9.svg 7.94 kB
npm run lint   → exit 0, sem erros
CDP            → consoleErros=[], excecoes=[], httpErros=[]
```

## 3. Prints anexados

- `.equipe/relatorios/testes/prints/T006-360.png` (360×740)
- `.equipe/relatorios/testes/prints/T006-360-footer.png` (360×740)
- `.equipe/relatorios/testes/prints/T006-768.png`
- `.equipe/relatorios/testes/prints/T006-1440.png` (1440×900)

Limitação: este modelo não consegue inspecionar imagens; a avaliação visual foi feita por estilos computados, geometria e metadados dos PNGs, não por observação direta dos prints.

## 4. Observação fora do escopo (não é bug da T-006)

Em 360 px, `documentElement.scrollWidth` é 480 (overflow de 120 px); em 768 px, 8 px. Os elementos excedentes são blocos de largura fixa de 600–700 px em seções internas (Prova visual/Dashboard/Processo), não a Navbar ou o Footer. O `body` já aplica `overflow-x: hidden`. Registrado para acompanhamento, atribuído a tarefa de responsividade, não a esta.

## 5. Escopo — itens esperados, NÃO são bugs

Cores inline antigas nos componentes (T-003/T-004) e fontes do Google (T-005), conforme o handoff.

## 6. Reteste do B-001 — 2026-11-19 21:43

Correção do Frontend em `.equipe/handoffs/20261119-2142-frontend-para-maestro-T-006-B001.md`: `src/components/Navbar.tsx:96` agora usa `aria-controls={mobileOpen ? 'mobile-nav-menu' : undefined}`.

Validação em 360×740 via CDP (porta 5181), sequência completa:

| Estado | aria-label | aria-expanded | aria-controls | alvo existe | coerente |
|---|---|---|---|---|---|
| Fechado (inicial) | Abrir menu | false | `null` | não | sim |
| Foco por Tab no botão | Abrir menu | false | `null` | não | sim |
| Após Enter (abre) | Fechar menu | true | `mobile-nav-menu` | sim | sim |
| Após Enter (fecha) | Abrir menu | false | `null` | não | sim |
| Após Espaço (abre) | Fechar menu | true | `mobile-nav-menu` | sim | sim |
| Após Espaço (fecha) | Abrir menu | false | `null` | não | sim |

**B-001 considerado corrigido.** O atributo não existe no DOM quando o menu está fechado e passa a apontar para `#mobile-nav-menu` existente quando aberto. `:focus-visible` no botão com outline `solid 2px rgb(139, 92, 246)` em todos os estados focados.

Regressão rápida da T-006:

- Navbar 360: `logo-nexus-labs-linha-unica.svg`, alt "Nexus Labs", 300×21 natural, caixa 220×22, conteúdo renderizado 220×15,4 (ratio 14,286), fundo transparente, borda 0, sem sombra, `object-fit: contain`.
- Navbar 1440: mesma imagem, caixa 320×32, conteúdo 320×22,4 (ratio 14,286), mesmos estilos.
- Footer (após `scrollIntoView`, por causa do `loading="lazy"`): `logo-nexus-labs-abreviado.svg`, alt "Nexus Labs", 300×74 natural, caixa 187,2×46, conteúdo 186,5×46 (ratio 4,054), fundo transparente, borda 0, sem sombra.
- Tab em 2 passos até o botão; Enter e Espaço abrem e fecham corretamente.
- `npm run build`: exit 0, 2150 módulos, `built in 607ms` (assets SVG presentes no dist).
- `npm run lint`: exit 0, sem erros.
- CDP: `consoleErros=[]`, `excecoes=[]`, `httpErros=[]`.

Não foi necessário atualizar os prints: a alteração foi restrita a um atributo ARIA e não afetou a aparência.
