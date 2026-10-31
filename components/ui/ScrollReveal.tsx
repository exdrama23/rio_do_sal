"use client"

import { useRef, useEffect, type ReactNode } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

interface StackedSectionProps {
  children: ReactNode;
  zIndex?: number; 
  className?: string;
  id?: string;
}

export default function StackedSection({ children, zIndex = -10, className = "", id }: StackedSectionProps) {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "bottom top",
        onUpdate: (self) => {
          const p = self.progress
          gsap.set(section, {
            scale: 1 - p * 0.08,
            opacity: 1 - p,
          })
        },
      })
    }, section)

    ScrollTrigger.refresh()

    return () => ctx.revert()
  }, [])

  return (
    <section 
      ref={sectionRef} 
      id={id}
      className={`sticky top-0 h-screen w-full overflow-hidden origin-top ${className}`}
      style={{ zIndex }}
    >
      {children}
    </section>
  )
}