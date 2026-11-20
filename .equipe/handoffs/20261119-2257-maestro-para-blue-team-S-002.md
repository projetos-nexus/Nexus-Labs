[TAREFA] Correção S-002 — Cabeçalhos de segurança HTTP (vercel.json)
Para: Blue-Team | Depende de: nenhuma
Achado: .equipe/relatorios/seguranca/achados/S-002-cabecalhos.md (baixa).
Critério de aceite:
- Criar vercel.json com headers para todas as rotas: Content-Security-Policy compatível com o site atual (só recursos próprios: default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline' SE necessário pelos estilos inline do React/Framer Motion — justifique; img-src 'self' data:; font-src 'self'; connect-src 'self'; frame-ancestors 'none'; base-uri 'self'; form-action 'self'; object-src 'none'), X-Content-Type-Options: nosniff, Referrer-Policy: strict-origin-when-cross-origin, Permissions-Policy desligando câmera/microfone/geolocalização etc., X-Frame-Options: DENY.
- NÃO criar rewrites/rotas agora (o ciclo 02 vai mudar a arquitetura de rotas).
- Validar a CSP localmente: npm run build e servir dist/ com os mesmos cabeçalhos (ex.: pequeno servidor estático em script local ou `npx serve` com config equivalente) na porta 5185 — nenhuma violação de CSP no console em 360/1440, links de WhatsApp/Gmail continuam abrindo, fontes e imagens carregam.
- Documentar em .equipe/relatorios/seguranca/correcoes/S-002.md no formato [CORREÇÃO], com os passos para o Red Team confirmar.
- npm run build, lint, test.
Arquivos/áreas: vercel.json (sua área). Nada em src/.
Entregar para: Maestro → Red Team (reverificação)
Regras: branch ciclo/01-identidade (não troque de branch, não faça commit). Ao terminar: maestri ask "Maestro" "S-002 corrigido — <resumo + caminho>".
