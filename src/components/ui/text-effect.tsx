'use client'

import React from 'react'
import { motion, Variants, Transition } from 'framer-motion'
import { cn } from '@/lib/utils'

type TextEffectProps = {
  children: string
  per?: 'word' | 'char'
  as?: React.ElementType
  preset?: 'blur' | 'fade' | 'slide' | 'scale'
  className?: string
  delay?: number
  duration?: number
  variants?: {
    container?: Variants
    item?: Variants
  }
}

const defaultContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
}

const presetVariants: Record<string, Variants> = {
  blur: {
    hidden: { opacity: 0, filter: 'blur(6px)', y: 6 },
    visible: { opacity: 1, filter: 'blur(0px)', y: 0 },
  },
  fade: {
    hidden: { opacity: 0, y: 8 },
    visible: { opacity: 1, y: 0 },
  },
  slide: {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  },
}

export function TextEffect({
  children,
  per = 'word',
  as: Component = 'div',
  preset = 'fade',
  className,
  delay = 0,
  duration = 0.45,
  variants,
}: TextEffectProps) {
  // Split text into words or characters
  const segments = per === 'word' ? children.split(' ') : children.split('')

  const itemVariants = variants?.item || presetVariants[preset] || presetVariants.fade
  const containerVariants: Variants = {
    hidden: variants?.container?.hidden || { opacity: 0 },
    visible: variants?.container?.visible || {
      opacity: 1,
      transition: {
        delayChildren: delay,
        staggerChildren: per === 'word' ? 0.06 : 0.015,
      },
    },
  }

  const itemTransition: Transition = {
    duration: duration,
    ease: [0.25, 1, 0.5, 1], // smooth deceleration curve
  }

  return (
    <Component className={cn('inline-flex flex-wrap justify-center', className)}>
      <motion.span
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="inline-flex flex-wrap justify-center"
      >
        {segments.map((segment, index) => {
          return (
            <motion.span
              key={`${segment}-${index}`}
              variants={itemVariants}
              transition={itemTransition}
              className={cn(
                'inline-block',
                per === 'word' && 'mr-[0.25em]'
              )}
            >
              {segment === '' ? '\u00A0' : segment}
            </motion.span>
          )
        })}
      </motion.span>
    </Component>
  )
}
