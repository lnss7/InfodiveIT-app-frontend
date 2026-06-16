import * as React from "react"
import { cn } from "@/lib/utils"

/**
 * Área de conteúdo de um card (estilo shadcn). Aplica o padding padrão
 * `p-6 pt-0`, pensado para vir logo abaixo de um cabeçalho de card.
 *
 * @param className - Classes Tailwind adicionais (mescladas com `cn`).
 * @param children - Conteúdo interno do card.
 *
 * @example
 * <CardContent className="flex flex-col gap-2">
 *   <h4>Título</h4>
 *   <p>Descrição</p>
 * </CardContent>
 */
const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

export { CardContent }
