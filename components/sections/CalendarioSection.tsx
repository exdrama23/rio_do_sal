"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Calendar, Sparkles } from "lucide-react"

import { EventManager, type Event, type EventColor } from "@/components/ui/event-manager"
import { classEvents, WEEK_DAYS } from "@/data/calendar"

const CORDA_TO_COLOR: Record<string, EventColor> = {
  verde: "green",
  azul: "blue",
  amarelo: "yellow",
  vermelho: "red",
  marrom: "pink",
}

function classEventsToEvents(): Event[] {
  return classEvents.map((ce) => {
    const weekDay = WEEK_DAYS.find((w) => w.name === ce.day)
    const isoDate = weekDay?.iso ?? WEEK_DAYS[0].iso // fallback

    const [sh, sm] = ce.time.split(":").map(Number)
    const [eh, em] = ce.duration.split(":").map(Number)

    const startTime = new Date(`${isoDate}T00:00:00`)
    startTime.setHours(sh, sm, 0, 0)

    const endTime = new Date(`${isoDate}T00:00:00`)
    endTime.setHours(eh, em, 0, 0)

    if (endTime <= startTime) {
      endTime.setDate(endTime.getDate() + 1)
    }

    const color: EventColor = CORDA_TO_COLOR[ce.corda] ?? "green"

    return {
      id: ce.id,
      title: ce.name,
      description: `${ce.instructor} • Corda ${ce.corda} • ${ce.day} ${ce.time} - ${ce.duration}`,
      startTime,
      endTime,
      color,
      category: ce.level,
      tags: [ce.corda, ce.level, ce.instructor],
    }
  })
}

const CUBIC_BEZIER = [0.22, 1, 0.36, 1] as const
const CATEGORIES = ["Iniciante", "Intermediario", "Avancado", "Livre", "Todos"] as const

export default function CalendarioSection() {
  const [events, setEvents] = React.useState<Event[]>(() => classEventsToEvents())

  return (
    <section className="relative min-h-screen w-full bg-[#09090B] text-stone-200 font-sans overflow-hidden selection:bg-amber-500 selection:text-zinc-900 pt-28 pb-24 px-6 md:px-12">
      
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.15, 0.3, 0.15],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-0 right-1/4 w-[800px] h-[800px] bg-amber-500/10 rounded-full blur-[120px] pointer-events-none"
        aria-hidden
      />
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.08, 0.18, 0.08],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-orange-500/10 rounded-full blur-[120px] pointer-events-none"
        aria-hidden
      />

      <div className="mx-auto max-w-[1400px] relative z-10 flex flex-col gap-10">
        
        <div className="flex flex-col gap-6">
          

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: CUBIC_BEZIER, delay: 0.1 }}
              className="text-5xl md:text-[4.5rem] leading-[0.9] tracking-tighter font-medium text-stone-100"
            >
              Agenda de
              <br />
              <span className="text-amber-400">Aulas</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: CUBIC_BEZIER, delay: 0.2 }}
              className="max-w-[520px] text-sm md:text-[15px] leading-relaxed text-stone-400"
            >
              Gerencie sua jornada na capoeira. Crie, edite e visualize aulas por mês, semana ou dia.{" "}
              <span className="text-stone-300">As cores representam a corda</span> verde, azul, amarela, vermelha e marrom.
            </motion.p>
          </div>

        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: CUBIC_BEZIER, delay: 0.25 }}
          className="rounded-2xl border border-white/10 bg-[#121214] shadow-2xl shadow-black/50 p-4 md:p-6 lg:p-8"
        >
          <EventManager events={events} onEventsChange={setEvents} categories={[...CATEGORIES]} className="" />
        </motion.div>

        {/* Footer info */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center text-xs text-stone-600"
        >
          Os horários são baseados na semana de <span className="text-stone-400">29 jun a 05 jul 2026</span>. Você pode editar, criar e excluir aulas livremente.
        </motion.p>
      </div>
    </section>
  )
}
