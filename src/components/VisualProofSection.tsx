import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { BarChart2, Settings2, Bot, ArrowRight, CheckCircle, Clock, AlertCircle, Sparkles, Zap } from 'lucide-react'
import { createWhatsAppUrl } from '../config/contact'

const WA_URL = createWhatsAppUrl(
  'Olá, vi as demonstrações visuais da Nexus Labs e quero entender como uma interface premium pode ser aplicada na minha empresa.'
)

// ─── Mini Dashboard Preview ───────────────────────────────────────────────────

function MiniDashboardPreview() {
  const bars = [48, 62, 55, 78, 70, 92]
  const kpis = [
    { label: 'Receita', value: 'R$ 284k', up: true },
    { label: 'Operação', value: '94%', up: true },
    { label: 'Performance', value: '+18%', up: true },
  ]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', height: '100%' }}>
      {/* Top bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontSize: '0.65rem', fontWeight: 600, color: 'var(--color-text-muted)' }}>Dashboard Executivo</span>
        <div style={{
          fontSize: '0.55rem', fontWeight: 700, color: 'var(--color-lilas)',
          background: 'color-mix(in srgb, var(--color-lilas) 10%, transparent)', border: '1px solid color-mix(in srgb, var(--color-lilas) 20%, transparent)',
          borderRadius: '4px', padding: '0.1rem 0.4rem',
        }}>
          Tempo real
        </div>
      </div>

      {/* KPI cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '0.4rem' }}>
        {kpis.map((k) => (
          <div key={k.label} style={{
            background: 'color-mix(in srgb, var(--color-text) 4%, transparent)', border: '1px solid color-mix(in srgb, var(--color-text) 7%, transparent)',
            borderRadius: '7px', padding: '0.45rem 0.5rem',
          }}>
            <div style={{ fontSize: '0.55rem', color: 'var(--color-text-muted)', marginBottom: '0.2rem' }}>{k.label}</div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.78rem', fontWeight: 700, color: 'var(--color-text)' }}>{k.value}</div>
            <div style={{ fontSize: '0.55rem', color: 'var(--color-lilas)', fontWeight: 600 }}>↑</div>
          </div>
        ))}
      </div>

      {/* Chart */}
      <div style={{
        flex: 1, background: 'color-mix(in srgb, var(--color-text) 2%, transparent)', border: '1px solid color-mix(in srgb, var(--color-text) 6%, transparent)',
        borderRadius: '8px', padding: '0.6rem 0.7rem',
        display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
      }}>
        <div style={{ fontSize: '0.55rem', color: 'var(--color-text-muted)', marginBottom: '0.4rem' }}>Receita × Custo</div>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: '4px', flex: 1 }}>
          {bars.map((h, i) => (
            <motion.div
              key={i}
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.06, ease: [0.16, 1, 0.3, 1] }}
              style={{
                flex: 1,
                height: `${h}%`,
                borderRadius: '3px 3px 0 0',
                transformOrigin: 'bottom',
                background: i === bars.length - 1
                  ? 'linear-gradient(180deg, var(--color-lilas), var(--color-roxo))'
                  : 'linear-gradient(180deg, color-mix(in srgb, var(--color-roxo) 70%, transparent), color-mix(in srgb, var(--color-roxo) 30%, transparent))',
                minHeight: '4px',
              }}
            />
          ))}
        </div>
        <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.4rem' }}>
          {[{ c: 'var(--color-roxo)', l: 'Receita' }, { c: 'var(--color-lilas-mid)', l: 'Meta' }].map(({ c, l }) => (
            <div key={l} style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              <div style={{ width: '6px', height: '6px', borderRadius: '2px', background: c }} />
              <span style={{ fontSize: '0.55rem', color: 'var(--color-text-muted)' }}>{l}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── Mini Operations Preview ──────────────────────────────────────────────────

function MiniOperationsPreview() {
  const orders = [
    { id: '#4821', client: 'Empresa A', stage: 'Em produção', color: 'var(--color-lilas-mid)', pct: 65 },
    { id: '#4820', client: 'Empresa B', stage: 'Concluído',   color: 'var(--color-lilas)', pct: 100 },
    { id: '#4819', client: 'Empresa C', stage: 'Aguardando',  color: 'var(--color-text-muted)', pct: 20 },
    { id: '#4818', client: 'Empresa D', stage: 'Em produção', color: 'var(--color-lilas-mid)', pct: 82 },
  ]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', height: '100%' }}>
      {/* Top bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontSize: '0.65rem', fontWeight: 600, color: 'var(--color-text-muted)' }}>Gestão Operacional</span>
        <div style={{ display: 'flex', gap: '0.3rem' }}>
          {[
            { label: '8 ativos', color: 'var(--color-lilas-mid)' },
            { label: '3 pendentes', color: 'var(--color-text-muted)' },
          ].map(({ label, color }) => (
            <div key={label} style={{
              fontSize: '0.52rem', fontWeight: 600, color,
              background: `color-mix(in srgb, ${color} 8.2%, transparent)`, border: `1px solid color-mix(in srgb, ${color} 18.8%, transparent)`,
              borderRadius: '4px', padding: '0.1rem 0.35rem',
            }}>
              {label}
            </div>
          ))}
        </div>
      </div>

      {/* Table header */}
      <div style={{
        display: 'grid', gridTemplateColumns: '1fr 1.5fr 1fr',
        padding: '0.25rem 0.5rem',
        borderBottom: '1px solid color-mix(in srgb, var(--color-text) 6%, transparent)',
      }}>
        {['Pedido', 'Etapa', 'Progresso'].map(h => (
          <span key={h} style={{ fontSize: '0.52rem', color: 'var(--color-text-muted)', fontWeight: 600, letterSpacing: '0.05em' }}>{h}</span>
        ))}
      </div>

      {/* Rows */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', flex: 1 }}>
        {orders.map((o, i) => (
          <motion.div
            key={o.id}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.35, delay: 0.15 + i * 0.07 }}
            style={{
              display: 'grid', gridTemplateColumns: '1fr 1.5fr 1fr',
              alignItems: 'center',
              background: 'color-mix(in srgb, var(--color-text) 2.5%, transparent)', borderRadius: '6px',
              padding: '0.35rem 0.5rem',
              border: '1px solid color-mix(in srgb, var(--color-text) 5%, transparent)',
            }}
          >
            <div>
              <div style={{ fontSize: '0.6rem', fontWeight: 700, color: 'var(--color-text)' }}>{o.id}</div>
              <div style={{ fontSize: '0.52rem', color: 'var(--color-text-muted)' }}>{o.client}</div>
            </div>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.25rem',
              fontSize: '0.55rem', fontWeight: 600, color: o.color,
              background: `color-mix(in srgb, ${o.color} 8.2%, transparent)`, borderRadius: '4px', padding: '0.15rem 0.4rem',
              width: 'fit-content',
            }}>
              {o.stage === 'Concluído' && <CheckCircle size={9} />}
              {o.stage === 'Aguardando' && <Clock size={9} />}
              {o.stage === 'Em produção' && <AlertCircle size={9} />}
              {o.stage}
            </div>
            <div>
              <div style={{ height: '4px', background: 'color-mix(in srgb, var(--color-text) 8%, transparent)', borderRadius: '2px', overflow: 'hidden' }}>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${o.pct}%` }}
                  transition={{ duration: 0.7, delay: 0.3 + i * 0.08 }}
                  style={{ height: '100%', background: o.color, borderRadius: '2px' }}
                />
              </div>
              <div style={{ fontSize: '0.5rem', color: 'var(--color-text-muted)', marginTop: '2px', textAlign: 'right' }}>{o.pct}%</div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

// ─── Mini AI Preview ──────────────────────────────────────────────────────────

function MiniAIPreview() {
  const msgs = [
    { from: 'client', text: 'Preciso de uma atualização do pedido #4821' },
    { from: 'agent',  text: 'Pedido #4821 em produção — previsão: amanhã às 14h.' },
    { from: 'client', text: 'Pode abrir um chamado de manutenção?' },
    { from: 'agent',  text: 'Chamado aberto! Número #887. Equipe notificada.' },
  ]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', height: '100%' }}>
      {/* Top bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <div style={{
            width: '22px', height: '22px', borderRadius: '6px',
            background: 'linear-gradient(135deg, color-mix(in srgb, var(--color-roxo) 40%, transparent), color-mix(in srgb, var(--color-lilas-mid) 30%, transparent))',
            border: '1px solid color-mix(in srgb, var(--color-roxo) 30%, transparent)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Sparkles size={11} color="var(--color-lilas)" />
          </div>
          <span style={{ fontSize: '0.65rem', fontWeight: 600, color: 'var(--color-text-muted)' }}>Agente Nexus</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
          <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: 'var(--color-lilas)', animation: 'nlPulse 2s infinite' }} />
          <span style={{ fontSize: '0.55rem', color: 'var(--color-lilas)', fontWeight: 600 }}>Ativo</span>
        </div>
      </div>

      {/* Flow diagram */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.3rem',
        background: 'color-mix(in srgb, var(--color-text) 2%, transparent)', border: '1px solid color-mix(in srgb, var(--color-text) 6%, transparent)',
        borderRadius: '7px', padding: '0.4rem 0.6rem',
      }}>
        {[
          { label: 'Cliente', icon: '👤', color: 'var(--color-lilas-mid)' },
          null,
          { label: 'Agente', icon: '🤖', color: 'var(--color-roxo)' },
          null,
          { label: 'Sistema', icon: '⚙️', color: 'var(--color-lilas)' },
        ].map((item, i) =>
          item === null ? (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '1px' }}>
              <div style={{ width: '8px', height: '1px', background: 'color-mix(in srgb, var(--color-text) 20%, transparent)' }} />
              <Zap size={8} color="color-mix(in srgb, var(--color-roxo) 70%, transparent)" />
              <div style={{ width: '8px', height: '1px', background: 'color-mix(in srgb, var(--color-text) 20%, transparent)' }} />
            </div>
          ) : (
            <div key={i} style={{ textAlign: 'center' }}>
              <div style={{
                fontSize: '0.85rem', marginBottom: '2px',
                filter: 'drop-shadow(0 0 4px color-mix(in srgb, var(--color-roxo) 40%, transparent))',
              }}>{item.icon}</div>
              <div style={{ fontSize: '0.5rem', color: item.color, fontWeight: 600 }}>{item.label}</div>
            </div>
          )
        )}
      </div>

      {/* Chat bubbles */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem', flex: 1, overflowY: 'hidden' }}>
        {msgs.map((m, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 + i * 0.12 }}
            style={{
              display: 'flex',
              justifyContent: m.from === 'client' ? 'flex-start' : 'flex-end',
            }}
          >
            <div style={{
              maxWidth: '80%',
              background: m.from === 'agent'
                ? 'linear-gradient(135deg, color-mix(in srgb, var(--color-roxo) 20%, transparent), color-mix(in srgb, var(--color-lilas-mid) 15%, transparent))'
                : 'color-mix(in srgb, var(--color-text) 5%, transparent)',
              border: m.from === 'agent'
                ? '1px solid color-mix(in srgb, var(--color-roxo) 25%, transparent)'
                : '1px solid color-mix(in srgb, var(--color-text) 7%, transparent)',
              borderRadius: m.from === 'client' ? '10px 10px 10px 2px' : '10px 10px 2px 10px',
              padding: '0.35rem 0.55rem',
              fontSize: '0.58rem',
              color: m.from === 'agent' ? 'var(--color-text)' : 'var(--color-text-muted)',
              lineHeight: 1.4,
            }}>
              {m.from === 'agent' && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', marginBottom: '2px' }}>
                  <Bot size={8} color="var(--color-lilas)" />
                  <span style={{ fontSize: '0.5rem', color: 'var(--color-lilas)', fontWeight: 700 }}>Agente Nexus</span>
                </div>
              )}
              {m.text}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Input bar */}
      <div style={{
        background: 'color-mix(in srgb, var(--color-text) 3%, transparent)', border: '1px solid color-mix(in srgb, var(--color-text) 8%, transparent)',
        borderRadius: '7px', padding: '0.35rem 0.6rem',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <span style={{ fontSize: '0.55rem', color: 'var(--color-text-muted)' }}>Enviar mensagem...</span>
        <div style={{
          width: '18px', height: '18px', borderRadius: '5px',
          background: 'color-mix(in srgb, var(--color-roxo) 20%, transparent)', border: '1px solid color-mix(in srgb, var(--color-roxo) 30%, transparent)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <ArrowRight size={9} color="var(--color-lilas)" />
        </div>
      </div>
    </div>
  )
}

// ─── Card wrapper ─────────────────────────────────────────────────────────────

const CARDS = [
  {
    icon: BarChart2,
    accent: 'var(--color-roxo)',
    label: 'Dashboard Executivo',
    desc: 'Painéis com indicadores, métricas e visão gerencial para decisões mais rápidas e seguras.',
    items: ['KPIs em tempo real', 'Gráficos interativos', 'Visão estratégica'],
    preview: MiniDashboardPreview,
  },
  {
    icon: Settings2,
    accent: 'var(--color-lilas-mid)',
    label: 'Gestão Operacional',
    desc: 'Fluxos de pedidos, status, etapas, responsáveis e acompanhamento completo da operação.',
    items: ['Controle por etapa', 'Permissões por perfil', 'Histórico de movimentações'],
    preview: MiniOperationsPreview,
  },
  {
    icon: Bot,
    accent: 'var(--color-lilas)',
    label: 'Automação com IA',
    desc: 'Agentes inteligentes, notificações automáticas e fluxos integrados para reduzir tarefas manuais.',
    items: ['WhatsApp integrado', 'Mensagens automáticas', 'Agentes inteligentes'],
    preview: MiniAIPreview,
  },
]

// ─── Main section ─────────────────────────────────────────────────────────────

export default function VisualProofSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section ref={ref} style={{ padding: '6rem 1.5rem', position: 'relative' }}>
      {/* bg glow */}
      <div aria-hidden="true" style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 70% 40% at 50% 50%, color-mix(in srgb, var(--color-lilas-mid) 4%, transparent) 0%, transparent 70%)',
      }} />

      <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative' }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: '3.5rem' }}
        >
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
            background: 'color-mix(in srgb, var(--color-text) 4%, transparent)', border: '1px solid color-mix(in srgb, var(--color-text) 10%, transparent)',
            borderRadius: '100px', padding: '0.3rem 0.9rem',
            fontSize: '0.72rem', fontWeight: 700,
            color: 'var(--color-text-muted)', letterSpacing: '0.08em',
            textTransform: 'uppercase', marginBottom: '1.25rem',
          }}>
            Prova Visual
          </div>

          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
            fontWeight: 700, color: 'var(--color-text)',
            letterSpacing: '-0.025em', marginBottom: '1rem',
          }}>
            Veja o padrão Nexus{' '}
            <span className="gradient-text">em ação</span>
          </h2>

          <p style={{
            fontSize: '1rem', color: 'var(--color-text-muted)',
            maxWidth: '580px', margin: '0 auto', lineHeight: 1.75,
          }}>
            Interfaces premium, dashboards executivos e experiências digitais criadas para transmitir
            controle, velocidade e confiança desde o primeiro acesso.
          </p>
        </motion.div>

        {/* Cards */}
        <div style={{ display: 'grid', gap: '1.25rem' }} className="vp-grid">
          {CARDS.map((card, i) => {
            const Icon = card.icon
            const Preview = card.preview
            return (
              <motion.div
                key={card.label}
                initial={{ opacity: 0, y: 36 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                style={{
                  background: 'color-mix(in srgb, var(--color-surface) 90%, transparent)',
                  border: '1px solid color-mix(in srgb, var(--color-text) 8%, transparent)',
                  borderRadius: '20px',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative',
                  boxShadow: `0 0 0 0 transparent`,
                  transition: 'border-color 0.3s, box-shadow 0.3s',
                }}
                onHoverStart={e => {
                  const el = (e.target as HTMLElement).closest('[data-vp-card]') as HTMLElement
                  if (el) {
                    el.style.borderColor = `color-mix(in srgb, ${card.accent} 18.8%, transparent)`
                    el.style.boxShadow = `0 0 40px color-mix(in srgb, ${card.accent} 6.3%, transparent)`
                  }
                }}
                onHoverEnd={e => {
                  const el = (e.target as HTMLElement).closest('[data-vp-card]') as HTMLElement
                  if (el) {
                    el.style.borderColor = 'color-mix(in srgb, var(--color-text) 8%, transparent)'
                    el.style.boxShadow = 'none'
                  }
                }}
                data-vp-card
              >
                {/* Top accent */}
                <div style={{ height: '2px', background: `linear-gradient(90deg, ${card.accent}, color-mix(in srgb, ${card.accent} 25.1%, transparent))` }} />

                {/* Mock preview area */}
                <div style={{
                  padding: '1.25rem 1.25rem 1rem',
                  background: `radial-gradient(ellipse at top right, color-mix(in srgb, ${card.accent} 3.1%, transparent) 0%, transparent 60%)`,
                  flex: 1, minHeight: '220px',
                }}>
                  <Preview />
                </div>

                {/* Info area */}
                <div style={{
                  padding: '1rem 1.25rem 1.3rem',
                  borderTop: '1px solid color-mix(in srgb, var(--color-text) 6%, transparent)',
                  background: 'color-mix(in srgb, var(--color-bg) 15%, transparent)',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.6rem' }}>
                    <div style={{
                      width: '30px', height: '30px', borderRadius: '8px',
                      background: `color-mix(in srgb, ${card.accent} 9.4%, transparent)`, border: `1px solid color-mix(in srgb, ${card.accent} 18.8%, transparent)`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                    }}>
                      <Icon size={14} color={card.accent} />
                    </div>
                    <h3 style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '0.92rem', fontWeight: 700,
                      color: 'var(--color-text)', letterSpacing: '-0.01em', margin: 0,
                    }}>
                      {card.label}
                    </h3>
                  </div>
                  <p style={{
                    fontSize: '0.8rem', color: 'var(--color-text-muted)',
                    lineHeight: 1.65, marginBottom: '0.75rem',
                  }}>
                    {card.desc}
                  </p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                    {card.items.map(item => (
                      <span key={item} style={{
                        fontSize: '0.68rem', color: card.accent,
                        background: `color-mix(in srgb, ${card.accent} 7.1%, transparent)`, border: `1px solid color-mix(in srgb, ${card.accent} 14.5%, transparent)`,
                        borderRadius: '5px', padding: '0.18rem 0.5rem',
                        fontWeight: 500,
                      }}>
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          style={{
            textAlign: 'center', marginTop: '3.5rem',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.1rem',
          }}
        >
          <p style={{ fontSize: '1rem', color: 'var(--color-text-muted)' }}>
            Quer uma interface assim para sua operação?
          </p>
          <a
            href={WA_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
            style={{
              textDecoration: 'none',
              display: 'inline-flex', alignItems: 'center',
              gap: '0.5rem', fontSize: '0.9rem', padding: '0.75rem 1.75rem',
            }}
          >
            Quero ver possibilidades <ArrowRight size={15} />
          </a>
        </motion.div>
      </div>

      <style>{`
        .vp-grid { grid-template-columns: repeat(3, 1fr); }
        @media (max-width: 1024px) { .vp-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 640px)  { .vp-grid { grid-template-columns: 1fr; } }
      `}</style>
    </section>
  )
}
