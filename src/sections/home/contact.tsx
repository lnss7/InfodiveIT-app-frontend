"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/animations/reveal";
import dynamic from "next/dynamic";
import { Mail, Phone, MapPin, Clock, MessageSquare, Check, ArrowRight } from "lucide-react";

const GsapMenu = dynamic(() => import("@/components/GsapMenu").then((mod) => mod.GsapMenu), {
  ssr: false,
});

export function Contact() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <section id="contact" className="relative z-10 bg-white py-20 md:py-28 border-t border-ink-200/60">
      <div className="mx-auto w-full max-w-[1600px] px-6 md:px-10">
        {/* Gradient banner — todos os componentes da seção vivem aqui dentro */}
        <div
          className="relative overflow-hidden rounded-[2rem] px-6 py-12 sm:px-10 md:px-14 md:py-16 text-white shadow-2xl shadow-[#3B1F59]/30"
          style={{ background: "linear-gradient(135deg, #6F0101 0%, #3B1F59 50%, #063FB4 100%)" }}
        >
          {/* ── Efeitos decorativos (clean) ── */}
          {/* Brilho suave no canto superior esquerdo */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(255,255,255,0.16),transparent_55%)]"
          />
          {/* Orb de luz azul — profundidade no canto inferior direito */}
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-28 -right-20 h-96 w-96 rounded-full bg-[#0E66FF]/30 blur-[130px]"
          />
          {/* Arcos finos no canto superior direito */}
          <div aria-hidden className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full border border-white/15" />
          <div aria-hidden className="pointer-events-none absolute -right-28 -top-28 h-80 w-80 rounded-full border border-white/10" />
          <div aria-hidden className="pointer-events-none absolute -right-44 -top-44 h-[28rem] w-[28rem] rounded-full border border-white/[0.06]" />
          {/* Padrão de pontos sutil no canto inferior esquerdo */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.15] [background-image:radial-gradient(rgba(255,255,255,0.7)_1px,transparent_1px)] [background-size:22px_22px] [mask-image:radial-gradient(ellipse_at_bottom_left,black,transparent_45%)]"
          />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Contact Details (Left Column) */}
          <Reveal className="lg:col-span-7 flex flex-col gap-6">
            <p className="eyebrow text-sm text-white/70">Contato</p>
            <h2 className="text-white text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-[1.15] text-balance">
              Pronto para evoluir a <span className="text-[#9DB8FF]">TI da sua empresa</span>?
            </h2>
            <p className="text-ink-300 text-base md:text-lg max-w-2xl font-light leading-relaxed text-pretty">
              Conecte-se com nossos consultores seniores. Estamos prontos para projetar e implementar soluções de infraestrutura e nuvem sob medida para o seu negócio.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
              
              <div className="flex items-start gap-4 p-4 rounded-xl bg-white/[0.07] border border-white/15 hover:border-white/30 transition-all duration-300">
                <div className="p-2.5 rounded-lg bg-white/15 text-white mt-0.5">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white">E-mail</h4>
                  <a href="mailto:contato@infodive.com.br" className="text-xs text-ink-300 hover:text-brand transition-colors mt-0.5 block">
                    contato@infodive.com.br
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-xl bg-white/[0.07] border border-white/15 hover:border-white/30 transition-all duration-300">
                <div className="p-2.5 rounded-lg bg-white/15 text-white mt-0.5">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white">Telefone</h4>
                  <a href="tel:+551140030000" className="text-xs text-ink-300 hover:text-brand transition-colors mt-0.5 block">
                    +55 (51) 3330-0444
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-xl bg-white/[0.07] border border-white/15 hover:border-white/30 transition-all duration-300">
                <div className="p-2.5 rounded-lg bg-white/15 text-white mt-0.5">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white">Localização</h4>
                  <span className="text-xs text-ink-300 mt-0.5 block leading-relaxed">
                    Av. Cristovão Colombo, 3000 - Sala 704 | Floresta, Porto Alegre - RS
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-xl bg-white/[0.07] border border-white/15 hover:border-white/30 transition-all duration-300">
                <div className="p-2.5 rounded-lg bg-white/15 text-white mt-0.5">
                  <Clock className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white">Disponibilidade</h4>
                  <span className="text-xs text-ink-300 mt-0.5 block leading-relaxed">
                    Comercial: Seg a Sex, 9h às 18h<br />Suporte Crítico NOC: 24/7
                  </span>
                </div>
              </div>

            </div>
          </Reveal>

          {/* CTA Box (Right Column) */}
          <Reveal as="div" delay={0.12} className="lg:col-span-5 relative flex flex-col p-8 md:p-10 rounded-2xl bg-white/[0.08] border border-white/15 backdrop-blur-xl overflow-hidden shadow-xl shadow-black/20">
            {/* Top accent border */}
            <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-[#0E66FF] to-transparent" />
            {/* Soft inner glow */}
            <div aria-hidden className="pointer-events-none absolute -top-16 -right-16 h-40 w-40 rounded-full bg-[#0E66FF]/25 blur-3xl" />

            <div className="relative">
              {/* Icon badge */}
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[#0E66FF]/20 border border-white/15 text-white mb-5">
                <MessageSquare className="h-6 w-6" strokeWidth={2} />
              </div>

              <h3 className="text-xl md:text-2xl font-bold text-white mb-2.5">
                Precisa de ajuda imediata?
              </h3>
              <p className="text-sm text-white/70 leading-relaxed mb-6">
                Fale com nossos engenheiros e receba uma análise rápida dos requisitos de TI, segurança e nuvem do seu negócio.
              </p>

              {/* Quick reassurances */}
              <ul className="flex flex-col gap-3 mb-8">
                {[
                  "Resposta em até 1 hora",
                  "Diagnóstico inicial sem custo",
                  "Especialistas certificados",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm text-white/85">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#46BEA3]/20 text-[#46BEA3]">
                      <Check className="h-3 w-3" strokeWidth={3} />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA pinned to the bottom */}
            <div className="relative mt-auto">
              <Button
                variant="primary"
                onClick={() => setIsMenuOpen(true)}
                className="w-full text-sm font-bold py-3.5 flex items-center justify-center gap-2 cursor-pointer shadow-[0_4px_20px_rgba(14,102,255,0.25)]"
              >
                Falar com Especialista
                <ArrowRight className="w-4 h-4" strokeWidth={2.5} />
              </Button>

              <div className="flex items-center gap-2 justify-center w-full mt-5 text-xs text-white/60">
                <span className="w-1.5 h-1.5 rounded-full bg-[#46BEA3] animate-pulse"></span>
                Especialistas online no momento
              </div>
            </div>
          </Reveal>

          </div>
        </div>
      </div>

      {/* Renders the GSAP Overlay Contact Form Drawer */}
      <GsapMenu
        isOpen={isMenuOpen}
        onToggle={setIsMenuOpen}
      />
    </section>
  );
}
