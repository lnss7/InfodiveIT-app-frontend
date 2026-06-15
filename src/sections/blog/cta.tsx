import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/animations/reveal";

/**
 * CTA de fechamento do /blog — mesma linguagem do CTA de /servicos, voltado a
 * capturar interesse em receber conteúdos técnicos.
 */
export function BlogCta() {
  return (
    <section className="relative border-t border-ink-200/60 bg-white py-20 md:py-28">
      <div className="container-default flex flex-col items-center text-center">
        <Reveal>
          <p className="eyebrow">Fique por dentro</p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="max-w-2xl text-balance">
            Quer receber conteúdos técnicos em primeira mão?
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mt-4 max-w-xl text-pretty leading-relaxed text-ink-500">
            Artigos, whitepapers e cases direto da equipe Infodive. Fale com a
            gente e acompanhe o que produzimos sobre infraestrutura, segurança e
            cloud.
          </p>
        </Reveal>
        <Reveal delay={0.3}>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <Link href="/#contact" className="btn-primary !text-white">
              Fale com um especialista
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/servicos" className="btn-secondary !text-ink-950">
              Conheça nossos serviços
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
