[HANDOFF] De: Frontend-Reserva → Para: Maestro
Tarefa: T-011 — Tamanho do logo na Navbar
Status: concluído
CLI usada: codex (reserva)
O que foi feito: SVG oficial idêntico ao original. Área visível de 22,5 px em 360 px e 29,25 px em 768 e 1440 px. Distância de 63,2 px até o menu em 360 px. Menu compacto abaixo de 900 px para evitar corte do CTA no tablet.
Arquivos alterados: src/components/Navbar.tsx e src/assets/logos/ (SVG horizontal adicionado e versão substituída removida).
Como verificar: Abrir / na porta 5180 em 360, 768 e 1440 px e conferir a Navbar. Menu testado em 360 px. Build e lint passaram. Console sem erros.
Pendências/riscos: O documento apresentou overflow fora da Navbar em 360 e 768 px. O lint inicial encontrou test-results em remoção concorrente e passou na repetição.
