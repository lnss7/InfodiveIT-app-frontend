"use client";

import { useEffect, useRef, useState } from "react";
import { api } from "@/lib/api";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MoveRight } from "lucide-react";
import { Reveal } from "@/components/animations/reveal";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

type Marco = {
  year: string;
  title: string;
  description: string;
  destaque?: boolean;
};

const MARCOS_FALLBACK: Marco[] = [
  {
    year: "2003",
    title: "O início",
    description:
      "A Infodive nasce como integradora de TI, atendendo as primeiras empresas com infraestrutura e suporte de missão crítica.",
  },
  {
    year: "2008",
    title: "Parcerias oficiais",
    description:
      "Certificações e parcerias com fabricantes globais — IBM, Dell e Lenovo passam a compor o portfólio.",
  },
  {
    year: "2013",
    title: "Missão crítica",
    description:
      "Foco em armazenamento, virtualização e proteção de dados para operações que não podem parar.",
  },
  {
    year: "2017",
    title: "Era cloud",
    description:
      "Projetos de nuvem híbrida e migração com AWS e Microsoft ampliam o alcance das soluções.",
  },
  {
    year: "2021",
    title: "Segurança no centro",
    description:
      "Cibersegurança ativa, backup imutável e observabilidade entram no coração da oferta.",
  },
  {
    year: "Hoje",
    title: "Integração completa",
    description:
      "Da infraestrutura à inteligência artificial: um parceiro único para o ciclo completo de tecnologia.",
    destaque: true,
  },
];

function MarcoCard({ marco, index }: { marco: Marco; index: number }) {
  return (
    <article
      className={cn(
        "flex min-h-[340px] w-[400px] shrink-0 flex-col justify-between border bg-white/[0.02] p-8 xl:w-[440px]",
        marco.destaque ? "border-brand/60" : "border-white/10"
      )}
    >
      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-white/30">
          {String(index + 1).padStart(2, "0")}
        </p>
        <p
          className={cn(
            "mt-4 text-6xl font-semibold leading-none tracking-tight xl:text-7xl",
            marco.destaque
              ? "text-brand"
              : "text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.3)]"
          )}
        >
          {marco.year}
        </p>
      </div>
      <div>
        <h3 className="text-xl font-semibold text-white">{marco.title}</h3>
        <p className="mt-3 text-sm leading-relaxed text-white/55">
          {marco.description}
        </p>
      </div>
    </article>
  );
}

/**
 * Nossa história — seção pinada onde o scroll vertical vira translação
 * horizontal dos marcos (pin + scrub), com linha de progresso que desenha
 * conforme avança. No mobile vira lista vertical sem pin.
 */
export function SobreTimeline() {
  const pinRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  const [marcos, setMarcos] = useState<Marco[]>(MARCOS_FALLBACK);
  const [eyebrow, setEyebrow] = useState("Nossa história");
  const [headline, setHeadline] = useState("De 2003 até aqui.");

  useEffect(() => {
    api.sobreTimeline()
      .then((data) => {
        if (data.eyebrow) setEyebrow(data.eyebrow);
        if (data.headline) setHeadline(data.headline);
        if (data.marcos && data.marcos.length > 0) {
          setMarcos(data.marcos.map((m) => ({
            year: m.ano,
            title: m.titulo,
            description: m.descricao,
            destaque: m.destaque,
          })));
        }
      })
      .catch(() => { /* mantém fallback */ });
  }, []);

  useEffect(() => {
    const pin = pinRef.current;
    const wrapper = wrapperRef.current;
    const track = trackRef.current;
    const progress = progressRef.current;
    if (!pin || !wrapper || !track || !progress) return;

    const mm = gsap.matchMedia();
    mm.add("(min-width: 1024px)", () => {
      const getDistance = () => track.scrollWidth - wrapper.clientWidth;

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: pin,
          start: "top top",
          end: () => `+=${getDistance()}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      tl.to(track, { x: () => -getDistance() }, 0).fromTo(
        progress,
        { scaleX: 0 },
        { scaleX: 1 },
        0
      );
    });

    return () => mm.revert();
  }, []);

  return (
    <section id="historia" className="relative bg-ink-950 text-white">
      {/* ── Desktop: pinada + horizontal ── */}
      <div
        ref={pinRef}
        className="hidden h-screen flex-col justify-center overflow-hidden lg:flex"
      >
        <div className="container-default w-full">
          <div className="flex items-end justify-between">
            <div>
              <p className="eyebrow">{eyebrow}</p>
              <h2 className="text-white">{headline}</h2>
            </div>
            <p className="flex items-center gap-2 pb-1 text-xs uppercase tracking-[0.2em] text-white/35">
              Continue rolando
              <MoveRight className="h-4 w-4" />
            </p>
          </div>
        </div>

        <div ref={wrapperRef} className="mt-14 w-full">
          <div
            ref={trackRef}
            className="flex w-max items-stretch gap-6 pl-[max(2.5rem,calc((100vw-80rem)/2+2.5rem))] pr-[12vw]"
          >
            {marcos.map((marco, i) => (
              <MarcoCard key={`${marco.year}-${i}`} marco={marco} index={i} />
            ))}
          </div>
        </div>

        <div className="container-default mt-14 w-full">
          <div className="flex items-center gap-4 text-xs uppercase tracking-[0.2em] text-white/35">
            <span>{marcos[0]?.year ?? "2003"}</span>
            <div className="h-px flex-1 bg-white/10">
              <div ref={progressRef} className="h-px origin-left bg-brand" />
            </div>
            <span>{marcos[marcos.length - 1]?.year ?? "Hoje"}</span>
          </div>
        </div>
      </div>

      {/* ── Mobile: lista vertical, sem pin ── */}
      <div className="py-20 lg:hidden">
        <div className="container-default">
          <Reveal>
            <p className="eyebrow">{eyebrow}</p>
            <h2 className="text-white">{headline}</h2>
          </Reveal>

          <ol className="mt-12 space-y-12 border-l border-white/10 pl-6">
            {marcos.map((marco, i) => (
              <Reveal as="li" key={marco.year} delay={0.05} className="relative">
                <span
                  aria-hidden
                  className={cn(
                    "absolute -left-[1.84rem] top-2 h-2.5 w-2.5 rounded-full",
                    marco.destaque ? "bg-brand" : "bg-white/25"
                  )}
                />
                <p className="text-xs uppercase tracking-[0.2em] text-white/30">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <p
                  className={cn(
                    "mt-2 text-4xl font-semibold leading-none tracking-tight",
                    marco.destaque ? "text-brand" : "text-white"
                  )}
                >
                  {marco.year}
                </p>
                <h3 className="mt-4 text-lg font-semibold text-white">
                  {marco.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-white/55">
                  {marco.description}
                </p>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
