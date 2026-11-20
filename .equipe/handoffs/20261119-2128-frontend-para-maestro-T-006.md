[HANDOFF] De: Frontend → Para: Maestro
Tarefa: T-006 — Logos provisórios da nova identidade + acessibilidade do menu mobile
Status: concluído
CLI usada: antigravity (principal)

O que foi feito:
1. Inspeção visual dos 5 PNGs em `public/nova-identidade/`:
   - `2 · Linha única@1x.png` (880×560 px): É uma prancha bipartida horizontalmente. Metade superior em fundo escuro (#0B0A12) com a assinatura "NEXUS LABS" em fonte Michroma ("NEXUS" em off-white #F4F3F8 e "LABS" em lilás médio #A78BFA). Metade inferior em fundo claro (#FAFAFC) com "NEXUS" em grafite escuro (#14121F) e "LABS" em roxo (#7C3AED). Fundo sólido em ambas as metades (sem canal alfa recortado).
   - `2 · Escuro + LABS@1x.png` (1080×1080 px): Quadrado escuro (#0B0A12) com monograma "NX" grande centralizado (N em off-white #F4F3F8, X em roxo da marca #8B5CF6). Logo abaixo, o texto "LABS" em Montserrat (#C4B5FD) posicionado entre duas linhas roxas horizontais (`— LABS —`).
   - `2e · LABS vertical@1x.png` (1080×1080 px): Quadrado escuro (#0B0A12) com monograma "NX" grande centralizado (N em off-white, X em roxo #8B5CF6). À direita do monograma, barra vertical com a palavra "LABS" orientada verticalmente (`| LABS |`) em lilás (#C4B5FD).
   - `4 · Selo LABS@1x.png` (880×560 px): Prancha bipartida horizontalmente. Metade superior em fundo escuro com "NEXUS" em Montserrat bold off-white (#F4F3F8) acompanhado de uma pílula/badge roxa (#7C3AED) com o texto "LABS" em branco. Metade inferior em fundo claro com a mesma composição sobre branco.
   - `5 · Abreviado NX@1x.png` (880×560 px): Prancha bipartida horizontalmente. Metade superior em fundo escuro com o monograma "NX" (N em off-white, X em lilás #A78BFA), uma barra vertical separadora e o texto "NEXUS" (topo) e "LABS" (base) empilhados à direita. Metade inferior com a versão correspondente para fundo claro.

2. Cópia e preparação de assets para `src/assets/logos/`:
   - Copiados integralmente os 5 PNGs e os 5 SVGs originais de `public/nova-identidade/` para `src/assets/logos/`.
   - Como os PNGs de 880×560 px contêm as duas variações (escura e clara empilhadas), se usados diretamente causariam a exibição da metade branca no layout escuro. Foi extraída a metade superior (880×280 px) com fundo #0B0A12, gerando versões web-ready com aspecto widescreen (3,14:1):
     - `src/assets/logos/logo-nexus-labs-linha-unica-dark.png` (Navbar)
     - `src/assets/logos/logo-nexus-labs-abreviado-dark.png` (Footer)
     - `src/assets/logos/logo-nexus-labs-selo-dark.png`
     - SVGs correspondentes com viewBox ajustada para `0 0 660 210`.
   - Os PNGs legados foram preservados em `src/assets/logos/` (para a tarefa de limpeza T-009/T-010).

3. Aplicação na Navbar (`src/components/Navbar.tsx`):
   - Substituído `logo-nexus-labs-dark.png` por `logo-nexus-labs-linha-unica-dark.png`.
   - Altura mantida em 38 px (desktop) e 32 px (mobile) via CSS responsivo `.navbar-logo`, com `width: 'auto'` e `objectFit: 'contain'`.
   - `alt="Nexus Labs"` mantido.

4. Acessibilidade do menu mobile (`src/components/Navbar.tsx`):
   - Adicionado `aria-label={mobileOpen ? 'Fechar menu' : 'Abrir menu'}` dinâmico no botão hambúrguer.
   - Adicionado `aria-expanded={mobileOpen}`.
   - Adicionado `aria-controls="mobile-nav-menu"` e `id="mobile-nav-menu"` no container animado do menu mobile.

5. Aplicação no Footer (`src/components/Footer.tsx`):
   - Substituído `logo-nexus-labs-tagline-dark.png` por `logo-nexus-labs-abreviado-dark.png` (versão com assinatura completa: monograma NX + divisória + NEXUS LABS).
   - Altura configurada para 46 px (resultando em ~144 px de largura proporcional), integrando-se harmonicamente com a coluna de marca.
   - `alt="Nexus Labs"` mantido.

Arquivos alterados:
- `src/components/Navbar.tsx`
- `src/components/Footer.tsx`
- `src/assets/logos/*` (novos assets adicionados sem remover os antigos)

Como verificar:
1. `npm run build` e `npm run lint` -> 0 erros, saída limpa.
2. Abrir o site no navegador:
   - Navbar: logo em linha única "NEXUS LABS" com tipografia Michroma sobre fundo escuro sem distorção.
   - Footer: logo abreviado "NX | NEXUS LABS" proporcional acima do texto descritivo.
   - Mobile (<= 767px): inspecionar botão do menu mobile, verificar `aria-label="Abrir menu"`, clicar e conferir alternância para `aria-label="Fechar menu"` e `aria-expanded="true"`.

Pendências/riscos:
- Para o Backend (T-007): a imagem quadrada `2 · Escuro + LABS@1x.png` (1080×1080) ou o monograma `5 · Abreviado NX` são os melhores candidatos para favicon e imagem OpenGraph.
- SVGs definitivos serão enviados pelo Kaio futuramente, momento em que esses PNGs provisórios poderão ser substituídos sem alteração de marcação.
