import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Search, Layout, Code2, Rocket, RefreshCw, Check, ArrowRight } from 'lucide-react'
import { createWhatsAppUrl } from '../config/contact'

const WA_URL = createWhatsAppUrl(
  'Olá, quero começar com um diagnóstico da Nexus Labs para entender como transformar um processo da minha empresa em sistema.'
)

const steps = [
  {
    number: '01',
    icon: Search,
    title: 'Diagnóstico',
    description:
      'Entendemos o fluxo atual da empresa, os gargalos, os controles manuais e onde a tecnologia pode gerar mais impacto.',
    points: ['Mapeamento do problema', 'Análise do processo atual', 'Definição de prioridades'],
    accent: '#7B5CFF',
    accentBg: 'rgba(123,92,255,0.1)',
  },
  {
    number: '02',
    icon: Layout,
    title: 'Protótipo',
    description:
      'Criamos uma visão clara da solução antes do desenvolvimento completo, validando telas, fluxos e experiência do usuário.',
    points: ['Estrutura das telas', 'Jornada do usuário', 'Validação visual'],
    accent: '#4DA3FF',
    accentBg: 'rgba(77,163,255,0.1)',
  },
  {
    number: '03',
    icon: Code2,
    title: 'Desenvolvimento',
    description:
      'Transformamos o protótipo em sistema real, com interface premium, regras de negócio, permissões, dashboards e integrações.',
    points: ['Frontend moderno', 'Regras de negócio', 'Integrações e automações'],
    accent: '#9B82FF',
    accentBg: 'rgba(155,130,255,0.1)',
  },
  {
    number: '04',
    icon: Rocket,
    title: 'Implantação',
    description:
      'Configuramos o sistema para o uso real da empresa, ajustando usuários, acessos, dados iniciais e fluxos operacionais.',
    points: ['Configuração inicial', 'Ajustes finais', 'Preparação para operação'],
    accent: '#4DA3FF',
    accentBg: 'rgba(77,163,255,0.1)',
  },
  {
    number: '05',
    icon: RefreshCw,
    title: 'Evolução',
    description:
      'Depois da entrega, o sistema pode continuar evoluindo com melhorias, novos módulos, automações e integrações.',
    points: ['Melhorias contínuas', 'Novos módulos', 'Suporte e evolução'],
    accent: '#7B5CFF',
    accentBg: 'rgba(123,92,255,0.1)',
  },
]

function StepCard({ step, index, inView }: { step: typeof steps[0]; index: number; inView: boolean }) {
  const [hov, setHov] = useState(false)
  const Icon = step.icon
  const isEven = index % 2 === 0

  return (
    <motion.div
      initial={{ opacity: 0, x: isEven ? -32 : 32 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.1 + index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      onHoverStart={() => setHov(true)}
      onHoverEnd={() => setHov(false)}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      style={{
        background: 'rgba(18,18,26,0.9)',
        border: `1px solid ${hov ? step.accent + '35' : 'rgba(255,255,255,0.08)'}`,
        borderRadius: '16px',
        padding: '1.6rem',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: hov ? `0 0 32px ${step.accent}12` : 'none',
        transition: 'border-color 0.25s, box-shadow 0.25s',
      }}
    >
      {/* Corner glow */}
      <div aria-hidden="true" style={{
        position: 'absolute', bottom: '-20px', right: '-20px',
        width: '100px', height: '100px', borderRadius: '50%',
        background: `radial-gradient(circle, ${step.accent}0d 0%, transparent 70%)`,
        pointerEvents: 'none',
        opacity: hov ? 2 : 1,
        transition: 'opacity 0.3s',
      }} />

      {/* Number + icon row */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
        <motion.div
          animate={{ borderColor: hov ? step.accent + '60' : step.accent + '30', boxShadow: hov ? `0 0 16px ${step.accent}30` : 'none' }}
          transition={{ duration: 0.25 }}
          style={{
            width: '42px', height: '42px', borderRadius: '50%', flexShrink: 0,
            background: step.accentBg,
            border: `2px solid ${step.accent}30`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          <span style={{
            fontFamily: '"Space Grotesk", sans-serif',
            fontSize: '0.82rem', fontWeight: 800,
            color: step.accent,
          }}>
            {step.number}
          </span>
        </motion.div>

        <div style={{
          width: '34px', height: '34px', borderRadius: '9px', flexShrink: 0,
          background: step.accentBg, border: `1px solid ${step.accent}25`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <Icon size={15} color={step.accent} />
        </div>

        <h3 style={{
          fontFamily: '"Space Grotesk", sans-serif',
          fontSize: '1rem', fontWeight: 700,
          color: '#fff', letterSpacing: '-0.01em', margin: 0,
        }}>
          {step.title}
        </h3>
      </div>

      {/* Description */}
      <p style={{
        fontSize: '0.83rem', color: 'rgba(255,255,255,0.5)',
        lineHeight: 1.72, marginBottom: '1rem',
      }}>
        {step.description}
      </p>

      {/* Points */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
        {step.points.map(pt => (
          <div key={pt} style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', fontSize: '0.78rem', color: 'rgba(255,255,255,0.45)' }}>
            <Check size={11} color={step.accent} strokeWidth={2.5} style={{ flexShrink: 0 }} />
            {pt}
          </div>
        ))}
      </div>
    </motion.div>
  )
}

export default function ProcessSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section id="processo" ref={ref} style={{ padding: '6rem 1.5rem', position: 'relative' }}>
      {/* Subtle bg */}
      <div aria-hidden="true" style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'linear-gradient(135deg, rgba(123,92,255,0.03) 0%, transparent 50%, rgba(77,163,255,0.03) 100%)',
      }} />

      <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative' }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: '4rem' }}
        >
          <div style={{
            display: 'inline-flex', alignItems: 'center',
            background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '100px', padding: '0.3rem 0.9rem',
            fontSize: '0.72rem', fontWeight: 700,
            color: 'rgba(255,255,255,0.4)', letterSpacing: '0.08em',
            textTransform: 'uppercase', marginBottom: '1.25rem',
          }}>
            Processo
          </div>

          <h2 style={{
            fontFamily: '"Space Grotesk", sans-serif',
            fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
            fontWeight: 700, color: '#fff',
            letterSpacing: '-0.025em', marginBottom: '1rem',
          }}>
            Do diagnóstico à implantação,{' '}
            <span className="gradient-text">sem improviso</span>
          </h2>

          <p style={{
            fontSize: '1rem', color: 'rgba(255,255,255,0.5)',
            maxWidth: '580px', margin: '0 auto', lineHeight: 1.75,
          }}>
            Cada projeto é conduzido com clareza, estratégia e foco em resultado. Antes de desenvolver,
            entendemos o problema, desenhamos a solução e criamos uma experiência pronta para uso real.
          </p>
        </motion.div>

        {/* Timeline — desktop: 2 col zigzag + center line | mobile: single col */}
        <div style={{ position: 'relative' }}>

          {/* Center connecting line (desktop only) */}
          <div className="proc-line" aria-hidden="true" style={{
            position: 'absolute', left: '50%', top: 0, bottom: 0,
            width: '1px', transform: 'translateX(-50%)', zIndex: 0, pointerEvents: 'none',
          }}>
            <motion.div
              initial={{ scaleY: 0 }}
              animate={inView ? { scaleY: 1 } : {}}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              style={{
                width: '100%', height: '100%',
                background: 'linear-gradient(180deg, transparent 0%, rgba(123,92,255,0.3) 8%, rgba(123,92,255,0.25) 85%, transparent 100%)',
                transformOrigin: 'top',
              }}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', position: 'relative', zIndex: 1 }}>
            {steps.map((step, i) => {
              const isEven = i % 2 === 0
              return (
                <div
                  key={step.number}
                  className="proc-row"
                  style={{ display: 'grid', gridTemplateColumns: '1fr 64px 1fr', gap: '1.25rem', alignItems: 'center' }}
                >
                  {/* Left slot */}
                  {isEven
                    ? <StepCard step={step} index={i} inView={inView} />
                    : <div />
                  }

                  {/* Center node */}
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={inView ? { scale: 1, opacity: 1 } : {}}
                      transition={{ duration: 0.4, delay: 0.15 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                      style={{
                        width: '14px', height: '14px', borderRadius: '50%',
                        background: step.accent,
                        boxShadow: `0 0 12px ${step.accent}60`,
                        flexShrink: 0,
                      }}
                    />
                  </div>

                  {/* Right slot */}
                  {!isEven
                    ? <StepCard step={step} index={i} inView={inView} />
                    : <div />
                  }
                </div>
              )
            })}
          </div>
        </div>

        {/* Bottom CTA block */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.6 }}
          style={{
            marginTop: '4rem',
            background: 'rgba(18,18,26,0.9)',
            border: '1px solid rgba(123,92,255,0.18)',
            borderRadius: '20px',
            padding: 'clamp(1.75rem, 4vw, 2.5rem)',
            position: 'relative', overflow: 'hidden',
            textAlign: 'center',
          }}
        >
          {/* Top line */}
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, height: '1px',
            background: 'linear-gradient(90deg, transparent, rgba(123,92,255,0.4), rgba(77,163,255,0.4), transparent)',
          }} />
          {/* Inner glow */}
          <div aria-hidden="true" style={{
            position: 'absolute', top: '-40px', left: '50%', transform: 'translateX(-50%)',
            width: '300px', height: '120px',
            background: 'radial-gradient(ellipse, rgba(123,92,255,0.1) 0%, transparent 70%)',
            pointerEvents: 'none',
          }} />

          <h3 style={{
            fontFamily: '"Space Grotesk", sans-serif',
            fontSize: 'clamp(1.2rem, 3vw, 1.6rem)',
            fontWeight: 700, color: '#fff',
            letterSpacing: '-0.02em', marginBottom: '0.75rem',
          }}>
            Você não precisa chegar com tudo pronto.
          </h3>

          <p style={{
            fontSize: '0.95rem', color: 'rgba(255,255,255,0.5)',
            maxWidth: '520px', margin: '0 auto 1.75rem', lineHeight: 1.75,
          }}>
            Se você tem apenas uma ideia, uma dor operacional ou um processo confuso, a Nexus Labs
            ajuda a transformar isso em uma solução clara, visual e funcional.
          </p>

          <a
            href={WA_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
            style={{
              textDecoration: 'none',
              display: 'inline-flex', alignItems: 'center',
              gap: '0.5rem', fontSize: '0.9rem', padding: '0.8rem 1.75rem',
            }}
          >
            Começar com um diagnóstico <ArrowRight size={15} />
          </a>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .proc-line { display: none !important; }
          .proc-row {
            display: flex !important;
            flex-direction: column !important;
            gap: 0.75rem !important;
          }
          .proc-row > div:empty { display: none !important; }
          .proc-row > div[style*="justify-content: center"] { display: none !important; }
          .proc-row > div[style*="justify-content:center"] { display: none !important; }
        }
        @media (min-width: 769px) {
          .proc-row > div:empty { visibility: hidden; }
        }
      `}</style>
    </section>
  )
}
