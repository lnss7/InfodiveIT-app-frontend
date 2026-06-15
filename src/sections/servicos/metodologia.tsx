"use client";

import { BadgeCheck, FileText, ShieldCheck, Target } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Reveal } from "@/components/animations/reveal";
import { NumberTicker } from "@/components/ui/number-ticker";

type Pilar = {
  icon: LucideIcon;
  title: string;
  description: string;
};

const PILARES: Pilar[] = [
  {
    icon: Target,
    title: "Orientado a resultado e SLA",
    description:
      "Cada projeto começa pelo objetivo de negócio e é medido por SLAs claros — não por entregáveis soltos.",
  },
  {
    icon: BadgeCheck,
    title: "Equipe certificada",
    description:
      "Profissionais com certificações ativas nos principais fabricantes do mercado: IBM, Dell, Microsoft, VMware e mais.",
  },
  {
    icon: FileText,
    title: "Documentação e transparência",
    description:
      "Escopo, arquitetura e cada etapa registrados e abertos ao cliente. Quando algo muda, você é o primeiro a saber.",
  },
  {
    icon: ShieldCheck,
    title: "Segurança e conformidade",
    description:
      "Padrões de segurança e aderência à LGPD aplicados do desenho à operação contínua do ambiente.",
  },
];

type Metrica = {
  prefix?: string;
  value: number;
  suffix?: string;
  label: string;
};

// Conteúdo placeholder — ajustar com os números reais da Infodive.
const METRICAS: Metrica[] = [
  { prefix: "+", value: 20, label: "anos de mercado" },
  { prefix: "+", value: 500, label: "projetos entregues" },
  { value: 95, suffix: "%", label: "de retenção de clientes" },
];

/**
 * Metodologia — split editorial: coluna esquerda sticky com o argumento e as
 * métricas de credibilidade; à direita os pilares revelando em camadas
 * (Reveal blur + slide escalonado), mesmo padrão de ourValues/ourNumbers.
 */
export function ServicosMetodologia() {
  return (
    <section className="relative border-t border-ink-200/60 bg-white py-20 md:py-28">
      <div className="container-default">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-8">
          {/* Texto + métricas — sticky enquanto os cards passam */}
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-36">
              <Reveal>
                <p className="eyebrow">Como trabalhamos</p>
              </Reveal>
              <Reveal delay={0.1}>
                <h2 className="text-balance">Método, não improviso.</h2>
              </Reveal>
              <Reveal delay={0.2}>
                <p className="mt-5 text-pretty leading-relaxed text-ink-500">
                  A diferença entre uma tecnologia que funciona e uma que vira
                  dor de cabeça está no processo. O nosso é repetível,
                  documentado e medido — do primeiro diagnóstico à operação
                  assistida.
                </p>
              </Reveal>

              <Reveal delay={0.3}>
                <dl className="mt-10 grid grid-cols-3 gap-6 border-t border-ink-200/70 pt-8">
                  {METRICAS.map((metrica) => (
                    <div key={metrica.label}>
                      <dt className="text-3xl font-semibold leading-none tracking-tight text-brand sm:text-4xl">
                        {metrica.prefix}
                        <NumberTicker value={metrica.value} />
                        {metrica.suffix}
                      </dt>
                      <dd className="mt-3 text-xs leading-relaxed text-ink-500">
                        {metrica.label}
                      </dd>
                    </div>
                  ))}
                </dl>
              </Reveal>
            </div>
          </div>

          {/* Pilares — revelam em camadas */}
          <div className="lg:col-span-7 lg:col-start-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {PILARES.map((pilar, index) => (
                <Reveal key={pilar.title} delay={index * 0.08}>
                  <article className="group flex h-full flex-col border border-ink-200 bg-white p-8 transition-colors duration-300 hover:border-ink-500">
                    <div className="flex items-start justify-between">
                      <pilar.icon
                        className="h-6 w-6 text-brand"
                        strokeWidth={1.5}
                        aria-hidden
                      />
                      <span className="text-xs uppercase tracking-[0.2em] text-ink-300">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <h3 className="mt-6 text-lg font-semibold text-ink-950">
                      {pilar.title}
                    </h3>
                    <p className="mt-3 text-pretty text-sm leading-relaxed text-ink-500">
                      {pilar.description}
                    </p>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
