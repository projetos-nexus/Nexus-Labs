[HANDOFF] De: Blue-Team → Para: Maestro
Tarefa: S-002 — Cabeçalhos de segurança HTTP (vercel.json)
Status: concluído
CLI usada: opencode (principal)
O que foi feito:
- Criado `vercel.json` com os 6 cabeçalhos aplicados a todas as rotas (`/(.*)`): CSP, HSTS, X-Content-Type-Options, X-Frame-Options, Referrer-Policy e Permissions-Policy. Sem `rewrites`.
- CSP com `script-src 'self'` e `style-src 'self' 'unsafe-inline'` (necessário por estilos inline do React e Framer Motion; justificado no relatório).
- Validação real: build OK, lint OK, 2 testes OK; servidor estático em 5185 com os mesmos cabeçalhos e Chromium Playwright em 360/1440 → 0 violações de CSP, 5/5 imagens, fontes loaded, 15 links WhatsApp/Gmail, console limpo.
Arquivos alterados:
- `vercel.json` (novo)
- `.equipe/relatorios/seguranca/correcoes/S-002.md`
- `.equipe/notas/passagens/blue-team.md`
Como verificar:
- Abrir `.equipe/relatorios/seguranca/correcoes/S-002.md` (tem os passos completos para o Red Team) e conferir `vercel.json`.
Pendências/riscos:
- `'unsafe-inline'` em `style-src` é exceção documentada; HSTS sem `preload`; cabeçalhos ainda não conferidos em deploy na Vercel (validados localmente com `dist/`).
- Aguardando reverificação do Red Team; nenhum commit/branch alterado.
