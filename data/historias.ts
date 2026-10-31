export interface Historia {
  id: string
  titulo: string
  slug: string
  legenda: string
  imagem: string
  alt: string
  credito: string
  texto: string[]
}

export const historias: Historia[] = [
  {
    id: "1",
    titulo: "Rio do Sal",
    slug: "rio-do-sal",
    legenda: "O rio entre Aracaju e Nossa Senhora do Socorro",
    imagem: "/images/historias/historia-rio-do-sal.jpg",
    alt: "Vista aérea do Rio do Sal junto à ponte de acesso ao Conjunto João Alves Filho",
    credito: "zconti · CC BY-SA 4.0",
    texto: [
      "O Rio do Sal nasce nas imediações do encontro das rodovias BR-101 e BR-235, em Nossa Senhora do Socorro, e percorre cerca de 20,5 km até desaguar no Rio Sergipe, em cuja margem direita está situado. Sua bacia drena uma área de aproximadamente 62 km² e o curso d'água separa Aracaju do município de Socorro.",
      "Por causa da salinidade, não se trata de um manancial de água doce: o rio funciona como um canal de penetração das marés. Ainda assim, é o principal curso d'água da região e abastece bairros como Lamarão, Bugio, Soledade e Porto Dantas, além de sustentar a pesca, a extração de argila e a irrigação.",
      "Hoje é apontado como o rio mais poluído da Grande Aracaju, atingido por esgoto doméstico sem tratamento, rejeitos de fábricas e produtos aplicados em viveiros de camarão.",
    ],
  },
  {
    id: "2",
    titulo: "Manguezal",
    slug: "manguezal",
    legenda: "A floresta que vive entre a água doce e a salgada",
    imagem: "/images/historias/historia-manguezal.jpg",
    alt: "Manguezal verde às margens de um rio de água turva",
    credito: "Alberto Alerigi · CC BY 2.0",
    texto: [
      "Manguezal é a floresta que cresce na faixa onde o rio encontra o mar: um ambiente de água salobra, lama e maré. No Rio do Sal, essa vegetação acompanha boa parte das margens e avança pelo estuário.",
      "Poucas formações naturais são tão produtivas. O mangue é berçário de peixes, camarões e caranguejos, e serve de área de alimentação e descanso para aves e outros animais.",
      "As raízes também seguram o barranco e reduzem a erosão provocada pela maré, funcionando como uma proteção natural contra o avanço da água sobre a terra firme.",
    ],
  },
  {
    id: "3",
    titulo: "Raízes da maré",
    slug: "raizes-da-mare",
    legenda: "Como a floresta respira dentro da lama",
    imagem: "/images/historias/historia-raizes.jpg",
    alt: "Raízes aéreas de mangue emergindo da lama na maré baixa",
    credito: "Mural Nativo · CC BY-SA 4.0",
    texto: [
      "As árvores do mangue desenvolveram raízes aéreas, os pneumatóforos, que saem da lama para captar oxigênio quando a maré baixa. É o que permite à floresta sobreviver num solo alagado e pobre em ar.",
      "Algumas espécies, como o mangue-vermelho, soltam propágulos: sementes que já germinam penduradas na árvore e caem na lama prontas para se fixar.",
      "Essa adaptação explica por que o manguezal consegue viver num lugar onde o nível e a salinidade da água mudam duas vezes por dia.",
    ],
  },
  {
    id: "4",
    titulo: "Caranguejo-uçá",
    slug: "caranguejo-uca",
    legenda: "O crustáceo que sustenta famílias inteiras",
    imagem: "/images/historias/historia-caranguejo.jpg",
    alt: "Caranguejo-uçá na entrada da toca, em lama de manguezal",
    credito: "Leoadec · CC BY-SA 3.0",
    texto: [
      "O caranguejo-uçá (Ucides cordatus) vive nas tocas da lama do manguezal e é um dos principais símbolos da vida no estuário. Alimenta-se de folhas e detritos e passa boa parte do tempo dentro da própria galeria.",
      "A captura do uçá sustenta famílias inteiras de catadores e marisqueiras na Grande Aracaju. Durante a andada, período de reprodução em que os animais saem das tocas, a captura é proibida por lei para proteger a espécie.",
      "A poluição do rio e o desmatamento do mangue reduzem as áreas de reprodução e ameaçam diretamente essa fonte de renda.",
    ],
  },
  {
    id: "5",
    titulo: "Pesca artesanal",
    slug: "pesca-artesanal",
    legenda: "Canoas que ainda saem antes do sol nascer",
    imagem: "/images/historias/historia-pescadores.jpg",
    alt: "Dois pescadores recolhendo rede em canoa no rio",
    credito: "Rafael Gerude · CC BY-SA 4.0",
    texto: [
      "Antes do sol nascer, canoas ainda saem do Porto do Gringo, do povoado São Braz e de outras comunidades ribeirinhas para lançar redes no Rio do Sal e no Rio Sergipe.",
      "A pesca artesanal depende da maré: o horário de sair e de voltar é ditado pela água, e não pelo relógio. É um conhecimento passado de geração em geração.",
      "Quando o rio recebe esgoto sem tratamento, o pescado escasseia e a renda de quem vive dele cai, e o impacto ambiental chega direto à mesa de quem consome.",
    ],
  },
  {
    id: "6",
    titulo: "Salinas",
    slug: "salinas",
    legenda: "O sal que deu nome ao rio",
    imagem: "/images/historias/historia-salinas.jpg",
    alt: "Monte de sal branco ao lado de tanques de salina sob céu azul",
    credito: "Lucas Czapski Simoni · CC BY-SA 3.0",
    texto: [
      "O nome do rio vem das salinas que funcionaram em suas margens. O sal extraído ali foi, por décadas, uma das atividades econômicas da região.",
      "No auge, a área chegou a reunir dezenas de salinas em operação, abastecendo o mercado sergipano com sal de cozinha e para conservação de alimentos.",
      "Com o declínio da atividade, restaram tanques e vestígios na paisagem, e o nome que o rio carrega até hoje.",
    ],
  },
]
