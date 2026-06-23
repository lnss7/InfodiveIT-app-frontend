"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { api, type ConteudoDTO } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/animations/reveal";

// Imagens geradas correspondendo ao estilo e temas do screenshot
import peopleImg from "@/assets/blog/people.png";
import cloudImg from "@/assets/blog/cloud.png";
import presentationImg from "@/assets/blog/presentation.png";

type ContentItem = {
  id: string;
  titulo: string;
  slug: string;
  tipo: ConteudoDTO['tipo'];
  descricao?: string;
  publicadoEm?: string;
  tempoLeitura: string;
  categoria: string;
  imagem: any;
};


// Fallback estático correspondendo fielmente ao screenshot
const MOCK_CONTEUDOS: ContentItem[] = [
  {
    id: "1",
    titulo:
      "Inteligência artificial nas empresas: produtividade real ou apenas uma tendência passageira?",
    tipo: "ARTIGO",
    descricao:
      "Descubra como a inteligência artificial está revolucionando a tomada de decisão corporativa.",
    publicadoEm: "01 jun 2026",
    tempoLeitura: "5 min read",
    slug: "inteligencia-artificial-nas-empresas",
    categoria: "IA",
    imagem: peopleImg,
  },
  {
    id: "2",
    titulo:
      "Por que a computação em nuvem é essencial para a inteligência artificial?",
    tipo: "ARTIGO",
    descricao:
      "Entenda a sinergia essencial entre o processamento em nuvem e a sustentação de modelos de inteligência artificial.",
    publicadoEm: "01 jun 2026",
    tempoLeitura: "6 min read",
    slug: "por-que-computacao-em-nuvem-essencial-para-ia",
    categoria: "NUVEM",
    imagem: cloudImg,
  },
  {
    id: "3",
    titulo:
      "Por que a Infodive é incrível? A resposta de quem faz a tecnologia acontecer...",
    tipo: "ARTIGO",
    descricao:
      "Entenda os bastidores e os diferenciais que tornam as parcerias de tecnologia tão impactantes nas operações críticas.",
    publicadoEm: "29 maio 2026",
    tempoLeitura: "7 min read",
    slug: "por-que-infodive-e-incrivel",
    categoria: "IA",
    imagem: presentationImg,
  },
];

const defaultImages = [peopleImg, cloudImg, presentationImg];
const defaultCategories = ["IA", "NUVEM", "IA"];

export function Blog() {
  const [items, setItems] = useState<ContentItem[]>([]);

  useEffect(() => {
    let active = true;

    api
      .conteudos({ size: 3 })
      .then((res) => {
        if (active) {
          if (res && res.content && res.content.length > 0) {
            const formatted = res.content
              .slice(0, 3)
              .map((item: ConteudoDTO, idx: number) => ({
                id: item.id,
                titulo: item.titulo,
                slug: item.slug,
                tipo: item.tipo,
                descricao: item.descricao || "",
                publicadoEm: item.publicadoEm
                  ? new Date(item.publicadoEm).toLocaleDateString("pt-BR", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })
                  : "01 jun 2026",
                tempoLeitura: item.tempoLeitura || `${Math.max(3, Math.round((item.conteudo?.split(" ").length || 200) / 200))} min read`,
                categoria: defaultCategories[idx % 3],
                imagem: defaultImages[idx % 3],
              }));
            setItems(formatted);
          } else {
            setItems(MOCK_CONTEUDOS);
          }
        }
      })
      .catch(() => {
        if (active) {
          setItems(MOCK_CONTEUDOS);
        }
      });

    return () => {
      active = false;
    };
  }, []);

  return (
    <section
      id="blog"
      className="relative bg-white py-20 md:py-28 border-t border-ink-200/60"
    >
      <div className="container-default">
        {/* Cabeçalho do Blog */}
        <Reveal className="mb-10 flex items-center justify-between gap-4">
          <h2 className="text-3xl sm:text-4xl font-bold text-ink-950 tracking-tight">
            Blog
          </h2>

          <Link
            href="/blog"
            className="focus:outline-none shrink-0"
            tabIndex={-1}
          >
            <Button
              variant="ghost"
              size="sm"
              className="border border-ink-200 text-xs px-5 py-2.5 font-semibold text-ink-900 bg-white hover:bg-ink-50 transition-all active:scale-95"
            >
              Todos os artigos
            </Button>
          </Link>
        </Reveal>

        {/* Grade de 3 Cards com Bordas Compartilhadas */}
        <div className="border border-ink-200 rounded-2xl overflow-hidden grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-ink-200 bg-transparent">
          {items.map((item, index) => (
            <motion.article
              key={item.id}
              initial={{ opacity: 0, y: 15, filter: "blur(8px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
                ease: [0.25, 1, 0.5, 1],
              }}
              className="group flex flex-col p-6 transition-colors duration-300 hover:bg-ink-50/50"
            >
              {/* Imagem do Card com Proporção do Screenshot */}
              <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden border border-ink-200/40 bg-ink-50">
                <Image
                  src={item.imagem}
                  alt={item.titulo}
                  fill
                  sizes="(max-width: 768px) 100vw, 30vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              {/* Tag / Categoria */}
              <span className="mt-5 text-[10px] font-bold uppercase tracking-wider text-brand">
                {item.categoria}
              </span>

              {/* Título do Artigo */}
              <h3 className="mt-2.5 text-base sm:text-lg font-bold text-ink-950 leading-snug group-hover:text-brand transition-colors duration-300">
                <Link
                  href={`/blog/${item.slug}`}
                  className="focus:outline-none"
                >
                  {item.titulo}
                </Link>
              </h3>

              {/* Rodapé: Data e Tempo de Leitura */}
              <div className="mt-auto pt-6 text-xs text-ink-500 font-sans font-light">
                {item.publicadoEm} &bull; {item.tempoLeitura}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Blog;
