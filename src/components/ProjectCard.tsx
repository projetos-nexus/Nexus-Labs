import { motion } from 'framer-motion'
import { Check, ArrowUpRight, ShoppingCart } from 'lucide-react'
import type { Project } from '../data/projects'
import { WA_URLS } from '../config/contact'

const statusStyle: Record<string, { color: string; bg: string; border: string }> = {
  'Projeto pronto': { color: '#4ADE80', bg: 'rgba(74,222,128,0.1)', border: 'rgba(74,222,128,0.2)' },
  Adaptável: { color: '#4DA3FF', bg: 'rgba(77,163,255,0.1)', border: 'rgba(77,163,255,0.2)' },
  'Sob medida': { color: '#9B82FF', bg: 'rgba(155,130,255,0.1)', border: 'rgba(155,130,255,0.2)' },
}

interface ProjectCardProps {
  project: Project
  delay?: number
  inView: boolean
  onDetails: (project: Project) => void
}

export default function ProjectCard({ project, delay = 0, inView, onDetails }: ProjectCardProps) {
  const { icon: Icon, category, title, description, features, status, featured, accent, accentBg } = project
  const st = statusStyle[status]
  const wUrl = WA_URLS.cardBuy(title)

  if (featured) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
        whileHover={{ scale: 1.01, transition: { duration: 0.2 } }}
        style={{
          gridColumn: 'span 12',
          background: 'rgba(18,18,26,0.95)',
          border: '1px solid rgba(123,92,255,0.28)',
          borderRadius: '20px',
          padding: '2.5rem',
          position: 'relative',
          overflow: 'hidden',
          boxShadow: '0 0 48px rgba(123,92,255,0.08)',
        }}
        className="project-card-featured"
      >
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(90deg, #7B5CFF, #4DA3FF)' }} />
        <div aria-hidden="true" style={{
          position: 'absolute', top: '50%', right: '-80px',
          width: '320px', height: '320px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(123,92,255,0.1) 0%, transparent 70%)',
          transform: 'translateY(-50%)', pointerEvents: 'none',
        }} />

        <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '2rem', alignItems: 'start' }} className="featured-inner">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
              <div style={{
                width: '44px', height: '44px', borderRadius: '12px', flexShrink: 0,
                background: accentBg, border: `1px solid ${accent}40`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Icon size={20} color={accent} />
              </div>
              <span style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)' }}>
                {category}
              </span>
              <span style={{
                fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase',
                color: '#9B82FF', background: 'rgba(123,92,255,0.12)', border: '1px solid rgba(123,92,255,0.25)',
                padding: '0.2rem 0.6rem', borderRadius: '6px',
              }}>
                Produto em destaque
              </span>
              <span style={{
                fontSize: '0.7rem', fontWeight: 600, color: st.color,
                background: st.bg, border: `1px solid ${st.border}`,
                padding: '0.2rem 0.6rem', borderRadius: '6px',
              }}>
                {status}
              </span>
            </div>

            <h3 style={{
              fontFamily: '"Space Grotesk", sans-serif',
              fontSize: '1.7rem', fontWeight: 800, color: '#fff',
              letterSpacing: '-0.025em', marginBottom: '0.75rem',
            }}>
              {title}
            </h3>

            <p style={{ fontSize: '0.92rem', color: 'rgba(255,255,255,0.55)', lineHeight: 1.75, maxWidth: '520px', marginBottom: '1.5rem' }}>
              {description}
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem', marginBottom: '2rem' }}>
              {features.map(f => (
                <div key={f} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.83rem', color: 'rgba(255,255,255,0.55)' }}>
                  <Check size={13} color={accent} strokeWidth={2.5} style={{ flexShrink: 0 }} />
                  {f}
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
              <button
                onClick={() => onDetails(project)}
                className="btn-primary"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem', padding: '0.65rem 1.4rem', border: 'none', cursor: 'pointer' }}
              >
                Ver detalhes <ArrowUpRight size={14} />
              </button>
              <a
                href={wUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
                  fontSize: '0.85rem', fontWeight: 500, padding: '0.65rem 1.4rem',
                  borderRadius: '10px', textDecoration: 'none',
                  color: 'rgba(255,255,255,0.75)', border: '1px solid rgba(255,255,255,0.14)',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.color = '#fff' }}
                onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'rgba(255,255,255,0.75)' }}
              >
                <ShoppingCart size={14} /> Comprar ou adaptar
              </a>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', minWidth: '170px' }} className="featured-stats">
            {[
              { label: 'Status atual', value: 'Produção', color: '#4ADE80' },
              { label: 'Módulos ativos', value: '6+', color: '#7B5CFF' },
              { label: 'Implantação', value: '≤ 30 dias', color: '#4DA3FF' },
            ].map(s => (
              <div key={s.label} style={{
                background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: '10px', padding: '0.75rem 1rem',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem',
              }}>
                <span style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.35)' }}>{s.label}</span>
                <span style={{ fontFamily: '"Space Grotesk", sans-serif', fontWeight: 700, fontSize: '0.95rem', color: s.color }}>{s.value}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
      style={{
        background: 'rgba(18,18,26,0.8)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: '16px', padding: '1.75rem',
        position: 'relative', overflow: 'hidden',
        display: 'flex', flexDirection: 'column',
      }}
      className="project-card"
    >
      <div aria-hidden="true" style={{
        position: 'absolute', bottom: '-40px', right: '-40px',
        width: '150px', height: '150px', borderRadius: '50%',
        background: `radial-gradient(circle, ${accent}0d 0%, transparent 70%)`,
        pointerEvents: 'none',
      }} />

      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1.1rem' }}>
        <div style={{
          width: '40px', height: '40px', borderRadius: '10px', flexShrink: 0,
          background: accentBg, border: `1px solid ${accent}30`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <Icon size={18} color={accent} />
        </div>
        <span style={{
          fontSize: '0.68rem', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase',
          color: st.color, background: st.bg, border: `1px solid ${st.border}`,
          padding: '0.2rem 0.55rem', borderRadius: '6px',
        }}>
          {status}
        </span>
      </div>

      <span style={{ fontSize: '0.68rem', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', marginBottom: '0.4rem', display: 'block' }}>
        {category}
      </span>

      <h3 style={{ fontFamily: '"Space Grotesk", sans-serif', fontSize: '1.08rem', fontWeight: 700, color: '#fff', letterSpacing: '-0.01em', marginBottom: '0.65rem' }}>
        {title}
      </h3>

      <p style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.48)', lineHeight: 1.7, marginBottom: '1.1rem', flex: 1 }}>
        {description}
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.38rem', marginBottom: '1.4rem' }}>
        {features.map(f => (
          <div key={f} style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', fontSize: '0.77rem', color: 'rgba(255,255,255,0.38)' }}>
            <Check size={11} color={accent} strokeWidth={2.5} style={{ flexShrink: 0 }} />
            {f}
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        <button
          onClick={() => onDetails(project)}
          style={{
            flex: 1, minWidth: '100px', cursor: 'pointer',
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '0.3rem',
            fontSize: '0.78rem', fontWeight: 600, padding: '0.55rem 0.85rem',
            borderRadius: '8px', color: 'rgba(255,255,255,0.7)',
            border: '1px solid rgba(255,255,255,0.12)', background: 'transparent',
            transition: 'all 0.2s',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.color = '#fff' }}
          onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'rgba(255,255,255,0.7)' }}
        >
          Ver detalhes <ArrowUpRight size={11} />
        </button>
        <a
          href={wUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            flex: 1, minWidth: '100px',
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '0.3rem',
            fontSize: '0.78rem', fontWeight: 600, padding: '0.55rem 0.85rem',
            borderRadius: '8px', textDecoration: 'none',
            color: accent, background: accentBg, border: `1px solid ${accent}30`,
            transition: 'all 0.2s',
          }}
          onMouseEnter={e => { e.currentTarget.style.filter = 'brightness(1.15)' }}
          onMouseLeave={e => { e.currentTarget.style.filter = 'none' }}
        >
          <ShoppingCart size={11} /> Comprar ou adaptar
        </a>
      </div>
    </motion.div>
  )
}
