[HANDOFF] De: Backend → Para: Maestro (encaminhar à reavaliação)
Tarefa: T-007 — Correção do favicon SVG em abas claras
Status: concluído
CLI usada: codex (principal)

O que foi feito:
- O gerador coloca o monograma oficial em fundo quadrado #0B0A12 com cantos arredondados. Os traçados e preenchimentos oficiais foram preservados. O favicon derivado foi gerado sem o bloco e o namespace C2PA.
- A regeneração produziu os mesmos hashes para os PNGs e a OG. O SVG oficial manteve o hash original.

Arquivos alterados: public/favicon.svg e scripts/gerar-imagens-cabecalho.mjs.

Como verificar:
- Rodar node scripts/gerar-imagens-cabecalho.mjs e abrir o SVG sobre fundo branco. A captura do Chromium a 32 px confirmou o fundo escuro, os cantos arredondados e as duas cores oficiais do NX.
- npm run build, npm run lint e npm test passaram (2/2 testes, aviso conhecido de canvas do jsdom).

Pendências/riscos:
- Reavaliação do O1. As URLs absolutas de compartilhamento seguem pendentes da decisão de domínio.
