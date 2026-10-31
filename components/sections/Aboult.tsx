"use client";

import React from "react";
import { motion } from "framer-motion";

const CUBIC_BEZIER = [0.76, 0, 0.24, 1] as const;

export default function AboutSection() {
  return (
    <section className="bg-white px-6 py-24 md:py-32 lg:px-12 w-full antialiased selection:bg-stone-200">
      <div className="mx-auto max-w-[1400px]">

        <h1 className="font-serif text-[3.5rem] leading-[1.05] tracking-tight text-stone-950 md:text-[5.5rem] lg:text-[7.5rem] max-w-[1200px] mb-16 md:mb-32 flex flex-col relative z-20">
          <motion.span
            initial={{ opacity: 0, y: 40, rotate: 2 }}
            whileInView={{ opacity: 1, y: 0, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: CUBIC_BEZIER }}
            className="block"
          >
            A memória do
          </motion.span>

          <motion.span
            initial={{ opacity: 0, y: 40, rotate: 2 }}
            whileInView={{ opacity: 1, y: 0, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: CUBIC_BEZIER, delay: 0.1 }}
            className="block"
          >
            Rio do Sal
          </motion.span>

          <motion.span
            initial={{ opacity: 0, y: 40, rotate: 2 }}
            whileInView={{ opacity: 1, y: 0, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: CUBIC_BEZIER, delay: 0.2 }}
            className="block"
          >
            em nossa história
          </motion.span>
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-x-8 gap-y-16 relative">
            
          <div className="md:col-span-5 lg:col-span-5 flex flex-col gap-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: CUBIC_BEZIER }}
              className="w-full aspect-[4/3] bg-stone-200 overflow-hidden rounded-sm shadow-lg relative group"
            >
              <img
                src="/images/historias/historia-salinas.jpg"
                alt="Antigas salinas que deram nome ao rio"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1.5s] ease-out grayscale"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.4, ease: CUBIC_BEZIER }}
              className="w-full aspect-[3/4] bg-stone-200 overflow-hidden rounded-sm relative top-12 shadow-2xl group"
            >
              <img
                src="/images/historia/jangada-ceara.jpg"
                alt="Embarcação tradicional do litoral nordestino"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1.5s] ease-out grayscale"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none" />
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.5, ease: CUBIC_BEZIER }}
                className="absolute bottom-8 left-8 right-8 z-20"
              >
                <p className="font-serif text-2xl text-emerald-50 leading-snug">
                  "Cuidar do nosso rio é proteger a própria história de Sergipe para o futuro."
                </p>
                <span className="text-xs font-bold uppercase tracking-widest mt-4 block text-emerald-500">
                  Conscientização Ambiental
                </span>
              </motion.div>
            </motion.div>
          </div>

          <div className="hidden lg:block lg:col-span-1"></div>

          <div className="md:col-span-7 lg:col-span-6 flex flex-col justify-center gap-8 font-sans text-stone-800 text-lg md:text-[1.25rem] leading-[1.7]">

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: CUBIC_BEZIER }}
            >
              Antes de ser lembrado pela poluição, o Rio do Sal foi conhecido pelo sal. Nas margens do estuário, as salinas transformaram a paisagem e deram nome ao rio: no auge da produção, a região chegou a reunir cerca de cinquenta salinas, que movimentavam a economia e sustentavam famílias ribeirinhas. O sal extraído ali abastecia mercados, empregava gerações e ajudou a formar os povoados que hoje vivem do rio.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.4, ease: CUBIC_BEZIER, delay: 0.2 }}
              className="w-full md:w-[110%] md:-ml-8 aspect-[16/9] bg-stone-200 my-4 overflow-hidden rounded-sm shadow-xl relative group"
            >
              <img
                src="/images/hero-rio-sergipe.jpg"
                alt="O Rio do Sal no encontro com o rio Sergipe"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1.5s] ease-out"
              />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: CUBIC_BEZIER }}
            >
              O rio também guarda páginas dolorosas. Em 12 de julho de 1951, um Douglas C-47 caiu nas proximidades do estuário e matou os 33 ocupantes, entre eles o governador do Rio Grande do Norte, Dix-Sept Rosado. Pouco mais de um ano depois, em outubro de 1952, um saveiro que levava alunos e professoras do Colégio São Francisco de Assis afundou na travessia entre Aracaju e Nossa Senhora do Socorro. A tragédia vitimou cerca de 31 crianças e suas professoras, uma ferida que a cidade carrega até hoje.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: CUBIC_BEZIER }}
            >
              Hoje, o Rio do Sal é o retrato de um conflito: de um lado, a memória e o sustento de quem vive dele; de outro, o esgoto doméstico e os rejeitos que chegam às suas águas. A educação ambiental é o caminho para reverter esse quadro: não jogar lixo, não lançar esgoto, cobrar saneamento. Cuidar do rio é proteger os animais, a natureza e a população que depende dele, e manter viva a história de Sergipe para as próximas gerações.

              <span className="mt-2 block text-xs font-medium uppercase tracking-widest text-stone-500">
                Fotos: DanielleCondoiselles (CC BY 4.0), Lucas Czapski Simoni (CC BY-SA 3.0) e LBM1948 (CC BY-SA 4.0)
              </span>
            </motion.p>

          </div>
        </div>
      </div>
    </section>
  );
}
