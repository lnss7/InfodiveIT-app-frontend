'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

/**
 * Garante que a página sempre abra no topo absoluto ao mudar de rota,
 * exceto quando há uma âncora (hash) na URL, caso em que realiza o scroll suave
 * até o elemento correspondente após o carregamento e estabilização da página.
 */
export function ScrollToTop() {
  const pathname = usePathname()

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }

    const handleHashScroll = () => {
      const hash = window.location.hash
      if (hash) {
        const id = hash.replace('#', '')
        const element = document.getElementById(id)
        if (element) {
          // Atraso curto para dar tempo do layout calcular as alturas reais (especialmente com componentes dinâmicos)
          setTimeout(() => {
            const lenis = (window as any).lenis
            if (lenis) {
              lenis.scrollTo(element, { duration: 1.2 })
            } else {
              element.scrollIntoView({ behavior: 'smooth' })
            }
          }, 350)
          return true
        }
      }
      return false
    }

    const scrolledToHash = handleHashScroll()
    if (!scrolledToHash) {
      window.scrollTo(0, 0)
    }
  }, [pathname])

  return null
}
