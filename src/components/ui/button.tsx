'use client'

import { forwardRef } from 'react'
import { motion, type HTMLMotionProps } from 'framer-motion'
import { cn } from '@/lib/utils'

export type ButtonProps = Omit<HTMLMotionProps<'button'>, 'children'> & {
  primary: string
  secondary: string
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

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button({ primary, secondary, children, className, ...rest }, ref) {
    return (
      <motion.button
        ref={ref}
        initial={false}
        style={{ backgroundColor: primary, boxShadow: REST_SHADOW }}
        whileHover={{
          backgroundColor: secondary,
          y: HOVER_LIFT,
          scale: HOVER_SCALE,
          boxShadow: HOVER_SHADOW,
        }}
        whileTap={{ y: HOVER_LIFT / 2, scale: HOVER_SCALE * 0.96 }}
        transition={HOVER_TRANSITION}
        className={cn(
          'inline-flex items-center justify-center gap-2',
          'px-6 py-3 rounded-full',
          'text-sm font-medium text-white',
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
