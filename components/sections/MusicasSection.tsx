
import { topicosProjeto } from "@/data/projeto"
import ScrollReveal from "@/components/ui/ScrollReveal"

export default function SobreProjetoSection() {
  return (
    <ScrollReveal className="bg-gradient-to-br from-stone-900 to-stone-950 px-6 py-28">
      <div className="mx-auto max-w-5xl">
        <h2
          data-reveal
          data-reveal-type="rise"
          className="font-display text-5xl font-bold tracking-tight text-emerald-50"
        >
          Sobre o Projeto
        </h2>
        <div
          data-reveal
          data-reveal-type="rise"
          className="mt-2 h-1 w-16 rounded-full bg-emerald-600"
        />

        <div className="mt-16 grid gap-12 md:grid-cols-2">
          {topicosProjeto.map((topico) => (
            <div
              key={topico.name}
              data-reveal
              data-reveal-type="lateral"
              className={`group relative overflow-hidden rounded-2xl border border-stone-700/60 bg-stone-800/40 p-8 shadow-2xl shadow-black/30 transition-all duration-500 hover:border-emerald-700/60`}
            >
              <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-emerald-600/5 blur-2xl transition-all duration-700 group-hover:bg-emerald-600/10" />
              <div className="relative">
                <div className="flex items-center justify-between">
                  <h3 className="font-display text-2xl font-bold tracking-tight text-emerald-200">
                    {topico.name}
                  </h3>
                  <span className="rounded-full bg-emerald-900/60 px-3 py-1 font-display-italic text-xs italic text-emerald-400">
                    {topico.role}
                  </span>
                </div>
                <div className="mt-6 h-px w-full bg-gradient-to-r from-emerald-700/40 via-emerald-600/20 to-transparent" />
                <p className="mt-6 leading-relaxed text-stone-400">
                  {topico.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </ScrollReveal>
  )
}
