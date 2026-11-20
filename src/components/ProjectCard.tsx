import { motion } from 'framer-motion'
import { Check, ArrowUpRight, ShoppingCart } from 'lucide-react'
import type { Project } from '../data/projects'
import { WA_URLS } from '../config/contact'

const statusStyle: Record<string, { color: string; bg: string; border: string }> = {
  'Projeto pronto': { color: 'var(--color-lilas)', bg: 'color-mix(in srgb, var(--color-lilas) 10%, transparent)', border: 'color-mix(in srgb, var(--color-lilas) 20%, transparent)' },
  Adaptável: { color: 'var(--color-lilas-mid)', bg: 'color-mix(in srgb, var(--color-lilas-mid) 10%, transparent)', border: 'color-mix(in srgb, var(--color-lilas-mid) 20%, transparent)' },
  'Sob medida': { color: 'var(--color-lilas)', bg: 'color-mix(in srgb, var(--color-lilas) 10%, transparent)', border: 'color-mix(in srgb, var(--color-lilas) 20%, transparent)' },
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
          background: 'color-mix(in srgb, var(--color-surface) 95%, transparent)',
          border: '1px solid color-mix(in srgb, var(--color-roxo) 28%, transparent)',
          borderRadius: '20px',
          padding: '2.5rem',
          position: 'relative',
          overflow: 'hidden',
          boxShadow: '0 0 48px color-mix(in srgb, var(--color-roxo) 8%, transparent)',
        }}
        className="project-card-featured"
      >
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(90deg, var(--color-roxo), var(--color-lilas-mid))' }} />
        <div aria-hidden="true" style={{
          position: 'absolute', top: '50%', right: '-80px',
          width: '320px', height: '320px', borderRadius: '50%',
          background: 'radial-gradient(circle, color-mix(in srgb, var(--color-roxo) 10%, transparent) 0%, transparent 70%)',
          transform: 'translateY(-50%)', pointerEvents: 'none',
        }} />

        <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '2rem', alignItems: 'start' }} className="featured-inner">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
              <div style={{
                width: '44px', height: '44px', borderRadius: '12px', flexShrink: 0,
                background: accentBg, border: `1px solid color-mix(in srgb, ${accent} 25.1%, transparent)`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Icon size={20} color={accent} />
              </div>
              <span style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--color-text-muted)' }}>
                {category}
              </span>
              <span style={{
                fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase',
                color: 'var(--color-lilas)', background: 'color-mix(in srgb, var(--color-roxo) 12%, transparent)', border: '1px solid color-mix(in srgb, var(--color-roxo) 25%, transparent)',
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
              fontFamily: 'var(--font-display)',
              fontSize: '1.7rem', fontWeight: 800, color: 'var(--color-text)',
              letterSpacing: '-0.025em', marginBottom: '0.75rem',
            }}>
              {title}
            </h3>

            <p style={{ fontSize: '0.92rem', color: 'var(--color-text-muted)', lineHeight: 1.75, maxWidth: '520px', marginBottom: '1.5rem' }}>
              {description}
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem', marginBottom: '2rem' }}>
              {features.map(f => (
                <div key={f} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.83rem', color: 'var(--color-text-muted)' }}>
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
                  color: 'var(--color-text)', border: '1px solid color-mix(in srgb, var(--color-text) 14%, transparent)',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = 'color-mix(in srgb, var(--color-text) 5%, transparent)'; e.currentTarget.style.color = 'var(--color-text)' }}
                onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--color-text)' }}
              >
                <ShoppingCart size={14} /> Comprar ou adaptar
              </a>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', minWidth: '170px' }} className="featured-stats">
            {[
              { label: 'Status atual', value: 'Produção', color: 'var(--color-lilas)' },
              { label: 'Módulos ativos', value: '6+', color: 'var(--color-roxo)' },
              { label: 'Implantação', value: '≤ 30 dias', color: 'var(--color-lilas-mid)' },
            ].map(s => (
              <div key={s.label} style={{
                background: 'color-mix(in srgb, var(--color-text) 3%, transparent)', border: '1px solid color-mix(in srgb, var(--color-text) 7%, transparent)',
                borderRadius: '10px', padding: '0.75rem 1rem',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem',
              }}>
                <span style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)' }}>{s.label}</span>
                <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.95rem', color: s.color }}>{s.value}</span>
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
        background: 'color-mix(in srgb, var(--color-surface) 80%, transparent)',
        border: '1px solid color-mix(in srgb, var(--color-text) 8%, transparent)',
        borderRadius: '16px', padding: '1.75rem',
        position: 'relative', overflow: 'hidden',
        display: 'flex', flexDirection: 'column',
      }}
      className="project-card"
    >
      <div aria-hidden="true" style={{
        position: 'absolute', bottom: '-40px', right: '-40px',
        width: '150px', height: '150px', borderRadius: '50%',
        background: `radial-gradient(circle, color-mix(in srgb, ${accent} 5.1%, transparent) 0%, transparent 70%)`,
        pointerEvents: 'none',
      }} />

      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1.1rem' }}>
        <div style={{
          width: '40px', height: '40px', borderRadius: '10px', flexShrink: 0,
          background: accentBg, border: `1px solid color-mix(in srgb, ${accent} 18.8%, transparent)`,
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

      <span style={{ fontSize: '0.68rem', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--color-text-muted)', marginBottom: '0.4rem', display: 'block' }}>
        {category}
      </span>

      <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.08rem', fontWeight: 700, color: 'var(--color-text)', letterSpacing: '-0.01em', marginBottom: '0.65rem' }}>
        {title}
      </h3>

      <p style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)', lineHeight: 1.7, marginBottom: '1.1rem', flex: 1 }}>
        {description}
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.38rem', marginBottom: '1.4rem' }}>
        {features.map(f => (
          <div key={f} style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', fontSize: '0.77rem', color: 'var(--color-text-muted)' }}>
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
            borderRadius: '8px', color: 'var(--color-text)',
            border: '1px solid color-mix(in srgb, var(--color-text) 12%, transparent)', background: 'transparent',
            transition: 'all 0.2s',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = 'color-mix(in srgb, var(--color-text) 5%, transparent)'; e.currentTarget.style.color = 'var(--color-text)' }}
          onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--color-text)' }}
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
            color: 'var(--color-text)', background: accentBg, border: `1px solid color-mix(in srgb, ${accent} 18.8%, transparent)`,
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
