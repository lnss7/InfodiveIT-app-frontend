import type { Metadata } from "next"
import { ProductsListing } from "./products-listing"
import { Footer } from "@/layout/footer"

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
        <ProductsListing />
      </main>
      <Footer />
    </>
  )
}
