export interface Testimonial {
  quote: string
  author: string
  role: string
}

export const testimonials: Testimonial[] = [
  {
    quote:
      "A capoeira me ensinou disciplina e respeito. Aqui encontrei uma segunda familia e aprendi que a ginga vai muito alem da luta, e um jeito de caminhar pela vida.",
    author: "Carlos Oliveira",
    role: "Aluno ha 8 anos",
  },
  {
    quote:
      "Quando o berimbau toca, o mundo la fora desaparece. E so eu, o jogo e a musica. Nao existe sensacao igual.",
    author: "Marina Costa",
    role: "Aluna ha 3 anos",
  },
  {
    quote:
      "Entrei sem saber nada e fui acolhido como se ja fosse da casa. A capoeira nao julga: ela transforma.",
    author: "Lucas Santos",
    role: "Aluno ha 2 anos",
  },
  {
    quote:
      "Meu filho comecou aos 6 anos. Hoje ele tem mais confianca, coordena e um respeito enorme pelos mais velhos. A capoeira formou o carater dele.",
    author: "Renata Souza",
    role: "Mae de aluno",
  },
]
