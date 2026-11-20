[TAREFA] Teste da T-013 — Footer acessível (B-002 e B-004)
Para: Testador | Autor: Tarefas-Rapidas (opencode)
Handoff do autor: .equipe/handoffs/20261119-2212-tarefas-rapidas-para-maestro-T-013.md
Verificar (porta 5181):
- B-002: links de WhatsApp e e-mail do Footer com aria-label ("Conversar no WhatsApp (abre em nova aba)" / "Enviar e-mail para a Nexus Labs"), ícones aria-hidden; axe sem link-name.
- B-004: títulos das colunas (Produto/Empresa/Contato) agora h2; axe sem heading-order. VISUAL IDÊNTICO ao anterior: compare tamanho, peso, cor e espaçamento desses títulos com a versão do commit 4e03ea0 (git stash não; use captura antes/depois via outra porta ou git show do arquivo). Atenção: globals.css pode aplicar estilos diferentes a h2 vs h4.
- O diff de Footer.tsx só contém essas mudanças (outras alterações de cor/fonte são de outras tarefas).
- npm test, npm run build e npm run lint.
- Observação: o mesmo autor (opencode) e o Testador (opencode) estão na mesma CLI; a avaliação independente será no Avaliador (claude).
Resultado: handoff "passou" ou [BUG] ao Maestro.
