[HANDOFF] De: Frontend → Para: Maestro
Tarefa: T-006 — Logos provisórios da nova identidade + acessibilidade do menu mobile (Ajustes)
Status: concluído
CLI usada: antigravity (principal)

O que foi feito:
1. Migração completa para SVG vetorial puro (atendendo ao pedido do Kaio para nitidez em telas retina):
   - `src/assets/logos/logo-nexus-labs-linha-unica.svg` gerado para a Navbar: fundo 100% transparente (sem o path `#0B0A12`), sem os glifos da metade clara, sem metadados c2pa, com viewBox justa (`142 93.5 370 26.5`) e preservação exata das cores oficiais ("NEXUS" em #F4F3F8 e "LABS" em #A78BFA).
   - `src/assets/logos/logo-nexus-labs-abreviado.svg` gerado para o Footer: fundo 100% transparente (sem o path `#0B0A12`), sem a metade clara, sem metadados c2pa, com viewBox justa (`213 76.5 232 57`) contendo o monograma NX, divisor e a assinatura NEXUS LABS.

2. Limpeza em `src/assets/logos/`:
   - Removidas todas as cópias com "·" no nome (os originais continuam intactos em `public/nova-identidade/`).
   - Removidos os PNGs recortados provisórios.
   - Mantidos apenas os 2 SVGs novos em uso e os PNGs antigos (`logo-nexus-labs-dark.png` etc.) para a limpeza na T-010.

3. Navbar (`src/components/Navbar.tsx`):
   - Importa `logo-nexus-labs-linha-unica.svg`.
   - Como o SVG possui fundo 100% transparente, ao rolar a página sobre a barra translúcida (`rgba(11,11,15,0.88)` com backdrop-blur) não existe nenhuma caixa, borda ou retângulo em volta do logo.
   - Ajustadas dimensões responsivas: desktop 32 px de altura (max-width 320 px) e mobile 22 px de altura (max-width 220 px) com `objectFit: 'contain'`, garantindo proporção perfeita sem distorção e sem colisão com o botão mobile em 360 px.
   - Mantidos `aria-label` dinâmico ("Abrir menu"/"Fechar menu"), `aria-expanded` e `aria-controls` no botão hambúrguer.

4. Footer (`src/components/Footer.tsx`):
   - Importa `logo-nexus-labs-abreviado.svg`.
   - Fundo 100% transparente, sem bordas ou caixas sobre o fundo da seção.
   - Altura configurada para 46 px proporcional (resultando em largura ~187 px), integrando perfeitamente com a coluna de marca.

Arquivos alterados:
- `src/components/Navbar.tsx`
- `src/components/Footer.tsx`
- `src/assets/logos/logo-nexus-labs-linha-unica.svg` (novo)
- `src/assets/logos/logo-nexus-labs-abreviado.svg` (novo)
- `src/assets/logos/` (limpeza de duplicatas com "·" e PNGs recortados)

Como verificar:
1. `npm run build` e `npm run lint` -> 0 erros, saída limpa.
2. Inspecionar `src/assets/logos/` -> apenas os 2 SVGs novos e os PNGs legados.
3. Testar no navegador (porta 5180):
   - Navbar: logo transparente em linha única; ao rolar e ativar o backdrop blur, verificar que não há caixa sólida em volta do logo.
   - Viewport 360 px: menu mobile e logo sem overflow ou colisão; botão exibe `aria-label="Abrir menu"`, clica e alterna para `aria-label="Fechar menu"` com `aria-expanded="true"`.
   - Footer: logo abreviado com NX e assinatura vetorizada nítida sobre o fundo.

Pendências/riscos:
- Nenhuma pendência para o Frontend nesta tarefa. Pronto para o Testador.
