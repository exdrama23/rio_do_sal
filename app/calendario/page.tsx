import Navigation from "@/components/ui/Navigation"
import CalendarioSection from "@/components/sections/CalendarioSection"
import StackedSection from "@/components/ui/ScrollReveal"

export default function CalendarioPage() {
  return (
    <>
      <Navigation />
      <CalendarioSection />
      <footer className="bg-stone-950 px-6 py-12 text-center text-sm text-stone-500">
        <p>&copy; {new Date().getFullYear()} Capoeira Angola. Feito com axe.</p>
      </footer>
    </>
  )
}
