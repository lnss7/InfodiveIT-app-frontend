"use client";

import { useState, useEffect, useRef } from "react";
import Image, { type StaticImageData } from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { api, type CaseDTO } from "@/lib/api";

import financeImg from "@/assets/cases/finance.png";
import retailImg from "@/assets/cases/retail.png";
import industryImg from "@/assets/cases/industry.png";

type Case = {
  segmento: string;
  cliente: string;
  titulo: string;
  desafio: string;
  resultado: string;
  metrica: string;
  autor: string;
  cargo: string;
  depoimento: string;
  imagem: StaticImageData;
};

const FALLBACK_IMAGES = [financeImg, retailImg, industryImg];

const CASES_FALLBACK: Case[] = [
  {
    segmento: "Setor Financeiro",
    cliente: "Banco Regional",
    titulo: "Migração crítica de datacenter legado para nuvem redundante de alta performance",
    desafio: "Datacenter on-premise defasado, com problemas constantes de hardware e quedas frequentes que interrompiam as operações bancárias.",
    resultado: "Migração total para arquitetura multicloud redundante gerenciada pela Infodive, com alta disponibilidade nativa.",
    metrica: "99.98% Uptime",
    autor: "Ricardo Almeida",
    cargo: "Head de Infraestrutura de TI",
    depoimento: "A Infodive planejou e executou a migração crítica sem qualquer impacto para nossos clientes. A estabilidade operacional hoje é absoluta e as quedas foram zeradas.",
    imagem: financeImg,
  },
  {
    segmento: "Varejo e E-commerce",
    cliente: "Rede Cosmos",
    titulo: "Segurança de dados e backups imutáveis automáticos contra ameaças virtuais",
    desafio: "Processos manuais de backup lentos e vulneráveis, expondo dados vitais de faturamento e vendas diárias a riscos graves de perda.",
    resultado: "Implementação de rotina de proteção de dados imutável em nuvem com restauração automatizada instantânea sob demanda.",
    metrica: "< 10 min RTO",
    autor: "Mariana Souza",
    cargo: "Diretora de Tecnologia",
    depoimento: "Mitigamos 100% o risco de perda de dados. O processo de restauração é tão rápido e transparente que nem sequer afeta nossas frentes de caixa nas lojas.",
    imagem: retailImg,
  },
  {
    segmento: "Indústria Pesada",
    cliente: "Vesta Manufatura",
    titulo: "Modernização de infraestrutura híbrida com ganhos expressivos em velocidade",
    desafio: "Servidores locais obsoletos limitando a capacidade de processamento do sistema ERP na linha de montagem e gerando gargalos.",
    resultado: "Renovação completa do cluster de processamento local conectado com servidores híbridos escaláveis e de alta densidade.",
    metrica: "+40% Performance",
    autor: "Carlos Henrique",
    cargo: "Gerente de Planta Industrial",
    depoimento: "Ganhamos eficiência imediata na linha de montagem. O processamento das ordens de produção ficou incrivelmente ágil, destravando a produção diária.",
    imagem: industryImg,
  },
];

function fromDTO(dto: CaseDTO, idx: number): Case {
  return {
    segmento: dto.segmento,
    cliente: dto.cliente,
    titulo: dto.titulo,
    desafio: dto.desafio,
    resultado: dto.resultado,
    metrica: dto.metrica,
    autor: dto.autor,
    cargo: dto.cargo,
    depoimento: dto.depoimento,
    imagem: FALLBACK_IMAGES[idx % FALLBACK_IMAGES.length],
  };
}

export function CasesCarousel() {
  const [cases, setCases] = useState<Case[]>(CASES_FALLBACK);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [sectionInfo, setSectionInfo] = useState({
    eyebrow: "Cases de sucesso",
    headline: "Tecnologia aplicada a resultados de negócios",
    subtitulo: "",
  });
  const autoplayTimer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    api.cases()
      .then((data) => {
        if (data.length > 0) {
          setCases(data.map(fromDTO));
          setActiveIndex(0);
        }
      })
      .catch(() => { /* mantém fallback */ });

    api.secaoHome("cases")
      .then((data) => {
        if (data) {
          setSectionInfo({
            eyebrow: data.eyebrow || "Cases de sucesso",
            headline: data.headline || "Tecnologia aplicada a resultados de negócios",
            subtitulo: data.subtitulo || "",
          });
        }
      })
      .catch(() => { /* mantém fallback */ });
  }, []);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % cases.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + cases.length) % cases.length);
  };

  useEffect(() => {
    if (isHovered) {
      if (autoplayTimer.current) clearInterval(autoplayTimer.current);
      return;
    }
    autoplayTimer.current = setInterval(handleNext, 15000);
    return () => {
      if (autoplayTimer.current) clearInterval(autoplayTimer.current);
    };
  }, [isHovered, activeIndex, cases.length]);

  return (
    <>
      <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-accent">
            {sectionInfo.eyebrow}
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            {sectionInfo.headline}
          </h2>
          {sectionInfo.subtitulo && (
            <p className="mt-2 text-ink-300 text-sm font-light">
              {sectionInfo.subtitulo}
            </p>
          )}
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Caso anterior"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-white transition-all hover:border-white/20 hover:bg-white/5 active:scale-95"
          >
            <ArrowLeft className="h-4 w-4" strokeWidth={2.5} />
          </button>
          <button
            type="button"
            onClick={handleNext}
            aria-label="Próximo caso"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-white transition-all hover:border-white/20 hover:bg-white/5 active:scale-95"
          >
            <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
          </button>
        </div>
      </div>

      <div
        className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="lg:col-span-5 relative w-full aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/5] rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-white/[0.02] group">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="absolute inset-0"
            >
              <Image
                src={cases[activeIndex].imagem}
                alt={cases[activeIndex].cliente}
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover opacity-90 transition-transform duration-700 group-hover:scale-105"
              />
            </motion.div>
          </AnimatePresence>

          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent pointer-events-none z-10" />

          <AnimatePresence mode="wait">
            <motion.div
              key={`metric-${activeIndex}`}
              initial={{ opacity: 0, y: 15, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ delay: 0.15, duration: 0.3 }}
              className="absolute bottom-6 right-6 z-20 rounded-xl border border-white/10 bg-black/60 backdrop-blur-md px-5 py-3 shadow-[0_12px_24px_rgba(0,0,0,0.5)]"
            >
              <p className="text-[10px] uppercase font-bold text-ink-300 tracking-[0.15em] mb-1">
                Métrica Chave
              </p>
              <p className="text-xl font-black text-brand-accent tracking-tight">
                {cases[activeIndex].metrica}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="lg:col-span-7 flex flex-col justify-center min-h-[350px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
            >
              <span className="inline-flex rounded-full bg-brand/15 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-brand-accent">
                {cases[activeIndex].segmento}
              </span>

              <h3 className="mt-4 text-2xl sm:text-3xl font-bold tracking-tight text-white leading-snug">
                {cases[activeIndex].cliente}
                <span className="block mt-1.5 text-lg sm:text-xl text-ink-300 font-medium font-sans">
                  {cases[activeIndex].titulo}
                </span>
              </h3>

              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6 border-t border-white/10 pt-6">
                <div>
                  <h4 className="text-xs uppercase font-bold text-ink-500 tracking-[0.1em]">O Desafio</h4>
                  <p className="mt-2 text-sm text-ink-300 leading-relaxed font-sans font-light">
                    {cases[activeIndex].desafio}
                  </p>
                </div>
                <div>
                  <h4 className="text-xs uppercase font-bold text-brand-accent tracking-[0.1em]">A Solução</h4>
                  <p className="mt-2 text-sm text-ink-200 leading-relaxed font-sans font-light">
                    {cases[activeIndex].resultado}
                  </p>
                </div>
              </div>

              <div className="mt-8 rounded-xl border border-white/5 bg-white/[0.02] p-6 relative overflow-hidden">
                <span className="absolute -top-4 left-3 text-7xl text-brand-accent/10 font-serif select-none pointer-events-none">
                  &ldquo;
                </span>
                <p className="text-sm italic text-ink-200 leading-relaxed relative z-10 pl-2">
                  {cases[activeIndex].depoimento}
                </p>
                <div className="mt-5 flex items-center gap-3 border-t border-white/5 pt-4">
                  <div className="h-9 w-9 rounded-full bg-gradient-to-br from-brand to-brand-deep flex items-center justify-center text-xs font-bold text-white shadow-md select-none shrink-0">
                    {cases[activeIndex].autor.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-white leading-none">
                      {cases[activeIndex].autor}
                    </span>
                    <span className="text-[10px] text-ink-500 mt-1">
                      {cases[activeIndex].cargo}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="mt-8 flex items-center gap-4 border-t border-white/10 pt-6">
            {cases.map((c, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className="flex flex-col text-left group focus:outline-none"
              >
                <div className="w-12 sm:w-16 h-1 rounded-full overflow-hidden bg-white/10 relative">
                  <div
                    className={cn(
                      "absolute inset-y-0 left-0 bg-brand-accent transition-all duration-300",
                      activeIndex === idx ? "w-full" : "w-0 group-hover:w-1/3",
                    )}
                  />
                </div>
                <span
                  className={cn(
                    "mt-2 text-[9px] sm:text-[10px] font-bold tracking-[0.1em] uppercase transition-colors duration-300",
                    activeIndex === idx ? "text-white" : "text-ink-500 group-hover:text-ink-300",
                  )}
                >
                  {c.cliente.split(" ")[0]}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default CasesCarousel;
