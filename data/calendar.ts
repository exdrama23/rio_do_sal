export interface ClassEvent {
  id: string
  day: string
  time: string
  duration: string
  name: string
  instructor: string
  level: string
  corda: string
}

export interface WeekDay {
  name: string
  label: string
  date: string
  iso: string
}

export const WEEK_DAYS: WeekDay[] = [
  { name: "Segunda", label: "Seg", date: "29 June 2026", iso: "2026-06-29" },
  { name: "Terca",   label: "Ter", date: "30 June 2026", iso: "2026-06-30" },
  { name: "Quarta",  label: "Qua", date: "01 July 2026", iso: "2026-07-01" },
  { name: "Quinta",  label: "Qui", date: "02 July 2026", iso: "2026-07-02" },
  { name: "Sexta",   label: "Sex", date: "03 July 2026", iso: "2026-07-03" },
  { name: "Sabado",  label: "Sab", date: "04 July 2026", iso: "2026-07-04" },
  { name: "Domingo", label: "Dom", date: "05 July 2026", iso: "2026-07-05" },
];

export const CORDA_COLORS: Record<string, string> = {
  verde:    "bg-green-500",
  azul:     "bg-blue-500",
  amarelo:  "bg-yellow-400",
  vermelho: "bg-red-500",
  marrom:   "bg-amber-700",
};

export const classEvents: ClassEvent[] = [
  {
    id: "1",
    day: "Segunda",
    time: "19:00",
    duration: "20:30",
    name: "Capoeira Infantil",
    instructor: "Professor Joao",
    level: "Iniciante",
    corda: "verde",
  },
  {
    id: "2",
    day: "Terca",
    time: "20:30",
    duration: "22:00",
    name: "Capoeira Angola",
    instructor: "Mestre Coragem",
    level: "Avancado",
    corda: "marrom",
  },
  {
    id: "3",
    day: "Quarta",
    time: "19:00",
    duration: "20:30",
    name: "Musicalizacao",
    instructor: "Professora Ana",
    level: "Livre",
    corda: "azul",
  },
  {
    id: "4",
    day: "Quinta",
    time: "20:30",
    duration: "22:00",
    name: "Roda de Capoeira",
    instructor: "Mestre Coragem",
    level: "Todos",
    corda: "amarelo",
  },
  {
    id: "5",
    day: "Sexta",
    time: "19:00",
    duration: "21:00",
    name: "Treino Livre",
    instructor: "Monitor Pedro",
    level: "Intermediario",
    corda: "vermelho",
  },
  {
    id: "6",
    day: "Sabado",
    time: "10:00",
    duration: "12:00",
    name: "Capoeira Angola",
    instructor: "Mestre Coragem",
    level: "Iniciante",
    corda: "verde",
  },
];
