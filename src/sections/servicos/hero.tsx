"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowDown, MessageSquare } from "lucide-react";
import type Lenis from "@studio-freight/lenis";
import { InteractiveGridPattern } from "@/components/animations/interactive-grid-pattern";
import { Reveal } from "@/components/animations/reveal";
import { TextEffect } from "@/components/animations/text-effect";

gsap.registerPlugin(ScrollTrigger);

export function ServicosHero() {
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

  const scrollToCiclo = () => {
    const target = document.getElementById("ciclo");
    if (!target) return;
    const lenis = (window as Window & { lenis?: Lenis }).lenis;
    if (lenis) {
      lenis.scrollTo(target, { duration: 1.2 });
    } else {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden border-b border-white/5 bg-[#050507] pb-24 pt-32 text-white sm:pt-40 md:pb-32"
    >
      {/* Grid decorativo interativo ao fundo (mesma linguagem do hero de /sobre) */}
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
            Serviços
          </p>
        </Reveal>

        <h1 className="mb-6 text-balance text-4xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-5xl md:text-6xl">
          <TextEffect
            per="word"
            preset="blur"
            as="span"
            delay={0.15}
            duration={0.9}
            highlightWords={["execução"]}
            highlightClassName="text-transparent [-webkit-text-stroke:1.8px_#0E66FF]"
          >
            Tecnologia é só o começo. Resultado vem da execução.
          </TextEffect>
        </h1>

        <Reveal delay={0.5}>
          <p className="max-w-2xl text-balance text-base leading-relaxed text-ink-300 sm:text-lg">
            A Infodive não entrega apenas a tecnologia — planejamos,
            implantamos, migramos e sustentamos o ambiente que mantém sua
            empresa no ar.
          </p>
        </Reveal>

        <Reveal delay={0.7}>
          <div className="mt-10 flex w-full flex-col items-center justify-center gap-3 sm:flex-row">
            <button
              type="button"
              onClick={scrollToCiclo}
              className="btn-primary w-full sm:w-auto"
            >
              Conheça nossos serviços
              <ArrowDown className="h-4 w-4" />
            </button>
            <Link
              href="/#contact"
              className="btn w-full border border-white/15 bg-white/5 !text-white hover:border-white/40 sm:w-auto"
            >
              <MessageSquare className="h-4 w-4 text-ink-300" strokeWidth={2} />
              Fale com um especialista
            </Link>
          </div>
        </Reveal>

        <Reveal delay={0.85}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-2 gap-y-2 text-xs uppercase tracking-[0.2em] text-white/40 sm:flex-nowrap sm:gap-x-3">
            <span>Planejamos</span>
            <span className="h-px w-4 bg-white/20 sm:w-8" aria-hidden />
            <span>Implantamos</span>
            <span className="h-px w-4 bg-white/20 sm:w-8" aria-hidden />
            <span>Sustentamos</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
