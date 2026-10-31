import { historyEvents } from "@/data/history"
import ScrollReveal from "@/components/ui/ScrollReveal"

export default function RaizesSection() {
  return (
    <ScrollReveal id="raizes" className="bg-stone-50 px-6 py-28">
      <div className="mx-auto max-w-5xl">
        <h2
          data-reveal
          className="font-display text-5xl font-bold tracking-tight text-stone-900"
        >
          Raizes
        </h2>
        <div data-reveal className="mt-2 h-1 w-16 rounded-full bg-amber-600" />

        <div className="relative mt-20">
          <svg
            className="absolute left-8 top-0 h-full w-0.5 md:left-1/2 md:-translate-x-px"
            viewBox="0 0 2 600"
            preserveAspectRatio="none"
          >
            <path
              d="M1 0 C 1 80, 80 100, 1 180 C -78 260, 1 340, 1 420 C 1 500, 80 540, 1 600"
              stroke="#d97706"
              strokeWidth="2"
              fill="none"
              strokeOpacity="0.3"
            />
          </svg>

          <div className="space-y-24">
            {historyEvents.map((event, i) => {
              const isLeft = i % 2 === 0
              return (
                <div
                  key={event.year}
                  data-reveal
                  data-reveal-type="rise"
                  className={`relative flex flex-col gap-4 ${
                    isLeft ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  <div className="flex-1" />
                  <div className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full border-2 border-amber-600 bg-stone-50 md:mx-auto">
                    <div className="h-2.5 w-2.5 rounded-full bg-amber-600" />
                  </div>
                  <div className={`flex-1 ${isLeft ? "md:pr-12 md:text-right" : "md:pl-12"}`}>
                    <span className="font-display-italic text-2xl italic text-amber-600">
                      {event.year}
                    </span>
                    <h3 className="mt-2 font-display text-2xl font-bold text-stone-800">
                      {event.title}
                    </h3>
                    <p className="mt-3 leading-relaxed text-stone-500">
                      {event.description}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </ScrollReveal>
  )
}
