import Cases from '@/sections/home/cases'
import { Hero } from '@/sections/home/hero'
import { Products } from '@/sections/home/products'
import { Solutions } from '@/sections/home/solutions'
import { Problems } from '@/sections/home/problems'
import { TrustPoints } from '@/sections/home/trust-points'
import { Blog } from '@/sections/home/blog'
import { FAQ } from '@/sections/home/faq'
import { Contact } from '@/sections/home/contact'
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
