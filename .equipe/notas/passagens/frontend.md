# Passagem — frontend
Atualizado: 2026-11-19 21:42 por principal (Antigravity)
Tarefa atual: T-006 — Logos provisórios da nova identidade + acessibilidade do menu mobile [B-001 corrigido]
Feito até agora:
- Corrigido B-001 em `src/components/Navbar.tsx`: `aria-controls` agora é condicional (`mobileOpen ? 'mobile-nav-menu' : undefined`). Quando o menu está fechado e desmontado pelo AnimatePresence, o atributo não existe no DOM, eliminando a referência a ID inexistente. Quando aberto, referencia `#mobile-nav-menu`.
- Todos os demais itens da T-006 aprovados pelo Testador:
  - SVGs transparentes na Navbar e Footer (logo-nexus-labs-linha-unica.svg e logo-nexus-labs-abreviado.svg).
  - Geometria e aspecto responsivo preservados sem distorções nem caixas visíveis.
  - Navegação por teclado (Tab, Enter, Espaço) e foco visível.
  - Zero duplicações em `src/assets/logos/`.
- `npm run build` e `npm run lint` passando com 0 erros.
Próximo passo exato:
- Aguardar nova checagem do Testador e Avaliador para T-006; iniciar próximas tarefas (T-003/T-004/T-005) conforme instruções do Maestro.
Arquivos em edição (não terminados):
- Nenhum.
Decisões tomadas nesta tarefa:
- Condicionado `aria-controls={mobileOpen ? 'mobile-nav-menu' : undefined}` para garantir conformidade com WCAG e evitar nós órfãos de acessibilidade.
Dúvidas abertas:
- Nenhuma.
