import { BentoGridSolutions } from "@/components/bento-grid-solutions"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export function Solutions() {
  return (
    <section id="solutions" className="relative bg-white py-20 md:py-28">
      <div className="container-default">
        <div className="flex flex-col items-center gap-4 text-center">
          <p className="eyebrow text-sm">Soluções</p>
          <h2 className="text-ink-950 max-w-4xl text-balance text-3xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.15]">
            Um <span className="text-[var(--brand-light)]">portfólio completo</span> para a sua operação crítica
          </h2>
          <Link href="/solucoes" className="focus:outline-none w-full sm:w-auto flex justify-center" tabIndex={-1}>
            <Button
              primary="#0E66FF"
              secondary="#001DFF"
              className="mt-2 w-full sm:w-auto text-xs px-4 py-2.5 sm:text-sm sm:px-6 sm:py-3 font-semibold"
            >
              Ver todas as soluções
              <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
            </Button>
          </Link>
        </div>
        <div className="mt-10">
          <BentoGridSolutions />
        </div>
      </div>
    </section>
  )
}
