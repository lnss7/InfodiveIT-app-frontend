"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import type { StaticImageData } from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import { Reveal } from "@/components/animations/reveal";

// Imagens placeholder (reusadas de cases/bento-grid) — trocar por fotos
// reais de equipe/escritório quando disponíveis.
import financeImg from "@/assets/cases/finance.png";
import industryImg from "@/assets/cases/industry.png";
import retailImg from "@/assets/cases/retail.png";

gsap.registerPlugin(ScrollTrigger);

type Foto = {
  src: StaticImageData;
  alt: string;
  /** Intensidade do parallax em yPercent (positivo desce, negativo sobe). */
  speed: number;
  className: string;
};

const FOTOS: Foto[] = [
  {
    src: financeImg,
    alt: "Equipe Infodive em projeto no setor financeiro",
    speed: 8,
    className: "md:col-span-5 aspect-[4/5]",
  },
  {
    src: industryImg,
    alt: "Operação de infraestrutura em ambiente industrial",
    speed: -6,
    className: "md:col-span-4 md:mt-16 aspect-[3/4]",
  },
  {
    src: retailImg,
    alt: "Time Infodive em implantação no varejo",
    speed: 12,
    className: "md:col-span-3 md:mt-28 aspect-[3/4]",
  },
];

/**
 * Cultura — grid assimétrico de fotos com parallax em velocidades
 * diferentes (cada imagem tem seu próprio yPercent atrelado ao scroll) e
 * reveal de entrada com zoom-out mascarado pelo container.
 */
export function SobreCultura() {
  const sectionRef = useRef<HTMLElement>(null);

  // Parallax por foto — desktop apenas (transform atrelado ao scroll trava no iOS).
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const mm = gsap.matchMedia();
    mm.add("(min-width: 1024px)", () => {
      const fotos = gsap.utils.toArray<HTMLElement>("[data-parallax]", section);
      fotos.forEach((el) => {
        const speed = Number(el.dataset.parallax) || 0;
        gsap.fromTo(
          el,
          { yPercent: speed },
          {
            yPercent: -speed,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
              invalidateOnRefresh: true,
            },
          }
        );
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden border-t border-ink-200/60 bg-ink-50 py-20 md:py-28"
    >
      <div className="container-default">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <Reveal>
              <p className="eyebrow">Cultura</p>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="text-balance">
                Gente que gosta de problema difícil.
              </h2>
            </Reveal>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <Reveal delay={0.2}>
              <p className="text-pretty leading-relaxed text-ink-500 lg:mt-2">
                Por trás de cada projeto há um time que estuda fabricante novo
                no fim de semana, atende chamado crítico de madrugada e celebra
                migração concluída como final de campeonato. É essa cultura que
                os clientes contratam junto com a tecnologia.
              </p>
            </Reveal>
          </div>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-12 md:gap-6">
          {FOTOS.map((foto, index) => (
            <div
              key={foto.alt}
              data-parallax={foto.speed}
              className={foto.className}
            >
              <div className="h-full w-full overflow-hidden">
                <motion.div
                  initial={{ scale: 1.12 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{
                    duration: 1.2,
                    delay: index * 0.1,
                    ease: [0.25, 1, 0.5, 1],
                  }}
                  className="h-full w-full"
                >
                  <Image
                    src={foto.src}
                    alt={foto.alt}
                    className="h-full w-full object-cover"
                    placeholder="blur"
                  />
                </motion.div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
