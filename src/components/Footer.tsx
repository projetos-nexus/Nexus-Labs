import { MessageCircle, Mail, ArrowUpRight } from 'lucide-react'
import logoNexusLabsAbreviado from '../assets/logos/logo-nexus-labs-abreviado.svg'
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
      borderTop: '1px solid color-mix(in srgb, var(--color-text) 7%, transparent)',
      padding: '4rem 1.5rem 2rem',
      position: 'relative',
    }}>
      {/* Glow line no topo */}
      <div style={{
        position: 'absolute', top: 0, left: '50%',
        width: 'min(100%, 600px)', height: '1px',
        background: 'linear-gradient(90deg, transparent, color-mix(in srgb, var(--color-roxo) 30%, transparent), transparent)',
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
                src={logoNexusLabsAbreviado}
                alt="Nexus Labs"
                loading="lazy"
                style={{
                  height: '46px',
                  width: 'auto',
                  objectFit: 'contain',
                  display: 'block',
                }}
              />
            </a>

            <p style={{
              fontSize: '0.85rem',
              color: 'var(--color-text-muted)',
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
                aria-label="Conversar no WhatsApp (abre em nova aba)"
                style={{
                  width: '36px', height: '36px', borderRadius: '9px',
                  background: 'color-mix(in srgb, var(--color-text) 5%, transparent)',
                  border: '1px solid color-mix(in srgb, var(--color-text) 9%, transparent)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transition: 'all 0.2s',
                  color: 'var(--color-text-muted)',
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget
                  el.style.background = 'color-mix(in srgb, var(--color-roxo) 15%, transparent)'
                  el.style.borderColor = 'color-mix(in srgb, var(--color-roxo) 30%, transparent)'
                  el.style.color = 'var(--color-text)'
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget
                  el.style.background = 'color-mix(in srgb, var(--color-text) 5%, transparent)'
                  el.style.borderColor = 'color-mix(in srgb, var(--color-text) 9%, transparent)'
                  el.style.color = 'var(--color-text-muted)'
                }}
              >
                <MessageCircle size={15} aria-hidden="true" />
              </a>
              <a
                href="https://mail.google.com/mail/?view=cm&to=projetosnexus1@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Enviar e-mail para a Nexus Labs (abre em nova aba)"
                style={{
                  width: '36px', height: '36px', borderRadius: '9px',
                  background: 'color-mix(in srgb, var(--color-text) 5%, transparent)',
                  border: '1px solid color-mix(in srgb, var(--color-text) 9%, transparent)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transition: 'all 0.2s',
                  color: 'var(--color-text-muted)',
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget
                  el.style.background = 'color-mix(in srgb, var(--color-lilas-mid) 15%, transparent)'
                  el.style.borderColor = 'color-mix(in srgb, var(--color-lilas-mid) 30%, transparent)'
                  el.style.color = 'var(--color-text)'
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget
                  el.style.background = 'color-mix(in srgb, var(--color-text) 5%, transparent)'
                  el.style.borderColor = 'color-mix(in srgb, var(--color-text) 9%, transparent)'
                  el.style.color = 'var(--color-text-muted)'
                }}
              >
                <Mail size={15} aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Produto */}
          <div>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: '0.8rem', fontWeight: 600,
              color: 'var(--color-text-muted)',
              letterSpacing: '0.08em', textTransform: 'uppercase',
              marginBottom: '1rem',
            }}>
              Produto
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {links.produto.map(link => (
                <a key={link.label} href={link.href} style={{
                  fontSize: '0.86rem', color: 'var(--color-text-muted)',
                  textDecoration: 'none', transition: 'color 0.2s', width: 'fit-content',
                }}
                  onMouseEnter={e => { (e.target as HTMLElement).style.color = 'var(--color-text)' }}
                  onMouseLeave={e => { (e.target as HTMLElement).style.color = 'var(--color-text-muted)' }}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Empresa */}
          <div>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: '0.8rem', fontWeight: 600,
              color: 'var(--color-text-muted)',
              letterSpacing: '0.08em', textTransform: 'uppercase',
              marginBottom: '1rem',
            }}>
              Empresa
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {links.empresa.map(link => (
                <a key={link.label} href={link.href} style={{
                  fontSize: '0.86rem', color: 'var(--color-text-muted)',
                  textDecoration: 'none', transition: 'color 0.2s', width: 'fit-content',
                }}
                  onMouseEnter={e => { (e.target as HTMLElement).style.color = 'var(--color-text)' }}
                  onMouseLeave={e => { (e.target as HTMLElement).style.color = 'var(--color-text-muted)' }}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Contato */}
          <div>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: '0.8rem', fontWeight: 600,
              color: 'var(--color-text-muted)',
              letterSpacing: '0.08em', textTransform: 'uppercase',
              marginBottom: '1rem',
            }}>
              Contato
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {links.contato.map(link => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.external ? '_blank' : undefined}
                  rel={link.external ? 'noopener noreferrer' : undefined}
                  style={{
                    fontSize: '0.86rem', color: 'var(--color-text-muted)',
                    textDecoration: 'none', transition: 'color 0.2s',
                    display: 'inline-flex', alignItems: 'center', gap: '0.3rem',
                    width: 'fit-content',
                  }}
                  onMouseEnter={e => { (e.currentTarget).style.color = 'var(--color-text)' }}
                  onMouseLeave={e => { (e.currentTarget).style.color = 'var(--color-text-muted)' }}
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
          borderTop: '1px solid color-mix(in srgb, var(--color-text) 6%, transparent)',
          paddingTop: '1.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '0.75rem',
        }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>
            © {new Date().getFullYear()} Nexus Labs. Todos os direitos reservados.
          </span>
          <span style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>
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
