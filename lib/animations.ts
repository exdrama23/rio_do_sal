"use client"

import { useRef, useEffect, useState, useCallback, type RefObject } from "react"

export interface RevealOptions {
  threshold?: number
  rootMargin?: string
  once?: boolean
  staggerDelay?: number
}

export function useScrollReveal<T extends HTMLElement = HTMLDivElement>(options: RevealOptions = {}) {
  const { threshold = 0.2, rootMargin = "0px", once = true, staggerDelay = 0 } = options
  const ref = useRef<T>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          if (once) observer.unobserve(el)
        } else if (!once) {
          setIsVisible(false)
        }
      },
      { threshold, rootMargin }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold, rootMargin, once])

  const style = {
    opacity: 0,
    transform: "translateY(24px)",
    transition: `opacity 0.6s ease, transform 0.6s ease${staggerDelay ? ` ${staggerDelay}ms` : ""}`,
    ...(isVisible && { opacity: 1 as const, transform: "translateY(0)" }),
  }

  return { ref, isVisible, style }
}

export function useStaggerReveal<T extends HTMLElement = HTMLDivElement>(
  options: RevealOptions & { baseDelay?: number; itemDelay?: number } = {}
) {
  const { threshold = 0.1, rootMargin = "0px", once = true, baseDelay = 0, itemDelay = 100 } = options
  const containerRef = useRef<T>(null)
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set())

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const children = Array.from(container.children) as HTMLElement[]
    const observers: IntersectionObserver[] = []

    children.forEach((child, index) => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setTimeout(
              () => setVisibleItems((prev) => new Set(prev).add(index)),
              baseDelay + index * itemDelay
            )
            if (once) observer.unobserve(child)
          } else if (!once) {
            setVisibleItems((prev) => {
              const next = new Set(prev)
              next.delete(index)
              return next
            })
          }
        },
        { threshold, rootMargin }
      )
      observer.observe(child)
      observers.push(observer)
    })

    return () => observers.forEach((o) => o.disconnect())
  }, [threshold, rootMargin, once, baseDelay, itemDelay])

  const getItemProps = (index: number) => ({
    style: {
      opacity: 0,
      transform: "translateY(20px)",
      transition: `opacity 0.5s ease ${baseDelay + index * itemDelay}ms, transform 0.5s ease ${baseDelay + index * itemDelay}ms`,
      ...(visibleItems.has(index) && { opacity: 1 as const, transform: "translateY(0)" }),
    },
  })

  return { containerRef, getItemProps, visibleItems }
}

export function useParallax<T extends HTMLElement = HTMLDivElement>(speed: number = 0.3) {
  const ref = useRef<T>(null)
  const [offset, setOffset] = useState(0)
  const rafRef = useRef<number>(0)

  useEffect(() => {
    const handleScroll = () => {
      if (rafRef.current) return
      rafRef.current = requestAnimationFrame(() => {
        const el = ref.current
        if (!el) return
        const rect = el.getBoundingClientRect()
        const viewportCenter = window.innerHeight / 2
        const elementCenter = rect.top + rect.height / 2
        const distance = elementCenter - viewportCenter
        setOffset(distance * speed)
        rafRef.current = 0
      })
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()
    return () => {
      window.removeEventListener("scroll", handleScroll)
      cancelAnimationFrame(rafRef.current)
    }
  }, [speed])

  return { ref, offset }
}

export interface PinnedItem {
  id: string
  title: string
  subtitle?: string
  content: string
  image: string
}

export function useActivePinnedItem<T extends HTMLElement = HTMLDivElement>(
  items: PinnedItem[]
) {
  const containerRef = useRef<T>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const observersRef = useRef<IntersectionObserver[]>([])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    observersRef.current.forEach((o) => o.disconnect())

    const children = Array.from(container.children) as HTMLElement[]
    const observers = children.map((child, index) => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveIndex(index)
          }
        },
        { threshold: 0.4 }
      )
      observer.observe(child)
      return observer
    })

    observersRef.current = observers
    return () => observers.forEach((o) => o.disconnect())
  }, [items])

  return { containerRef, activeIndex, setActiveIndex }
}

export const entranceVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
      delay: 0.2 + i * 0.15,
    },
  }),
}

export const fadeUpVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
}

export const fadeInScaleVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
}

export const slideInLeftVariants = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
}

export const slideInRightVariants = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
}
