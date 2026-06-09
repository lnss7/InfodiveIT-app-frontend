"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import gsap from "gsap";
import Image from "next/image";
import { z } from "zod";
import { SelectField } from "@/components/ui/select-field";
import { cn } from "@/lib/utils";
import infodiveLogo from "@/assets/logo/Logo infodive.webp";
import iconContact from "@/assets/logo/Icon contact.png";

// Validação client-side (a validação final é responsabilidade do backend)
const contactSchema = z.object({
  firstName: z.string().trim().min(1, "Informe seu nome."),
  lastName: z.string().trim().min(1, "Informe seu sobrenome."),
  email: z.string().trim().min(1, "Informe seu e-mail.").email("Digite um e-mail válido."),
  phone: z.string().trim().min(1, "Informe seu celular."),
  company: z.string().trim().min(1, "Informe o nome da empresa."),
  message: z.string().trim().min(1, "Conte pra gente o que você precisa."),
  agreeToTerms: z.boolean().refine((v) => v, { message: "É necessário aceitar os termos." }),
});

type FieldErrors = Partial<Record<keyof z.infer<typeof contactSchema>, string>>;

// Mensagem de erro sutil exibida abaixo de um campo
function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p className="mt-1.5 flex items-center gap-1.5 text-xs text-[#E5484D]">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-3.5 h-3.5 shrink-0">
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="12" />
        <line x1="12" y1="16" x2="12.01" y2="16" />
      </svg>
      {message}
    </p>
  );
}

interface GsapMenuProps {
  isOpen: boolean;
  onToggle: (open: boolean) => void;
  exitSpeed?: number;
  easeReverse?: boolean;
}

export function GsapMenu({
  isOpen,
  onToggle,
  exitSpeed = 1,
  easeReverse = true,
}: GsapMenuProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const closeTlRef = useRef<gsap.core.Timeline | null>(null);
  const isFirstRender = useRef(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const EMAIL_ADRESS = "contato@infodive.com.br";
  // Form states based on reference image
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [technologies, setTechnologies] = useState<string[]>([]);
  const [message, setMessage] = useState("");
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errors, setErrors] = useState<FieldErrors>({});

  // Remove o erro de um campo assim que o usuário começa a corrigi-lo
  const clearError = (field: keyof FieldErrors) =>
    setErrors((prev) => {
      if (!prev[field]) return prev;
      const next = { ...prev };
      delete next[field];
      return next;
    });

  // Re-build/initialize the GSAP timeline
  useEffect(() => {
    if (!containerRef.current) return;

    // Standard GSAP selector helper scoped to this component's container
    const q = gsap.utils.selector(containerRef);

    // If there is an existing timeline, revert it to avoid duplicates
    if (tlRef.current) {
      tlRef.current.revert();
    }

    // Set initial states
    gsap.set(q("#nav"), { visibility: "hidden" });
    gsap.set(q(".nav-bg"), { opacity: 0 });
    gsap.set(q(".nav-login"), { opacity: 0, y: 8 });

    const er = (val: string | boolean) => {
      return easeReverse ? val || true : false;
    };

    // Create the GSAP timeline
    const tl = gsap.timeline({
      paused: true,
      onReverseComplete: () => {
        gsap.set(q("#nav"), { visibility: "hidden", pointerEvents: "none" });
      },
    });
    tlRef.current = tl;

    tl.set(q("#nav"), { visibility: "visible", pointerEvents: "auto" })
      // ═══ ENTER ═══
      .to(
        q(".nav-bg"),
        {
          opacity: 1,
          duration: 0.4,
          ease: "power2.out",
          easeReverse: er("power4.out"),
        },
        0
      )
      .fromTo(
        q(".nav-panel"),
        { x: "110%", y: 0, rotation: 0 },
        {
          x: "0%",
          y: 0,
          duration: 0.6,
          ease: "back.out",
          easeReverse: er("power3.in"),
          stagger: 0.1,
        },
        0
      )
      .fromTo(
        q(".nav-item"),
        { opacity: 0, x: -20 },
        {
          opacity: 1,
          x: 0,
          duration: 1.2,
          ease: "expo.out",
          easeReverse: er("power3.in"),
          stagger: 0.03,
        },
        0.1
      )
      .to(
        q(".nav-login"),
        {
          opacity: 1,
          y: 0,
          duration: 0.3,
          ease: "power3.out",
          easeReverse: er("power4.out"),
        },
        0.4
      );

    // Clean up timeline on unmount
    return () => {
      if (tlRef.current) {
        tlRef.current.kill();
      }
      if (closeTlRef.current) {
        closeTlRef.current.kill();
      }
    };
  }, [easeReverse, mounted]);

  // Handle open/close
  useEffect(() => {
    const tl = tlRef.current;
    if (!tl || !containerRef.current) return;
    const q = gsap.utils.selector(containerRef);

    if (isOpen) {
      // Cancela um fechamento em andamento e (re)inicia a entrada do começo
      closeTlRef.current?.kill();
      closeTlRef.current = null;
      tl.timeScale(1).play(0);
    } else {
      if (isFirstRender.current) {
        isFirstRender.current = false;
        return;
      }
      // Fechamento dedicado: o painel sai IMEDIATAMENTE. Com reverse() o painel só
      // se movia depois de reverter todo o conteúdo (que entra por último), causando
      // o delay percebido entre o clique e a saída do painel.
      tl.pause();
      closeTlRef.current?.kill();
      const closeTl = gsap.timeline({
        onComplete: () => {
          gsap.set(q("#nav"), { visibility: "hidden", pointerEvents: "none" });
        },
      });
      closeTl
        .to(q(".nav-item"), { opacity: 0, duration: 0.12, ease: "power1.in" }, 0)
        .to(q(".nav-login"), { opacity: 0, duration: 0.12, ease: "power1.in" }, 0)
        .to(q(".nav-panel"), { x: "110%", duration: 0.45, ease: "power3.in", stagger: 0.05 }, 0)
        .to(q(".nav-bg"), { opacity: 0, duration: 0.4, ease: "power2.in" }, 0.05);
      closeTl.timeScale(exitSpeed);
      closeTlRef.current = closeTl;
    }
  }, [isOpen, exitSpeed, mounted]);

  // Escape key handler to close the menu
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onToggle(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onToggle]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Checklist handler
  const handleTechChange = (tech: string) => {
    setTechnologies((prev) =>
      prev.includes(tech) ? prev.filter((t) => t !== tech) : [...prev, tech]
    );
  };

  // Form submission handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const result = contactSchema.safeParse({
      firstName,
      lastName,
      email,
      phone,
      company,
      message,
      agreeToTerms,
    });

    if (!result.success) {
      const fieldErrors: FieldErrors = {};
      for (const issue of result.error.issues) {
        const key = issue.path[0] as keyof FieldErrors;
        if (key && !fieldErrors[key]) fieldErrors[key] = issue.message;
      }
      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    setStatus("submitting");

    // Simulate API request
    setTimeout(() => {
      setStatus("success");
      
      // Auto-close menu after success feedback (5 seconds)
      setTimeout(() => {
        onToggle(false);
        // Reset state after closing animation completes
        setTimeout(() => {
          setStatus("idle");
          setFirstName("");
          setLastName("");
          setEmail("");
          setPhone("");
          setCompany("");
          setRole("");
          setTechnologies([]);
          setMessage("");
          setAgreeToTerms(false);
          setErrors({});
        }, 1000);
      }, 5000);
    }, 1200);
  };

  if (!mounted) return null;

  return createPortal(
    <div ref={containerRef} className="gsap-menu-theme">
      {/* Nav Overlay Drawer */}
      <div className="nav" id="nav">
        <div className="nav-bg" onClick={() => onToggle(false)}></div>

        {/* Top panel — Form Drawer Card */}
        <div 
          className="nav-top nav-border nav-panel" 
          id="navTop" 
          data-lenis-prevent
          style={{ 
            maxWidth: "700px", 
            display: "flex", 
            flexDirection: "column",
            background: "#FFFFFF",
            color: "#141413"
          }}
        >
          <div className="relative w-full flex flex-col pt-4 pb-6 sm:pb-16 px-4 md:px-8">
            
            {/* Header Area */}
            <div className="flex justify-between items-start mb-4 sm:mb-6">
              <div className="pr-8">
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight tracking-tight">
                  Falar com vendas
                </h3>
                <p className="text-xs md:text-sm text-gray-500 mt-2 leading-relaxed font-normal">
                  Tem uma pergunta? Fale com um especialista e tire todas as suas dúvidas sobre a plataforma.
                </p>
              </div>
              
              {/* Close Button X at the top right */}
              <button
                type="button"
                onClick={() => onToggle(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-gray-100 rounded-full cursor-pointer -mt-1 -mr-1"
                aria-label="Fechar"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {status === "success" ? (
              <div className="flex flex-col items-center justify-center py-20 text-center my-auto">
                <div className="w-16 h-16 bg-[#E4EAFF] text-[#0E66FF] rounded-full flex items-center justify-center mb-6">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="w-8 h-8">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Mensagem enviada com sucesso!</h3>
                <p className="text-sm text-gray-500 max-w-sm">
                  Obrigado pelo contato, {firstName}. Nossos consultores retornarão em até 1 hora.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4 sm:gap-5 text-left text-gray-900 font-sans">

                {/* Nome & Sobrenome */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="nav-item">
                    <label className="block text-xs font-medium text-gray-700 mb-2">
                      Nome <span className="text-[#E5484D]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      aria-invalid={!!errors.firstName}
                      value={firstName}
                      onChange={(e) => { setFirstName(e.target.value); clearError("firstName"); }}
                      placeholder="Nome"
                      className={cn(
                        "w-full px-4 h-12 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-[#0E66FF] focus:ring-2 focus:ring-[#0E66FF]/10 bg-white text-gray-900 transition-all",
                        errors.firstName && "field-error"
                      )}
                      disabled={status === "submitting"}
                    />
                    <FieldError message={errors.firstName} />
                  </div>
                  <div className="nav-item">
                    <label className="block text-xs font-medium text-gray-700 mb-2">
                      Sobrenome <span className="text-[#E5484D]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      aria-invalid={!!errors.lastName}
                      value={lastName}
                      onChange={(e) => { setLastName(e.target.value); clearError("lastName"); }}
                      placeholder="Sobrenome"
                      className={cn(
                        "w-full px-4 h-12 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-[#0E66FF] focus:ring-2 focus:ring-[#0E66FF]/10 bg-white text-gray-900 transition-all",
                        errors.lastName && "field-error"
                      )}
                      disabled={status === "submitting"}
                    />
                    <FieldError message={errors.lastName} />
                  </div>
                </div>

                {/* E-mail & Celular */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="nav-item">
                    <label className="block text-xs font-medium text-gray-700 mb-2">
                      E-mail <span className="text-[#E5484D]">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      aria-invalid={!!errors.email}
                      value={email}
                      onChange={(e) => { setEmail(e.target.value); clearError("email"); }}
                      placeholder="E-mail"
                      className={cn(
                        "w-full px-4 h-12 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-[#0E66FF] focus:ring-2 focus:ring-[#0E66FF]/10 bg-white text-gray-900 transition-all",
                        errors.email && "field-error"
                      )}
                      disabled={status === "submitting"}
                    />
                    <FieldError message={errors.email} />
                  </div>
                  <div className="nav-item">
                    <label className="block text-xs font-medium text-gray-700 mb-2">
                      Celular <span className="text-[#E5484D]">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      aria-invalid={!!errors.phone}
                      value={phone}
                      onChange={(e) => { setPhone(e.target.value); clearError("phone"); }}
                      placeholder="+000 (00) 00000-0000"
                      className={cn(
                        "w-full px-4 h-12 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-[#0E66FF] focus:ring-2 focus:ring-[#0E66FF]/10 bg-white text-gray-900 transition-all",
                        errors.phone && "field-error"
                      )}
                      disabled={status === "submitting"}
                    />
                    <FieldError message={errors.phone} />
                  </div>
                </div>

                {/* Empresa & Cargo */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="nav-item">
                    <label className="block text-xs font-medium text-gray-700 mb-2">
                      Empresa <span className="text-[#E5484D]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      aria-invalid={!!errors.company}
                      value={company}
                      onChange={(e) => { setCompany(e.target.value); clearError("company"); }}
                      placeholder="Nome da empresa"
                      className={cn(
                        "w-full px-4 h-12 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-[#0E66FF] focus:ring-2 focus:ring-[#0E66FF]/10 bg-white text-gray-900 transition-all",
                        errors.company && "field-error"
                      )}
                      disabled={status === "submitting"}
                    />
                    <FieldError message={errors.company} />
                  </div>
                  <div className="nav-item">
                    <label className="block text-xs font-medium text-gray-700 mb-2">Cargo</label>
                    <SelectField
                      value={role}
                      onChange={setRole}
                      ariaLabel="Cargo"
                      placeholder="Selecione"
                      disabled={status === "submitting"}
                      options={[
                        { value: "Diretor / C-Level", label: "Diretor / C-Level" },
                        { value: "Gerente de TI", label: "Gerente de TI" },
                        { value: "Coordenador / Supervisor de TI", label: "Coordenador / Supervisor de TI" },
                        { value: "Analista / Engenheiro de TI", label: "Analista / Engenheiro de TI" },
                        { value: "Outro", label: "Outro" },
                      ]}
                    />
                  </div>
                </div>

                {/* Qual tecnologia está procurando? */}
                <div className="nav-item">
                  <span className="block text-sm font-semibold text-gray-800 mb-3">
                    Qual tecnologia está procurando?
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-4">
                    {[
                      { id: "cloud", label: "Computação em Nuvem" },
                      { id: "services", label: "Serviços" },
                      { id: "data", label: "Dados" },
                      { id: "partnerships", label: "Parcerias" },
                      { id: "security", label: "Cibersegurança" },
                      { id: "other", label: "Outro assunto" },
                      { id: "ai", label: "Inteligência Artificial" },
                    ].map((tech) => (
                      <label 
                        key={tech.id} 
                        className="flex items-center gap-3 text-sm font-normal text-gray-600 cursor-pointer select-none"
                      >
                        <input
                          type="checkbox"
                          checked={technologies.includes(tech.label)}
                          onChange={() => handleTechChange(tech.label)}
                          className="w-4 h-4 rounded border-gray-300 text-[#0E66FF] focus:ring-[#0E66FF] cursor-pointer"
                          disabled={status === "submitting"}
                        />
                        {tech.label}
                      </label>
                    ))}
                  </div>
                </div>

                {/* Quais são as necessidades da sua empresa? */}
                <div className="nav-item">
                  <label className="block text-sm font-semibold text-gray-800 mb-2">
                    Quais são as necessidades da sua empresa? <span className="text-[#E5484D]">*</span>
                  </label>
                  <textarea
                    required
                    rows={4}
                    aria-invalid={!!errors.message}
                    value={message}
                    onChange={(e) => { setMessage(e.target.value); clearError("message"); }}
                    placeholder="Digite sua mensagem..."
                    className={cn(
                      "w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-[#0E66FF] focus:ring-2 focus:ring-[#0E66FF]/10 resize-none bg-white placeholder-gray-400 transition-all",
                      errors.message && "field-error"
                    )}
                    disabled={status === "submitting"}
                  />
                  <FieldError message={errors.message} />
                </div>

                {/* Termos de Uso */}
                <div className="nav-item">
                  <label className="flex items-start gap-3 text-sm font-normal text-gray-600 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      required
                      aria-invalid={!!errors.agreeToTerms}
                      checked={agreeToTerms}
                      onChange={(e) => { setAgreeToTerms(e.target.checked); clearError("agreeToTerms"); }}
                      className={cn(
                        "w-4 h-4 mt-0.5 rounded border-gray-300 text-[#0E66FF] focus:ring-[#0E66FF] cursor-pointer",
                        errors.agreeToTerms && "field-error"
                      )}
                      disabled={status === "submitting"}
                    />
                    <span>
                      Li e estou de acordo com os{" "}
                      <a href="#" className="underline text-gray-800 hover:text-black font-medium">
                        Termos e política de privacidade
                      </a>.
                    </span>
                  </label>
                  <FieldError message={errors.agreeToTerms} />
                </div>

                {/* Submit button aligned bottom right */}
                <div className="nav-login flex justify-end mt-2">
                  <button
                    type="submit"
                    className="px-8 py-3 bg-[#001DFF] hover:bg-[#0b21e8] text-white font-sans font-semibold rounded-full text-sm transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 active:scale-95 shadow-md shadow-[#001DFF]/15"
                    disabled={status === "submitting"}
                  >
                    {status === "submitting" ? (
                      <>
                        <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                        Enviando...
                      </>
                    ) : (
                      "Solicitar contato"
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Middle panel — Blue gradient with support details */}
        <div className="nav-middle nav-border nav-panel" id="navMiddle">
          <div className="nav-middle-header text-white/70">SUPORTE & ATENDIMENTO</div>
          <div className="nav-middle-card">
            <div className="nav-middle-badge text-white">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
                <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
              </svg>
            </div>
            <div className="nav-middle-info">
              <div className="nav-middle-title text-white">Já é cliente e precisa de ajuda?</div>
              <div className="nav-middle-desc text-white/80 text-xs leading-relaxed mt-0.5">
                Fale conosco pelo e-mail <strong className="text-white">contato@infodive.com.br</strong> ou pelo telefone de suporte.
              </div>
            </div>
          </div>
          <div className="nav-middle-actions mt-3">
            <a 
              href={`mailto:${EMAIL_ADRESS}`} 
              className="nav-action-btn text-xs font-semibold"
            >
              Falar com o Suporte
            </a>
          </div>
        </div>

        {/* Bottom panel — social networks */}
        <div className="nav-bottom nav-border nav-panel" id="navBottom">
          <ul className="nav-socials flex gap-4 text-xs">
            <li><a href="https://www.linkedin.com/company/infodiveit/posts/?feedView=all" className="hover:text-white transition-colors">LinkedIn</a></li>
            <li><a href="https://www.instagram.com/infodiveit/" className="hover:text-white transition-colors">Instagram</a></li>
            <li><a href="https://www.facebook.com/InfodiveIt" className="hover:text-white transition-colors">Facebook</a></li>
          </ul>
          <div className="nav-asset">
            <Image
              src={infodiveLogo}
              alt="Infodive"
              width={132}
              height={33}
              className="hidden sm:block nav-logo-img"
            />
            <Image
              src={iconContact}
              alt="Contato"
              width={30}
              height={30}
              className="block sm:hidden object-contain"
            />
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
