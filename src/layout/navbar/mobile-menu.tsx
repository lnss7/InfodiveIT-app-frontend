'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { AnimatePresence, motion, type Variants } from 'framer-motion'
import { ArrowRight, ArrowUpRight, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useSmoothScroll } from '@/hooks/use-smooth-scroll'
import {
  categorias,
  fabricantesDestaque,
  fabricantesProdutos,
  navLinks,
} from './data'

type MobileMenuProps = {
  open: boolean
  onClose: () => void
}

const EASE = [0.22, 1, 0.36, 1] as const

// Container do menu: orquestra o stagger da lista de links.
const listVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
  exit: { transition: { staggerChildren: 0.03, staggerDirection: -1 } },
}

// Cada linha sobe e aparece.
const itemVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
  exit: { opacity: 0, y: 8, transition: { duration: 0.15 } },
}

const subPanel: Variants = {
  hidden: { height: 0, opacity: 0 },
  show: { height: 'auto', opacity: 1, transition: { duration: 0.32, ease: EASE } },
  exit: { height: 0, opacity: 0, transition: { duration: 0.24, ease: EASE } },
}

const SECTION_LABEL =
  'text-[11px] font-semibold uppercase tracking-[0.16em] text-ink-500'

const socials = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/company/infodiveit/' },
  { label: 'Instagram', href: 'https://www.instagram.com/infodiveit/' },
  { label: 'Facebook', href: 'https://www.facebook.com/InfodiveIt' },
]

export function MobileMenu({ open, onClose }: MobileMenuProps) {
  const { scrollTo } = useSmoothScroll()
  const [solucoesOpen, setSolucoesOpen] = useState(false)
  const [produtosOpen, setProdutosOpen] = useState(false)

  const handleContactClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (window.location.pathname === "/" && document.getElementById("contact")) {
      e.preventDefault();
      onClose();
      // Espera a animação de saída do menu (~200ms) antes de rolar até o contato.
      setTimeout(() => scrollTo("contact"), 200);
    } else {
      onClose();
    }
  };

  useEffect(() => {
    if (!open) return
    const original = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = original
      window.removeEventListener('keydown', onKey)
    }
  }, [open, onClose])

  // Recolhe os submenus sempre que o menu fecha (evita "saltos" na reabertura).
  useEffect(() => {
    if (!open) {
      setSolucoesOpen(false)
      setProdutosOpen(false)
    }
  }, [open])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="mobile-menu"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.28, ease: EASE }}
          className="fixed inset-0 z-[60] flex flex-col bg-white lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Menu de navegação"
        >
          <motion.nav
            variants={listVariants}
            initial="hidden"
            animate="show"
            exit="exit"
            className="flex-1 overflow-y-auto px-6 pb-8 pt-24"
          >
            <motion.p variants={itemVariants} className={cn(SECTION_LABEL, 'mb-1')}>
              Navegação
            </motion.p>

            <ul>
              {navLinks.map((link) => {
                if (link.dropdown === 'solucoes' || link.dropdown === 'produtos') {
                  const isSolucoes = link.dropdown === 'solucoes'
                  const expanded = isSolucoes ? solucoesOpen : produtosOpen
                  const toggle = () =>
                    isSolucoes
                      ? setSolucoesOpen((v) => !v)
                      : setProdutosOpen((v) => !v)

                  return (
                    <motion.li
                      key={link.label}
                      variants={itemVariants}
                      className="border-b border-ink-200/70"
                    >
                      <button
                        type="button"
                        onClick={toggle}
                        aria-expanded={expanded}
                        className="flex w-full items-center justify-between py-4 text-left"
                      >
                        <span className="text-[1.7rem] font-semibold leading-none tracking-tight text-ink-950">
                          {link.label}
                        </span>
                        <ChevronDown
                          className={cn(
                            'h-5 w-5 text-ink-500 transition-transform duration-300',
                            expanded && 'rotate-180',
                          )}
                          strokeWidth={2}
                        />
                      </button>

                      <AnimatePresence initial={false}>
                        {expanded && (
                          <motion.div
                            variants={subPanel}
                            initial="hidden"
                            animate="show"
                            exit="exit"
                            className="overflow-hidden"
                          >
                            {isSolucoes ? (
                              <div className="space-y-5 pb-5 pt-1">
                                <div>
                                  <p className={SECTION_LABEL}>Categorias</p>
                                  <ul className="mt-2 space-y-0.5">
                                    {categorias.map((cat) => {
                                      const Icon = cat.icon
                                      return (
                                        <li key={cat.href}>
                                          <Link
                                            href={cat.href}
                                            onClick={onClose}
                                            className="flex items-center gap-3 rounded-lg px-2 py-2 text-[15px] text-ink-900 transition-colors hover:bg-ink-50"
                                          >
                                            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-ink-200 bg-ink-50">
                                              <Icon className="h-4 w-4 text-ink-500" strokeWidth={1.75} />
                                            </span>
                                            {cat.nome}
                                          </Link>
                                        </li>
                                      )
                                    })}
                                  </ul>
                                </div>
                                <div>
                                  <p className={SECTION_LABEL}>Fabricantes</p>
                                  <ul className="mt-2 grid grid-cols-2 gap-0.5">
                                    {fabricantesDestaque.slice(0, 8).map((f) => (
                                      <li key={f.href}>
                                        <Link
                                          href={f.href}
                                          onClick={onClose}
                                          className="block rounded-lg px-2 py-2 text-[15px] text-ink-900 transition-colors hover:bg-ink-50"
                                        >
                                          {f.nome}
                                        </Link>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              </div>
                            ) : (
                              <div className="pb-5 pt-1">
                                <p className={SECTION_LABEL}>Fabricantes</p>
                                <ul className="mt-2 grid grid-cols-1 gap-0.5 sm:grid-cols-2">
                                  {fabricantesProdutos.map((fab) => (
                                    <li key={fab.href}>
                                      <Link
                                        href={fab.href}
                                        onClick={onClose}
                                        className="block rounded-lg px-2 py-2 transition-colors hover:bg-ink-50"
                                      >
                                        <span className="block text-[15px] font-medium text-ink-950">
                                          {fab.nome}
                                        </span>
                                        <span className="mt-0.5 block text-xs leading-snug text-ink-500">
                                          {fab.descricao}
                                        </span>
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.li>
                  )
                }

                return (
                  <motion.li
                    key={link.label}
                    variants={itemVariants}
                    className="border-b border-ink-200/70"
                  >
                    <Link
                      href={link.href}
                      onClick={onClose}
                      className="group flex items-center justify-between py-4"
                    >
                      <span className="text-[1.7rem] font-semibold leading-none tracking-tight text-ink-950">
                        {link.label}
                      </span>
                      <ArrowUpRight
                        className="h-5 w-5 text-ink-300 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink-950"
                        strokeWidth={2}
                      />
                    </Link>
                  </motion.li>
                )
              })}
            </ul>
          </motion.nav>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.5, delay: 0.32, ease: EASE }}
            className="border-t border-ink-200 px-6 pb-8 pt-5"
          >
            <Link
              href="/#contact"
              onClick={handleContactClick}
              className={cn(
                'inline-flex w-full items-center justify-center gap-2 rounded-xl',
                'bg-ink-950 px-5 py-4 text-[15px] font-semibold text-white',
                'transition-colors hover:bg-ink-900',
              )}
            >
              Fale com um especialista
              <ArrowRight className="h-4 w-4" strokeWidth={2} />
            </Link>

            <div className="mt-5 flex flex-col gap-3">
              <a
                href="mailto:contato@infodive.com.br"
                className="text-sm font-medium text-ink-900 transition-colors hover:text-brand"
              >
                contato@infodive.com.br
              </a>
              <div className="flex items-center gap-4 text-xs font-medium text-ink-500">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="transition-colors hover:text-ink-950"
                  >
                    {s.label}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
