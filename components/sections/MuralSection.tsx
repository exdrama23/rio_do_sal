import { testimonials } from "@/data/testimonials"
import ScrollReveal from "@/components/ui/ScrollReveal"

export default function MuralSection() {
  return (
    <ScrollReveal id="mural" className="relative bg-stone-950 px-6 py-28">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23fafaf9' fill-opacity='0.15'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />
      <div className="relative mx-auto max-w-5xl">
        <h2
          data-reveal
          data-reveal-type="rise"
          className="font-display text-center text-5xl font-bold tracking-tight text-amber-50"
        >
          Mural
        </h2>
        <div
          data-reveal
          data-reveal-type="rise"
          className="mt-4 flex justify-center"
        >
          <div className="h-1 w-16 rounded-full bg-amber-500" />
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2">
          {testimonials.map((t) => (
            <div
              key={t.author}
              data-reveal
              data-reveal-type="stagger"
              className="relative rounded-2xl border border-amber-900/30 bg-stone-900/80 p-8 shadow-lg shadow-black/30 backdrop-blur-sm transition-all duration-500 hover:border-amber-700/40"
            >
              <svg
                className="mb-4 h-8 w-8 text-amber-700/40"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
              <p className="font-display-italic text-lg leading-relaxed italic text-stone-300">
                {t.quote}
              </p>
              <div className="mt-6 flex items-center gap-3">
                <div className="h-px flex-1 bg-amber-800/30" />
                <div>
                  <p className="text-sm font-semibold text-amber-300">
                    {t.author}
                  </p>
                  <p className="text-xs text-stone-500">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </ScrollReveal>
  )
}
