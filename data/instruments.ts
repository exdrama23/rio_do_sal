export interface Instrument {
  name: string
  description: string
  role: string
}

export const instruments: Instrument[] = [
  {
    name: "Berimbau",
    description:
      "O coracao da capoeira. Com sua cabaca, arame e caxixi, o berimbau dita o ritmo do jogo: lento e angoleiro ou veloz e regional.",
    role: "Comando da roda",
  },
  {
    name: "Atabaque",
    description:
      "Tambor alto e grave que marca a pulsacao da roda. Sua batida firme sustenta a energia e convida o corpo a entrar no jogo.",
    role: "Base ritmica",
  },
  {
    name: "Pandeiro",
    description:
      "Leve e agudo, o pandeiro costura os sons da roda com suas chocalhos. Dá movimento e leveza a musica da capoeira.",
    role: "Costura sonora",
  },
  {
    name: "Agogo",
    description:
      "Dois sinos de metal que pontuam o ritmo com clareza. Seu som agudo corta a roda e anuncia os momentos de virada.",
    role: "Pontuacao ritmica",
  },
]
