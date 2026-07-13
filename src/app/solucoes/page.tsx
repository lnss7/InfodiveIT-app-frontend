import type { Metadata } from "next";
import { SolutionsListing } from "./solutions-listing";
import { Footer } from "@/layout/footer";
import { Suspense } from "react";

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
        <Suspense fallback={
          <div className="min-h-screen bg-[#050507] text-white flex items-center justify-center">
            <div className="w-8 h-8 border-4 border-[#0E66FF] border-t-transparent rounded-full animate-spin"></div>
          </div>
        }>
          <SolutionsListing />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
