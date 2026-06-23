import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { PRODUCTS, type Product } from "@/lib/products-data"
import { ProductDetailContent } from "./product-detail-client"
import { Footer } from "@/layout/footer"
import { api } from "@/lib/api"
import { VENDOR_LOGOS } from "@/lib/vendor-logos"
import {
  Activity,
  Cloud,
  Cog,
  HeadphonesIcon,
  LifeBuoy,
  RefreshCcw,
  ServerCog,
  ShieldCheck,
  Wrench,
} from "lucide-react"

const SERVICE_ICON_MAP: Record<string, any> = {
  wrench: Wrench,
  headphones: HeadphonesIcon,
  "shield-check": ShieldCheck,
  "life-buoy": LifeBuoy,
  "server-cog": ServerCog,
  activity: Activity,
  cog: Cog,
  "refresh-ccw": RefreshCcw,
  cloud: Cloud,
}

async function getProduct(slug: string): Promise<Product | null> {
  try {
    const dto = await api.produto(slug)
    if (!dto || !dto.ativo) return null

    const [categorias, fabricantes, servicosList] = await Promise.all([
      api.categorias().catch(() => []),
      api.fabricantes().catch(() => []),
      api.servicos().catch(() => [])
    ])

    const staticProduct = PRODUCTS.find((p) => p.slug === dto.slug)
    const catObj = categorias.find((c) => c.id === dto.categoriaId)
    const fabObj = fabricantes.find((f) => f.id === dto.fabricanteId)

    let diferenciais = []
    if (dto.diferenciais) {
      try {
        diferenciais = JSON.parse(dto.diferenciais)
      } catch (e) {
        diferenciais = staticProduct?.diferenciais || []
      }
    } else {
      diferenciais = staticProduct?.diferenciais || []
    }

    let casosDeUso = []
    if (dto.casosDeUso) {
      try {
        casosDeUso = JSON.parse(dto.casosDeUso)
      } catch (e) {
        casosDeUso = staticProduct?.casosDeUso || []
      }
    } else {
      casosDeUso = staticProduct?.casosDeUso || []
    }

    const mappedServices = (dto.servicoIds || []).map((id) => {
      const sDto = servicosList.find((s) => s.id === id)
      if (!sDto) return null
      const IconComp = SERVICE_ICON_MAP[sDto.icone || ""] || Wrench
      return {
        nome: sDto.nome,
        icon: IconComp,
      }
    }).filter(Boolean) as any[]

    const servicos = mappedServices.length > 0 ? mappedServices : (staticProduct?.servicos || [])

    return {
      slug: dto.slug,
      nome: dto.nome,
      fabricante: fabObj ? fabObj.nome : (staticProduct?.fabricante || dto.fabricanteSlug),
      fabricanteSlug: dto.fabricanteSlug,
      logo: staticProduct?.logo || VENDOR_LOGOS[dto.fabricanteSlug] || "",
      logoClass: staticProduct?.logoClass || "h-5",
      categoria: catObj ? catObj.nome : (staticProduct?.categoria || dto.categoriaSlug),
      categoriaSlug: dto.categoriaSlug,
      subcategoria: dto.subcategoria || "",
      descricaoCurta: dto.descricaoCurta || "",
      descricaoCompleta: dto.descricaoCompleta || "",
      destaque: dto.destaque,
      diferenciais,
      casosDeUso,
      servicos,
    }
  } catch (e) {
    return null
  }
}

interface PageProps {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  try {
    const list = await api.produtos({ size: 100 })
    return list.content.map((product) => ({ slug: product.slug }))
  } catch (e) {
    return PRODUCTS.map((product) => ({ slug: product.slug }))
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const product = await getProduct(params.slug)

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

export default async function ProductDetailPage({ params }: PageProps) {
  const product = await getProduct(params.slug)

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
        <ProductDetailContent product={product} />
      </main>
      <Footer />
    </>
  )
}
