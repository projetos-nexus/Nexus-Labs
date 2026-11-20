[HANDOFF] De: Frontend-Reserva → Para: Maestro
Tarefa: T-005 — Tipografia com fontes locais
Status: concluído
CLI usada: codex (reserva)
O que foi feito: Inter Variable para corpo, Montserrat Variable para títulos e Michroma importada e disponível para assinatura textual. Navbar e Footer usam a assinatura em SVG. Links do Google Fonts removidos pela trava e referências a Space Grotesk eliminadas.
Arquivos alterados: src/main.tsx, src/styles/globals.css, index.html e componentes que declaravam Space Grotesk, inclusive Footer com aria-label e h2 preservados.
Como verificar: Em / na porta 5180, Chromium confirmou Inter e Montserrat carregadas localmente em 360, 768 e 1440 px, zero requisições a Google Fonts e zero erros de console. Build, lint e Vitest passaram (2/2).
Pendências/riscos: O jsdom emite aviso de Canvas ao executar axe. B-003 segue para T-012.
