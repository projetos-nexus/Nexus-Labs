# [TESTE] T-013 — Footer acessível (B-002 e B-004)

Resultado: **PASSOU** · Testador (opencode, principal) · 2026-11-19 22:16

Handoffs: `.equipe/handoffs/20261119-2212-maestro-para-testador-T-013.md` (Maestro) e `.equipe/handoffs/20261119-2212-tarefas-rapidas-para-maestro-T-013.md` (autor Tarefas-Rapidas/opencode).

## 1. Diff de `src/components/Footer.tsx`

`git diff` contém exatamente as mudanças esperadas para os bugs:

- **B-002**: `aria-label="Conversar no WhatsApp (abre em nova aba)"` no `<a>` do WhatsApp; `aria-label="Enviar e-mail para a Nexus Labs"` no `<a>` de e-mail; `aria-hidden="true"` em `<MessageCircle size={15} />` e `<Mail size={15} />`.
- **B-004**: os três títulos das colunas (Produto, Empresa, Contato) passaram de `<h4>` para `<h2>`.

Única alteração adicional: `fontFamily: '"Space Grotesk", sans-serif'` → `fontFamily: 'var(--font-display)'` nos três títulos. Conforme o handoff do Maestro ("outras alterações de cor/fonte são de outras tarefas"), isso pertence à unificação de tokens (T-003) / tipografia self-host (T-005) e **não é escopo da T-013**. Os demais estilos inline (`fontSize`, `fontWeight`, `color`, `letterSpacing`, `textTransform`, `marginBottom`) estão idênticos aos do commit `4e03ea0` (comparados via `git show 4e03ea0:src/components/Footer.tsx`, sem stash).

## 2. Acessibilidade (axe) e aria no 5181

`npm test` → **2 arquivos, 2 testes aprovados**, sem nenhuma linha `[axe]` no log: as violações `link-name` (B-002) e `heading-order` (B-004) desapareceram, e não há outras violações (nem `moderate`).

Verificação via Playwright no 5181 (1440×900), links de ícone do Footer:

```
wa.me/...        → aria-label="Conversar no WhatsApp (abre em nova aba)", texto="", svg aria-hidden="true"
mail.google.com  → aria-label="Enviar e-mail para a Nexus Labs",           texto="", svg aria-hidden="true"
```

Os links de texto ("WhatsApp", "E-mail") seguem com texto visível e ícones `aria-hidden` — sem duplicação de nome acessível.

`errosConsole=[]`.

## 3. Visual idêntico dos títulos (5181, 1440×900)

Estilos computados dos três `<h2>` do Footer:

| Propriedade | Produto | Empresa | Contato | Commit 4e03ea0 (h4) |
|---|---|---|---|---|
| fontSize | 12,8 px (`0.8rem`) | 12,8 px | 12,8 px | 12,8 px |
| fontWeight | 600 | 600 | 600 | 600 |
| color | `rgba(255,255,255,0.35)` | igual | igual | igual |
| letterSpacing | 1,024 px (`0.08em`) | igual | igual | igual |
| textTransform | uppercase | uppercase | uppercase | uppercase |
| marginBottom | 16 px (`1rem`) | igual | igual | igual |
| lineHeight | 14,72 px | igual | igual | 14,72 px (global `h1..h4`) |
| altura render | 14,7 px | 14,7 px | 14,7 px | — |

Tamanho, peso, cor, espaçamento e altura render preservados. A única diferença é a família da fonte (`"Montserrat Variable", sans-serif` via `--font-display`, contra `"Space Grotesk", sans-serif` no commit antigo), atribuída às tarefas de token/tipografia — fora do escopo desta entrega.

Observação de CSS: `globals.css:42-46` aplica `h1,h2,h3,h4 { font-family: var(--font-display); line-height:1.15; letter-spacing:-0.02em }`, mas os estilos inline do Footer sobrescrevem `letterSpacing` e os demais atributos — por isso o visual dos títulos não mudou com a troca de tag.

## 4. Comandos

```
npm test        → 2 passed, 2 passed, exit 0
npm run build   → ✓ 2153 modules transformed, ✓ built in 988ms, exit 0
npm run lint    → exit 0, sem erros
```

## 5. Conclusão

B-002 e B-004 corrigidos e verificados de forma independente; nenhum bug novo no escopo. Nenhum código de produção foi alterado pelo Testador; nenhum commit/branch foi feito. Script temporário de medição removido.
