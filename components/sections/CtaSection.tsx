type EtapaProps = {
  numero: string
  titulo: string
  descricao: string
  tom?: "suja" | "limpa" | "neutro"
}

function Etapa({ numero, titulo, descricao, tom = "neutro" }: EtapaProps) {
  const cor =
    tom === "suja"
      ? "bg-amber-50"
      : tom === "limpa"
        ? "bg-emerald-50"
        : "bg-stone-100"

  return (
    <div className={`flex-1 rounded-2xl p-5 shadow-sm md:p-6 ${cor}`}>
      <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-500">
        {numero}
      </span>
      <h3 className="mt-2 text-lg font-semibold text-stone-900">{titulo}</h3>
      <p className="mt-1 text-sm leading-relaxed text-stone-600">{descricao}</p>
    </div>
  )
}

function Seta() {
  return (
    <div className="flex items-center justify-center" aria-hidden>
      <span className="rotate-90 text-xl text-stone-400 md:rotate-0 md:text-2xl">→</span>
    </div>
  )
}

export default function CtaSection() {
  return (
    <section id="contato" className="relative w-full bg-white px-6 py-24 md:py-32">
      <div className="mx-auto max-w-5xl">

        <div className="text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-emerald-700">
            Solução
          </span>
          <h2 className="mt-4 font-display text-4xl font-bold tracking-tight text-stone-900 md:text-6xl">
            Separar a água limpa da água suja
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-stone-600">
            A proposta é um sistema compacto em que o núcleo de tratamento fica
            isolado do restante do percurso. A água que chega do rio passa antes
            pela retenção de sólidos e pela decantação, e só então entra no
            núcleo, onde a matéria orgânica do esgoto é consumida. Na saída, a
            água é desinfectada e devolvida ao rio.
          </p>
        </div>

        <div className="mt md:p-8">
          <div className="flex flex-col items-stretch gap-3 md:flex-row md:items-stretch">
            <Etapa
              numero="01"
              titulo="Captação"
              descricao="A água do rio entra no sistema com a vazão controlada."
              tom="suja"
            />
            <Seta />
            <Etapa
              numero="02"
              titulo="Pré-tratamento"
              descricao="O gradeamento retém os sólidos e a decantação separa a areia e o lodo."
            />
            <Seta />
            <div className="flex-1 rounded-2xl bg-emerald-100 p-5 shadow-md shadow-emerald-600/10 md:p-6">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-500">
                03
              </span>
              <span className="mt-2 block text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-700">
                Núcleo isolado
              </span>
              <h3 className="mt-2 text-lg font-semibold text-stone-900">
                Filtro biológico
              </h3>
              <p className="mt-1 text-sm leading-relaxed text-stone-600">
                Bactérias e filtros consomem a matéria orgânica sem contato com o
                restante do percurso. Na saída, a água recebe desinfecção.
              </p>
            </div>
            <Seta />
            <Etapa
              numero="04"
              titulo="Água limpa"
              descricao="Retorna ao rio ou é reaproveitada em irrigação e limpeza."
              tom="limpa"
            />
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 pt-2 text-sm text-stone-600">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-500">
              Linha de resíduos
            </span>
            <span>sólidos e lodo retidos</span>
            <span className="text-stone-400">→</span>
            <span>separação</span>
            <span className="text-stone-400">→</span>
            <span>destinação adequada</span>
          </div>
        </div>

        <div className="mt-12 grid gap-6 text-left md:grid-cols-3">
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-widest text-stone-900">
              Por que isolar o núcleo
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-stone-600">
              Assim o tratamento acontece na origem do esgoto, sem devolver a
              carga poluidora ao estuário e sem misturar a água já limpa com a
              que ainda está suja.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-widest text-stone-900">
              O que isso evita
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-stone-600">
              A queda do oxigênio dissolvido na água, a causa da mortandade de
              peixes registrada no rio em 2023.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-widest text-stone-900">
              O que falta
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-stone-600">
              Saneamento básico, coleta regular de lixo, fiscalização e
              educação ambiental para que o sistema funcione de verdade.
            </p>
          </div>
        </div>

        <div className="mt-12 flex flex-wrap justify-center gap-4">
          <a
            href="#projeto"
            className="rounded-full bg-emerald-700 px-10 py-4 text-sm font-semibold uppercase tracking-wider text-white shadow-lg transition hover:bg-emerald-600"
          >
            Entender o projeto
          </a>
          <a
            href="#historias"
            className="rounded-full bg-stone-200 px-10 py-4 text-sm font-semibold uppercase tracking-wider text-stone-800 transition hover:bg-stone-300"
          >
            Ver as imagens
          </a>
        </div>

      </div>
    </section>
  )
}
