import Navigation from "@/components/ui/Navigation"
import MuralSection from "@/components/sections/MuralSection"
import BeneficiosSection from "@/components/sections/BeneficiosSection"
import CtaSection from "@/components/sections/CtaSection"

export default function MuralPage() {
  return (
    <>
      <Navigation />
      <MuralSection />
      <BeneficiosSection />
      <CtaSection />
      <footer className="bg-stone-950 px-6 py-12 text-center text-sm text-stone-500">
        <p>&copy; {new Date().getFullYear()} Capoeira Angola. Feito com axe.</p>
      </footer>
    </>
  )
}
