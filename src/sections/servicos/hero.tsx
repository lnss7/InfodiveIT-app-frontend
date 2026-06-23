"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowDown, MessageSquare, ArrowLeft } from "lucide-react";
import { InteractiveGridPattern } from "@/components/animations/interactive-grid-pattern";
import { Reveal } from "@/components/animations/reveal";
import { TextEffect } from "@/components/animations/text-effect";
import { Button } from "@/components/ui/button";
import { useSmoothScroll } from "@/hooks/use-smooth-scroll";
import { api } from "@/lib/api";

gsap.registerPlugin(ScrollTrigger);

export function ServicosHero() {
  const { scrollTo } = useSmoothScroll();
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const [eyebrow, setEyebrow] = useState("Serviços");
  const [headline, setHeadline] = useState("Tecnologia é só o começo. Resultado vem da execução.");
  const [subtitulo, setSubtitulo] = useState("A Infodive não entrega apenas a tecnologia — planejamos, implantamos, migramos e sustentamos o ambiente que mantém sua empresa no ar.");
  const [highlightWords, setHighlightWords] = useState(["execução"]);

  useEffect(() => {
    api.paginaHero("servicos")
      .then((data) => {
        if (data.eyebrow) setEyebrow(data.eyebrow);
        if (data.headline) setHeadline(data.headline);
        if (data.subtitulo) setSubtitulo(data.subtitulo);
        if (data.tagline) setHighlightWords([data.tagline]);
      })
      .catch(() => { /* mantém fallback */ });
  }, []);

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

  const scrollToCiclo = () => scrollTo("ciclo");

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden border-b border-white/5 bg-[#050507] pb-24 pt-24 text-white sm:pt-40 md:pb-32"
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
        <div className="w-full flex justify-start mb-4 sm:mb-6 mt-[-8px] sm:mt-0">
          <Reveal>
            <Link
              href="/"
              className="inline-flex h-9 w-9 sm:h-10 sm:w-auto items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.08] p-0 sm:px-4 sm:py-2 text-xs font-semibold uppercase tracking-wider text-white/80 backdrop-blur-md transition-all hover:border-white/20 hover:bg-white/[0.15] hover:text-white hover:scale-[1.02] shadow-[0_4px_12px_rgba(0,0,0,0.25)]"
            >
              <ArrowLeft className="h-4 w-4 shrink-0" />
              <span className="hidden sm:inline">Voltar</span>
            </Link>
          </Reveal>
        </div>

        <Reveal>
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-[#7aa9ff]">
            {eyebrow}
          </p>
        </Reveal>

        <h1 className="mb-6 text-balance text-4xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-5xl md:text-6xl">
          <TextEffect
            per="word"
            preset="blur"
            as="span"
            delay={0.15}
            duration={0.9}
            highlightWords={highlightWords}
            highlightClassName="text-transparent [-webkit-text-stroke:1.8px_#0E66FF]"
          >
            {headline}
          </TextEffect>
        </h1>

        <Reveal delay={0.5}>
          <p className="max-w-2xl text-balance text-base leading-relaxed text-ink-300 sm:text-lg">
            {subtitulo}
          </p>
        </Reveal>

        <Reveal delay={0.7}>
          <div className="mt-10 flex w-full flex-col items-center justify-center gap-3 sm:flex-row px-4">
            <Button
              variant="primary"
              onClick={scrollToCiclo}
              className="w-full sm:w-auto text-sm font-bold py-3.5 sm:px-6 sm:py-3 flex items-center justify-center gap-2 cursor-pointer shadow-[0_4px_20px_rgba(14,102,255,0.25)] whitespace-nowrap"
            >
              Conheça nossos serviços
              <ArrowDown className="h-4 w-4" />
            </Button>
            <Link
              href="/#contact"
              className="focus:outline-none w-full sm:w-auto"
              tabIndex={-1}
            >
              <Button
                variant="secondary"
                className="border border-white/10 w-full sm:w-auto text-sm font-bold py-3.5 sm:px-6 sm:py-3 flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap"
              >
                <MessageSquare className="h-4 w-4 text-ink-300" strokeWidth={2} />
                Fale com um especialista
              </Button>
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
