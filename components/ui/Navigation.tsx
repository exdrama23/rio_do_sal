"use client"

import { useState, useEffect } from "react"
import { navItems } from "@/data/navigation"

export default function Navigation() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [ativo, setAtivo] = useState("inicio")

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("hashchange", onScroll)
    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("hashchange", onScroll)
    }
  }, [])

  useEffect(() => {
    const secoes = navItems
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => Boolean(el))

    if (!secoes.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visivel = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]

        if (visivel) setAtivo(visivel.target.id)
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: [0, 0.25, 0.5, 1] }
    )

    secoes.forEach((secao) => observer.observe(secao))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [open])

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-200 transition-all duration-300 ${
          scrolled ? "bg-stone-950/90 backdrop-blur-md shadow-xl shadow-black/20" : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <a
            href="#"
            className="relative z-50 flex flex-col leading-none text-amber-50"
            aria-label="Rio do Sal, ir para o início"
          >
            <span className="font-display text-lg font-bold tracking-[0.2em] md:text-xl">
              RIO DO SAL
            </span>
            <span className="mt-1 text-[9px] uppercase tracking-[0.3em] text-amber-200/60">
              Aracaju · Sergipe
            </span>
          </a>

          <div className="hidden items-center gap-7 md:flex">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={item.href}
                aria-current={ativo === item.id ? "true" : undefined}
                className={`relative text-xs uppercase tracking-widest transition-colors after:absolute after:-bottom-1 after:left-0 after:h-px after:bg-amber-500 after:transition-all after:duration-300 hover:after:w-full ${
                  ativo === item.id
                    ? "text-amber-400 after:w-full"
                    : "text-stone-400 hover:text-amber-400 after:w-0"
                }`}
              >
                {item.label}
              </a>
            ))}
            <a
              href="#contato"
              className="rounded-full border border-amber-700/50 px-5 py-2 text-xs uppercase tracking-wider text-amber-300 transition-colors hover:border-amber-500 hover:text-amber-100"
            >
              Ver solução
            </a>
          </div>

          <button
            onClick={() => setOpen(!open)}
            className="relative z-50 flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden focus:outline-none"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            aria-expanded={open}
          >
            <span
              className={`block h-px w-6 bg-amber-200 transition-transform duration-300 ease-in-out ${
                open ? "translate-y-2 rotate-45" : ""
              }`}
            />
            <span
              className={`block h-px w-6 bg-amber-200 transition-opacity duration-300 ease-in-out ${
                open ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block h-px w-6 bg-amber-200 transition-transform duration-300 ease-in-out ${
                open ? "-translate-y-[9px] -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </nav>

      <div
        className={`fixed inset-0 z-100 flex flex-col justify-between bg-stone-950 px-6 pb-12 pt-32 md:hidden transition-all duration-700 ease-[cubic-bezier(0.76,0,0.24,1)]`}
        style={{
          clipPath: open ? "circle(150% at calc(100% - 3rem) 3rem)" : "circle(0% at calc(100% - 3rem) 3rem)",
          pointerEvents: open ? "auto" : "none",
        }}
        aria-hidden={!open}
      >
        <div className="flex flex-col gap-5">
          {navItems.map((item, index) => (
            <div key={item.id} className="overflow-hidden">
              <a
                href={item.href}
                onClick={() => setOpen(false)}
                className={`group flex items-center gap-4 font-display text-3xl font-light tracking-tight transition-all duration-500 ${
                  ativo === item.id
                    ? "text-amber-400 translate-y-0 opacity-100"
                    : "text-stone-300 hover:text-amber-400"
                } ${
                  open ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
                }`}
                style={{
                  transitionDelay: open ? `${100 + index * 100}ms` : "0ms",
                }}
              >
                <span className="h-0.5 w-0 bg-amber-500 transition-all duration-300 group-hover:w-8" />
                {item.label}
              </a>
            </div>
          ))}
        </div>

        <div
          className={`flex flex-col gap-8 border-t border-stone-800 pt-8 transition-all duration-700 ${
            open ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
          style={{ transitionDelay: open ? "500ms" : "0ms" }}
        >
          <a
            href="#contato"
            onClick={() => setOpen(false)}
            className="inline-flex w-fit items-center justify-center rounded-full bg-amber-500 px-8 py-4 text-sm font-bold uppercase tracking-wider text-stone-950 transition-transform hover:scale-105 active:scale-95"
          >
            Ver solução
          </a>

          <p className="text-xs uppercase leading-relaxed tracking-[0.2em] text-stone-500">
            Rio do Sal · Aracaju, Sergipe
          </p>
        </div>
      </div>
    </>
  )
}
