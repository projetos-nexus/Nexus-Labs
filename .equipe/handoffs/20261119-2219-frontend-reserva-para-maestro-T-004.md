[HANDOFF] De: Frontend-Reserva → Para: Maestro
Tarefa: T-004 — Cores em tokens e contraste — parte Frontend
Status: concluído
CLI usada: codex (reserva)
O que foi feito: Migrei as cores inline dos oito componentes. Os cinco links Comprar ou adaptar usam texto claro. Produto, Empresa e Contato no Footer usam text-muted. O aria-label do link de e-mail anuncia a nova aba. O alias .glow-blue já foi removido na T-003.
Arquivos alterados: src/components/{ServicesSection,ProcessSection,TargetAudienceSection,DiferenciaisSection,ProjectCard,ProjectDetailsModal,ProjectsSection,Footer}.tsx.
Como verificar: Conferido em 360, 768 e 1440 px na porta 5180: modal abre e fecha, console sem erros, cinco links claros, h2 do Footer com contraste de 7,43:1 sobre o fundo e nome do e-mail confirmado. Build e lint passaram. Vitest 2/2. E2E 10 passaram, 2 pulos previstos.
Pendências/riscos: Aguardando revisão independente. O jsdom emite aviso de Canvas ao executar axe. Capturas em .equipe/relatorios/frontend-qa.
