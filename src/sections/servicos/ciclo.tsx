"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Activity,
  ArrowRightLeft,
  ClipboardCheck,
  MoveRight,
  PenTool,
  Rocket,
  Search,
  Users,
  Wrench,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Reveal } from "@/components/animations/reveal";
import { cn } from "@/lib/utils";
import { api } from "@/lib/api";

gsap.registerPlugin(ScrollTrigger);

const GRADIENT_FILL = "linear-gradient(135deg,#6F0101 0%,#3B1F59 50%,#063FB4 100%)";
const GRADIENT_TEXT =
  "bg-[linear-gradient(135deg,#6F0101_0%,#3B1F59_50%,#063FB4_100%)] bg-clip-text text-transparent";

const ICON_MAP: Record<string, LucideIcon> = {
  Search, ClipboardCheck, PenTool, Rocket, ArrowRightLeft, Wrench, Users, Activity,
  search: Search, clipboardcheck: ClipboardCheck, pentool: PenTool, rocket: Rocket,
  arrowrightleft: ArrowRightLeft, wrench: Wrench, users: Users, activity: Activity,
};

function getIcon(name?: string): LucideIcon {
  if (!name) return Search;
  return ICON_MAP[name] ?? ICON_MAP[name.toLowerCase()] ?? Search;
}

type Etapa = {
  icon: LucideIcon;
  title: string;
  description: string;
};

const ETAPAS_FALLBACK: Etapa[] = [
  { icon: Search, title: "Consultoria", description: "Entendemos seu ambiente, suas dores e seus objetivos antes de qualquer recomendação." },
  { icon: ClipboardCheck, title: "Assessment", description: "Diagnóstico técnico detalhado do cenário atual: o que existe, o que falta, o que está em risco." },
  { icon: PenTool, title: "Projeto", description: "Desenho da arquitetura e planejamento da solução sob medida para o seu ambiente." },
  { icon: Rocket, title: "Implantação", description: "Execução e instalação das soluções com metodologia e mínimo impacto na operação." },
  { icon: ArrowRightLeft, title: "Migração", description: "Transição de ambientes legados para novas plataformas sem downtime e sem perda de dados." },
  { icon: Wrench, title: "Sustentação", description: "Suporte contínuo e manutenção para manter tudo funcionando com previsibilidade." },
  { icon: Users, title: "Operação Assistida", description: "Nossa equipe opera e gere o ambiente como extensão do seu time de TI." },
  { icon: Activity, title: "Monitoramento", description: "Observabilidade e resposta proativa — detectamos e agimos antes que vire problema." },
];

/**
 * O ciclo de serviços — coração da página e diferencial visual frente a /solucoes.
 * No desktop a seção é pinada e o scroll vertical avança horizontalmente pela
 * jornada (pin + scrub), com nós conectados, número da etapa ativa em gradiente
 * e barra de progresso que preenche com o gradiente da marca. No mobile vira
 * lista vertical estática (sem pin/transform — fallback iOS).
 */
export function ServicosCiclo() {
  const pinRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef(0);
  const [active, setActive] = useState(0);
  const [etapas, setEtapas] = useState<Etapa[]>(ETAPAS_FALLBACK);
  const etapasRef = useRef<Etapa[]>(ETAPAS_FALLBACK);
  const [eyebrow, setEyebrow] = useState("O ciclo Infodive");
  const [headline, setHeadline] = useState("Da estratégia à operação contínua.");
  const [subtitulo, setSubtitulo] = useState("Soluções dizem o que. Serviços dizem como — e quem planeja, implanta e mantém de pé.");

  useEffect(() => {
    api.servicosEtapas()
      .then((data) => {
        if (data.eyebrow) setEyebrow(data.eyebrow);
        if (data.headline) setHeadline(data.headline);
        if (data.subtitulo) setSubtitulo(data.subtitulo);
        if (data.etapas && data.etapas.length > 0) {
          const mapped = data.etapas.map((e) => ({
            icon: getIcon(e.icone),
            title: e.titulo,
            description: e.descricao,
          }));
          etapasRef.current = mapped;
          setEtapas(mapped);
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
          onUpdate: (self) => {
            const idx = Math.min(
              etapasRef.current.length - 1,
              Math.floor(self.progress * etapasRef.current.length)
            );
            if (idx !== activeRef.current) {
              activeRef.current = idx;
              setActive(idx);
            }
          },
        },
      });

      tl.to(track, { x: () => -getDistance() }, 0).fromTo(
        progress,
        { clipPath: "inset(0 100% 0 0)" },
        { clipPath: "inset(0 0% 0 0)" },
        0
      );
    });

    return () => mm.revert();
  }, []);

  return (
    <section id="ciclo" className="relative bg-[#050507] text-white">
      {/* ── Desktop: pinada + horizontal ── */}
      <div
        ref={pinRef}
        className="hidden h-screen flex-col justify-center overflow-hidden lg:flex"
      >
        <div className="container-default w-full">
          <div className="flex items-end justify-between gap-8">
            <div>
              <p className="eyebrow">{eyebrow}</p>
              <h2 className="text-white">{headline}</h2>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-white/55">
                {subtitulo}
              </p>
            </div>
            <p className="flex shrink-0 items-center gap-2 pb-1 text-xs uppercase tracking-[0.2em] text-white/35">
              Role para avançar
              <MoveRight className="h-4 w-4" />
            </p>
          </div>
        </div>

        <div ref={wrapperRef} className="mt-16 w-full">
          <div
            ref={trackRef}
            className="flex w-max items-stretch gap-6 pl-[max(2.5rem,calc((100vw-80rem)/2+2.5rem))] pr-[12vw]"
          >
            {etapas.map((etapa, i) => {
              const isActive = i === active;
              const isDone = i < active;
              return (
                <article
                  key={etapa.title}
                  className={cn(
                    "flex min-h-[360px] w-[340px] shrink-0 flex-col justify-between border p-8 transition-colors duration-300 xl:w-[380px]",
                    isActive
                      ? "border-white/25 bg-white/[0.05]"
                      : "border-white/10 bg-white/[0.02]"
                  )}
                >
                  {/* Topo: ícone (preenchido no degradê quando ativo/concluído)
                      + número grande da etapa */}
                  <div className="flex items-start justify-between">
                    <div
                      className={cn(
                        "flex h-12 w-12 shrink-0 items-center justify-center rounded-md border transition-colors duration-300",
                        i <= active
                          ? "border-transparent text-white"
                          : "border-white/15 text-white/40"
                      )}
                      style={
                        i <= active
                          ? { backgroundImage: GRADIENT_FILL }
                          : undefined
                      }
                    >
                      <etapa.icon className="h-5 w-5" strokeWidth={1.6} aria-hidden />
                    </div>
                    <p
                      className={cn(
                        "text-6xl font-semibold leading-none tracking-tight transition-colors duration-300 xl:text-7xl",
                        isActive
                          ? GRADIENT_TEXT
                          : isDone
                            ? "text-white/70"
                            : "text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.25)]"
                      )}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </p>
                  </div>

                  {/* Base: título + descrição */}
                  <div>
                    <h3 className="text-xl font-semibold text-white">
                      {etapa.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-white/55">
                      {etapa.description}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        <div className="container-default mt-16 w-full">
          <div className="flex items-center gap-4 text-xs uppercase tracking-[0.2em] text-white/35">
            <span>01</span>
            <div className="relative h-px flex-1 bg-white/10">
              <div
                ref={progressRef}
                className="absolute inset-0 bg-[linear-gradient(90deg,#6F0101,#3B1F59,#063FB4)]"
                style={{ clipPath: "inset(0 100% 0 0)" }}
              />
            </div>
            <span>08</span>
          </div>
        </div>
      </div>

      {/* ── Mobile: lista vertical, sem pin ── */}
      <div className="py-20 lg:hidden">
        <div className="container-default">
          <Reveal>
            <p className="eyebrow">{eyebrow}</p>
            <h2 className="text-white">{headline}</h2>
            <p className="mt-4 text-sm leading-relaxed text-white/55">{subtitulo}</p>
          </Reveal>

          <ol className="mt-12 space-y-5">
            {etapas.map((etapa, i) => (
              <Reveal as="li" key={etapa.title} delay={0.05}>
                <article className="flex flex-col border border-white/10 bg-white/[0.02] p-7">
                  <div className="flex items-start justify-between">
                    <div
                      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md text-white"
                      style={{ backgroundImage: GRADIENT_FILL }}
                    >
                      <etapa.icon className="h-5 w-5" strokeWidth={1.6} aria-hidden />
                    </div>
                    <p
                      className={cn(
                        "text-5xl font-semibold leading-none tracking-tight",
                        GRADIENT_TEXT
                      )}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </p>
                  </div>
                  <h3 className="mt-6 text-lg font-semibold text-white">
                    {etapa.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/55">
                    {etapa.description}
                  </p>
                </article>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
