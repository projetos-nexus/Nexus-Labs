import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Layers, Bot, Zap } from 'lucide-react'

const services = [
  {
    icon: Layers,
    color: '#7B5CFF',
    colorBg: 'rgba(123,92,255,0.1)',
    colorBorder: 'rgba(123,92,255,0.2)',
    title: 'Sistemas sob medida',
    description:
      'Plataformas criadas para o fluxo real da sua empresa, com permissões, dashboards, relatórios e experiência premium. Sem adaptar a operação a um sistema genérico.',
    features: ['Dashboards executivos', 'Permissões por perfil', 'Relatórios e exportações'],
  },
  {
    icon: Zap,
    color: '#4DA3FF',
    colorBg: 'rgba(77,163,255,0.1)',
    colorBorder: 'rgba(77,163,255,0.2)',
    title: 'Automações inteligentes',
    description:
      'Rotinas manuais transformadas em fluxos automáticos para reduzir erros, ganhar velocidade e liberar o time para o que realmente gera resultado.',
    features: ['Fluxos via WhatsApp', 'Integração com APIs', 'Notificações automáticas'],
  },
  {
    icon: Bot,
    color: '#9B82FF',
    colorBg: 'rgba(155,130,255,0.1)',
    colorBorder: 'rgba(155,130,255,0.2)',
    title: 'IA integrada ao negócio',
    description:
      'Agentes inteligentes conectados aos processos da empresa para apoiar atendimento, análise, notificações e tomada de decisão com contexto real da operação.',
    features: ['Agentes de atendimento', 'Análise de dados', 'Decisão assistida por IA'],
  },
]

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  }),
}

export default function ServicesSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      id="servicos"
      ref={ref}
      style={{ padding: '6rem 1.5rem', position: 'relative' }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
          style={{ textAlign: 'center', marginBottom: '4rem' }}
        >
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '100px',
            padding: '0.3rem 0.9rem',
            fontSize: '0.75rem',
            fontWeight: 600,
            color: 'rgba(255,255,255,0.4)',
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            marginBottom: '1.25rem',
          }}>
            O que fazemos
          </div>
          <h2 style={{
            fontFamily: '"Space Grotesk", sans-serif',
            fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
            fontWeight: 700,
            color: '#fff',
            letterSpacing: '-0.025em',
            marginBottom: '1rem',
          }}>
            Três pilares para <span className="gradient-text">operar com mais controle</span>
          </h2>
          <p style={{
            fontSize: '1rem',
            color: 'rgba(255,255,255,0.5)',
            maxWidth: '520px',
            margin: '0 auto',
            lineHeight: 1.7,
          }}>
            Sistemas, automações e agentes inteligentes para empresas que precisam de mais organização, velocidade e resultado.
          </p>
        </motion.div>

        {/* Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '1.25rem',
        }}>
          {services.map((svc, i) => {
            const Icon = svc.icon
            return (
              <motion.div
                key={svc.title}
                variants={cardVariants}
                initial="hidden"
                animate={inView ? 'show' : 'hidden'}
                custom={i}
                whileHover={{ y: -6, transition: { duration: 0.25 } }}
                style={{
                  background: 'rgba(18,18,26,0.8)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: '16px',
                  padding: '2rem',
                  position: 'relative',
                  overflow: 'hidden',
                  cursor: 'default',
                  transition: 'border-color 0.3s, box-shadow 0.3s',
                }}
                onHoverStart={e => {
                  const el = e.target as HTMLElement
                  el.style.borderColor = svc.colorBorder
                  el.style.boxShadow = `0 20px 60px ${svc.colorBg}`
                }}
                onHoverEnd={e => {
                  const el = e.target as HTMLElement
                  el.style.borderColor = 'rgba(255,255,255,0.08)'
                  el.style.boxShadow = 'none'
                }}
              >
                {/* Top glow */}
                <div style={{
                  position: 'absolute',
                  top: 0, left: 0, right: 0,
                  height: '1px',
                  background: `linear-gradient(90deg, transparent, ${svc.color}40, transparent)`,
                }} />

                {/* Icon */}
                <div style={{
                  width: '48px', height: '48px',
                  borderRadius: '12px',
                  background: svc.colorBg,
                  border: `1px solid ${svc.colorBorder}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginBottom: '1.5rem',
                }}>
                  <Icon size={22} color={svc.color} strokeWidth={1.8} />
                </div>

                <h3 style={{
                  fontFamily: '"Space Grotesk", sans-serif',
                  fontSize: '1.15rem',
                  fontWeight: 700,
                  color: '#fff',
                  marginBottom: '0.75rem',
                  letterSpacing: '-0.01em',
                }}>
                  {svc.title}
                </h3>

                <p style={{
                  fontSize: '0.88rem',
                  color: 'rgba(255,255,255,0.55)',
                  lineHeight: 1.75,
                  marginBottom: '1.5rem',
                }}>
                  {svc.description}
                </p>

                {/* Feature list */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {svc.features.map((feat) => (
                    <div key={feat} style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      fontSize: '0.82rem',
                      color: 'rgba(255,255,255,0.45)',
                    }}>
                      <div style={{
                        width: '5px', height: '5px',
                        borderRadius: '50%',
                        background: svc.color,
                        flexShrink: 0,
                      }} />
                      {feat}
                    </div>
                  ))}
                </div>

                {/* Background corner glow */}
                <div style={{
                  position: 'absolute',
                  bottom: '-40px',
                  right: '-40px',
                  width: '160px',
                  height: '160px',
                  borderRadius: '50%',
                  background: `radial-gradient(circle, ${svc.color}0A 0%, transparent 70%)`,
                  pointerEvents: 'none',
                }} />
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
