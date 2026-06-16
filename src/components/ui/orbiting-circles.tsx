import * as React from "react"
import { cn } from "@/lib/utils"

// Ícones que orbitam um centro (estilo Magic UI). Cada filho vira um item posicionado
// no anel; o keyframe `orbit` (tailwind.config) gira em torno do centro do container.
// IMPORTANTE: o container pai precisa ser `relative flex items-center justify-center`
// para os itens (absolute, sem inset) iniciarem centralizados.
/**
 * Anel de ícones que orbitam um centro (estilo Magic UI).
 *
 * @param reverse - Inverte o sentido da órbita. Default: `false`.
 * @param duration - Duração de uma volta (s), dividida por `speed`. Default: `20`.
 * @param radius - Raio (px) do anel. Default: `120`.
 * @param path - Desenha o círculo-guia do anel. Default: `true`.
 * @param iconSize - Tamanho (px) de cada item. Default: `36`.
 * @param speed - Multiplicador de velocidade. Default: `1`.
 * @param pathColor - Cor do círculo-guia. Default: `"rgba(20,20,19,0.08)"`.
 * @param children - Itens que orbitam (distribuídos igualmente no anel).
 *
 * @example
 * <div className="relative flex items-center justify-center size-72">
 *   <OrbitingCircles radius={120}>
 *     <IconA /><IconB /><IconC />
 *   </OrbitingCircles>
 * </div>
 */
export interface OrbitingCirclesProps
  extends React.HTMLAttributes<HTMLDivElement> {
  className?: string
  children?: React.ReactNode
  reverse?: boolean
  duration?: number
  radius?: number
  path?: boolean
  iconSize?: number
  speed?: number
  pathColor?: string
}

export function OrbitingCircles({
  className,
  children,
  reverse,
  duration = 20,
  radius = 120,
  path = true,
  iconSize = 36,
  speed = 1,
  pathColor = "rgba(20,20,19,0.08)",
  ...props
}: OrbitingCirclesProps) {
  const calculatedDuration = duration / speed

  return (
    <>
      {path && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="pointer-events-none absolute inset-0 size-full"
        >
          <circle
            cx="50%"
            cy="50%"
            r={radius}
            fill="none"
            stroke={pathColor}
            strokeWidth={1}
          />
        </svg>
      )}
      {React.Children.map(children, (child, index) => {
        const angle = (360 / React.Children.count(children)) * index
        return (
          <div
            style={
              {
                "--duration": calculatedDuration,
                "--radius": radius,
                "--angle": angle,
                "--icon-size": `${iconSize}px`,
              } as React.CSSProperties
            }
            className={cn(
              "absolute flex size-[var(--icon-size)] transform-gpu animate-orbit items-center justify-center rounded-full",
              reverse && "[animation-direction:reverse]",
              className
            )}
            {...props}
          >
            {child}
          </div>
        )
      })}
    </>
  )
}
