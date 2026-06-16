import type { Metadata } from "next"
import { ProductsListing } from "./products-listing"
import { Footer } from "@/layout/footer"
import { Suspense } from "react"

export const metadata: Metadata = {
  title: "Catálogo de Produtos de TI Corporativa",
  description:
    "Explore o catálogo Infodive com os principais fabricantes do mundo — infraestrutura, armazenamento, proteção de dados, segurança, cloud e virtualização.",
  alternates: {
    canonical: "https://infodive.com.br/produtos",
  },
  keywords: [
    "Catálogo de TI",
    "IBM",
    "Veeam",
    "Dell",
    "Acronis",
    "Red Hat",
    "Microsoft",
    "Infraestrutura",
    "Cibersegurança",
    "Cloud",
    "Infodive",
  ],
  openGraph: {
    title: "Catálogo de Produtos de TI Corporativa | Infodive IT",
    description: "Explore o catálogo Infodive com os principais fabricantes do mundo — infraestrutura, armazenamento, proteção de dados, segurança, cloud e virtualização.",
    url: "https://infodive.com.br/produtos",
    type: "website",
  },
}

export default function ProductsPage() {
  return (
    <>
      <main id="main-content">
        <Suspense fallback={
          <div className="min-h-screen bg-[#050507] text-white flex items-center justify-center">
            <div className="w-8 h-8 border-4 border-[#0E66FF] border-t-transparent rounded-full animate-spin"></div>
          </div>
        }>
          <ProductsListing />
        </Suspense>
      </main>
      <Footer />
    </>
  )
}
