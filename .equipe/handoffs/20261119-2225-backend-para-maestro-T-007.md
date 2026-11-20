[HANDOFF] De: Backend → Para: Maestro (encaminhar ao Testador)
Tarefa: T-007 — Favicon, apple-touch, theme-color e OG provisória
Status: concluído
CLI usada: codex (principal)

O que foi feito:
- Favicon SVG copiado do monograma oficial. Fallbacks PNG de 32 e 48 px e apple-touch de 180 px gerados com Sharp, com fundo #0B0A12 e proporções originais. O apple-touch está sem canal alfa.
- OG provisória com o logo horizontal oficial centralizado em 1200 × 630 px, sobre fundo #0B0A12. O PNG tem 19.337 bytes.
- Atualizados os links de ícones, theme-color, og:image:alt e as referências de compartilhamento. Removidos o placeholder do domínio e o comentário vazio de fontes. og:locale é pt_BR.
- Removido o favicon redundante de src/assets/logos e atualizado o inventário com a origem dos quatro logos usados pelos componentes.

Arquivos alterados: index.html, public/favicon.svg, public/favicon.png, public/favicon-48.png, public/apple-touch-icon.png, public/og-nexus-labs.png, scripts/gerar-imagens-cabecalho.mjs, src/assets/logos/README.txt e src/assets/logos/favicon.png (removido).

Como verificar:
- npm run build, npm run lint e npm test passaram (Vitest 2/2, com aviso conhecido de canvas do jsdom).
- Subir npm run dev -- --port 5183 --strictPort e abrir no Chromium. Na verificação local, o Chromium com interface solicitou automaticamente /favicon.svg para a aba. Os PNGs retornaram HTTP 200, e dimensões, fundo, peso da OG e tags foram conferidos.
- Para reproduzir os arquivos, rodar node scripts/gerar-imagens-cabecalho.mjs.

Pendências/riscos:
- og:url e canonical aguardam a decisão do Kaio sobre o domínio, com TODO em index.html.
