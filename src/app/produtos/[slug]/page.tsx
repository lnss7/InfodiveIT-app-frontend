import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { PRODUCTS, getProductBySlug } from "@/lib/products-data"
import { ProductDetailContent } from "./product-detail-client"
import { Footer } from "@/layout/footer"

interface PageProps {
  params: {
    slug: string
  }
}

export function generateStaticParams() {
  return PRODUCTS.map((product) => ({ slug: product.slug }))
}

export function generateMetadata({ params }: PageProps): Metadata {
  const product = getProductBySlug(params.slug)

  if (!product) {
    return { title: "Produto não encontrado | Infodive" }
  }

  const seoTitle = `${product.nome} — ${product.fabricante} | Infodive IT`
  const seoDesc = product.descricaoCurta

  return {
    title: seoTitle,
    description: seoDesc,
    alternates: {
      canonical: `https://infodive.com.br/produtos/${params.slug}`,
    },
    keywords: [
      product.nome,
      product.fabricante,
      product.categoria,
      product.subcategoria,
      'Produtos de TI',
      'Infodive',
    ],
    openGraph: {
      title: seoTitle,
      description: seoDesc,
      url: `https://infodive.com.br/produtos/${params.slug}`,
      type: "website",
      siteName: "Infodive IT",
    },
    twitter: {
      card: "summary_large_image",
      title: seoTitle,
      description: seoDesc,
    },
  }
}

export default function ProductDetailPage({ params }: PageProps) {
  const product = getProductBySlug(params.slug)

  if (!product) {
    notFound()
  }

  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.nome,
    description: product.descricaoCurta,
    brand: {
      '@type': 'Brand',
      name: product.fabricante,
    },
    category: product.categoria,
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'BRL',
      offerCount: '1',
      seller: {
        '@type': 'Organization',
        name: 'Infodive IT',
        url: 'https://infodive.com.br',
      },
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <main id="main-content">
        <ProductDetailContent slug={product.slug} />
      </main>
      <Footer />
    </>
  )
}
