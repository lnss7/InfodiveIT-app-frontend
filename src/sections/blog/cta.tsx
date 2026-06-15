import { Reveal } from "@/components/animations/reveal";
import { ConversionCTA } from "@/components/conversion-cta";

/**
 * CTA de fechamento do /blog — mesma linguagem do CTA de /servicos, voltado a
 * capturar interesse em receber conteúdos técnicos.
 */
export function BlogCta() {
  return (
    <section className="relative border-t border-ink-200/60 bg-white py-20 md:py-28">
      <div className="container-default max-w-6xl mx-auto">
        <Reveal delay={0.1}>
          <ConversionCTA
            title="Quer receber conteúdos técnicos em primeira mão?"
            subtitle="Artigos, whitepapers e cases direto da equipe Infodive. Fale com a gente e acompanhe o que produzimos sobre infraestrutura, segurança e cloud."
            ctaLabel="Falar com um especialista"
            href="/#contact"
          />
        </Reveal>
      </div>
    </section>
  );
}
