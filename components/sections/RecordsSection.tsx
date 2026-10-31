"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { topicosProjeto } from "@/data/projeto";

const CUBIC_BEZIER = [0.22, 1, 0.36, 1] as const;

export default function RecordsSection() {
  const [ativo, setAtivo] = useState(0);
  const topico = topicosProjeto[ativo];

  return (
    <section
      id="projeto"
      className="relative min-h-screen w-full bg-[#09090B] text-stone-200 font-sans px-6 py-24 md:px-12 md:py-32 overflow-hidden selection:bg-white selection:text-black"
    >
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-stone-500/20 rounded-full blur-[120px] pointer-events-none"
      />

      <div className="mx-auto max-w-[1400px] relative z-10 flex flex-col gap-14">

        <div className="flex flex-col md:flex-row items-end justify-between gap-8">
          <div className="max-w-2xl">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: CUBIC_BEZIER }}
              className="text-6xl md:text-[5.5rem] leading-[1] tracking-tighter font-medium"
            >
              Sobre o projeto
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: CUBIC_BEZIER, delay: 0.1 }}
              className="mt-6 text-lg leading-relaxed text-stone-400"
            >
              Quatro camadas para entender o Rio do Sal: de onde ele vem, o que
              ele sustenta, o manguezal que o protege e a vida que ele abriga.
            </motion.p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: CUBIC_BEZIER, delay: 0.2 }}
            >
              <Link
                href="/galeria"
                className="flex items-center gap-3 px-8 py-4 rounded-full bg-white text-black font-semibold tracking-wide hover:scale-105 active:scale-95 transition-all"
              >
                Ver galeria
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: CUBIC_BEZIER, delay: 0.3 }}
            >
              <Link
                href="/historia/rio-do-sal"
                className="flex items-center gap-3 px-8 py-4 rounded-full border border-white/20 text-white font-semibold tracking-wide hover:bg-white/10 hover:scale-105 active:scale-95 transition-all"
              >
                Conhecer o rio
              </Link>
            </motion.div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center mt-4">

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: CUBIC_BEZIER }}
            className="lg:col-span-5 flex flex-col items-center justify-center"
          >
            <div className="relative w-full max-w-[420px] aspect-square rounded-full overflow-hidden border border-white/10 shadow-[0_0_60px_rgba(255,255,255,0.06)]">
              <motion.img
                key={topico.imagem}
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                src={topico.imagem}
                alt={topico.alt}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 rounded-full ring-1 ring-inset ring-white/10 pointer-events-none" />
            </div>

            <div className="mt-10 min-h-[10rem] w-full px-4 text-center">
              <motion.div
                key={topico.name}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: CUBIC_BEZIER }}
              >
                <span className="text-xs font-semibold uppercase tracking-[0.25em] text-emerald-400">
                  {topico.role}
                </span>
                <h3 className="mt-3 text-2xl md:text-3xl font-medium text-white tracking-tight">
                  {topico.name}
                </h3>
                <p className="mx-auto mt-3 max-w-sm text-base leading-relaxed text-stone-400">
                  {topico.description}
                </p>
              </motion.div>
            </div>
          </motion.div>

          <div className="lg:col-span-7 flex flex-col gap-2">
            {topicosProjeto.map((t, index) => {
              const isAtivo = index === ativo;

              return (
                <motion.button
                  key={t.name}
                  type="button"
                  onClick={() => setAtivo(index)}
                  aria-pressed={isAtivo}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, ease: CUBIC_BEZIER, delay: index * 0.08 }}
                  className={`group flex items-center justify-between gap-4 p-4 rounded-xl text-left transition-all cursor-pointer border ${
                    isAtivo
                      ? "bg-white/10 border-white/10"
                      : "hover:bg-white/5 border-transparent hover:border-white/5"
                  }`}
                >
                  <div className="flex items-center gap-6">
                    <div className="w-8 flex items-center justify-center">
                      {isAtivo ? (
                        <span className="h-2 w-2 rounded-full bg-emerald-400" />
                      ) : (
                        <span className="text-stone-500 font-medium">0{index + 1}</span>
                      )}
                    </div>

                    <div className="flex items-center gap-4">
                      <img
                        src={t.imagem}
                        alt=""
                        className="w-12 h-12 rounded-lg object-cover shadow-md group-hover:scale-105 transition-transform"
                      />
                      <div>
                        <h4 className={`text-base font-medium transition-colors ${isAtivo ? "text-white" : "text-stone-200 group-hover:text-white"}`}>
                          {t.name}
                        </h4>
                        <p className={`text-sm ${isAtivo ? "text-stone-300" : "text-stone-500"}`}>
                          {t.role}
                        </p>
                      </div>
                    </div>
                  </div>

                  <ArrowUpRight
                    className={`h-5 w-5 shrink-0 transition-colors ${isAtivo ? "text-white" : "text-stone-600 group-hover:text-white"}`}
                  />
                </motion.button>
              );
            })}
          </div>

        </div>

        <p className="text-xs uppercase tracking-widest text-stone-600">
          Fotos: DanielleCondoiselles (CC BY 4.0) · Rafael Gerude (CC BY-SA 4.0) · Alberto Alerigi (CC BY 2.0) · Leoadec (CC BY-SA 3.0)
        </p>
      </div>
    </section>
  );
}
