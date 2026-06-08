import Cases from '@/sections/cases'
import { Hero } from '@/sections/hero'
import { Products } from '@/sections/products'
import { Solutions } from '@/sections/solutions'
import { Problems } from '@/sections/problems'
import { TrustPoints } from '@/sections/trust-points'
import { Blog } from '@/sections/blog'
import { FAQ } from '@/sections/faq'
import { Contact } from '@/sections/contact'
import { Footer } from '@/layout/footer'

export default function HomePage() {
  return (
    <>
      <main className="relative z-20 bg-white">
        <Hero />
        <Solutions />
        <Products />
        <Problems />
        <Cases />
        <TrustPoints />
        <Blog />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
