"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronDown, Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { Logo } from "./logo";
import { MobileMenu } from "./mobile-menu";
import { SolucoesDropdown } from "./dropdown-solucoes";
import { ProdutosDropdown } from "./dropdown-produtos";
import { Button } from "@/components/ui/button";
import { navLinks } from "./data";

const SCROLL_THRESHOLD = 8;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [dropdown, setDropdown] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const closeTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > SCROLL_THRESHOLD);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const openDropdown = useCallback((key: string) => {
    if (closeTimeout.current) {
      clearTimeout(closeTimeout.current);
      closeTimeout.current = null;
    }
    setDropdown(key);
  }, []);

  const scheduleClose = useCallback(() => {
    if (closeTimeout.current) clearTimeout(closeTimeout.current);
    closeTimeout.current = setTimeout(() => setDropdown(null), 120);
  }, []);

  const closeDropdown = useCallback(() => {
    if (closeTimeout.current) clearTimeout(closeTimeout.current);
    setDropdown(null);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeDropdown();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [closeDropdown]);

  return (
    <>
      <header
        className={cn("fixed inset-x-0 top-0 z-50", "pointer-events-none")}
      >
        <div className="container-default pt-3 md:pt-4">
          <div
            className={cn(
              "pointer-events-auto relative",
              "rounded-2xl transition-[background-color,box-shadow,border-color] duration-300",
              scrolled
                ? "bg-white/85 border border-ink-200 backdrop-blur-xl backdrop-saturate-150 shadow-[0_10px_30px_-12px_rgba(20,20,19,0.12),0_2px_6px_-2px_rgba(20,20,19,0.04)]"
                : "bg-transparent border border-transparent shadow-none",
            )}
          >
            <div className="flex h-14 items-center justify-between px-4 md:h-16 md:px-5">
              <Logo scrolled={scrolled} />

              <nav
                aria-label="Navegação principal"
                className={cn(
                  'hidden lg:flex items-center gap-1 transition-all duration-300 rounded-full border',
                  scrolled
                    ? 'px-0 py-0 bg-transparent border-transparent shadow-none'
                    : 'bg-white/[0.06] border-white/10 px-5 py-1.5 backdrop-blur-md shadow-lg',
                )}
              >
                {navLinks.map((link) => {
                  const isDropdown = !!link.dropdown;
                  const isOpen = dropdown === link.dropdown && isDropdown;

                  if (isDropdown) {
                    const dropdownKey = link.dropdown!;
                    return (
                      <div
                        key={link.label}
                        onMouseEnter={() => openDropdown(dropdownKey)}
                        onMouseLeave={scheduleClose}
                      >
                        <button
                          type="button"
                          aria-expanded={isOpen}
                          aria-haspopup="menu"
                          onClick={() =>
                            dropdown === dropdownKey
                              ? closeDropdown()
                              : openDropdown(dropdownKey)
                          }
                          className={cn(
                            "inline-flex items-center gap-1 rounded-md px-3 py-1.5",
                            "text-sm font-medium transition-all duration-300",
                            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/30",
                            scrolled
                              ? isOpen
                                ? "bg-ink-50 text-ink-950"
                                : "text-ink-900 hover:bg-ink-50 hover:text-ink-950"
                              : isOpen
                                ? "bg-white/15 text-white"
                                : "text-white/80 hover:bg-white/10 hover:text-white",
                          )}
                        >
                          {link.label}
                          <ChevronDown
                            className={cn(
                              "h-3.5 w-3.5 transition-transform duration-300",
                              scrolled ? "text-ink-500" : "text-white/60",
                              isOpen && "rotate-180",
                            )}
                            strokeWidth={2}
                          />
                        </button>
                      </div>
                    );
                  }

                  return (
                    <Link
                      key={link.label}
                      href={link.href}
                      className={cn(
                        "inline-flex items-center rounded-md px-3 py-1.5",
                        "text-sm font-medium transition-all duration-300",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/30",
                        scrolled
                          ? "text-ink-900 hover:bg-ink-50 hover:text-ink-950"
                          : "text-white/80 hover:bg-white/10 hover:text-white",
                      )}
                    >
                      {link.label}
                    </Link>
                  );
                })}
              </nav>

              <div className="flex items-center gap-2">
                <Link
                  href="/contato"
                  className="hidden md:inline-block focus:outline-none"
                  tabIndex={-1}
                >
                  <Button
                    primary={scrolled ? "#0F0F0E" : "#0E66FF"}
                    secondary={scrolled ? "#1E1E1C" : "#001DFF"}
                    className={cn(
                      "px-5 py-2 text-sm font-medium gap-1.5 rounded-full transition-colors",
                      scrolled
                        ? ""
                        : "border border-brand/20 shadow-[0_4px_14px_rgba(14,102,255,0.25)]"
                    )}
                  >
                    Fale com um especialista
                    <ArrowRight className="h-3.5 w-3.5" strokeWidth={2} />
                  </Button>
                </Link>

                <button
                  type="button"
                  onClick={() => setMobileOpen(true)}
                  aria-label="Abrir menu"
                  aria-expanded={mobileOpen}
                  className={cn(
                    "lg:hidden inline-flex h-9 w-9 items-center justify-center",
                    "rounded-md transition-all duration-300",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/30",
                    scrolled
                      ? "text-ink-900 hover:bg-ink-50"
                      : "text-white hover:bg-white/10",
                  )}
                >
                  <Menu className="h-5 w-5" strokeWidth={2} />
                </button>
              </div>
            </div>

            <AnimatePresence>
              {dropdown === "solucoes" && (
                <div
                  onMouseEnter={() => openDropdown("solucoes")}
                  onMouseLeave={scheduleClose}
                >
                  <SolucoesDropdown onItemClick={closeDropdown} />
                </div>
              )}
              {dropdown === "produtos" && (
                <div
                  onMouseEnter={() => openDropdown("produtos")}
                  onMouseLeave={scheduleClose}
                >
                  <ProdutosDropdown onItemClick={closeDropdown} />
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </header>

      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
