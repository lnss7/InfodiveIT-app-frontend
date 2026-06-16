import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SOLUTIONS } from "@/lib/solutions-data";
import { SolutionDetailContent } from "./solution-detail-client";
import { Footer } from "@/layout/footer";

interface PageProps {
  params: {
    slug: string;
  };
}

// Pre-generate dynamic paths at build time for ultimate performance
export function generateStaticParams() {
  return SOLUTIONS.map((solution) => ({
    slug: solution.slug,
  }));
}

// Generate high-fidelity dynamic SEO metadata for each page
export function generateMetadata({ params }: PageProps): Metadata {
  const solution = SOLUTIONS.find((s) => s.slug === params.slug);

  if (!solution) {
    return {
      title: "Solução Não Encontrada | Infodive",
    };
  }

  const seoTitle = `${solution.title} — Soluções de TI | Infodive IT`;
  const seoDesc = solution.description || solution.subtitle;

  return {
    title: seoTitle,
    description: seoDesc,
    alternates: {
      canonical: `https://infodive.com.br/solucoes/${params.slug}`,
    },
    keywords: [
      solution.title,
      solution.subtitle,
      'Soluções corporativas',
      'Integração de TI',
      'Infodive',
    ],
    openGraph: {
      title: seoTitle,
      description: seoDesc,
      url: `https://infodive.com.br/solucoes/${params.slug}`,
      type: "website",
      siteName: "Infodive IT",
    },
    twitter: {
      card: "summary_large_image",
      title: seoTitle,
      description: seoDesc,
    },
  };
}

export default function SolutionDetailPage({ params }: PageProps) {
  const solution = SOLUTIONS.find((s) => s.slug === params.slug);

  if (!solution) {
    notFound();
  }

  const serviceJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: solution.title,
    provider: {
      '@type': 'Organization',
      name: 'Infodive IT',
      url: 'https://infodive.com.br',
      logo: 'https://infodive.com.br/icon.png',
    },
    description: solution.description || solution.subtitle,
    areaServed: 'BR',
    category: 'TI / Tecnologia de Missão Crítica',
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <main id="main-content">
        <SolutionDetailContent solution={solution} />
      </main>
      <Footer />
    </>
  );
}
