import { Reveal } from "@/components/animations/reveal";
import { ConversionCTA } from "@/components/conversion-cta";
import { api } from "@/lib/api";

export async function ServicosCta() {
  const cta = await api.cta("servicos").catch(() => null);

  return (
    <section className="relative border-t border-ink-200/60 bg-white py-20 md:py-28">
      <div className="container-default max-w-6xl mx-auto">
        <Reveal delay={0.1}>
          <ConversionCTA
            title={cta?.titulo ?? "Pronto para tirar seu projeto do papel?"}
            subtitle={cta?.subtitulo ?? "Do diagnóstico à operação assistida, a Infodive assume o ciclo completo. Conte o desafio — a gente desenha o caminho."}
            ctaLabel={cta?.ctaTexto ?? "Falar com especialista"}
            tipoAcao={cta?.tipoAcao ?? "DRAWER"}
          />
        </Reveal>
      </div>
    </section>
  );
}
