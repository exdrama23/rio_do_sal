import Navigation from "@/components/ui/Navigation"
import SceneCanvas from "@/components/scene/SceneCanvas"
import HeroSection from "@/components/sections/HeroSection"
import Mestres from "@/components/sections/Mestres"
import CtaSection from "@/components/sections/CtaSection"
import AboutSection from "@/components/sections/Aboult"
import StackedSection from "@/components/ui/ScrollReveal"
import RecordsSection from "@/components/sections/RecordsSection"
import HorizontalTimeline from "@/components/sections/Timeline"
import GaleriaSection from "@/components/sections/GaleriaSection"


export default function Home() {
  return (
    <>
      <Navigation />
      <SceneCanvas />
      <StackedSection>
        <HeroSection />
      </StackedSection>
      <Mestres />
      <AboutSection />
      <RecordsSection />
      <CtaSection />
      <HorizontalTimeline />
      <GaleriaSection />
      <footer className="bg-stone-950 px-6 py-12 text-center text-sm text-stone-500">
        <p>&copy; {new Date().getFullYear()} Rio do Sal. Aracaju, Sergipe.</p>
      </footer>
    </>
  )
}
