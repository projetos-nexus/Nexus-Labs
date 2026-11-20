[HANDOFF] De: Frontend → Para: Maestro
Tarefa: T-006 — Logos provisórios da nova identidade + acessibilidade do menu mobile (Correção B-001)
Status: concluído
CLI usada: antigravity (principal)

O que foi feito:
- Corrigido o bug B-001 em `src/components/Navbar.tsx`: o atributo `aria-controls` do botão mobile passou a ser emitido condicionalmente (`aria-controls={mobileOpen ? 'mobile-nav-menu' : undefined}`).
- Com o menu fechado (desmontado pelo `AnimatePresence`), o atributo `aria-controls` não é renderizado no DOM (`getAttribute('aria-controls')` retorna `null`), eliminando o erro de apontar para um id inexistente no DOM.
- Com o menu aberto, `aria-controls="mobile-nav-menu"` aponta para o `#mobile-nav-menu` montado no DOM.
- Nenhuma outra alteração foi feita, preservando todos os itens que já haviam passado no teste (logos SVGs transparentes, responsividade 360/768/1440, teclado, build e lint).

Arquivos alterados:
- `src/components/Navbar.tsx`

Como verificar:
1. `npm run build` e `npm run lint` -> 0 erros.
2. Em 360 px (ou qualquer viewport mobile):
   - Menu fechado: verificar que o botão possui `aria-label="Abrir menu"`, `aria-expanded="false"` e não possui `aria-controls` (`getAttribute('aria-controls') === null`).
   - Menu aberto: ao clicar (ou Enter/Espaço), o botão passa para `aria-label="Fechar menu"`, `aria-expanded="true"` e `aria-controls="mobile-nav-menu"`, apontando para o elemento `#mobile-nav-menu` existente no DOM.

Pendências/riscos:
- Nenhuma.
