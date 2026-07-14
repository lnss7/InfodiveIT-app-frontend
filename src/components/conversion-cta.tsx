"use client"

import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface ConversionCTAProps {
  title: string
  subtitle: string
  ctaLabel?: string
  href?: string
  tipoAcao?: string
  onCtaClick?: () => void
}

/**
 * Caixa de conversão com degradê da marca + efeitos decorativos (arcos e pontos).
 * Mesmo visual da seção Contact e do detalhe de Soluções — reusável.
 */
export function ConversionCTA({
  title,
  subtitle,
  ctaLabel = "Falar com especialista",
  href,
  tipoAcao,
  onCtaClick,
}: ConversionCTAProps) {
  const handleClick = () => {
    if (tipoAcao === "REDIRECT_HOME_CONTACT") {
      if (typeof window !== "undefined") {
        if (window.location.pathname === "/") {
          const el = document.getElementById("contact")
          if (el) {
            el.scrollIntoView({ behavior: "smooth", block: "start" })
            return
          }
        }
        window.location.href = "/#contact"
      }
    } else if (onCtaClick) {
      onCtaClick()
    }
  }

  return (
    <div
      className="relative overflow-hidden rounded-[2rem] px-6 py-12 sm:px-10 md:px-14 md:py-16 text-center text-white shadow-2xl shadow-[#3B1F59]/30"
      style={{ background: "linear-gradient(135deg, #6F0101 0%, #3B1F59 50%, #063FB4 100%)" }}
    >
      {/* Brilho suave no topo */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.16),transparent_55%)]"
      />
      {/* Orb de luz azul central */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-[#0E66FF]/25 blur-[120px]"
      />
      {/* Arcos finos nos cantos */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0, scale: 0.7, x: 30, y: -30 }}
        whileInView={{ opacity: 1, scale: 1, x: 0, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.1 }}
        className="pointer-events-none absolute -right-10 -top-10 sm:-right-16 sm:-top-16 h-36 w-36 sm:h-56 sm:w-56 rounded-full border border-white/15"
      />
      <motion.div
        aria-hidden
        initial={{ opacity: 0, scale: 0.7, x: 45, y: -45 }}
        whileInView={{ opacity: 1, scale: 1, x: 0, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
        className="pointer-events-none absolute -right-16 -top-16 sm:-right-28 sm:-top-28 h-48 w-48 sm:h-80 sm:w-80 rounded-full border border-white/10"
      />
      <motion.div
        aria-hidden
        initial={{ opacity: 0, scale: 0.7, x: -30, y: 30 }}
        whileInView={{ opacity: 1, scale: 1, x: 0, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.1 }}
        className="pointer-events-none absolute -left-10 -bottom-10 sm:-left-16 sm:-bottom-16 h-36 w-36 sm:h-56 sm:w-56 rounded-full border border-white/15"
      />
      <motion.div
        aria-hidden
        initial={{ opacity: 0, scale: 0.7, x: -45, y: 45 }}
        whileInView={{ opacity: 1, scale: 1, x: 0, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
        className="pointer-events-none absolute -left-16 -bottom-16 sm:-left-28 sm:-bottom-28 h-48 w-48 sm:h-80 sm:w-80 rounded-full border border-white/10"
      />
      {/* Padrão de pontos sutil */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.15] [background-image:radial-gradient(rgba(255,255,255,0.7)_1px,transparent_1px)] [background-size:22px_22px] [mask-image:radial-gradient(ellipse_at_bottom_left,black,transparent_45%)]"
      />

      <div className="relative z-10 flex flex-col items-center justify-center">
        <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white mb-4 leading-[1.2]">
          {title}
        </h3>
        <p className="text-ink-300 text-sm sm:text-base font-light leading-relaxed max-w-2xl mx-auto mb-8 text-pretty">
          {subtitle}
        </p>
        {href && !tipoAcao ? (
          <Link href={href} className="focus:outline-none" tabIndex={-1}>
            <Button
              variant="primary"
              size="lg"
              className="text-sm px-8 py-4 font-bold text-white cursor-pointer shadow-[0_4px_20px_rgba(14,102,255,0.25)]"
            >
              {ctaLabel}
              <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
            </Button>
          </Link>
        ) : (
          <Button
            variant="primary"
            size="lg"
            onClick={handleClick}
            className="text-sm px-8 py-4 font-bold text-white cursor-pointer shadow-[0_4px_20px_rgba(14,102,255,0.25)]"
          >
            {ctaLabel}
            <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
          </Button>
        )}
      </div>
    </div>
  )
}
