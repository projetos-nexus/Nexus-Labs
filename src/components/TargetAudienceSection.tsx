import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  FileSpreadsheet,
  MessageSquare,
  BarChart2,
  Settings2,
  RefreshCw,
  Building2,
  AlertCircle,
  ArrowRight,
} from 'lucide-react'
import { createWhatsAppUrl } from '../config/contact'

const WA_URL = createWhatsAppUrl(
  'Olá, vi no site da Nexus Labs alguns problemas que acontecem na minha empresa. Quero entender como um sistema, automação ou projeto pode resolver isso.'
)

const profiles = [
  {
    icon: FileSpreadsheet,
    title: 'Empresas presas em planilhas',
    description:
      'Quando informações importantes ficam espalhadas em arquivos manuais, o controle se perde e a tomada de decisão fica lenta.',
    points: ['Dados descentralizados', 'Retrabalho constante', 'Falta de visão em tempo real'],
    accent: '#7B5CFF',
    accentBg: 'rgba(123,92,255,0.1)',
  },
  {
    icon: MessageSquare,
    title: 'Operações dependentes de WhatsApp',
    description:
      'WhatsApp é ótimo para comunicação, mas não pode ser o principal sistema de controle da empresa.',
    points: ['Conversas soltas', 'Histórico difícil de encontrar', 'Falta de padrão nos atendimentos'],
    accent: '#4DA3FF',
    accentBg: 'rgba(77,163,255,0.1)',
  },
  {
    icon: BarChart2,
    title: 'Gestores sem visão clara',
    description:
      'Sem dashboards e indicadores confiáveis, a gestão trabalha no escuro e só percebe problemas quando já é tarde.',
    points: ['Falta de indicadores', 'Relatórios manuais', 'Decisões sem dados confiáveis'],
    accent: '#9B82FF',
    accentBg: 'rgba(155,130,255,0.1)',
  },
  {
    icon: Settings2,
    title: 'Empresas com processos específicos',
    description:
      'Sistemas genéricos nem sempre acompanham a realidade da operação. Alguns negócios precisam de uma solução feita sob medida.',
    points: ['Fluxos próprios', 'Permissões específicas', 'Regras internas complexas'],
    accent: '#7B5CFF',
    accentBg: 'rgba(123,92,255,0.1)',
  },
  {
    icon: RefreshCw,
    title: 'Times com tarefas repetitivas',
    description:
      'Atividades manuais consomem tempo, aumentam erros e tiram a equipe do que realmente gera resultado.',
    points: ['Notificações manuais', 'Atualizações repetitivas', 'Baixa produtividade'],
    accent: '#4DA3FF',
    accentBg: 'rgba(77,163,255,0.1)',
  },
  {
    icon: Building2,
    title: 'Negócios que querem parecer mais profissionais',
    description:
      'Um sistema bem feito muda a percepção do cliente, da equipe e da gestão sobre a maturidade da empresa.',
    points: ['Interface premium', 'Processos organizados', 'Mais confiança operacional'],
    accent: '#9B82FF',
    accentBg: 'rgba(155,130,255,0.1)',
  },
]

export default function TargetAudienceSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section
      ref={ref}
      style={{ padding: '6rem 1.5rem', position: 'relative' }}
    >
      {/* Subtle background gradient */}
      <div aria-hidden="true" style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 80% 50% at 50% 50%, rgba(123,92,255,0.04) 0%, transparent 70%)',
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
            display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
            background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '100px', padding: '0.3rem 0.9rem',
            fontSize: '0.72rem', fontWeight: 700,
            color: 'rgba(255,255,255,0.4)', letterSpacing: '0.08em',
            textTransform: 'uppercase', marginBottom: '1.25rem',
          }}>
            Para quem é
          </div>

          <h2 style={{
            fontFamily: '"Space Grotesk", sans-serif',
            fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
            fontWeight: 700, color: '#fff',
            letterSpacing: '-0.025em', marginBottom: '1rem',
          }}>
            Para empresas que precisam{' '}
            <span className="gradient-text">sair do improviso</span>
          </h2>

          <p style={{
            fontSize: '1rem', color: 'rgba(255,255,255,0.5)',
            maxWidth: '600px', margin: '0 auto', lineHeight: 1.75,
          }}>
            Se sua operação ainda depende de planilhas, mensagens soltas, controles manuais ou sistemas que não
            acompanham o crescimento do negócio, a Nexus Labs cria a estrutura digital que sua empresa precisa
            para operar melhor.
          </p>
        </motion.div>

        {/* Cards grid */}
        <div style={{ display: 'grid', gap: '1rem' }} className="audience-grid">
          {profiles.map((profile, i) => {
            const Icon = profile.icon
            return (
              <motion.div
                key={profile.title}
                initial={{ opacity: 0, y: 28 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: 0.1 + i * 0.07, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                style={{
                  background: 'rgba(18,18,26,0.8)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: '16px',
                  padding: '1.75rem',
                  position: 'relative',
                  overflow: 'hidden',
                }}
                className="audience-card"
              >
                {/* Corner glow */}
                <div aria-hidden="true" style={{
                  position: 'absolute', bottom: '-30px', right: '-30px',
                  width: '130px', height: '130px', borderRadius: '50%',
                  background: `radial-gradient(circle, ${profile.accent}0d 0%, transparent 70%)`,
                  pointerEvents: 'none',
                }} />

                {/* Icon */}
                <div style={{
                  width: '42px', height: '42px', borderRadius: '11px',
                  background: profile.accentBg, border: `1px solid ${profile.accent}30`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginBottom: '1.1rem',
                }}>
                  <Icon size={18} color={profile.accent} />
                </div>

                {/* Title */}
                <h3 style={{
                  fontFamily: '"Space Grotesk", sans-serif',
                  fontSize: '1rem', fontWeight: 700,
                  color: '#fff', letterSpacing: '-0.01em',
                  marginBottom: '0.6rem',
                }}>
                  {profile.title}
                </h3>

                {/* Description */}
                <p style={{
                  fontSize: '0.83rem', color: 'rgba(255,255,255,0.48)',
                  lineHeight: 1.7, marginBottom: '1.1rem',
                }}>
                  {profile.description}
                </p>

                {/* Points */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                  {profile.points.map(point => (
                    <div key={point} style={{
                      display: 'flex', alignItems: 'center', gap: '0.5rem',
                      fontSize: '0.77rem', color: 'rgba(255,255,255,0.38)',
                    }}>
                      <AlertCircle size={11} color={profile.accent} style={{ flexShrink: 0 }} />
                      {point}
                    </div>
                  ))}
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          style={{
            textAlign: 'center',
            marginTop: '3.5rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '1.25rem',
          }}
        >
          <p style={{
            fontSize: '1rem', color: 'rgba(255,255,255,0.5)',
            fontWeight: 400,
          }}>
            Identificou algum desses problemas na sua empresa?
          </p>
          <a
            href={WA_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
            style={{
              textDecoration: 'none',
              display: 'inline-flex', alignItems: 'center',
              gap: '0.5rem', fontSize: '0.9rem',
              padding: '0.75rem 1.75rem',
            }}
          >
            Quero resolver isso <ArrowRight size={15} />
          </a>
        </motion.div>
      </div>

      <style>{`
        .audience-grid {
          grid-template-columns: repeat(3, 1fr);
        }
        @media (max-width: 1024px) {
          .audience-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 640px) {
          .audience-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  )
}
