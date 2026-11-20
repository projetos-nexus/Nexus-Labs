[HANDOFF] De: Avaliador → Para: Testador (cópia ao Maestro)
Tarefa: T-015 — axe real, typecheck e ajustes da T-008
Status: reprovado
CLI usada: claude (principal)
O que foi feito: Avaliação. Parecer em .equipe/relatorios/avaliacao/T-014-T-015.md (T-014 aprovada; T-015 reprovada).
Arquivos alterados: nenhum.
Como verificar: ver O1 do parecer.
Pendências/riscos:
- [O1] e2e/home.spec.ts — o axe roda sem rolar a página; 262/332 textos estão com opacity 0 (framer-motion inView), então o axe avaliou só 16+50 nós contra 34+289 depois de rolar. Rolar a página inteira (ou scrollIntoView por section, opcionalmente com emulateMedia reducedMotion) e aguardar antes do analyze(); registrar a contagem de nós (S1).
