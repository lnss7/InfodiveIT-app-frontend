'use client'

import { useEffect, useState } from 'react'
import {
  Activity,
  Brain,
  Cloud,
  HardDrive,
  Laptop,
  Layers,
  Lock,
  Server,
  ShieldCheck,
  type LucideIcon,
} from 'lucide-react'
import { api, type ConteudoDTO, type ProdutoResumoDTO } from '@/lib/api'
import {
  categorias as fallbackCategorias,
  fabricantesProdutos as fallbackFabricantes,
} from './data'

/**
 * Mapa local de ícones por slug de categoria — configuração de UI, não dado do banco.
 * O backend não armazena os ícones Lucide usados na navbar.
 */
const CATEGORY_UI_CONFIG: Record<string, { icon: LucideIcon; description: string }> = {
  infraestrutura: { icon: Server, description: 'Servidores, redes e datacenter' },
  armazenamento: { icon: HardDrive, description: 'Storage corporativo escalável' },
  'protecao-de-dados': { icon: ShieldCheck, description: 'Backup, replicação e recuperação' },
  'backup-e-recuperacao': { icon: ShieldCheck, description: 'Backup, replicação e recuperação' },
  seguranca: { icon: Lock, description: 'Firewall, EDR e zero trust' },
  observability: { icon: Activity, description: 'Monitoração e telemetria' },
  virtualizacao: { icon: Layers, description: 'Hipervisores e workloads' },
  cloud: { icon: Cloud, description: 'Public, private e hybrid cloud' },
  'inteligencia-artificial': { icon: Brain, description: 'Plataformas e infraestrutura para IA' },
  ia: { icon: Brain, description: 'Plataformas e infraestrutura para IA' },
  endpoints: { icon: Laptop, description: 'Estações, mobilidade e gestão' },
  servicos: { icon: Activity, description: 'Suporte e monitoração' },
}

function getUiConfigForSlug(slug: string) {
  return CATEGORY_UI_CONFIG[slug] ?? { icon: Server, description: '' }
}

/**
 * Busca os dados dinâmicos da navbar (categorias, fabricantes, último conteúdo e produtos em destaque)
 * a partir da API, mantendo os dados estáticos de `data.ts` como fallback.
 */
export function useNavbarData() {
  const [categorias, setCategorias] = useState(fallbackCategorias)
  const [fabricantes, setFabricantes] = useState(fallbackFabricantes)
  const [ultimoConteudo, setUltimoConteudo] = useState<ConteudoDTO | null>(null)
  const [produtosDestaque, setProdutosDestaque] = useState<ProdutoResumoDTO[]>([])

  useEffect(() => {
    api
      .categorias()
      .then((data) => {
        if (data.length > 0) {
          setCategorias(
            [...data]
              .filter((c) => c.ativo)
              .sort((a, b) => a.ordem - b.ordem)
              .map((c) => {
                const ui = getUiConfigForSlug(c.slug)
                return {
                  nome: c.nome,
                  descricao: ui.description,
                  href: `/solucoes?${c.slug}`,
                  icon: ui.icon,
                }
              }),
          )
        }
      })
      .catch(() => {
        /* mantém fallback */
      })

    api
      .fabricantes()
      .then((data) => {
        if (data.length > 0) {
          setFabricantes(
            [...data]
              .sort((a, b) => a.ordem - b.ordem)
              .map((f) => ({
                nome: f.nome,
                descricao: f.descricaoCurta ?? f.descricao ?? '',
                href: `/produtos?fabricante=${encodeURIComponent(f.slug)}`,
              })),
          )
        }
      })
      .catch(() => {
        /* mantém fallback */
      })

    api
      .produtos({ destaque: true, size: 6 })
      .then((page) => {
        if (page.content.length > 0) {
          setProdutosDestaque(page.content)
        }
      })
      .catch(() => {})

    api
      .conteudos({ tipo: 'ARTIGO', size: 1 })
      .then((page) => {
        if (page.content[0]) setUltimoConteudo(page.content[0])
      })
      .catch(() => {
        /* sem destaque dinâmico */
      })
  }, [])

  return { categorias, fabricantes, ultimoConteudo, produtosDestaque }
}
