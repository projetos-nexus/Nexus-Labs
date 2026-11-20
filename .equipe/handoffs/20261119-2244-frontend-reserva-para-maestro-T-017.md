[HANDOFF] De: Frontend-Reserva → Para: Maestro
Tarefa: T-017 — B-005 — contraste do botão primário global
Status: concluído
CLI usada: codex (reserva)
O que foi feito: Gradiente global de #7C3AED a #6D28D9, com texto #F4F3F8. Hover realça a sombra externa. Removida a classe local da Navbar, cuja altura segue em 69 px.
Arquivos alterados: src/styles/globals.css e src/components/Navbar.tsx.
Como verificar: Porta 5180, Chromium em 360, 768 e 1440 px. Estados forçados via CDP, com cálculo WCAG a partir das cores computadas. Em sRGB os três canais diminuem ao longo do gradiente, então o primeiro extremo é o pior caso. Capturas em .equipe/relatorios/frontend-qa. Build, lint e Vitest 2/2 passaram. E2E 10 passaram, 2 pulos previstos.
Pendências/riscos: O jsdom emite aviso de Canvas durante axe. O E2E usa 5182 pela configuração do Testador.

| CTA | Repouso | Hover | Focus-visible | Active + hover |
| --- | --- | --- | --- | --- |
| Hero | 5,16:1 | 5,16:1 | 5,16:1 | 5,16:1 |
| TargetAudienceSection | 5,16:1 | 5,16:1 | 5,16:1 | 5,16:1 |
| ProjectCard (destaque) | 5,16:1 | 5,16:1 | 5,16:1 | 5,16:1 |
| VisualProofSection | 5,16:1 | 5,16:1 | 5,16:1 | 5,16:1 |
| ProcessSection | 5,16:1 | 5,16:1 | 5,16:1 | 5,16:1 |
| DiferenciaisSection | 5,16:1 | 5,16:1 | 5,16:1 | 5,16:1 |
| CTASection | 5,16:1 | 5,16:1 | 5,16:1 | 5,16:1 |
| ProjectDetailsModal | 5,16:1 | 5,16:1 | 5,16:1 | 5,16:1 |
| Navbar (desktop e menu móvel) | 5,16:1 | 5,16:1 | 5,16:1 | 5,16:1 |
