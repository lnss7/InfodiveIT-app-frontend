"use client"

import * as React from "react"
import Image, { type StaticImageData } from "next/image"
import useEmblaCarousel from "embla-carousel-react"
import { cn } from "@/lib/utils"

export type DashboardSlide = {
  src: StaticImageData | string
  alt: string
}

type DashboardCarouselProps = {
  slides?: DashboardSlide[]
  className?: string
}

// Tween: o slide central fica em scale 1 + z-index alto (na frente); os laterais
// encolhem, perdem opacidade e ficam atrás — criando a sobreposição do print.
const TWEEN_FACTOR_BASE = 0.42
const MIN_SCALE = 0.74
const MIN_OPACITY = 0.55
// Quanto a opacidade cai conforme o slide se afasta do centro. Mais alto = o card
// que sai desbota mais rápido, virando um crossfade suave em vez de troca seca de camada.
const OPACITY_FALLOFF = 1.9
const AUTOPLAY_MS = 2000

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max)

export function DashboardCarousel({ slides, className }: DashboardCarouselProps) {
  // O loop do Embla precisa de slides suficientes para preencher o trilho;
  // com poucas imagens, duplicamos até ter material para o loop ficar contínuo.
  const items = React.useMemo(() => {
    const base = slides && slides.length > 0 ? slides : null
    if (!base) return null
    // Buffer alto dos dois lados para o loop não dar "pulinho" na emenda (lado esquerdo).
    let list = [...base]
    while (list.length < 12) list = [...list, ...base]
    return list
  }, [slides])

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
    containScroll: false,
    skipSnaps: false,
    duration: 45, // glide mais longo/suave entre os slides (padrão é 25)
  })

  const tweenNodes = React.useRef<HTMLElement[]>([])
  const tweenFactor = React.useRef(0)

  const setTweenNodes = React.useCallback((api: NonNullable<typeof emblaApi>) => {
    tweenNodes.current = api.slideNodes().map(
      (node) => node.querySelector(".dashboard-slide__tween") as HTMLElement
    )
  }, [])

  const setTweenFactor = React.useCallback((api: NonNullable<typeof emblaApi>) => {
    tweenFactor.current = TWEEN_FACTOR_BASE * api.scrollSnapList().length
  }, [])

  const tweenEffect = React.useCallback(
    (api: NonNullable<typeof emblaApi>) => {
      const engine = api.internalEngine()
      const scrollProgress = api.scrollProgress()

      // 1ª passada: calcula scale/opacity de cada slide e guarda a proximidade.
      const computed: { slideIndex: number; scale: number; opacity: number; proximity: number }[] = []

      api.scrollSnapList().forEach((scrollSnap, snapIndex) => {
        let diffToTarget = scrollSnap - scrollProgress
        const slidesInSnap = engine.slideRegistry[snapIndex]

        slidesInSnap.forEach((slideIndex) => {
          engine.slideLooper.loopPoints.forEach((loopItem) => {
            const target = loopItem.target()
            if (slideIndex === loopItem.index && target !== 0) {
              const sign = Math.sign(target)
              if (sign === -1) diffToTarget = scrollSnap - (1 + scrollProgress)
              if (sign === 1) diffToTarget = scrollSnap + (1 - scrollProgress)
            }
          })

          const proximity = Math.abs(diffToTarget * tweenFactor.current)
          const scale = clamp(1 - proximity * (1 - MIN_SCALE), MIN_SCALE, 1)
          const opacity = clamp(1 - proximity * OPACITY_FALLOFF, MIN_OPACITY, 1)
          computed.push({ slideIndex, scale, opacity, proximity })
        })
      })

      // Acha o slide mais próximo do centro — esse SEMPRE fica na frente.
      let centerSlideIndex = -1
      let minProximity = Infinity
      for (const item of computed) {
        if (item.proximity < minProximity) {
          minProximity = item.proximity
          centerSlideIndex = item.slideIndex
        }
      }

      // 2ª passada: aplica transform/opacity no card e o z-index NO SLOT (elemento pai).
      // O card tem `transform`, então cria stacking context próprio; pôr o z-index no
      // slot garante que o slide central realmente suba acima dos vizinhos.
      for (const item of computed) {
        const node = tweenNodes.current[item.slideIndex]
        if (!node) continue
        // translateX(-50%) mantém o card largo centrado no slot (gera a sobreposição)
        node.style.transform = `translateX(-50%) scale(${item.scale})`
        node.style.opacity = `${item.opacity}`

        const slot = node.parentElement
        if (slot) {
          slot.style.zIndex =
            item.slideIndex === centerSlideIndex ? "50" : `${Math.round(item.scale * 20)}`
        }
      }
    },
    []
  )

  React.useEffect(() => {
    if (!emblaApi) return

    setTweenNodes(emblaApi)
    setTweenFactor(emblaApi)
    tweenEffect(emblaApi)

    emblaApi
      .on("reInit", setTweenNodes)
      .on("reInit", setTweenFactor)
      .on("reInit", tweenEffect)
      .on("scroll", tweenEffect)
      .on("slideFocus", tweenEffect)

    return () => {
      emblaApi
        .off("reInit", setTweenNodes)
        .off("reInit", setTweenFactor)
        .off("reInit", tweenEffect)
        .off("scroll", tweenEffect)
        .off("slideFocus", tweenEffect)
    }
  }, [emblaApi, setTweenNodes, setTweenFactor, tweenEffect])

  // Autoplay infinito (pausa ao interagir / hover).
  const autoplayRef = React.useRef<ReturnType<typeof setInterval> | null>(null)

  const stopAutoplay = React.useCallback(() => {
    if (autoplayRef.current) {
      clearInterval(autoplayRef.current)
      autoplayRef.current = null
    }
  }, [])

  const startAutoplay = React.useCallback(() => {
    if (!emblaApi) return
    stopAutoplay()
    autoplayRef.current = setInterval(() => emblaApi.scrollNext(), AUTOPLAY_MS)
  }, [emblaApi, stopAutoplay])

  React.useEffect(() => {
    if (!emblaApi) return
    startAutoplay()
    emblaApi.on("pointerDown", stopAutoplay)
    emblaApi.on("pointerUp", startAutoplay)

    return () => {
      stopAutoplay()
      emblaApi.off("pointerDown", stopAutoplay)
      emblaApi.off("pointerUp", startAutoplay)
    }
  }, [emblaApi, startAutoplay, stopAutoplay])

  const placeholders = [0, 1, 2, 3, 4]
  const data = items ?? placeholders

  return (
    <div
      className={cn("w-full select-none", className)}
      onMouseEnter={stopAutoplay}
      onMouseLeave={startAutoplay}
    >
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex touch-pan-y">
          {data.map((slide, index) => (
            <div
              key={index}
              className="relative min-w-0 shrink-0 grow-0 basis-[68%] sm:basis-[44%] md:basis-[36%]"
              role="group"
              aria-roledescription="slide"
            >
              {/* Card mais largo que o slot → vizinhos se sobrepõem */}
              <div
                className="dashboard-slide__tween relative left-1/2 w-[130%] sm:w-[150%] origin-center will-change-transform"
                style={{ transform: "translateX(-50%)" }}
              >
                <div className="overflow-hidden rounded-xl border border-white/10 bg-ink-900 shadow-2xl shadow-black/50 ring-1 ring-black/5">
                  {items ? (
                    <Image
                      src={(slide as DashboardSlide).src}
                      alt={(slide as DashboardSlide).alt}
                      width={1280}
                      height={720}
                      className="h-auto w-full object-cover"
                      draggable={false}
                      priority={index === 0}
                    />
                  ) : (
                    <div className="aspect-[16/9] w-full bg-gradient-to-br from-ink-800 to-ink-950 grid place-items-center">
                      <span className="text-xs font-semibold uppercase tracking-[0.25em] text-ink-500">
                        Tela {(index % 3) + 1}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
