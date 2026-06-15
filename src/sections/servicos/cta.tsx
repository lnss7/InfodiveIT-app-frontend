import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/animations/reveal";

/**
 * CTA de fechamento — mesma linguagem do CTA de /sobre, apontando para a seção
 * de contato da home.
 */
export function ServicosCta() {
  return (
    <section className="relative border-t border-ink-200/60 bg-white py-20 md:py-28">
      <div className="container-default flex flex-col items-center text-center">
        <Reveal>
          <p className="eyebrow">Vamos conversar</p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="max-w-2xl text-balance">
            Pronto para tirar seu projeto do papel?
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mt-4 max-w-xl text-pretty leading-relaxed text-ink-500">
            Do diagnóstico à operação assistida, a Infodive assume o ciclo
            completo. Conte o desafio — a gente desenha o caminho.
          </p>
        </Reveal>
        <Reveal delay={0.3}>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <Link href="/#contact" className="btn-primary !text-white">
              Fale com um especialista
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/solucoes" className="btn-secondary !text-ink-950">
              Ver soluções
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
