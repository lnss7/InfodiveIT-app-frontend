'use client'

import { useEffect } from 'react'

/**
 * Garante que a página sempre abra no topo absoluto.
 * Desativa a restauração de scroll do navegador (que reposiciona no meio ao
 * recarregar uma página alta) e força scroll(0,0) no primeiro mount.
 */
export function ScrollToTop() {
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }
    window.scrollTo(0, 0)
  }, [])

  return null
}
