import { Reveal } from "@/components/animations/reveal";
import { ConversionCTA } from "@/components/conversion-cta";
import { api } from "@/lib/api";

export async function BlogCta() {
  const cta = await api.cta("blog").catch(() => null);

  return (
    <section className="relative border-t border-ink-200/60 bg-white py-20 md:py-28">
      <div className="container-default max-w-6xl mx-auto">
        <Reveal delay={0.1}>
          <ConversionCTA
            title={cta?.titulo ?? "Quer receber conteúdos técnicos em primeira mão?"}
            subtitle={cta?.subtitulo ?? "Artigos, whitepapers e cases direto da equipe Infodive. Fale com a gente e acompanhe o que produzimos sobre infraestrutura, segurança e cloud."}
            ctaLabel={cta?.ctaTexto ?? "Falar com um especialista"}
            href="/#contact"
          />
        </Reveal>
      </div>
    </section>
  );
}
