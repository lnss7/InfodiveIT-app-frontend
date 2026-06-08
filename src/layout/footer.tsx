"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ShieldCheck, Cpu } from "lucide-react";
import logoImg from "@/assets/logo/Logo infodive.webp";
import facebookImg from "@/assets/footer/facebook.png";
import facebookColorImg from "@/assets/footer/facebook-colorfull.png";
import instagramImg from "@/assets/footer/instagram.png";
import instagramColorImg from "@/assets/footer/instagram-colorfull.png";
import linkedinImg from "@/assets/footer/linkedin.png";
import linkedinColorImg from "@/assets/footer/linkedin-colorfull.png";

gsap.registerPlugin(ScrollTrigger);

export function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  // Reveal por parallax — APENAS no desktop (lg+).
  // No mobile o iOS bloqueia a animação atrelada ao scroll, e o footer ficava "travado"
  // deslocado pra cima (yPercent), deixando uma faixa branca embaixo. Então no mobile
  // o footer fica parado na posição natural (sem transform) — sem faixa, sem branco.
  useEffect(() => {
    if (!footerRef.current) return;

    const mm = gsap.matchMedia();
    mm.add("(min-width: 1024px)", () => {
      gsap.from(footerRef.current, {
        yPercent: -30,
        ease: "none",
        immediateRender: false,
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top bottom", // quando o topo do footer entra por baixo da viewport
          end: "bottom bottom", // até a base do footer chegar à base da tela (fim da página)
          scrub: true,
          invalidateOnRefresh: true,
        },
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <footer
      ref={footerRef}
      className="relative w-full z-10 text-white overflow-hidden flex flex-col justify-end footer-wrap"
      style={{
        background:
          "linear-gradient(to bottom, rgba(8,3,16,0.55) 0%, #050507 72%), linear-gradient(135deg, #6F0101 0%, #3B1F59 50%, #063FB4 100%)",
      }}
    >
      {/* Decorative background grid */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:40px_40px] opacity-75"></div>
      </div>

      <div className="relative z-10 w-full mx-auto max-w-[1600px] px-6 md:px-10 pt-20 pb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-16 border-b border-white/10">
            {/* Logo and About Section */}
            <div className="md:col-span-2 lg:col-span-4 flex flex-col gap-6">
              <Link
                href="/"
                className="inline-block transition-transform hover:scale-95 duration-300"
              >
                <Image
                  src={logoImg}
                  alt="Infodive Logo"
                  className="h-[32px] w-auto object-contain"
                  priority
                />
              </Link>
              <p className="text-white/60 text-sm max-w-sm leading-relaxed">
                Consultoria e infraestrutura de TI avançada para empresas em
                expansão. Projetando a segurança, estabilidade e inteligência do
                seu amanhã.
              </p>

              {/* Badge/Certifications simulation */}
              <div className="flex gap-4 items-center text-white/50 text-xs">
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
                  <ShieldCheck className="h-4 w-4 text-[#46BEA3]" />
                  <span>NOC 24/7 Ativo</span>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
                  <Cpu className="h-4 w-4 text-[#0E66FF]" />
                  <span>Cloud Integrada</span>
                </div>
              </div>
            </div>

            {/* Links Columns */}
            <div className="md:col-span-1 lg:col-span-2 lg:col-start-6 flex flex-col gap-4">
              <h4 className="text-sm font-semibold tracking-wider text-white uppercase">
                Soluções
              </h4>
              <ul className="flex flex-col gap-2.5 text-sm text-white/55">
                <li>
                  <Link
                    href="#solutions"
                    className="hover:text-white hover:translate-x-1 transition-all duration-200 block"
                  >
                    Infraestrutura
                  </Link>
                </li>
                <li>
                  <Link
                    href="#solutions"
                    className="hover:text-white hover:translate-x-1 transition-all duration-200 block"
                  >
                    Segurança Cibernética
                  </Link>
                </li>
                <li>
                  <Link
                    href="#solutions"
                    className="hover:text-white hover:translate-x-1 transition-all duration-200 block"
                  >
                    Cloud & Virtualização
                  </Link>
                </li>
                <li>
                  <Link
                    href="#solutions"
                    className="hover:text-white hover:translate-x-1 transition-all duration-200 block"
                  >
                    Inteligência Artificial
                  </Link>
                </li>
              </ul>
            </div>

            <div className="md:col-span-1 lg:col-span-2 flex flex-col gap-4">
              <h4 className="text-sm font-semibold tracking-wider text-white uppercase">
                Produtos
              </h4>
              <ul className="flex flex-col gap-2.5 text-sm text-white/55">
                <li>
                  <Link
                    href="#products"
                    className="hover:text-white hover:translate-x-1 transition-all duration-200 block"
                  >
                    Monitoramento NOC
                  </Link>
                </li>
                <li>
                  <Link
                    href="#products"
                    className="hover:text-white hover:translate-x-1 transition-all duration-200 block"
                  >
                    Backup Cloud
                  </Link>
                </li>
                <li>
                  <Link
                    href="#products"
                    className="hover:text-white hover:translate-x-1 transition-all duration-200 block"
                  >
                    Firewall Next-Gen
                  </Link>
                </li>
                <li>
                  <Link
                    href="#products"
                    className="hover:text-white hover:translate-x-1 transition-all duration-200 block"
                  >
                    Servidores Dedicados
                  </Link>
                </li>
              </ul>
            </div>

            <div className="md:col-span-2 lg:col-span-2 lg:col-start-11 flex flex-col gap-4">
              <h4 className="text-sm font-semibold tracking-wider text-white uppercase">
                Empresa
              </h4>
              <ul className="flex flex-col gap-2.5 text-sm text-white/55">
                <li>
                  <Link
                    href="#about"
                    className="hover:text-white hover:translate-x-1 transition-all duration-200 block"
                  >
                    Sobre Nós
                  </Link>
                </li>
                <li>
                  <Link
                    href="#cases"
                    className="hover:text-white hover:translate-x-1 transition-all duration-200 block"
                  >
                    Casos de Sucesso
                  </Link>
                </li>
                <li>
                  <Link
                    href="#blog"
                    className="hover:text-white hover:translate-x-1 transition-all duration-200 block"
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    href="#contact"
                    className="hover:text-white hover:translate-x-1 transition-all duration-200 block"
                  >
                    Fale Conosco
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Footer Section */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-8 text-xs text-white/40">
            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
              <span>
                &copy; {new Date().getFullYear()} Infodive Tecnologia Ltda.
              </span>
              <span className="hidden md:inline text-white/10">|</span>
              <Link
                href="/politica-de-privacidade"
                className="hover:text-white transition-colors duration-200"
              >
                Política de Privacidade
              </Link>
              <span className="hidden md:inline text-white/10">|</span>
              <Link
                href="/termos-de-uso"
                className="hover:text-white transition-colors duration-200"
              >
                Termos de Uso
              </Link>
            </div>

            {/* Social Media links */}
            <div className="flex gap-5">
              <a
                href="https://www.linkedin.com/company/infodiveit/posts/?feedView=all"
                target="_blank"
                rel="noopener noreferrer"
                className="relative group block h-5 w-5"
                aria-label="LinkedIn"
              >
                <Image
                  src={linkedinImg}
                  alt="LinkedIn"
                  className="absolute inset-0 h-5 w-5 object-contain opacity-60 transition-opacity duration-300 group-hover:opacity-0"
                />
                <Image
                  src={linkedinColorImg}
                  alt="LinkedIn"
                  className="absolute inset-0 h-5 w-5 object-contain opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                />
              </a>
              <a
                href="https://www.instagram.com/infodiveit/"
                target="_blank"
                rel="noopener noreferrer"
                className="relative group block h-5 w-5"
                aria-label="Instagram"
              >
                <Image
                  src={instagramImg}
                  alt="Instagram"
                  className="absolute inset-0 h-5 w-5 object-contain opacity-60 transition-opacity duration-300 group-hover:opacity-0"
                />
                <Image
                  src={instagramColorImg}
                  alt="Instagram"
                  className="absolute inset-0 h-5 w-5 object-contain opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                />
              </a>
              <a
                href="https://www.facebook.com/InfodiveIt"
                target="_blank"
                rel="noopener noreferrer"
                className="relative group block h-5 w-5"
                aria-label="Facebook"
              >
                <Image
                  src={facebookImg}
                  alt="Facebook"
                  className="absolute inset-0 h-5 w-5 object-contain opacity-60 transition-opacity duration-300 group-hover:opacity-0"
                />
                <Image
                  src={facebookColorImg}
                  alt="Facebook"
                  className="absolute inset-0 h-5 w-5 object-contain opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                />
              </a>
            </div>
          </div>
        </div>
      </footer>
  );
}
