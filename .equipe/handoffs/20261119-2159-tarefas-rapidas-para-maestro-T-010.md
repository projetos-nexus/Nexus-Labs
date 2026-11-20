[HANDOFF] De: Tarefas-Rapidas → Para: Maestro (repassar ao Testador)
Tarefa: T-010 — Remover PNGs antigos sem uso em src/assets/logos
Status: concluído
CLI usada: opencode (principal)
O que foi feito:
- Para cada PNG em `src/assets/logos/`, verificado com grep do nome do arquivo em `src/`, `index.html` e `public/`.
- Removidos somente os PNGs sem nenhuma referência. Mantidos: `favicon.png` (possui referência), `nexus-labs-icon.png` e `nexus-labs-watermark-text.png` (protegidos/usados), todos os `.svg` e `README.txt`.
Arquivos alterados:
- Removidos (9 arquivos, 3.247.822 bytes no total, ~3,10 MB):
  - src/assets/logos/favicon-64.png (2.805 bytes)
  - src/assets/logos/logo-nexus-labs-dark.png (65.120 bytes)
  - src/assets/logos/logo-nexus-labs-light.png (54.642 bytes)
  - src/assets/logos/logo-nexus-labs-mono-white.png (272.757 bytes)
  - src/assets/logos/logo-nexus-labs-tagline-dark.png (107.861 bytes)
  - src/assets/logos/logo-nexus-labs-tagline-light.png (105.946 bytes)
  - src/assets/logos/logo-nexus-labs-vertical-dark.png (97.438 bytes)
  - src/assets/logos/nexus-labs-whatsapp-cover.png (1.244.402 bytes)
  - src/assets/logos/nexus-labs-whatsapp-profile.png (1.296.851 bytes)
- Mantidos (não alterados): src/assets/logos/favicon.png, src/assets/logos/nexus-labs-icon.png, src/assets/logos/nexus-labs-watermark-text.png, src/assets/logos/*.svg, src/assets/logos/README.txt
Como verificar:
- `git status` deve mostrar remoção dos 9 PNGs listados acima.
- `npm run build` — passou (exit 0). Saída: `vite v8.0.12 building client environment for production... ✓ 2150 modules transformed. ✓ built in 634ms`.
- `npm run lint` — passou (exit 0), sem erros.
Pendências/riscos:
- Nenhuma pendência identificada. Restam em `src/assets/logos/` apenas os PNGs referenciados/protegidos, os SVGs e o README.txt.