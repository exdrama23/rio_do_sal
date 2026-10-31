# Animações — Landing Page Capoeira Sete Quedas

Este documento explica as 5 técnicas de animação identificadas no vídeo de referência (restaurante com scroll longo) e como cada uma foi ou pode ser aplicada neste projeto.

---

## 1. Entrada da Hero (no carregamento)

**O que faz:** Elementos aparecem em sequência com fade + translateY ascendente, cada um com um pequeno atraso em relação ao anterior (stagger).

**Onde já usamos:** `HeroSection.tsx` usa `framer-motion` com `staggerChildren: 0.15`. O badge, título, parágrafo e CTA entram um após o outro.

**Como usar em qualquer seção:**

```tsx
// Exemplo: botão de CTA com entrada atrasada
import { EnterAnimation, EnterStagger } from "@/components/ui/Animations"

<EnterStagger baseDelay={0.3} staggerDelay={0.15}>
  <h1>Gingando Liberdade</h1>
  <p>Mais do que uma luta...</p>
  <a href="#contato">Participe</a>
</EnterStagger>

// Ou um único elemento:
<EnterAnimation delay={0.5}>
  <Badge>Grand Opening</Badge>
</EnterAnimation>
```

---

## 2. Revelação por scroll (fade-up)

**O que faz:** Cada seção aparece ao entrar na viewport — os elementos sobem (translateY) e ganham opacidade. É a base de quase todo site com scroll reveal.

**Onde já usamos:** `Aboult.tsx`, `RecordsSection.tsx` usam `whileInView` do framer-motion nos títulos, textos e imagens.

**Como usar:**

```tsx
import { Reveal, StaggerGroup, StaggerItem } from "@/components/ui/Animations"

// Elemento único
<Reveal delay={0.2}>
  <h2 className="font-display text-5xl">Nossa História</h2>
</Reveal>

// Grupo com stagger (cada filho aparece em sequência)
<StaggerGroup staggerDelay={0.12}>
  <StaggerItem><Card /></StaggerItem>
  <StaggerItem><Card /></StaggerItem>
  <StaggerItem><Card /></StaggerItem>
</StaggerGroup>

// Ou com o hook para CSS puro (sem framer-motion)
import { useScrollReveal } from "@/lib/animations"

function Card() {
  const { ref, style } = useScrollReveal({ threshold: 0.3 })
  return <div ref={ref} style={style}>...</div>
}
```

**Aplicação concreta na galeria:**

```tsx
// GaleriaSection poderia usar StaggerGroup para as imagens
<StaggerGroup staggerDelay={0.08}>
  {images.map((img) => (
    <StaggerItem key={img.id}>
      <div className="rounded-2xl overflow-hidden bg-stone-200">
        {/* imagem */}
      </div>
    </StaggerItem>
  ))}
</StaggerGroup>
```

---

## 3. Lista fixa + imagem trocando (scrollytelling)

**O que faz:** Uma coluna de conteúdo rola enquanto uma imagem ao lado fica fixa na tela (pin). Conforme cada item da lista passa pelo centro da viewport, a imagem faz crossfade para o prato correspondente. É o efeito mais sofisticado do vídeo.

**Onde usar no projeto:** Ideal para seções como "Mestres" (foto do mestre fixa enquanto a biografia rola), "Instrumentos" (imagem fixa com descrição de cada instrumento), ou "História" (linha do tempo com imagem fixa).

**Como usar:**

```tsx
import { PinnedSection } from "@/components/ui/Animations"

// Exemplo: Mestres com foto fixa e biografia rolável
<PinnedSection
  items={[
    {
      id: "01",
      title: "Mestre Coragem",
      subtitle: "Fundador, 1988",
      content: <p>Fundou a Associação em Nossa Senhora do Socorro...</p>,
      image: "/mestre-coragem.jpg",
    },
    {
      id: "02",
      title: "Mestre João",
      subtitle: "Discípulo, 1995",
      content: <p>João entrou na roda aos 12 anos...</p>,
      image: "/mestre-joao.jpg",
    },
    {
      id: "03",
      title: "Mestra Maria",
      subtitle: "Primeira Mestra, 2002",
      content: <p>Maria quebrou barreiras ao se tornar...</p>,
      image: "/mestra-maria.jpg",
    },
  ]}
/>
```

**Como funciona internamente:**
- Usa `ScrollTrigger.create({ pin })` do GSAP para fixar o container da imagem
- Cada item da lista tem um `ScrollTrigger` com `start: "top center"` e `end: "bottom center"`
- Quando um item cruza o centro, `onEnter` troca o `activeIndex`
- Um `motion.div` com `animate={{ opacity }}` faz o crossfade entre as imagens

---

## 4. Parallax no background

**O que faz:** A imagem de fundo se move mais lentamente que o conteúdo durante o scroll, criando profundidade.

**Onde usar:** Ideal para a seção "A Space Designed for Connection" do vídeo. No nosso projeto, pode ser usado na seção hero, no CTA, ou em qualquer seção full-bleed.

**Como usar:**

```tsx
import { ParallaxSection } from "@/components/ui/Animations"

<ParallaxSection
  bgImage="https://images.unsplash.com/photo-1541701494587-cb58502866ab"
  speed={0.3}
  className="min-h-[80vh] flex items-center"
  bgClassName="brightness-50"
>
  <div className="relative z-10 text-white text-center px-6">
    <h2 className="font-display text-5xl">A Roda Continua</h2>
    <p className="mt-4 max-w-lg mx-auto">...</p>
  </div>
</ParallaxSection>
```

**Alternativa com hook (mais leve):**

```tsx
import { useParallax } from "@/lib/animations"

function HeroBackground() {
  const { ref, offset } = useParallax(0.3)
  return (
    <div
      ref={ref}
      className="absolute inset-0 bg-cover bg-center"
      style={{
        backgroundImage: "url(...)",
        transform: `translateY(${offset}px)`,
        willChange: "transform",
      }}
    />
  )
}
```

---

## 5. Galeria em masonry com stagger

**O que faz:** Cards de tamanhos variados entram com fade + leve escala conforme cruzam a viewport, com stagger entre eles.

**Onde usar:** Na `GaleriaSection` já criada com o componente antigo. Pode ser migrada para usar `StaggerGroup`.

**Como migrar:**

```tsx
// Antes (ScrollReveal antigo com data attributes):
<div data-reveal data-reveal-type="rise">...</div>

// Depois (novo componente):
<StaggerGroup staggerDelay={0.08}>
  {images.map((img) => (
    <StaggerItem key={img.id}>
      <div className={`group relative overflow-hidden rounded-2xl ${img.h}`}>
        <img src={img.src} alt={img.caption} className="w-full h-full object-cover" />
      </div>
    </StaggerItem>
  ))}
</StaggerGroup>
```

---

## Comparativo de abordagens

| Técnica | framer-motion | GSAP | CSS puro |
|---|---|---|---|
| Fade-up no scroll | `whileInView` ✅ | ScrollTrigger | `animation-timeline: view()` ⚠️ |
| Stagger | `staggerChildren` ✅ | stagger | `@for` loop com delay |
| Pin (fixar elemento) | ❌ não tem | `ScrollTrigger.pin` ✅ | position: sticky ⚠️ |
| Parallax | `useTransform` ✅ | ScrollTrigger | `background-attachment: fixed` ⚠️ |
| Crossfade | `animate={{ opacity }}` ✅ | `gsap.to()` | `@keyframes` |

> **Recomendação:** Use **framer-motion** para fade-up, stagger e crossfade (já está no projeto e é suficiente). Use **GSAP ScrollTrigger** apenas quando precisar de **pin** (efeito de lista fixa), que o framer-motion não suporta.

---

## Arquivos criados

| Arquivo | O que contém |
|---|---|
| `lib/animations.ts` | Hooks: `useScrollReveal`, `useStaggerReveal`, `useParallax`, `useActivePinnedItem` + variantes de animação |
| `components/ui/Animations.tsx` | Componentes: `Reveal`, `StaggerGroup`, `StaggerItem`, `EnterAnimation`, `EnterStagger`, `ParallaxSection`, `PinnedSection` |
