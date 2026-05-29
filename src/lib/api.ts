/**
 * Cliente HTTP para a API REST do Backend (Spring Boot).
 *
 * Use `fetchAPI<T>(path)` para chamadas customizadas, ou os helpers em `api.*`
 * para as rotas do projeto. Por padrão, as consultas utilizam ISR com revalidação
 * de 60 segundos, permitindo respostas rápidas e cache integrado do Next.js.
 */

const API_URL = process.env.NEXT_PUBLIC_API_URL

if (!API_URL && typeof window === 'undefined') {
  console.warn(
    '[api] NEXT_PUBLIC_API_URL não está definido. Configure em .env.local.',
  )
}

/**
 * Estrutura de paginação padrão retornada pelo Spring Data Page.
 */
export type SpringPageResponse<T> = {
  content: T[]
  totalPages: number
  totalElements: number
  size: number
  number: number
  numberOfElements: number
  first: boolean
  last: boolean
  empty: boolean
}

// DTOs do Frontend correspondendo exatamente aos contratos do Backend Spring Boot

export type CategoriaDTO = {
  id: string
  nome: string
  slug: string
  icone?: string
  descricaoCurta?: string
  descricaoCompleta?: string
  ordem: number
  ativo: boolean
  createdAt: string
  updatedAt: string
}

export type FabricanteDTO = {
  id: string
  nome: string
  slug: string
  descricao?: string
  siteOficial?: string
  destaque: boolean
  ordem: number
  ativo: boolean
  categoriaIds: string[]
  createdAt: string
  updatedAt: string
}

export type ServicoDTO = {
  id: string
  nome: string
  slug: string
  descricao?: string
  icone?: string
  ordem: number
  ativo: boolean
  createdAt: string
  updatedAt: string
}

export type ProdutoResumoDTO = {
  id: string
  nome: string
  slug: string
  subcategoria?: string
  descricaoCurta?: string
  destaque: boolean
  categoriaSlug: string
  fabricanteSlug: string
}

export type ProdutoDTO = {
  id: string
  nome: string
  slug: string
  subcategoria?: string
  descricaoCurta?: string
  descricaoCompleta?: string
  casosDeUso?: string
  diferenciais?: string
  destaque: boolean
  ativo: boolean
  categoriaId: string
  categoriaSlug: string
  fabricanteId: string
  fabricanteSlug: string
  servicoIds: string[]
  createdAt: string
  updatedAt: string
}

export type ConteudoDTO = {
  id: string
  titulo: string
  slug: string
  tipo: 'ARTIGO' | 'VIDEO' | 'POST_SOCIAL'
  origem: 'INTERNO' | 'INSTAGRAM' | 'LINKEDIN'
  descricao?: string
  conteudo?: string
  urlExterna?: string
  socialPostId?: string
  publicadoEm?: string
  ativo: boolean
  categoriaId?: string
  fabricanteId?: string
  produtoId?: string
  createdAt: string
  updatedAt: string
}

export type BannerDTO = {
  id: string
  titulo?: string
  subtitulo?: string
  secao: 'HERO_HOME' | 'SOLUCOES' | 'PRODUTOS' | 'SERVICOS' | 'QUEM SOMOS'
  ctaTexto?: string
  ctaUrl?: string
  ativo: boolean
  createdAt: string
  updatedAt: string
}

type FetchOptions = Omit<RequestInit, 'next'> & {
  /** Tempo de revalidação em segundos. Default 60s. Passe 0 para sempre fresco. */
  revalidate?: number
  /** Tags para revalidação on-demand via revalidateTag(). */
  tags?: string[]
}

export async function fetchAPI<T>(
  path: string,
  { revalidate = 60, tags, ...init }: FetchOptions = {},
): Promise<T> {
  if (!API_URL) {
    throw new Error('NEXT_PUBLIC_API_URL is not configured.')
  }

  // Garante que o caminho comece com '/' e junta com a URL base da API
  const cleanPath = path.startsWith('/') ? path : `/${path}`
  const url = `${API_URL}${cleanPath}`

  const res = await fetch(url, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...init.headers,
    },
    next: { revalidate, tags },
  })

  if (!res.ok) {
    const body = await res.text().catch(() => '')
    throw new Error(`API ${res.status} ${res.statusText} on ${path}: ${body}`)
  }

  return res.json() as Promise<T>
}

function buildQuery(params?: Record<string, string | number | boolean | undefined>): string {
  if (!params) return ''
  const entries = Object.entries(params).filter(
    ([, v]) => v !== undefined && v !== null && v !== '',
  ) as [string, string | number | boolean][]
  if (entries.length === 0) return ''
  return '?' + new URLSearchParams(entries.map(([k, v]) => [k, String(v)])).toString()
}

export const api = {
  /**
   * Lista todas as categorias ativas (não paginada)
   */
  categorias: () => fetchAPI<CategoriaDTO[]>('/categorias'),

  /**
   * Busca os detalhes de uma categoria específica via slug
   */
  categoria: (slug: string) => fetchAPI<CategoriaDTO>(`/categorias/${encodeURIComponent(slug)}`),

  /**
   * Lista produtos com filtros opcionais de categoria, fabricante e paginação
   */
  produtos: (params?: { categoria?: string; fabricante?: string; page?: number; size?: number }) =>
    fetchAPI<SpringPageResponse<ProdutoResumoDTO>>(`/produtos${buildQuery(params)}`),

  /**
   * Busca detalhes de um único produto pelo slug
   */
  produto: (slug: string) => fetchAPI<ProdutoDTO>(`/produtos/${encodeURIComponent(slug)}`),

  /**
   * Lista fabricantes ativos (permite filtrar por destaque para a home)
   */
  fabricantes: (params?: { destaque?: boolean }) =>
    fetchAPI<FabricanteDTO[]>(`/fabricantes${buildQuery(params)}`),

  /**
   * Busca detalhes de um fabricante pelo slug
   */
  fabricante: (slug: string) => fetchAPI<FabricanteDTO>(`/fabricantes/${encodeURIComponent(slug)}`),

  /**
   * Lista todos os serviços profissionais ativos (não paginada)
   */
  servicos: () => fetchAPI<ServicoDTO[]>('/servicos'),

  /**
   * Busca detalhes de um serviço pelo slug
   */
  servico: (slug: string) => fetchAPI<ServicoDTO>(`/servicos/${encodeURIComponent(slug)}`),

  /**
   * Lista conteúdos de blog/redes sociais com filtros opcionais por tipo e paginação
   */
  conteudos: (params?: { tipo?: 'ARTIGO' | 'VIDEO' | 'POST_SOCIAL'; page?: number; size?: number }) =>
    fetchAPI<SpringPageResponse<ConteudoDTO>>(`/conteudos${buildQuery(params)}`),

  /**
   * Busca detalhes de um conteúdo específico pelo slug
   */
  conteudo: (slug: string) => fetchAPI<ConteudoDTO>(`/conteudos/${encodeURIComponent(slug)}`),

  /**
   * Lista os banners configurados para uma seção específica (ex: HERO_HOME)
   */
  banners: (params?: { secao?: 'HERO_HOME' | 'SOLUCOES' | 'PRODUTOS' | 'SERVICOS' | 'SOBRE' }) =>
    fetchAPI<BannerDTO[]>(`/banners${buildQuery(params)}`),

  /**
   * Envia as informações de captura de lead comercial (LGPD obrigatória)
   */
  enviarLead: (data: {
    nomeCompleto: string
    email: string
    telefone?: string
    empresa: string
    cargo?: string
    mensagem?: string
    consentimentoLgpd: boolean
    produtoInteresseId?: string
  }) =>
    fetchAPI<{ id: string; message: string }>('/leads', {
      method: 'POST',
      body: JSON.stringify(data),
      revalidate: 0,
    }),
}
