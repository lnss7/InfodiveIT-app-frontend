import type { Metadata } from "next";
import { Footer } from "@/layout/footer";
import { SobreHero } from "@/sections/sobre/hero";
import { SobreManifesto } from "@/sections/sobre/manifest";
import { SobreNumeros } from "@/sections/sobre/ourNumbers";
import { SobreTimeline } from "@/sections/sobre/timeline";
import { SobreValores } from "@/sections/sobre/ourValues";
import { SobreCultura } from "@/sections/sobre/culture";
import { SobreCta } from "@/sections/sobre/cta";

export const metadata: Metadata = {
  title: "Quem Somos — Integradores de TI desde 2003",
  description:
    "Conheça a Infodive: mais de duas décadas integrando infraestrutura, segurança, cloud e inteligência artificial para empresas que não podem parar.",
  keywords: [
    "Quem Somos",
    "Integradora de TI",
    "História Infodive",
    "Infraestrutura de TI",
    "Parceiro de Tecnologia",
    "Infodive",
  ],
};

export default function SobrePage() {
  return (
    <>
      <main className="relative z-20 bg-white">
        <SobreHero />
        <SobreManifesto />
        <SobreNumeros />
        <SobreTimeline />
        <SobreValores />
        <SobreCultura />
        <SobreCta />
      </main>
      <Footer />
    </>
  );
}
