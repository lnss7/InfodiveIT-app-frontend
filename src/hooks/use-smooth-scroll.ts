"use client";

import { useCallback } from "react";

export type SmoothScrollOptions = {
  /** Duração do scroll suave em segundos. Default: `1.2`. */
  duration?: number;
};

/**
 * Hook de scroll suave reaproveitável. Usa a instância global do Lenis
 * (`window.lenis`, exposta por `<SmoothScroll>`) e cai no scroll nativo
 * (`scrollIntoView`) quando o Lenis não está ativo — centralizando o fallback
 * que antes era repetido em hero, faq, navbar, timeline, etc.
 *
 * @returns Um objeto com `scrollTo(target, options?)`, onde `target` é um
 *   `HTMLElement` ou o `id` (string) do elemento de destino. Retorna `true` se o
 *   alvo foi encontrado e o scroll foi disparado, `false` caso contrário.
 *
 * @example
 * const { scrollTo } = useSmoothScroll();
 * <a
 *   href="/#contact"
 *   onClick={(e) => {
 *     if (scrollTo("contact")) e.preventDefault();
 *   }}
 * >
 *   Fale conosco
 * </a>
 */
export function useSmoothScroll() {
  const scrollTo = useCallback(
    (target: HTMLElement | string, options?: SmoothScrollOptions): boolean => {
      const el =
        typeof target === "string" ? document.getElementById(target) : target;
      if (!el) return false;

      const duration = options?.duration ?? 1.2;
      if (window.lenis) {
        window.lenis.scrollTo(el, { duration });
      } else {
        el.scrollIntoView({ behavior: "smooth" });
      }
      return true;
    },
    [],
  );

  return { scrollTo };
}
