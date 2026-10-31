"use client";

import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

import MediaModal from "@/components/ui/MediaModal";

type Marco = {
  id: string;
  year: string;
  title: string;
  description: string;
  texto: string[];
  img: string;
  alt: string;
  fonte: string;
};

const TIMELINE_DATA: Marco[] = [
  {
    id: "01",
    year: "1948",
    title: "O tempo do sal",
    description:
      "No auge, cerca de 50 salinas movimentavam a economia da região.",
    texto: [
      "O nome do rio não é acaso. As salinas que ocuparam suas margens transformaram a paisagem e a vida de quem vivia da extração do sal.",
      "No fim da década de 1940, a região chegou a reunir cerca de cinquenta salinas em operação, com uma produção estimada em duzentas mil sacas por ano. O sal seguia para o mercado sergipano e para a conservação de alimentos.",
      "Com o declínio da atividade, restaram tanques, diques e o nome que o rio carrega até hoje.",
    ],
    img: "/images/timeline/historia-salinas.jpg",
    alt: "Monte de sal em uma salina, com uma máquina nivelando o sal",
    fonte:
      "Imagem ilustrativa: salinas de Areia Branca (RN). Foto: Rodrigo Sena / MTur Destinos (domínio público)",
  },
  {
    id: "02",
    year: "1951",
    title: "A queda do C-47",
    description:
      "Um Douglas C-47 caiu perto do estuário e matou os 33 ocupantes.",
    texto: [
      "Em 12 de julho de 1951, um Douglas C-47B da Linhas Aéreas Paulistas, prefixo PP-LPG, caiu nas proximidades do Rio do Sal.",
      "A aeronave levava 33 ocupantes e ninguém sobreviveu. Entre as vítimas estava o governador do Rio Grande do Norte, Dix-Sept Rosado, que retornava de uma viagem a Sergipe.",
      "O acidente marcou a memória do estado e passou a ser lembrado junto com a história do rio.",
    ],
    img: "/images/timeline/marco-1951-c47.jpg",
    alt: "Aviões Douglas C-47 em voo rebocando planadores, 1944",
    fonte: "Foto: U.S. Air Force (domínio público)",
  },
  {
    id: "03",
    year: "1952",
    title: "O saveiro do São Francisco",
    description:
      "Um saveiro com alunos e professoras afundou na travessia para Socorro.",
    texto: [
      "Em outubro de 1952, um saveiro que transportava alunos e professoras do Colégio São Francisco de Assis, no bairro Santo Antônio, afundou durante a travessia entre Aracaju e Nossa Senhora do Socorro.",
      "Cerca de 31 crianças e suas professoras morreram. As fontes divergem sobre o número exato de vítimas, mas o episódio é lembrado como um dos mais dolorosos da história do rio.",
      "A tragédia deixou marcas na relação das famílias ribeirinhas com a água.",
    ],
    img: "/images/timeline/marco-1952-saveiro.jpg",
    alt: "Canoas de madeira descansando na margem de um rio",
    fonte: "Foto: Glauco Umbelino (CC BY 2.0)",
  },
  {
    id: "04",
    year: "2023",
    title: "A mortandade",
    description:
      "Uma grande mortandade de peixes expôs a poluição por esgoto.",
    texto: [
      "Em 6 de março de 2023, uma grande mortandade de peixes foi registrada no Rio do Sal, em trechos entre Aracaju e Nossa Senhora do Socorro.",
      "O laudo da ADEMA, divulgado em 21 de março, apontou baixa concentração de oxigênio dissolvido, excesso de fósforo e alta presença de coliformes, indicando lançamento de esgoto doméstico sem tratamento.",
      "Sem oxigênio, os peixes não conseguem respirar. O episódio escancarou a urgência de saneamento, fiscalização e recuperação do estuário.",
    ],
    img: "/images/timeline/marco-2023-mortandade.jpg",
    alt: "Peixes mortos em um rio durante uma mortandade",
    fonte: "Foto: U.S. Fish and Wildlife Service (domínio público)",
  },
];

export default function HorizontalTimeline() {
  const targetRef = useRef<HTMLDivElement>(null);
  const [aberto, setAberto] = useState<number | null>(null);

  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"]);

  const marco = aberto === null ? null : TIMELINE_DATA[aberto];

  return (
    <section
      id="linha-do-tempo"
      ref={targetRef}
      className="relative h-[400vh] bg-[#EBEBE8] text-stone-900 selection:bg-stone-900 selection:text-white"
    >

      <div className="sticky top-0 flex h-screen items-center overflow-hidden">

        <motion.div style={{ x }} className="flex">

          {TIMELINE_DATA.map((item, index) => {
            return (
              <div
                key={item.id}
                className="flex h-screen w-screen shrink-0 items-center justify-center p-8 md:p-24 relative"
              >

                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-[0.03]">
                  <h2 className="font-serif text-[30vw] font-bold leading-none tracking-tighter">
                    {item.year}
                  </h2>
                </div>

                <button
                  type="button"
                  onClick={() => setAberto(index)}
                  aria-haspopup="dialog"
                  aria-label={`Ler a história de ${item.title}`}
                  className="grid grid-cols-1 md:grid-cols-12 gap-12 w-full max-w-[1600px] z-10 items-center text-left cursor-pointer group"
                >
                  <div className="md:col-span-5 flex flex-col justify-center">
                    <div className="overflow-hidden mb-6">
                      <h3 className="font-serif text-5xl md:text-7xl font-medium tracking-tight">
                        {item.title}
                      </h3>
                    </div>

                    <div className="flex gap-6 items-start mt-8">
                      <span className="text-xl font-bold font-serif border-b-2 border-stone-900 pb-1">
                        {item.year}
                      </span>
                      <p className="text-lg md:text-xl text-stone-600 leading-relaxed max-w-md font-sans">
                        {item.description}
                      </p>
                    </div>

                    <span className="mt-8 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-stone-900">
                      Ler a história
                      <span aria-hidden className="transition-transform group-hover:translate-x-1">
                        →
                      </span>
                    </span>
                  </div>

                  <div className="md:col-span-7 flex justify-end">
                    <div className="relative w-full aspect-[4/3] md:aspect-[16/10] overflow-hidden rounded-sm bg-stone-300">

                      <img
                        src={item.img}
                        alt={item.alt}
                        className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000 hover:scale-105"
                      />
                      <div className="absolute top-6 right-6 text-white text-sm font-bold tracking-widest uppercase mix-blend-difference">
                        No. {item.id}
                      </div>
                    </div>
                  </div>
                </button>

              </div>
            );
          })}

        </motion.div>
      </div>

      <MediaModal
        item={
          marco
            ? {
                img: marco.img,
                alt: marco.alt,
                titulo: marco.title,
                ano: marco.year,
                texto: marco.texto,
                fonte: marco.fonte,
              }
            : null
        }
        onClose={() => setAberto(null)}
      />
    </section>
  );
}
