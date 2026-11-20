[TAREFAS] Onda 2 — Frontend (fazer NESTA ORDEM, um handoff por tarefa)
Para: Frontend | Depende de: onda 1 concluída (ok)
Atenção: o Kaio adicionou em public/nova-identidade/svg/ 16 SVG oficiais SEM fundo (fundo-escuro / fundo-claro). Pode copiar deles para src/assets/logos/ em vez de editar SVG à mão.

## T-011 — Tamanho do logo na Navbar
- Hoje o logo renderiza com 22,4px de altura no desktop e 15,4px no mobile por causa do max-width (parecer .equipe/relatorios/avaliacao/T-006.md).
- Aceite: altura visual de 28–34px no desktop e ≥ 22px em 360px, sem estourar a Navbar nem sobrepor o botão do menu em 360px; proporção preservada. Se usar um SVG de public/nova-identidade/svg/ (ex.: logo-linha-unica-fundo-escuro.svg ou logo-horizontal-fundo-escuro.svg), substitua o atual em src/assets/logos/ e remova o que deixar de usar.
- Arquivos: src/components/Navbar.tsx, src/assets/logos/.

## T-003 — Nomenclatura de tokens, MotionConfig e cores inline (Hero, Dashboard, Prova visual, CTA)
- 1º: globals.css com UMA nomenclatura: roxo, lilas, lilas-mid, selo, text-muted (remover --color-purple*, --color-muted e duplicatas). Diferenciar surface/surface-alt e border/border-strong por opacidade de cores da tabela, se necessário.
- 2º: `<MotionConfig reducedMotion="user">` na raiz (src/App.tsx) para o framer-motion respeitar prefers-reduced-motion.
- 3º: em Hero.tsx, InteractiveDashboardMockup.tsx, VisualProofSection.tsx e CTASection.tsx, trocar TODA cor hex/rgba inline por tokens (classes/variáveis) ou, quando inevitável, por cores da tabela. Zero azul (#4DA3FF, rgba(77,163,255,…)), zero verde #4ADE80, zero #7B5CFF / #9B82FF / #6244E8. A orbe azul do Hero vira lilás/roxo.
- Aceite: grep nesses 4 arquivos + globals.css sem cores fora da tabela; visual coerente em 360 e 1440 (porta 5180); build e lint ok.
- Arquivos: src/styles/globals.css, src/App.tsx, os 4 componentes acima.

## T-005 — Tipografia (fontes self-host)
- Importar em src/main.tsx: '@fontsource-variable/inter', '@fontsource-variable/montserrat', '@fontsource/michroma/400.css' (famílias 'Inter Variable', 'Montserrat Variable', 'Michroma').
- globals.css: --font-sans = Inter Variable; --font-display = Montserrat Variable; criar --font-assinatura = Michroma (usar só onde houver "NEXUS LABS" em texto).
- Remover TODAS as 33 ocorrências de fontFamily "Space Grotesk" inline nos componentes (usar a classe/token de display).
- index.html: remover link/preconnect do Google Fonts (trava concedida em index.html SÓ para essas linhas durante a T-005).
- Aceite: grep "Space Grotesk" e "fonts.googleapis" sem resultado; nenhuma requisição a fonts.googleapis/gstatic; títulos em Montserrat, corpo em Inter; build e lint ok.
- Arquivos: src/main.tsx, src/styles/globals.css, componentes com fontFamily inline, index.html (trava).

Ainda NÃO faça: T-004 parte Frontend (cores inline dos demais componentes) — liberada depois que a T-003 fixar a nomenclatura.

Regras: branch ciclo/01-identidade (não troque de branch, não faça commit). Decisões em .equipe/notas/MAESTRO-ESTADO.md. Mantenha sua passagem atualizada. Ao terminar CADA tarefa: salve o [HANDOFF] em .equipe/handoffs/ e rode maestri ask "Maestro" "<handoff resumido + caminho>", e siga para a próxima.
