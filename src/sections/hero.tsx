'use client'

import { InteractiveGridPattern } from "@/components/animations/interactive-grid-pattern";
import { ArrowRight, MessageSquare } from "lucide-react";
import { TextEffect } from "@/components/animations/text-effect";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/animations/reveal";

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
import { MagicCard } from "@/components/ui/magic-card";
import { DashboardCarousel } from "@/components/dashboard-carousel";
import tela1 from "@/assets/telasCarrosselHero/tela-1.webp";
import tela2 from "@/assets/telasCarrosselHero/tela-2.webp";
import tela3 from "@/assets/telasCarrosselHero/tela-3.webp";

const SHOWCASE_SLIDES = [
  { src: tela1, alt: "Dashboard de monitoramento Infodive" },
  { src: tela2, alt: "Painel de indicadores Infodive" },
  { src: tela3, alt: "Tela de automação Infodive" },
];

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
  { name: "Apple", description: "Ecossistema tecnológico premium integrado.", logo: appleLogo, keepWhiteOnHover: true },
];

// Duplicate the array to create a seamless infinite scrolling effect
const MARQUEE_PARTNERS = [...PARTNERS, ...PARTNERS];

export function Hero() {
  const handleContactClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      e.preventDefault();
      if ((window as any).lenis) {
        (window as any).lenis.scrollTo(contactSection, { duration: 1.2 });
      } else {
        contactSection.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const handleSolutionsClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (window.location.pathname === "/") {
      const solutionsSection = document.getElementById("solutions");
      if (solutionsSection) {
        e.preventDefault();
        if ((window as any).lenis) {
          (window as any).lenis.scrollTo(solutionsSection, { duration: 1.2 });
        } else {
          solutionsSection.scrollIntoView({ behavior: "smooth" });
        }
      }
    }
  };
  return (
    <section className="hero relative overflow-hidden bg-ink-950 flex flex-col min-h-0 sm:min-h-screen">
      {/* Background Interactive Grid filling the entire section */}
      <InteractiveGridPattern
        width={48}
        height={48}
        squares={[50, 25]}
        className="absolute inset-0 h-full w-full stroke-white/[0.06] [mask-image:radial-gradient(ellipse_at_center,white_20%,transparent_75%)] opacity-30"
        squaresClassName="hover:fill-brand/10 transition-all duration-150"
      />

      <div className="container-default relative z-10 text-center pt-28 sm:pt-24 pb-4 flex flex-col items-center justify-center w-full max-w-full mt-0 sm:mt-6">
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

        {/* Title — "missão crítica" é um span único, então o brilho varre a frase
            inteira de uma vez (não palavra por palavra). */}
        <motion.h1
          initial={{ opacity: 0, filter: "blur(6px)", y: 8 }}
          animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
          transition={{ delay: 0.2, duration: 0.9, ease: [0.25, 1, 0.5, 1] }}
          className="text-balance text-3xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-4 max-w-4xl leading-[1.15] px-2"
        >
          Tecnologia de{" "}
          <span className="font-black animate-shine bg-[linear-gradient(110deg,#0E66FF,#0E66FF_38%,#7aa9ff_47%,#eaf1ff_50%,#7aa9ff_53%,#0E66FF_62%,#0E66FF)] bg-[length:200%_auto] bg-clip-text text-transparent drop-shadow-[0_2px_12px_rgba(14,102,255,0.25)]">
            missão crítica
          </span>{" "}
          para empresas que não param
        </motion.h1>

        {/* Description */}
        <TextEffect
          per="word"
          as="p"
          preset="blur"
          delay={0.5}
          duration={0.9}
          className="text-balance text-sm sm:text-base md:text-base text-ink-300 mb-6 max-w-2xl leading-relaxed px-4"
        >
          Infraestrutura, segurança, cloud e inteligência artificial, integrados, gerenciados e sustentados pela Infodive.
        </TextEffect>

        {/* Buttons */}
        <Reveal delay={0.6}>
          <div className="flex flex-row items-center gap-3 sm:gap-4 w-full sm:w-auto justify-center px-4">
            <Link href="/#solucoes" 
                  onClick={handleSolutionsClick} 
                  className="focus:outline-none flex-1 sm:flex-none sm:w-auto" 
                  tabIndex={-1}
            >
              <Button
                primary="#0E66FF"
                secondary="#001DFF"
                className="w-full sm:w-auto text-xs px-4 py-2.5 sm:text-sm sm:px-6 sm:py-3 font-semibold"
              >
                Explorar soluções
                <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
              </Button>
            </Link>
            <Link 
              href="/#contact" 
              onClick={handleContactClick}
              className="focus:outline-none flex-1 sm:flex-none sm:w-auto" 
              tabIndex={-1}
            >
              <Button
                primary="rgba(255, 255, 255, 0.06)"
                secondary="rgba(255, 255, 255, 0.16)"
                className="border border-white/10 w-full sm:w-auto text-xs px-4 py-2.5 sm:text-sm sm:px-6 sm:py-3 font-semibold"
              >
                <MessageSquare className="h-4 w-4 text-ink-300" strokeWidth={2} />
                Fale conosco
              </Button>
            </Link>
          </div>
        </Reveal>

        {/* Social Proof */}
        <Reveal delay={0.7}>
          <p className="mt-8 text-[10px] font-semibold uppercase tracking-[0.25em] text-ink-500 px-4">
            Desde 2003 integrando tecnologia e negócios.
          </p>
        </Reveal>
      </div>
      {/* End of vertically-centered hero text */}

      {/* Animated Infinite Marquee Carousel (logos) */}
      <Reveal delay={0.8} className="relative z-10 w-full max-w-full md:max-w-6xl mx-auto mt-2 overflow-hidden py-2 [mask-image:linear-gradient(to_right,transparent,white_5%,white_95%,transparent)] sm:[mask-image:linear-gradient(to_right,transparent,white_15%,white_85%,transparent)] select-none">
        <div className="flex w-max animate-marquee gap-6 hover:[animation-play-state:paused] cursor-pointer">
          {MARQUEE_PARTNERS.map((partner, index) => (
            <div key={index} className="w-[200px] sm:w-[240px] shrink-0 p-1">
              <MagicCard
                className="h-full rounded-lg"
                gradientColor="rgba(255, 255, 255, 0.05)"
                gradientFrom="rgba(255, 255, 255, 0.35)"
                gradientTo="rgba(255, 255, 255, 0.05)"
                gradientSize={150}
                gradientOpacity={0.8}
                style={{
                  "--color-background": "rgba(20, 20, 19, 0.3)",
                  "--card-face-background": "rgba(20, 20, 19, 0.55)",
                  "--color-border": "rgba(255, 255, 255, 0.05)",
                } as React.CSSProperties}
              >
                <CardContent className="p-2.5 pt-4 sm:p-4 flex flex-col items-center justify-between text-center h-full min-h-[120px] sm:min-h-[136px]">
                  {/* Logo Container */}
                  <div className="h-7 sm:h-10 flex items-center justify-center mb-2">
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
              </MagicCard>
            </div>
          ))}
        </div>
      </Reveal>

      {/* Dashboard showcase — slide central sobrepõe os laterais.
          Cortado a ~75%: a margem negativa encolhe a caixa do wrapper e o fundo
          da foto some no overflow-hidden (corte seco, sem invadir a seção branca). */}
      <Reveal delay={0.9} className="relative z-0 w-full mt-8 sm:mt-12 overflow-hidden">
        <div className="-mb-16 sm:-mb-20 md:-mb-28 lg:-mb-40">
          <DashboardCarousel slides={SHOWCASE_SLIDES} className="w-full" />
        </div>
      </Reveal>
    </section>
  )
}
