"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export function BackToHome() {
  const pathname = usePathname();

  // Exibe o botão de voltar apenas nas páginas principais (index),
  // e não nas subpáginas/slugs específicos.
  const showButton =
    pathname === "/solucoes" ||
    pathname === "/produtos" ||
    pathname === "/produto" ||
    pathname === "/sobre" ||
    pathname === "/blog";

  if (!showButton) return null;

  return (
    <div className="fixed inset-x-0 top-[84px] z-[99] pointer-events-none lg:top-[96px]">
      <div className="container-default">
        <Link
          href="/"
          className="pointer-events-auto inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-[#050507]/80 text-white/70 backdrop-blur-md transition-all hover:border-white/30 hover:text-white hover:scale-105 shadow-[0_4px_20px_rgba(0,0,0,0.4)]"
          aria-label="Voltar para a Home"
        >
          <ArrowLeft className="h-4.5 w-4.5" />
        </Link>
      </div>
    </div>
  );
}
