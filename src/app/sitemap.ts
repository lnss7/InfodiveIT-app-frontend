import { MetadataRoute } from 'next'
import { SOLUTIONS } from '@/lib/solutions-data'
import { PRODUCTS } from '@/lib/products-data'
import { ARTIGOS } from '@/lib/blog-data'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://infodive.com.br'

  // 1. Static pages
  const staticRoutes = [
    '',
    '/sobre',
    '/servicos',
    '/solucoes',
    '/produtos',
    '/blog',
    '/termos-de-uso',
    '/politica-de-privacidade',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1.0 : 0.8,
  }))

  // 2. Dynamic Solutions
  const solutionRoutes = SOLUTIONS.map((s) => ({
    url: `${baseUrl}/solucoes/${s.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  // 3. Dynamic Products
  const productRoutes = PRODUCTS.map((p) => ({
    url: `${baseUrl}/produtos/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  // 4. Dynamic Blog Articles
  const articleRoutes = ARTIGOS.map((a) => ({
    url: `${baseUrl}/blog/${a.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }))

  return [...staticRoutes, ...solutionRoutes, ...productRoutes, ...articleRoutes]
}
