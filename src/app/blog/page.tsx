import type { Metadata } from "next";
import { Footer } from "@/layout/footer";
import { BlogHero } from "@/sections/blog/hero";
import { BlogArtigos } from "@/sections/blog/artigos";
import { BlogSocial } from "@/sections/blog/social";
import { BlogCta } from "@/sections/blog/cta";

export const metadata: Metadata = {
  title: "Conteúdos — Conhecimento técnico para decisões melhores",
  description:
    "Artigos, whitepapers, cases e datasheets produzidos pela equipe Infodive, além do que compartilhamos no Instagram e LinkedIn. Conhecimento técnico sobre infraestrutura, segurança, cloud e virtualização.",
  keywords: [
    "Blog Infodive",
    "Artigos de TI",
    "Whitepapers de infraestrutura",
    "Cases de TI",
    "Datasheets",
    "Conteúdo técnico",
    "Segurança da informação",
    "Cloud",
    "Infodive",
  ],
};

export default function BlogPage() {
  return (
    <>
      <main className="relative z-20 bg-white">
        <BlogHero />
        <BlogArtigos />
        <BlogSocial />
        <BlogCta />
      </main>
      <Footer />
    </>
  );
}
