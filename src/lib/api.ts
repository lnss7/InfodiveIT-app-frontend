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

// ─── DTOs de conteúdo dinâmico ────────────────────────────────────────────────

export type CategoriaDTO = {
  id: string
  nome: string
  slug: string
  ordem: number
  ativo: boolean
  createdAt: string
  updatedAt: string
}

export type SolucaoDTO = {
  id: string
  nome: string
  slug: string
  icone?: string
  subtituloCurto?: string
  descricaoCurta?: string
  descricaoCompleta?: string
  features?: { titulo: string; descricao: string; tag?: string }[]
  imagemUrl?: string
  fabricantesTitulo?: string
  fabricantesDescricao?: string
  fabricantes?: { id: string; nome: string; slug: string; logoUrl?: string }[]
  ordem: number
  ativo: boolean
  categoriaId?: string
  categoriaNome?: string
  createdAt: string
  updatedAt: string
}

export type FabricanteDTO = {
  id: string
  nome: string
  slug: string
  descricao?: string
  descricaoCurta?: string
  logoUrl?: string
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
  imagemUrl?: string
  destaque: boolean
  categoriaSlug: string
  categoriaTitle?: string
  solucaoSlug?: string
  solucaoTitle?: string
  fabricanteSlug: string
  fabricanteNome?: string
  fabricanteLogoUrl?: string
}

export type ProdutoDTO = {
  id: string
  nome: string
  slug: string
  subcategoria?: string
  descricaoCurta?: string
  descricaoCompleta?: string
  casosDeUso?: { titulo: string; descricao: string }[]
  diferenciais?: { titulo: string; descricao: string }[]
  servicosEyebrow?: string
  servicosTitulo?: string
  servicosDescricao?: string
  imagemUrl?: string
  destaque: boolean
  ativo: boolean
  categoriaId: string
  categoriaSlug: string
  categoriaNome?: string
  solucaoId?: string
  solucaoSlug?: string
  solucaoNome?: string
  fabricanteId: string
  fabricanteSlug: string
  fabricanteNome?: string
  fabricanteLogoUrl?: string
  servicos?: { id: string; nome: string; slug: string; icone?: string }[]
  createdAt: string
  updatedAt: string
}

export type ConteudoDTO = {
  id: string
  titulo: string
  slug: string
  tipo: 'ARTIGO' | 'WHITEPAPER' | 'CASE' | 'DATASHEET' | 'VIDEO' | 'POST_SOCIAL'
  origem: 'INTERNO' | 'INSTAGRAM' | 'LINKEDIN'
  descricao?: string
  imagemUrl?: string
  autor?: string
  tempoLeitura?: string
  conteudo?: string
  urlExterna?: string
  socialPostId?: string
  publicadoEm?: string
  ativo: boolean
  destaque: boolean
  categoriaId?: string
  fabricanteId?: string
  produtoId?: string
  createdAt: string
  updatedAt: string
}

export type CaseDTO = {
  id: string
  segmento: string
  cliente: string
  titulo: string
  desafio: string
  resultado: string
  metrica: string
  autor: string
  cargo: string
  depoimento: string
  imagemUrl?: string
  ordem: number
}

// ─── DTOs de configuração de página ──────────────────────────────────────────

export type PaginaHeroDTO = {
  pagina: string
  eyebrow?: string
  headline?: string
  headlineDestaque?: string
  subtitulo?: string
  tagline?: string
}

export type CtaDTO = {
  pagina: string
  titulo?: string
  subtitulo?: string
  ctaTexto?: string
}

export type ConfigFooterDTO = {
  descricaoEmpresa?: string
  badgeNoc?: string
  badgeCloud?: string
  nomeLegal?: string
  urlLinkedin?: string
  urlInstagram?: string
  urlFacebook?: string
}

export type ConfigBlogDTO = {
  artigosEyebrow?: string
  artigosHeadline?: string
  socialEyebrow?: string
  socialHeadline?: string
  socialDescricao?: string
  urlInstagram?: string
  urlLinkedin?: string
}

export type ContatoInfoDTO = {
  eyebrow?: string
  headline?: string
  subtitulo?: string
  email?: string
  telefone?: string
  endereco?: string
  horarioComercial?: string
  horarioNoc?: string
  cardTitulo?: string
  cardDescricao?: string
  cardBullets?: string[]
  cardCtaTexto?: string
  cardStatus?: string
}

export type FaqDTO = {
  id: string
  pergunta: string
  resposta: string
  ordem: number
}

export type SecaoHomeDTO = {
  secao: string
  eyebrow?: string
  headline?: string
  headlineDestaque?: string
  subtitulo?: string
  boxTitulo?: string
  boxDescricao?: string
}

// ─── DTOs de seções da Home ───────────────────────────────────────────────────

export type HeroCarouselDTO = {
  id: string
  imagemUrl: string
  ordem: number
}

export type HomeSolucoesBentoDTO = {
  id: string
  nome: string
  descricao?: string
  icone?: string
  imagemIaUrl?: string
  textoCarrossel?: string
  ordem: number
}

export type HomeSegurancaMarqueeDTO = {
  id: string
  icone?: string
  titulo: string
  corpo: string
  ordem: number
}

export type HomeProblemasDTO = {
  id: string
  titulo: string
  descricao: string
  solucaoIndicada?: string
  href?: string
  ordem: number
}

export type HomeTrustStatsDTO = {
  id: string
  eyebrow?: string
  prefixo?: string
  valor: number
  valorInicial: number
  sufixo?: string
  titulo: string
  descricao?: string
  ordem: number
}

// ─── DTOs de seções de Serviços ───────────────────────────────────────────────

export type EtapaItem = {
  titulo: string
  descricao: string
  icone?: string
  ordem: number
}

export type MetricaItem = {
  prefixo?: string
  valor: number
  sufixo?: string
  label: string
}

export type PilarItem = {
  icone?: string
  titulo: string
  descricao: string
}

export type ServicosEtapasDTO = {
  eyebrow?: string
  headline?: string
  subtitulo?: string
  etapas: EtapaItem[]
}

export type ServicosMetodologiaDTO = {
  eyebrow?: string
  headline?: string
  paragrafo?: string
  metricas: MetricaItem[]
  pilares: PilarItem[]
}

// ─── DTOs de seções Sobre ─────────────────────────────────────────────────────

export type StatItem = {
  prefixo?: string
  valor: number
  valorInicial: number
  sufixo?: string
  label: string
  coluna?: string
}

export type MarcoItem = {
  ano: string
  titulo: string
  descricao: string
  destaque: boolean
  ordem: number
}

export type ValorItem = {
  icone?: string
  titulo: string
  descricao: string
}

export type FotoItem = {
  imagemUrl: string
  alt?: string
  ordem: number
}

export type SobreNumerosDTO = {
  textoDescritivo?: string
  stats: StatItem[]
}

export type SobreTimelineDTO = {
  eyebrow?: string
  headline?: string
  marcos: MarcoItem[]
}

export type SobreValoresDTO = {
  eyebrow?: string
  headline?: string
  paragrafo?: string
  valores: ValorItem[]
}

export type SobreCulturaDTO = {
  eyebrow?: string
  headline?: string
  paragrafo?: string
  fotos: FotoItem[]
}

// ─── Infraestrutura HTTP ──────────────────────────────────────────────────────

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

// ─── Métodos da API ───────────────────────────────────────────────────────────

export const api = {
  // Conteúdo dinâmico
  categorias: () =>
    fetchAPI<CategoriaDTO[]>('/categorias'),

  categoria: (slug: string) =>
    fetchAPI<CategoriaDTO>(`/categorias/${encodeURIComponent(slug)}`),

  solucoes: () =>
    fetchAPI<SolucaoDTO[]>('/solucoes'),

  solucao: (slug: string) =>
    fetchAPI<SolucaoDTO>(`/solucoes/${encodeURIComponent(slug)}`),

  produtos: (params?: { categoria?: string; fabricante?: string; destaque?: boolean; page?: number; size?: number }) =>
    fetchAPI<SpringPageResponse<ProdutoResumoDTO>>(`/produtos${buildQuery(params)}`),

  produto: (slug: string) =>
    fetchAPI<ProdutoDTO>(`/produtos/${encodeURIComponent(slug)}`),

  fabricantes: (params?: { destaque?: boolean }) =>
    fetchAPI<FabricanteDTO[]>(`/fabricantes${buildQuery(params)}`),

  fabricante: (slug: string) =>
    fetchAPI<FabricanteDTO>(`/fabricantes/${encodeURIComponent(slug)}`),

  servicos: () =>
    fetchAPI<ServicoDTO[]>('/servicos'),

  servico: (slug: string) =>
    fetchAPI<ServicoDTO>(`/servicos/${encodeURIComponent(slug)}`),

  conteudos: (params?: { tipo?: ConteudoDTO['tipo']; origem?: ConteudoDTO['origem']; destaque?: boolean; page?: number; size?: number }) =>
    fetchAPI<SpringPageResponse<ConteudoDTO>>(`/conteudos${buildQuery(params)}`),

  conteudo: (slug: string) =>
    fetchAPI<ConteudoDTO>(`/conteudos/${encodeURIComponent(slug)}`),

  cases: () =>
    fetchAPI<CaseDTO[]>('/cases'),

  faq: () =>
    fetchAPI<FaqDTO[]>('/faq'),

  // Configuração de página
  paginaHero: (pagina: string) =>
    fetchAPI<PaginaHeroDTO>(`/paginas-hero/${encodeURIComponent(pagina)}`),

  cta: (pagina: string) =>
    fetchAPI<CtaDTO>(`/ctas/${encodeURIComponent(pagina)}`),

  configFooter: () =>
    fetchAPI<ConfigFooterDTO>('/config-footer'),

  configBlog: () =>
    fetchAPI<ConfigBlogDTO>('/config-blog'),

  contatoInfo: () =>
    fetchAPI<ContatoInfoDTO>('/contato-info'),

  secaoHome: (secao: string) =>
    fetchAPI<SecaoHomeDTO>(`/secoes-home/${encodeURIComponent(secao)}`),

  // Seções da Home
  heroCarousel: () =>
    fetchAPI<HeroCarouselDTO[]>('/hero-carousel'),

  homeSolucoesBento: () =>
    fetchAPI<HomeSolucoesBentoDTO[]>('/home-solucoes-bento'),

  homeSegurancaMarquee: () =>
    fetchAPI<HomeSegurancaMarqueeDTO[]>('/home-seguranca-marquee'),

  homeProblemas: () =>
    fetchAPI<HomeProblemasDTO[]>('/home-problemas'),

  homeTrustStats: () =>
    fetchAPI<HomeTrustStatsDTO[]>('/home-trust-stats'),

  // Seções de Serviços
  servicosEtapas: () =>
    fetchAPI<ServicosEtapasDTO>('/servicos-etapas'),

  servicosMetodologia: () =>
    fetchAPI<ServicosMetodologiaDTO>('/servicos-metodologia'),

  // Seções Sobre
  sobreNumeros: () =>
    fetchAPI<SobreNumerosDTO>('/sobre-numeros'),

  sobreTimeline: () =>
    fetchAPI<SobreTimelineDTO>('/sobre-timeline'),

  sobreValores: () =>
    fetchAPI<SobreValoresDTO>('/sobre-valores'),

  sobreCultura: () =>
    fetchAPI<SobreCulturaDTO>('/sobre-cultura'),

  // Leads (sem cache — sempre fresco)
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
