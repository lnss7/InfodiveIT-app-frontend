"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { InteractiveGridPattern } from "@/components/animations/interactive-grid-pattern";
import { Reveal } from "@/components/animations/reveal";
import { TextEffect } from "@/components/animations/text-effect";

gsap.registerPlugin(ScrollTrigger);

export function SobreHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Parallax de saída — o conteúdo desce mais devagar que o scroll e esmaece,
  // criando profundidade na transição para o manifesto. Apenas no desktop:
  // no iOS transforms atrelados ao scroll travam (mesma ressalva do footer).
  useEffect(() => {
    if (!sectionRef.current || !contentRef.current) return;

    const mm = gsap.matchMedia();
    mm.add("(min-width: 1024px)", () => {
      gsap.to(contentRef.current, {
        yPercent: 35,
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
          invalidateOnRefresh: true,
        },
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden border-b border-white/5 bg-[#050507] pb-24 pt-32 text-white sm:pt-40 md:pb-32"
    >
      {/* Grid decorativo interativo ao fundo (mesma linguagem do hero de /solucoes) */}
      <div className="pointer-events-none absolute inset-0 z-0 h-full w-full overflow-hidden">
        <InteractiveGridPattern
          width={48}
          height={48}
          squares={[50, 20]}
          className="absolute inset-0 h-full w-full stroke-white/[0.04] [mask-image:radial-gradient(ellipse_at_center,white_20%,transparent_80%)] opacity-40"
          squaresClassName="hover:fill-brand/10 transition-all duration-150"
        />
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand/10 blur-[120px]" />
      </div>

      <div
        ref={contentRef}
        className="container-default relative z-10 mx-auto flex max-w-4xl flex-col items-center px-4 text-center"
      >
        <Reveal>
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-[#7aa9ff]">
            Quem Somos
          </p>
        </Reveal>

        <h1 className="mb-6 text-balance text-4xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-5xl md:text-6xl">
          <TextEffect
            per="word"
            preset="blur"
            as="span"
            delay={0.15}
            duration={0.9}
            highlightWords={["2003"]}
            highlightClassName="text-transparent [-webkit-text-stroke:1.8px_#0E66FF]"
          >
            Integradores de tecnologia desde 2003.
          </TextEffect>
        </h1>

        <Reveal delay={0.5}>
          <p className="max-w-2xl text-balance text-base leading-relaxed text-ink-300 sm:text-lg">
            Há mais de duas décadas, a Infodive desenha, implementa e sustenta a
            infraestrutura crítica de empresas que não podem parar — da
            arquitetura à operação.
          </p>
        </Reveal>

        <Reveal delay={0.7}>
          <div className="mt-10 flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-white/40">
            <span>Porto Alegre</span>
            <span className="h-px w-8 bg-white/20" aria-hidden />
            <span>B2B</span>
            <span className="h-px w-8 bg-white/20" aria-hidden />
            <span>Missão crítica</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
