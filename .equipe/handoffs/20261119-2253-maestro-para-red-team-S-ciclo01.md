[TAREFA] Rodada de segurança do ciclo 01 — ataque
Para: Red-Team | Depende de: código do ciclo 01 commitado (branch ciclo/01-identidade, commit 21a115b)
Contexto: Site estático (React + Vite), sem login nem banco; deploy previsto na Vercel. Ciclo 01 trocou identidade visual, fontes (self-host), favicon/OG, dependências e criou infra de testes. Observação de independência: a maior parte do código foi escrita no Codex (Backend e Frontend-Reserva), a mesma CLI sua — por isso o Red-Team-Reserva (OpenCode) fará uma conferência independente dos seus achados depois.
Escopo:
1. A-001: triagem do npm audit (19 vulnerabilidades: 1 baixa, 10 moderadas, 8 altas, todas em devDependencies segundo o Testador). Para cada alta: pacote, caminho, se chega ao bundle de produção ou ao build na Vercel, explorabilidade real e correção possível (versão/override).
2. Bundle de produção (npm run build → dist/): segredos, chaves, e-mails/telefones além do contato público (src/config/contact.ts), source maps expostos, comentários sensíveis.
3. index.html e public/: metadados, links externos, arquivos que não deveriam ser públicos (ex.: public/nova-identidade com metadados c2pa — avaliar se expõe algo além de procedência).
4. Links externos (WhatsApp, Gmail, outros): target=_blank com rel="noopener noreferrer", parâmetros manipuláveis, open redirect.
5. Cabeçalhos de segurança: não há vercel.json; liste o que faltaria (CSP, X-Content-Type-Options, Referrer-Policy, Permissions-Policy, frame-ancestors) com severidade realista para um site estático.
6. scripts/ e configs de teste: nada que rode em produção ou exponha dados.
PROIBIDO: testar/atacar o site publicado (https://nexuscomerc.vercel.app/) — só leitura/comparação. Use servidor local na porta 5184 (nunca 5173). Não edite código do produto.
Entrega: um arquivo [ACHADO] por achado em .equipe/relatorios/seguranca/achados/S-0xx-<titulo>.md (S-001 em diante) + um resumo em .equipe/relatorios/seguranca/achados/RESUMO-ciclo01.md com tabela (ID, severidade, onde, status).
Ao terminar: maestri ask "Maestro" "Red Team ciclo 01: <n> achados (<críticos>/<altos>/<médios>/<baixos>) — <caminho do resumo>"
