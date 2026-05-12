# CLAUDE.md — Instruções Persistentes


O Claude Code não deve criar um site genérico de landing page. Ele deve criar uma experiência premium, com componentes reutilizáveis, visual de empresa de tecnologia, foco em conversão e estrutura preparada para crescer.


## Memória entre Sessões

Ao **iniciar qualquer sessão**, leia os seguintes arquivos na ordem indicada antes de responder ao usuário:

1. `memory/user.md` — Perfil do usuário (papel, experiência, objetivos)
2. `memory/preferences.md` — Como o usuário prefere trabalhar
3. `memory/decisions.md` — Decisões técnicas já tomadas no projeto
4. `memory/people.md` — Pessoas relevantes e seus papéis
5. `decisions.csv` — Registro estruturado de decisões com status de revisão

Após ler o `decisions.csv`, informe o usuário se há decisões com status `REVIEW DUE`.

> Os arquivos de memória ficam em:
> `C:\Users\PC030\.claude\projects\c--Users-PC030-Documents-aplica--es-Pessoal-Kaio-kmz2\memory\`

---

## Registro de Decisões (decisions.csv)

O arquivo `decisions.csv` rastreia decisões com ciclo de revisão. Sempre que o usuário descrever uma decisão, adicione uma linha ao CSV com:

- `data`: data atual no formato `DD/MM/YYYY`
- `decisao`: descrição objetiva da decisão tomada
- `raciocinio`: por que essa decisão foi tomada
- `resultado_esperado`: o que se espera que aconteça
- `data_revisao`: 30 dias após a data atual, no formato `DD/MM/YYYY`
- `status`: `PENDENTE`

Para revisar decisões vencidas, o usuário roda no PowerShell:
```
.\review.ps1
```
O script marca como `REVIEW DUE` todas as linhas onde `data_revisao <= hoje` e `status != CONCLUIDO`.

---

## O que registrar durante a sessão

Ao longo da conversa, identifique e salve:

| Tipo | Arquivo | Quando salvar |
|------|---------|---------------|
| Perfil do usuário | `user.md` | Ao aprender cargo, experiência ou objetivos |
| Preferências | `preferences.md` | Ao receber correção ou confirmação de abordagem |
| Decisões | `decisions.md` | Ao tomar decisão técnica ou de produto relevante |
| Pessoas | `people.md` | Ao conhecer alguém com papel no projeto |

---

## Como atualizar as memórias

- **Nunca apague** entradas existentes sem motivo explícito.
- **Atualize** entradas desatualizadas em vez de duplicar.
- **Use as datas** ao registrar decisões (formato `[AAAA-MM-DD]`).
- **Seja conciso**: memórias são contexto, não documentação completa.
- Após salvar, atualize o índice `MEMORY.md` se adicionou um novo arquivo.

---

## Comportamento Padrão

- Responda em **português** por padrão, a menos que o usuário escreva em outro idioma.
- Respostas devem ser **curtas e diretas** — evite resumos desnecessários ao final.
- Não adicione funcionalidades, refatorações ou melhorias além do solicitado.

## Contexto do APP:
- Estou desenvolvendo um sistema SaaS premium de gestão operacional chamado KMZ Nexus.
Tema dark (preto, roxo, azul), estilo moderno, minimalista e profissional.

- Objetivo:
Transformar a interface atual em nível SaaS premium (tipo Notion, Stripe, Linear).

Regras:
- Não alterar funcionalidades existentes
- Melhorar hierarquia visual
- Melhorar clareza e leitura
- Reduzir poluição visual
- Aumentar sensação de produto premium
- Priorizar ações importantes
- Melhorar espaçamento e tipografia