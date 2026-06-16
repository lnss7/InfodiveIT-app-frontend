import type { Metadata } from "next";
import { SolutionsListing } from "./solutions-listing";
import { Footer } from "@/layout/footer";

export const metadata: Metadata = {
  title: "Nossas Soluções de TI de Missão Crítica",
  description:
    "Explore nossas soluções corporativas sob medida: infraestrutura híbrida, storages flash, cibersegurança ativa, backup imutável, observabilidade, cloud e inteligência artificial.",
  alternates: {
    canonical: "https://infodive.com.br/solucoes",
  },
  keywords: [
    "Infraestrutura de TI",
    "Armazenamento de Dados",
    "Backup Imutável",
    "Cibersegurança Corporativa",
    "Nuvem Híbrida",
    "Observabilidade",
    "Inteligência Artificial",
    "Infodive",
  ],
  openGraph: {
    title: "Nossas Soluções de TI de Missão Crítica | Infodive IT",
    description: "Explore nossas soluções corporativas sob medida: infraestrutura híbrida, storages flash, cibersegurança ativa, backup imutável, observabilidade, cloud e inteligência artificial.",
    url: "https://infodive.com.br/solucoes",
    type: "website",
  },
};

export default function SolutionsPage() {
  return (
    <>
      <main id="main-content">
        <SolutionsListing />
      </main>
      <Footer />
    </>
  );
}
