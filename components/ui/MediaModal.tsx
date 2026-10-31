"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

export type MediaItem = {
  img: string;
  alt: string;
  titulo: string;
  ano?: string;
  categoria?: string;
  texto: string[];
  fonte?: string;
};

const EASE = [0.22, 1, 0.36, 1] as const;

export default function MediaModal({
  item,
  onClose,
}: {
  item: MediaItem | null;
  onClose: () => void;
}) {
  const painelRef = useRef<HTMLDivElement>(null);
  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    const checkSize = () => setIsDesktop(window.innerWidth >= 768);
    checkSize();
    window.addEventListener("resize", checkSize);
    return () => window.removeEventListener("resize", checkSize);
  }, []);

  useEffect(() => {
    if (!item) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    const anterior = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    painelRef.current?.focus();

    return () => {
      document.body.style.overflow = anterior;
      window.removeEventListener("keydown", onKey);
    };
  }, [item, onClose]);

  if (typeof document === "undefined") return null;

  const delayImagem = isDesktop ? 1.4 : 0.6;
  const delayTitulo = isDesktop ? 1.3 : 0.4;
  const delayTexto = isDesktop ? 1.5 : 0.6;
  const delayBotao = isDesktop ? 1.4 : 0.3;

  return createPortal(
    <AnimatePresence>
      {item && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[400] flex items-center justify-center overflow-y-auto overscroll-contain bg-black/90 p-4 backdrop-blur-sm md:p-8"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-labelledby="media-modal-titulo"
        >
          <motion.div
            ref={painelRef}
            tabIndex={-1}
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.4, ease: EASE }}
            onClick={(e) => e.stopPropagation()}
            className="relative my-auto flex h-auto max-h-[90vh] w-full max-w-[1400px] flex-col gap-6 overflow-hidden rounded-[2rem] border border-white/5 bg-[#121214] p-4 shadow-2xl outline-none md:h-[80vh] md:flex-row md:gap-12 md:p-8"
          >
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: delayBotao, duration: 0.4 }}
              onClick={onClose}
              aria-label="Fechar"
              className="absolute right-6 top-6 z-50 flex h-10 w-10 items-center justify-center rounded-full bg-black/50 text-stone-300 backdrop-blur-md transition-colors hover:bg-white/20 hover:text-white md:right-8 md:top-8 md:h-12 md:w-12 md:bg-white/5 md:text-stone-400"
            >
              <X className="h-5 w-5 md:h-6 md:w-6" />
            </motion.button>

            <motion.div
              key={item.img}
              initial={{
                x: isDesktop ? "50%" : "0%",
                opacity: 0,
                scale: 0.9,
              }}
              animate={{
                x: isDesktop ? ["50%", "50%", "0%"] : "0%",
                opacity: [0, 1, 1],
                scale: [0.9, 1, 1],
              }}
              transition={{
                duration: delayImagem,
                times: isDesktop ? [0, 0.4, 1] : [0, 1, 1],
                ease: EASE,
              }}
              className="relative z-20 min-h-0 w-full shrink-0 overflow-hidden rounded-3xl bg-zinc-900 shadow-2xl md:h-full md:w-1/2"
              style={{ height: isDesktop ? undefined : "clamp(180px, 35vh, 420px)" }}
            >
              <img
                src={item.img}
                alt={item.alt}
                className="h-full w-full object-cover"
                draggable={false}
              />

              {item.ano && (
                <span className="absolute left-4 top-4 rounded-full bg-black/50 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-amber-200 backdrop-blur-md md:left-6 md:top-6">
                  {item.ano}
                </span>
              )}
            </motion.div>

            <div className="relative z-10 flex min-h-0 w-full flex-1 flex-col overflow-y-auto overscroll-contain pr-2 md:h-full md:w-1/2 md:py-6 md:pr-10">
              <div className="flex flex-col gap-4 md:gap-6">
                <motion.h3
                  id="media-modal-titulo"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: delayTitulo, duration: 0.5, ease: "easeOut" }}
                  className="font-serif text-2xl font-medium tracking-tight text-stone-100 md:text-4xl lg:text-5xl"
                >
                  {item.titulo}
                </motion.h3>

                {item.categoria && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: delayTitulo, duration: 0.5 }}
                    className="text-xs uppercase tracking-[0.25em] text-amber-400/80"
                  >
                    {item.categoria}
                  </motion.p>
                )}

                <div className="flex flex-col gap-4 md:gap-5">
                  {item.texto.map((paragrafo, index) => (
                    <motion.p
                      key={`${index}-${paragrafo.slice(0, 12)}`}
                      variants={{
                        hidden: { opacity: 1 },
                        visible: {
                          opacity: 1,
                          transition: {
                            staggerChildren: 0.012,
                            delayChildren: delayTexto + index * 0.35,
                          },
                        },
                      }}
                      initial="hidden"
                      animate="visible"
                      className="whitespace-normal break-words text-sm leading-relaxed text-stone-400 md:text-base md:leading-relaxed"
                    >
                      {paragrafo.split("").map((char, charIndex) => (
                        <motion.span
                          key={charIndex}
                          variants={{
                            hidden: { opacity: 0 },
                            visible: { opacity: 1 },
                          }}
                        >
                          {char === " " ? " " : char}
                        </motion.span>
                      ))}
                    </motion.p>
                  ))}
                </div>
              </div>

              {item.fonte && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: delayTitulo + 0.3, duration: 0.5 }}
                  className="mt-6 shrink-0 self-start border-t border-white/10 pt-4 text-[11px] uppercase tracking-[0.18em] text-stone-500 md:mt-auto md:self-end md:text-right"
                >
                  {item.fonte}
                </motion.div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
