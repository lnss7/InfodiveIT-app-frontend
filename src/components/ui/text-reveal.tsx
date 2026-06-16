"use client"

import React, { useRef, useState, useEffect, useMemo } from "react"
import { cn } from "@/lib/utils"

interface TextRevealProps {
  /** Texto a revelar. Use `\n` para forçar quebra de linha. */
  text: string
  className?: string
  /** Índices das linhas (separadas por `\n`) que recebem a cor de destaque. */
  highlightLines?: number[]
  /** Classe das palavras destacadas. */
  highlightClassName?: string
  /**
   * Altura da pista de scroll. A revelação completa em ~(revealViewports × 100vh)
   * de rolagem; o excedente vira "hold" — a frase fica fixa, 100% revelada, antes
   * de soltar. Útil para um painel subir por cima da frase já revelada.
   */
  trackHeight?: string
  /**
   * Quantos viewports de scroll a revelação leva para completar. 1 = padrão
   * (rápido, ~100vh). Valores maiores deixam as palavras acenderem mais devagar.
   * Lembre de aumentar `trackHeight` junto: ele precisa ser pelo menos
   * (revealViewports + 1) × 100vh para a frase terminar de revelar antes de soltar.
   */
  revealViewports?: number
}

interface ScrollWordProps {
  word: string
  progress: number
  range: [number, number]
  highlightClassName?: string
}

const ScrollWord: React.FC<ScrollWordProps> = ({
  word,
  progress,
  range,
  highlightClassName,
}) => {
  const [start, end] = range

  const opacity = useMemo(() => {
    if (progress < start) return 0
    if (progress > end) return 1
    return (progress - start) / (end - start)
  }, [progress, start, end])

  return (
    <span className="relative mx-1.5 inline-block lg:mx-2">
      {/* Fantasma esmaecido (estado não revelado) */}
      <span className="absolute inset-0 select-none text-ink-950/15">{word}</span>
      {/* Texto revelado por cima — opacidade ligada ao scroll */}
      <span
        style={{ opacity }}
        className={cn(
          "relative transition-opacity duration-75",
          highlightClassName ?? "text-ink-950"
        )}
      >
        {word}
      </span>
    </span>
  )
}

/**
 * Frase que se revela palavra por palavra conforme o usuário rola (estilo
 * Magic UI). Cada palavra acende sua opacidade ligada ao progresso de scroll
 * dentro de uma pista (`trackHeight`) com a frase em `sticky`.
 *
 * @param text - Texto a revelar. Use `\n` para forçar quebra de linha.
 * @param highlightLines - Índices das linhas (separadas por `\n`) que recebem a
 *   cor de destaque. Default: `[]`.
 * @param highlightClassName - Classe das palavras destacadas. Default: `"text-brand"`.
 * @param trackHeight - Altura da pista de scroll. Default: `"h-[200vh]"`.
 * @param revealViewports - Quantos viewports de scroll a revelação leva para
 *   completar. Default: `1`.
 * @param className - Classes Tailwind adicionais no container.
 *
 * @example
 * <TextReveal
 *   text={"Tecnologia de\nmissão crítica"}
 *   highlightLines={[1]}
 * />
 */
export const TextReveal: React.FC<TextRevealProps> = ({
  text,
  className,
  highlightLines = [],
  highlightClassName = "text-brand",
  trackHeight = "h-[200vh]",
  revealViewports = 1,
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [scrollYProgress, setScrollYProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      // progresso 0 quando o topo do container está no topo da viewport;
      // chega a 1 ao rolar `revealViewports` alturas de viewport. Quanto maior
      // revealViewports, mais devagar as palavras acendem em relação ao scroll.
      const progress =
        (rect.top / (window.innerHeight * revealViewports)) * -1
      setScrollYProgress(progress)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    window.addEventListener("resize", handleScroll)
    handleScroll() // cálculo inicial no mount

    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("resize", handleScroll)
    }
  }, [revealViewports])

  const highlightSet = useMemo(() => new Set(highlightLines), [highlightLines])
  const lines = useMemo(
    () => text.split("\n").map((line) => line.trim().split(" ")),
    [text]
  )
  const totalWords = useMemo(
    () => lines.reduce((acc, l) => acc + l.length, 0),
    [lines]
  )

  let wordIndex = 0

  return (
    <div ref={containerRef} className={cn("relative z-0", trackHeight, className)}>
      <div className="sticky top-0 flex h-screen items-center justify-center px-4">
        <p className="mx-auto flex max-w-4xl flex-col items-center text-center text-3xl font-bold leading-[1.15] tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
          {lines.map((words, li) => (
            <span key={li} className="flex flex-wrap justify-center">
              {words.map((word) => {
                const i = wordIndex++
                const start = i / totalWords
                const end = (i + 1) / totalWords
                return (
                  <ScrollWord
                    key={i}
                    word={word}
                    progress={scrollYProgress}
                    range={[start, end]}
                    highlightClassName={
                      highlightSet.has(li) ? highlightClassName : undefined
                    }
                  />
                )
              })}
            </span>
          ))}
        </p>
      </div>
    </div>
  )
}

export default TextReveal
