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
        <span style={{ fontSize: '0.65rem', fontWeight: 600, color: 'rgba(255,255,255,0.6)' }}>Dashboard Executivo</span>
        <div style={{
          fontSize: '0.55rem', fontWeight: 700, color: '#4ADE80',
          background: 'rgba(74,222,128,0.1)', border: '1px solid rgba(74,222,128,0.2)',
          borderRadius: '4px', padding: '0.1rem 0.4rem',
        }}>
          Tempo real
        </div>
      </div>

      {/* KPI cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '0.4rem' }}>
        {kpis.map((k) => (
          <div key={k.label} style={{
            background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)',
            borderRadius: '7px', padding: '0.45rem 0.5rem',
          }}>
            <div style={{ fontSize: '0.55rem', color: 'rgba(255,255,255,0.35)', marginBottom: '0.2rem' }}>{k.label}</div>
            <div style={{ fontFamily: '"Space Grotesk", sans-serif', fontSize: '0.78rem', fontWeight: 700, color: '#fff' }}>{k.value}</div>
            <div style={{ fontSize: '0.55rem', color: '#4ADE80', fontWeight: 600 }}>↑</div>
          </div>
        ))}
      </div>

      {/* Chart */}
      <div style={{
        flex: 1, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)',
        borderRadius: '8px', padding: '0.6rem 0.7rem',
        display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
      }}>
        <div style={{ fontSize: '0.55rem', color: 'rgba(255,255,255,0.3)', marginBottom: '0.4rem' }}>Receita × Custo</div>
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
                  ? 'linear-gradient(180deg, #9B82FF, #7B5CFF)'
                  : 'linear-gradient(180deg, rgba(123,92,255,0.7), rgba(123,92,255,0.3))',
                minHeight: '4px',
              }}
            />
          ))}
        </div>
        <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.4rem' }}>
          {[{ c: '#7B5CFF', l: 'Receita' }, { c: '#4DA3FF', l: 'Meta' }].map(({ c, l }) => (
            <div key={l} style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              <div style={{ width: '6px', height: '6px', borderRadius: '2px', background: c }} />
              <span style={{ fontSize: '0.55rem', color: 'rgba(255,255,255,0.3)' }}>{l}</span>
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
    { id: '#4821', client: 'Empresa A', stage: 'Em produção', color: '#4DA3FF', pct: 65 },
    { id: '#4820', client: 'Empresa B', stage: 'Concluído',   color: '#4ADE80', pct: 100 },
    { id: '#4819', client: 'Empresa C', stage: 'Aguardando',  color: '#F59E0B', pct: 20 },
    { id: '#4818', client: 'Empresa D', stage: 'Em produção', color: '#4DA3FF', pct: 82 },
  ]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', height: '100%' }}>
      {/* Top bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontSize: '0.65rem', fontWeight: 600, color: 'rgba(255,255,255,0.6)' }}>Gestão Operacional</span>
        <div style={{ display: 'flex', gap: '0.3rem' }}>
          {[
            { label: '8 ativos', color: '#4DA3FF' },
            { label: '3 pendentes', color: '#F59E0B' },
          ].map(({ label, color }) => (
            <div key={label} style={{
              fontSize: '0.52rem', fontWeight: 600, color,
              background: `${color}15`, border: `1px solid ${color}30`,
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
        borderBottom: '1px solid rgba(255,255,255,0.06)',
      }}>
        {['Pedido', 'Etapa', 'Progresso'].map(h => (
          <span key={h} style={{ fontSize: '0.52rem', color: 'rgba(255,255,255,0.28)', fontWeight: 600, letterSpacing: '0.05em' }}>{h}</span>
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
              background: 'rgba(255,255,255,0.025)', borderRadius: '6px',
              padding: '0.35rem 0.5rem',
              border: '1px solid rgba(255,255,255,0.05)',
            }}
          >
            <div>
              <div style={{ fontSize: '0.6rem', fontWeight: 700, color: '#fff' }}>{o.id}</div>
              <div style={{ fontSize: '0.52rem', color: 'rgba(255,255,255,0.3)' }}>{o.client}</div>
            </div>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.25rem',
              fontSize: '0.55rem', fontWeight: 600, color: o.color,
              background: `${o.color}15`, borderRadius: '4px', padding: '0.15rem 0.4rem',
              width: 'fit-content',
            }}>
              {o.stage === 'Concluído' && <CheckCircle size={9} />}
              {o.stage === 'Aguardando' && <Clock size={9} />}
              {o.stage === 'Em produção' && <AlertCircle size={9} />}
              {o.stage}
            </div>
            <div>
              <div style={{ height: '4px', background: 'rgba(255,255,255,0.08)', borderRadius: '2px', overflow: 'hidden' }}>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${o.pct}%` }}
                  transition={{ duration: 0.7, delay: 0.3 + i * 0.08 }}
                  style={{ height: '100%', background: o.color, borderRadius: '2px' }}
                />
              </div>
              <div style={{ fontSize: '0.5rem', color: 'rgba(255,255,255,0.3)', marginTop: '2px', textAlign: 'right' }}>{o.pct}%</div>
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
            background: 'linear-gradient(135deg, rgba(123,92,255,0.4), rgba(77,163,255,0.3))',
            border: '1px solid rgba(123,92,255,0.3)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Sparkles size={11} color="#9B82FF" />
          </div>
          <span style={{ fontSize: '0.65rem', fontWeight: 600, color: 'rgba(255,255,255,0.6)' }}>Agente Nexus</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
          <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#4ADE80', animation: 'nlPulse 2s infinite' }} />
          <span style={{ fontSize: '0.55rem', color: '#4ADE80', fontWeight: 600 }}>Ativo</span>
        </div>
      </div>

      {/* Flow diagram */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.3rem',
        background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)',
        borderRadius: '7px', padding: '0.4rem 0.6rem',
      }}>
        {[
          { label: 'Cliente', icon: '👤', color: '#4DA3FF' },
          null,
          { label: 'Agente', icon: '🤖', color: '#7B5CFF' },
          null,
          { label: 'Sistema', icon: '⚙️', color: '#9B82FF' },
        ].map((item, i) =>
          item === null ? (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '1px' }}>
              <div style={{ width: '8px', height: '1px', background: 'rgba(255,255,255,0.2)' }} />
              <Zap size={8} color="rgba(123,92,255,0.7)" />
              <div style={{ width: '8px', height: '1px', background: 'rgba(255,255,255,0.2)' }} />
            </div>
          ) : (
            <div key={i} style={{ textAlign: 'center' }}>
              <div style={{
                fontSize: '0.85rem', marginBottom: '2px',
                filter: 'drop-shadow(0 0 4px rgba(123,92,255,0.4))',
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
                ? 'linear-gradient(135deg, rgba(123,92,255,0.2), rgba(77,163,255,0.15))'
                : 'rgba(255,255,255,0.05)',
              border: m.from === 'agent'
                ? '1px solid rgba(123,92,255,0.25)'
                : '1px solid rgba(255,255,255,0.07)',
              borderRadius: m.from === 'client' ? '10px 10px 10px 2px' : '10px 10px 2px 10px',
              padding: '0.35rem 0.55rem',
              fontSize: '0.58rem',
              color: m.from === 'agent' ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.6)',
              lineHeight: 1.4,
            }}>
              {m.from === 'agent' && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', marginBottom: '2px' }}>
                  <Bot size={8} color="#9B82FF" />
                  <span style={{ fontSize: '0.5rem', color: '#9B82FF', fontWeight: 700 }}>Agente Nexus</span>
                </div>
              )}
              {m.text}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Input bar */}
      <div style={{
        background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: '7px', padding: '0.35rem 0.6rem',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <span style={{ fontSize: '0.55rem', color: 'rgba(255,255,255,0.2)' }}>Enviar mensagem...</span>
        <div style={{
          width: '18px', height: '18px', borderRadius: '5px',
          background: 'rgba(123,92,255,0.2)', border: '1px solid rgba(123,92,255,0.3)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <ArrowRight size={9} color="#9B82FF" />
        </div>
      </div>
    </div>
  )
}

// ─── Card wrapper ─────────────────────────────────────────────────────────────

const CARDS = [
  {
    icon: BarChart2,
    accent: '#7B5CFF',
    label: 'Dashboard Executivo',
    desc: 'Painéis com indicadores, métricas e visão gerencial para decisões mais rápidas e seguras.',
    items: ['KPIs em tempo real', 'Gráficos interativos', 'Visão estratégica'],
    preview: MiniDashboardPreview,
  },
  {
    icon: Settings2,
    accent: '#4DA3FF',
    label: 'Gestão Operacional',
    desc: 'Fluxos de pedidos, status, etapas, responsáveis e acompanhamento completo da operação.',
    items: ['Controle por etapa', 'Permissões por perfil', 'Histórico de movimentações'],
    preview: MiniOperationsPreview,
  },
  {
    icon: Bot,
    accent: '#9B82FF',
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
        background: 'radial-gradient(ellipse 70% 40% at 50% 50%, rgba(77,163,255,0.04) 0%, transparent 70%)',
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
            background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '100px', padding: '0.3rem 0.9rem',
            fontSize: '0.72rem', fontWeight: 700,
            color: 'rgba(255,255,255,0.4)', letterSpacing: '0.08em',
            textTransform: 'uppercase', marginBottom: '1.25rem',
          }}>
            Prova Visual
          </div>

          <h2 style={{
            fontFamily: '"Space Grotesk", sans-serif',
            fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
            fontWeight: 700, color: '#fff',
            letterSpacing: '-0.025em', marginBottom: '1rem',
          }}>
            Veja o padrão Nexus{' '}
            <span className="gradient-text">em ação</span>
          </h2>

          <p style={{
            fontSize: '1rem', color: 'rgba(255,255,255,0.5)',
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
                  background: 'rgba(18,18,26,0.9)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: '20px',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative',
                  boxShadow: `0 0 0 0 ${card.accent}00`,
                  transition: 'border-color 0.3s, box-shadow 0.3s',
                }}
                onHoverStart={e => {
                  const el = (e.target as HTMLElement).closest('[data-vp-card]') as HTMLElement
                  if (el) {
                    el.style.borderColor = `${card.accent}30`
                    el.style.boxShadow = `0 0 40px ${card.accent}10`
                  }
                }}
                onHoverEnd={e => {
                  const el = (e.target as HTMLElement).closest('[data-vp-card]') as HTMLElement
                  if (el) {
                    el.style.borderColor = 'rgba(255,255,255,0.08)'
                    el.style.boxShadow = 'none'
                  }
                }}
                data-vp-card
              >
                {/* Top accent */}
                <div style={{ height: '2px', background: `linear-gradient(90deg, ${card.accent}, ${card.accent}40)` }} />

                {/* Mock preview area */}
                <div style={{
                  padding: '1.25rem 1.25rem 1rem',
                  background: `radial-gradient(ellipse at top right, ${card.accent}08 0%, transparent 60%)`,
                  flex: 1, minHeight: '220px',
                }}>
                  <Preview />
                </div>

                {/* Info area */}
                <div style={{
                  padding: '1rem 1.25rem 1.3rem',
                  borderTop: '1px solid rgba(255,255,255,0.06)',
                  background: 'rgba(0,0,0,0.15)',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.6rem' }}>
                    <div style={{
                      width: '30px', height: '30px', borderRadius: '8px',
                      background: `${card.accent}18`, border: `1px solid ${card.accent}30`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                    }}>
                      <Icon size={14} color={card.accent} />
                    </div>
                    <h3 style={{
                      fontFamily: '"Space Grotesk", sans-serif',
                      fontSize: '0.92rem', fontWeight: 700,
                      color: '#fff', letterSpacing: '-0.01em', margin: 0,
                    }}>
                      {card.label}
                    </h3>
                  </div>
                  <p style={{
                    fontSize: '0.8rem', color: 'rgba(255,255,255,0.45)',
                    lineHeight: 1.65, marginBottom: '0.75rem',
                  }}>
                    {card.desc}
                  </p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                    {card.items.map(item => (
                      <span key={item} style={{
                        fontSize: '0.68rem', color: card.accent,
                        background: `${card.accent}12`, border: `1px solid ${card.accent}25`,
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
          <p style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.5)' }}>
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
