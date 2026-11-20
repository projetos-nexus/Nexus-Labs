[TAREFA] Teste da T-007 — Favicon, apple-touch, theme-color e OG provisória
Para: Testador | Autor: Backend (codex)
Handoff do autor: .equipe/handoffs/20261119-2225-backend-para-maestro-T-007.md
Verificar (porta 5181):
- Aba do navegador mostra o monograma NX da nova identidade; public/favicon.svg, favicon PNG 32/48 e apple-touch-icon 180×180 existem, sem distorção e com cores da tabela; apple-touch com fundo #0B0A12.
- index.html: theme-color #0B0A12; og:image/twitter:image apontam para a OG nova (1200×630, < 300 KB, visual da nova identidade); og:image:alt e og:locale pt_BR; nenhum "seudominio.com.br"; og:url/canonical ausentes com TODO (domínio pendente do Kaio — esperado).
- Nenhuma requisição 404 (ícones/OG) e console limpo.
- src/assets/logos/favicon.png removido sem referências; README.txt de logos lista só arquivos existentes.
- npm test, npm run test:e2e, build, lint.
Resultado: handoff "passou" ou [BUG] ao Maestro. Fila: depois da T-016, antes da T-015.
