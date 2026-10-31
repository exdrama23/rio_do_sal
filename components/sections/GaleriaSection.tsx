"use client";

import { useState } from "react";
import { motion } from "framer-motion";

import MediaModal from "@/components/ui/MediaModal";
import { galleryImages } from "@/data/gallery";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function GaleriaSection() {
  const [aberto, setAberto] = useState<number | null>(null);

  const selecionada = aberto === null ? null : galleryImages[aberto];

  return (
    <section
      id="galeria"
      className="relative w-full scroll-mt-20 bg-[#09090B] px-6 py-24 font-sans text-stone-100 selection:bg-amber-500 selection:text-zinc-900 md:py-32"
    >
      <div className="mx-auto w-full max-w-7xl">
        <div className="max-w-3xl">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="text-xs uppercase tracking-[0.35em] text-amber-400/80"
          >
            Galeria
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.05 }}
            className="mt-4 font-serif text-4xl font-medium leading-[1.05] tracking-tight md:text-6xl"
          >
            O rio em imagens
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.15 }}
            className="mt-6 max-w-xl text-base leading-relaxed text-stone-400"
          >
            Sal, mangue, pesca e cidade convivem no mesmo curso d&apos;água.
            Toque em uma imagem para ler o que ela conta.
          </motion.p>
        </div>

        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.2 }}
          className="mt-10 h-px w-full origin-left bg-gradient-to-r from-amber-500/50 via-white/10 to-transparent"
        />

        <div className="mt-10 columns-1 gap-4 sm:columns-2 md:gap-5 lg:columns-3">
          {galleryImages.map((imagem, index) => (
            <motion.div
              key={imagem.id}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.7, ease: EASE }}
              className="mb-4 break-inside-avoid md:mb-5"
            >
              <button
                type="button"
                onClick={() => setAberto(index)}
                aria-haspopup="dialog"
                aria-label={`Abrir a imagem ${imagem.title}`}
                className={`group relative block w-full cursor-pointer overflow-hidden rounded-xl bg-stone-900 text-left ring-1 ring-white/5 transition-shadow duration-500 hover:shadow-2xl hover:shadow-black/60 ${imagem.ratio}`}
              >
                <img
                  src={imagem.url}
                  alt={imagem.alt}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]"
                />

                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-100" />

                <span className="absolute left-3 top-3 rounded-full bg-black/45 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-stone-200 backdrop-blur-sm md:left-4 md:top-4">
                  {imagem.category}
                </span>

                <div className="absolute inset-x-0 bottom-0 p-4 md:p-5">
                  <h3 className="font-serif text-lg font-medium leading-tight text-white md:text-xl">
                    {imagem.title}
                  </h3>
                  <p className="mt-1 max-w-[28ch] text-xs leading-snug text-stone-300/90 md:text-sm">
                    {imagem.desc}
                  </p>
                  <span className="mt-3 inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-amber-300/90 opacity-0 transition-all duration-500 group-hover:opacity-100">
                    Ver detalhes
                    <span aria-hidden className="transition-transform duration-500 group-hover:translate-x-1">
                      →
                    </span>
                  </span>
                </div>
              </button>
            </motion.div>
          ))}
        </div>

        <p className="mt-12 max-w-4xl text-[11px] uppercase leading-relaxed tracking-[0.16em] text-stone-600">
          Fotografias: acervo do projeto, Paul R. Burley, Wilfredor, Chamila1974,
          N4CH77, GLandovsky, Miljenko Suljic e Mike Peel, via Wikimedia Commons.
          Imagens de salinas são ilustrativas (Janubio, Lanzarote).
        </p>
      </div>

      <MediaModal
        item={
          selecionada
            ? {
                img: selecionada.url,
                alt: selecionada.alt,
                titulo: selecionada.title,
                categoria: selecionada.category,
                texto: selecionada.texto,
                fonte: selecionada.credit,
              }
            : null
        }
        onClose={() => setAberto(null)}
      />
    </section>
  );
}
