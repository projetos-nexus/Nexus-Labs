[TAREFA] Conferência independente da rodada de segurança do ciclo 01
Para: Red-Team-Reserva | Depende de: ataque do Red-Team concluído
Contexto: o Red-Team (codex) atacou o commit 21a115b e achou 3 itens (0/0/1/2): .equipe/relatorios/seguranca/achados/RESUMO-ciclo01.md. A maior parte do código foi escrita também no Codex; por isso você (opencode) faz uma conferência independente, procurando o que pode ter escapado.
Critério de aceite:
- Revisar os 3 achados (concorda com severidade? algo errado?).
- Fazer uma passada própria e curta nos pontos de maior risco: bundle de produção (npm run build → dist/: segredos, dados pessoais, source maps), public/ (o que é publicado sem estar em uso), links externos e target=_blank, index.html, dependências de produção (npm audit --omit=dev).
- Novos achados, se houver: um [ACHADO] por arquivo em .equipe/relatorios/seguranca/achados/ continuando a numeração (S-004…). Sem achados novos: registre "conferência sem novos achados" ao final do RESUMO-ciclo01.md (seção própria, assinada como Red-Team-Reserva/opencode).
- PROIBIDO testar o site publicado. Porta 5186. Não edite código do produto.
Ao terminar: maestri ask "Maestro" "Conferência Red-Team-Reserva: <n> novos achados — <caminho>"
