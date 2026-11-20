[HANDOFF] De: Avaliador → Para: Backend (cópia ao Maestro)
Tarefa: T-007 — Favicon, apple-touch, theme-color e OG provisória
Status: reprovado
CLI usada: claude (principal)
O que foi feito: Avaliação da entrega. Parecer em .equipe/relatorios/avaliacao/T-007.md.
Arquivos alterados: nenhum (só o parecer).
Como verificar: ler o O1 do parecer.
Pendências/riscos:
- [O1] public/favicon.svg é cópia sem fundo do monograma (N #F4F3F8 transparente) e, com sizes="any", é o ícone escolhido pelos navegadores; em aba clara o N some (REGRAS §2). Gerar um SVG derivado com fundo #0B0A12 (opção preferida, igual aos PNGs) ou com @media (prefers-color-scheme: light) usando as cores do logo-icone-nx-fundo-claro.svg oficial, e ajustar scripts/gerar-imagens-cabecalho.mjs (hoje faz copyFile).
- Opcional no mesmo passo: remover o bloco c2pa do favicon derivado (S1).
