"use client";

import { motion } from "framer-motion";
import { Handshake, Layers, Network, Eye } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Reveal } from "@/components/animations/reveal";

type Valor = {
  icon: LucideIcon;
  title: string;
  description: string;
};

const VALORES: Valor[] = [
  {
    icon: Handshake,
    title: "Parceria de longo prazo",
    description:
      "Relacionamentos que atravessam ciclos de tecnologia. Clientes que chegaram em 2003 seguem com a gente — porque parceiro de verdade não troca de lado quando o projeto acaba.",
  },
  {
    icon: Layers,
    title: "Profundidade técnica",
    description:
      "Especialistas certificados nos principais fabricantes do mercado. Não revendemos caixas: entendemos o problema antes de propor a solução.",
  },
  {
    icon: Network,
    title: "Execução ponta a ponta",
    description:
      "Do desenho da arquitetura à operação contínua. Assumimos a responsabilidade pelo ciclo completo, sem empurrar complexidade para o cliente.",
  },
  {
    icon: Eye,
    title: "Transparência",
    description:
      "Escopo claro, comunicação direta e métricas abertas. Quando algo sai do plano, o cliente é o primeiro a saber — junto com o plano de correção.",
  },
];

/**
 * Valores — split editorial: a coluna esquerda fica sticky enquanto os
 * cards passam à direita, revelando em camadas (blur + y, padrão do projeto).
 */
export function SobreValores() {
  return (
    <section className="relative border-t border-ink-200/60 bg-white py-20 md:py-28">
      <div className="container-default">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-36">
              <Reveal>
                <p className="eyebrow">Nossos valores</p>
              </Reveal>
              <Reveal delay={0.1}>
                <h2 className="text-balance">
                  O que nos guia desde o primeiro projeto.
                </h2>
              </Reveal>
              <Reveal delay={0.2}>
                <p className="mt-5 text-pretty leading-relaxed text-ink-500">
                  Tecnologia é meio. O que sustenta vinte anos de mercado é a
                  forma como trabalhamos — com quem confia operações críticas à
                  nossa equipe.
                </p>
              </Reveal>
            </div>
          </div>

          <div className="lg:col-span-7 lg:col-start-6">
            <div className="flex flex-col gap-6">
              {VALORES.map((valor, index) => (
                <motion.article
                  key={valor.title}
                  initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
                  whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{
                    duration: 0.7,
                    delay: index * 0.08,
                    ease: [0.25, 1, 0.5, 1],
                  }}
                  className="group border border-ink-200 bg-white p-8 transition-colors duration-300 hover:border-ink-500 sm:p-10"
                >
                  <div className="flex items-start justify-between">
                    <valor.icon
                      className="h-6 w-6 text-brand"
                      strokeWidth={1.5}
                      aria-hidden
                    />
                    <span className="text-xs uppercase tracking-[0.2em] text-ink-300">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="mt-6 text-xl font-semibold text-ink-950">
                    {valor.title}
                  </h3>
                  <p className="mt-3 text-pretty text-sm leading-relaxed text-ink-500">
                    {valor.description}
                  </p>
                </motion.article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
