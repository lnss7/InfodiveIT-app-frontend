import { Reveal } from "@/components/animations/reveal";

/**
 * Manifesto — respiro editorial entre o hero e o ciclo. Frase estática única,
 * sem pin/scrub: apenas um Reveal leve na entrada. A palavra "funcionar" usa
 * contorno transparente (stroke) na cor da marca para o destaque.
 */
export function ServicosManifesto() {
  return (
    <section className="relative border-t border-ink-200/60 bg-white py-28 md:py-40">
      <div className="container-default flex justify-center">
        <Reveal blur={6}>
          <p className="max-w-4xl text-balance text-center text-3xl font-semibold leading-[1.18] tracking-tight text-ink-950 sm:text-4xl md:text-5xl">
            Comprar tecnologia é fácil.
            <br className="hidden sm:block" /> Difícil é fazê-la{" "}
            <span className="text-transparent [-webkit-text-stroke:1.5px_#0E66FF]">
              funcionar
            </span>
            .
          </p>
        </Reveal>
      </div>
    </section>
  );
}
