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

  return {
    title: `${product.nome} — ${product.fabricante} | Infodive IT`,
    description: product.descricaoCurta,
    openGraph: {
      title: `${product.nome} | Infodive IT`,
      description: product.descricaoCurta,
      type: "website",
    },
  }
}

export default function ProductDetailPage({ params }: PageProps) {
  const product = getProductBySlug(params.slug)

  if (!product) {
    notFound()
  }

  return (
    <>
      <ProductDetailContent slug={product.slug} />
      <Footer />
    </>
  )
}
