"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowDown } from "lucide-react";
import { NumberTicker } from "@/components/ui/number-ticker";
import { Reveal } from "@/components/animations/reveal";
import { useSmoothScroll } from "@/hooks/use-smooth-scroll";

gsap.registerPlugin(ScrollTrigger);

type Stat = {
  prefix?: string;
  value: number;
  startValue?: number;
  suffix?: string;
  label: string;
};

// Conteúdo placeholder — ajustar com os números reais da Infodive.
const COLUNA_A: Stat[] = [
  { value: 2003, startValue: 1990, label: "Ano de fundação" },
  { prefix: "+", value: 500, label: "Projetos entregues em todo o país" },
  { prefix: "+", value: 12, label: "Fabricantes parceiros certificados" },
];

const COLUNA_B: Stat[] = [
  { prefix: "+", value: 20, label: "Anos integrando tecnologia B2B" },
  { prefix: "+", value: 100, label: "Clientes ativos em setores críticos" },
  { value: 24, suffix: "/7", label: "Suporte e monitoramento contínuos" },
];

function StatCard({ stat, delay }: { stat: Stat; delay: number }) {
  return (
    <Reveal delay={delay}>
      <div className="flex min-h-[260px] flex-col justify-between border border-ink-200 bg-white p-7 sm:min-h-[380px] sm:p-9">
        <p className="text-6xl font-medium leading-none tracking-tight text-brand sm:text-7xl xl:text-8xl">
          {stat.prefix}
          <NumberTicker
            value={stat.value}
            startValue={stat.startValue ?? 0}
            className="tracking-tight"
          />
          {stat.suffix}
        </p>
        <p className="mt-10 max-w-[22ch] text-sm leading-relaxed text-ink-500">
          {stat.label}
        </p>
      </div>
    </Reveal>
  );
}

/**
 * Números — referência direta da seção "About" de tresmarescapital.com/en:
 * texto sticky à esquerda, grid escalonado de stats à direita com as duas
 * colunas transladando em velocidades diferentes ao scroll.
 */
export function SobreNumeros() {
  const { scrollTo } = useSmoothScroll();
  const sectionRef = useRef<HTMLElement>(null);
  const colARef = useRef<HTMLDivElement>(null);
  const colBRef = useRef<HTMLDivElement>(null);

  // Parallax entre colunas — só no desktop (no mobile o grid empilha em
  // coluna única e transform atrelado ao scroll trava no iOS).
  useEffect(() => {
    if (!sectionRef.current || !colARef.current || !colBRef.current) return;

    const mm = gsap.matchMedia();
    mm.add("(min-width: 1024px)", () => {
      const scrub = {
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
        invalidateOnRefresh: true,
      };

      // As duas colunas deslizam em ritmos diferentes para criar profundidade:
      // a coluna B parte mais abaixo (y:120 vs 40) e percorre mais (amplitude
      // maior), então parece estar numa camada mais distante que a A. `ease:none`
      // mantém o movimento 100% atrelado ao scroll (sem aceleração própria).
      gsap.fromTo(
        colARef.current,
        { y: 40 },
        { y: -40, ease: "none", scrollTrigger: { ...scrub } }
      );
      gsap.fromTo(
        colBRef.current,
        { y: 120 },
        { y: -60, ease: "none", scrollTrigger: { ...scrub } }
      );
    });

    return () => mm.revert();
  }, []);

  const scrollToHistoria = () => scrollTo("historia", { duration: 1.4 });

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden border-t border-ink-200/60 bg-white py-20 md:py-28"
    >
      <div className="container-default">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-8">
          {/* Texto descritivo — fica sticky enquanto os cards passam */}
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-36">
              <Reveal>
                <p className="eyebrow">A Infodive</p>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="text-pretty text-2xl leading-snug text-ink-950 sm:text-3xl">
                  Fundada em 2003, a Infodive reúne hoje um time de
                  especialistas que projeta, implementa e sustenta a
                  infraestrutura de empresas em todo o Brasil.
                </p>
              </Reveal>
              <Reveal delay={0.2}>
                <button
                  type="button"
                  onClick={scrollToHistoria}
                  className="group mt-8 inline-flex items-center gap-2 text-sm font-medium text-ink-950 underline decoration-ink-300 underline-offset-8 transition-colors hover:text-brand hover:decoration-brand"
                >
                  Conheça nossa história
                  <ArrowDown className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5" />
                </button>
              </Reveal>
            </div>
          </div>

          {/* Grid escalonado de stats — coluna B começa deslocada, como na referência */}
          <div className="lg:col-span-7 lg:col-start-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div ref={colARef} className="flex flex-col gap-6">
                {COLUNA_A.map((stat, i) => (
                  <StatCard key={stat.label} stat={stat} delay={i * 0.08} />
                ))}
              </div>
              <div ref={colBRef} className="flex flex-col gap-6 sm:mt-28">
                {COLUNA_B.map((stat, i) => (
                  <StatCard key={stat.label} stat={stat} delay={0.1 + i * 0.08} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
