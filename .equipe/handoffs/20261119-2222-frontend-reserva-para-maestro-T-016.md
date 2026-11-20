[HANDOFF] De: Frontend-Reserva → Para: Maestro
Tarefa: T-016 — Últimas cores fora da paleta
Status: concluído
CLI usada: codex (reserva)
O que foi feito: Navbar e Home migradas para tokens. A Navbar mantém as medidas em todos os estados e o CTA atinge 4,56:1 no ponto mais claro durante hover. Removi os SVGs de exemplo sem referências do React e do Vite. Auditoria de 36 ocorrências em src confirmou a paleta, incluindo os SVGs oficiais.
Arquivos alterados: src/components/Navbar.tsx, src/pages/Home.tsx e remoção de src/assets/{react,vite}.svg.
Como verificar: Na porta 5180, comparar a Navbar no topo e após rolar em 360, 768 e 1440 px. Abrir o menu em 360 e 768 px. Capturas antes/depois em .equipe/relatorios/frontend-qa. Build e lint passaram, Vitest 2/2 e E2E 10 passaram com 2 pulos previstos.
Pendências/riscos: Comparação confirmou a geometria. Tons de texto, bordas e CTA mudaram para aderir à paleta e ao contraste. O E2E usa 5182 pela configuração original do Testador.
