# [TESTE] T-002 — Paleta nova nos tokens (globals.css)

Resultado: **PASSOU** · Testador (opencode, principal) · 2026-11-19 21:20

Escopo conforme `.equipe/handoffs/20261119-2118-maestro-para-testador-T-002.md`. Autor: Frontend (antigravity).

## 1. Paleta em `src/styles/globals.css`

Varredura programática de todos os hex e rgb/rgba do arquivo, comparados à tabela de `.equipe/REGRAS-COMUNS.md` §2:

```
HEX_USADOS=#0B0A12,#13101F,#3A3550,#6D28D9,#7C3AED,#8B5CF6,#A09CB8,#A78BFA,#C4B5FD,#F4F3F8
HEX_FORA_TABELA=nenhum
RGB_DERIVADOS=#13101F,#8B5CF6,#A78BFA,#F4F3F8
RGB_FORA_TABELA=nenhum
TEM_COLOR_BLUE=false
CORES_ANTIGAS=
TEM_REDUCED_MOTION=true
TEM_FOCUS_VISIBLE=true
```

- Nenhum `--color-blue` / `--color-blue-light`.
- Nenhuma cor antiga (`#7B5CFF`, `#4DA3FF`, `#0B0B0F`).
- Degradês, glows, botões, seleção e scrollbar usam apenas roxo/lilás da tabela.
- Observação: existe a classe utilitária `.glow-blue`, mas é apenas um alias de compatibilidade apontando para `#A78BFA` (lilas médio), conforme declarado no handoff; não é token azul e deve ser removida após T-003/T-004.

## 2. Contraste WCAG (calculado)

Fórmula WCAG 2.1 (luminância relativa sRGB):

```
A09CB8 sobre 0B0A12 = 7.448:1
A09CB8 sobre 13101F = 7.081:1
F4F3F8 sobre 0B0A12 = 17.838:1
```

`--color-text-muted` e `--color-text-subtle` são ambos `#A09CB8`. Ambos os pares exigidos superam 4,5:1 (AA para texto normal).

## 3. prefers-reduced-motion (Chrome CDP com emulação `reduce`)

```json
{
  "modo": "reduced",
  "url": "http://localhost:5181/",
  "resultado": {
    "reduceAtivo": true,
    "scrollBehavior": "auto",
    "btnTransitionDuration": "1e-05s",
    "totalAnimacoesCss": 1224
  },
  "consoleErros": [],
  "excecoes": [],
  "logErros": [],
  "httpErros": [],
  "falhasRede": []
}
```

Comportamento normal (sem emulação) medido no modo console: `scrollBehavior: "smooth"`, `btnTransitionDuration: "0.25s"`. Com `reduce`: `auto` e `1e-05s` (0,01 ms) em 1224 elementos — as animações/transições CSS estão efetivamente desligadas.

## 4. :focus-visible ao navegar por Tab (porta 5181)

Seis pressionamentos de Tab via CDP:

```
1. A (logo, sem texto) -> focusVisible=true, outline=solid 2px rgb(139, 92, 246), offset=3px
2. A "Serviços"        -> focusVisible=true, outline=solid 2px rgba(140, 94, 246, 0.992), offset=2px
3. A "Projetos"        -> focusVisible=true, outline=solid 2px rgba(140, 94, 246, 0.992), offset=2px
4. A "Processo"        -> focusVisible=true, outline=solid 2px rgba(140, 94, 246, 0.992), offset=2px
5. A "Diferenciais"    -> focusVisible=true, outline=solid 2px rgba(140, 94, 246, 0.992), offset=2px
6. A "Quero meu sistema" -> focusVisible=true, outline=solid 2px rgb(144, 99, 246), offset=2px
```

Todos os elementos focados ficaram visíveis, com outline sólido de 2 px na cor da marca. As variações de rgba e de tom são resultado de transições/anti-aliasing no instante da captura; nenhum ficou sem outline.

## 5. Build, lint e console (saídas reais)

Executados após a entrega da T-002:

```
> npm run build
> tsc -b && vite build
vite v8.0.12 building client environment for production...
✓ 2150 modules transformed.
dist/assets/index-9jpLn5ev.css   11.04 kB │ gzip: 3.23 kB
✓ built in 650ms
Exit code: 0

> npm run lint
> eslint .
Exit code: 0 (sem erros)
```

CDP modo console: `consoleErros: []`, `excecoes: []`, `logErros: []`, `httpErros: []`, `falhasRede: []` (351 eventos). `git diff --check -- src/styles/globals.css` → exit 0.

## 6. Escopo — itens esperados, NÃO são bugs

Conforme o próprio handoff: cores inline antigas nos componentes (T-003/T-004), azul ainda aparecendo em componentes e fontes ainda do Google (T-005). Nada disso foi considerado falha nesta verificação.

## 7. Ressalvas

A verificação cobriu `globals.css` e o comportamento no navegador. Não foi feita checagem de todas as cores inline dos componentes — isso pertence a T-003/T-004.
