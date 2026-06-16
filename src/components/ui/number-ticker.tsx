"use client"

import { useEffect, useRef, type ComponentPropsWithoutRef } from "react"
import { useInView, useMotionValue, useSpring } from "framer-motion"

import { cn } from "@/lib/utils"

interface NumberTickerProps extends ComponentPropsWithoutRef<"span"> {
  value: number
  startValue?: number
  direction?: "up" | "down"
  delay?: number
  decimalPlaces?: number
}

/**
 * Contador animado: ao entrar na viewport, faz a contagem (spring) de `startValue`
 * até `value`. Formata o número em pt-BR. Usado nos stats de hero/seções.
 *
 * @param value - Valor final ao qual o contador converge.
 * @param startValue - Valor inicial exibido antes de animar. Default: `0`.
 * @param direction - Sentido da contagem: `'up'` (sobe até `value`) ou `'down'`
 *   (desce de `value` até `startValue`). Default: `'up'`.
 * @param delay - Atraso (em segundos) antes de iniciar a contagem. Default: `0`.
 * @param decimalPlaces - Casas decimais exibidas. Default: `0`.
 * @param className - Classes Tailwind adicionais no `<span>`.
 *
 * @example
 * <NumberTicker value={2003} />        // anima de 0 a 2003
 * <NumberTicker value={99.9} decimalPlaces={1} /> // "99,9"
 */
export function NumberTicker({
  value,
  startValue = 0,
  direction = "up",
  delay = 0,
  className,
  decimalPlaces = 0,
  ...props
}: NumberTickerProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const motionValue = useMotionValue(direction === "down" ? value : startValue)
  const springValue = useSpring(motionValue, {
    damping: 60,
    stiffness: 100,
  })
  const isInView = useInView(ref, { once: true, margin: "0px" })

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | null = null

    if (isInView) {
      timer = setTimeout(() => {
        motionValue.set(direction === "down" ? startValue : value)
      }, delay * 1000)
    }

    return () => {
      if (timer !== null) {
        clearTimeout(timer)
      }
    }
  }, [motionValue, isInView, delay, value, direction, startValue])

  useEffect(
    () =>
      springValue.on("change", (latest) => {
        if (ref.current) {
          ref.current.textContent = Intl.NumberFormat("pt-BR", {
            useGrouping: false,
            minimumFractionDigits: decimalPlaces,
            maximumFractionDigits: decimalPlaces,
          }).format(Number(latest.toFixed(decimalPlaces)))
        }
      }),
    [springValue, decimalPlaces]
  )

  return (
    <span
      ref={ref}
      className={cn(
        "inline-block tracking-wider text-current tabular-nums",
        className
      )}
      {...props}
    >
      {startValue}
    </span>
  )
}
