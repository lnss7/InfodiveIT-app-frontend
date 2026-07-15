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

const SERVICE_ICONS: Record<string, any> = {
  implementacao: Wrench,
  sustentacao: HeadphonesIcon,
  conformidade: ShieldCheck,
  migracao: RefreshCcw,
  monitoramento: Activity,
  cloud: Cloud,
  default: Cog,
}

function getIconName(icon: any): string {
  if (typeof icon === 'string') return icon;
  if (icon === Wrench) return 'wrench';
  if (icon === HeadphonesIcon) return 'headphones';
  if (icon === ShieldCheck) return 'shield-check';
  if (icon === LifeBuoy) return 'life-buoy';
  if (icon === ServerCog) return 'server-cog';
  if (icon === Activity) return 'activity';
  if (icon === Cog) return 'cog';
  if (icon === RefreshCcw) return 'refresh-ccw';
  if (icon === Cloud) return 'cloud';
  return 'default';
}

async function getProduct(slug: string): Promise<Product | null> {
  try {
    const dto = await api.produto(slug)
    if (!dto || !dto.ativo) return null

    const [categorias] = await Promise.all([
      api.categorias().catch(() => []),
    ])

    const staticProduct = PRODUCTS.find((p) => p.slug === dto.slug)
    const catObj = categorias.find((c) => c.id === dto.categoriaId)

    // diferenciais: API retorna array agora, não mais string
    let diferenciais = staticProduct?.diferenciais || []
    if (dto.diferenciais && dto.diferenciais.length > 0) {
      diferenciais = dto.diferenciais.map(d => ({ title: d.titulo, description: d.descricao }))
    }

    // casosDeUso: idem
    let casosDeUso = staticProduct?.casosDeUso || []
    if (dto.casosDeUso && dto.casosDeUso.length > 0) {
      casosDeUso = dto.casosDeUso.map(c => ({ title: c.titulo, description: c.descricao }))
    }

    // servicos: API retorna objetos completos agora, e fallback usa string de ícones para serialização RSC
    let servicos = (staticProduct?.servicos || []).map(s => ({
      nome: s.nome,
      icon: getIconName(s.icon),
    }))
    if (dto.servicos && dto.servicos.length > 0) {
      servicos = dto.servicos.map(s => ({
        nome: s.nome,
        icon: s.icone || s.slug || 'default',
      }))
    }

    return {
      slug: dto.slug,
      nome: dto.nome,
      fabricante: dto.fabricanteNome || staticProduct?.fabricante || dto.fabricanteSlug,
      fabricanteSlug: dto.fabricanteSlug,
      logo: dto.fabricanteLogoUrl || VENDOR_LOGOS[dto.fabricanteNome || ''] || staticProduct?.logo || '',
      logoClass: staticProduct?.logoClass || 'h-5',
      categoria: dto.categoriaNome || catObj?.nome || staticProduct?.categoria || dto.categoriaSlug,
      categoriaSlug: dto.categoriaSlug,
      solucaoSlug: dto.solucaoSlug,
      solucaoTitle: dto.solucaoNome,
      subcategoria: dto.subcategoria || staticProduct?.subcategoria || '',
      descricaoCurta: dto.descricaoCurta || staticProduct?.descricaoCurta || '',
      descricaoCompleta: dto.descricaoCompleta || staticProduct?.descricaoCompleta || '',
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
    const page = await api.produtos({ size: 100 })
    if (page.content.length > 0) return page.content.map((p) => ({ slug: p.slug }))
  } catch {}
  return PRODUCTS.map((p) => ({ slug: p.slug }))  // fallback estático
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
