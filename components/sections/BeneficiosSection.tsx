import { benefits } from "@/data/benefits"
import ScrollReveal from "@/components/ui/ScrollReveal"

export default function BeneficiosSection() {
  return (
    <ScrollReveal className="bg-amber-950 px-6 py-28 text-amber-50">
      <div className="mx-auto max-w-5xl">
        <h2
          data-reveal
          className="font-display text-center text-5xl font-bold tracking-tight"
        >
          Por que praticar?
        </h2>
        <div data-reveal className="mt-4 flex justify-center">
          <div className="h-1 w-16 rounded-full bg-amber-500" />
        </div>
        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((b) => (
            <div
              key={b.title}
              data-reveal
              className="group rounded-2xl border border-amber-800/50 bg-amber-900/40 p-6 text-center backdrop-blur-sm transition-all duration-500 hover:border-amber-600/60 hover:bg-amber-900/60 hover:-translate-y-1"
            >
              <h3 className="mt-4 text-lg font-semibold text-amber-200">
                {b.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-amber-300/80">
                {b.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </ScrollReveal>
  )
}
