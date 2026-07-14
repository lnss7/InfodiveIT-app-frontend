'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { produtosIbm } from './data'
import { useNavbarData } from './use-navbar-data'

type ProdutosDropdownProps = {
  onItemClick?: () => void
}

export function ProdutosDropdown({ onItemClick }: ProdutosDropdownProps) {
  const { fabricantes, produtosDestaque } = useNavbarData()

  const displayProducts = produtosDestaque.length > 0
    ? produtosDestaque.slice(0, 6).map((p) => ({
        nome: p.nome,
        descricao: p.descricaoCurta || p.categoriaTitle || p.fabricanteNome || '',
        href: `/produtos/${p.slug}`,
      }))
    : produtosIbm.slice(0, 6)

  return (
    <motion.div
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        'absolute inset-x-0 mx-auto top-[calc(100%+12px)]',
        'w-[min(1100px,100%)]',
        'rounded-2xl border border-ink-200 bg-white',
        'shadow-[0_10px_40px_-12px_rgba(20,20,19,0.18),0_2px_8px_-2px_rgba(20,20,19,0.06)]',
        'overflow-hidden',
      )}
      role="menu"
    >
      <div className="grid grid-cols-12 gap-8 p-8">
        {/* LEFT COLUMN — "FABRICANTES" (25% -> col-span-3) */}
        <div className="col-span-12 lg:col-span-3">
          <ColumnTitle>Fabricantes</ColumnTitle>
          <ul className="flex flex-col gap-1">
            {fabricantes.slice(0, 6).map((fab) => {
              const isActive = fab.nome === 'IBM'
              return (
                <li key={fab.nome}>
                  <Link
                    href={fab.href}
                    onClick={onItemClick}
                    role="menuitem"
                    className={cn(
                      'block rounded-lg px-3 py-2 transition-colors',
                      isActive
                        ? 'bg-[#F8F9FA]'
                        : 'hover:bg-ink-50',
                    )}
                  >
                    <span className="block text-sm font-semibold text-[#141413]">
                      {fab.nome}
                    </span>
                    <span className="block mt-0.5 text-xs text-[#7B7B7B] leading-normal">
                      {fab.descricao}
                    </span>
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>

        {/* CENTER COLUMN — "PRODUTOS EM DESTAQUE" (40% -> col-span-5) */}
        <div className="col-span-12 lg:col-span-5">
          <ColumnTitle>Produtos em Destaque</ColumnTitle>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {displayProducts.map((prod) => {
              return (
                <li key={prod.nome}>
                  <Link
                    href={prod.href}
                    onClick={onItemClick}
                    role="menuitem"
                    className={cn(
                      'block rounded-md p-2.5 transition-colors border border-transparent',
                      'hover:bg-[#F8F9FA] hover:border-ink-100',
                    )}
                  >
                    <span className="block text-sm font-semibold text-[#141413]">
                      {prod.nome}
                    </span>
                    <span className="block mt-0.5 text-xs text-[#7B7B7B] leading-normal line-clamp-2">
                      {prod.descricao}
                    </span>
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>

        {/* RIGHT COLUMN — "EM DESTAQUE" (35% -> col-span-4) */}
        <div className="col-span-12 lg:col-span-4">
          <ColumnTitle>Em destaque</ColumnTitle>
          <ul className="list-none">
            <li>
              <Link
                href="/produtos/ibm-storage-defender"
                onClick={onItemClick}
                role="menuitem"
                className="group rounded-lg bg-[#141413] border border-ink-950 overflow-hidden transition-all duration-200 hover:border-ink-800 p-5 flex flex-col justify-between h-[280px] block"
              >
                <div>
                  <span className="inline-flex items-center rounded bg-white/95 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-ink-950">
                    Destaque
                  </span>
                  <p className="mt-3 text-base font-semibold text-white leading-snug">
                    IBM Storage Defender
                  </p>
                  <p className="mt-2 text-[13px] text-[#BFBFBF] leading-[1.5]">
                    Proteja dados críticos contra ransomware com detecção automática de ameaças.
                  </p>
                </div>
                <span className="mt-4 inline-flex items-center gap-1 text-[13px] font-medium text-[#0E66FF] transition-colors group-hover:text-blue-400">
                  Ver produto →
                </span>
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="flex items-center justify-between border-t border-ink-200 bg-ink-50 px-8 py-4">
        <p className="text-xs text-ink-500">
          Explore o catálogo completo de produtos e fabricantes.
        </p>
        <Link
          href="/produtos"
          onClick={onItemClick}
          className="inline-flex items-center gap-1.5 text-xs font-medium text-ink-950 hover:text-brand transition-colors"
        >
          Ver catálogo completo
          <ArrowRight className="h-3.5 w-3.5" strokeWidth={2} />
        </Link>
      </div>
    </motion.div>
  )
}

function ColumnTitle({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.12em] text-ink-500">
      {children}
    </p>
  )
}
