"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight, ShieldCheck } from "lucide-react";
import { type Solution, SOLUTION_ICONS } from "@/lib/solutions-data";
import { VENDOR_LOGOS } from "@/lib/vendor-logos";
import { SpotlightBorder } from "@/components/ui/spot-light-border";
import { InteractiveGridPattern } from "@/components/animations/interactive-grid-pattern";
import { Reveal } from "@/components/animations/reveal";
import { NumberTicker } from "@/components/ui/number-ticker";
import { Button } from "@/components/ui/button";
import { GlowBorderOverlay, handleGlowMove } from "@/components/ui/glow-border";

interface SolutionDetailContentProps {
  solution: Solution;
}

// Helper function to extract number for NumberTicker
function parseMetric(metricStr: string) {
  const match = metricStr.match(/([\d.]+)/);
  if (!match) return { prefix: "", value: 0, suffix: metricStr, decimals: 0 };
  
  const numStr = match[1];
  const value = parseFloat(numStr);
  const decimals = numStr.includes(".") ? numStr.split(".")[1].length : 0;
  const index = metricStr.indexOf(numStr);
  const prefix = metricStr.slice(0, index);
  const suffix = metricStr.slice(index + numStr.length);
  
  return { prefix, value, suffix, decimals };
}

export function SolutionDetailContent({ solution }: SolutionDetailContentProps) {
  const Icon = SOLUTION_ICONS[solution.iconName];

  return (
    <div className="relative z-20 w-full min-h-screen bg-white text-ink-900">
      {/* 1. Dark Hero Header Section */}
      <div className="relative bg-[#050507] text-white pt-28 sm:pt-36 pb-20 overflow-hidden border-b border-white/5">
        {/* Decorative Interactive Grid in Hero Background */}
        <div className="absolute inset-0 h-full w-full overflow-hidden pointer-events-none z-0">
          <InteractiveGridPattern
            width={48}
            height={48}
            squares={[50, 25]}
            className="absolute inset-0 h-full w-full stroke-white/[0.04] [mask-image:radial-gradient(ellipse_at_top,white_30%,transparent_80%)] opacity-40"
            squaresClassName="hover:fill-brand/10 transition-all duration-150"
          />
          {/* Large blur glow matching brand colors */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[500px] bg-brand/10 rounded-full blur-[140px] pointer-events-none" />
        </div>

        <div className="container-default relative z-10">
          {/* Breadcrumb & Navigation */}
          <div className="mb-10 px-4">
            <Reveal>
              <nav className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-ink-500 mb-6">
                <Link href="/solucoes" className="hover:text-brand transition-colors">
                  Soluções
                </Link>
                <span>/</span>
                <span className="text-white">{solution.title}</span>
              </nav>
            </Reveal>
            
            <Reveal delay={0.08}>
              <Link 
                href="/solucoes" 
                className="inline-flex items-center gap-2 text-sm text-ink-300 hover:text-white transition-colors group"
              >
                <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
                Voltar para soluções
              </Link>
            </Reveal>
          </div>

          {/* Hero Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start px-4">
            {/* Hero Left: Heading & Summary */}
            <div className="lg:col-span-7">
              <Reveal delay={0.12}>
                <div className="h-12 w-12 rounded-2xl bg-brand/10 border border-brand/20 flex items-center justify-center text-brand mb-6 shadow-[0_0_24px_rgba(14,102,255,0.15)]">
                  <Icon className="h-6 w-6" strokeWidth={1.75} />
                </div>
              </Reveal>

              <Reveal delay={0.16}>
                <h1 className="text-balance text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white mb-6 leading-tight">
                  {solution.title}
                </h1>
              </Reveal>

              <Reveal delay={0.2}>
                <p className="text-lg text-brand-tint font-medium tracking-wide mb-6">
                  {solution.subtitle}
                </p>
              </Reveal>

              <Reveal delay={0.24}>
                <p className="text-base text-ink-300 font-light leading-relaxed">
                  {solution.overview}
                </p>
              </Reveal>
            </div>

            {/* Hero Right: Fast Metrics Section (Stays dark for high aesthetic impact) */}
            <div className="lg:col-span-5 w-full">
              <Reveal delay={0.28} className="w-full">
                <div className="border border-white/5 bg-white/[0.02] backdrop-blur-md p-8 rounded-2xl relative overflow-hidden shadow-2xl">
                  <div className="absolute inset-0 bg-gradient-to-br from-brand/5 to-transparent pointer-events-none" />
                  <h3 className="text-sm font-bold uppercase tracking-wider text-ink-400 mb-8 border-b border-white/5 pb-4">
                    Indicadores de Performance
                  </h3>

                  <div className="space-y-8">
                    {solution.metrics.map((metric, i) => {
                      const { prefix, value, suffix, decimals } = parseMetric(metric.value);
                      return (
                        <div key={i} className="flex flex-col">
                          <div className="text-3xl font-black text-brand tracking-tight flex items-baseline gap-0.5">
                            {prefix && <span className="text-2xl font-bold">{prefix}</span>}
                            {value > 0 ? (
                              <NumberTicker value={value} decimalPlaces={decimals} />
                            ) : (
                              <span>{metric.value}</span>
                            )}
                            {suffix && <span className="text-xl font-bold ml-0.5">{suffix}</span>}
                          </div>
                          <span className="text-xs text-ink-300 font-medium mt-1">
                            {metric.label}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Light Main Content Section */}
      <div className="bg-ink-50/50 py-16 sm:py-20 text-ink-900">
        <div className="container-default">
          {/* Technical Capabilities Section */}
          <div className="mb-20 px-4">
            <Reveal className="mb-10 text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-brand mb-3">Recursos & Tecnologia</p>
              <h2 className="text-2xl sm:text-3xl font-bold text-ink-950 tracking-tight">Capacidades Técnicas</h2>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {solution.features.map((feat, index) => (
                <Reveal key={index} delay={0.1 + index * 0.08}>
                  <div 
                    onMouseMove={handleGlowMove}
                    className="group relative flex h-full flex-col rounded-xl border border-ink-200 bg-white p-6 transition-all duration-300 hover:border-ink-300 hover:shadow-[0_12px_24px_rgba(20,20,19,0.06)]"
                  >
                    <GlowBorderOverlay glowColor="#0E66FF" glowSize={240} />
                    <div className="relative z-10 flex flex-col justify-between h-full min-h-[180px]">
                      <div>
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand/5 border border-brand/10 text-brand mb-4">
                          <ShieldCheck className="h-4.5 w-4.5" />
                        </div>
                        <h4 className="text-base font-bold text-ink-950 mb-2 leading-snug">{feat.title}</h4>
                        <p className="text-sm text-ink-500 font-light leading-relaxed">{feat.description}</p>
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          {/* Integrated Technology Stack & Use Case */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch px-4 mb-16">
            {/* Tech Partners Integration (Left - White background) */}
            <div className="lg:col-span-5 flex flex-col justify-between border border-ink-200 bg-white rounded-2xl p-8 shadow-sm">
              <Reveal>
                <h3 className="text-lg font-bold text-ink-950 mb-3">Parcerias e Fabricantes Homologados</h3>
                <p className="text-sm text-ink-500 font-light leading-relaxed mb-8">
                  Trabalhamos com os líderes globais de hardware e software para desenhar projetos corporativos que garantem suporte direto de fábrica e conformidade.
                </p>
                
                <div className="grid grid-cols-2 gap-4">
                  {solution.vendors.map((vendorName) => {
                    const logoAsset = VENDOR_LOGOS[vendorName];
                    return (
                      <div 
                        key={vendorName}
                        className="flex items-center justify-center h-16 rounded-xl bg-ink-50 border border-ink-200/80 p-4 hover:border-brand/20 transition-all duration-300 group"
                      >
                        {logoAsset ? (
                          <Image
                            src={logoAsset}
                            alt={vendorName}
                            className="max-h-7 object-contain opacity-50 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-300"
                          />
                        ) : (
                          <span className="text-xs font-bold text-ink-500 group-hover:text-brand transition-colors">
                            {vendorName}
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </Reveal>
            </div>

            {/* Use Case / Editorial Detail (Right - Alternating background) */}
            <div className="lg:col-span-7 border border-ink-200 bg-white rounded-2xl p-8 shadow-sm relative overflow-hidden flex flex-col justify-between">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_90%_10%,rgba(14,102,255,0.02),transparent_50%)] pointer-events-none" />
              <Reveal className="h-full flex flex-col justify-between">
                <div>
                  <span className="inline-flex rounded-full bg-brand/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-brand mb-6">
                    Estudo de Caso Relacionado
                  </span>
                  
                  <p className="text-xs font-semibold uppercase tracking-wider text-ink-400 mb-2">{solution.caseStudy.segmento}</p>
                  <h4 className="text-xl font-bold text-ink-950 mb-2">{solution.caseStudy.client}</h4>
                  
                  <blockquote className="text-sm text-ink-600 font-light leading-relaxed mb-6 italic pl-4 border-l-2 border-brand">
                    &ldquo;{solution.caseStudy.resultado}&rdquo;
                  </blockquote>
                </div>
                
                <div className="flex items-center justify-between border-t border-ink-100 pt-5 mt-auto">
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase font-bold text-ink-400 tracking-[0.1em]">Métrica Chave</span>
                    <span className="text-lg font-black text-brand tracking-tight mt-0.5">{solution.caseStudy.metric}</span>
                  </div>

                  <Link 
                    href="/#cases" 
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-ink-950 hover:text-brand transition-colors"
                  >
                    Ver todos os cases
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </Reveal>
            </div>
          </div>

          {/* Global Conversion Box */}
          <Reveal delay={0.1} className="max-w-4xl mx-auto">
            <div className="relative rounded-2xl border border-ink-200 bg-white p-8 md:p-12 overflow-hidden shadow-sm flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_120%,rgba(14,102,255,0.03),transparent_50%)] pointer-events-none" />
              <div className="relative z-10 text-left md:max-w-xl">
                <h3 className="text-xl sm:text-2xl font-bold text-ink-950 mb-3">
                  Quer desenhar um projeto de {solution.title.split(" ")[0]} para sua empresa?
                </h3>
                <p className="text-sm text-ink-500 leading-relaxed font-light">
                  Agende uma reunião estratégica de 15 minutos com nossos arquitetos de TI para mapear a melhor arquitetura e SLA para sua operação.
                </p>
              </div>
              <div className="relative z-10 shrink-0">
                <Link href={`/contato?solucao=${solution.slug}`}>
                  <Button
                    primary="#0E66FF"
                    secondary="#001DFF"
                    className="text-xs px-5 py-3 sm:text-sm sm:px-6 sm:py-3.5 font-semibold rounded-xl text-white animate-none"
                  >
                    Falar com especialista
                    <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
                  </Button>
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  );
}
