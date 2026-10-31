"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

const MOBILE_GRID = "w-full grid-flow-row-dense grid-cols-2 auto-rows-[160px]";

const DESKTOP_GRID = "md:w-max md:grid-flow-col-dense md:grid-cols-none md:grid-rows-[200px_200px_200px] md:auto-cols-[22vw] lg:auto-cols-[15vw]";


export type ImageItem = {
  id: string | number;
  title: string;
  desc: string;
  url: string;
  span: string; 
  category?: string;
  date?: string; 
};

export interface InteractiveImageBentoGalleryProps {
  imageItems: ImageItem[];
  title?: string;
  description?: string;
  className?: string;
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
};

function ImageModal({ item, onClose }: { item: ImageItem | null; onClose: () => void }) {
  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    const checkSize = () => setIsDesktop(window.innerWidth >= 768);
    checkSize();
    window.addEventListener("resize", checkSize);
    return () => window.removeEventListener("resize", checkSize);
  }, []);

  useEffect(() => {
    if (!item) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [item, onClose]);

  useEffect(() => {
    if (item) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => { document.body.style.overflow = prev; };
    }
  }, [item]);

  if (typeof window === "undefined") return null;

  const closeButtonDelay = isDesktop ? 1.4 : 0.3;

  return createPortal(
    <AnimatePresence>
      {item && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center overflow-y-auto bg-black/90 p-4 backdrop-blur-sm md:p-8"
          onClick={onClose}
          aria-modal="true"
          role="dialog"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative my-auto flex w-full max-w-[1400px] flex-col md:flex-row h-auto max-h-[90vh] md:h-[80vh] overflow-hidden rounded-[2rem] bg-[#121214] shadow-2xl p-4 md:p-8 gap-6 md:gap-12 border border-white/5"
          >
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: closeButtonDelay, duration: 0.4 }}
              onClick={onClose}
              aria-label="Fechar modal"
              className="absolute right-6 top-6 z-50 flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-full bg-black/50 text-stone-300 backdrop-blur-md transition-colors hover:bg-white/20 hover:text-white md:right-8 md:top-8 md:bg-white/5 md:text-stone-400"
            >
              <X className="h-5 w-5 md:h-6 md:w-6" />
            </motion.button>

            <motion.div
              initial={{ 
                x: isDesktop ? "50%" : "0%", 
                y: isDesktop ? "0%" : "0%", 
                opacity: 0, 
                scale: 0.9 
              }}
              animate={{ 
                x: isDesktop ? ["50%", "50%", "0%"] : "0%", 
                y: "0%",
                opacity: [0, 1, 1], 
                scale: [0.9, 1, 1] 
              }}
              transition={{ 
                duration: isDesktop ? 1.4 : 0.6,
                times: isDesktop ? [0, 0.4, 1] : [0, 1, 1], 
                ease: [0.22, 1, 0.36, 1] 
              }}
              className="relative z-20 min-h-0 shrink-0 w-full md:h-full md:w-1/2 overflow-hidden rounded-3xl bg-zinc-900 shadow-2xl"
              style={{ height: isDesktop ? undefined : "clamp(180px, 35vh, 420px)" }}
            >
              <img 
                src={item.url} 
                alt={item.title} 
                className="h-full w-full object-cover" 
                draggable={false} 
              />
            </motion.div>

            <div className="relative z-10 flex w-full flex-1 min-h-0 flex-col justify-between overflow-y-auto pr-2 md:h-full md:w-1/2 md:overflow-visible md:py-8 md:pr-16">
              <div className="flex flex-col gap-4 md:gap-6">
                
                <motion.h3
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: isDesktop ? 1.3 : 0.4, duration: 0.5, ease: "easeOut" }}
                  className="font-display text-2xl font-bold tracking-tight text-stone-100 md:text-5xl lg:text-6xl"
                >
                  {item.title}
                </motion.h3>

                <motion.p
                  variants={{
                    hidden: { opacity: 1 },
                    visible: {
                      opacity: 1,
                      transition: { staggerChildren: 0.015, delayChildren: isDesktop ? 1.5 : 0.6 },
                    },
                  }}
                  initial="hidden"
                  animate="visible"
                  className="text-sm leading-relaxed text-stone-400 md:text-lg lg:text-xl md:leading-loose"
                >
                  {item.desc.split("").map((char, index) => (
                    <motion.span
                      key={index}
                      variants={{
                        hidden: { opacity: 0 },
                        visible: { opacity: 1 },
                      }}
                    >
                      {char === " " ? "\u00A0" : char}
                    </motion.span>
                  ))}
                </motion.p>
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: isDesktop ? 1.3 : 0.4, duration: 0.5 }}
                className="mt-6 self-start pt-4 md:mt-auto md:self-end font-mono text-xs tracking-wider text-stone-500 md:text-lg pb-2 md:pb-0"
              >
                {item.date || "DATA INDISPONÍVEL"}
              </motion.div>

            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
export default function InteractiveImageBentoGallery({
  imageItems,
  title = "",
  description = "",
  className,
}: InteractiveImageBentoGalleryProps) {
  const [selected, setSelected] = useState<ImageItem | null>(null);

  return (
    <div className={cn("relative w-full md:w-max h-full", className)}>
      {(title || description) && (
        <div className="mx-auto mb-10 max-w-4xl text-center">
          {title && <h3 className="font-display text-3xl font-bold tracking-tight text-stone-100 md:text-4xl">{title}</h3>}
          {description && <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-stone-400 md:text-[15px]">{description}</p>}
        </div>
      )}

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className={cn("grid h-full gap-3 md:gap-4", MOBILE_GRID, DESKTOP_GRID)}
      >
        {imageItems.map((item) => (
          <motion.div
            key={item.id}
            variants={itemVariants}
            onClick={() => setSelected(item)}
            className={cn(
              "group relative cursor-pointer overflow-hidden rounded-xl border border-white/10 bg-[#121214] shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:border-white/15 hover:shadow-xl hover:shadow-black/40",
              item.span
            )}
          >
            <img
              src={item.url}
              alt={item.title}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
              draggable={false}
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-80 transition-opacity group-hover:opacity-90" />
            <div className="absolute inset-x-0 bottom-0 translate-y-4 p-3 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 md:p-4">
              <h4 className="line-clamp-1 font-display text-sm font-semibold text-white drop-shadow md:text-[15px]">{item.title}</h4>
              <p className="mt-0.5 line-clamp-1 text-xs text-stone-200/80">{item.desc}</p>
            </div>
            <div className="pointer-events-none absolute inset-0 rounded-xl opacity-0 ring-1 ring-amber-500/20 transition-opacity group-hover:opacity-100" />
          </motion.div>
        ))}
      </motion.div>

      <ImageModal item={selected} onClose={() => setSelected(null)} />
    </div>
  );
}