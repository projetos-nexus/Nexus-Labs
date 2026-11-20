[HANDOFF] De: Tarefas-Rapidas → Para: Maestro (repassar ao Testador)
Tarefa: T-013 — Footer acessível (B-002 e B-004)
Status: concluído
CLI usada: opencode (principal)
O que foi feito:
- B-002: adicionados `aria-label` descritivos (pt-BR) nos links só de ícone do Footer e `aria-hidden="true"` nos ícones:
  - WhatsApp (`MessageCircle`): `aria-label="Conversar no WhatsApp (abre em nova aba)"`.
  - E-mail (`Mail`): `aria-label="Enviar e-mail para a Nexus Labs"`.
- B-004: títulos das colunas do Footer (Produto, Empresa, Contato) alterados de `<h4>` para `<h2>` mantendo exatamente o mesmo visual (estilos inline, tamanho, peso e cor inalterados). Não havia `<h2>` anterior no footer.
- Nenhuma outra alteração no Footer (cores/fontes inline e demais elementos preservados).
Arquivos alterados:
- src/components/Footer.tsx
Como verificar:
- Conferir em `src/components/Footer.tsx`: links de ícone com `aria-label` e ícones com `aria-hidden="true"`; títulos "Produto", "Empresa" e "Contato" como `<h2>` com os mesmos estilos.
- `npm test` — passou (exit 0). Resultado: 2 arquivos de teste, 2 testes aprovados (vitest v5.1.1). Violações `link-name` e `heading-order` não observadas na suíte (teste de axe sem falhas).
- `npm run build` — passou (exit 0). Saída: `vite v8.0.12 building client environment for production... ✓ 2150 modules transformed. ✓ built in 1.35s`.
- `npm run lint` — passou (exit 0), sem erros.
Pendências/riscos:
- Nenhuma pendência identificada no escopo da tarefa. Ajustes de cores/fontes inline do Footer permanecem sob responsabilidade de outras tarefas, conforme instrução.