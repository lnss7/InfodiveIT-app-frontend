"use client"

import { useEffect } from "react"
import Lenis from "@studio-freight/lenis"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

/**
 * Smooth scroll global (Lenis) sincronizado com o GSAP/ScrollTrigger que já roda
 * no dashboard-carousel. Não usa scroll virtual com transform — Lenis anima o
 * scroll nativo, então `getBoundingClientRect` e eventos `scroll` continuam
 * válidos (o text-reveal, que lê posição via scroll nativo, segue funcionando).
 *
 * Respeita `prefers-reduced-motion`: se reduzido, não inicializa (scroll normal).
 */
export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    })

    // Expose lenis globally for smooth scrolling from other components
    ;(window as any).lenis = lenis

    // Mantém o ScrollTrigger em sincronia com o scroll suavizado do Lenis.
    lenis.on("scroll", ScrollTrigger.update)

    const raf = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(raf)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(raf)
      lenis.destroy()
      delete (window as any).lenis
    }
  }, [])

  return null
}
