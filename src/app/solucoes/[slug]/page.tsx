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

  return {
    title: `${solution.title} | Infodive IT`,
    description: solution.subtitle,
    openGraph: {
      title: `${solution.title} | Infodive IT`,
      description: solution.subtitle,
      type: "website",
    },
  };
}

export default function SolutionDetailPage({ params }: PageProps) {
  const solution = SOLUTIONS.find((s) => s.slug === params.slug);

  if (!solution) {
    notFound();
  }

  return (
    <>
      <SolutionDetailContent solution={solution} />
      <Footer />
    </>
  );
}
