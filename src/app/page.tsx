import Cases from '@/sections/cases'
import { Hero } from '@/sections/hero'
import { Products } from '@/sections/products'
import { Solutions } from '@/sections/solutions'

export default function HomePage() {
  return (
    <main>
      <Hero />
      <Solutions />
      <Products />
      <Cases />
    </main>
  )
}
