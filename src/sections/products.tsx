"use client"

import * as React from "react"
import Link from "next/link"
import Image, { type StaticImageData } from "next/image"
import { AnimatePresence, motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { GlowBorder, GlowBorderOverlay, handleGlowMove } from "@/components/ui/glow-border"
import { Reveal } from "@/components/animations/reveal"

import ibmLogo from "@/assets/IBM Logo.svg"
import veeamLogo from "@/assets/Veeam Logo.svg"
import dellLogo from "@/assets/Dell Logo.svg"
import acronisLogo from "@/assets/Acronis Logo.svg"
import redhatLogo from "@/assets/Red Hat Logo.svg"
import microsoftLogo from "@/assets/Microsoft Logo.svg"
import { Button } from "@/components/ui/button"

// Placeholder enquanto o backend não está conectado. Depois isso vem de
// api.produtos() filtrando os marcados como `destaque` no admin (ver lib/api.ts).
type FeaturedProduct = {
  nome: string
  slug: string
  fabricante: string
  logo: StaticImageData
  // altura do logo (os SVGs têm proporções bem diferentes entre si)
  logoClass: string
  categoria: string
  descricao: string
}

const FEATURED: FeaturedProduct[] = [
  {
    nome: "IBM Guardium",
    slug: "ibm-guardium",
    fabricante: "IBM",
    logo: ibmLogo,
    logoClass: "h-5",
    categoria: "Segurança",
    descricao: "Descoberta, monitoramento e proteção de dados sensíveis em tempo real.",
  },
  {
    nome: "Veeam Data Platform",
    slug: "veeam-data-platform",
    fabricante: "Veeam",
    logo: veeamLogo,
    logoClass: "h-4",
    categoria: "Proteção de Dados",
    descricao: "Backup e recuperação confiáveis para ambientes híbridos e multicloud.",
  },
  {
    nome: "Dell PowerEdge",
    slug: "dell-poweredge",
    fabricante: "Dell Technologies",
    logo: dellLogo,
    logoClass: "h-8",
    categoria: "Infraestrutura",
    descricao: "Servidores de alta performance para as cargas mais críticas do negócio.",
  },
  {
    nome: "Acronis Cyber Protect",
    slug: "acronis-cyber-protect",
    fabricante: "Acronis",
    logo: acronisLogo,
    logoClass: "h-6",
    categoria: "Segurança",
    descricao: "Cibersegurança e backup unificados em uma única solução integrada.",
  },
  {
    nome: "Red Hat OpenShift",
    slug: "red-hat-openshift",
    fabricante: "Red Hat",
    logo: redhatLogo,
    logoClass: "h-6",
    categoria: "Cloud",
    descricao: "Plataforma Kubernetes corporativa para nuvem pública, privada e híbrida.",
  },
  {
    nome: "Microsoft Azure",
    slug: "microsoft-azure",
    fabricante: "Microsoft",
    logo: microsoftLogo,
    logoClass: "h-7",
    categoria: "Cloud",
    descricao: "Nuvem escalável para modernização, inovação e analytics em escala global.",
  },
]

const CATEGORIES = [
  "Todos",
  ...Array.from(new Set(FEATURED.map((p) => p.categoria))),
]

export function Products() {
  const [active, setActive] = React.useState("Todos")
  const filtered =
    active === "Todos"
      ? FEATURED
      : FEATURED.filter((p) => p.categoria === active)

  // Limite de cards: 4 no mobile, 6 do `sm` pra cima (os extras são escondidos via CSS).
  const MOBILE_VISIBLE = 4
  const MAX_VISIBLE = 6
  const visible = filtered.slice(0, MAX_VISIBLE)

  return (
    <section id="produtos" className="relative bg-ink-50 py-20 md:py-28">
      <div className="container-default">
        <Reveal className="flex flex-col items-center gap-4 text-center">
          <p className="eyebrow text-sm">Produtos</p>
          <h2 className="text-ink-950 max-w-4xl text-balance text-3xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.15]">
            Produtos em <span className="text-[var(--brand-light)]">destaque</span>
          </h2>
          <p className="max-w-2xl text-balance text-base text-ink-500 leading-relaxed">
            Uma seleção do nosso catálogo dos principais fabricantes do mundo — prontos
            para resolver desafios reais de infraestrutura, segurança e cloud.
          </p>
        </Reveal>

        {/* Tabs de categoria */}
        <Reveal delay={0.08} className="mt-10 flex flex-wrap items-center justify-center gap-2">
          {CATEGORIES.map((categoria) => {
            const isActive = active === categoria
            return (
              <GlowBorder
                key={categoria}
                type="button"
                onClick={() => setActive(categoria)}
                aria-pressed={isActive}
                glowColor="#0E66FF"
                className={cn(
                  "rounded-full border px-4 py-2 text-sm font-medium transition-colors duration-300 focus-visible:outline-none",
                  isActive
                    ? "border-brand bg-brand text-white shadow-[0_4px_14px_rgba(14,102,255,0.25)]"
                    : "border-ink-200 bg-white text-ink-900 hover:text-ink-950"
                )}
              >
                {categoria}
              </GlowBorder>
            )
          })}
        </Reveal>

        {/* Grid de produtos (filtra com transição) */}
        <Reveal delay={0.12} className="mt-10">
        <motion.div
          layout
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {visible.map((produto, index) => (
              <motion.div
                key={produto.slug}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.25, ease: [0.25, 1, 0.5, 1] }}
                // 5º/6º cards só aparecem do `sm` pra cima (mobile limita a 4)
                className={cn(index >= MOBILE_VISIBLE && "hidden sm:block")}
              >
                <Link
                  href={`/produtos/${produto.slug}`}
                  onMouseMove={handleGlowMove}
                  className="group relative flex h-full flex-col rounded-xl border border-ink-200 bg-white p-6 transition-all duration-300 hover:border-ink-300 hover:shadow-[0_12px_24px_rgba(20,20,19,0.06)]"
                >
                  <GlowBorderOverlay glowColor="#0E66FF" glowSize={240} />
                  <div className="relative flex items-center justify-between gap-3">
                    {/* Logo do fabricante (monocromático, ganha cor/contraste no hover) */}
                    <Image
                      src={produto.logo}
                      alt={produto.fabricante}
                      width={120}
                      height={32}
                      className={cn(
                        "w-auto object-contain opacity-90 transition-opacity duration-300 group-hover:opacity-100",
                        produto.logoClass
                      )}
                    />
                    <span className="rounded-full bg-brand/5 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-brand">
                      {produto.categoria}
                    </span>
                  </div>

                  <h3 className="mt-5 text-lg font-semibold text-ink-950 transition-colors duration-300 group-hover:text-brand">
                    {produto.nome}
                  </h3>
                  <p className="mt-2 flex-grow text-sm leading-relaxed text-ink-500">
                    {produto.descricao}
                  </p>

                  <span className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-brand">
                    Ver produto
                    <ArrowRight
                      className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
                      strokeWidth={2.5}
                    />
                  </span>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
        </Reveal>

        <Reveal delay={0.06} className="mt-12 flex justify-center">
          <Link href="/produtos" className="focus:outline-none w-full sm:w-auto flex justify-center" tabIndex={-1}>
            <Button
              primary="#0E66FF"
              secondary="#001DFF"
              className="w-full sm:w-auto text-sm font-bold py-3.5 sm:px-6 sm:py-3 flex items-center justify-center gap-2 cursor-pointer shadow-[0_4px_20px_rgba(14,102,255,0.25)]"
            >
              Ver todos os produtos
              <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
            </Button>
          </Link>
        </Reveal>
      </div>
    </section>
  )
}

export default Products
