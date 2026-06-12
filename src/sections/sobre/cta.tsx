import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/animations/reveal";

export function SobreCta() {
  return (
    <section className="relative border-t border-ink-200/60 bg-white py-20 md:py-28">
      <div className="container-default flex flex-col items-center text-center">
        <Reveal>
          <p className="eyebrow">Vamos conversar</p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="max-w-2xl text-balance">
            Pronto para escrever o próximo capítulo com a gente?
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mt-4 max-w-xl text-pretty leading-relaxed text-ink-500">
            Fale com quem integra tecnologia desde 2003 — e descubra o que um
            parceiro de verdade muda na sua operação.
          </p>
        </Reveal>
        <Reveal delay={0.3}>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <Link href="/#contact" className="btn-primary !text-white">
              Fale com a gente
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/solucoes" className="btn-secondary !text-ink-950">
              Conheça nossas soluções
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
