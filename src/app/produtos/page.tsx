import type { Metadata } from "next"
import { ProductsListing } from "./products-listing"
import { Footer } from "@/layout/footer"

export const metadata: Metadata = {
  title: "Catálogo de Produtos de TI Corporativa",
  description:
    "Explore o catálogo Infodive com os principais fabricantes do mundo — infraestrutura, armazenamento, proteção de dados, segurança, cloud e virtualização.",
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
}

export default function ProductsPage() {
  return (
    <>
      <ProductsListing />
      <Footer />
    </>
  )
}
