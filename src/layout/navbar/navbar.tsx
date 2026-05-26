'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { AnimatePresence } from 'framer-motion'
import { ArrowRight, ChevronDown, Menu } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Logo } from './logo'
import { MobileMenu } from './mobile-menu'
import { SolucoesDropdown } from './dropdown-solucoes'
import { ProdutosDropdown } from './dropdown-produtos'
import { navLinks } from './data'

const SCROLL_THRESHOLD = 8

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [dropdown, setDropdown] = useState<string | null>(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const closeTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > SCROLL_THRESHOLD)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const openDropdown = useCallback((key: string) => {
    if (closeTimeout.current) {
      clearTimeout(closeTimeout.current)
      closeTimeout.current = null
    }
    setDropdown(key)
  }, [])

  const scheduleClose = useCallback(() => {
    if (closeTimeout.current) clearTimeout(closeTimeout.current)
    closeTimeout.current = setTimeout(() => setDropdown(null), 120)
  }, [])

  const closeDropdown = useCallback(() => {
    if (closeTimeout.current) clearTimeout(closeTimeout.current)
    setDropdown(null)
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeDropdown()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [closeDropdown])

  return (
    <>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-50',
          'pointer-events-none',
        )}
      >
        <div className="container-default pt-3 md:pt-4">
          <div
            className={cn(
              'pointer-events-auto relative',
              'rounded-2xl border border-ink-200',
              'backdrop-blur-xl backdrop-saturate-150',
              'transition-[background-color,box-shadow] duration-200',
              scrolled
                ? 'bg-white/85 shadow-[0_10px_30px_-12px_rgba(20,20,19,0.12),0_2px_6px_-2px_rgba(20,20,19,0.04)]'
                : 'bg-white/70 shadow-[0_1px_0_0_rgba(20,20,19,0.04)]',
            )}
          >
            <div className="flex h-14 items-center justify-between px-4 md:h-16 md:px-5">
              <Logo />

              <nav
                aria-label="Navegação principal"
                className="hidden lg:flex items-center gap-1"
              >
                {navLinks.map((link) => {
                  const isDropdown = !!link.dropdown
                  const isOpen = dropdown === link.dropdown && isDropdown

                  if (isDropdown) {
                    const dropdownKey = link.dropdown!
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
                            'inline-flex items-center gap-1 rounded-md px-3 py-1.5',
                            'text-sm font-medium transition-colors',
                            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/30',
                            isOpen
                              ? 'bg-ink-50 text-ink-950'
                              : 'text-ink-900 hover:bg-ink-50 hover:text-ink-950',
                          )}
                        >
                          {link.label}
                          <ChevronDown
                            className={cn(
                              'h-3.5 w-3.5 text-ink-500 transition-transform duration-200',
                              isOpen && 'rotate-180',
                            )}
                            strokeWidth={2}
                          />
                        </button>
                      </div>
                    )
                  }

                  return (
                    <Link
                      key={link.label}
                      href={link.href}
                      className={cn(
                        'inline-flex items-center rounded-md px-3 py-1.5',
                        'text-sm font-medium text-ink-900',
                        'transition-colors hover:bg-ink-50 hover:text-ink-950',
                        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/30',
                      )}
                    >
                      {link.label}
                    </Link>
                  )
                })}
              </nav>

              <div className="flex items-center gap-2">
                <Link
                  href="/contato"
                  className={cn(
                    'hidden md:inline-flex items-center gap-1.5 rounded-md',
                    'bg-ink-950 px-4 py-2 text-sm font-medium text-white',
                    'transition-colors hover:bg-ink-900',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/30',
                  )}
                >
                  Fale com um especialista
                  <ArrowRight className="h-3.5 w-3.5" strokeWidth={2} />
                </Link>

                <button
                  type="button"
                  onClick={() => setMobileOpen(true)}
                  aria-label="Abrir menu"
                  aria-expanded={mobileOpen}
                  className={cn(
                    'lg:hidden inline-flex h-9 w-9 items-center justify-center',
                    'rounded-md text-ink-900 hover:bg-ink-50 transition-colors',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/30',
                  )}
                >
                  <Menu className="h-5 w-5" strokeWidth={2} />
                </button>
              </div>
            </div>

            <AnimatePresence>
              {dropdown === 'solucoes' && (
                <div
                  onMouseEnter={() => openDropdown('solucoes')}
                  onMouseLeave={scheduleClose}
                >
                  <SolucoesDropdown onItemClick={closeDropdown} />
                </div>
              )}
              {dropdown === 'produtos' && (
                <div
                  onMouseEnter={() => openDropdown('produtos')}
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
  )
}
