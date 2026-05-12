import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowRight, MessageCircle, Search, Layout, Rocket, ChevronRight } from 'lucide-react'
import { createWhatsAppUrl } from '../config/contact'

const WA_PRIMARY = createWhatsAppUrl(
  'Olá, quero criar um sistema premium com a Nexus Labs. Tenho uma dor/processo na minha empresa e gostaria de entender como podemos transformar isso em uma solução.'
)

const steps = [
  { icon: Search,  label: 'Diagnóstico',  status: 'Iniciado',     color: '#7B5CFF' },
  { icon: Layout,  label: 'Protótipo',    status: 'Validado',     color: '#4DA3FF' },
  { icon: Rocket,  label: 'Implantação',  status: 'Em andamento', color: '#4ADE80' },
]

export default function CTASection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section
      id="cta"
      ref={ref}
      style={{ padding: '6rem 1.5rem', position: 'relative', overflow: 'hidden' }}
    >
      {/* Background orbs */}
      <div aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        <div style={{
          position: 'absolute', top: '30%', left: '-5%',
          width: '600px', height: '600px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(123,92,255,0.12) 0%, transparent 65%)',
          filter: 'blur(60px)',
        }} />
        <div style={{
          position: 'absolute', bottom: '10%', right: '-5%',
          width: '500px', height: '500px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(77,163,255,0.09) 0%, transparent 65%)',
          filter: 'blur(60px)',
        }} />
        {/* Grid overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)
          `,
          backgroundSize: '64px 64px',
          maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%)',
        }} />
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{
            background: 'rgba(15,15,22,0.95)',
            border: '1px solid rgba(255,255,255,0.09)',
            borderRadius: '24px',
            overflow: 'hidden',
            boxShadow: '0 0 0 1px rgba(123,92,255,0.08), 0 32px 80px rgba(0,0,0,0.5)',
          }}
        >
          {/* Top accent */}
          <div style={{
            height: '2px',
            background: 'linear-gradient(90deg, transparent 0%, #7B5CFF 30%, #4DA3FF 70%, transparent 100%)',
          }} />

          <div style={{ padding: 'clamp(2rem, 5vw, 3.5rem)', display: 'grid', gap: '3rem', alignItems: 'center' }} className="cta-inner">

            {/* Left — text + actions */}
            <div>
              {/* Microcopy */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.45, delay: 0.1 }}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
                  background: 'rgba(123,92,255,0.1)', border: '1px solid rgba(123,92,255,0.25)',
                  borderRadius: '100px', padding: '0.3rem 0.9rem',
                  fontSize: '0.72rem', fontWeight: 700,
                  color: '#9B82FF', letterSpacing: '0.07em', textTransform: 'uppercase',
                  marginBottom: '1.5rem',
                }}
              >
                Próximo passo
              </motion.div>

              <h2 style={{
                fontFamily: '"Space Grotesk", sans-serif',
                fontSize: 'clamp(1.7rem, 3.5vw, 2.6rem)',
                fontWeight: 800, color: '#fff',
                letterSpacing: '-0.03em', lineHeight: 1.1,
                marginBottom: '1.1rem',
              }}>
                Vamos transformar uma dor da sua empresa em um{' '}
                <span className="gradient-text">sistema premium?</span>
              </h2>

              <p style={{
                fontSize: '0.97rem', color: 'rgba(255,255,255,0.52)',
                lineHeight: 1.78, marginBottom: '2rem',
                maxWidth: '520px',
              }}>
                Se sua operação ainda depende de planilhas, controles manuais, mensagens soltas ou sistemas
                que não acompanham o crescimento do negócio, a Nexus Labs pode criar a solução certa para
                organizar, automatizar e escalar seus processos.
              </p>

              {/* Buttons */}
              <div className="cta-buttons" style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
                <motion.a
                  href={WA_PRIMARY}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  style={{
                    textDecoration: 'none',
                    display: 'inline-flex', alignItems: 'center',
                    gap: '0.5rem', fontSize: '0.92rem', padding: '0.85rem 1.75rem',
                  }}
                >
                  <MessageCircle size={16} />
                  Quero meu sistema premium
                  <ArrowRight size={15} />
                </motion.a>

                <motion.a
                  href="#projetos"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
                    fontSize: '0.9rem', fontWeight: 500,
                    padding: '0.85rem 1.6rem', borderRadius: '10px',
                    textDecoration: 'none', color: 'rgba(255,255,255,0.7)',
                    border: '1px solid rgba(255,255,255,0.14)',
                    transition: 'all 0.2s',
                  }}
                  onHoverStart={e => {
                    const el = e.target as HTMLElement
                    el.style.background = 'rgba(255,255,255,0.05)'
                    el.style.color = '#fff'
                  }}
                  onHoverEnd={e => {
                    const el = e.target as HTMLElement
                    el.style.background = 'transparent'
                    el.style.color = 'rgba(255,255,255,0.7)'
                  }}
                >
                  Ver projetos prontos <ChevronRight size={15} />
                </motion.a>
              </div>

              {/* Trust microcopy */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                {['Resposta rápida', 'Diagnóstico inicial', 'Sem compromisso'].map((item, i) => (
                  <span key={item} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                    {i > 0 && <span style={{ color: 'rgba(255,255,255,0.15)', fontSize: '0.75rem' }}>•</span>}
                    <span style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.3)', fontWeight: 400 }}>
                      {item}
                    </span>
                  </span>
                ))}
              </div>
            </div>

            {/* Right — process visual */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }} className="cta-visual">
              {/* Label */}
              <div style={{ marginBottom: '0.25rem' }}>
                <span style={{
                  fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.07em',
                  color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase',
                }}>
                  Projeto em andamento
                </span>
              </div>

              {steps.map((step, i) => {
                const Icon = step.icon
                return (
                  <motion.div
                    key={step.label}
                    initial={{ opacity: 0, x: 20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.3 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                    style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                      background: 'rgba(255,255,255,0.03)',
                      border: `1px solid ${step.color}22`,
                      borderRadius: '12px', padding: '0.9rem 1.1rem',
                      gap: '1rem',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.7rem' }}>
                      <div style={{
                        width: '34px', height: '34px', borderRadius: '9px', flexShrink: 0,
                        background: `${step.color}15`, border: `1px solid ${step.color}30`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}>
                        <Icon size={15} color={step.color} />
                      </div>
                      <span style={{
                        fontFamily: '"Space Grotesk", sans-serif',
                        fontSize: '0.88rem', fontWeight: 600, color: '#fff',
                      }}>
                        {step.label}
                      </span>
                    </div>
                    <div style={{
                      display: 'flex', alignItems: 'center', gap: '0.35rem',
                      fontSize: '0.65rem', fontWeight: 600, color: step.color,
                      background: `${step.color}12`, border: `1px solid ${step.color}25`,
                      borderRadius: '5px', padding: '0.2rem 0.55rem', whiteSpace: 'nowrap', flexShrink: 0,
                    }}>
                      <div style={{
                        width: '5px', height: '5px', borderRadius: '50%',
                        background: step.color,
                        animation: i === 2 ? 'nlPulse 2s ease-in-out infinite' : 'none',
                      }} />
                      {step.status}
                    </div>
                  </motion.div>
                )
              })}

              {/* Connector line decoration */}
              <div style={{
                marginTop: '0.25rem', padding: '0.85rem 1.1rem',
                background: 'rgba(123,92,255,0.06)',
                border: '1px solid rgba(123,92,255,0.15)',
                borderRadius: '12px',
                display: 'flex', alignItems: 'center', gap: '0.6rem',
              }}>
                <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#7B5CFF', animation: 'nlPulse 2s ease-in-out infinite', flexShrink: 0 }} />
                <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.45)', lineHeight: 1.5 }}>
                  A Nexus Labs conduz cada projeto do diagnóstico à implantação, com método e sem improviso.
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <style>{`
        .cta-inner { grid-template-columns: 1.1fr 0.9fr; }
        .cta-visual { display: flex; }
        @media (max-width: 900px) {
          .cta-inner { grid-template-columns: 1fr !important; }
          .cta-visual { order: -1; }
        }
        @media (max-width: 640px) {
          .cta-buttons {
            flex-direction: column !important;
            align-items: stretch !important;
          }
          .cta-buttons > * {
            width: 100% !important;
            justify-content: center !important;
            text-align: center !important;
          }
        }
        @keyframes nlPulse {
          0%,100% { opacity:1; box-shadow:0 0 0 0 rgba(74,222,128,0.4); }
          50%      { opacity:0.6; box-shadow:0 0 0 4px rgba(74,222,128,0); }
        }
      `}</style>
    </section>
  )
}
