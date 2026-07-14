"use client";

import { useEffect, useState } from "react";
import { BadgeCheck, FileText, ShieldCheck, Target } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Reveal } from "@/components/animations/reveal";
import { NumberTicker } from "@/components/ui/number-ticker";
import { api } from "@/lib/api";

const ICON_MAP: Record<string, LucideIcon> = {
  Target, BadgeCheck, FileText, ShieldCheck,
  target: Target, badgecheck: BadgeCheck, filetext: FileText, shieldcheck: ShieldCheck,
};

function getIcon(name?: string): LucideIcon {
  if (!name) return Target;
  return ICON_MAP[name] ?? ICON_MAP[name.toLowerCase()] ?? Target;
}

type Pilar = { icon: LucideIcon; title: string; description: string };
type Metrica = { prefix?: string; value: number; suffix?: string; label: string };

const PILARES_FALLBACK: Pilar[] = [
  { icon: Target, title: "Orientado a resultado e SLA", description: "Cada projeto começa pelo objetivo de negócio e é medido por SLAs claros — não por entregáveis soltos." },
  { icon: BadgeCheck, title: "Equipe certificada", description: "Profissionais com certificações ativas nos principais fabricantes do mercado: IBM, Dell, Microsoft, VMware e mais." },
  { icon: FileText, title: "Documentação e transparência", description: "Escopo, arquitetura e cada etapa registrados e abertos ao cliente. Quando algo muda, você é o primeiro a saber." },
  { icon: ShieldCheck, title: "Segurança e conformidade", description: "Padrões de segurança e aderência à LGPD aplicados do desenho à operação contínua do ambiente." },
];

const METRICAS_FALLBACK: Metrica[] = [
  { prefix: "+", value: 20, label: "anos de mercado" },
  { prefix: "+", value: 500, label: "projetos entregues" },
  { value: 95, suffix: "%", label: "de retenção de clientes" },
];

export function ServicosMetodologia() {
  const [pilares, setPilares] = useState<Pilar[]>(PILARES_FALLBACK);
  const [metricas, setMetricas] = useState<Metrica[]>(METRICAS_FALLBACK);
  const [eyebrow, setEyebrow] = useState("Como trabalhamos");
  const [headline, setHeadline] = useState("Método, não improviso.");
  const [paragrafo, setParagrafo] = useState("A diferença entre uma tecnologia que funciona e uma que vira dor de cabeça está no processo. O nosso é repetível, documentado e medido — do primeiro diagnóstico à operação assistida.");

  useEffect(() => {
    api.servicosMetodologia()
      .then((data) => {
        if (data.eyebrow) setEyebrow(data.eyebrow);
        if (data.headline) setHeadline(data.headline);
        if (data.paragrafo) setParagrafo(data.paragrafo);
        if (data.pilares && data.pilares.length > 0) {
          setPilares(data.pilares.map((p) => ({
            icon: getIcon(p.icone),
            title: p.titulo,
            description: p.descricao,
          })));
        }
        if (data.metricas && data.metricas.length > 0) {
          setMetricas(data.metricas.map((m) => ({
            prefix: m.prefixo,
            value: m.valor,
            suffix: m.sufixo,
            label: m.label,
          })));
        }
      })
      .catch(() => { /* mantém fallback */ });
  }, []);

  return (
    <section className="relative border-t border-ink-200/60 bg-white py-20 md:py-28">
      <div className="container-default">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-36">
              <Reveal>
                <p className="eyebrow">{eyebrow}</p>
              </Reveal>
              <Reveal delay={0.1}>
                <h2 className="text-balance">{headline}</h2>
              </Reveal>
              <Reveal delay={0.2}>
                <p className="mt-5 text-pretty leading-relaxed text-ink-500">
                  {paragrafo}
                </p>
              </Reveal>

              <Reveal delay={0.3}>
                <dl className="mt-10 grid grid-cols-3 gap-6 border-t border-ink-200/70 pt-8">
                  {metricas.map((metrica) => (
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

          <div className="lg:col-span-7 lg:col-start-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {pilares.map((pilar, index) => (
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
