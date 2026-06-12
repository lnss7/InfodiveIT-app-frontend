"use client";

import * as React from "react";
import Image, { type StaticImageData } from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

export type DashboardSlide = {
  src: StaticImageData | string;
  alt: string;
};

type DashboardCarouselProps = {
  slides?: DashboardSlide[];
  className?: string;
};

// Tween: o slide central fica em scale 1 + z-index alto (na frente); os laterais
// encolhem, perdem opacidade e ficam atrás — criando a sobreposição do print.
const TWEEN_FACTOR_BASE = 0.42;
const MIN_SCALE = 0.5;
const MIN_OPACITY = 0;
// Quanto a opacidade cai conforme o slide se afasta do centro. A proximidade de cada
// vizinho é ≈ 0.42 × n (n = distância do centro). Com falloff 1.2: o 1º vizinho (n=1)
// fica em ~0.5 de opacidade e o 2º+ (n≥2) zera — garantindo só 3 slides visíveis.
const OPACITY_FALLOFF = 1.2;
const AUTOPLAY_MS = 4000;
// Quanto cada vizinho desliza para a lateral (px) no fim do scroll. Tunável.
// Mobile tem valor menor porque a tela é estreita e as fotos são maiores.
const MAX_SPREAD = 500;
const MAX_SPREAD_MOBILE = 110;

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

export function DashboardCarousel({
  slides,
  className,
}: DashboardCarouselProps) {
  // O loop do Embla precisa de slides suficientes para preencher o trilho;
  // com poucas imagens, duplicamos até ter material para o loop ficar contínuo.
  const items = React.useMemo(() => {
    const base = slides && slides.length > 0 ? slides : null;
    if (!base) return null;
    // Buffer alto dos dois lados para o loop não dar "pulinho" na emenda (lado esquerdo).
    let list = [...base];
    while (list.length < 12) list = [...list, ...base];
    return list;
  }, [slides]);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
    containScroll: false,
    skipSnaps: false,
    duration: 45, // glide mais longo/suave entre os slides (padrão é 25)
  });

  const tweenNodes = React.useRef<HTMLElement[]>([]);
  const tweenFactor = React.useRef(0);

  // Trigger do ScrollTrigger (div externa).
  const rootRef = React.useRef<HTMLDivElement>(null);
  // Estado por slide calculado pelo Embla (scale/opacity/lado), consumido tanto pelo
  // tween do carrossel quanto pelo spread do scroll.
  const slideStateRef = React.useRef<
    { scale: number; opacity: number; spreadDir: number; isCenter: boolean }[]
  >([]);
  // Progresso 0→1 do scroll que controla o quanto as laterais se afastam.
  const spreadRef = React.useRef(0);
  // Afastamento máximo em px (menor no mobile). Atualizado por breakpoint.
  const maxSpreadRef = React.useRef(MAX_SPREAD);

  const setTweenNodes = React.useCallback(
    (api: NonNullable<typeof emblaApi>) => {
      tweenNodes.current = api
        .slideNodes()
        .map(
          (node) =>
            node.querySelector(".dashboard-slide__tween") as HTMLElement,
        );
    },
    [],
  );

  const setTweenFactor = React.useCallback(
    (api: NonNullable<typeof emblaApi>) => {
      tweenFactor.current = TWEEN_FACTOR_BASE * api.scrollSnapList().length;
    },
    [],
  );

  // Ponto único que escreve os transforms: combina o `scale`/`opacity` do tween do Embla
  // com o `translateX` extra do scroll (spread). Os dois precisam viver no MESMO transform,
  // senão um sobrescreve o outro. Chamado tanto pelo Embla quanto pelo ScrollTrigger.
  const applyTransforms = React.useCallback(() => {
    const state = slideStateRef.current;
    for (let i = 0; i < tweenNodes.current.length; i++) {
      const node = tweenNodes.current[i];
      const s = state[i];
      if (!node || !s) continue;
      // translateX(-50%) mantém o card largo centrado no slot (gera a sobreposição);
      // o offset do spread empurra os vizinhos para fora conforme o scroll.
      const offset = s.spreadDir * spreadRef.current * maxSpreadRef.current;
      node.style.transform = `translateX(calc(-50% + ${offset}px)) scale(${s.scale})`;
      node.style.opacity = `${s.opacity}`;

      // z-index NO SLOT (pai): o card tem `transform` e cria stacking context próprio,
      // então pôr o z-index no slot garante que o central realmente suba acima dos vizinhos.
      const slot = node.parentElement;
      if (slot) {
        slot.style.zIndex = s.isCenter ? "50" : `${Math.round(s.scale * 20)}`;
      }
    }
  }, []);

  const tweenEffect = React.useCallback(
    (api: NonNullable<typeof emblaApi>) => {
      const engine = api.internalEngine();
      const scrollProgress = api.scrollProgress();

      // 1ª passada: calcula scale/opacity/lado de cada slide e guarda a proximidade.
      const computed: {
        slideIndex: number;
        scale: number;
        opacity: number;
        proximity: number;
        spreadDir: number;
      }[] = [];

      api.scrollSnapList().forEach((scrollSnap, snapIndex) => {
        let diffToTarget = scrollSnap - scrollProgress;
        const slidesInSnap = engine.slideRegistry[snapIndex];

        slidesInSnap.forEach((slideIndex) => {
          engine.slideLooper.loopPoints.forEach((loopItem) => {
            const target = loopItem.target();
            if (slideIndex === loopItem.index && target !== 0) {
              const sign = Math.sign(target);
              if (sign === -1) diffToTarget = scrollSnap - (1 + scrollProgress);
              if (sign === 1) diffToTarget = scrollSnap + (1 - scrollProgress);
            }
          });

          const signedProximity = diffToTarget * tweenFactor.current;
          const proximity = Math.abs(signedProximity);
          const scale = clamp(1 - proximity * (1 - MIN_SCALE), MIN_SCALE, 1);
          const opacity = clamp(
            1 - proximity * OPACITY_FALLOFF,
            MIN_OPACITY,
            1,
          );
          // sinal = lado (negativo = esquerda, positivo = direita); magnitude cresce com
          // a distância do centro. É o vetor de afastamento do spread.
          const spreadDir = clamp(signedProximity, -1, 1);
          computed.push({ slideIndex, scale, opacity, proximity, spreadDir });
        });
      });

      // Acha o slide mais próximo do centro — esse SEMPRE fica na frente.
      let centerSlideIndex = -1;
      let minProximity = Infinity;
      for (const item of computed) {
        if (item.proximity < minProximity) {
          minProximity = item.proximity;
          centerSlideIndex = item.slideIndex;
        }
      }

      // 2ª passada: guarda o estado por slide; o desenho fica a cargo de applyTransforms
      // (que também aplica o spread do scroll).
      for (const item of computed) {
        slideStateRef.current[item.slideIndex] = {
          scale: item.scale,
          opacity: item.opacity,
          spreadDir: item.spreadDir,
          isCenter: item.slideIndex === centerSlideIndex,
        };
      }

      applyTransforms();
    },
    [applyTransforms],
  );

  React.useEffect(() => {
    if (!emblaApi) return;

    setTweenNodes(emblaApi);
    setTweenFactor(emblaApi);
    tweenEffect(emblaApi);

    emblaApi
      .on("reInit", setTweenNodes)
      .on("reInit", setTweenFactor)
      .on("reInit", tweenEffect)
      .on("scroll", tweenEffect)
      .on("slideFocus", tweenEffect);

    return () => {
      emblaApi
        .off("reInit", setTweenNodes)
        .off("reInit", setTweenFactor)
        .off("reInit", tweenEffect)
        .off("scroll", tweenEffect)
        .off("slideFocus", tweenEffect);
    };
  }, [emblaApi, setTweenNodes, setTweenFactor, tweenEffect]);

  // Spread por scroll: liga o progresso 0→1 do ScrollTrigger ao afastamento das laterais.
  // Ao descer a página as laterais se afastam da central; ao subir, voltam.
  React.useEffect(() => {
    if (!rootRef.current) return;
    // Respeita usuários que preferem menos movimento.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const st = ScrollTrigger.create({
      trigger: rootRef.current,
      start: "top 85%", // começa quando o carrossel aparece
      end: "top 25%", // completa o afastamento conforme rola para baixo (tunável)
      onUpdate: (self) => {
        spreadRef.current = self.progress;
        applyTransforms();
      },
    });

    return () => st.kill();
  }, [applyTransforms]);

  // Afastamento responsivo: menor no mobile (< sm). Atualiza no resize/troca de breakpoint.
  React.useEffect(() => {
    const mq = window.matchMedia("(max-width: 639px)");
    const update = () => {
      maxSpreadRef.current = mq.matches ? MAX_SPREAD_MOBILE : MAX_SPREAD;
      applyTransforms();
    };
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [applyTransforms]);

  // Autoplay infinito (pausa ao interagir / hover).
  const autoplayRef = React.useRef<ReturnType<typeof setInterval> | null>(null);

  const stopAutoplay = React.useCallback(() => {
    if (autoplayRef.current) {
      clearInterval(autoplayRef.current);
      autoplayRef.current = null;
    }
  }, []);

  const startAutoplay = React.useCallback(() => {
    if (!emblaApi) return;
    stopAutoplay();
    autoplayRef.current = setInterval(() => emblaApi.scrollNext(), AUTOPLAY_MS);
  }, [emblaApi, stopAutoplay]);

  React.useEffect(() => {
    if (!emblaApi) return;
    startAutoplay();
    emblaApi.on("pointerDown", stopAutoplay);
    emblaApi.on("pointerUp", startAutoplay);

    return () => {
      stopAutoplay();
      emblaApi.off("pointerDown", stopAutoplay);
      emblaApi.off("pointerUp", startAutoplay);
    };
  }, [emblaApi, startAutoplay, stopAutoplay]);

  const placeholders = [0, 1, 2, 3, 4];
  const data = items ?? placeholders;

  return (
    <div
      ref={rootRef}
      className={cn("w-full select-none", className)}
      onMouseEnter={stopAutoplay}
      onMouseLeave={startAutoplay}
    >
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex touch-pan-y">
          {data.map((slide, index) => (
            <div
              key={index}
              className="relative min-w-0 shrink-0 grow-0 basis-[66%] sm:basis-[46%] md:basis-[40%]"
              role="group"
              aria-roledescription="slide"
            >
              {/* Card mais largo que o slot → vizinhos se sobrepõem */}
              <div
                className="dashboard-slide__tween relative left-1/2 w-[120%] sm:w-[150%] origin-center"
                style={{ transform: "translateX(-50%)" }}
              >
                {/* Liquid Glass Effect Frame */}
                <div className="p-1.5 sm:p-2.5 rounded-[18px] sm:rounded-[28px] bg-gradient-to-tr from-white/[0.02] via-white/[0.08] to-white/[0.03] backdrop-blur-[16px] border border-white/10 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.75),inset_0_1px_1px_rgba(255,255,255,0.2)] ring-1 ring-black/40">
                  <div className="overflow-hidden rounded-[12px] sm:rounded-[18px] border border-white/10 bg-ink-900/90 aspect-[10/8] sm:aspect-auto">
                    {items ? (
                      <Image
                        src={(slide as DashboardSlide).src}
                        alt={(slide as DashboardSlide).alt}
                        width={1280}
                        height={720}
                        className="h-full w-full object-cover object-top sm:h-auto"
                        draggable={false}
                        priority={index === 0}
                        unoptimized
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
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
