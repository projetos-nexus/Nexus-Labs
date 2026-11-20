[TAREFA] Teste da T-006 — Logos SVG na Navbar/Footer + acessibilidade do menu mobile
Para: Testador | Autor: Frontend (antigravity)
Handoffs do autor: .equipe/handoffs/20261119-2128-frontend-para-maestro-T-006.md e .equipe/handoffs/20261119-2135-frontend-para-maestro-T-006.md (ajustes)
Verificar (porta 5181):
- Navbar usa src/assets/logos/logo-nexus-labs-linha-unica.svg; Footer usa logo-nexus-labs-abreviado.svg; alt="Nexus Labs" nos dois.
- Logo sem caixa/retângulo de fundo: no topo da página e depois de rolar (Navbar translúcida), e no Footer. Proporção preservada (sem distorção) em 360, 768 e 1440 px. Logo legível e sem corte no mobile (altura 22px).
- Botão do menu mobile (360px): aria-label "Abrir menu"/"Fechar menu" alterna, aria-expanded true/false, aria-controls aponta para id existente; abre e fecha por teclado (Tab + Enter/Espaço).
- src/assets/logos/: sem cópias com "·" e sem PNG recortados; os PNG antigos ainda existem (esperado, limpeza na T-010).
- npm run build e npm run lint passam; console sem erros.
- Esperado e NÃO é bug: cores inline antigas nos componentes (T-003/T-004), fontes do Google (T-005).
Resultado: handoff "passou" ou [BUG] ao Maestro, com relatório em .equipe/relatorios/testes/. Se possível, anexe prints 360 e 1440 no relatório.
