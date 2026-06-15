import { Reveal } from "@/components/animations/reveal";
import { ConversionCTA } from "@/components/conversion-cta";

/**
 * CTA de fechamento — mesma linguagem do CTA de /sobre, apontando para a seção
 * de contato da home.
 */
export function ServicosCta() {
  return (
    <section className="relative border-t border-ink-200/60 bg-white py-20 md:py-28">
      <div className="container-default max-w-6xl mx-auto">
        <Reveal delay={0.1}>
          <ConversionCTA
            title="Pronto para tirar seu projeto do papel?"
            subtitle="Do diagnóstico à operação assistida, a Infodive assume o ciclo completo. Conte o desafio — a gente desenha o caminho."
            ctaLabel="Falar com especialista"
            href="/#contact"
          />
        </Reveal>
      </div>
    </section>
  );
}
