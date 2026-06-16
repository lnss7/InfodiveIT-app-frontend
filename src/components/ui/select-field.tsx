"use client"

import * as React from "react"
import { createPortal } from "react-dom"
import { ChevronDown, Check } from "lucide-react"
import { AnimatePresence, motion } from "framer-motion"
import { cn } from "@/lib/utils"

export type SelectOption = { value: string; label: string }

interface SelectFieldProps {
  value: string
  onChange: (value: string) => void
  options: SelectOption[]
  placeholder?: string
  disabled?: boolean
  invalid?: boolean
  ariaLabel?: string
  className?: string
}

/**
 * Select acessível e customizado (sem `<select>` nativo). O painel de opções é
 * renderizado via portal em `document.body` e posicionado de forma fixa abaixo do
 * gatilho, reposicionando-se em scroll/resize — pensado para formulários que rolam
 * dentro de um card.
 *
 * @param value - Valor selecionado (componente controlado).
 * @param onChange - Callback chamado com o `value` da opção escolhida.
 * @param options - Lista de opções no formato `{ value, label }`.
 * @param placeholder - Texto exibido quando não há valor. Default: `"Selecione"`.
 * @param disabled - Desabilita a abertura e aplica estilo de desabilitado.
 * @param invalid - Aplica o estilo de erro e marca `aria-invalid`.
 * @param ariaLabel - Rótulo acessível do gatilho (quando não há `<label>` visível).
 * @param className - Classes Tailwind adicionais no wrapper.
 *
 * @example
 * <SelectField
 *   value={fabricante}
 *   onChange={setFabricante}
 *   options={[{ value: "ibm", label: "IBM" }]}
 *   placeholder="Fabricante"
 * />
 */
export function SelectField({
  value,
  onChange,
  options,
  placeholder = "Selecione",
  disabled = false,
  invalid = false,
  ariaLabel,
  className,
}: SelectFieldProps) {
  const [open, setOpen] = React.useState(false)
  const [mounted, setMounted] = React.useState(false)
  const [coords, setCoords] = React.useState({ top: 0, left: 0, width: 0 })

  const buttonRef = React.useRef<HTMLButtonElement>(null)
  const panelRef = React.useRef<HTMLUListElement>(null)

  const selected = options.find((o) => o.value === value)

  React.useEffect(() => setMounted(true), [])

  // Calcula a posição (fixed) do painel a partir do botão
  const updateCoords = React.useCallback(() => {
    const el = buttonRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    setCoords({ top: rect.bottom + 8, left: rect.left, width: rect.width })
  }, [])

  const toggle = () => {
    if (disabled) return
    if (!open) updateCoords()
    setOpen((v) => !v)
  }

  // Reposiciona enquanto aberto (o form rola por dentro do card)
  React.useEffect(() => {
    if (!open) return
    updateCoords()
    const handler = () => updateCoords()
    window.addEventListener("scroll", handler, true) // capture: pega o scroll do card interno
    window.addEventListener("resize", handler)
    return () => {
      window.removeEventListener("scroll", handler, true)
      window.removeEventListener("resize", handler)
    }
  }, [open, updateCoords])

  // Fecha ao clicar fora (botão e painel contam como "dentro")
  React.useEffect(() => {
    if (!open) return
    const onPointerDown = (e: PointerEvent) => {
      const t = e.target as Node
      if (buttonRef.current?.contains(t)) return
      if (panelRef.current?.contains(t)) return
      setOpen(false)
    }
    document.addEventListener("pointerdown", onPointerDown)
    return () => document.removeEventListener("pointerdown", onPointerDown)
  }, [open])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape" && open) {
      e.preventDefault()
      e.stopPropagation() // impede o menu GSAP de fechar junto
      setOpen(false)
    }
  }

  return (
    <div className={cn("relative", className)} onKeyDown={handleKeyDown}>
      <button
        ref={buttonRef}
        type="button"
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-invalid={invalid}
        aria-label={ariaLabel}
        onClick={toggle}
        className={cn(
          "w-full px-4 h-12 text-sm rounded-xl border bg-white text-left flex items-center justify-between gap-2 transition-all cursor-pointer",
          "focus:outline-none focus:ring-2 disabled:opacity-60 disabled:cursor-not-allowed",
          open
            ? "border-[#0E66FF] ring-2 ring-[#0E66FF]/15"
            : invalid
              ? "border-danger ring-0 hover:border-danger hover:shadow-[0_0_0_4px_rgba(229,72,77,0.10)] focus:ring-danger/15"
              : "border-gray-200 hover:border-[#0E66FF]/55 hover:shadow-[0_0_0_4px_rgba(14,102,255,0.06)] focus:ring-[#0E66FF]/15"
        )}
      >
        <span className={cn("truncate", selected ? "text-gray-900" : "text-gray-500")}>
          {selected ? selected.label : placeholder}
        </span>
        <ChevronDown
          className={cn(
            "h-4 w-4 shrink-0 text-gray-400 transition-transform duration-200",
            open && "rotate-180 text-[#0E66FF]"
          )}
          strokeWidth={2}
        />
      </button>

      {mounted &&
        createPortal(
          <AnimatePresence>
            {open && (
              <motion.ul
                ref={panelRef}
                role="listbox"
                onKeyDown={handleKeyDown}
                style={{
                  position: "fixed",
                  top: coords.top,
                  left: coords.left,
                  width: coords.width,
                }}
                initial={{ opacity: 0, y: -4, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -4, scale: 0.98 }}
                transition={{ duration: 0.15, ease: "easeOut" }}
                className="z-[9999] max-h-60 overflow-auto rounded-xl border border-gray-200 bg-white py-1 shadow-xl shadow-black/15 origin-top"
              >
                {options.map((option) => {
                  const isSelected = option.value === value
                  return (
                    <li key={option.value} role="option" aria-selected={isSelected}>
                      <button
                        type="button"
                        onClick={() => {
                          onChange(option.value)
                          setOpen(false)
                        }}
                        className={cn(
                          "w-full px-4 py-2.5 text-left text-sm flex items-center justify-between gap-2 transition-colors",
                          isSelected
                            ? "bg-[#E4EAFF] text-[#0E66FF] font-medium"
                            : "text-gray-700 hover:bg-[#E4EAFF]/60 hover:text-[#0E66FF]"
                        )}
                      >
                        <span className="truncate">{option.label}</span>
                        {isSelected && <Check className="h-4 w-4 shrink-0" strokeWidth={2.5} />}
                      </button>
                    </li>
                  )
                })}
              </motion.ul>
            )}
          </AnimatePresence>,
          document.body
        )}
    </div>
  )
}
