import { useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Check, AlertCircle, Users, Puzzle, Clock, FileText, MessageCircle, ArrowUpRight } from 'lucide-react'
import type { Project } from '../data/projects'
import { WA_URLS } from '../config/contact'

const statusStyle: Record<string, { color: string; bg: string; border: string }> = {
  'Projeto pronto': { color: '#4ADE80', bg: 'rgba(74,222,128,0.1)', border: 'rgba(74,222,128,0.2)' },
  Adaptável: { color: '#4DA3FF', bg: 'rgba(77,163,255,0.1)', border: 'rgba(77,163,255,0.2)' },
  'Sob medida': { color: '#9B82FF', bg: 'rgba(155,130,255,0.1)', border: 'rgba(155,130,255,0.2)' },
}

interface Props {
  project: Project | null
  isOpen: boolean
  onClose: () => void
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p style={{
      fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.08em',
      textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)',
      marginBottom: '0.75rem',
    }}>
      {children}
    </p>
  )
}

function Divider() {
  return <div style={{ height: '1px', background: 'rgba(255,255,255,0.06)', margin: '1.5rem 0' }} />
}

export default function ProjectDetailsModal({ project, isOpen, onClose }: Props) {
  const handleEsc = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') onClose()
  }, [onClose])

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleEsc)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('keydown', handleEsc)
      document.body.style.overflow = ''
    }
  }, [isOpen, handleEsc])

  if (!project) return null

  const { icon: Icon, category, title, status, description, problem, idealFor,
    includedFeatures, adaptation, modules, estimatedTime, contractType, accent, accentBg } = project
  const st = statusStyle[status]
  const wAdapt = WA_URLS.modalAdapt(title)
  const wTalk  = WA_URLS.modalTalk(title)

  const infoBlocks = [
    { icon: Puzzle, label: 'Módulos', value: modules },
    { icon: Clock, label: 'Prazo estimado', value: estimatedTime },
    { icon: FileText, label: 'Contratação', value: contractType },
  ]

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            aria-hidden="true"
            style={{
              position: 'fixed', inset: 0, zIndex: 100,
              background: 'rgba(0,0,0,0.72)',
              backdropFilter: 'blur(6px)',
              WebkitBackdropFilter: 'blur(6px)',
            }}
          />

          {/* Centering wrapper */}
          <div
            key="modal-wrapper"
            className="modal-wrapper"
            style={{
              position: 'fixed', inset: 0, zIndex: 101,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              padding: '1rem',
              pointerEvents: 'none',
            }}
          >
          {/* Modal */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={`Detalhes do projeto ${title}`}
            initial={{ opacity: 0, scale: 0.96, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            style={{
              pointerEvents: 'auto',
              width: '100%', maxWidth: '760px',
              maxHeight: '90vh',
              display: 'flex', flexDirection: 'column',
              background: '#12121A',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '20px',
              boxShadow: `0 0 80px rgba(0,0,0,0.6), 0 0 40px ${accent}18`,
              overflow: 'hidden',
            }}
            className="project-modal"
          >
            {/* Top accent */}
            <div style={{
              height: '2px', flexShrink: 0,
              background: `linear-gradient(90deg, ${accent}, #4DA3FF)`,
            }} />

            {/* Header */}
            <div style={{
              padding: '1.75rem 2rem 1.25rem',
              borderBottom: '1px solid rgba(255,255,255,0.07)',
              flexShrink: 0,
            }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{
                    width: '48px', height: '48px', borderRadius: '12px', flexShrink: 0,
                    background: accentBg, border: `1px solid ${accent}35`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <Icon size={22} color={accent} />
                  </div>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.3rem', flexWrap: 'wrap' }}>
                      <span style={{
                        fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.07em',
                        textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)',
                      }}>
                        {category}
                      </span>
                      <span style={{
                        fontSize: '0.68rem', fontWeight: 600, color: st.color,
                        background: st.bg, border: `1px solid ${st.border}`,
                        padding: '0.15rem 0.5rem', borderRadius: '5px',
                      }}>
                        {status}
                      </span>
                    </div>
                    <h2 style={{
                      fontFamily: '"Space Grotesk", sans-serif',
                      fontSize: '1.4rem', fontWeight: 800,
                      color: '#fff', letterSpacing: '-0.02em', margin: 0,
                    }}>
                      {title}
                    </h2>
                  </div>
                </div>

                <button
                  onClick={onClose}
                  aria-label="Fechar modal"
                  style={{
                    flexShrink: 0, width: '36px', height: '36px',
                    borderRadius: '9px', border: '1px solid rgba(255,255,255,0.1)',
                    background: 'rgba(255,255,255,0.05)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    cursor: 'pointer', color: 'rgba(255,255,255,0.5)',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.1)'
                    e.currentTarget.style.color = '#fff'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.05)'
                    e.currentTarget.style.color = 'rgba(255,255,255,0.5)'
                  }}
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Scrollable body */}
            <div style={{ overflowY: 'auto', flex: 1, padding: '1.75rem 2rem' }}>

              {/* Description */}
              <p style={{
                fontSize: '0.92rem', color: 'rgba(255,255,255,0.6)',
                lineHeight: 1.75, marginBottom: '1.5rem',
              }}>
                {description}
              </p>

              {/* Info blocks */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem', marginBottom: '1.5rem' }} className="modal-info-grid">
                {infoBlocks.map(b => (
                  <div key={b.label} style={{
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.07)',
                    borderRadius: '10px', padding: '0.9rem 1rem',
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.4rem' }}>
                      <b.icon size={13} color="rgba(255,255,255,0.3)" />
                      <span style={{ fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)' }}>
                        {b.label}
                      </span>
                    </div>
                    <p style={{
                      fontFamily: '"Space Grotesk", sans-serif',
                      fontSize: '0.9rem', fontWeight: 700, color: '#fff', margin: 0,
                    }}>
                      {b.value}
                    </p>
                  </div>
                ))}
              </div>

              <Divider />

              {/* Problem */}
              <div style={{ marginBottom: '1.5rem' }}>
                <SectionLabel>O que esse projeto resolve</SectionLabel>
                <div style={{
                  display: 'flex', gap: '0.75rem', alignItems: 'flex-start',
                  background: 'rgba(255,255,255,0.025)',
                  border: '1px solid rgba(255,255,255,0.07)',
                  borderRadius: '10px', padding: '1rem 1.1rem',
                }}>
                  <AlertCircle size={15} color={accent} style={{ flexShrink: 0, marginTop: '2px' }} />
                  <p style={{ fontSize: '0.86rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.7, margin: 0 }}>
                    {problem}
                  </p>
                </div>
              </div>

              {/* Ideal for */}
              <div style={{ marginBottom: '1.5rem' }}>
                <SectionLabel>Ideal para</SectionLabel>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
                  {idealFor.map(item => (
                    <div key={item} style={{ display: 'flex', alignItems: 'center', gap: '0.55rem', fontSize: '0.84rem', color: 'rgba(255,255,255,0.6)' }}>
                      <Users size={12} color={accent} style={{ flexShrink: 0 }} />
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              <Divider />

              {/* Included features */}
              <div style={{ marginBottom: '1.5rem' }}>
                <SectionLabel>Funcionalidades incluídas</SectionLabel>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.45rem' }} className="modal-features-grid">
                  {includedFeatures.map(f => (
                    <div key={f} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.83rem', color: 'rgba(255,255,255,0.55)' }}>
                      <Check size={12} color={accent} strokeWidth={2.5} style={{ flexShrink: 0 }} />
                      {f}
                    </div>
                  ))}
                </div>
              </div>

              <Divider />

              {/* Adaptation */}
              <div>
                <SectionLabel>Como pode ser adaptado</SectionLabel>
                <p style={{ fontSize: '0.86rem', color: 'rgba(255,255,255,0.55)', lineHeight: 1.75, margin: 0 }}>
                  {adaptation}
                </p>
              </div>
            </div>

            {/* Footer CTA */}
            <div className="modal-footer-ctas" style={{
              padding: '1.25rem 2rem 1.5rem',
              borderTop: '1px solid rgba(255,255,255,0.07)',
              flexShrink: 0,
              display: 'flex', gap: '0.75rem', flexWrap: 'wrap',
              background: 'rgba(0,0,0,0.2)',
            }}>
              <a
                href={wAdapt}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
                style={{
                  textDecoration: 'none', flex: 1, minWidth: '180px',
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  gap: '0.4rem', fontSize: '0.88rem',
                }}
              >
                Quero adaptar este projeto <ArrowUpRight size={14} />
              </a>
              <a
                href={wTalk}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  flex: 1, minWidth: '160px',
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  gap: '0.45rem', fontSize: '0.88rem', fontWeight: 500,
                  padding: '0.75rem 1.5rem', borderRadius: '10px',
                  textDecoration: 'none', color: 'rgba(255,255,255,0.75)',
                  border: '1px solid rgba(255,255,255,0.14)',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.05)'
                  e.currentTarget.style.color = '#fff'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = 'transparent'
                  e.currentTarget.style.color = 'rgba(255,255,255,0.75)'
                }}
              >
                <MessageCircle size={15} /> Falar no WhatsApp
              </a>
            </div>
          </motion.div>
          </div>

          <style>{`
            @media (max-width: 640px) {
              .modal-wrapper {
                align-items: flex-end !important;
                padding: 0 !important;
              }
              .project-modal {
                max-height: 92vh !important;
                border-radius: 20px 20px 0 0 !important;
                max-width: 100% !important;
              }
              .modal-info-grid {
                grid-template-columns: 1fr !important;
              }
              .modal-features-grid {
                grid-template-columns: 1fr !important;
              }
              .modal-footer-ctas {
                flex-direction: column !important;
              }
              .modal-footer-ctas a {
                width: 100% !important;
                justify-content: center !important;
                min-width: unset !important;
              }
            }
          `}</style>
        </>
      )}
    </AnimatePresence>
  )
}
