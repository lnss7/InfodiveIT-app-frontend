import { Reveal } from "@/components/animations/reveal";
import { ConversionCTA } from "@/components/conversion-cta";
import { api } from "@/lib/api";

export async function SobreCta() {
  const cta = await api.cta("sobre").catch(() => null);

  return (
    <section className="relative border-t border-ink-200/60 bg-white py-20 md:py-28">
      <div className="container-default max-w-6xl mx-auto">
        <Reveal delay={0.1}>
          <ConversionCTA
            title={cta?.titulo ?? "Pronto para escrever o próximo capítulo com a gente?"}
            subtitle={cta?.subtitulo ?? "Fale com quem integra tecnologia desde 2003 — e descubra o que um parceiro de verdade muda na sua operação."}
            ctaLabel={cta?.ctaTexto ?? "Falar com a gente"}
            href="/#contact"
          />
        </Reveal>
      </div>
    </section>
  );
}
