"use client";

import { cn } from "@/lib/utils";

type MenuToggleProps = {
  open: boolean;
  onClick: () => void;
  /** Barras escuras (sobre fundo claro) ou brancas (sobre o hero). */
  dark?: boolean;
};

/**
 * Botão hamburger que faz o morph dos três traços para um "X" ao abrir o menu.
 * O mesmo botão abre e fecha — a transição é puramente CSS (transform/opacity).
 */
export function MenuToggle({ open, onClick, dark = false }: MenuToggleProps) {
  const bar = cn(
    "absolute left-0 block h-[2px] w-full rounded-full",
    "transition-all duration-300 ease-[cubic-bezier(0.65,0,0.35,1)]",
    dark ? "bg-ink-900" : "bg-white"
  );

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={open ? "Fechar menu" : "Abrir menu"}
      aria-expanded={open}
      className={cn(
        "lg:hidden relative inline-flex h-10 w-10 items-center justify-center rounded-xl",
        "transition-colors duration-300",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/30",
        dark ? "hover:bg-ink-50 active:bg-ink-50" : "hover:bg-white/10 active:bg-white/10"
      )}
    >
      <span className="relative block h-4 w-[22px]" aria-hidden>
        <span className={cn(bar, "top-0", open && "translate-y-[7px] rotate-45")} />
        <span className={cn(bar, "top-1/2 -translate-y-1/2", open && "opacity-0")} />
        <span className={cn(bar, "bottom-0", open && "-translate-y-[7px] -rotate-45")} />
      </span>
    </button>
  );
}
