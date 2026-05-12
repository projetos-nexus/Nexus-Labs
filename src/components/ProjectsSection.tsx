import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import ProjectCard from './ProjectCard'
import ProjectDetailsModal from './ProjectDetailsModal'
import { projects } from '../data/projects'
import type { Project } from '../data/projects'

export default function ProjectsSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  const featured = projects.find(p => p.featured)!
  const rest = projects.filter(p => !p.featured)

  return (
    <section
      id="projetos"
      ref={ref}
      style={{
        padding: '6rem 1.5rem',
        position: 'relative',
        background: 'linear-gradient(180deg, transparent 0%, rgba(18,18,26,0.3) 50%, transparent 100%)',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

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
            fontSize: '0.72rem', fontWeight: 700, color: 'rgba(255,255,255,0.4)',
            letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '1.25rem',
          }}>
            Vitrine de soluções
          </div>

          <h2 style={{
            fontFamily: '"Space Grotesk", sans-serif',
            fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
            fontWeight: 700, color: '#fff', letterSpacing: '-0.025em', marginBottom: '1rem',
          }}>
            Projetos prontos para{' '}
            <span className="gradient-text">acelerar sua operação</span>
          </h2>

          <p style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.5)', maxWidth: '580px', margin: '0 auto', lineHeight: 1.75 }}>
            Soluções já construídas, testadas e prontas para serem adaptadas ao fluxo real da sua empresa.
            Escolha uma base pronta ou solicite um sistema sob medida com o padrão Nexus Labs.
          </p>
        </motion.div>

        {/* Grid */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '1rem' }}>
            <ProjectCard project={featured} delay={0.1} inView={inView} onDetails={setSelectedProject} />
          </div>
          <div style={{ display: 'grid', gap: '1rem' }} className="projects-grid">
            {rest.map((proj, i) => (
              <ProjectCard key={proj.id} project={proj} delay={0.15 + i * 0.08} inView={inView} onDetails={setSelectedProject} />
            ))}
          </div>
        </div>
      </div>

      {/* Modal */}
      <ProjectDetailsModal
        project={selectedProject}
        isOpen={selectedProject !== null}
        onClose={() => setSelectedProject(null)}
      />

      <style>{`
        .projects-grid { grid-template-columns: repeat(4, 1fr); }
        @media (max-width: 1024px) {
          .projects-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 640px) {
          .projects-grid { grid-template-columns: 1fr; }
          .project-card-featured .featured-inner { grid-template-columns: 1fr !important; }
          .project-card-featured .featured-stats { display: none; }
        }
      `}</style>
    </section>
  )
}
