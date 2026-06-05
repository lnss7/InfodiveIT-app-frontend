import Cases from '@/sections/cases'
import { Hero } from '@/sections/hero'
import { Products } from '@/sections/products'
import { Solutions } from '@/sections/solutions'
import { Problems } from '@/sections/problems'
import { TrustPoints } from '@/sections/trust-points'
import { Blog } from '@/sections/blog'

export default function HomePage() {
  return (
    <main>
      <Hero />
      <Solutions />
      <Products />
      <Problems />
      <Cases />
      <TrustPoints />
      <Blog />
    </main>
  )
}
