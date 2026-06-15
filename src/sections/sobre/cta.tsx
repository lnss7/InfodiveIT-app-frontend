import { Reveal } from "@/components/animations/reveal";
import { ConversionCTA } from "@/components/conversion-cta";

export function SobreCta() {
  return (
    <section className="relative border-t border-ink-200/60 bg-white py-20 md:py-28">
      <div className="container-default max-w-6xl mx-auto">
        <Reveal delay={0.1}>
          <ConversionCTA
            title="Pronto para escrever o próximo capítulo com a gente?"
            subtitle="Fale com quem integra tecnologia desde 2003 — e descubra o que um parceiro de verdade muda na sua operação."
            ctaLabel="Falar com a gente"
            href="/#contact"
          />
        </Reveal>
      </div>
    </section>
  );
}
