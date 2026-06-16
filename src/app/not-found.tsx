"use client";

import Link from "next/link";
import { Home, Search } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="relative z-20 min-h-screen bg-white text-ink-950 flex items-center justify-center overflow-hidden pt-28 pb-16">
      {/* Soft blue ambient glow in the background */}
      <div className="absolute inset-0 h-full w-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-[#0E66FF]/5 rounded-full blur-[100px] pointer-events-none" />
      </div>

      <div className="container-default relative z-10 px-6 text-center max-w-2xl mx-auto flex flex-col items-center">
        {/* Animated 404 Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#0E66FF]/10 bg-[#0E66FF]/5 text-xs font-semibold uppercase tracking-wider text-[#0E66FF] mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-[#0E66FF] animate-pulse" />
          Erro 404
        </motion.div>

        {/* Dynamic Title */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
          className="text-balance text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-none text-ink-950 mb-6"
        >
          Página <span className="text-[#0E66FF]">indisponível</span>
        </motion.h1>

        {/* Text Details */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
          className="text-balance text-sm sm:text-base md:text-lg text-ink-500 font-light leading-relaxed mb-10 max-w-md"
        >
          A página que você está tentando acessar não existe ou foi movida. Use as opções abaixo para retornar ao ambiente seguro.
        </motion.p>

        {/* Responsive CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
          className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto justify-center px-4"
        >
          <Link href="/" className="w-full sm:w-auto focus:outline-none" tabIndex={-1}>
            <Button
              variant="primary"
              className="w-full sm:w-auto text-sm font-bold py-3.5 sm:px-6 sm:py-3 flex items-center justify-center gap-2 cursor-pointer shadow-[0_4px_20px_rgba(14,102,255,0.15)] text-white"
            >
              <Home className="w-4 h-4" />
              Voltar ao Início
            </Button>
          </Link>
          <Link href="/produtos" className="w-full sm:w-auto focus:outline-none" tabIndex={-1}>
            <Button
              variant="ghost"
              className="w-full sm:w-auto text-sm font-bold py-3.5 sm:px-6 sm:py-3 flex items-center justify-center gap-2 cursor-pointer border border-ink-200 text-ink-900 bg-white hover:bg-ink-50 transition-all active:scale-95"
            >
              <Search className="w-4 h-4 text-ink-500" />
              Ver Catálogo
            </Button>
          </Link>
        </motion.div>
      </div>
    </main>
  );
}
