import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Mescla classes Tailwind resolvendo conflitos.
 * Uso: cn('px-2 py-1', condicional && 'bg-brand', 'px-4') → 'py-1 bg-brand px-4'
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
