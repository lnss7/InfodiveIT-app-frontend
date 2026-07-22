'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  type NavConteudo,
} from './data'
import { useNavbarData, type NavCategoriaItem } from './use-navbar-data'

type SolucoesDropdownProps = {
  onItemClick?: () => void
}

export function SolucoesDropdown({ onItemClick }: SolucoesDropdownProps) {
  const { categorias, ultimosConteudos, isLoading } = useNavbarData()

  const artigos: NavConteudo[] = ultimosConteudos.map((item) => ({
    titulo: item.titulo,
    descricao: item.descricao ?? '',
    href: `/blog/${item.slug}`,
    tag: item.tipo === 'CASE' ? 'Case de Sucesso' : 'Artigo',
  }))

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
        <ColumnCategorias categorias={categorias} isLoading={isLoading} onItemClick={onItemClick} />
        <ColumnDestaque artigos={artigos.slice(0, 2)} isLoading={isLoading} onItemClick={onItemClick} />
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

function ColumnCategorias({
  categorias,
  isLoading,
  onItemClick,
}: {
  categorias: NavCategoriaItem[]
  isLoading: boolean
  onItemClick?: () => void
}) {
  return (
    <div className="col-span-12 md:col-span-6">
      <ColumnTitle>Categorias</ColumnTitle>
      {isLoading && categorias.length === 0 ? (
        <div className="grid grid-cols-2 gap-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="flex items-center gap-3 p-2 animate-pulse">
              <div className="h-8 w-8 rounded-md bg-ink-100" />
              <div className="flex-1 space-y-1.5">
                <div className="h-3.5 w-24 rounded bg-ink-200" />
                <div className="h-2.5 w-32 rounded bg-ink-100" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <ul className="grid grid-cols-2 gap-x-2 gap-y-1">
          {categorias.map((cat) => {
            const Icon = cat.icon
            return (
              <li key={cat.href}>
                <Link
                  href={cat.href}
                  onClick={onItemClick}
                  role="menuitem"
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
      )}
    </div>
  )
}

function ColumnDestaque({
  artigos,
  isLoading,
  onItemClick,
}: {
  artigos: NavConteudo[]
  isLoading: boolean
  onItemClick?: () => void
}) {
  return (
    <div className="col-span-12 md:col-span-6">
      <ColumnTitle>Artigos & Insights Recentes</ColumnTitle>
      {isLoading && artigos.length === 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="h-[220px] rounded-lg border border-ink-200 bg-ink-50 animate-pulse" />
          <div className="h-[220px] rounded-lg border border-ink-200 bg-ink-50 animate-pulse" />
        </div>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {artigos.map((item, index) => (
            <li key={item.href + index} className="h-full">
              <Link
                href={item.href}
                onClick={onItemClick}
                role="menuitem"
                className="group flex flex-col justify-between rounded-xl border border-ink-200/80 bg-white overflow-hidden transition-all duration-200 hover:border-brand/40 hover:shadow-[0_4px_16px_rgba(14,102,255,0.08)] h-full"
              >
                <div className="aspect-[16/9] w-full bg-gradient-to-br from-ink-950 via-ink-900 to-brand-deep relative overflow-hidden">
                  <div className="absolute inset-0 opacity-25 bg-[radial-gradient(circle_at_30%_20%,white,transparent_50%)]" />
                  {item.tag && (
                    <span className="absolute left-3 top-3 inline-flex items-center rounded bg-white/95 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-ink-950 shadow-sm">
                      {item.tag}
                    </span>
                  )}
                </div>
                <div className="p-3.5 flex flex-col flex-1 justify-between">
                  <div>
                    <p className="text-sm font-semibold text-ink-950 leading-snug group-hover:text-brand transition-colors line-clamp-2">
                      {item.titulo}
                    </p>
                    <p className="mt-1.5 text-xs text-ink-500 leading-snug line-clamp-2">
                      {item.descricao}
                    </p>
                  </div>
                  <span className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-brand group-hover:text-blue-700 transition-colors">
                    Ler mais
                    <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" strokeWidth={2} />
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
