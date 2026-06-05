"use client"

import CasesCarousel from "@/components/cases-carousel"

export function Cases() {
  return (
    <section
      id="cases"
      className="relative border-t border-white/5 bg-ink-950 pb-24 pt-20 md:pb-28 md:pt-24"
    >
      <div className="container-default">
        <CasesCarousel />
      </div>
    </section>
  )
}

export default Cases
