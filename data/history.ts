export interface HistoryEvent {
  year: string
  title: string
  description: string
}

export const historyEvents: HistoryEvent[] = [
  {
    year: "1500s",
    title: "Nasce a resistencia",
    description:
      "Africanos escravizados no Brasil colonial criam a capoeira como forma de defesa disfarçada de dança, preservando sua cultura e dignidade.",
  },
  {
    year: "1890",
    title: "A criminalizacao",
    description:
      "A capoeira e oficialmente proibida no Codigo Penal Brasileiro. Praticantes sao perseguidos e presos. A arte sobrevive nos terreiros e senzalas.",
  },
  {
    year: "1937",
    title: "Mestre Bimba e a legalizacao",
    description:
      "Mestre Bimba funda a primeira academia oficial e cria a Capoeira Regional. Getulio Vargas reconhece a capoeira como esporte nacional.",
  },
  {
    year: "1941",
    title: "Mestre Pastinha e a Angola",
    description:
      "Mestre Pastinha assume o Centro Esportivo de Capoeira Angola, preservando as tradicoes mais antigas e a malicia do jogo baiano.",
  },
  {
    year: "2014",
    title: "Patrimonio da Humanidade",
    description:
      "A Roda de Capoeira e reconhecida pela UNESCO como Patrimonio Cultural Imaterial da Humanidade, consolidando seu valor global.",
  },
]
