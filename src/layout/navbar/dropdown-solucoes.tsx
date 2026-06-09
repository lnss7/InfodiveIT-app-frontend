'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  categorias,
  ultimoConteudoDestaque,
} from './data'

type SolucoesDropdownProps = {
  onItemClick?: () => void
}

export function SolucoesDropdown({ onItemClick }: SolucoesDropdownProps) {
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
        <ColumnCategorias onItemClick={onItemClick} />
        <ColumnDestaque onItemClick={onItemClick} />
      </div>

      <div className="flex items-center justify-between border-t border-ink-200 bg-ink-50 px-8 py-4">
        <p className="text-xs text-ink-500">
          Mais de 20 anos integrando tecnologia para empresas que não podem parar.
        </p>
        <Link
          href="/solucoes"
          onClick={onItemClick}
          className="inline-flex items-center gap-1.5 text-xs font-medium text-ink-950 hover:text-brand transition-colors"
        >
          Ver todas as soluções
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

function ColumnCategorias({ onItemClick }: { onItemClick?: () => void }) {
  return (
    <div className="col-span-12 md:col-span-6">
      <ColumnTitle>Categorias</ColumnTitle>
      <ul className="grid grid-cols-2 gap-x-2 gap-y-1">
        {categorias.map((cat) => {
          const Icon = cat.icon
          return (
            <li key={cat.href}>
              <Link
                href={cat.href}
                onClick={onItemClick}
                className={cn(
                  'group flex items-start gap-3 rounded-md p-2.5 -mx-2.5',
                  'transition-colors hover:bg-ink-50',
                )}
              >
                <span
                  className={cn(
                    'mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center',
                    'rounded-md border border-ink-200 bg-white text-ink-900',
                    'transition-colors group-hover:border-ink-500 group-hover:text-ink-950',
                  )}
                >
                  <Icon className="h-4 w-4" strokeWidth={1.75} />
                </span>
                <span className="min-w-0">
                  <span className="block text-sm font-medium text-ink-950 leading-tight">
                    {cat.nome}
                  </span>
                  <span className="mt-0.5 block text-xs text-ink-500 leading-snug">
                    {cat.descricao}
                  </span>
                </span>
              </Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

function ColumnDestaque({ onItemClick }: { onItemClick?: () => void }) {
  return (
    <div className="col-span-12 md:col-span-6">
      <ColumnTitle>Em destaque</ColumnTitle>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

      {/* Card 1 */}
      <Link
        href={ultimoConteudoDestaque.href}
        onClick={onItemClick}
        className="group block rounded-lg border border-ink-200 overflow-hidden transition-colors hover:border-ink-500"
      >
        <div className="aspect-[4/3] w-full bg-gradient-to-br from-ink-950 via-ink-900 to-brand-deep relative">
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_30%_20%,white,transparent_50%)]" />
          {ultimoConteudoDestaque.tag && (
            <span className="absolute left-3 top-3 inline-flex items-center rounded bg-white/95 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-ink-950">
              {ultimoConteudoDestaque.tag}
            </span>
          )}
        </div>
        <div className="p-3.5">
          <p className="text-sm font-medium text-ink-950 leading-snug group-hover:text-brand transition-colors">
            {ultimoConteudoDestaque.titulo}
          </p>
          <p className="mt-1.5 text-xs text-ink-500 leading-snug line-clamp-3">
            {ultimoConteudoDestaque.descricao}
          </p>
          <span className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-ink-950 group-hover:text-brand transition-colors">
            Ler mais
            <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" strokeWidth={2} />
          </span>
        </div>
      </Link>

      {/* Card 2 */}
      <Link
        href={ultimoConteudoDestaque.href}
        onClick={onItemClick}
        className="group block rounded-lg border border-ink-200 overflow-hidden transition-colors hover:border-ink-500"
      >
        <div className="aspect-[4/3] w-full bg-gradient-to-br from-ink-950 via-ink-900 to-brand-deep relative">
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_30%_20%,white,transparent_50%)]" />
          {ultimoConteudoDestaque.tag && (
            <span className="absolute left-3 top-3 inline-flex items-center rounded bg-white/95 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-ink-950">
              {ultimoConteudoDestaque.tag}
            </span>
          )}
        </div>
        <div className="p-3.5">
          <p className="text-sm font-medium text-ink-950 leading-snug group-hover:text-brand transition-colors">
            {ultimoConteudoDestaque.titulo}
          </p>
          <p className="mt-1.5 text-xs text-ink-500 leading-snug line-clamp-3">
            {ultimoConteudoDestaque.descricao}
          </p>
          <span className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-ink-950 group-hover:text-brand transition-colors">
            Ler mais
            <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" strokeWidth={2} />
          </span>
        </div>
      </Link>
      </div>
    </div>
  )
}
