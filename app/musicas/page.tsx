import Navigation from "@/components/ui/Navigation"
import MusicasSection from "@/components/sections/MusicasSection"

export default function MusicasPage() {
  return (
    <>
      <Navigation />
      <MusicasSection />
      <footer className="bg-stone-950 px-6 py-12 text-center text-sm text-stone-500">
        <p>&copy; {new Date().getFullYear()} Capoeira Angola. Feito com axe.</p>
      </footer>
    </>
  )
}
