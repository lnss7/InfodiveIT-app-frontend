import { TextReveal } from "@/components/ui/text-reveal";

/**
 * Manifesto — frase-síntese revelada palavra a palavra conforme o scroll.
 * O track de 240vh segura a frase fixa na tela enquanto ela "acende",
 * com um hold curto antes de soltar (mesma mecânica de problems.tsx).
 */
export function SobreManifesto() {
  return (
    <section className="relative bg-white">
      <TextReveal
        text={
          "Tecnologia muda o tempo todo.\nCompromisso, não.\nIntegramos o que mantém empresas em movimento."
        }
        highlightLines={[1]}
        revealViewports={2}
        trackHeight="h-[360vh]"
      />
    </section>
  );
}
