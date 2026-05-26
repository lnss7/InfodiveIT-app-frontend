'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, ChevronDown, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Logo } from './logo'
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

export function MobileMenu({ open, onClose }: MobileMenuProps) {
  const [solucoesOpen, setSolucoesOpen] = useState(false)
  const [produtosOpen, setProdutosOpen] = useState(false)

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

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="mobile-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 z-[60] bg-ink-950/40 backdrop-blur-[2px] lg:hidden"
            aria-hidden
          />
          <motion.aside
            key="mobile-panel"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className={cn(
              'fixed right-0 top-0 z-[70] h-[100dvh] w-full max-w-sm lg:hidden',
              'bg-white shadow-2xl border-l border-ink-200',
              'flex flex-col',
            )}
            role="dialog"
            aria-modal="true"
            aria-label="Menu de navegação"
          >
            <header className="flex items-center justify-between border-b border-ink-200 px-5 py-4">
              <Logo />
              <button
                type="button"
                onClick={onClose}
                aria-label="Fechar menu"
                className={cn(
                  'inline-flex h-9 w-9 items-center justify-center rounded-md',
                  'text-ink-900 hover:bg-ink-50 transition-colors',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/30',
                )}
              >
                <X className="h-5 w-5" strokeWidth={2} />
              </button>
            </header>

            <nav className="flex-1 overflow-y-auto px-3 py-4">
              <ul className="space-y-1">
                {navLinks.map((link) => {
                  if (link.dropdown === 'solucoes') {
                    return (
                      <li key={link.label}>
                        <button
                          type="button"
                          onClick={() => setSolucoesOpen((v) => !v)}
                          aria-expanded={solucoesOpen}
                          className={cn(
                            'flex w-full items-center justify-between rounded-md px-3 py-2.5',
                            'text-base font-medium text-ink-950 hover:bg-ink-50 transition-colors',
                          )}
                        >
                          {link.label}
                          <ChevronDown
                            className={cn(
                              'h-4 w-4 text-ink-500 transition-transform',
                              solucoesOpen && 'rotate-180',
                            )}
                            strokeWidth={2}
                          />
                        </button>
                        <AnimatePresence initial={false}>
                          {solucoesOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                              className="overflow-hidden"
                            >
                              <div className="py-2 pl-3 space-y-4">
                                <div>
                                  <p className="mb-2 px-3 text-[10px] font-medium uppercase tracking-[0.12em] text-ink-500">
                                    Categorias
                                  </p>
                                  <ul>
                                    {categorias.map((cat) => {
                                      const Icon = cat.icon
                                      return (
                                        <li key={cat.href}>
                                          <Link
                                            href={cat.href}
                                            onClick={onClose}
                                            className="flex items-center gap-3 rounded-md px-3 py-2 text-sm text-ink-900 hover:bg-ink-50 transition-colors"
                                          >
                                            <Icon className="h-4 w-4 text-ink-500" strokeWidth={1.75} />
                                            {cat.nome}
                                          </Link>
                                        </li>
                                      )
                                    })}
                                  </ul>
                                </div>
                                <div>
                                  <p className="mb-2 px-3 text-[10px] font-medium uppercase tracking-[0.12em] text-ink-500">
                                    Fabricantes
                                  </p>
                                  <ul className="grid grid-cols-2 gap-x-1">
                                    {fabricantesDestaque.slice(0, 8).map((f) => (
                                      <li key={f.href}>
                                        <Link
                                          href={f.href}
                                          onClick={onClose}
                                          className="block rounded-md px-3 py-2 text-sm text-ink-900 hover:bg-ink-50 transition-colors"
                                        >
                                          {f.nome}
                                        </Link>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </li>
                    )
                  }

                  if (link.dropdown === 'produtos') {
                    return (
                      <li key={link.label}>
                        <button
                          type="button"
                          onClick={() => setProdutosOpen((v) => !v)}
                          aria-expanded={produtosOpen}
                          className={cn(
                            'flex w-full items-center justify-between rounded-md px-3 py-2.5',
                            'text-base font-medium text-ink-950 hover:bg-ink-50 transition-colors',
                          )}
                        >
                          {link.label}
                          <ChevronDown
                            className={cn(
                              'h-4 w-4 text-ink-500 transition-transform',
                              produtosOpen && 'rotate-180',
                            )}
                            strokeWidth={2}
                          />
                        </button>
                        <AnimatePresence initial={false}>
                          {produtosOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                              className="overflow-hidden"
                            >
                              <div className="py-2 pl-3 space-y-4">
                                <div>
                                  <p className="mb-2 px-3 text-[10px] font-medium uppercase tracking-[0.12em] text-ink-500">
                                    Fabricantes
                                  </p>
                                  <ul className="grid grid-cols-2 gap-x-1">
                                    {fabricantesProdutos.map((fab) => (
                                      <li key={fab.href}>
                                        <Link
                                          href={fab.href}
                                          onClick={onClose}
                                          className="block rounded-md px-3 py-2 text-sm text-ink-900 hover:bg-ink-50 transition-colors"
                                        >
                                          <span className="block font-medium text-ink-950">{fab.nome}</span>
                                          <span className="block text-[10px] text-ink-500 leading-none mt-0.5">{fab.descricao}</span>
                                        </Link>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </li>
                    )
                  }

                  return (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        onClick={onClose}
                        className={cn(
                          'block rounded-md px-3 py-2.5',
                          'text-base font-medium text-ink-950 hover:bg-ink-50 transition-colors',
                        )}
                      >
                        {link.label}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </nav>

            <div className="border-t border-ink-200 p-5">
              <Link
                href="/contato"
                onClick={onClose}
                className={cn(
                  'inline-flex w-full items-center justify-center gap-2 rounded-md',
                  'bg-ink-950 px-5 py-3 text-sm font-medium text-white',
                  'hover:bg-ink-900 transition-colors',
                )}
              >
                Fale com um especialista
                <ArrowRight className="h-4 w-4" strokeWidth={2} />
              </Link>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
