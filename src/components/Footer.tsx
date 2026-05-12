import { MessageCircle, Mail, ArrowUpRight } from 'lucide-react'
import logoNexusLabsTaglineDark from '../assets/logos/logo-nexus-labs-tagline-dark.png'
import { WA_URLS } from '../config/contact'

const links = {
  produto: [
    { label: 'KMZ Nexus', href: '#projetos' },
    { label: 'Gestão Operacional', href: '#projetos' },
    { label: 'Financeiro', href: '#projetos' },
    { label: 'Help Desk', href: '#projetos' },
    { label: 'Agente Nexus', href: '#projetos' },
  ],
  empresa: [
    { label: 'Serviços', href: '#servicos' },
    { label: 'Processo', href: '#processo' },
    { label: 'Diferenciais', href: '#diferenciais' },
  ],
  contato: [
    { label: 'WhatsApp', href: WA_URLS.ctaFinal, external: true },
    { label: 'E-mail', href: 'https://mail.google.com/mail/?view=cm&to=projetosnexus1@gmail.com', external: true },
  ],
}

export default function Footer() {
  return (
    <footer style={{
      borderTop: '1px solid rgba(255,255,255,0.07)',
      padding: '4rem 1.5rem 2rem',
      position: 'relative',
    }}>
      {/* Glow line no topo */}
      <div style={{
        position: 'absolute', top: 0, left: '50%',
        width: '600px', height: '1px',
        background: 'linear-gradient(90deg, transparent, rgba(123,92,255,0.3), transparent)',
        transform: 'translateX(-50%)',
      }} />

      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '2fr 1fr 1fr 1fr',
          gap: '3rem',
          marginBottom: '3rem',
        }} className="footer-grid">

          {/* Brand column */}
          <div>
            <a href="#" style={{ display: 'inline-flex', textDecoration: 'none', marginBottom: '1.25rem' }}>
              <img
                src={logoNexusLabsTaglineDark}
                alt="Nexus Labs"
                loading="lazy"
                style={{
                  height: '52px',
                  width: 'auto',
                  objectFit: 'contain',
                  display: 'block',
                }}
              />
            </a>

            <p style={{
              fontSize: '0.85rem',
              color: 'rgba(255,255,255,0.4)',
              lineHeight: 1.75,
              maxWidth: '260px',
              marginBottom: '1.5rem',
            }}>
              Sistemas premium, automações e agentes inteligentes para empresas que querem operar melhor.
            </p>

            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <a
                href={WA_URLS.ctaFinal}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  width: '36px', height: '36px', borderRadius: '9px',
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.09)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transition: 'all 0.2s',
                  color: 'rgba(255,255,255,0.5)',
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget
                  el.style.background = 'rgba(123,92,255,0.15)'
                  el.style.borderColor = 'rgba(123,92,255,0.3)'
                  el.style.color = '#fff'
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget
                  el.style.background = 'rgba(255,255,255,0.05)'
                  el.style.borderColor = 'rgba(255,255,255,0.09)'
                  el.style.color = 'rgba(255,255,255,0.5)'
                }}
              >
                <MessageCircle size={15} />
              </a>
              <a
                href="https://mail.google.com/mail/?view=cm&to=projetosnexus1@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  width: '36px', height: '36px', borderRadius: '9px',
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.09)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transition: 'all 0.2s',
                  color: 'rgba(255,255,255,0.5)',
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget
                  el.style.background = 'rgba(77,163,255,0.15)'
                  el.style.borderColor = 'rgba(77,163,255,0.3)'
                  el.style.color = '#fff'
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget
                  el.style.background = 'rgba(255,255,255,0.05)'
                  el.style.borderColor = 'rgba(255,255,255,0.09)'
                  el.style.color = 'rgba(255,255,255,0.5)'
                }}
              >
                <Mail size={15} />
              </a>
            </div>
          </div>

          {/* Produto */}
          <div>
            <h4 style={{
              fontFamily: '"Space Grotesk", sans-serif',
              fontSize: '0.8rem', fontWeight: 600,
              color: 'rgba(255,255,255,0.35)',
              letterSpacing: '0.08em', textTransform: 'uppercase',
              marginBottom: '1rem',
            }}>
              Produto
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {links.produto.map(link => (
                <a key={link.label} href={link.href} style={{
                  fontSize: '0.86rem', color: 'rgba(255,255,255,0.5)',
                  textDecoration: 'none', transition: 'color 0.2s', width: 'fit-content',
                }}
                  onMouseEnter={e => { (e.target as HTMLElement).style.color = '#fff' }}
                  onMouseLeave={e => { (e.target as HTMLElement).style.color = 'rgba(255,255,255,0.5)' }}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Empresa */}
          <div>
            <h4 style={{
              fontFamily: '"Space Grotesk", sans-serif',
              fontSize: '0.8rem', fontWeight: 600,
              color: 'rgba(255,255,255,0.35)',
              letterSpacing: '0.08em', textTransform: 'uppercase',
              marginBottom: '1rem',
            }}>
              Empresa
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {links.empresa.map(link => (
                <a key={link.label} href={link.href} style={{
                  fontSize: '0.86rem', color: 'rgba(255,255,255,0.5)',
                  textDecoration: 'none', transition: 'color 0.2s', width: 'fit-content',
                }}
                  onMouseEnter={e => { (e.target as HTMLElement).style.color = '#fff' }}
                  onMouseLeave={e => { (e.target as HTMLElement).style.color = 'rgba(255,255,255,0.5)' }}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Contato */}
          <div>
            <h4 style={{
              fontFamily: '"Space Grotesk", sans-serif',
              fontSize: '0.8rem', fontWeight: 600,
              color: 'rgba(255,255,255,0.35)',
              letterSpacing: '0.08em', textTransform: 'uppercase',
              marginBottom: '1rem',
            }}>
              Contato
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {links.contato.map(link => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.external ? '_blank' : undefined}
                  rel={link.external ? 'noopener noreferrer' : undefined}
                  style={{
                    fontSize: '0.86rem', color: 'rgba(255,255,255,0.5)',
                    textDecoration: 'none', transition: 'color 0.2s',
                    display: 'inline-flex', alignItems: 'center', gap: '0.3rem',
                    width: 'fit-content',
                  }}
                  onMouseEnter={e => { (e.currentTarget).style.color = '#fff' }}
                  onMouseLeave={e => { (e.currentTarget).style.color = 'rgba(255,255,255,0.5)' }}
                >
                  {link.label}
                  {link.external && <ArrowUpRight size={11} />}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="footer-bottom" style={{
          borderTop: '1px solid rgba(255,255,255,0.06)',
          paddingTop: '1.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '0.75rem',
        }}>
          <span style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.25)' }}>
            © {new Date().getFullYear()} Nexus Labs. Todos os direitos reservados.
          </span>
          <span style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.2)' }}>
            Feito com precisão e propósito.
          </span>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .footer-grid { grid-template-columns: 1fr 1fr !important; gap: 2rem !important; }
        }
        @media (max-width: 480px) {
          .footer-grid { grid-template-columns: 1fr !important; gap: 1.5rem !important; }
          footer { padding: 3rem 1.25rem 1.5rem !important; }
          .footer-bottom {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 0.4rem !important;
          }
        }
      `}</style>
    </footer>
  )
}
