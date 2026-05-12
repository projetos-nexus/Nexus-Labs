import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import ServicesSection from '../components/ServicesSection'
import TargetAudienceSection from '../components/TargetAudienceSection'
import ProjectsSection from '../components/ProjectsSection'
import ProcessSection from '../components/ProcessSection'
import VisualProofSection from '../components/VisualProofSection'
import DiferenciaisSection from '../components/DiferenciaisSection'
import CTASection from '../components/CTASection'
import Footer from '../components/Footer'
import BrandWatermark from '../components/BrandWatermark'

export default function Home() {
  return (
    <div style={{ minHeight: '100vh', background: '#0B0B0F' }}>
      <Navbar />
      <main>
        <Hero />
        <ServicesSection />
        <TargetAudienceSection />
        <ProjectsSection />
        <VisualProofSection />
        <ProcessSection />
        <DiferenciaisSection />
        <CTASection />
      </main>
      <Footer />
      <BrandWatermark />
    </div>
  )
}
