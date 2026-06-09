"use client";

import type { CSSProperties } from "react";
import { motion, type Transition } from "framer-motion";
import { cn } from "@/lib/utils";

interface BorderBeamProps {
  /** Tamanho (px) do feixe que percorre a borda. */
  size?: number;
  /** Duração de uma volta completa (s). */
  duration?: number;
  delay?: number;
  colorFrom?: string;
  colorTo?: string;
  transition?: Transition;
  className?: string;
  style?: CSSProperties;
  reverse?: boolean;
  initialOffset?: number;
  /** Espessura da borda animada (px). */
  borderWidth?: number;
}

/**
 * BorderBeam (Magic UI) — um feixe de gradiente que percorre a borda do elemento
 * pai (que deve ser `relative` e ter `rounded-[...]`). Usa `offset-path` + framer.
 */
export function BorderBeam({
  className,
  size = 50,
  delay = 0,
  duration = 6,
  colorFrom = "#0E66FF",
  colorTo = "#7aa9ff",
  transition,
  style,
  reverse = false,
  initialOffset = 0,
  borderWidth = 1.5,
}: BorderBeamProps) {
  return (
    <div
      className="pointer-events-none absolute inset-0 rounded-[inherit] [border:calc(var(--border-beam-width)*1px)_solid_transparent] ![mask-clip:padding-box,border-box] ![mask-composite:intersect] [mask:linear-gradient(transparent,transparent),linear-gradient(#000,#000)]"
      style={{ "--border-beam-width": borderWidth } as CSSProperties}
    >
      <motion.div
        className={cn(
          "absolute aspect-square bg-gradient-to-l from-[var(--color-from)] via-[var(--color-to)] to-transparent",
          className,
        )}
        style={
          {
            width: size,
            offsetPath: `rect(0 auto auto 0 round ${size}px)`,
            "--color-from": colorFrom,
            "--color-to": colorTo,
            ...style,
          } as CSSProperties
        }
        initial={{ offsetDistance: `${initialOffset}%` }}
        animate={{
          offsetDistance: reverse
            ? [`${100 - initialOffset}%`, `${-initialOffset}%`]
            : [`${initialOffset}%`, `${100 + initialOffset}%`],
        }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration,
          delay: -delay,
          ...transition,
        }}
      />
    </div>
  );
}

export default BorderBeam;
