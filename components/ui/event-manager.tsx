"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Calendar as CalendarIcon,
  Clock,
  Plus,
  Search,
  Trash2,
  Edit2,
  X,
  ChevronLeft,
  ChevronRight,
  Filter,
  Tag as TagIcon,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

// ---------------------------------------------------------------------------
// Types & Constants
// ---------------------------------------------------------------------------

export type EventColor =
  | "blue"
  | "green"
  | "orange"
  | "red"
  | "pink"
  | "purple"
  | "yellow"
  | "emerald"

export interface Event {
  id: string
  title: string
  description: string
  startTime: Date
  endTime: Date
  color: EventColor
  category: string
  tags: string[]
}

export type CalendarView = "month" | "week" | "day" | "agenda"

export interface EventManagerProps {
  events: Event[]
  onEventsChange: (events: Event[]) => void
  categories?: string[]
  className?: string
}

export const defaultColors: Record<EventColor, { bg: string; dot: string; light: string; label: string }> = {
  blue: { bg: "bg-blue-500", dot: "bg-blue-500", light: "bg-blue-500/10 text-blue-500 border-blue-500/20", label: "Azul" },
  green: { bg: "bg-green-500", dot: "bg-green-500", light: "bg-green-500/10 text-green-500 border-green-500/20", label: "Verde" },
  orange: { bg: "bg-orange-500", dot: "bg-orange-500", light: "bg-orange-500/10 text-orange-400 border-orange-500/20", label: "Laranja" },
  red: { bg: "bg-red-500", dot: "bg-red-500", light: "bg-red-500/10 text-red-500 border-red-500/20", label: "Vermelho" },
  pink: { bg: "bg-pink-500", dot: "bg-pink-500", light: "bg-pink-500/10 text-pink-400 border-pink-500/20", label: "Rosa" },
  purple: { bg: "bg-purple-500", dot: "bg-purple-500", light: "bg-purple-500/10 text-purple-400 border-purple-500/20", label: "Roxo" },
  yellow: { bg: "bg-yellow-500", dot: "bg-yellow-400", light: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20", label: "Amarelo" },
  emerald: { bg: "bg-emerald-500", dot: "bg-emerald-500", light: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20", label: "Esmeralda" },
}

const HOURS = Array.from({ length: 15 }, (_, i) => i + 7) // 07:00 - 21:00

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function formatTime(date: Date): string {
  return date.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })
}

function formatDate(date: Date): string {
  return date.toLocaleDateString("pt-BR", { weekday: "short", day: "2-digit", month: "short" })
}

function isSameDay(a: Date, b: Date): boolean {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate()
}

function getMonthMatrix(year: number, month: number): Date[][] {
  const firstDay = new Date(year, month, 1)
  const start = new Date(firstDay)
  // start on Sunday
  start.setDate(firstDay.getDate() - firstDay.getDay())
  const weeks: Date[][] = []
  for (let w = 0; w < 6; w++) {
    const week: Date[] = []
    for (let d = 0; d < 7; d++) {
      const date = new Date(start)
      date.setDate(start.getDate() + w * 7 + d)
      week.push(date)
    }
    weeks.push(week)
  }
  return weeks
}

function getWeekDays(date: Date): Date[] {
  const start = new Date(date)
  start.setDate(date.getDate() - date.getDay())
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(start)
    d.setDate(start.getDate() + i)
    return d
  })
}

// ---------------------------------------------------------------------------
// Event Form Dialog
// ---------------------------------------------------------------------------

interface EventFormProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  initialEvent?: Event | null
  onSave: (event: Event) => void
  onDelete?: (id: string) => void
  categories: string[]
}

function EventDialog({ open, onOpenChange, initialEvent, onSave, onDelete, categories }: EventFormProps) {
  const [title, setTitle] = React.useState("")
  const [description, setDescription] = React.useState("")
  const [date, setDate] = React.useState("")
  const [start, setStart] = React.useState("19:00")
  const [end, setEnd] = React.useState("20:30")
  const [color, setColor] = React.useState<EventColor>("green")
  const [category, setCategory] = React.useState("Iniciante")
  const [tagsStr, setTagsStr] = React.useState("")

  // Sync form state when dialog opens or editing event changes
  // eslint-disable-next-line react-hooks/set-state-in-effect
  React.useEffect(() => {
    if (initialEvent) {
      setTitle(initialEvent.title)
      setDescription(initialEvent.description)
      setDate(initialEvent.startTime.toISOString().slice(0, 10))
      setStart(formatTime(initialEvent.startTime))
      setEnd(formatTime(initialEvent.endTime))
      setColor(initialEvent.color)
      setCategory(initialEvent.category)
      setTagsStr(initialEvent.tags.join(", "))
    } else {
      const today = new Date().toISOString().slice(0, 10)
      setTitle("")
      setDescription("")
      setDate(today)
      setStart("19:00")
      setEnd("20:30")
      setColor("green")
      setCategory(categories[0] ?? "Iniciante")
      setTagsStr("")
    }
  }, [initialEvent, open, categories])

  const handleSave = () => {
    if (!title.trim() || !date) return
    const [sh, sm] = start.split(":").map(Number)
    const [eh, em] = end.split(":").map(Number)
    const startTime = new Date(`${date}T00:00:00`)
    startTime.setHours(sh, sm, 0, 0)
    const endTime = new Date(`${date}T00:00:00`)
    endTime.setHours(eh, em, 0, 0)
    if (endTime <= startTime) {
      endTime.setDate(endTime.getDate() + 0)
      endTime.setHours(sh + 1, sm, 0, 0)
    }
    const ev: Event = {
      id: initialEvent?.id ?? Math.random().toString(36).slice(2, 9),
      title: title.trim(),
      description: description.trim(),
      startTime,
      endTime,
      color,
      category,
      tags: tagsStr
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
    }
    onSave(ev)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-[#1a1a1d] border-white/10 text-stone-200 max-h-[90vh] overflow-y-auto sm:max-w-[520px]">
        <DialogHeader>
          <DialogTitle className="text-stone-100">{initialEvent ? "Editar aula" : "Nova aula"}</DialogTitle>
          <DialogDescription className="text-stone-500">
            {initialEvent ? "Atualize os detalhes da aula." : "Adicione uma nova aula à agenda."}
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-2">
          <div className="grid gap-2">
            <Label htmlFor="title" className="text-stone-300">Título</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ex: Capoeira Angola"
              className="bg-white/[0.04] border-white/10 text-stone-200 placeholder:text-stone-600 focus-visible:ring-amber-500/50"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="description" className="text-stone-300">Descrição</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Instrutor, corda, observações..."
              rows={2}
              className="bg-white/[0.04] border-white/10 text-stone-200 placeholder:text-stone-600 focus-visible:ring-amber-500/50"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="grid gap-2">
              <Label htmlFor="date" className="text-stone-300">Data</Label>
              <Input
                id="date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="bg-white/[0.04] border-white/10 text-stone-200 [color-scheme:dark]"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="start" className="text-stone-300">Início</Label>
              <Input
                id="start"
                type="time"
                value={start}
                onChange={(e) => setStart(e.target.value)}
                className="bg-white/[0.04] border-white/10 text-stone-200 [color-scheme:dark]"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="end" className="text-stone-300">Fim</Label>
              <Input
                id="end"
                type="time"
                value={end}
                onChange={(e) => setEnd(e.target.value)}
                className="bg-white/[0.04] border-white/10 text-stone-200 [color-scheme:dark]"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="grid gap-2">
              <Label className="text-stone-300">Categoria</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="bg-white/[0.04] border-white/10 text-stone-200">
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent className="bg-[#1a1a1d] border-white/10 text-stone-200">
                  {categories.map((c) => (
                    <SelectItem key={c} value={c} className="focus:bg-white/10 focus:text-stone-100">
                      {c}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label className="text-stone-300">Cor (Corda)</Label>
              <Select value={color} onValueChange={(v) => setColor(v as EventColor)}>
                <SelectTrigger className="bg-white/[0.04] border-white/10 text-stone-200">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-[#1a1a1d] border-white/10">
                  {Object.entries(defaultColors).map(([key, val]) => (
                    <SelectItem key={key} value={key} className="focus:bg-white/10">
                      <span className="flex items-center gap-2">
                        <span className={cn("h-3 w-3 rounded-full", val.bg)} />
                        <span className="text-stone-200">{val.label}</span>
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="tags" className="text-stone-300">Tags (separadas por vírgula)</Label>
            <Input
              id="tags"
              value={tagsStr}
              onChange={(e) => setTagsStr(e.target.value)}
              placeholder="verde, Iniciante, Mestre Coragem"
              className="bg-white/[0.04] border-white/10 text-stone-200 placeholder:text-stone-600"
            />
          </div>
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          {initialEvent && onDelete && (
            <Button
              type="button"
              variant="destructive"
              onClick={() => {
                onDelete(initialEvent.id)
                onOpenChange(false)
              }}
              className="mr-auto gap-2"
            >
              <Trash2 className="h-4 w-4" /> Excluir
            </Button>
          )}
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)} className="border-white/10 bg-white/[0.04] text-stone-300 hover:bg-white/10 hover:text-stone-100">
            Cancelar
          </Button>
          <Button type="button" onClick={handleSave} className="bg-amber-500 text-zinc-900 hover:bg-amber-400 font-medium">
            {initialEvent ? "Salvar" : "Criar aula"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

// ---------------------------------------------------------------------------
// Event Chip
// ---------------------------------------------------------------------------

function EventChip({ event, onClick, compact }: { event: Event; onClick?: (e: React.MouseEvent) => void; compact?: boolean }) {
  const colorMeta = defaultColors[event.color] ?? defaultColors.green
  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full text-left rounded-md px-2 py-1 text-xs font-medium border flex items-center gap-1.5 transition-all hover:brightness-125 hover:scale-[1.01]",
        colorMeta.light,
        compact && "py-0.5 text-[11px]"
      )}
      title={`${event.title} • ${formatTime(event.startTime)} - ${formatTime(event.endTime)}`}
    >
      <span className={cn("h-2 w-2 rounded-full shrink-0", colorMeta.bg)} />
      <span className="truncate flex-1">{event.title}</span>
      {!compact && <span className="text-[10px] opacity-70 hidden sm:inline">{formatTime(event.startTime)}</span>}
    </button>
  )
}

// ---------------------------------------------------------------------------
// Main Component
// ---------------------------------------------------------------------------

export function EventManager({ events, onEventsChange, categories = ["Iniciante", "Intermediario", "Avancado", "Livre", "Todos"], className }: EventManagerProps) {
  const [view, setView] = React.useState<CalendarView>("week")
  const [cursor, setCursor] = React.useState<Date>(() => new Date("2026-07-01T12:00:00"))
  const [search, setSearch] = React.useState("")
  const [categoryFilter, setCategoryFilter] = React.useState<string>("Todos")
  const [colorFilter, setColorFilter] = React.useState<EventColor | "all">("all")
  const [dialogOpen, setDialogOpen] = React.useState(false)
  const [editing, setEditing] = React.useState<Event | null>(null)
  const [selectedEvent, setSelectedEvent] = React.useState<Event | null>(null)

  const filtered = React.useMemo(() => {
    return events.filter((e) => {
      if (categoryFilter !== "Todos" && e.category !== categoryFilter) return false
      if (colorFilter !== "all" && e.color !== colorFilter) return false
      if (search) {
        const q = search.toLowerCase()
        const hay = `${e.title} ${e.description} ${e.category} ${e.tags.join(" ")}`.toLowerCase()
        if (!hay.includes(q)) return false
      }
      return true
    })
  }, [events, categoryFilter, colorFilter, search])

  const handleSave = (ev: Event) => {
    const exists = events.some((e) => e.id === ev.id)
    if (exists) {
      onEventsChange(events.map((e) => (e.id === ev.id ? ev : e)))
    } else {
      onEventsChange([...events, ev])
    }
  }

  const handleDelete = (id: string) => {
    onEventsChange(events.filter((e) => e.id !== id))
    setSelectedEvent(null)
  }

  const openCreate = (date?: Date) => {
    setEditing(null)
    if (date) {
      const iso = date.toISOString().slice(0, 10)
      // prefill via editing hack: create temp event for dialog
      setEditing({
        id: "",
        title: "",
        description: "",
        startTime: new Date(`${iso}T19:00:00`),
        endTime: new Date(`${iso}T20:30:00`),
        color: "green",
        category: categories[0] ?? "Iniciante",
        tags: [],
      } as unknown as Event)
      // Immediately clear id to trigger create mode but keep date
      setTimeout(() => {
        setEditing((prev) => (prev ? { ...prev, id: "" } as Event : null))
      }, 0)
      // Simpler: just open dialog without editing, dialog will use today otherwise
      // We'll manually set date in dialog via prop? For now open empty and user picks date.
      setEditing(null)
    }
    setDialogOpen(true)
  }

  const openEdit = (ev: Event) => {
    setEditing(ev)
    setDialogOpen(true)
  }

  // Navigation helpers
  const navigate = (dir: number) => {
    const d = new Date(cursor)
    if (view === "month") d.setMonth(d.getMonth() + dir)
    else if (view === "week") d.setDate(d.getDate() + dir * 7)
    else if (view === "day") d.setDate(d.getDate() + dir)
    else d.setDate(d.getDate() + dir * 7) // agenda uses week step
    setCursor(d)
  }

  const monthMatrix = React.useMemo(() => getMonthMatrix(cursor.getFullYear(), cursor.getMonth()), [cursor])
  const weekDays = React.useMemo(() => getWeekDays(cursor), [cursor])

  const eventsByDate = React.useMemo(() => {
    const map = new Map<string, Event[]>()
    filtered.forEach((e) => {
      const key = e.startTime.toISOString().slice(0, 10)
      if (!map.has(key)) map.set(key, [])
      map.get(key)!.push(e)
    })
    // sort by time
    map.forEach((list) => list.sort((a, b) => a.startTime.getTime() - b.startTime.getTime()))
    return map
  }, [filtered])

  // -----------------------------------------------------------------------
  // Render helpers per view
  // -----------------------------------------------------------------------

  const renderMonth = () => (
    <div className="grid grid-cols-7 gap-px bg-white/10 rounded-xl overflow-hidden border border-white/10">
      {/* Header */}
      {["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"].map((d) => (
        <div key={d} className="bg-[#1a1a1d] px-2 py-2 text-center text-xs font-medium text-stone-500 uppercase tracking-wider">
          {d}
        </div>
      ))}
      {monthMatrix.flat().map((date, idx) => {
        const key = date.toISOString().slice(0, 10)
        const dayEvents = eventsByDate.get(key) ?? []
        const isCurrentMonth = date.getMonth() === cursor.getMonth()
        const isToday = isSameDay(date, new Date())
        const isSelected = isSameDay(date, cursor)

        return (
          <div
            key={idx}
            onClick={() => setCursor(date)}
            className={cn(
              "min-h-[96px] bg-[#121214] p-1.5 flex flex-col gap-1 cursor-pointer hover:bg-[#1e1e21] transition-colors",
              !isCurrentMonth && "bg-[#0e0e10] text-stone-600",
              isSelected && "ring-1 ring-amber-500/50 ring-inset"
            )}
          >
            <div className="flex items-center justify-between">
              <span
                className={cn(
                  "text-xs font-medium w-6 h-6 rounded-full flex items-center justify-center",
                  isToday ? "bg-amber-500 text-zinc-900 font-bold" : isCurrentMonth ? "text-stone-300" : "text-stone-600",
                  isSelected && !isToday && "bg-white/10 text-stone-100"
                )}
              >
                {date.getDate()}
              </span>
              {dayEvents.length > 0 && (
                <span className="text-[10px] text-stone-500">{dayEvents.length} aula{dayEvents.length > 1 ? "s" : ""}</span>
              )}
            </div>
            <div className="flex flex-col gap-1 overflow-hidden">
              {dayEvents.slice(0, 3).map((ev) => (
                <EventChip
                  key={ev.id}
                  event={ev}
                  compact
                  onClick={(e) => {
                    e?.stopPropagation?.()
                    setSelectedEvent(ev)
                  }}
                />
              ))}
              {dayEvents.length > 3 && (
                <span className="text-[10px] text-stone-500 pl-1">+{dayEvents.length - 3} mais</span>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )

  const renderWeek = () => (
    <div className="border border-white/10 rounded-xl overflow-hidden bg-[#121214]">
      {/* Week header */}
      <div className="grid grid-cols-8 border-b border-white/10 bg-[#1a1a1d]">
        <div className="p-3 border-r border-white/10 text-xs text-stone-500 flex items-center justify-center">
          <Clock className="h-4 w-4" />
        </div>
        {weekDays.map((d) => {
          const isToday = isSameDay(d, new Date())
          const isCursor = isSameDay(d, cursor)
          return (
            <div
              key={d.toISOString()}
              onClick={() => {
                setCursor(d)
                setView("day")
              }}
              className={cn(
                "p-2 text-center cursor-pointer hover:bg-white/[0.04] transition-colors border-r border-white/5 last:border-0",
                isCursor && "bg-amber-500/10"
              )}
            >
              <div className={cn("text-xs uppercase tracking-wider", isToday ? "text-amber-300" : "text-stone-500")}>
                {d.toLocaleDateString("pt-BR", { weekday: "short" })}
              </div>
              <div className={cn("text-sm font-medium mt-0.5 w-7 h-7 rounded-full flex items-center justify-center mx-auto", isToday ? "bg-amber-500 text-zinc-900" : isCursor ? "bg-white/10 text-stone-100" : "text-stone-200")}>
                {d.getDate()}
              </div>
            </div>
          )
        })}
      </div>

      {/* Time grid */}
      <div className="grid grid-cols-8 max-h-[520px] overflow-auto">
        {/* Hours column */}
        <div className="border-r border-white/10 bg-[#121214]">
          {HOURS.map((h) => (
            <div key={h} className="h-[56px] border-b border-white/5 text-[11px] text-stone-500 flex items-start justify-center pt-1 pr-2">
              {String(h).padStart(2, "0")}:00
            </div>
          ))}
        </div>

        {/* Days columns */}
        {weekDays.map((day) => {
          const key = day.toISOString().slice(0, 10)
          const dayEvents = eventsByDate.get(key) ?? []
          return (
            <div key={key} className="relative border-r border-white/5 last:border-0">
              {/* Hour lines */}
              {HOURS.map((h) => (
                <div key={h} className="h-[56px] border-b border-white/5" />
              ))}
              {/* Events absolute */}
              {dayEvents.map((ev) => {
                const startHour = ev.startTime.getHours() + ev.startTime.getMinutes() / 60
                const endHour = ev.endTime.getHours() + ev.endTime.getMinutes() / 60
                const top = (startHour - HOURS[0]) * 56
                const height = Math.max(22, (endHour - startHour) * 56 - 4)
                const colorMeta = defaultColors[ev.color] ?? defaultColors.green
                if (top < 0 || top > HOURS.length * 56) return null
                return (
                  <button
                    key={ev.id}
                    onClick={() => setSelectedEvent(ev)}
                    style={{ top: `${top}px`, height: `${height}px` }}
                    className={cn(
                      "absolute left-1 right-1 rounded-md border px-2 py-1 text-left overflow-hidden shadow-sm hover:brightness-110 transition-all flex flex-col justify-center",
                      colorMeta.light
                    )}
                  >
                    <span className="text-xs font-semibold leading-none truncate">{ev.title}</span>
                    <span className="text-[10px] opacity-80 truncate">
                      {formatTime(ev.startTime)} • {ev.category}
                    </span>
                  </button>
                )
              })}
            </div>
          )
        })}
      </div>
    </div>
  )

  const renderDay = () => {
    const key = cursor.toISOString().slice(0, 10)
    const dayEvents = eventsByDate.get(key) ?? []
    return (
      <div className="border border-white/10 rounded-xl overflow-hidden bg-[#121214]">
        <div className="p-3 border-b border-white/10 bg-[#1a1a1d] flex items-center justify-between">
          <h3 className="text-sm font-medium text-stone-200 capitalize">
            {cursor.toLocaleDateString("pt-BR", { weekday: "long", day: "2-digit", month: "long", year: "numeric" })}
          </h3>
          <Badge variant="secondary" className="bg-white/10 text-stone-300 border-white/10">
            {dayEvents.length} aulas
          </Badge>
        </div>
        <div className="relative">
          {HOURS.map((h) => (
            <div key={h} className="flex border-b border-white/5 h-[56px]">
              <div className="w-20 shrink-0 border-r border-white/10 bg-[#121214] text-[11px] text-stone-500 flex items-start justify-center pt-1">
                {String(h).padStart(2, "0")}:00
              </div>
              <div className="flex-1 relative" />
            </div>
          ))}
          {/* events */}
          {dayEvents.map((ev) => {
            const startHour = ev.startTime.getHours() + ev.startTime.getMinutes() / 60
            const endHour = ev.endTime.getHours() + ev.endTime.getMinutes() / 60
            const top = (startHour - HOURS[0]) * 56
            const height = Math.max(28, (endHour - startHour) * 56 - 6)
            const colorMeta = defaultColors[ev.color] ?? defaultColors.green
            return (
              <button
                key={ev.id}
                onClick={() => setSelectedEvent(ev)}
                style={{ top: `${top}px`, height: `${height}px` }}
                className={cn(
                  "absolute left-[88px] right-3 rounded-lg border px-3 py-2 text-left shadow-sm hover:scale-[1.01] hover:brightness-110 transition-all flex flex-col justify-center",
                  colorMeta.light
                )}
              >
                <span className="text-sm font-semibold truncate">{ev.title}</span>
                <span className="text-xs opacity-80 truncate">{ev.description || `${formatTime(ev.startTime)} - ${formatTime(ev.endTime)} • ${ev.category}`}</span>
                {ev.tags.length > 0 && (
                  <span className="flex gap-1 mt-1 flex-wrap">
                    {ev.tags.slice(0, 3).map((t) => (
                      <span key={t} className="text-[10px] bg-black/20 px-1.5 py-0.5 rounded-full">
                        {t}
                      </span>
                    ))}
                  </span>
                )}
              </button>
            )
          })}
          {dayEvents.length === 0 && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-[#121214]/80 backdrop-blur-[1px]">
              <CalendarIcon className="h-8 w-8 text-stone-600" />
              <p className="text-sm text-stone-500">Nenhuma aula neste dia</p>
              <Button size="sm" onClick={() => openCreate(cursor)} className="bg-amber-500 text-zinc-900 hover:bg-amber-400 gap-2">
                <Plus className="h-4 w-4" /> Criar aula
              </Button>
            </div>
          )}
        </div>
      </div>
    )
  }

  const renderAgenda = () => {
    const sorted = [...filtered].sort((a, b) => a.startTime.getTime() - b.startTime.getTime())
    // group by date
    const groups = new Map<string, Event[]>()
    sorted.forEach((ev) => {
      const k = ev.startTime.toLocaleDateString("pt-BR", { weekday: "long", day: "2-digit", month: "long" })
      if (!groups.has(k)) groups.set(k, [])
      groups.get(k)!.push(ev)
    })
    if (sorted.length === 0) {
      return (
        <div className="border border-white/10 rounded-xl p-12 text-center bg-[#121214]">
          <CalendarIcon className="h-10 w-10 text-stone-600 mx-auto mb-3" />
          <p className="text-stone-400">Nenhuma aula encontrada</p>
          <p className="text-xs text-stone-600 mt-1">Tente ajustar filtros ou criar uma nova aula.</p>
        </div>
      )
    }
    return (
      <div className="space-y-6">
        {Array.from(groups.entries()).map(([dateLabel, evs]) => (
          <div key={dateLabel}>
            <h4 className="text-xs uppercase tracking-wider text-stone-500 mb-3 sticky top-0 bg-[#09090B] py-1 capitalize">{dateLabel}</h4>
            <div className="grid gap-3">
              {evs.map((ev) => {
                const colorMeta = defaultColors[ev.color] ?? defaultColors.green
                return (
                  <Card
                    key={ev.id}
                    onClick={() => setSelectedEvent(ev)}
                    className="bg-[#121214] border-white/10 hover:bg-[#1a1a1d] cursor-pointer transition-colors overflow-hidden group"
                  >
                    <CardContent className="p-4 flex gap-4">
                      <div className={cn("w-1 rounded-full shrink-0", colorMeta.bg)} />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-3">
                          <h5 className="font-medium text-stone-100 group-hover:text-white truncate">{ev.title}</h5>
                          <Badge className={cn("shrink-0 border", colorMeta.light)} variant="outline">
                            {ev.category}
                          </Badge>
                        </div>
                        {ev.description && <p className="text-sm text-stone-400 mt-1 line-clamp-2">{ev.description}</p>}
                        <div className="flex flex-wrap items-center gap-3 mt-3 text-xs text-stone-500">
                          <span className="flex items-center gap-1.5">
                            <Clock className="h-3.5 w-3.5" /> {formatTime(ev.startTime)} - {formatTime(ev.endTime)}
                          </span>
                          {ev.tags.length > 0 && (
                            <span className="flex items-center gap-1.5">
                              <TagIcon className="h-3.5 w-3.5" /> {ev.tags.join(", ")}
                            </span>
                          )}
                          <span className="flex items-center gap-1.5">
                            <span className={cn("h-2 w-2 rounded-full", colorMeta.bg)} /> {defaultColors[ev.color]?.label ?? ev.color}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    )
  }

  // -----------------------------------------------------------------------
  // Render
  // -----------------------------------------------------------------------

  return (
    <div className={cn("w-full flex flex-col gap-4", className)}>
      {/* Toolbar */}
      <div className="flex flex-col gap-3">
        {/* Top row: search + actions */}
        <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
          <div className="flex items-center gap-2 flex-1 max-w-md">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-500" />
              <Input
                placeholder="Buscar aulas, instrutor, tags..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 bg-white/[0.04] border-white/10 text-stone-200 placeholder:text-stone-600 focus-visible:ring-amber-500/30"
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-1 hover:bg-white/10 rounded-full"
                >
                  <X className="h-3 w-3 text-stone-400" />
                </button>
              )}
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="shrink-0 border-white/10 bg-white/[0.04] hover:bg-white/10 text-stone-300">
                  <Filter className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-[#1a1a1d] border-white/10 text-stone-200 w-56">
                <DropdownMenuLabel className="text-stone-400">Filtros</DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-white/10" />
                <div className="p-2 space-y-2">
                  <Label className="text-xs text-stone-400">Categoria</Label>
                  <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                    <SelectTrigger className="h-8 bg-white/[0.04] border-white/10">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-[#1a1a1d] border-white/10">
                      {categories.map((c) => (
                        <SelectItem key={c} value={c} className="focus:bg-white/10">
                          {c}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="p-2 space-y-2">
                  <Label className="text-xs text-stone-400">Cor / Corda</Label>
                  <Select value={colorFilter} onValueChange={(v) => setColorFilter(v as EventColor | "all")}>
                    <SelectTrigger className="h-8 bg-white/[0.04] border-white/10">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-[#1a1a1d] border-white/10">
                      <SelectItem value="all" className="focus:bg-white/10">Todas</SelectItem>
                      {Object.entries(defaultColors).map(([k, v]) => (
                        <SelectItem key={k} value={k} className="focus:bg-white/10">
                          <span className="flex items-center gap-2">
                            <span className={cn("h-3 w-3 rounded-full", v.bg)} /> {v.label}
                          </span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                {(categoryFilter !== "Todos" || colorFilter !== "all") && (
                  <>
                    <DropdownMenuSeparator className="bg-white/10" />
                    <DropdownMenuItem
                      className="focus:bg-white/10 focus:text-stone-100 cursor-pointer"
                      onClick={() => {
                        setCategoryFilter("Todos")
                        setColorFilter("all")
                      }}
                    >
                      Limpar filtros
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="flex items-center gap-2">
            {/* View switcher */}
            <div className="flex bg-white/[0.04] border border-white/10 rounded-lg p-1 gap-1">
              {[
                { id: "month", label: "Mês" },
                { id: "week", label: "Semana" },
                { id: "day", label: "Dia" },
                { id: "agenda", label: "Agenda" },
              ].map((v) => (
                <button
                  key={v.id}
                  onClick={() => setView(v.id as CalendarView)}
                  className={cn(
                    "px-3 py-1.5 text-xs font-medium rounded-md transition-all",
                    view === v.id ? "bg-white text-zinc-900 shadow" : "text-stone-400 hover:text-stone-200 hover:bg-white/10"
                  )}
                >
                  {v.label}
                </button>
              ))}
            </div>

            <Button onClick={() => openCreate(cursor)} className="gap-2 bg-amber-500 text-zinc-900 hover:bg-amber-400 font-medium hidden sm:flex">
              <Plus className="h-4 w-4" /> Nova aula
            </Button>
            <Button onClick={() => openCreate(cursor)} size="icon" className="sm:hidden bg-amber-500 text-zinc-900 hover:bg-amber-400">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Navigation row */}
        <div className="flex items-center justify-between bg-[#121214] border border-white/10 rounded-xl px-3 py-2">
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="h-8 w-8 text-stone-400 hover:text-stone-100 hover:bg-white/10">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={() => setCursor(new Date())} className="text-stone-300 hover:text-stone-100 hover:bg-white/10 h-8">
              Hoje
            </Button>
            <Button variant="ghost" size="icon" onClick={() => navigate(1)} className="h-8 w-8 text-stone-400 hover:text-stone-100 hover:bg-white/10">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          <h2 className="text-sm font-medium text-stone-200 capitalize text-center">
            {view === "month" && cursor.toLocaleDateString("pt-BR", { month: "long", year: "numeric" })}
            {view === "week" &&
              `${weekDays[0].toLocaleDateString("pt-BR", { day: "2-digit", month: "short" })} a ${weekDays[6].toLocaleDateString("pt-BR", { day: "2-digit", month: "short", year: "numeric" })}`}
            {view === "day" && cursor.toLocaleDateString("pt-BR", { weekday: "long", day: "2-digit", month: "long", year: "numeric" })}
            {view === "agenda" && `Agenda • ${filtered.length} aulas`}
          </h2>

          <div className="hidden sm:flex items-center gap-2 text-xs text-stone-500">
            <span className="hidden lg:inline">{filtered.length} de {events.length} aulas</span>
          </div>
          <div className="sm:hidden w-20" />
        </div>
      </div>

      {/* Calendar Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={view}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
        >
          {view === "month" && renderMonth()}
          {view === "week" && renderWeek()}
          {view === "day" && renderDay()}
          {view === "agenda" && renderAgenda()}
        </motion.div>
      </AnimatePresence>

      {/* Event detail dialog */}
      <Dialog open={!!selectedEvent} onOpenChange={(o) => !o && setSelectedEvent(null)}>
        <DialogContent className="bg-[#1a1a1d] border-white/10 text-stone-200 sm:max-w-[480px]">
          {selectedEvent && (
            <>
              <DialogHeader>
                <div className="flex items-start gap-3">
                  <span className={cn("h-3 w-3 rounded-full mt-2 shrink-0", defaultColors[selectedEvent.color]?.bg)} />
                  <div className="flex-1 text-left">
                    <DialogTitle className="text-stone-100 leading-tight">{selectedEvent.title}</DialogTitle>
                    <DialogDescription className="text-stone-500 mt-1">{selectedEvent.description || "Sem descrição"}</DialogDescription>
                  </div>
                </div>
              </DialogHeader>
              <div className="space-y-3 py-2">
                <div className="flex flex-wrap gap-2">
                  <Badge className={cn("border", defaultColors[selectedEvent.color]?.light)} variant="outline">
                    {selectedEvent.category}
                  </Badge>
                  <Badge variant="secondary" className="bg-white/10 text-stone-300 border-white/10 flex items-center gap-1.5">
                    <Clock className="h-3 w-3" /> {formatTime(selectedEvent.startTime)} - {formatTime(selectedEvent.endTime)}
                  </Badge>
                  <Badge variant="secondary" className="bg-white/10 text-stone-300 border-white/10">
                    {selectedEvent.startTime.toLocaleDateString("pt-BR", { weekday: "long", day: "2-digit", month: "long" })}
                  </Badge>
                </div>
                {selectedEvent.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {selectedEvent.tags.map((t) => (
                      <span key={t} className="text-xs bg-white/[0.06] border border-white/10 px-2 py-1 rounded-full text-stone-400">
                        #{t}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              <DialogFooter className="gap-2">
                <Button variant="outline" onClick={() => setSelectedEvent(null)} className="border-white/10 bg-white/[0.04] text-stone-300 hover:bg-white/10">
                  Fechar
                </Button>
                <Button variant="destructive" onClick={() => handleDelete(selectedEvent.id)} className="gap-2">
                  <Trash2 className="h-4 w-4" /> Excluir
                </Button>
                <Button
                  onClick={() => {
                    const ev = selectedEvent
                    setSelectedEvent(null)
                    openEdit(ev)
                  }}
                  className="gap-2 bg-amber-500 text-zinc-900 hover:bg-amber-400"
                >
                  <Edit2 className="h-4 w-4" /> Editar
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Create/Edit dialog */}
      <EventDialog
        open={dialogOpen}
        onOpenChange={(o) => {
          setDialogOpen(o)
          if (!o) setEditing(null)
        }}
        initialEvent={editing && editing.id ? editing : null}
        onSave={handleSave}
        onDelete={handleDelete}
        categories={categories.filter((c) => c !== "Todos")}
      />
    </div>
  )
}
