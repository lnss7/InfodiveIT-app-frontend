import { BentoDemo } from "@/components/ui/bento-demo"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function Solutions() {
  return (
    <section id="solutions" className="relative bg-white py-20 md:py-28">
      <div className="container-default">
        <div className="flex flex-col items-center gap-4 text-center">
          <p className="eyebrow">Soluções</p>
          <h2 className="text-ink-950 max-w-3xl text-balance">
            Um portfólio completo para a sua operação crítica
          </h2>
          <Button
            primary="#0E66FF"
            secondary="#001DFF"
            className="mt-2 w-full sm:w-auto text-xs px-4 py-2.5 sm:text-sm sm:px-6 sm:py-3 font-semibold"
          >
            Ver todas as soluções
            <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
          </Button>
        </div>
        <div className="mt-10">
          <BentoDemo />
        </div>
      </div>
    </section>
  )
}
