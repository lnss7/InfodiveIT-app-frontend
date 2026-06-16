'use client'

import { forwardRef } from 'react'
import { motion, type HTMLMotionProps } from 'framer-motion'
import { cn } from '@/lib/utils'

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'dark'
export type ButtonSize = 'sm' | 'md' | 'lg'

export type ButtonProps = Omit<HTMLMotionProps<'button'>, 'children'> & {
  variant?: ButtonVariant
  size?: ButtonSize
  children: React.ReactNode
  className?: string
}

const REST_SHADOW = '0 1px 2px 0 rgba(20, 20, 19, 0.06)'
const HOVER_SHADOW =
  '0 18px 35px -10px rgba(20, 20, 19, 0.28), 0 6px 14px -4px rgba(20, 20, 19, 0.14)'

// Altura do "salto" no hover (px). Mais negativo = salta mais alto.
const HOVER_LIFT = -4

// Quanto o botão cresce no hover. 1 = sem mudança, 1.04 = 4% maior.
const HOVER_SCALE = 1.04

// Spring da animação. Para deixar MAIS LENTO/SUAVE:
//   • diminua `stiffness` (rigidez da mola)
//   • aumente `mass` (peso, deixa mais "pesado" e lento)
//   • mantenha `damping` próximo de 20-24 para evitar oscilação
const HOVER_TRANSITION = {
  type: 'spring' as const,
  stiffness: 180,
  damping: 22,
  mass: 0.9,
}

// Variantes de cor predefinidas seguindo o design system
const VARIANT_COLORS: Record<ButtonVariant, { primary: string; secondary: string }> = {
  primary: {
    primary: '#0E66FF',
    secondary: '#001DFF',
  },
  secondary: {
    primary: 'rgba(255, 255, 255, 0.06)',
    secondary: 'rgba(255, 255, 255, 0.16)',
  },
  ghost: {
    primary: 'transparent',
    secondary: 'rgba(0, 0, 0, 0.05)',
  },
  dark: {
    primary: '#141413',
    secondary: '#1E1E1C',
  },
}

// Tamanhos predefinidos
const SIZE_CLASSES: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-xs',
  md: 'px-6 py-3 text-sm',
  lg: 'px-8 py-4 text-base',
}

/**
 * Botão padrão do design system Infodive. Renderiza um `motion.button`
 * (Framer Motion) com micro-interação de salto/escala no hover.
 *
 * @param variant - Variante visual do botão. Default: `'primary'`.
 *   - `'primary'`: fundo azul da marca (#0E66FF). CTA principal de cada seção.
 *   - `'secondary'`: fundo translúcido claro. Ações secundárias em seções dark.
 *   - `'ghost'`: sem fundo. Ações de baixa ênfase em contextos internos.
 *   - `'dark'`: fundo ink-950 (#141413). Contraste em seções claras.
 * @param size - Tamanho do botão. Default: `'md'`. Um de `'sm' | 'md' | 'lg'`.
 * @param disabled - Desabilita a interação e aplica opacidade reduzida.
 * @param className - Classes Tailwind adicionais para customização pontual.
 * @param children - Conteúdo do botão (texto, ícone ou combinação).
 *
 * @example
 * <Button variant="primary">Fale com um especialista</Button>
 *
 * @example
 * // Ação secundária ocupando a largura total
 * <Button variant="secondary" className="w-full">Ver catálogo</Button>
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button({ variant = 'primary', size = 'md', children, className, ...rest }, ref) {
    const colors = VARIANT_COLORS[variant]
    
    return (
      <motion.button
        ref={ref}
        initial={false}
        style={{ backgroundColor: colors.primary, boxShadow: REST_SHADOW }}
        whileHover={{
          backgroundColor: colors.secondary,
          y: HOVER_LIFT,
          scale: HOVER_SCALE,
          boxShadow: HOVER_SHADOW,
        }}
        whileTap={{ y: HOVER_LIFT / 2, scale: HOVER_SCALE * 0.96 }}
        transition={HOVER_TRANSITION}
        className={cn(
          'inline-flex items-center justify-center gap-2',
          'rounded-lg',
          SIZE_CLASSES[size],
          'font-medium text-white',
          'select-none cursor-pointer',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand/40',
          'disabled:opacity-50 disabled:pointer-events-none',
          className,
        )}
        {...rest}
      >
        {children}
      </motion.button>
    )
  },
)

// Made with Bob
