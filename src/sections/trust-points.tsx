"use client"

import React, { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { NumberTicker } from "@/components/ui/number-ticker"

type Stat = {
  eyebrow: string
  prefix?: string
  prefixClass?: string
  suffix?: string
  suffixClass?: string
  value: number
  startValue: number
  title: string
  desc: string
}

const STATS: Stat[] = [
  {
    eyebrow: "Tradição",
    prefix: "Desde",
    prefixClass: "text-2xl sm:text-3xl font-bold mr-2 text-ink-300",
    value: 2003,
    startValue: 1900,
    title: "História no mercado de TI",
    desc: "Consolidando infraestruturas críticas e integrando inovações tecnológicas há mais de duas décadas.",
  },
  {
    eyebrow: "Confiança",
    prefix: "+",
    prefixClass: "text-brand mr-1 font-bold",
    value: 100,
    startValue: 0,
    title: "Clientes ativos e satisfeitos",
    desc: "Parcerias sólidas com bancos, hospitais, indústrias e grandes redes varejistas em todo o país.",
  },
  {
    eyebrow: "Sucesso",
    suffix: "%",
    suffixClass: "text-brand ml-1 font-bold",
    value: 100,
    startValue: 0,
    title: "Projetos entregues com sucesso",
    desc: "Projetos de alta complexidade em nuvem, migração e segurança executados com taxa perfeita de sucesso.",
  },
]

export const TrustPoints = () => {
  const sectionRef = useRef<HTMLElement>(null)

  // Progresso da seção atravessando a viewport (suavizado pelo Lenis).
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  // Parallax vertical por coluna — magnitudes distintas dão profundidade/staggered.
  // No meio da passagem (progresso ~0.5) o offset é 0 (posição "de descanso").
  const yCol1 = useTransform(scrollYProgress, [0, 1], [40, -40])
  const yCol2 = useTransform(scrollYProgress, [0, 1], [18, -18])
  const yCol3 = useTransform(scrollYProgress, [0, 1], [32, -32])
  const parallax = [yCol1, yCol2, yCol3]

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-ink-50 py-20 md:py-24"
    >
      <div className="container-default relative z-10">
        <div className="relative grid grid-cols-1 divide-y divide-ink-200/80 md:grid-cols-3 md:divide-y-0">

          {/* Divisórias verticais animadas (desktop) — "crescem" ao entrar */}
          {[1, 2].map((pos) => (
            <motion.span
              key={pos}
              aria-hidden
              initial={{ scaleY: 0, opacity: 0 }}
              whileInView={{ scaleY: 1, opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: 0.25 + pos * 0.1, ease: [0.25, 1, 0.5, 1] }}
              style={{ left: `${(pos * 100) / 3}%` }}
              className="absolute top-1/2 hidden h-2/3 w-px -translate-y-1/2 origin-center md:block"
            />
          ))}

          {STATS.map((stat, index) => (
            // Wrapper de parallax (não conflita com o y da entrada, que vai no filho)
            <motion.div key={stat.eyebrow} style={{ y: parallax[index] }}>
              <motion.div
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.12,
                  ease: [0.25, 1, 0.5, 1],
                }}
                className="flex flex-col items-center justify-center p-6 text-center md:p-8"
              >
                <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.2em] text-brand">
                  {stat.eyebrow}
                </p>

                <div className="flex items-baseline justify-center text-5xl font-black tracking-tighter text-ink-950 sm:text-6xl">
                  {stat.prefix && <span className={stat.prefixClass}>{stat.prefix}</span>}
                  <NumberTicker
                    value={stat.value}
                    startValue={stat.startValue}
                    className="font-black text-ink-950"
                  />
                  {stat.suffix && <span className={stat.suffixClass}>{stat.suffix}</span>}
                </div>

                <h4 className="mt-4 text-base font-bold text-ink-950">{stat.title}</h4>
                <p className="mt-2 max-w-xs font-sans text-sm font-light leading-relaxed text-ink-500">
                  {stat.desc}
                </p>
              </motion.div>
            </motion.div>
          ))}

        </div>
      </div>
    </section>
  )
}

export default TrustPoints
