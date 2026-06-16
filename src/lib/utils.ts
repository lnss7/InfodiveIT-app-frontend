import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Mescla nomes de classe condicionalmente (clsx) e resolve conflitos do Tailwind
 * (tailwind-merge), mantendo a última classe vencedora de cada grupo.
 *
 * @param inputs - Valores de classe: strings, arrays, objetos condicionais ou
 *   valores falsy (ignorados).
 * @returns A string final de classes, sem conflitos do Tailwind.
 *
 * @example
 * cn('px-2 py-1', isActive && 'bg-brand', 'px-4') // 'py-1 bg-brand px-4'
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
