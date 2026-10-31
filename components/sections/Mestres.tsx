"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { historias } from "@/data/historias";

const SPREAD = 0.53
const CARD_SIZE = 1.7

const TENSION_EASING = [0.22, 0.61, 0.36, 1] as const;
const TRANSITION_DURATION = 0.5;
const AUTO_ADVANCE_MS = 5000;

const PRESET_META: Record<number, { scale: number; z: number; brightness: number }> = {
  [-3]: { scale: 0.88, z: 20, brightness: 0.55 },
  [-2]: { scale: 0.90, z: 30, brightness: 0.70 },
  [-1]: { scale: 0.94, z: 40, brightness: 0.85 },
  [0]:  { scale: 1.00, z: 50, brightness: 1.00 },
  [1]:  { scale: 0.94, z: 40, brightness: 0.85 },
  [2]:  { scale: 0.90, z: 30, brightness: 0.70 },
  [3]:  { scale: 0.88, z: 20, brightness: 0.55 },
};

const getRelativePosition = (index: number, activeIndex: number, total: number) => {
  const half = Math.floor(total / 2);
  let diff = (index - activeIndex) % total;
  
  if (diff > half) diff -= total;
  if (diff < -half) diff += total;
  
  return diff;
};

export default function Mestres() {
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState(0);
  const total = historias.length;
  const [vw, setVw] = useState(0)
  const isMobile = vw > 0 && vw < 768
  const dragStart = useRef<{ x: number; y: number } | null>(null)
  const targetRef = useRef({ x: 0, y: 0 })
  const currentRef = useRef({ x: 0, y: 0 })
  const cursorRef = useRef<HTMLDivElement>(null!)
  const [cursorVisible, setCursorVisible] = useState(false)
  const frameRef = useRef<number>(0)

  useEffect(() => {
    const update = () => setVw(window.innerWidth)
    update()
    window.addEventListener("resize", update)
    return () => window.removeEventListener("resize", update)
  }, [])

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % total)
    }, AUTO_ADVANCE_MS)

    return () => window.clearInterval(intervalId)
  }, [total])

  const next = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % total);
  }, [total]);

  const prev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    dragStart.current = { x: e.clientX, y: e.clientY }
  }, [])

  const handlePointerUp = useCallback((e: React.PointerEvent) => {
    if (!dragStart.current) return
    const dx = e.clientX - dragStart.current.x
    dragStart.current = null
    if (Math.abs(dx) > 50) {
      dx > 0 ? prev() : next()
    }
  }, [next, prev])

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect()
    targetRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    }
  }, [])

  useEffect(() => {
    if (!cursorVisible) {
      currentRef.current = { x: 0, y: 0 }
      return
    }
    const animate = () => {
      currentRef.current.x += (targetRef.current.x - currentRef.current.x) * 0.12
      currentRef.current.y += (targetRef.current.y - currentRef.current.y) * 0.12
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(-50%, -50%) translate(${currentRef.current.x}px, ${currentRef.current.y}px)`
      }
      frameRef.current = requestAnimationFrame(animate)
    }
    frameRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(frameRef.current)
  }, [cursorVisible])

  const getPreset = useCallback((relPos: number) => {
    const meta = PRESET_META[relPos]
    if (!meta) return null

    if (isMobile) {
      if (Math.abs(relPos) > 1) return null
      const base = vw || 375
      const mobileSpread = 0.65
      const xValues: Record<number, number> = {
        [-1]: base * -(mobileSpread * 0.41),
        [0]:  0,
        [1]:  base * (mobileSpread * 0.41),
      }
      const wValues: Record<number, number> = {
        [-1]: base * 0.22 * CARD_SIZE,
        [0]:  base * 0.34 * CARD_SIZE,
        [1]:  base * 0.22 * CARD_SIZE,
      }
      return { x: xValues[relPos] ?? 0, w: wValues[relPos] ?? 0, ...meta }
    }

    const base = vw || 1920
    const xValues: Record<number, number> = {
      [-3]: base * -SPREAD,
      [-2]: base * -(SPREAD * 0.76),
      [-1]: base * -(SPREAD * 0.41),
      [0]:  0,
      [1]:  base * (SPREAD * 0.41),
      [2]:  base * (SPREAD * 0.76),
      [3]:  base * SPREAD,
    }
    const wValues: Record<number, number> = {
      [-3]: base * 0.08 * CARD_SIZE,
      [-2]: base * 0.10 * CARD_SIZE,
      [-1]: base * 0.14 * CARD_SIZE,
      [0]:  base * 0.20 * CARD_SIZE,
      [1]:  base * 0.14 * CARD_SIZE,
      [2]:  base * 0.10 * CARD_SIZE,
      [3]:  base * 0.08 * CARD_SIZE,
    }
    return { x: xValues[relPos] ?? 0, w: wValues[relPos] ?? 0, ...meta }
  }, [vw, isMobile])

  return (
    <section
      id="historias"
      className="relative flex min-h-[70vh] md:min-h-[80vh] w-full flex-col items-center justify-center overflow-hidden bg-white"
      aria-roledescription="carousel"
      aria-label="Imagens que contam história"
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
    >
      <div className="relative h-[420px] md:h-[650px] w-full" style={{ left: '50%' }}>
        <AnimatePresence initial={false}>
          {historias.map((historia, index) => {
            const relPos = getRelativePosition(index, activeIndex, total);
            const preset = getPreset(relPos);

            if (!preset) return null;

            const isActive = relPos === 0;

            return (
              <motion.div
                key={historia.id}
                className={`absolute top-1/2 flex items-center justify-center overflow-hidden ${isActive ? 'cursor-none' : 'cursor-pointer'} shadow-2xl`}
                onMouseMove={(e) => { if (isActive) handleMouseMove(e) }}
                onMouseEnter={() => setCursorVisible(isActive)}
                onMouseLeave={() => setCursorVisible(false)}
                initial={false}
                animate={{
                  x: `calc(-50% + ${preset.x}px)`,
                  y: "-50%",
                  width: preset.w,
                  height: isActive ? (isMobile ? 380 : 610) : (isMobile ? 340 : 560),
                  scale: preset.scale,
                  zIndex: preset.z,
                }}
                transition={{
                  duration: TRANSITION_DURATION,
                  ease: TENSION_EASING,
                }}
                onClick={() => {
                  if (isActive) {
                    router.push(`/historia/${historia.slug}`)
                  } else {
                    setActiveIndex(index);
                  }
                }}
                aria-hidden={!isActive}
                tabIndex={isActive ? 0 : -1}
              >
                <motion.img
                  src={historia.imagem}
                  alt={historia.alt}
                  className="absolute inset-0 h-full w-full object-cover"
                  animate={{
                    filter: `brightness(${preset.brightness})`,
                  }}
                  transition={{ duration: TRANSITION_DURATION, ease: TENSION_EASING }}
                />

                {!isActive && (
                  <motion.div 
                    className="absolute inset-0 bg-[#1E3746] mix-blend-multiply"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.45 }}
                    transition={{ duration: TRANSITION_DURATION }}
                  />
                )}

                {isActive && (
                  <>
                    <div
                      ref={cursorRef}
                      className={`absolute top-0 left-0 pointer-events-none z-30 transition-opacity duration-300 ${
                        cursorVisible ? 'opacity-100' : 'opacity-0'
                      }`}
                    >
                      <div className="flex items-center gap-3 bg-white/15 backdrop-blur-md rounded-full px-6 py-3 text-base text-white whitespace-nowrap border border-white/10 shadow-xl">
                        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                        <span className="font-semibold tracking-wide">Ver detalhes</span>
                      </div>
                    </div>

                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1, duration: 0.4 }}
                      className="absolute bottom-0 w-full flex h-[88px] flex-col items-center justify-center bg-gradient-to-b from-transparent via-black/70 to-black pb-2"
                    >
                      <h2 
                        className="text-[#FFD538] text-lg uppercase tracking-[2px]"
                        style={{ fontWeight: 700 }}
                      >
                        {historia.titulo}
                      </h2>
                      <p className="mt-0.5 max-w-[85%] text-center text-[11px] leading-tight text-white/70">
                        {historia.legenda}
                      </p>
                      <p className="mt-1 text-[9px] text-white/35">
                        {historia.credito}
                      </p>
                    </motion.div>
                  </>
                )}
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      <div className="z-50 mt-4 flex gap-4">
        <button 
          onClick={prev}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-stone-800 text-stone-800 transition-colors hover:bg-stone-800 hover:text-white"
          aria-label="Anterior"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button 
          onClick={next}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-stone-800 text-stone-800 transition-colors hover:bg-stone-800 hover:text-white"
          aria-label="Próximo"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </section>
  );
}