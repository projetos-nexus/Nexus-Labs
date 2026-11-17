# Equipe de agentes — Portfólio Nexus Labs

17 agentes no Maestri: **Maestro + Maestro reserva**, **7 especialistas principais + 7 reservas**, e **1 agente de Tarefas Rápidas** (OpenCode, sem reserva).

## Fluxo

```
                               ┌──────────────┐
                Kaio  ◄──────► │   MAESTRO    │ ◄── notas compartilhadas ──► MAESTRO RESERVA
                               │ Claude Code  │     (.equipe/notas/)           Codex
                               └──────┬───────┘
          verificar-cota.mjs ─────────┤ (antes de cada distribuição)
                                      │
      ┌──────────────┬────────────────┼──────────────────┬───────────────────┐
      ▼              ▼                ▼                  ▼                   ▼
 PESQUISADOR     BACKEND/PLAT.     FRONTEND        TAREFAS RÁPIDAS     (decisões → Kaio)
 Codex           Codex             Antigravity     OpenCode
 (decisões em    └───────┬─────────┘                (miúdos, ≤3 arquivos)
  aberto)                │  entrega                        │
                         ▼                                 │
                     TESTADOR  (OpenCode) ◄────────────────┘
                         │ passou ──────── falhou → [BUG] volta ao autor
                         ▼
                     AVALIADOR (Claude Code)
                         │ aprovado ────── reprovado → [PARECER] volta ao autor
                         ▼                 (3 reprovações seguidas → Maestro consulta o Kaio)
              fim de funcionalidade/ciclo?
                         │ sim
                         ▼
     RED TEAM (Codex) ──[ACHADO]──► BLUE TEAM (OpenCode) ────[CORREÇÃO]──► RED TEAM reverifica
                         │                                                     │
                         └──────────── zero crítico/alto aberto ◄──────────────┘
                                              ▼
                                    MAESTRO marca concluído e faz o commit
```

Cada especialista tem um reserva em outra CLI que assume lendo `.equipe/notas/passagens/<papel>.md`.

## Distribuição de ferramentas

| Agente | Principal | Reserva | Por quê |
|---|---|---|---|
| Maestro | Claude Code | Codex | Orquestrar é onde o Claude Code rende mais; o Codex assume lendo as notas compartilhadas. |
| Backend / Plataforma | Codex | OpenCode | O Codex é forte em configuração, build e scripts; o OpenCode cobre sem gastar Claude. |
| Frontend | Antigravity | Codex | Antigravity como você pediu; reserva no Codex (Antigravity nunca é reserva). |
| Testador | OpenCode | Codex | Fora do Antigravity para não testar o código que o próprio Antigravity escreveu. |
| Avaliador | Claude Code | OpenCode | Revisar é o 2º melhor uso do Claude Code (lê pouco, decide muito), e ele não escreve código de ninguém. |
| Pesquisador | Codex | OpenCode | O Codex tem busca na web; tira o Claude Code da pesquisa. |
| Red Team | Codex | OpenCode | O Codex ataca código escrito no Antigravity e no OpenCode (Blue Team). |
| Blue Team | OpenCode | Codex | O OpenCode corrige; o Red Team reverifica em outra CLI (Codex). |
| Tarefas Rápidas | OpenCode | sem reserva | Trabalho miúdo para poupar as outras cotas. |

**Ajustes em relação à sua tabela original, e por quê**

- **Claude Code saiu de Backend, Pesquisador e Blue Team** e ficou só no Maestro e no Avaliador. É a CLI a ser economizada, e esses dois papéis leem pouco e decidem muito.
- **Testador saiu do Antigravity** (mesma ferramenta do Frontend, que é o código que ele mais testa).
- **Gemini CLI saiu (17/11/2026).** O Google encerrou o login com conta pessoal no Gemini CLI (agora só com chave de API paga). As 6 vagas dele foram para OpenCode e Codex. **Atenção:** o OpenCode é principal de Testador, Blue Team e Tarefas Rápidas e reserva de Backend, Avaliador, Pesquisador e Red Team; todos dividem a cota do provedor configurado nele. Marque com `marcar opencode esgotado` quando acabar.
- **"Cada agente com uma CLI diferente"**: com 5 ferramentas e 17 agentes, não dá para cada agente ter uma CLI exclusiva. A regra aplicada é: **principal e reserva sempre em CLIs diferentes**, e **quem revisa ou ataca roda em CLI diferente de quem escreveu**. Como a cota é por conta/CLI (todos os agentes no Codex dividem a mesma cota), é isso que garante que um esgotamento nunca derruba os dois lados do mesmo papel.
- **Backend virou "Backend / Plataforma"**: o portfólio é um site estático (React + Vite), sem banco nem login. O papel cuida de dados do site, SEO, build, desempenho, integrações (WhatsApp, formulário de orçamento se aprovado) e deploy na Vercel.

## Montar no Maestri

1. Confirme as CLIs no terminal do Maestri: `claude --version`, `codex --version`, `agy --version`, `opencode --version`. O script de cota também mostra quais estão instaladas. **Se o `agy` ainda não responder**, o Frontend não roda no Antigravity: use temporariamente o reserva (Codex) como principal.
2. Crie os 17 agentes, todos com a pasta `C:\dev\portifolio-nexus`, e cole em cada um o arquivo correspondente de `.equipe/prompts/` (ou da seção de prompts do `EQUIPE-COMPLETA.md`).
3. Conecte no canvas: Maestro ↔ todos; Testador → Avaliador; Red Team ↔ Blue Team; Maestro ↔ Maestro reserva.
4. Deixe os reservas parados. Eles só trabalham depois de receber "ATIVAR".
5. Opcional: um terminal extra rodando `node .equipe/cota/verificar-cota.mjs --vigiar 10`, que repete a checagem a cada 10 minutos e apita quando alguém precisa trocar.
6. Envie ao Maestro a mensagem de `.equipe/MENSAGEM-INICIAL.md`.

## Script de cota

```
node .equipe/cota/verificar-cota.mjs                       # relatório + .equipe/cota/COTA.md
node .equipe/cota/verificar-cota.mjs --vigiar 10           # repete a cada 10 min e apita
node .equipe/cota/verificar-cota.mjs marcar codex esgotado --reset "18:30"
node .equipe/cota/verificar-cota.mjs marcar codex ok
node .equipe/cota/verificar-cota.mjs ativo frontend reserva
```

| CLI | Como mede | Confiabilidade |
|---|---|---|
| Codex | lê o percentual oficial de uso que o Codex grava nas sessões (`~/.codex/sessions`) | alta |
| Claude Code | soma os tokens da janela de 5 h nos logs locais (`~/.claude/projects`) e detecta a mensagem de limite. Na primeira vez que a cota acabar, ele **calibra** sozinho o teto e passa a mostrar %. Você também pode preencher `limiteTokensJanela` no `config.json`. | média (estimativa calibrada) |
| Antigravity, OpenCode | não guardam uso consultável; vale o que for marcado com `marcar` | manual |

Limiares em `config.json`: **aviso 70%** (preparar passagem) e **trocar 85%** (ativar reserva). Para conferir os números oficiais: `/usage` no Claude Code e `/status` no Codex.

## Mensagens prontas de troca

**Ativar um reserva** (o Maestro envia, ou você, se o Maestro estiver sem cota):
```
ATIVAR. O principal deste papel está sem cota. Leia .equipe/notas/passagens/<papel>.md e a sua linha no .equipe/notas/PAINEL.md, e continue do "Próximo passo exato".
```

**Devolver ao principal:**
```
DEVOLVER. A cota do principal voltou. Pare num ponto seguro, atualize .equipe/notas/passagens/<papel>.md e responda "Passagem atualizada, devolvido".
```

**Principal retomando:**
```
RETOMAR. Você voltou a ter cota. Leia .equipe/notas/passagens/<papel>.md (o reserva trabalhou enquanto você estava fora) e continue.
```

**Maestro reserva assumindo** (você envia quando o Claude Code do Maestro acabar):
```
ATIVAR. O Maestro principal está sem cota. Assuma o comando: leia MAESTRO-ATIVO.md, MAESTRO-ESTADO.md, o LOG-MAESTRO.md e o PAINEL.md em .equipe/notas/, registre que assumiu e rode o script de cota antes de distribuir qualquer coisa.
```

## Pastas

```
.equipe/
  README.md              este guia
  REGRAS-COMUNS.md       regras, identidade visual, mapa de áreas, formatos (todos leem)
  MENSAGEM-INICIAL.md    primeira mensagem para o Maestro
  EQUIPE-COMPLETA.md     tudo num documento só, com os 17 prompts
  prompts/               um arquivo por agente, pronto para colar
  notas/                 PAINEL, estado e log do Maestro, quem está ativo, passagens
  handoffs/              mensagens entre agentes (sobrevivem ao fim da cota)
  pesquisas/  relatorios/
  cota/                  script, config e relatório gerado
```
