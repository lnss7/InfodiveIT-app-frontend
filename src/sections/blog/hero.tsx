import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { InteractiveGridPattern } from "@/components/animations/interactive-grid-pattern";
import { Reveal } from "@/components/animations/reveal";
import { TextEffect } from "@/components/animations/text-effect";

/**
 * Hero do /blog — simples e direto, na mesma linguagem dark dos heros de
 * /servicos e /sobre: grid interativo ao fundo, eyebrow, título via TextEffect
 * (blur) e subtítulo. Sem botões.
 */
export function BlogHero() {
  return (
    <section className="relative overflow-hidden border-b border-white/5 bg-[#050507] pb-24 pt-24 text-white sm:pt-40 md:pb-28">
      {/* Grid decorativo interativo ao fundo */}
      <div className="pointer-events-none absolute inset-0 z-0 h-full w-full overflow-hidden">
        <InteractiveGridPattern
          width={48}
          height={48}
          squares={[50, 18]}
          className="absolute inset-0 h-full w-full stroke-white/[0.04] [mask-image:radial-gradient(ellipse_at_center,white_20%,transparent_80%)] opacity-40"
          squaresClassName="hover:fill-brand/10 transition-all duration-150"
        />
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand/10 blur-[120px]" />
      </div>

      <div className="container-default relative z-10 mx-auto flex flex-col px-4">
        <div className="flex justify-start mb-4 sm:mb-6 mt-[-8px] sm:mt-0">
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

        <div className="flex max-w-4xl flex-col items-center mx-auto text-center w-full">
          <Reveal>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-[#7aa9ff]">
              Conteúdos
            </p>
          </Reveal>

        <h1 className="mb-6 text-balance text-4xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-5xl md:text-6xl">
          <TextEffect
            per="word"
            preset="blur"
            as="span"
            delay={0.15}
            duration={0.9}
            highlightWords={["melhores"]}
            highlightClassName="text-transparent [-webkit-text-stroke:1.8px_#0E66FF]"
          >
            Conhecimento técnico para decisões melhores.
          </TextEffect>
        </h1>

        <Reveal delay={0.5}>
          <p className="max-w-2xl text-balance text-base leading-relaxed text-ink-300 sm:text-lg">
            Artigos, materiais técnicos e o que a Infodive compartilha nas redes.
          </p>
        </Reveal>
      </div>
      </div>
    </section>
  );
}
