[TAREFA] T-007 — Cabeçalho do site: favicon, apple-touch, theme-color e OG provisória
Para: Backend | Depende de: T-006 (concluída)
Contexto: O favicon e a imagem de compartilhamento (OG) ainda são da identidade antiga. O domínio final ainda não foi decidido pelo Kaio, então og:url e canonical ficam pendentes. O Kaio deixou SVGs oficiais sem fundo em public/nova-identidade/svg/ (somente leitura: copie, não edite lá).
Critério de aceite:
- Favicon a partir de public/nova-identidade/svg/logo-icone-nx-fundo-escuro.svg (o monograma NX): public/favicon.svg + public/favicon.png (32 e 48 px, ou ICO) + public/apple-touch-icon.png (180×180, fundo #0B0A12, sem transparência). Gere com sharp (já instalado; pode criar script em scripts/). Nunca recolorir nem distorcer o monograma.
- index.html: link rel=icon (svg + png de fallback), apple-touch-icon, theme-color #0B0A12. Remover o "?v=3" antigo se não fizer mais sentido.
- OG provisória: public/og-nexus-labs.png 1200×630, fundo #0B0A12, com a versão "Escuro + LABS" ou "horizontal" centralizada, < 300 KB. og:image e twitter:image apontando para ela; og:image:alt descritivo; og:locale pt_BR.
- og:url e canonical: NÃO inventar domínio. Remover o placeholder "https://seudominio.com.br" e deixar comentário <!-- TODO domínio (decisão do Kaio) -->. Registrar no handoff.
- Limpeza (trava concedida, área do Frontend): apagar src/assets/logos/favicon.png (redundante, o site usa public/) e atualizar src/assets/logos/README.txt para listar só os arquivos que existem hoje e de onde vieram.
- npm run build, npm run lint, npm test. Conferir no navegador (porta 5183) que o ícone aparece na aba.
Arquivos/áreas: index.html, public/** (exceto nova-identidade), scripts/**; trava: src/assets/logos/favicon.png e src/assets/logos/README.txt
Entregar para: Maestro → Testador
Regras: branch ciclo/01-identidade (não troque de branch, não faça commit). Ao terminar: salve o [HANDOFF] em .equipe/handoffs/ e rode maestri ask "Maestro" "<handoff resumido + caminho>".
