"use client"

import { useRef, useEffect, useState, type ReactNode } from "react"
import { motion, type Variants } from "framer-motion"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const CUBIC = [0.22, 1, 0.36, 1] as const

interface RevealProps {
  children: ReactNode
  className?: string
  as?: "div" | "section" | "article" | "span" | "header" | "figure"
  delay?: number
  duration?: number
  y?: number
  once?: boolean
}

export function Reveal({
  children,
  className = "",
  as = "div",
  delay = 0,
  duration = 0.8,
  y = 30,
  once = true,
}: RevealProps) {
  const Tag = motion[as as keyof typeof motion] as typeof motion.div

  return (
    <Tag
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "-40px" }}
      transition={{ duration, ease: CUBIC, delay }}
      className={className}
    >
      {children}
    </Tag>
  )
}

interface StaggerGroupProps {
  children: ReactNode
  className?: string
  as?: "div" | "section"
  staggerDelay?: number
  delayChildren?: number
}

const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

export function StaggerGroup({
  children,
  className = "",
  as = "div",
  staggerDelay = 0.1,
  delayChildren = 0,
}: StaggerGroupProps) {
  const Tag = motion[as as keyof typeof motion] as typeof motion.div

  return (
    <Tag
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerDelay,
            delayChildren,
          },
        },
      }}
      className={className}
    >
      {children}
    </Tag>
  )
}

const staggerChild: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: CUBIC },
  },
}

export function StaggerItem({
  children,
  className = "",
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <motion.div variants={staggerChild} className={className}>
      {children}
    </motion.div>
  )
}

interface EnterAnimationProps {
  children: ReactNode
  className?: string
  delay?: number
  duration?: number
}

export function EnterAnimation({
  children,
  className = "",
  delay = 0,
  duration = 0.8,
}: EnterAnimationProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration, ease: CUBIC, delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

interface EnterStaggerProps {
  children: ReactNode[]
  className?: string
  staggerDelay?: number
  baseDelay?: number
}

export function EnterStagger({
  children,
  className = "",
  staggerDelay = 0.15,
  baseDelay = 0.2,
}: EnterStaggerProps) {
  return (
    <div className={className}>
      {children.map((child, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            ease: CUBIC,
            delay: baseDelay + i * staggerDelay,
          }}
        >
          {child}
        </motion.div>
      ))}
    </div>
  )
}

interface ParallaxSectionProps {
  children: ReactNode
  bgImage: string
  className?: string
  speed?: number
  bgClassName?: string
}

export function ParallaxSection({
  children,
  bgImage,
  className = "",
  speed = 0.3,
  bgClassName = "",
}: ParallaxSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const bgRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const bg = bgRef.current
    if (!section || !bg) return

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: section,
        start: "top bottom",
        end: "bottom top",
        onUpdate: (self) => {
          gsap.set(bg, {
            y: self.progress * 200 * speed * -1,
          })
        },
      })
    }, section)

    return () => ctx.revert()
  }, [speed])

  return (
    <div ref={sectionRef} className={`relative overflow-hidden ${className}`}>
      <div
        ref={bgRef}
        className={`absolute inset-0 bg-cover bg-center will-change-transform ${bgClassName}`}
        style={{ backgroundImage: `url(${bgImage})`, scale: 1.3 }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  )
}

interface PinnedSectionProps {
  items: {
    id: string
    title: string
    subtitle?: string
    content: ReactNode
    image: string
  }[]
  className?: string
  imageClassName?: string
  listClassName?: string
}

export function PinnedSection({
  items,
  className = "",
  imageClassName = "",
  listClassName = "",
}: PinnedSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const listRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const section = sectionRef.current
    const image = imageRef.current
    if (!section || !image) return

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "bottom bottom",
        pin: image,
        pinSpacing: false,
      })

      const triggers = items.map((_, index) => {
        const triggerEl = listRef.current?.children[index] as HTMLElement
        if (!triggerEl) return null

        return ScrollTrigger.create({
          trigger: triggerEl,
          start: "top center",
          end: "bottom center",
          onEnter: () => setActiveIndex(index),
          onEnterBack: () => setActiveIndex(index),
        })
      })

      ScrollTrigger.refresh()
      return () => triggers.forEach((t) => t?.kill())
    }, section)

    return () => ctx.revert()
  }, [items])

  return (
    <div ref={sectionRef} className={`relative flex flex-col lg:flex-row gap-8 lg:gap-16 ${className}`}>
      <div
        ref={listRef}
        className={`flex-1 space-y-0 ${listClassName}`}
      >
        {items.map((item, index) => (
          <div
            key={item.id}
            data-index={index}
            className={`min-h-[50vh] flex flex-col justify-center p-6 transition-all duration-500 ${
              index === activeIndex
                ? "opacity-100 scale-100"
                : "opacity-40 scale-95"
            }`}
          >
            <span className="text-sm font-bold tracking-widest text-amber-600">
              {item.id}
            </span>
            <h3 className="font-display text-3xl md:text-4xl font-bold mt-2 text-stone-900">
              {item.title}
            </h3>
            {item.subtitle && (
              <p className="text-stone-500 font-medium mt-1">{item.subtitle}</p>
            )}
            <div className="mt-4 text-stone-700 leading-relaxed">
              {item.content}
            </div>
          </div>
        ))}
      </div>

      <div
        ref={imageRef}
        className={`lg:w-[45%] h-[50vh] lg:h-screen relative overflow-hidden rounded-2xl ${imageClassName}`}
      >
        {items.map((item, index) => (
          <motion.div
            key={item.id}
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${item.image})` }}
            initial={false}
            animate={{ opacity: index === activeIndex ? 1 : 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          />
        ))}
      </div>
    </div>
  )
}

export function RevealLink({
  href,
  children,
  className = "",
  delay = 0,
}: {
  href: string
  children: ReactNode
  className?: string
  delay?: number
}) {
  return (
    <motion.a
      href={href}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, ease: CUBIC, delay }}
      className={className}
    >
      {children}
    </motion.a>
  )
}
