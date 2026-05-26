'use client'

import { InteractiveGridPattern } from "@/components/ui/interactive-grid-pattern";
import { ArrowRight, MessageSquare } from "lucide-react";
import { TextEffect } from "@/components/animations/text-effect";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

// Import partner logo SVGs from assets
import awsLogo from "@/assets/AWS Logo.svg";
import acronisLogo from "@/assets/Acronis Logo.svg";
import appleLogo from "@/assets/Apple Logo.svg";
import dellLogo from "@/assets/Dell Logo.svg";
import ibmLogo from "@/assets/IBM Logo.svg";
import lenovoLogo from "@/assets/Lenovo Logo.svg";
import microsoftLogo from "@/assets/Microsoft Logo.svg";
import redhatLogo from "@/assets/Red Hat Logo.svg";
import suseLogo from "@/assets/Suse Logo.svg";
import veeamLogo from "@/assets/Veeam Logo.svg";
import virtuozzoLogo from "@/assets/Virtuozzo Logo.svg";
import { SpotlightBorder } from "@/components/ui/spotLightBorder";

const PARTNERS = [
  { name: "IBM", description: "Líder global em IA e nuvem híbrida segura.", logo: ibmLogo, className: "h-5" },
  { name: "AWS", description: "Nuvem de escala global com serviços avançados.", logo: awsLogo, className: "h-10" },
  { name: "Lenovo", description: "Infraestrutura robusta de servidores e alta performance.", logo: lenovoLogo, className: "h-10", keepWhiteOnHover: true },
  { name: "Dell Technologies", description: "Computação e armazenamento de ponta corporativo.", logo: dellLogo },
  { name: "Veeam", description: "Proteção moderna de dados e backup inteligente.", logo: veeamLogo, className: "h-4" },
  { name: "Acronis", description: "Integração inovadora de cibersegurança e backup.", logo: acronisLogo, keepWhiteOnHover: true },
  { name: "Red Hat", description: "Soluções open source corporativas e Kubernetes.", logo: redhatLogo, className: "h-6" },
  { name: "Microsoft", description: "A nuvem do Azure para escala e inovação global.", logo: microsoftLogo },
  { name: "SUSE", description: "Soluções corporativas de Linux e Kubernetes open.", logo: suseLogo, className: "h-12", keepWhiteOnHover: true },
  { name: "Virtuozzo", description: "Virtualização eficiente e hiperconvergência em nuvem.", logo: virtuozzoLogo, className: "h-4", keepWhiteOnHover: true },
  { name: "Apple", description: "Ecossistema tecnológico premium integrado.", logo: appleLogo },
];

// Duplicate the array to create a seamless infinite scrolling effect
const MARQUEE_PARTNERS = [...PARTNERS, ...PARTNERS];

export function Hero() {
  return (
    <section className="hero relative overflow-hidden bg-ink-950 flex flex-col justify-center min-h-screen md:min-h-[115vh]">
      {/* Background Interactive Grid filling the entire section */}
      <InteractiveGridPattern
        width={48}
        height={48}
        squares={[50, 25]}
        className="absolute inset-0 h-full w-full stroke-white/[0.06] [mask-image:radial-gradient(ellipse_at_center,white_20%,transparent_75%)] opacity-30"
        squaresClassName="hover:fill-brand/10 transition-all duration-150"
      />

      <div className="container-default relative z-10 text-center pt-28 pb-16 md:py-28 flex flex-col items-center justify-center w-full max-w-full">
        {/* Eyebrow */}
        <TextEffect
          per="word"
          preset="blur"
          delay={0.1}
          className="text-xs font-semibold uppercase tracking-[0.25em] text-white mb-4"
          duration={0.9}
        >
          INFODIVE IT
        </TextEffect>

        {/* Title */}
        <TextEffect
          per="word"
          as="h1"
          preset="blur"
          delay={0.2}
          duration={0.9}
          className="text-balance text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6 max-w-4xl leading-[1.15] px-2"
          highlightWords={["missão", "crítica"]}
          highlightClassName="font-black text-[var(--brand-light)] drop-shadow-[0_2px_12px_rgba(14,102,255,0.2)]"
        >
          Tecnologia de missão crítica para empresas que não param
        </TextEffect>

        {/* Description */}
        <TextEffect
          per="word"
          as="p"
          preset="blur"
          delay={0.5}
          duration={0.9}
          className="text-balance text-sm sm:text-base md:text-lg text-ink-300 mb-10 max-w-2xl leading-relaxed px-4"
        >
          Infraestrutura, segurança, cloud e inteligência artificial, integrados, gerenciados e sustentados pela Infodive.
        </TextEffect>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto justify-center px-4">
          <Link href="/solucoes" className="focus:outline-none w-full sm:w-auto" tabIndex={-1}>
            <Button primary="#0E66FF" secondary="#001DFF" className="w-full sm:w-auto">
              Conheça nossas soluções
              <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
            </Button>
          </Link>
          <Link href="/contato" className="focus:outline-none w-full sm:w-auto" tabIndex={-1}>
            <Button
              primary="rgba(255, 255, 255, 0.06)"
              secondary="rgba(255, 255, 255, 0.16)"
              className="border border-white/10 w-full sm:w-auto"
            >
              <MessageSquare className="h-4 w-4 text-ink-300" strokeWidth={2} />
              Fale conosco
            </Button>
          </Link>
        </div>

        {/* Social Proof */}
        <p className="mt-16 text-[10px] font-semibold uppercase tracking-[0.25em] text-ink-500 mb-8 px-4">
          Desde 2003 integrando tecnologia e negócios.
        </p>

        {/* Animated Infinite Marquee Carousel */}
        <div className="w-full max-w-full md:max-w-6xl mt-2 relative overflow-hidden py-4 [mask-image:linear-gradient(to_right,transparent,white_5%,white_95%,transparent)] sm:[mask-image:linear-gradient(to_right,transparent,white_15%,white_85%,transparent)] select-none">
          <div className="flex w-max animate-marquee gap-6 hover:[animation-play-state:paused] cursor-pointer">
            {MARQUEE_PARTNERS.map((partner, index) => (
              <div key={index} className="w-[200px] sm:w-[240px] shrink-0 p-1">
                <SpotlightBorder className="h-full">
                  <div className="absolute inset-0 bg-gradient-to-br from-brand/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                  <CardContent className="p-4 sm:p-6 flex flex-col items-center justify-between text-center h-full min-h-[150px] sm:min-h-[170px]">
                    {/* Logo Container */}
                    <div className="h-10 sm:h-12 flex items-center justify-center mb-3">
                      <Image
                        src={partner.logo}
                        alt={`${partner.name} logo`}
                        width={120}
                        height={32}
                        className={cn(
                          "w-auto object-contain brightness-0 invert opacity-50 group-hover:opacity-100 transition-all duration-300",
                          partner.keepWhiteOnHover
                            ? ""
                            : "group-hover:brightness-100 group-hover:invert-0",
                          partner.className || "h-8"
                        )}
                      />
                    </div>
                    {/* Info */}
                    <div className="flex flex-col justify-center flex-grow">
                      <h4 className="text-xs font-bold text-white tracking-wider uppercase mb-1.5 group-hover:text-brand transition-colors duration-300">
                        {partner.name}
                      </h4>
                      <p className="text-[10px] sm:text-[11px] text-ink-500 leading-normal max-w-[160px] sm:max-w-[180px] mx-auto group-hover:text-ink-300 transition-colors duration-300">
                        {partner.description}
                      </p>
                    </div>
                  </CardContent>
                </SpotlightBorder>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
