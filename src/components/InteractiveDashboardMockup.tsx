import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  TrendingUp, Users, CheckCircle, DollarSign,
  Package, Factory, Truck, AlertCircle,
  Receipt, TrendingDown, MessageSquare, Clock, Cpu, Zap,
} from 'lucide-react'
import nexusLabsIcon from '../assets/logos/nexus-labs-icon.png'

// ─── Types ────────────────────────────────────────────────────────────────────

interface Metric {
  label: string
  value: string
  sub: string
  positive: boolean | null
  icon: React.ElementType
  color: string
}
interface ChartMonth { month: string; a: number; b: number; aLabel: string; bLabel: string }
interface TabData {
  metrics: Metric[]
  chartTitle: string
  chartLegend: [string, string]
  chart: ChartMonth[]
}

const TABS = ['Visão Geral', 'Operacional', 'Financeiro', 'IA'] as const
type Tab = typeof TABS[number]

// ─── Data ─────────────────────────────────────────────────────────────────────

const TAB_DATA: Record<Tab, TabData> = {
  'Visão Geral': {
    metrics: [
      { label: 'Receita Mês',        value: 'R$ 284.950', sub: '+18.2%',        positive: true,  icon: TrendingUp,  color: 'var(--color-roxo)' },
      { label: 'Leads Qualificados', value: '127',         sub: '+34 novos',     positive: true,  icon: Users,       color: 'var(--color-lilas-mid)' },
      { label: 'Tickets Fechados',   value: '89%',         sub: 'dentro do SLA', positive: true,  icon: CheckCircle, color: 'var(--color-lilas)' },
      { label: 'Custo Operacional',  value: 'R$ 42.100',   sub: '−5.3%',         positive: true,  icon: DollarSign,  color: 'var(--color-lilas)' },
    ],
    chartTitle: 'Receita × Custo — Últimos 6 meses',
    chartLegend: ['Receita', 'Custo'],
    chart: [
      { month: 'Jan', a: 62, b: 13, aLabel: 'R$ 180k', bLabel: 'R$ 38k'  },
      { month: 'Fev', a: 73, b: 14, aLabel: 'R$ 210k', bLabel: 'R$ 40k'  },
      { month: 'Mar', a: 68, b: 13, aLabel: 'R$ 195k', bLabel: 'R$ 37k'  },
      { month: 'Abr', a: 84, b: 15, aLabel: 'R$ 240k', bLabel: 'R$ 42k'  },
      { month: 'Mai', a: 91, b: 14, aLabel: 'R$ 260k', bLabel: 'R$ 41k'  },
      { month: 'Jun', a:100, b: 15, aLabel: 'R$ 285k', bLabel: 'R$ 42k'  },
    ],
  },
  'Operacional': {
    metrics: [
      { label: 'Pedidos Ativos',  value: '342', sub: '+27 hoje',   positive: true,  icon: Package,      color: 'var(--color-lilas-mid)' },
      { label: 'Em Produção',     value: '86',  sub: 'tempo real', positive: null,  icon: Factory,      color: 'var(--color-lilas)' },
      { label: 'Carregamentos',   value: '41',  sub: 'hoje',       positive: null,  icon: Truck,        color: 'var(--color-roxo)' },
      { label: 'Pendências',      value: '12',  sub: 'atenção',    positive: false, icon: AlertCircle,  color: 'var(--color-text-muted)' },
    ],
    chartTitle: 'Fluxo operacional — Últimos 6 meses',
    chartLegend: ['Pedidos', 'Concluídos'],
    chart: [
      { month: 'Jan', a: 82, b: 70, aLabel: '280 pedidos', bLabel: '240 concluídos' },
      { month: 'Fev', a: 91, b: 82, aLabel: '310 pedidos', bLabel: '280 concluídos' },
      { month: 'Mar', a: 86, b: 79, aLabel: '295 pedidos', bLabel: '270 concluídos' },
      { month: 'Abr', a: 94, b: 85, aLabel: '320 pedidos', bLabel: '290 concluídos' },
      { month: 'Mai', a:100, b: 91, aLabel: '340 pedidos', bLabel: '310 concluídos' },
      { month: 'Jun', a:100, b: 97, aLabel: '342 pedidos', bLabel: '330 concluídos' },
    ],
  },
  'Financeiro': {
    metrics: [
      { label: 'Faturamento',   value: 'R$ 487.290', sub: '+12.4%',     positive: true,  icon: TrendingUp,   color: 'var(--color-lilas)' },
      { label: 'Recebíveis',    value: 'R$ 138.700', sub: 'previsto',   positive: null,  icon: Receipt,      color: 'var(--color-lilas-mid)' },
      { label: 'Inadimplência', value: '2.1%',        sub: 'controlado', positive: true,  icon: TrendingDown, color: 'var(--color-lilas)' },
      { label: 'Margem',        value: '31%',          sub: '+4.8%',      positive: true,  icon: DollarSign,   color: 'var(--color-roxo)' },
    ],
    chartTitle: 'Performance financeira — Últimos 6 meses',
    chartLegend: ['Faturamento', 'Recebíveis'],
    chart: [
      { month: 'Jan', a: 78, b: 19, aLabel: 'R$ 380k', bLabel: 'R$ 95k'  },
      { month: 'Fev', a: 86, b: 22, aLabel: 'R$ 420k', bLabel: 'R$ 108k' },
      { month: 'Mar', a: 84, b: 21, aLabel: 'R$ 410k', bLabel: 'R$ 102k' },
      { month: 'Abr', a: 93, b: 26, aLabel: 'R$ 455k', bLabel: 'R$ 125k' },
      { month: 'Mai', a: 96, b: 27, aLabel: 'R$ 470k', bLabel: 'R$ 130k' },
      { month: 'Jun', a:100, b: 28, aLabel: 'R$ 487k', bLabel: 'R$ 138k' },
    ],
  },
  'IA': {
    metrics: [
      { label: 'Automações Ativas',  value: '18',    sub: 'online',     positive: true, icon: Zap,          color: 'var(--color-roxo)' },
      { label: 'Msgs Processadas',   value: '4.892', sub: 'este mês',   positive: true, icon: MessageSquare, color: 'var(--color-lilas-mid)' },
      { label: 'Tempo Economizado',  value: '126h',  sub: 'estimado',   positive: true, icon: Clock,        color: 'var(--color-lilas)' },
      { label: 'Agentes IA',         value: '3',     sub: 'ativos',     positive: null, icon: Cpu,          color: 'var(--color-lilas)' },
    ],
    chartTitle: 'Automações e IA — Últimos 6 meses',
    chartLegend: ['Mensagens', 'Horas econ.'],
    chart: [
      { month: 'Jan', a: 57, b: 52, aLabel: '2.800 msgs', bLabel: '65h econ.'  },
      { month: 'Fev', a: 65, b: 62, aLabel: '3.200 msgs', bLabel: '78h econ.'  },
      { month: 'Mar', a: 74, b: 71, aLabel: '3.600 msgs', bLabel: '90h econ.'  },
      { month: 'Abr', a: 84, b: 81, aLabel: '4.100 msgs', bLabel: '102h econ.' },
      { month: 'Mai', a: 92, b: 94, aLabel: '4.500 msgs', bLabel: '118h econ.' },
      { month: 'Jun', a:100, b:100, aLabel: '4.892 msgs', bLabel: '126h econ.' },
    ],
  },
}

// ─── Bar Chart ────────────────────────────────────────────────────────────────

const CHART_H = 88

function BarChart({ data, legend, tabKey }: { data: ChartMonth[]; legend: [string, string]; tabKey: string }) {
  const [hov, setHov] = useState<number | null>(null)

  return (
    <div style={{ position: 'relative' }}>
      {/* Grid lines */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', paddingBottom: '20px' }}>
        {[25, 50, 75].map(pct => (
          <div key={pct} style={{
            position: 'absolute',
            left: 0, right: 0,
            bottom: `calc(20px + ${pct / 100 * CHART_H}px)`,
            height: '1px',
            background: 'color-mix(in srgb, var(--color-text) 4%, transparent)',
          }} />
        ))}
      </div>

      {/* Legend */}
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '0.6rem' }}>
        {[{ c: 'var(--color-roxo)', l: legend[0] }, { c: 'var(--color-lilas-mid)', l: legend[1] }].map(({ c, l }) => (
          <div key={l} style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <div style={{ width: '8px', height: '8px', borderRadius: '2px', background: c }} />
            <span style={{ fontSize: '0.62rem', color: 'var(--color-text-muted)', fontWeight: 500 }}>{l}</span>
          </div>
        ))}
      </div>

      {/* Bars */}
      <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-end', height: `${CHART_H + 20}px` }}>
        {data.map((d, i) => (
          <div
            key={d.month}
            style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%', justifyContent: 'flex-end', position: 'relative', cursor: 'default' }}
            onMouseEnter={() => setHov(i)}
            onMouseLeave={() => setHov(null)}
          >
            {/* Tooltip */}
            <AnimatePresence>
              {hov === i && (
                <motion.div
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 4 }}
                  transition={{ duration: 0.15 }}
                  style={{
                    position: 'absolute', bottom: '100%', left: '50%', transform: 'translateX(-50%)',
                    marginBottom: '8px', zIndex: 20,
                    background: 'color-mix(in srgb, var(--color-surface) 98%, transparent)',
                    border: '1px solid color-mix(in srgb, var(--color-text) 14%, transparent)',
                    borderRadius: '9px', padding: '0.5rem 0.7rem',
                    fontSize: '0.65rem', whiteSpace: 'nowrap',
                    boxShadow: '0 12px 32px color-mix(in srgb, var(--color-bg) 60%, transparent), 0 0 0 1px color-mix(in srgb, var(--color-roxo) 10%, transparent)',
                    pointerEvents: 'none',
                  }}
                >
                  <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, color: 'var(--color-text)', marginBottom: '4px', fontSize: '0.68rem' }}>{d.month}</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', marginBottom: '2px' }}>
                    <div style={{ width: '6px', height: '6px', borderRadius: '2px', background: 'var(--color-roxo)', flexShrink: 0 }} />
                    <span style={{ color: 'var(--color-text-muted)' }}>{d.aLabel}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    <div style={{ width: '6px', height: '6px', borderRadius: '2px', background: 'var(--color-lilas-mid)', flexShrink: 0 }} />
                    <span style={{ color: 'var(--color-text-muted)' }}>{d.bLabel}</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Bar pair */}
            <div style={{ display: 'flex', gap: '3px', alignItems: 'flex-end', width: '100%' }}>
              <motion.div
                key={`${tabKey}-a-${i}`}
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ duration: 0.55, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  flex: 1,
                  height: `${Math.max(5, (d.a / 100) * CHART_H)}px`,
                  borderRadius: '4px 4px 0 0',
                  transformOrigin: 'bottom',
                  background: hov === i
                    ? 'linear-gradient(180deg, var(--color-lilas) 0%, var(--color-roxo) 100%)'
                    : 'linear-gradient(180deg, color-mix(in srgb, var(--color-roxo) 90%, transparent) 0%, color-mix(in srgb, var(--color-roxo) 40%, transparent) 100%)',
                  transition: 'background 0.2s',
                  boxShadow: hov === i ? '0 0 12px color-mix(in srgb, var(--color-roxo) 50%, transparent)' : 'none',
                }}
              />
              <motion.div
                key={`${tabKey}-b-${i}`}
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ duration: 0.55, delay: i * 0.07 + 0.04, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  flex: 1,
                  height: `${Math.max(5, (d.b / 100) * CHART_H)}px`,
                  borderRadius: '4px 4px 0 0',
                  transformOrigin: 'bottom',
                  background: hov === i
                    ? 'linear-gradient(180deg, var(--color-lilas) 0%, var(--color-lilas-mid) 100%)'
                    : 'linear-gradient(180deg, color-mix(in srgb, var(--color-lilas-mid) 65%, transparent) 0%, color-mix(in srgb, var(--color-lilas-mid) 25%, transparent) 100%)',
                  transition: 'background 0.2s',
                  boxShadow: hov === i ? '0 0 12px color-mix(in srgb, var(--color-lilas-mid) 40%, transparent)' : 'none',
                }}
              />
            </div>

            {/* Month label */}
            <span style={{
              fontSize: '0.58rem',
              color: hov === i ? 'var(--color-text)' : 'var(--color-text-muted)',
              marginTop: '5px',
              transition: 'color 0.2s',
              fontWeight: hov === i ? 600 : 400,
            }}>
              {d.month}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Main ─────────────────────────────────────────────────────────────────────

export default function InteractiveDashboardMockup() {
  const [activeTab, setActiveTab] = useState<Tab>('Visão Geral')
  const [logoHov, setLogoHov] = useState(false)
  const data = TAB_DATA[activeTab]
  const isAI = activeTab === 'IA'

  return (
    <motion.div
      whileHover={{ boxShadow: '0 0 0 1px color-mix(in srgb, var(--color-roxo) 20%, transparent), 0 0 60px color-mix(in srgb, var(--color-roxo) 8%, transparent), 0 24px 64px color-mix(in srgb, var(--color-bg) 50%, transparent)' }}
      transition={{ duration: 0.3 }}
      style={{
        background: 'color-mix(in srgb, var(--color-surface-alt) 97%, transparent)',
        border: '1px solid color-mix(in srgb, var(--color-text) 10%, transparent)',
        borderRadius: '18px',
        overflow: 'hidden',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        boxShadow: isAI
          ? '0 0 0 1px color-mix(in srgb, var(--color-roxo) 15%, transparent), 0 0 48px color-mix(in srgb, var(--color-roxo) 10%, transparent), 0 20px 60px color-mix(in srgb, var(--color-bg) 50%, transparent)'
          : '0 0 0 1px color-mix(in srgb, var(--color-text) 4%, transparent), 0 20px 60px color-mix(in srgb, var(--color-bg) 50%, transparent)',
        position: 'relative',
        transition: 'box-shadow 0.4s ease',
      }}
    >
      {/* Top accent line */}
      <div style={{
        height: '2px',
        background: isAI
          ? 'linear-gradient(90deg, var(--color-roxo), var(--color-lilas), var(--color-lilas-mid))'
          : 'linear-gradient(90deg, transparent 0%, var(--color-roxo) 35%, var(--color-lilas-mid) 65%, transparent 100%)',
        opacity: isAI ? 1 : 0.7,
        transition: 'all 0.4s',
      }} />

      {/* Inner top glow */}
      <div aria-hidden="true" style={{
        position: 'absolute', top: 2, left: '50%', transform: 'translateX(-50%)',
        width: '60%', height: '1px',
        background: 'linear-gradient(90deg, transparent, color-mix(in srgb, var(--color-roxo) 40%, transparent), transparent)',
        pointerEvents: 'none',
      }} />

      {/* ── Browser chrome ── */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: '0.5rem',
        padding: '0.65rem 1.1rem',
        background: 'color-mix(in srgb, var(--color-bg) 30%, transparent)',
        borderBottom: '1px solid color-mix(in srgb, var(--color-text) 6%, transparent)',
      }}>
        {[1, 2, 3].map(n => (
          <div key={n} style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'color-mix(in srgb, var(--color-text) 10%, transparent)', flexShrink: 0 }} />
        ))}
        <div style={{
          flex: 1, height: '22px', marginLeft: '0.5rem',
          background: 'color-mix(in srgb, var(--color-text) 4%, transparent)', borderRadius: '5px',
          display: 'flex', alignItems: 'center', paddingLeft: '0.65rem',
        }}>
          <span style={{ fontSize: '0.63rem', color: 'var(--color-text-muted)' }}>
            app.nexuslabs.com.br — Nexus Command Center
          </span>
        </div>
        <div style={{
          fontSize: '0.55rem', fontWeight: 700, letterSpacing: '0.07em',
          color: 'var(--color-lilas)',
          padding: '0.18rem 0.5rem',
          border: '1px solid color-mix(in srgb, var(--color-roxo) 22%, transparent)',
          borderRadius: '4px', background: 'color-mix(in srgb, var(--color-roxo) 8%, transparent)',
          flexShrink: 0,
        }}>
          NEXUS OS
        </div>
      </div>

      {/* ── Dashboard body ── */}
      <div className="nl-dash-body" style={{ padding: '1.1rem 1.3rem 1.3rem' }}>

        {/* Header */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          marginBottom: '1rem', gap: '0.75rem',
        }}>
          {/* Logo + title */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <motion.div
              onHoverStart={() => setLogoHov(true)}
              onHoverEnd={() => setLogoHov(false)}
              animate={{ boxShadow: logoHov ? '0 0 20px color-mix(in srgb, var(--color-roxo) 50%, transparent)' : '0 0 8px color-mix(in srgb, var(--color-roxo) 15%, transparent)' }}
              style={{
                width: '40px', height: '40px', borderRadius: '11px', flexShrink: 0,
                background: 'linear-gradient(135deg, color-mix(in srgb, var(--color-roxo) 25%, transparent) 0%, color-mix(in srgb, var(--color-lilas-mid) 15%, transparent) 100%)',
                border: '1px solid color-mix(in srgb, var(--color-text) 12%, transparent)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                overflow: 'hidden', cursor: 'default',
              }}
            >
              <img src={nexusLabsIcon} alt="Nexus Labs" style={{ width: '28px', height: '28px', objectFit: 'contain' }} />
            </motion.div>
            <div>
              <div style={{
                fontFamily: 'var(--font-display)',
                fontSize: '0.86rem', fontWeight: 700, color: 'var(--color-text)',
                lineHeight: 1.2, letterSpacing: '-0.01em',
              }}>
                Nexus Command Center
              </div>
              <div style={{ fontSize: '0.6rem', color: 'var(--color-text-muted)', marginTop: '1px' }}>
                Visão executiva em tempo real
              </div>
            </div>
          </div>

          {/* Right badges */}
          <div className="nl-header-right" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexShrink: 0 }}>
            {isAI && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{
                  fontSize: '0.58rem', fontWeight: 700, letterSpacing: '0.05em',
                  color: 'var(--color-lilas)', background: 'color-mix(in srgb, var(--color-roxo) 15%, transparent)',
                  border: '1px solid color-mix(in srgb, var(--color-roxo) 30%, transparent)',
                  borderRadius: '5px', padding: '0.18rem 0.45rem',
                  whiteSpace: 'nowrap',
                }}
              >
                IA ATIVA
              </motion.div>
            )}
            <div style={{
              fontSize: '0.58rem', color: 'var(--color-text-muted)',
              background: 'color-mix(in srgb, var(--color-text) 4%, transparent)', border: '1px solid color-mix(in srgb, var(--color-text) 7%, transparent)',
              borderRadius: '5px', padding: '0.18rem 0.5rem', whiteSpace: 'nowrap',
            }}>
              Sincronizado agora
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <div style={{
                width: '6px', height: '6px', borderRadius: '50%', background: 'var(--color-lilas)',
                animation: 'nlPulse 2s ease-in-out infinite',
              }} />
              <span style={{ fontSize: '0.62rem', color: 'var(--color-lilas)', fontWeight: 600 }}>Online</span>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div style={{
          display: 'flex', gap: '2px', overflowX: 'auto',
          borderBottom: '1px solid color-mix(in srgb, var(--color-text) 7%, transparent)',
          marginBottom: '0.9rem',
        }} className="nl-tabs">
          {TABS.map(tab => {
            const active = tab === activeTab
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  fontSize: '0.68rem', fontWeight: active ? 700 : 500,
                  padding: '0.4rem 0.9rem',
                  border: 'none', borderRadius: '6px 6px 0 0',
                  cursor: 'pointer', whiteSpace: 'nowrap',
                  background: active ? 'color-mix(in srgb, var(--color-roxo) 10%, transparent)' : 'transparent',
                  color: active ? 'var(--color-lilas)' : 'var(--color-text-muted)',
                  position: 'relative', bottom: '-1px',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={e => { if (!active) (e.currentTarget as HTMLElement).style.color = 'var(--color-text)' }}
                onMouseLeave={e => { if (!active) (e.currentTarget as HTMLElement).style.color = 'var(--color-text-muted)' }}
              >
                {tab}
                {active && (
                  <motion.div
                    layoutId="tab-indicator"
                    style={{
                      position: 'absolute', bottom: 0, left: 0, right: 0, height: '2px',
                      background: 'linear-gradient(90deg, var(--color-roxo), var(--color-lilas-mid))',
                      borderRadius: '2px 2px 0 0',
                    }}
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
              </button>
            )
          })}
          <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', paddingBottom: '4px' }}>
            <span style={{
              fontSize: '0.56rem', color: 'var(--color-text-muted)',
              background: 'color-mix(in srgb, var(--color-text) 4%, transparent)', border: '1px solid color-mix(in srgb, var(--color-text) 7%, transparent)',
              borderRadius: '4px', padding: '0.15rem 0.4rem', whiteSpace: 'nowrap',
            }}>
              Tempo real
            </span>
          </div>
        </div>

        {/* Metric cards */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab + '-m'}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.22 }}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '0.55rem', marginBottom: '0.9rem' }}
            className="nl-cards"
          >
            {data.metrics.map((m, i) => {
              const Icon = m.icon
              return (
                <motion.div
                  key={m.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.28, delay: i * 0.05 }}
                  whileHover={{ y: -2, transition: { duration: 0.15 } }}
                  style={{
                    background: `radial-gradient(ellipse at top left, color-mix(in srgb, ${m.color} 3.9%, transparent) 0%, color-mix(in srgb, var(--color-surface) 90%, transparent) 70%)`,
                    border: '1px solid color-mix(in srgb, var(--color-text) 7%, transparent)',
                    borderRadius: '11px', padding: '0.75rem 0.8rem',
                    position: 'relative', overflow: 'hidden',
                    cursor: 'default',
                  }}
                  onHoverStart={e => {
                    const el = (e.target as HTMLElement).closest('[data-metric]') as HTMLElement
                    if (el) el.style.borderColor = `color-mix(in srgb, ${m.color} 25.1%, transparent)`
                  }}
                  onHoverEnd={e => {
                    const el = (e.target as HTMLElement).closest('[data-metric]') as HTMLElement
                    if (el) el.style.borderColor = 'color-mix(in srgb, var(--color-text) 7%, transparent)'
                  }}
                  data-metric
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.45rem' }}>
                    <span style={{ fontSize: '0.6rem', color: 'var(--color-text-muted)', fontWeight: 500, lineHeight: 1.3, maxWidth: '80%' }}>
                      {m.label}
                    </span>
                    <div style={{
                      width: '22px', height: '22px', borderRadius: '6px', flexShrink: 0,
                      background: `color-mix(in srgb, ${m.color} 8.2%, transparent)`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <Icon size={11} color={m.color} />
                    </div>
                  </div>
                  <div style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1rem', fontWeight: 800, color: 'var(--color-text)',
                    lineHeight: 1, marginBottom: '0.28rem',
                    letterSpacing: '-0.02em',
                  }}>
                    {m.value}
                  </div>
                  <div style={{
                    fontSize: '0.6rem', fontWeight: 600,
                    color: m.positive === true ? 'var(--color-lilas)' : m.positive === false ? 'var(--color-text-muted)' : m.color,
                  }}>
                    {m.sub}
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        </AnimatePresence>

        {/* Chart */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab + '-c'}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{
              background: 'color-mix(in srgb, var(--color-text) 2%, transparent)',
              border: `1px solid ${isAI ? 'color-mix(in srgb, var(--color-roxo) 15%, transparent)' : 'color-mix(in srgb, var(--color-text) 6%, transparent)'}`,
              borderRadius: '11px', padding: '0.85rem',
              transition: 'border-color 0.4s',
            }}
          >
            <div className="nl-chart-title" style={{
              fontFamily: 'var(--font-display)',
              fontSize: '0.66rem', color: 'var(--color-text-muted)',
              marginBottom: '0.6rem', fontWeight: 600, letterSpacing: '0.01em',
            }}>
              {data.chartTitle}
            </div>
            <BarChart data={data.chart} legend={data.chartLegend} tabKey={activeTab} />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom fade */}
      <div aria-hidden="true" style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: '28px',
        background: 'linear-gradient(transparent, color-mix(in srgb, var(--color-bg) 35%, transparent))',
        pointerEvents: 'none', borderRadius: '0 0 18px 18px',
      }} />

      <style>{`
        @keyframes nlPulse {
          0%,100% { opacity:1; box-shadow:0 0 0 0 color-mix(in srgb, var(--color-lilas) 40%, transparent); }
          50%      { opacity:0.7; box-shadow:0 0 0 4px transparent; }
        }
        .nl-tabs { scrollbar-width:none; -ms-overflow-style:none; }
        .nl-tabs::-webkit-scrollbar { display:none; }
        @media (max-width:640px) {
          .nl-cards { grid-template-columns: repeat(2,1fr) !important; }
          .nl-dash-body { padding: 0.8rem 0.9rem 0.9rem !important; }
          .nl-header-right { display: none !important; }
          .nl-chart-title { font-size: 0.6rem !important; }
        }
        @media (max-width:380px) {
          .nl-cards { grid-template-columns: 1fr 1fr !important; }
          .nl-tabs button { padding: 0.35rem 0.6rem !important; font-size: 0.62rem !important; }
        }
      `}</style>
    </motion.div>
  )
}
