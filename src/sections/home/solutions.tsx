"use client";

import { useState, useEffect } from "react";
import { BentoGridSolutions } from "@/components/bento-grid-solutions";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/animations/reveal";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { api } from "@/lib/api";

export function Solutions() {
  const [info, setInfo] = useState({
    eyebrow: "Soluções",
    headline: "Um portfólio completo para a sua operação crítica",
    subtitulo: "",
  });

  useEffect(() => {
    api.secaoHome("solucoes")
      .then((data) => {
        if (data) {
          setInfo({
            eyebrow: data.eyebrow || "Soluções",
            headline: data.headline || "Um portfólio completo para a sua operação crítica",
            subtitulo: data.subtitulo || "",
          });
        }
      })
      .catch(() => { /* fallback */ });
  }, []);

  return (
    <section id="solutions" className="relative bg-white py-20 md:py-28">
      <div className="container-default">
        <Reveal className="flex flex-col items-center gap-4 text-center">
          <p className="eyebrow text-sm">{info.eyebrow}</p>
          <h2 className="text-ink-950 max-w-4xl text-balance text-3xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.15]">
            {info.headline.includes("portfólio completo") ? (
              <>
                {info.headline.split("portfólio completo")[0]}
                <span className="text-[var(--brand-light)]">
                  portfólio completo
                </span>
                {info.headline.split("portfólio completo")[1]}
              </>
            ) : (
              info.headline
            )}
          </h2>
          {info.subtitulo && (
            <p className="text-ink-500 text-sm sm:text-base max-w-2xl font-light">
              {info.subtitulo}
            </p>
          )}
          <Link
            href="/solucoes"
            className="focus:outline-none w-full sm:w-auto flex justify-center"
            tabIndex={-1}
          >
            <Button
              variant="primary"
              className="mt-2 w-full sm:w-auto text-sm font-bold py-3.5 sm:px-6 sm:py-3 flex items-center justify-center gap-2 cursor-pointer shadow-[0_4px_20px_rgba(14,102,255,0.25)]"
            >
              Ver todas as soluções
              <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
            </Button>
          </Link>
        </Reveal>
        <Reveal delay={0.1} className="mt-10">
          <BentoGridSolutions />
        </Reveal>
      </div>
    </section>
  );
}
