import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import logoNexusLabsHorizontal from '../assets/logos/logo-nexus-labs-horizontal.svg'

const navLinks = [
  { label: 'Serviços', href: '#servicos' },
  { label: 'Projetos', href: '#projetos' },
  { label: 'Processo', href: '#processo' },
  { label: 'Diferenciais', href: '#diferenciais' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          background: scrolled ? 'color-mix(in srgb, var(--color-bg) 88%, transparent)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? '1px solid var(--color-border)' : '1px solid transparent',
          transition: 'all 0.4s ease',
        }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem' }}>
          <nav style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '68px' }}>

            {/* Logo */}
            <a href="#" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', flexShrink: 0 }}>
              <img
                src={logoNexusLabsHorizontal}
                alt="Nexus Labs"
                loading="eager"
                className="navbar-logo"
              />
            </a>

            {/* Desktop Links */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }} className="hidden-mobile">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="navbar-link"
                  style={{
                    textDecoration: 'none',
                    fontSize: '0.88rem',
                    fontWeight: 500,
                    padding: '0.5rem 0.85rem',
                    borderRadius: '8px',
                    transition: 'all 0.2s ease',
                  }}
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* CTA + Burger */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <a
                href="#cta"
                className="btn-primary hidden-mobile"
                style={{ fontSize: '0.85rem', padding: '0.6rem 1.25rem', whiteSpace: 'nowrap' }}
              >
                Quero meu sistema
              </a>

              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="show-mobile"
                aria-label={mobileOpen ? 'Fechar menu' : 'Abrir menu'}
                aria-expanded={mobileOpen}
                aria-controls={mobileOpen ? 'mobile-nav-menu' : undefined}
                style={{
                  background: 'color-mix(in srgb, var(--color-text) 6%, transparent)',
                  border: '1px solid var(--color-border-strong)',
                  borderRadius: '8px',
                  padding: '0.5rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  color: 'var(--color-text)',
                }}
              >
                {mobileOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </nav>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-nav-menu"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            style={{
              position: 'fixed',
              top: '68px',
              left: 0, right: 0,
              zIndex: 49,
              background: 'color-mix(in srgb, var(--color-bg) 97%, transparent)',
              backdropFilter: 'blur(20px)',
              borderBottom: '1px solid var(--color-border)',
              padding: '1.25rem 1.5rem 1.5rem',
            }}
          >
            {navLinks.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06 }}
                onClick={() => setMobileOpen(false)}
                style={{
                  display: 'block',
                  color: 'var(--color-text)',
                  textDecoration: 'none',
                  fontSize: '1rem',
                  fontWeight: 500,
                  padding: '0.85rem 0',
                  borderBottom: '1px solid var(--color-border)',
                }}
              >
                {link.label}
              </motion.a>
            ))}
            <a
              href="#cta"
              className="btn-primary"
              onClick={() => setMobileOpen(false)}
              style={{ display: 'block', textAlign: 'center', marginTop: '1.25rem', textDecoration: 'none' }}
            >
              Quero meu sistema premium
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .navbar-link { color: var(--color-text-muted); }
        .navbar-link:hover, .navbar-link:focus-visible {
          color: var(--color-text);
          background: color-mix(in srgb, var(--color-text) 6%, transparent);
        }
        .navbar-logo { height: 34px; width: auto; display: block; }
        @media (max-width: 767px) {
          .navbar-logo { height: 26px; }
        }
        @media (min-width: 900px) {
          .hidden-mobile { display: flex !important; }
          .show-mobile { display: none !important; }
        }
        @media (width < 900px) {
          .hidden-mobile { display: none !important; }
          .show-mobile { display: flex !important; }
        }
      `}</style>
    </>
  )
}
