'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { useSmoothScroll } from '@/hooks/use-smooth-scroll'

/**
 * Garante que a página sempre abra no topo absoluto ao mudar de rota,
 * exceto quando há uma âncora (hash) na URL, caso em que realiza o scroll suave
 * até o elemento correspondente após o carregamento e estabilização da página.
 */
export function ScrollToTop() {
  const pathname = usePathname()
  const { scrollTo } = useSmoothScroll()

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }

    const id = window.location.hash.replace('#', '')
    if (id && document.getElementById(id)) {
      // Atraso curto para dar tempo do layout calcular as alturas reais
      // (especialmente com componentes dinâmicos). scrollTo resolve o id e cai
      // no fallback nativo se o Lenis não estiver ativo.
      setTimeout(() => scrollTo(id), 350)
    } else {
      window.scrollTo(0, 0)
    }
  }, [pathname, scrollTo])

  return null
}
