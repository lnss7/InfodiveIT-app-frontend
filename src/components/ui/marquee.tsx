"use client";

import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface MarqueeProps extends ComponentPropsWithoutRef<"div"> {
  /** Inverte a direção da rolagem */
  reverse?: boolean;
  /** Pausa a animação no hover */
  pauseOnHover?: boolean;
  /** Duração da animação (ex: "40s" ou "80s") */
  duration?: string;
  children: ReactNode;
}

/**
 * Marquee horizontal infinito (estilo Magic UI), reusando o keyframe `marquee`
 * já definido no tailwind.config (translateX 0 → -50%). Os filhos são duplicados
 * internamente para o loop ficar contínuo.
 *
 * @param reverse - Inverte a direção da rolagem. Default: `false`.
 * @param pauseOnHover - Pausa a animação enquanto o mouse está sobre o marquee.
 *   Default: `false`.
 * @param duration - Duração de uma volta completa (ex.: `"40s"`, `"80s"`).
 *   Default: `"80s"`. Valores maiores deixam a rolagem mais lenta.
 * @param className - Classes Tailwind adicionais no container.
 * @param children - Itens a rolar (renderizados duas vezes para o loop).
 *
 * @example
 * <Marquee pauseOnHover duration="60s">
 *   {logos.map((l) => <Logo key={l.id} {...l} />)}
 * </Marquee>
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
      style={
        {
          ...style,
          "--duration": duration,
        } as React.CSSProperties
      }
    >
      <div
        style={{
          animationDuration: duration,
        }}
        className={cn(
          "flex w-max animate-marquee items-center gap-10",
          pauseOnHover && "group-hover:[animation-play-state:paused]",
          reverse && "[animation-direction:reverse]",
        )}
      >
        {children}
        {children}
      </div>
    </div>
  );
}
