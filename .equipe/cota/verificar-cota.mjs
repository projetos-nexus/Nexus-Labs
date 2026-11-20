#!/usr/bin/env node
// =============================================================================
// verificar-cota.mjs — Painel de cota da equipe Nexus Labs (Maestri)
//
// Uso (na raiz do projeto, PowerShell ou qualquer terminal com Node 18+):
//   node .equipe/cota/verificar-cota.mjs                 -> relatório + COTA.md
//   node .equipe/cota/verificar-cota.mjs --json          -> saída em JSON
//   node .equipe/cota/verificar-cota.mjs --vigiar 5      -> repete a cada 5 min e avisa com bip
//   node .equipe/cota/verificar-cota.mjs marcar codex esgotado --reset "18:30" --nota "msg de limite"
//   node .equipe/cota/verificar-cota.mjs marcar codex ok
//   node .equipe/cota/verificar-cota.mjs ativo frontend reserva      -> registra quem está ativo
//   node .equipe/cota/verificar-cota.mjs ativo frontend principal
//
// Código de saída: 0 = tudo ok | 1 = alguém em aviso | 2 = ação necessária (trocar/pausar)
//
// O que é medido de verdade e o que é estimativa:
//   Claude Code -> lê os logs locais (~/.claude/projects/**/*.jsonl), soma tokens da janela
//                  de 5 h atual e detecta mensagens de "limite atingido". O percentual só
//                  aparece depois de calibrar (automático na 1ª vez que a cota acaba) ou se
//                  você preencher "limiteTokensJanela" no config.json.
//   Codex       -> lê o último "rate_limits" gravado nas sessões (~/.codex/sessions). Quando
//                  existe, é o percentual oficial que o próprio Codex recebeu da OpenAI.
//   OpenCode    -> lê "opencode stats --days 0 --json" (tokens e custo de hoje). Percentual só se
//                  "limiteTokensDia" estiver preenchido no config.json.
//   Antigravity -> não expõe uso localmente. Vale o que for marcado com "marcar".
// Marcações manuais ("marcar ... esgotado") sempre têm prioridade sobre a leitura automática.
// =============================================================================

import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { execFileSync, execSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const AQUI = path.dirname(fileURLToPath(import.meta.url));
const ARQ_CONFIG = path.join(AQUI, 'config.json');
const ARQ_STATUS = path.join(AQUI, 'status.json');
const ARQ_COTA_MD = path.join(AQUI, 'COTA.md');
const HOME = process.env.NEXUS_COTA_HOME || os.homedir(); // NEXUS_COTA_HOME só para testes
let AGORA = new Date(); // atualizado a cada rodada no modo --vigiar

// ----------------------------------------------------------------------------- util
const lerJSON = (arq, padrao) => {
  try { return JSON.parse(fs.readFileSync(arq, 'utf8')); } catch { return padrao; }
};
const salvarJSON = (arq, obj) => fs.writeFileSync(arq, JSON.stringify(obj, null, 2) + '\n', 'utf8');
const hhmm = (d) => d ? d.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }) : '-';
const dataHora = (d) => d ? d.toLocaleString('pt-BR', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' }) : '-';
const fmtNum = (n) => n == null ? '-' : n >= 1e6 ? (n / 1e6).toFixed(1) + 'M' : n >= 1e3 ? (n / 1e3).toFixed(0) + 'k' : String(n);

function listarArquivos(dir, filtro, maxIdadeMs) {
  const saida = [];
  const pilha = [dir];
  while (pilha.length) {
    const atual = pilha.pop();
    let itens;
    try { itens = fs.readdirSync(atual, { withFileTypes: true }); } catch { continue; }
    for (const it of itens) {
      const p = path.join(atual, it.name);
      if (it.isDirectory()) { pilha.push(p); continue; }
      if (!filtro(it.name)) continue;
      try {
        const st = fs.statSync(p);
        if (maxIdadeMs && AGORA - st.mtime > maxIdadeMs) continue;
        saida.push({ caminho: p, mtime: st.mtime });
      } catch { /* ignora */ }
    }
  }
  return saida.sort((a, b) => b.mtime - a.mtime);
}

function linhasJSONL(arq) {
  let txt;
  try { txt = fs.readFileSync(arq, 'utf8'); } catch { return []; }
  const out = [];
  for (const l of txt.split(/\r?\n/)) {
    if (!l.trim()) continue;
    try { out.push(JSON.parse(l)); } catch { /* linha parcial */ }
  }
  return out;
}

function comandoInstalado(cmd) {
  try {
    const finder = process.platform === 'win32' ? 'where' : 'which';
    execFileSync(finder, [cmd], { stdio: 'ignore' });
    return true;
  } catch { return false; }
}

// Extrai horário de reset de textos como "resets 3pm", "resets 15:00", "|1734567890"
function extrairReset(texto, base) {
  if (!texto) return null;
  const epoch = texto.match(/\|(\d{10})\b/);
  if (epoch) return new Date(Number(epoch[1]) * 1000);
  const m = texto.match(/(?:resets?|renova|reset em)\D{0,12}(\d{1,2})(?::(\d{2}))?\s*(am|pm)?/i);
  if (!m) return null;
  let h = Number(m[1]); const min = Number(m[2] || 0); const ap = (m[3] || '').toLowerCase();
  if (ap === 'pm' && h < 12) h += 12;
  if (ap === 'am' && h === 12) h = 0;
  const d = new Date(base || AGORA); d.setHours(h, min, 0, 0);
  if (d < (base || AGORA)) d.setDate(d.getDate() + 1);
  return d;
}

const RE_LIMITE = /usage limit reached|limit reached|rate[ _-]?limit(ed)?|quota exceeded|exceeded your (current )?quota|resource[_ ]exhausted|limite de uso|you've hit your (usage )?limit/i;

function textoDe(obj) {
  // junta qualquer texto de uma linha de log (mensagens de erro, conteúdo etc.)
  const partes = [];
  const visitar = (v, prof) => {
    if (prof > 6 || v == null) return;
    if (typeof v === 'string') { if (v.length < 2000 && !/^(text|assistant|user|system|message)$/.test(v)) partes.push(v); return; }
    if (Array.isArray(v)) { v.forEach((x) => visitar(x, prof + 1)); return; }
    if (typeof v === 'object') for (const k of Object.keys(v)) visitar(v[k], prof + 1);
  };
  visitar(obj, 0);
  return partes.join(' ');
}

// ----------------------------------------------------------------------------- Claude Code
function lerClaude(cfg, status) {
  const base = process.env.CLAUDE_CONFIG_DIR
    ? path.join(process.env.CLAUDE_CONFIG_DIR, 'projects')
    : path.join(HOME, '.claude', 'projects');
  const r = { cli: 'claude', fonte: 'logs locais', confiavel: false };
  if (!fs.existsSync(base)) return { ...r, erro: 'pasta de logs não encontrada (' + base + ')' };

  const janelaMs = (cfg.janelaHoras || 5) * 3600e3;
  const arquivos = listarArquivos(base, (n) => n.endsWith('.jsonl'), 8 * 24 * 3600e3);
  const vistos = new Set();
  const eventos = []; // {t, tokens}
  let ultimoLimite = null;

  for (const { caminho } of arquivos) {
    for (const e of linhasJSONL(caminho)) {
      const t = e.timestamp ? new Date(e.timestamp) : null;
      if (!t || isNaN(t)) continue;
      const u = e.message && e.message.usage;
      if (e.type === 'assistant' && u) {
        const chave = (e.message.id || '') + ':' + (e.requestId || '');
        if (chave !== ':' && vistos.has(chave)) continue;
        vistos.add(chave);
        const tokens = (u.input_tokens || 0) + (u.output_tokens || 0) + (u.cache_creation_input_tokens || 0);
        eventos.push({ t, tokens, cacheLido: u.cache_read_input_tokens || 0 });
      }
      // só mensagens sintéticas de erro do próprio Claude Code (não conversa sobre "rate limit")
      const sintetica = e.isApiErrorMessage === true || (e.message && e.message.model === '<synthetic>') || e.type === 'system';
      if (sintetica && AGORA - t < janelaMs) {
        const txt = textoDe(e.message || e.content || e);
        if (RE_LIMITE.test(txt) && (!ultimoLimite || t > ultimoLimite.t)) ultimoLimite = { t, txt: txt.slice(0, 200) };
      }
    }
  }
  eventos.sort((a, b) => a.t - b.t);

  // Blocos de 5 h no estilo do Claude Code: começa na hora cheia da 1ª mensagem
  let bloco = null;
  for (const ev of eventos) {
    if (!bloco || ev.t >= bloco.fim) {
      const ini = new Date(ev.t); ini.setMinutes(0, 0, 0);
      bloco = { ini, fim: new Date(ini.getTime() + janelaMs), tokens: 0, cacheLido: 0, msgs: 0 };
    }
    bloco.tokens += ev.tokens; bloco.cacheLido += ev.cacheLido; bloco.msgs++;
  }
  const blocoAtivo = bloco && AGORA < bloco.fim ? bloco : null;
  const semana = eventos.filter((e) => AGORA - e.t < 7 * 24 * 3600e3).reduce((s, e) => s + e.tokens, 0);

  // Calibração automática: se o log mostra limite atingido, guarda os tokens do bloco
  status.calibracao = status.calibracao || {};
  if (ultimoLimite && blocoAtivo) {
    const anterior = status.calibracao.claudeTokensJanela || 0;
    if (blocoAtivo.tokens > anterior) status.calibracao.claudeTokensJanela = blocoAtivo.tokens;
  }
  const limite = cfg.limiteTokensJanela || status.calibracao.claudeTokensJanela || null;
  const usadoJanela = blocoAtivo ? blocoAtivo.tokens : 0;
  const pct = limite ? Math.min(100, Math.round((usadoJanela / limite) * 100)) : null;

  const limiteSemana = cfg.limiteTokensSemana || null;
  const pctSemana = limiteSemana ? Math.min(100, Math.round((semana / limiteSemana) * 100)) : null;

  return {
    ...r,
    confiavel: !!limite,
    percentual: pct == null && pctSemana == null ? null : Math.max(pct || 0, pctSemana || 0),
    detalhe: `janela ${blocoAtivo ? hhmm(blocoAtivo.ini) + '–' + hhmm(blocoAtivo.fim) : 'sem uso nas últimas 5 h'}: ${fmtNum(usadoJanela)} tokens` +
      (limite ? ` de ~${fmtNum(limite)}` : ' (limite ainda não calibrado)') +
      ` · 7 dias: ${fmtNum(semana)}` + (limiteSemana ? ` (${pctSemana}%)` : ''),
    esgotado: !!ultimoLimite,
    reset: ultimoLimite ? (extrairReset(ultimoLimite.txt, ultimoLimite.t) || (blocoAtivo && blocoAtivo.fim)) : (blocoAtivo && blocoAtivo.fim),
    evidencia: ultimoLimite ? ultimoLimite.txt : null,
  };
}

// ----------------------------------------------------------------------------- Codex
function acharRateLimits(obj, prof = 0) {
  if (!obj || typeof obj !== 'object' || prof > 6) return null;
  if (obj.rate_limits && typeof obj.rate_limits === 'object') return obj.rate_limits;
  for (const k of Object.keys(obj)) {
    const r = acharRateLimits(obj[k], prof + 1);
    if (r) return r;
  }
  return null;
}

function lerCodex(cfg) {
  const base = path.join(process.env.CODEX_HOME || path.join(HOME, '.codex'), 'sessions');
  const r = { cli: 'codex', fonte: 'rate_limits das sessões', confiavel: false };
  if (!fs.existsSync(base)) return { ...r, erro: 'pasta de sessões não encontrada (' + base + ')' };

  const arquivos = listarArquivos(base, (n) => n.endsWith('.jsonl'), 8 * 24 * 3600e3).slice(0, 15);
  let snap = null; let erroLimite = null;
  for (const { caminho } of arquivos) {
    const linhas = linhasJSONL(caminho);
    for (let i = linhas.length - 1; i >= 0; i--) {
      const e = linhas[i];
      const t = e.timestamp ? new Date(e.timestamp) : null;
      const rl = acharRateLimits(e);
      if (rl && (!snap || (t && t > snap.t))) snap = { t, rl };
      const ehErro = e.type === 'error' || (e.payload && /error/i.test(e.payload.type || ''));
      const txt = ehErro ? textoDe(e) : '';
      if (txt && RE_LIMITE.test(txt) && t && AGORA - t < 24 * 3600e3 && (!erroLimite || t > erroLimite.t)) erroLimite = { t, txt: txt.slice(0, 200) };
      if (snap && i < linhas.length - 400) break; // basta o mais recente de cada arquivo
    }
  }

  const janelas = [];
  if (snap) {
    for (const [nome, j] of Object.entries(snap.rl)) {
      if (!j || typeof j !== 'object' || j.used_percent == null) continue;
      let reset = null;
      if (j.resets_at) reset = new Date((j.resets_at > 1e12 ? j.resets_at : j.resets_at * 1000));
      else if (j.resets_in_seconds != null && snap.t) reset = new Date(snap.t.getTime() + j.resets_in_seconds * 1000);
      const renovou = reset && reset < AGORA;
      janelas.push({
        nome: nome === 'primary' ? 'curta' : nome === 'secondary' ? 'semanal' : nome,
        minutos: j.window_minutes, pct: renovou ? 0 : Math.round(j.used_percent), reset, renovou,
      });
    }
  }
  const pior = janelas.reduce((a, b) => (!a || b.pct > a.pct ? b : a), null);
  const esgotadoPorErro = erroLimite && (!snap || !snap.t || erroLimite.t >= snap.t);
  return {
    ...r,
    confiavel: janelas.length > 0,
    percentual: pior ? pior.pct : null,
    detalhe: janelas.length
      ? janelas.map((j) => `${j.nome} ${j.pct}%${j.reset ? ' (renova ' + dataHora(j.reset) + ')' : ''}${j.renovou ? ' [já renovou]' : ''}`).join(' · ') +
        ` · leitura de ${dataHora(snap.t)}`
      : 'nenhum rate_limits encontrado nas sessões recentes (rode /status no Codex para conferir)',
    esgotado: !!esgotadoPorErro || (pior && pior.pct >= 100),
    reset: pior ? pior.reset : erroLimite ? extrairReset(erroLimite.txt, erroLimite.t) : null,
    evidencia: esgotadoPorErro ? erroLimite.txt : null,
  };
}

// ----------------------------------------------------------------------------- Antigravity
function lerAntigravity() {
  return { cli: 'antigravity', fonte: 'somente marcação manual', confiavel: false, percentual: null,
    detalhe: 'o Antigravity não grava uso consultável; use "marcar antigravity esgotado" quando acabar', esgotado: false, reset: null };
}

// ----------------------------------------------------------------------------- OpenCode
// Lê "opencode stats --days 0 --json" (uso de hoje, todos os projetos). Percentual só se
// "limiteTokensDia" estiver preenchido no config.json (o modelo gratuito não publica limite).
function lerOpenCode(cfg) {
  const r = { cli: 'opencode', fonte: 'opencode stats (hoje)', confiavel: false };
  let s;
  try {
    const txt = execSync(`${cfg.comando || 'opencode'} stats --days 0 --json`,
      { encoding: 'utf8', timeout: 30000, stdio: ['ignore', 'pipe', 'ignore'] });
    s = JSON.parse(txt.slice(txt.indexOf('{')));
  } catch (e) {
    return { ...r, erro: 'não consegui rodar "opencode stats" (' + e.message.split('\n')[0] + ')' };
  }
  const t = s.tokens || {};
  const usados = (t.input || 0) + (t.output || 0) + (t.reasoning || 0) + ((t.cache && t.cache.write) || 0);
  const lidos = (t.cache && t.cache.read) || 0;
  const limite = cfg.limiteTokensDia || null;
  const amanha = new Date(AGORA); amanha.setHours(24, 0, 0, 0);
  return {
    ...r,
    confiavel: !!limite,
    percentual: limite ? Math.min(100, Math.round((usados / limite) * 100)) : null,
    detalhe: `hoje: ${fmtNum(usados)} tokens` + (limite ? ` de ~${fmtNum(limite)}` : ' (sem limite configurado)') +
      ` + ${fmtNum(lidos)} de cache · ${s.prompts || 0} pedidos · ${s.sessions || 0} sessões · custo US$ ${(s.cost || 0).toFixed(2)}`,
    esgotado: false,
    reset: limite ? amanha : null,
  };
}

// ----------------------------------------------------------------------------- avaliação
function classificar(info, marca, lim) {
  // marca manual tem prioridade, e expira sozinha quando passa do horário de reset
  if (marca && marca.estado === 'esgotado') {
    const reset = marca.reset ? new Date(marca.reset) : null;
    if (!reset || reset > AGORA) return { nivel: 'ESGOTADO', motivo: 'marcado manualmente' + (marca.nota ? ': ' + marca.nota : ''), reset };
  }
  if (info.esgotado && (!info.reset || info.reset > AGORA)) return { nivel: 'ESGOTADO', motivo: 'limite detectado no log', reset: info.reset };
  if (info.erro) return { nivel: 'SEM DADOS', motivo: info.erro, reset: null };
  if (info.percentual == null) return { nivel: 'SEM %', motivo: 'sem limite conhecido ainda', reset: info.reset };
  if (info.percentual >= lim.trocar) return { nivel: 'TROCAR', motivo: `${info.percentual}% ≥ ${lim.trocar}%`, reset: info.reset };
  if (info.percentual >= lim.aviso) return { nivel: 'AVISO', motivo: `${info.percentual}% ≥ ${lim.aviso}%`, reset: info.reset };
  return { nivel: 'OK', motivo: `${info.percentual}%`, reset: info.reset };
}

const RUIM = new Set(['ESGOTADO', 'TROCAR']);

function recomendar(agente, estados, ativos) {
  const p = estados[agente.principal]; const r = agente.reserva ? estados[agente.reserva] : null;
  const ativoAgora = (ativos && ativos[agente.id]) || 'principal';
  if (!r) return RUIM.has(p.nivel)
    ? { acao: 'PAUSAR', texto: `${agente.principal} ${p.nivel.toLowerCase()} e sem reserva: segurar tarefas ou devolver ao dono da área`, ativoAgora }
    : { acao: p.nivel === 'AVISO' ? 'PREPARAR PASSAGEM' : 'OK', texto: p.nivel === 'AVISO' ? 'não passar tarefa nova' : '', ativoAgora };
  if (RUIM.has(p.nivel) && RUIM.has(r.nivel)) return { acao: 'PAUSAR', texto: 'principal e reserva sem cota: pausar e avisar o Kaio', ativoAgora };
  if (RUIM.has(p.nivel)) {
    const alerta = r.nivel === 'AVISO' ? ` (atenção: ${agente.reserva} já em aviso)` : '';
    return { acao: ativoAgora === 'reserva' ? 'MANTER RESERVA' : 'ATIVAR RESERVA', texto: `${agente.principal} ${p.nivel.toLowerCase()} → usar reserva (${agente.reserva})${alerta}`, ativoAgora };
  }
  if (ativoAgora === 'reserva') return { acao: 'VOLTAR AO PRINCIPAL', texto: `${agente.principal} voltou (${p.nivel}) → reserva escreve passagem e devolve`, ativoAgora };
  if (p.nivel === 'AVISO') return { acao: 'PREPARAR PASSAGEM', texto: 'principal deve atualizar a nota de passagem agora', ativoAgora };
  return { acao: 'OK', texto: '', ativoAgora };
}

// ----------------------------------------------------------------------------- relatório
function gerar() {
  const config = lerJSON(ARQ_CONFIG, null);
  if (!config) { console.error('config.json não encontrado ou inválido em ' + ARQ_CONFIG); process.exit(3); }
  const status = lerJSON(ARQ_STATUS, { marcas: {}, ativos: {}, calibracao: {} });
  const lim = config.limiares || { aviso: 70, trocar: 85 };
  const leitores = { claude: lerClaude, codex: lerCodex, antigravity: lerAntigravity, opencode: lerOpenCode };

  const clis = {};
  for (const [id, c] of Object.entries(config.clis)) {
    let info;
    try { info = (leitores[id] || lerAntigravity)(c, status); } catch (e) { info = { cli: id, erro: 'falha ao ler: ' + e.message }; }
    const estado = classificar(info, (status.marcas || {})[id], lim);
    clis[id] = { ...c, id, instalado: comandoInstalado(c.comando), info, ...estado };
  }
  const agentes = config.agentes.map((a) => ({ ...a, ...recomendar(a, clis, status.ativos) }));
  salvarJSON(ARQ_STATUS, status); // guarda calibração

  const piorAcao = agentes.some((a) => a.acao === 'PAUSAR' || a.acao === 'ATIVAR RESERVA' || a.acao === 'VOLTAR AO PRINCIPAL') ? 2
    : agentes.some((a) => a.acao === 'PREPARAR PASSAGEM') ? 1 : 0;
  return { gerado: AGORA.toISOString(), limiares: lim, clis, agentes, codigo: piorAcao };
}

function paraMarkdown(rel) {
  const L = [];
  L.push(`# Cota da equipe — ${AGORA.toLocaleString('pt-BR')}`, '');
  L.push(`Limiares: aviso ${rel.limiares.aviso}% · trocar ${rel.limiares.trocar}%`, '');
  L.push('## Por CLI', '', '| CLI | Instalada | Estado | Detalhe | Renova |', '|---|---|---|---|---|');
  for (const c of Object.values(rel.clis)) {
    L.push(`| ${c.nome}${c.economizar ? ' (economizar)' : ''} | ${c.instalado ? 'sim' : '**não**'} | **${c.nivel}** | ${c.info.detalhe || c.motivo} | ${dataHora(c.reset)} |`);
  }
  L.push('', '## Por agente', '', '| Agente | Principal | Reserva | Ativo agora | Ação |', '|---|---|---|---|---|');
  for (const a of rel.agentes) {
    L.push(`| ${a.nome} | ${a.principal} (${rel.clis[a.principal].nivel}) | ${a.reserva ? a.reserva + ' (' + rel.clis[a.reserva].nivel + ')' : 'sem reserva'} | ${a.ativoAgora} | ${a.acao === 'OK' ? 'ok' : '**' + a.acao + '** ' + a.texto} |`);
  }
  const evid = Object.values(rel.clis).filter((c) => c.info.evidencia);
  if (evid.length) { L.push('', '## Evidências de limite'); evid.forEach((c) => L.push(`- ${c.nome}: "${c.info.evidencia}"`)); }
  L.push('', '_Gerado por `node .equipe/cota/verificar-cota.mjs`. Percentuais do Codex são oficiais; o do Claude é estimativa calibrada; Antigravity e OpenCode são manuais._');
  return L.join('\n') + '\n';
}

function imprimir(rel) {
  const cor = { OK: '\x1b[32m', AVISO: '\x1b[33m', TROCAR: '\x1b[31m', ESGOTADO: '\x1b[41m\x1b[97m', 'SEM %': '\x1b[90m', 'SEM DADOS': '\x1b[90m' };
  const z = '\x1b[0m';
  console.log(`\nCOTA DA EQUIPE — ${AGORA.toLocaleString('pt-BR')}  (aviso ${rel.limiares.aviso}% · trocar ${rel.limiares.trocar}%)\n`);
  for (const c of Object.values(rel.clis)) {
    console.log(`${(c.nome + (c.economizar ? ' *' : '')).padEnd(16)} ${(cor[c.nivel] || '') + c.nivel.padEnd(9) + z} ${c.instalado ? '' : '[não instalado] '}${c.info.detalhe || c.motivo}${c.reset ? '  → renova ' + dataHora(c.reset) : ''}`);
  }
  console.log('');
  for (const a of rel.agentes) {
    if (a.acao === 'OK') continue;
    console.log(`  >> ${a.nome}: ${a.acao} — ${a.texto}`);
  }
  if (rel.agentes.every((a) => a.acao === 'OK')) console.log('  Nenhuma troca necessária.');
  console.log('\n* = economizar. Relatório salvo em .equipe/cota/COTA.md\n');
}

// ----------------------------------------------------------------------------- CLI
const args = process.argv.slice(2);
const opt = (nome) => { const i = args.indexOf(nome); return i >= 0 ? args[i + 1] : undefined; };

if (args[0] === 'marcar') {
  const [, cli, estado] = args;
  const config = lerJSON(ARQ_CONFIG, { clis: {} });
  if (!config.clis[cli] || !['esgotado', 'ok'].includes(estado)) {
    console.error('uso: marcar <' + Object.keys(config.clis).join('|') + '> <esgotado|ok> [--reset "HH:MM"] [--nota "texto"]');
    process.exit(3);
  }
  const status = lerJSON(ARQ_STATUS, { marcas: {}, ativos: {}, calibracao: {} });
  status.marcas = status.marcas || {};
  if (estado === 'ok') delete status.marcas[cli];
  else {
    const resetTxt = opt('--reset');
    const reset = resetTxt ? extrairReset('reset ' + resetTxt, AGORA) : null;
    status.marcas[cli] = { estado, desde: AGORA.toISOString(), reset: reset ? reset.toISOString() : null, nota: opt('--nota') || '' };
  }
  salvarJSON(ARQ_STATUS, status);
  console.log(`${cli} marcado como ${estado}${status.marcas[cli] && status.marcas[cli].reset ? ' até ' + dataHora(new Date(status.marcas[cli].reset)) : ''}.`);
  process.exit(0);
}

if (args[0] === 'ativo') {
  const [, agente, qual] = args;
  const config = lerJSON(ARQ_CONFIG, { agentes: [] });
  if (!config.agentes.find((a) => a.id === agente) || !['principal', 'reserva'].includes(qual)) {
    console.error('uso: ativo <' + config.agentes.map((a) => a.id).join('|') + '> <principal|reserva>');
    process.exit(3);
  }
  const status = lerJSON(ARQ_STATUS, { marcas: {}, ativos: {}, calibracao: {} });
  status.ativos = status.ativos || {};
  status.ativos[agente] = qual;
  salvarJSON(ARQ_STATUS, status);
  console.log(`${agente}: ${qual} ativo.`);
  process.exit(0);
}

const rodar = () => {
  AGORA = new Date();
  const rel = gerar();
  fs.writeFileSync(ARQ_COTA_MD, paraMarkdown(rel), 'utf8');
  if (args.includes('--json')) console.log(JSON.stringify(rel, null, 2));
  else imprimir(rel);
  return rel;
};

const vigiar = opt('--vigiar');
if (vigiar) {
  const min = Math.max(1, Number(vigiar) || 5);
  const ciclo = () => { const rel = rodar(); if (rel.codigo === 2) process.stdout.write('\x07\x07'); };
  ciclo();
  setInterval(() => { console.clear(); ciclo(); }, min * 60e3);
} else {
  const rel = rodar();
  process.exitCode = rel.codigo;
}
