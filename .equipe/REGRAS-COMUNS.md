# Regras comuns da equipe Nexus Labs

Todo agente lê este arquivo no início de cada sessão. Se algo aqui conflitar com o `CLAUDE.md`, o `AGENTS.md` ou o `GEMINI.md` do projeto, **este arquivo vale**.

## 1. O projeto

- **Objetivo:** transformar o site atual em um **portfólio profissional da Nexus Labs** (desenvolvimento de software, automações e sites sob medida), aplicando a **nova identidade visual**.
- **Pasta:** `C:\dev\portifolio-nexus` · **Repositório:** `https://github.com/projetos-nexus/Nexus-Labs`
- **Stack já existente na pasta** (não trocar sem decisão do Kaio): React 19 + Vite 8 + TypeScript + Tailwind CSS 4 + Framer Motion + Lucide + React Router. Deploy previsto na Vercel.
- **Seções atuais** (`src/pages/Home.tsx`): Navbar, Hero, Serviços, Público-alvo, Projetos, Prova visual, Processo, Diferenciais, CTA, Footer, marca d'água.
- **Contato:** WhatsApp em `src/config/contact.ts` (número público por natureza; não é segredo).
- **Sem prazo.** Qualidade acima de velocidade.
- **Critério de pronto:** proposto pelo Maestro no primeiro ciclo e aprovado pelo Kaio. Fica registrado em `.equipe/notas/MAESTRO-ESTADO.md`.

## 2. Identidade visual Nexus Labs (fonte da verdade)

Referência: `public/nova-identidade/` (somente leitura para todos) e o chat "Variações de marca com plugin".

### Cores

| Uso | Hex |
|---|---|
| Fundo principal (escuro) | `#0B0A12` |
| Superfície / cartões | `#13101F` |
| Borda sutil | `#3A3550` |
| Texto principal no escuro | `#F4F3F8` |
| Texto secundário no escuro | `#A09CB8` |
| **Roxo da marca** (X do NX, linhas, destaques) | `#8B5CF6` |
| Lilás (texto "LABS" no escuro) | `#C4B5FD` |
| Lilás médio (LABS na versão linha única/NX) | `#A78BFA` |
| Roxo do selo LABS | `#7C3AED` |
| Roxo para fundo claro | `#6D28D9` |
| Fundo claro | `#FAFAFC` |
| Texto no claro | `#14121F` |

Regras de cor:
- O site é **escuro por padrão**. Versão clara só onde fizer sentido (impressão, documentos).
- **Não usar cores fora da tabela** sem decisão registrada. Atenção: o `src/styles/globals.css` atual usa uma paleta antiga (`#7B5CFF`, azul `#4DA3FF`, fundo `#0B0B0F`). A migração para a tabela acima é trabalho do Frontend; manter ou remover o azul é decisão do Kaio (o Maestro pergunta).
- Contraste mínimo WCAG AA (4,5:1 para texto normal).

### Tipografia

- **Montserrat**: monograma **NX** (peso 800), "NEXUS" e "LABS" espaçado (500–600, `letter-spacing` largo).
- **Michroma**: assinatura "NEXUS LABS" em linha única (cabeçalho e rodapé).
- Textos corridos: o site usa Inter hoje. Trocar ou manter é decisão do Kaio; até lá, mantenha Inter no corpo.
- Títulos hoje usam Space Grotesk; alinhar com a identidade (Montserrat) é tarefa de design do ciclo 1.

### Marca

- Versões: **"Escuro + LABS"** (NX + linha + LABS), **"LABS vertical"**, **"Linha única"** (Michroma), **"Selo LABS"** (NEXUS + etiqueta roxa), **"Abreviado NX"** (NX | NEXUS LABS).
- N em `#F4F3F8` (ou `#14121F` no claro) e X em roxo. Nunca distorcer, girar ou trocar as cores do monograma.
- Ícones em linha (Lucide, traço 1,5), branco com detalhe em lilás, igual às capas de destaque do Instagram (@devnexuslabs).
- Seções sugeridas pela marca (vêm dos destaques): **Sobre, Serviços, Projetos, Processo, Orçamento, Contato**.
- Conceito: premium, minimalista, escuro, tecnológico ("nexus" = conexão). Nada de visual de template genérico.

## 3. Mapa de áreas (quem pode editar o quê)

| Dono | Pode editar |
|---|---|
| **Frontend** | `src/components/**`, `src/pages/**`, `src/styles/**`, `src/App.tsx`, `src/App.css`, `src/index.css`, `src/main.tsx`, `src/assets/**` |
| **Backend / Plataforma** | `src/config/**`, `src/data/**`, `src/services/**`, `src/lib/**`, `api/**`, `scripts/**`, `index.html` (head/SEO), `public/**` (exceto `public/nova-identidade/`), `vite.config.ts`, `package.json`, `package-lock.json`, `tsconfig*.json`, `eslint.config.js`, `.env.example` |
| **Testador** | `tests/**`, `e2e/**`, `src/**/*.test.ts(x)`, `vitest.config.ts`, `playwright.config.ts`, `.equipe/relatorios/testes/**` |
| **Blue Team** | `vercel.json`, `.equipe/relatorios/seguranca/correcoes/**`; em outras áreas só com **trava** concedida pelo Maestro |
| **Red Team** | `.equipe/relatorios/seguranca/achados/**` (nunca código do produto) |
| **Avaliador** | `.equipe/relatorios/avaliacao/**` |
| **Pesquisador** | `.equipe/pesquisas/**` |
| **Tarefas Rápidas** (OpenCode) | nenhuma fixa: só os arquivos da trava de cada tarefa |
| **Maestro** | `.equipe/notas/**`, `README.md`, `CLAUDE.md` (só com OK do Kaio), commits e branches |
| **Todos** | `.equipe/handoffs/` (cada um cria os próprios arquivos), `.equipe/notas/passagens/<seu-papel>.md` |
| **Ninguém** | `public/nova-identidade/**`, `.env*` (exceto `.env.example`), `node_modules/` |

- Precisa mexer fora da sua área? Peça ao Maestro. Ele concede uma **trava** (linha na seção "Travas" do `PAINEL.md`) com arquivo, agente e prazo. Sem trava, não edite.
- Dependências novas: só o Backend/Plataforma altera `package.json`. Os outros pedem pelo Maestro com o motivo.
- **Git:** só o Maestro faz `commit`, `push` e cria branches. Nenhum agente faz `git push`, `reset --hard`, `rebase` ou apaga branches.

## 4. Fluxo de trabalho

1. Maestro recebe o objetivo → aciona o Pesquisador quando houver decisão técnica ou visual em aberto.
2. Maestro quebra em tarefas pequenas (`T-001`, `T-002`…) e atribui a Backend e Frontend, em paralelo quando não há dependência.
3. Cada entrega passa por **Testador → Avaliador**.
4. Ao fechar uma funcionalidade ou ciclo: **Red Team ataca → Blue Team corrige → Red Team reverifica**.
5. Maestro só marca **concluído** com OK do Testador, do Avaliador e, quando aplicável, do Red Team.
6. Reprovação volta ao autor com o motivo. **3 reprovações seguidas** na mesma tarefa → Maestro consulta o Kaio.

Status possíveis no painel: `a-fazer`, `em-andamento`, `em-teste`, `em-avaliacao`, `em-seguranca`, `reprovado`, `bloqueado`, `concluido`.

## 5. Protocolo de comunicação

Toda mensagem entre agentes vai **pelo Maestri e também em arquivo** em `.equipe/handoffs/` com o nome `AAAAMMDD-HHMM-<de>-para-<para>-<T-xxx>.md`. O arquivo é o que sobrevive se a cota acabar no meio.

### Handoff (todos)

```
[HANDOFF] De: <agente> → Para: <agente>
Tarefa: <T-xxx — título>
Status: concluído | bloqueado | reprovado
CLI usada: <claude | codex | antigravity | opencode> (principal | reserva)
O que foi feito:
Arquivos alterados:
Como verificar:
Pendências/riscos:
```

### Relatório de bug (Testador)

```
[BUG] B-xxx — <título curto>
Tarefa: T-xxx | Severidade: bloqueante | alta | média | baixa
Ambiente: <navegador/viewport/comando>
Passos para reproduzir:
1.
2.
Resultado esperado:
Resultado obtido:
Evidência: <saída do teste, print, log>
Arquivo provável: <caminho> (sugestão, não correção)
```

### Parecer (Avaliador)

```
[PARECER] T-xxx — APROVADO | REPROVADO
Autor: <agente> (<CLI>) | Avaliador: <CLI>
Resumo: <1–2 frases>
Obrigatórios (bloqueiam aprovação):
- [O1] <arquivo:linha> — <problema> → <o que precisa mudar>
Sugestões (não bloqueiam):
- [S1] ...
Aderência à identidade visual: ok | problemas: ...
Aderência ao requisito: ok | problemas: ...
```

### Achado de segurança (Red Team)

```
[ACHADO] S-xxx — <título>
Severidade: crítica | alta | média | baixa
Onde: <arquivo/rota/componente>
Como reproduzir:
1.
Impacto:
Evidência:
Sugestão de defesa (opcional):
```

### Correção de segurança (Blue Team)

```
[CORREÇÃO] para S-xxx
O que mudou:
Arquivos alterados:
Como confirmar (passos para o Red Team):
Risco residual:
```

### Pesquisa (Pesquisador)

```
[PESQUISA] P-xxx — <pergunta>
Recomendação: <1–3 frases, direto ao ponto>
Por quê:
Alternativas consideradas: <opção — prós/contras>
Impacto no projeto: <arquivos/áreas afetadas, custo>
Fontes: <links oficiais, com data de acesso>
```

## 6. Cota, reservas e passagem de trabalho

- Cada papel tem um **principal** e um **reserva** em CLIs diferentes (tabela em `.equipe/README.md`).
- **Claude Code é a CLI que deve ser economizada.** Só o Maestro e o Avaliador usam Claude Code.
- O Antigravity nunca é usado como reserva.
- O agente de Tarefas Rápidas (OpenCode) não tem reserva: sem cota, as tarefas dele esperam ou voltam para o dono da área.
- Quem fica sem cota **não consegue escrever mais nada**. Por isso a nota de passagem (`.equipe/notas/passagens/<papel>.md`) precisa estar **sempre atual**, não só no fim:
  - atualize ao terminar cada passo relevante;
  - atualize imediatamente quando o Maestro avisar "PREPARAR PASSAGEM".
- Modelo da nota de passagem:

```
# Passagem — <papel>
Atualizado: <data hora> por <principal|reserva> (<CLI>)
Tarefa atual: T-xxx — <título>
Feito até agora:
Próximo passo exato:
Arquivos em edição (não terminados):
Decisões tomadas nesta tarefa:
Dúvidas abertas:
```

- O script `node .equipe/cota/verificar-cota.mjs` mostra a situação de cada CLI e diz quem deve trocar. O Maestro roda; qualquer agente pode rodar para consultar.
- **Revisão independente:** quem revisa ou ataca roda em CLI diferente de quem escreveu. Se uma troca para reserva quebrar essa regra, o Maestro marca no painel "revisão na mesma CLI" e pede nova revisão quando a CLI original voltar.

## 7. Regras para todos os agentes

- Português do Brasil em tudo: mensagens, comentários de código, commits e documentação.
- Não inventar requisitos. Dúvida vai para o Maestro, nunca direto para o Kaio.
- Tarefas pequenas e verificáveis, com explicação curta do que foi feito.
- Só editar arquivos da própria área (seção 3).
- Nunca expor credenciais, chaves, tokens ou dados pessoais em código, logs, handoffs ou mensagens. Variáveis sensíveis só em `.env` (fora do git) e documentadas em `.env.example` sem valores.
- Antes de dizer que terminou, rode o que for possível (`npm run build`, `npm run lint`, testes) e informe o **resultado real**, inclusive falhas.
- Não instale ferramentas globais, não altere configurações do sistema e não acesse nada fora de `C:\dev\portifolio-nexus` sem o Maestro pedir.
- Mensagens curtas. Sem resumos longos do que já está no handoff.
