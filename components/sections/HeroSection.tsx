"use client";

import { motion } from "framer-motion";

const CUBIC_BEZIER = [0.76, 0, 0.24, 1] as const;

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15, 
      delayChildren: 0.2, 
    },
  },
};

const textRevealVariants = {
  hidden: { y: "120%", rotate: 2 }, 
  visible: { 
    y: "0%", 
    rotate: 0,
    transition: { duration: 1.2, ease: CUBIC_BEZIER } 
  },
};

const fadeUpVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 1, ease: CUBIC_BEZIER, delay: 0.8 } 
  },
};

export default function HeroSection() {
  return (
    <header id="inicio" className="relative min-h-screen w-full overflow-hidden bg-stone-950">

      <motion.div 
        className="absolute inset-y-0 right-0 w-[95%] overflow-hidden"
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
      >
        <img
          src="/images/hero-rio-sergipe.jpg"
          alt="Rio Sergipe visto de barco, com a ponte Aracaju-Barra dos Coqueiros ao fundo"
          className="h-full w-full object-cover object-center brightness-50 contrast-110 saturate-75"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-stone-950 via-stone-950/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/50 via-transparent to-stone-950/20" />
      </motion.div>

      <div className="mx-auto flex min-h-screen max-w-[1740px] items-center px-8 relative z-10">
        <motion.div 
          className="w-full max-w-1xl text-left"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="overflow-hidden pb-2 mb-4">
            <motion.p 
              variants={textRevealVariants}
              className="text-sm font-medium uppercase tracking-[0.3em] text-amber-600 origin-left"
            >
              Água &bull; Mangue &bull; Memória
            </motion.p>
          </div>

          <h1 className="font-display text-7xl font-bold leading-[0.95] tracking-tighter text-amber-50 md:text-[8rem] flex flex-col">
            <div className="overflow-hidden pb-4 -mb-4">
              <motion.span variants={textRevealVariants} className="block origin-bottom-left">
                O RIO
              </motion.span>
            </div>
            <div className="overflow-hidden pb-4 -mb-4">
              <motion.span 
                variants={textRevealVariants} 
                className="block text-transparent origin-bottom-left [-webkit-text-stroke:2px_theme(colors.amber.50)]"
              >
                DO SAL
              </motion.span>
            </div>
            <div className="overflow-hidden pb-4 -mb-4">
              <motion.span variants={textRevealVariants} className="block origin-bottom-left">
                RESISTE
              </motion.span>
            </div>
          </h1>

          <motion.p 
            variants={fadeUpVariants}
            className="mt-8 max-w-lg text-lg leading-relaxed text-stone-400"
          >
            Vinte quilômetros de água entre Aracaju e Nossa Senhora do Socorro.
            Nasce perto da BR-101, atravessa manguezais, deságua no Rio Sergipe
            e carrega o sal que lhe deu nome.
          </motion.p>

          <motion.div 
            variants={fadeUpVariants}
            className="mt-10 flex flex-wrap gap-4 justify-start"
          >
            <a href="#historias" className="rounded-full bg-amber-600 px-8 py-3 text-sm font-semibold uppercase tracking-wider text-white transition hover:bg-amber-500 hover:scale-105 active:scale-95">
              Conhecer o rio
            </a>
            <a href="#contato" className="rounded-full border border-amber-700/40 px-8 py-3 text-sm font-semibold uppercase tracking-wider text-amber-200 transition hover:border-amber-500 hover:text-amber-100 hover:bg-stone-900/50 hover:scale-105 active:scale-95">
              Participe
            </a>
          </motion.div>
        </motion.div>
      </div>

      <p className="pointer-events-none absolute bottom-5 right-8 z-20 hidden text-[10px] tracking-wide text-stone-500/70 md:block">
        Foto: DanielleCondoiselles &middot; CC BY 4.0
      </p>
    </header>
  );
}