"use client"

import { useEffect, useRef, useState, type ReactNode } from "react"
import { motion, useScroll, useSpring, useTransform } from "framer-motion"
import { cn } from "@/lib/utils"

/**
 * Tracing Beam (Aceternity UI): um fio vertical à esquerda do conteúdo cujo
 * gradiente "preenche" conforme o usuário rola. Mede a altura do conteúdo via
 * ResizeObserver (robusto a conteúdo dinâmico, como troca de abas).
 */
export function TracingBeam({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const [svgHeight, setSvgHeight] = useState(0)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })

  useEffect(() => {
    const el = contentRef.current
    if (!el) return
    const measure = () => setSvgHeight(el.offsetHeight)
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const y1 = useSpring(
    useTransform(scrollYProgress, [0, 0.8], [50, svgHeight]),
    { stiffness: 500, damping: 90 }
  )
  const y2 = useSpring(
    useTransform(scrollYProgress, [0, 1], [50, svgHeight - 200]),
    { stiffness: 500, damping: 90 }
  )

  return (
    <motion.div
      ref={ref}
      className={cn("relative mx-auto h-full w-full max-w-4xl", className)}
    >
      <div className="hidden md:block absolute top-3 -left-9">
        <motion.div
          transition={{ duration: 0.2, delay: 0.5 }}
          animate={{
            boxShadow:
              scrollYProgress.get() > 0
                ? "none"
                : "0 0 0 1px rgba(20,20,19,0.06)",
          }}
          className="ml-[27px] flex h-4 w-4 items-center justify-center rounded-full border border-ink-200 bg-white shadow-sm"
        >
          <motion.div
            transition={{ duration: 0.2, delay: 0.5 }}
            animate={{
              backgroundColor: scrollYProgress.get() > 0 ? "#fff" : "#0E66FF",
              borderColor: scrollYProgress.get() > 0 ? "#D8D8D8" : "#0E66FF",
            }}
            className="h-2 w-2 rounded-full border border-ink-300 bg-brand"
          />
        </motion.div>
        <svg
          viewBox={`0 0 20 ${svgHeight}`}
          width="20"
          height={svgHeight}
          className="ml-4 block"
          aria-hidden
        >
          <motion.path
            d={`M 1 0V -36 l 18 24 V ${svgHeight * 0.8} l -18 24V ${svgHeight}`}
            fill="none"
            stroke="#D8D8D8"
            strokeOpacity="0.5"
            transition={{ duration: 10 }}
          />
          <motion.path
            d={`M 1 0V -36 l 18 24 V ${svgHeight * 0.8} l -18 24V ${svgHeight}`}
            fill="none"
            stroke="url(#beam-gradient)"
            strokeWidth="1.5"
            className="motion-reduce:hidden"
            transition={{ duration: 10 }}
          />
          <defs>
            <motion.linearGradient
              id="beam-gradient"
              gradientUnits="userSpaceOnUse"
              x1="0"
              x2="0"
              y1={y1}
              y2={y2}
            >
              <stop stopColor="#0E66FF" stopOpacity="0" />
              <stop stopColor="#0E66FF" />
              <stop offset="0.7" stopColor="#7aa9ff" />
              <stop offset="1" stopColor="#001DFF" stopOpacity="0" />
            </motion.linearGradient>
          </defs>
        </svg>
      </div>
      <div ref={contentRef}>{children}</div>
    </motion.div>
  )
}
