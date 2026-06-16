import * as React from "react"
import { cn } from "@/lib/utils"

type BadgeVariant = "default" | "brand" | "secondary" | "outline"

const VARIANTS: Record<BadgeVariant, string> = {
  default: "border-transparent bg-brand text-white",
  brand: "border-brand/10 bg-brand/5 text-brand",
  secondary: "border-ink-200 bg-ink-50 text-ink-600",
  outline: "border-ink-200 text-ink-700",
}

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant
}

/**
 * Badge (estilo shadcn) — selo curto de categoria/subcategoria.
 *
 * @param variant - Aparência do selo. Default: `'default'`.
 *   - `'default'`: fundo brand sólido, texto branco.
 *   - `'brand'`: fundo brand translúcido, texto brand. Para selos sobre branco.
 *   - `'secondary'`: cinza neutro (ink-50/ink-600).
 *   - `'outline'`: apenas borda, sem fundo.
 * @param className - Classes Tailwind adicionais (mescladas com `cn`).
 * @param props - Demais atributos HTML de um `<span>`.
 *
 * @example
 * <Badge variant="brand">Segurança</Badge>
 */
export function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide",
        VARIANTS[variant],
        className
      )}
      {...props}
    />
  )
}
