import { type ComponentPropsWithoutRef, type ReactNode } from "react"
import { cn } from "@/lib/utils"
import { ArrowRight } from "lucide-react"

interface BentoGridProps extends ComponentPropsWithoutRef<"div"> {
  children: ReactNode
  className?: string
}

interface BentoCardProps extends ComponentPropsWithoutRef<"div"> {
  name: string
  className: string
  background: ReactNode
  Icon: React.ElementType
  description: string
  href: string
  cta: string
}

/**
 * Grade de bento (estilo Magic UI). Container em grid de 3 colunas com linhas de
 * altura automática; os filhos `BentoCard` controlam o quanto ocupam via
 * `className` (ex.: `col-span-2`).
 *
 * @param className - Classes Tailwind adicionais (mescladas com `cn`).
 * @param children - Cards do grid (tipicamente `BentoCard`).
 *
 * @example
 * <BentoGrid>
 *   <BentoCard name="..." className="col-span-2" {...} />
 *   <BentoCard name="..." className="col-span-1" {...} />
 * </BentoGrid>
 */
const BentoGrid = ({ children, className, ...props }: BentoGridProps) => {
  return (
    <div
      className={cn(
        "grid w-full auto-rows-[22rem] grid-cols-3 gap-4",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

/**
 * Card individual do `BentoGrid`. Mostra um ícone, título e descrição; ao passar
 * o mouse, o conteúdo sobe e revela o CTA no rodapé.
 *
 * @param name - Título do card (também usado como `key`).
 * @param className - Classes Tailwind, incluindo o span de colunas (ex.: `col-span-2`).
 * @param background - Nó React renderizado ao fundo (imagem, gradiente, padrão).
 * @param Icon - Componente de ícone (ex.: ícone do `lucide-react`).
 * @param description - Texto descritivo do card.
 * @param href - Destino do link de CTA.
 * @param cta - Rótulo do link de CTA (ex.: "Saiba mais").
 *
 * @example
 * <BentoCard
 *   name="Infraestrutura"
 *   className="col-span-2"
 *   background={<GradientBg />}
 *   Icon={Server}
 *   description="Servidores e redes resilientes."
 *   href="/solucoes/infraestrutura"
 *   cta="Saiba mais"
 * />
 */
const BentoCard = ({
  name,
  className,
  background,
  Icon,
  description,
  href,
  cta,
  ...props
}: BentoCardProps) => (
  <div
    key={name}
    className={cn(
      "group relative col-span-3 flex flex-col justify-between overflow-hidden rounded-xl",
      "bg-[#f7f9f8] border border-ink-200",
      "[box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]",
      className
    )}
    {...props}
  >
    <div>{background}</div>

    {/* Desfoque progressivo no rodapé (estilo Magic UI): pilha de camadas com blur
        crescente + máscara em gradiente. Fica acima do background e abaixo do texto
        (z-10), então o conteúdo do fundo some borrado na borda de baixo sem afetar
        o título/CTA. */}
    <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-3/5">
      <div className="absolute inset-0 backdrop-blur-[2px] [mask-image:linear-gradient(to_top,#000_0%,#000_35%,transparent_95%)]" />
      <div className="absolute inset-0 backdrop-blur-[6px] [mask-image:linear-gradient(to_top,#000_0%,transparent_78%)]" />
      <div className="absolute inset-0 backdrop-blur-[12px] [mask-image:linear-gradient(to_top,#000_0%,transparent_60%)]" />
    </div>

    <div className="pointer-events-none z-10 flex transform-gpu flex-col gap-1 p-6 transition-all duration-300 group-hover:-translate-y-10">
      <Icon className="h-10 w-10 origin-left transform-gpu text-ink-500 transition-all duration-300 ease-in-out group-hover:scale-90" />
      <h3 className="text-xl font-semibold text-ink-950">{name}</h3>
      <p className="max-w-lg text-ink-500">{description}</p>
    </div>

    <div className="pointer-events-none absolute bottom-0 z-20 flex w-full translate-y-10 transform-gpu flex-row items-center p-6 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
      <a
        href={href}
        className="pointer-events-auto inline-flex items-center gap-1 text-sm font-medium text-brand hover:text-brand-deep"
      >
        {cta}
        <ArrowRight className="h-4 w-4" />
      </a>
    </div>

    <div className="pointer-events-none absolute inset-0 transform-gpu transition-all duration-300 group-hover:bg-ink-950/[0.02]" />
  </div>
)

export { BentoCard, BentoGrid }
