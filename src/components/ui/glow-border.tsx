"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

/**
 * Handler reutilizável: grava a posição do cursor (relativa ao elemento) em CSS
 * vars (`--glow-x` / `--glow-y`) no próprio elemento do evento. Usa
 * `e.currentTarget`, então um único handler serve para N elementos (cards,
 * botões…) sem precisar de ref por item — e sem re-render.
 *
 * @param e - Evento de mouse; `currentTarget` é o elemento que recebe as CSS vars.
 *
 * @example
 * <div className="group relative" onMouseMove={handleGlowMove}>
 *   <GlowBorderOverlay />
 *   ...
 * </div>
 */
export function handleGlowMove(e: React.MouseEvent<HTMLElement>) {
  const el = e.currentTarget
  const rect = el.getBoundingClientRect()
  el.style.setProperty("--glow-x", `${e.clientX - rect.left}px`)
  el.style.setProperty("--glow-y", `${e.clientY - rect.top}px`)
}

/**
 * Anel de brilho que acende na BORDA, na posição do cursor (segue o mouse no
 * hover). Gradiente radial mascarado só no anel da borda — sem preenchimento/miolo.
 * O elemento PAI precisa ter `group relative` e `onMouseMove={handleGlowMove}`.
 *
 * @param glowColor - Cor do brilho. Default: `"#0E66FF"`.
 * @param glowSize - Raio (px) do gradiente radial. Default: `90`.
 * @param className - Classes Tailwind adicionais no `<span>` do anel.
 *
 * @example
 * <article className="group relative" onMouseMove={handleGlowMove}>
 *   <GlowBorderOverlay glowColor="#0E66FF" glowSize={240} />
 * </article>
 */
export function GlowBorderOverlay({
  glowColor = "#0E66FF",
  glowSize = 90,
  className,
}: {
  glowColor?: string
  glowSize?: number
  className?: string
}) {
  return (
    <span
      aria-hidden
      className={cn(
        // -inset-px alinha o anel EXATAMENTE sobre a borda existente (evita borda dupla)
        "pointer-events-none absolute -inset-px rounded-[inherit] p-px opacity-0 transition-opacity duration-300 group-hover:opacity-100",
        className
      )}
      style={{
        background: `radial-gradient(circle ${glowSize}px at var(--glow-x, 50%) var(--glow-y, 50%), ${glowColor}, transparent)`,
        WebkitMask:
          "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
        WebkitMaskComposite: "xor",
        maskComposite: "exclude",
      }}
    />
  )
}

interface GlowBorderProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  glowColor?: string
  glowSize?: number
}

/**
 * Botão com a borda glow seguindo o cursor (atalho que já embute o overlay +
 * handler — não precisa adicionar `onMouseMove` manualmente).
 *
 * @param glowColor - Cor do brilho da borda. Default herdado do overlay.
 * @param glowSize - Raio (px) do brilho. Default herdado do overlay.
 * @param className - Classes Tailwind adicionais no `<button>`.
 * @param children - Conteúdo do botão.
 *
 * @example
 * <GlowBorder glowColor="#0E66FF">Ver mais</GlowBorder>
 */
export function GlowBorder({
  className,
  children,
  glowColor,
  glowSize,
  ...props
}: GlowBorderProps) {
  return (
    <button
      onMouseMove={handleGlowMove}
      className={cn("group relative", className)}
      {...props}
    >
      <GlowBorderOverlay glowColor={glowColor} glowSize={glowSize} />
      <span className="relative">{children}</span>
    </button>
  )
}
