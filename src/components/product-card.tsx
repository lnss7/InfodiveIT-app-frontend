"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { GlowBorderOverlay, handleGlowMove } from "@/components/ui/glow-border"
import { Badge } from "@/components/ui/badge"
import type { Product } from "@/lib/products-data"

/** Card de produto reusável (catálogo e "produtos relacionados"). */
export function ProductCard({
  product,
  className,
}: {
  product: Product
  className?: string
}) {
  return (
    <Link
      href={`/produtos/${product.slug}`}
      onMouseMove={handleGlowMove}
      className={cn(
        "group relative flex h-full flex-col rounded-xl border border-ink-200 bg-white p-6 transition-all duration-300 hover:border-ink-300 hover:shadow-[0_12px_24px_rgba(20,20,19,0.06)]",
        className
      )}
    >
      <GlowBorderOverlay glowColor="#0E66FF" glowSize={240} />

      <div className="relative flex items-center justify-between gap-3">
        <Image
          src={product.logo}
          alt={product.fabricante}
          width={120}
          height={32}
          className={cn(
            "w-auto object-contain opacity-90 transition-opacity duration-300 group-hover:opacity-100",
            product.logoClass
          )}
        />
        <Badge variant="brand">{product.categoria}</Badge>
      </div>

      <h3 className="mt-5 text-lg font-semibold text-ink-950 transition-colors duration-300 group-hover:text-brand">
        {product.nome}
      </h3>
      <p className="mt-1 text-xs font-medium text-ink-400">{product.subcategoria}</p>
      <p className="mt-2 flex-grow text-sm leading-relaxed text-ink-500">
        {product.descricaoCurta}
      </p>

      <span className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-brand">
        Ver produto
        <ArrowRight
          className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
          strokeWidth={2.5}
        />
      </span>
    </Link>
  )
}
