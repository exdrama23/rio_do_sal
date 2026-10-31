export type GalleryCategory = "Rio" | "Manguezal" | "Pesca" | "Sal";

export type GalleryImage = {
  id: string;
  title: string;
  desc: string;
  url: string;
  alt: string;
  ratio: string;
  category: GalleryCategory;
  texto: string[];
  credit: string;
};

export const galleryImages: GalleryImage[] = [
  {
    id: "01",
    title: "Rio do Sal",
    desc: "O rio que dá nome à história",
    url: "/images/galeria/rio-do-sal.jpg",
    ratio: "aspect-[3/2]",
    alt: "Trecho do Rio do Sal com vegetação nas margens",
    category: "Rio",
    texto: [
      "O Rio do Sal nasce perto do encontro das rodovias BR-101 e BR-235 e corre por cerca de 20 quilômetros até desaguar no rio Sergipe.",
      "Apesar do nome, o rio não é salgado por natureza. A salinidade vem da influência das marés, que sobem pelo estuário e alcançam o baixo curso.",
    ],
    credit: "Foto: Wikimedia Commons",
  },
  {
    id: "02",
    title: "O rio Sergipe",
    desc: "O encontro que forma o estuário",
    url: "/images/galeria/rio-sergipe-aracaju.jpg",
    ratio: "aspect-[16/9]",
    alt: "Vista do rio Sergipe na orla de Aracaju, com a ponte ao fundo",
    category: "Rio",
    texto: [
      "O Rio do Sal é afluente do rio Sergipe. A foz fica na altura da capital, onde a água doce se mistura à água salgada que entra com a maré.",
      "É nesse encontro que se forma o estuário, ambiente de transição que sustenta manguezais, berçários de peixes e a pesca artesanal.",
    ],
    credit: "Foto: Paul R. Burley (CC BY-SA 4.0)",
  },
  {
    id: "03",
    title: "Raízes do manguezal",
    desc: "O berçário que segura a margem",
    url: "/images/galeria/manguezal-raizes.jpg",
    ratio: "aspect-[3/2]",
    alt: "Raízes aéreas de mangue dentro da água",
    category: "Manguezal",
    texto: [
      "As raízes aéreas do mangue funcionam como filtro e como abrigo. Entre elas vivem caranguejos, camarões, moluscos e peixes jovens.",
      "O manguezal também protege a margem da erosão e ajuda a manter a água mais limpa, um serviço que a poluição coloca em risco.",
    ],
    credit: "Foto: Wilfredor (CC0)",
  },
  {
    id: "04",
    title: "Caranguejo no mangue",
    desc: "Vida que depende da maré",
    url: "/images/galeria/caranguejo.jpg",
    ratio: "aspect-[9/16]",
    alt: "Caranguejo em água rasa entre raízes de mangue",
    category: "Manguezal",
    texto: [
      "O caranguejo é um dos símbolos do manguezal e fonte de renda para muitas famílias ribeirinhas.",
      "Sua presença depende da qualidade da água e da conservação do mangue, dois pontos frágeis no Rio do Sal.",
    ],
    credit: "Foto: Chamila1974 (CC BY-SA 4.0)",
  },
  {
    id: "05",
    title: "Barcos de pesca",
    desc: "A pesca artesanal no estuário",
    url: "/images/galeria/barcos-pesca.jpg",
    ratio: "aspect-[4/3]",
    alt: "Barcos de pesca coloridos ancorados junto ao manguezal",
    category: "Pesca",
    texto: [
      "A pesca artesanal acompanha a maré: sai cedo e volta com o que o estuário oferece.",
      "Quando o rio recebe esgoto sem tratamento, o esforço de quem vive da água encontra menos peixe e mais risco.",
    ],
    credit: "Foto: N4CH77 (CC BY-SA 4.0)",
  },
  {
    id: "06",
    title: "Salinas",
    desc: "Os tanques que deram nome ao rio",
    url: "/images/galeria/salinas-aereo.jpg",
    ratio: "aspect-[16/9]",
    alt: "Vista aérea de tanques de evaporação de sal próximos ao mar",
    category: "Sal",
    texto: [
      "Nas salinas, a água do mar é represada em tanques rasos e evapora ao sol até o sal cristalizar.",
      "No auge da atividade, a região do Rio do Sal reuniu cerca de cinquenta salinas, com produção estimada em duzentas mil sacas por ano.",
    ],
    credit: "Imagem ilustrativa: Salinas de Janubio. Foto: Miljenko Suljic (CC BY-SA 4.0)",
  },
  {
    id: "07",
    title: "O trabalho no sal",
    desc: "A memória de quem viveu da extração",
    url: "/images/galeria/salineiros.jpg",
    ratio: "aspect-[3/2]",
    alt: "Monumento em homenagem aos salineiros, com tanques de sal ao fundo",
    category: "Sal",
    texto: [
      "O sal foi trabalho de sol a sol: raspar, empilhar, carregar e transportar.",
      "Com o declínio das salinas, restaram os tanques, os diques e a memória dos salineiros.",
    ],
    credit: "Imagem ilustrativa: monumento aos salineiros de Janubio. Foto: Mike Peel (CC BY-SA 4.0)",
  },
  {
    id: "08",
    title: "A orla do rio",
    desc: "A cidade e a água",
    url: "/images/galeria/orla.jpg",
    ratio: "aspect-[8/5]",
    alt: "Calçadão e pequenos barcos na margem do rio",
    category: "Rio",
    texto: [
      "A ocupação das margens mudou a relação do rio com a cidade. Calçadões, aterros e ruas avançaram sobre a várzea.",
      "Recuperar o Rio do Sal passa também por devolver espaço à água e tratar o esgoto que chega até ela.",
    ],
    credit: "Foto: GLandovsky (CC BY-SA 4.0)",
  },
];
