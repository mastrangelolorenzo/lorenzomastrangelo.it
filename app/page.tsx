import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { ServicesSection } from "@/components/services-section"
import { ProjectsSection } from "@/components/projects-section"
import { ExperienceSection } from "@/components/experience-section"
import { StackSection } from "@/components/stack-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-6xl px-4 sm:px-6">
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <ProjectsSection />
        <ExperienceSection />
        <StackSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  )
}
