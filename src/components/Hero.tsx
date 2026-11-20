import { motion } from 'framer-motion'
import { ArrowRight, ChevronRight, Sparkles } from 'lucide-react'
import InteractiveDashboardMockup from './InteractiveDashboardMockup'
import { WA_URLS } from '../config/contact'

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  }),
}

const stats = [
  { value: '98%', label: 'Satisfação dos clientes' },
  { value: '3×', label: 'Mais velocidade operacional' },
  { value: '40+', label: 'Projetos entregues' },
]

export default function Hero() {
  return (
    <section
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        padding: 'clamp(100px, 14vw, 140px) clamp(1rem, 4vw, 1.5rem) clamp(60px, 8vw, 80px)',
      }}
    >
      {/* Background orbs */}
      <div aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        {/* Purple orb - top left */}
        <div style={{
          position: 'absolute',
          top: '-10%',
          left: '-5%',
          width: '700px',
          height: '700px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, color-mix(in srgb, var(--color-roxo) 18%, transparent) 0%, color-mix(in srgb, var(--color-roxo) 4%, transparent) 50%, transparent 70%)',
          filter: 'blur(40px)',
        }} />
        {/* Blue orb - bottom right */}
        <div style={{
          position: 'absolute',
          bottom: '-15%',
          right: '-10%',
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, color-mix(in srgb, var(--color-lilas-mid) 14%, transparent) 0%, color-mix(in srgb, var(--color-lilas-mid) 3%, transparent) 50%, transparent 70%)',
          filter: 'blur(40px)',
        }} />
        {/* Grid overlay */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(color-mix(in srgb, var(--color-text) 2.5%, transparent) 1px, transparent 1px),
            linear-gradient(90deg, color-mix(in srgb, var(--color-text) 2.5%, transparent) 1px, transparent 1px)
          `,
          backgroundSize: '64px 64px',
          maskImage: 'radial-gradient(ellipse 80% 60% at 50% 50%, var(--color-bg) 40%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 60% at 50% 50%, var(--color-bg) 40%, transparent 100%)',
        }} />
        {/* Center glow line */}
        <div style={{
          position: 'absolute',
          top: '42%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '600px',
          height: '1px',
          background: 'linear-gradient(90deg, transparent, color-mix(in srgb, var(--color-roxo) 40%, transparent), transparent)',
        }} />
      </div>

      <div style={{ maxWidth: '860px', width: '100%', textAlign: 'center', position: 'relative', zIndex: 1, minWidth: 0 }}>
        {/* Badge */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={0}
          style={{ display: 'inline-flex', alignItems: 'center', marginBottom: '2rem' }}
        >
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            background: 'color-mix(in srgb, var(--color-roxo) 10%, transparent)',
            border: '1px solid color-mix(in srgb, var(--color-roxo) 25%, transparent)',
            borderRadius: '100px',
            padding: '0.35rem 1rem',
            fontSize: '0.8rem',
            fontWeight: 600,
            color: 'var(--color-lilas)',
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
          }}>
            <Sparkles size={13} />
            Sistemas com IA integrada
          </div>
        </motion.div>

        {/* Headline */}
        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={1}
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2.6rem, 6vw, 5rem)',
            fontWeight: 800,
            lineHeight: 1.08,
            letterSpacing: '-0.03em',
            color: 'var(--color-text)',
            marginBottom: '1.5rem',
          }}
        >
          Sistemas premium para empresas que querem{' '}
          <span className="gradient-text">operar no próximo nível</span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={2}
          style={{
            fontSize: 'clamp(1rem, 2vw, 1.2rem)',
            color: 'var(--color-text-muted)',
            lineHeight: 1.7,
            maxWidth: '600px',
            margin: '0 auto 2.5rem',
          }}
        >
          A Nexus Labs cria plataformas, automações e agentes inteligentes para transformar
          processos manuais em{' '}
          <span style={{ color: 'var(--color-text)', fontWeight: 500 }}>
            controle, velocidade e resultado.
          </span>
        </motion.p>

        {/* CTAs */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={3}
          className="hero-ctas"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1rem',
            flexWrap: 'wrap',
            marginBottom: '4rem',
          }}
        >
          <a
            href={WA_URLS.heroPrimary}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              textDecoration: 'none',
              fontSize: '0.95rem',
              padding: '0.85rem 2rem',
            }}
          >
            Quero meu sistema premium
            <ArrowRight size={16} />
          </a>
          <a
            href="#projetos"
            className="btn-secondary"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              textDecoration: 'none',
              fontSize: '0.95rem',
            }}
          >
            Ver projetos prontos
            <ChevronRight size={15} />
          </a>
        </motion.div>

        {/* Stats */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={4}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0',
            flexWrap: 'wrap',
          }}
        >
          {stats.map((stat, i) => (
            <div key={stat.label} style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{
                textAlign: 'center',
                padding: '0 2rem',
                borderRight: i < stats.length - 1 ? '1px solid color-mix(in srgb, var(--color-text) 10%, transparent)' : 'none',
              }}>
                <div style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.8rem',
                  fontWeight: 700,
                  color: 'var(--color-text)',
                  letterSpacing: '-0.02em',
                  lineHeight: 1,
                  marginBottom: '0.3rem',
                }}>
                  {stat.value}
                </div>
                <div style={{
                  fontSize: '0.78rem',
                  color: 'var(--color-text-muted)',
                  fontWeight: 400,
                  letterSpacing: '0.01em',
                }}>
                  {stat.label}
                </div>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Interactive Dashboard Mockup */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={5}
          style={{ marginTop: 'clamp(3rem, 6vw, 5rem)' }}
        >
          <InteractiveDashboardMockup />
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .hero-ctas {
            flex-direction: column !important;
            align-items: stretch !important;
          }
          .hero-ctas a {
            justify-content: center !important;
            width: 100% !important;
          }
        }
      `}</style>
    </section>
  )
}
