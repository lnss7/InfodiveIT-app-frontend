import type { Metadata } from "next";
import { Footer } from "@/layout/footer";
import { ServicosHero } from "@/sections/servicos/hero";
import { ServicosManifesto } from "@/sections/servicos/manifesto";
import { ServicosCiclo } from "@/sections/servicos/ciclo";
import { ServicosMetodologia } from "@/sections/servicos/metodologia";
import { ServicosCta } from "@/sections/servicos/cta";

export const metadata: Metadata = {
  title: "Serviços — Da estratégia à operação contínua",
  description:
    "Consultoria, assessment, projeto, implantação, migração, sustentação, operação assistida e monitoramento. A Infodive planeja, implanta e mantém a tecnologia funcionando no seu ambiente.",
  keywords: [
    "Serviços de TI",
    "Consultoria de TI",
    "Implantação de infraestrutura",
    "Migração de ambientes",
    "Sustentação e suporte",
    "Operação assistida",
    "Monitoramento",
    "Infodive",
  ],
};

export default function ServicosPage() {
  return (
    <>
      <main className="relative z-20 bg-white">
        <ServicosHero />
        <ServicosManifesto />
        <ServicosCiclo />
        <ServicosMetodologia />
        <ServicosCta />
      </main>
      <Footer />
    </>
  );
}
