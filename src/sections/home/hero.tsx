'use client'

import { InteractiveGridPattern } from "@/components/ui/interactive-grid-pattern";
import { ArrowRight, MessageSquare } from "lucide-react";
import { TextEffect } from "@/components/ui/text-effect";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function Hero() {
  return (
    <section className="hero relative overflow-hidden bg-ink-950 flex flex-col justify-center min-h-[90vh]">
      {/* Background Interactive Grid filling the entire section */}
      <InteractiveGridPattern
        width={48}
        height={48}
        squares={[50, 25]}
        className="absolute inset-0 h-full w-full stroke-white/[0.06] [mask-image:radial-gradient(ellipse_at_center,white_20%,transparent_75%)] opacity-30"
        squaresClassName="hover:fill-brand/10 transition-all duration-150"
      />

      <div className="container-default relative z-10 text-center py-20 md:py-28 flex flex-col items-center justify-center">
        {/* Eyebrow */}
        <TextEffect
          per="char"
          preset="fade"
          delay={0.1}
          className="text-xs font-semibold uppercase tracking-[0.25em] text-brand mb-4"
          duration={0.9}
        >
          AI READY CLOUD
        </TextEffect>

        {/* Title */}
        <TextEffect
          per="word"
          as="h1"
          preset="blur"
          delay={0.2}
          duration={0.9}
          className="text-balance text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6 max-w-4xl leading-[1.15]"
        >
          A nuvem que escala a IA com segurança
        </TextEffect>

        {/* Description */}
        <TextEffect
          per="word"
          as="p"
          preset="fade"
          delay={0.5}
          duration={0.9}
          className="text-balance text-base md:text-lg text-ink-300 mb-10 max-w-2xl leading-relaxed"
        >
          Migre para a nuvem pública com controle total, ganhe escala, organize seus dados e elimine surpresas no custo.
        </TextEffect>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <Link href="/solucoes" className="focus:outline-none" tabIndex={-1}>
            <Button primary="#0E66FF" secondary="#001DFF">
              Conheça nossas soluções
              <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
            </Button>
          </Link>
          <Link href="/contato" className="focus:outline-none" tabIndex={-1}>
            <Button
              primary="rgba(255, 255, 255, 0.06)"
              secondary="rgba(255, 255, 255, 0.16)"
              className="border border-white/10"
            >
              <MessageSquare className="h-4 w-4 text-ink-300" strokeWidth={2} />
              Fale conosco
            </Button>
          </Link>
        </div>

        {/* Social Proof */}
        <p className="mt-16 text-[10px] font-semibold uppercase tracking-[0.25em] text-ink-500">
          + 25.000 clientes em 35 países
        </p>
      </div>
    </section>
  )
}
