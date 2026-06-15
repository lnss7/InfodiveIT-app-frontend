"use client";

import { useState } from "react";
import { Reveal } from "@/components/animations/reveal";
import { ARTIGOS, FILTROS, type TipoConteudo } from "@/lib/blog-data";
import { cn } from "@/lib/utils";
import { ArtigoCard } from "./article-card";

/**
 * Seção de artigos e materiais técnicos próprios da Infodive. Filtros por tipo
 * (client) sobre os mocks e grid de cards revelando em camadas. Cada card é um
 * link para a página de detalhe em /blog/[slug].
 */
export function BlogArtigos() {
  const [filtroAtivo, setFiltroAtivo] = useState<TipoConteudo | "todos">(
    "todos",
  );

  const artigosFiltrados =
    filtroAtivo === "todos"
      ? ARTIGOS
      : ARTIGOS.filter((artigo) => artigo.tipo === filtroAtivo);

  return (
    <section className="relative bg-white py-20 md:py-28">
      <div className="container-default">
        {/* Header */}
        <div className="max-w-2xl">
          <Reveal>
            <p className="eyebrow">Artigos &amp; Materiais</p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="text-balance">
              Conteúdo técnico produzido pela equipe Infodive.
            </h2>
          </Reveal>
        </div>

        {/* Filtros */}
        <Reveal delay={0.15}>
          <div className="mt-10 flex flex-wrap gap-2.5">
            {FILTROS.map((filtro) => {
              const ativo = filtroAtivo === filtro.value;
              return (
                <button
                  key={filtro.value}
                  type="button"
                  onClick={() => setFiltroAtivo(filtro.value)}
                  className={cn(
                    "rounded-full border px-4 py-2 text-sm font-medium transition-colors duration-200",
                    ativo
                      ? "border-brand bg-brand text-white"
                      : "border-ink-200 bg-transparent text-ink-500 hover:border-brand",
                  )}
                >
                  {filtro.label}
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* Grid de cards */}
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {artigosFiltrados.map((artigo, index) => (
            <Reveal
              key={artigo.slug}
              delay={(index % 3) * 0.08}
              className="h-full"
            >
              <ArtigoCard artigo={artigo} />
            </Reveal>
          ))}
        </div>

        {/* Carregar mais */}
        <div className="mt-12 flex justify-center">
          <button type="button" className="btn-secondary !text-ink-950">
            Carregar mais conteúdos
          </button>
        </div>
      </div>
    </section>
  );
}
