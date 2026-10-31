import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { historias } from "@/data/historias"

export function generateStaticParams() {
  return historias.map((h) => ({ slug: h.slug }))
}

export default async function HistoriaPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const historia = historias.find((h) => h.slug === slug)
  if (!historia) notFound()

  return (
    <div className="min-h-dvh bg-stone-950 font-sans">
      <header className="fixed top-0 z-50 flex h-16 w-full items-center justify-between bg-stone-950/90 px-6 backdrop-blur-sm md:px-12">
        <Link
          href="/#historias"
          className="font-display text-lg tracking-wider text-amber-600 transition-colors hover:text-amber-400"
        >
          Rio do Sal
        </Link>
        <Link
          href="/#historias"
          className="text-sm uppercase tracking-[2px] text-stone-400 transition-colors hover:text-amber-600"
        >
          Voltar
        </Link>
      </header>

      <main className="grid min-h-dvh grid-cols-1 pt-16 md:grid-cols-2">
        <div className="flex items-center justify-center bg-[#1a3a2a] p-8 md:p-16">
          <div className="relative aspect-[4/3] w-full max-w-[560px] overflow-hidden shadow-2xl">
            <Image
              src={historia.imagem}
              alt={historia.alt}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

        <div className="flex flex-col justify-center bg-stone-950 p-8 md:p-16">
          <h1 className="font-display text-4xl leading-tight text-amber-600 md:text-5xl">
            {historia.titulo}
          </h1>

          <p className="mt-3 font-sans text-sm uppercase tracking-[3px] text-amber-400/80">
            {historia.legenda}
          </p>

          <div className="mt-8 space-y-4 border-t border-stone-800 pt-8">
            {historia.texto.map((paragrafo, i) => (
              <p key={i} className="font-sans text-base leading-relaxed text-stone-300">
                {paragrafo}
              </p>
            ))}
          </div>

          <div className="mt-auto flex items-center gap-4 pt-12">
            <span className="font-sans text-[11px] text-stone-600">
              Foto: {historia.credito}
            </span>
            <Link
              href="/#historias"
              className="ml-auto font-sans text-xs uppercase tracking-[2px] text-stone-500 transition-colors hover:text-amber-600"
            >
              Todas as imagens
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
