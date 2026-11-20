import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  Palette, Settings2, Brain, MessageSquare,
  BarChart2, ShieldCheck, FileSpreadsheet, Layers,
  ArrowRight,
} from 'lucide-react'
import { createWhatsAppUrl } from '../config/contact'

const WA_URL = createWhatsAppUrl(
  'Olá, quero uma solução da Nexus Labs com interface premium, automações e dashboards para minha empresa.'
)

const diferenciais = [
  {
    icon: Palette,
    title: 'Interface premium',
    description: 'Sistemas que passam confiança para clientes, equipe e gestão desde o primeiro acesso.',
    accent: 'var(--color-roxo)',
  },
  {
    icon: Settings2,
    title: 'Processo sob medida',
    description: 'A solução acompanha o fluxo real da empresa, em vez de forçar a operação a se adaptar a um sistema genérico.',
    accent: 'var(--color-lilas-mid)',
  },
  {
    icon: Brain,
    title: 'IA integrada',
    description: 'Agentes inteligentes conectados aos processos para apoiar atendimento, análise, notificações e automações.',
    accent: 'var(--color-lilas)',
  },
  {
    icon: MessageSquare,
    title: 'WhatsApp conectado',
    description: 'Notificações, atendimento e abertura de chamados integrados ao canal que a empresa já usa no dia a dia.',
    accent: 'var(--color-lilas-mid)',
  },
  {
    icon: BarChart2,
    title: 'Dashboards executivos',
    description: 'Indicadores claros para acompanhar operação, financeiro, atendimento e performance em tempo real.',
    accent: 'var(--color-roxo)',
  },
  {
    icon: ShieldCheck,
    title: 'Controle de acesso',
    description: 'Permissões por usuário, setor ou perfil para garantir segurança e organização.',
    accent: 'var(--color-lilas)',
  },
  {
    icon: FileSpreadsheet,
    title: 'Relatórios e exportações',
    description: 'Dados organizados para análise, prestação de contas e tomada de decisão.',
    accent: 'var(--color-lilas-mid)',
  },
  {
    icon: Layers,
    title: 'Projetos prontos adaptáveis',
    description: 'Bases já construídas que reduzem tempo de entrega e aceleram a implantação.',
    accent: 'var(--color-roxo)',
  },
]

export default function DiferenciaisSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section
      id="diferenciais"
      ref={ref}
      style={{ padding: '6rem 1.5rem', position: 'relative' }}
    >
      <div aria-hidden="true" style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 80% 50% at 50% 50%, color-mix(in srgb, var(--color-roxo) 4%, transparent) 0%, transparent 70%)',
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
            display: 'inline-flex', alignItems: 'center',
            background: 'color-mix(in srgb, var(--color-text) 4%, transparent)', border: '1px solid color-mix(in srgb, var(--color-text) 10%, transparent)',
            borderRadius: '100px', padding: '0.3rem 0.9rem',
            fontSize: '0.72rem', fontWeight: 700,
            color: 'var(--color-text-muted)', letterSpacing: '0.08em',
            textTransform: 'uppercase', marginBottom: '1.25rem',
          }}>
            Diferenciais
          </div>

          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
            fontWeight: 700, color: 'var(--color-text)',
            letterSpacing: '-0.025em', marginBottom: '1rem',
          }}>
            Diferenciais que transformam sistema{' '}
            <span className="gradient-text">em vantagem operacional</span>
          </h2>

          <p style={{
            fontSize: '1rem', color: 'var(--color-text-muted)',
            maxWidth: '600px', margin: '0 auto', lineHeight: 1.75,
          }}>
            A Nexus Labs não entrega apenas telas bonitas. Cada sistema é pensado para organizar processos,
            reduzir retrabalho, automatizar rotinas e dar mais controle para a gestão.
          </p>
        </motion.div>

        {/* Grid */}
        <div style={{ display: 'grid', gap: '1rem' }} className="diff-grid">
          {diferenciais.map((item, i) => {
            const Icon = item.icon
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: 0.08 + i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -3, transition: { duration: 0.18 } }}
                style={{
                  background: `radial-gradient(ellipse at top left, color-mix(in srgb, ${item.accent} 3.1%, transparent) 0%, color-mix(in srgb, var(--color-surface) 90%, transparent) 65%)`,
                  border: '1px solid color-mix(in srgb, var(--color-text) 8%, transparent)',
                  borderRadius: '14px',
                  padding: '1.4rem',
                  position: 'relative', overflow: 'hidden',
                  cursor: 'default',
                  transition: 'border-color 0.25s, box-shadow 0.25s',
                }}
                onHoverStart={e => {
                  const el = (e.target as HTMLElement).closest('[data-diff]') as HTMLElement
                  if (el) { el.style.borderColor = `color-mix(in srgb, ${item.accent} 20.8%, transparent)`; el.style.boxShadow = `0 0 28px color-mix(in srgb, ${item.accent} 5.5%, transparent)` }
                }}
                onHoverEnd={e => {
                  const el = (e.target as HTMLElement).closest('[data-diff]') as HTMLElement
                  if (el) { el.style.borderColor = 'color-mix(in srgb, var(--color-text) 8%, transparent)'; el.style.boxShadow = 'none' }
                }}
                data-diff
              >
                {/* Corner glow */}
                <div aria-hidden="true" style={{
                  position: 'absolute', bottom: '-16px', right: '-16px',
                  width: '80px', height: '80px', borderRadius: '50%',
                  background: `radial-gradient(circle, color-mix(in srgb, ${item.accent} 6.3%, transparent) 0%, transparent 70%)`,
                  pointerEvents: 'none',
                }} />

                {/* Icon */}
                <div style={{
                  width: '38px', height: '38px', borderRadius: '10px',
                  background: `color-mix(in srgb, ${item.accent} 8.2%, transparent)`, border: `1px solid color-mix(in srgb, ${item.accent} 15.7%, transparent)`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginBottom: '0.9rem',
                }}>
                  <Icon size={17} color={item.accent} strokeWidth={1.8} />
                </div>

                <h3 style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '0.92rem', fontWeight: 700,
                  color: 'var(--color-text)', letterSpacing: '-0.01em',
                  marginBottom: '0.45rem',
                }}>
                  {item.title}
                </h3>

                <p style={{
                  fontSize: '0.81rem', color: 'var(--color-text-muted)',
                  lineHeight: 1.68, margin: 0,
                }}>
                  {item.description}
                </p>
              </motion.div>
            )
          })}
        </div>

        {/* Bottom block */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.55 }}
          style={{
            marginTop: '3.5rem',
            background: 'color-mix(in srgb, var(--color-surface) 90%, transparent)',
            border: '1px solid color-mix(in srgb, var(--color-text) 9%, transparent)',
            borderRadius: '20px',
            padding: 'clamp(1.75rem, 4vw, 2.5rem)',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            gap: '2rem', flexWrap: 'wrap',
            position: 'relative', overflow: 'hidden',
          }}
        >
          {/* Glow line top */}
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, height: '1px',
            background: 'linear-gradient(90deg, transparent, color-mix(in srgb, var(--color-lilas-mid) 35%, transparent), color-mix(in srgb, var(--color-roxo) 35%, transparent), transparent)',
          }} />

          <div style={{ maxWidth: '520px' }}>
            <h3 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.1rem, 2.5vw, 1.4rem)',
              fontWeight: 700, color: 'var(--color-text)',
              letterSpacing: '-0.02em', marginBottom: '0.6rem',
            }}>
              O sistema precisa trabalhar a favor da operação.
            </h3>
            <p style={{
              fontSize: '0.9rem', color: 'var(--color-text-muted)',
              lineHeight: 1.72, margin: 0,
            }}>
              Quando a tecnologia é bem desenhada, ela reduz ruído, organiza informações e ajuda a empresa
              a tomar decisões melhores.
            </p>
          </div>

          <a
            href={WA_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
            style={{
              textDecoration: 'none', flexShrink: 0,
              display: 'inline-flex', alignItems: 'center',
              gap: '0.5rem', fontSize: '0.9rem', padding: '0.8rem 1.6rem',
              whiteSpace: 'nowrap',
            }}
          >
            Quero uma solução assim <ArrowRight size={15} />
          </a>
        </motion.div>
      </div>

      <style>{`
        .diff-grid { grid-template-columns: repeat(4, 1fr); }
        @media (max-width: 1024px) { .diff-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 640px)  { .diff-grid { grid-template-columns: 1fr; } }
      `}</style>
    </section>
  )
}
