"use client"

import type { ComponentPropsWithoutRef, ReactNode } from "react"
import { cn } from "@/lib/utils"

interface MarqueeProps extends ComponentPropsWithoutRef<"div"> {
  /** Inverte a direção da rolagem */
  reverse?: boolean
  /** Pausa a animação no hover */
  pauseOnHover?: boolean
  /** Duração da animação (ex: "40s" ou "80s") */
  duration?: string
  children: ReactNode
}

/**
 * Marquee horizontal infinito (estilo Magic UI), reusando o keyframe `marquee`
 * já definido no tailwind.config (translateX 0 → -50%). Os filhos são duplicados
 * para o loop ficar contínuo.
 */
export function Marquee({
  className,
  reverse = false,
  pauseOnHover = false,
  duration = "80s",
  children,
  style,
  ...props
}: MarqueeProps) {
  return (
    <div
      {...props}
      className={cn("group relative w-full overflow-hidden", className)}
      style={{
        ...style,
        ["--duration" as any]: duration,
      }}
    >
      <div
        style={{
          animationDuration: duration,
        }}
        className={cn(
          "flex w-max animate-marquee items-center gap-10",
          pauseOnHover && "group-hover:[animation-play-state:paused]",
          reverse && "[animation-direction:reverse]"
        )}
      >
        {children}
        {children}
      </div>
    </div>
  )
}
