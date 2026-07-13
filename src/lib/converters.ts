import { type Solution } from "@/lib/solutions-data"
import { type SolucaoDTO } from "@/lib/api"

export function categoriaToSolution(cat: SolucaoDTO, fallback?: Solution): Solution {
  return {
    slug: cat.slug,
    title: cat.nome,
    subtitle: cat.subtituloCurto || fallback?.subtitle || '',
    description: cat.descricaoCurta || fallback?.description || '',
    overview: cat.descricaoCompleta || fallback?.overview || '',
    iconName: (cat.icone as any) || fallback?.iconName || 'infraestrutura',
    metrics: fallback?.metrics || [],  // não existe na API, usa fallback
    features: cat.features
      ? cat.features.map(f => ({ title: f.titulo, description: f.descricao, tag: f.tag }))
      : (fallback?.features || []),
    vendors: cat.fabricantes
      ? cat.fabricantes.map(f => f.nome)
      : (fallback?.vendors || []),
    caseStudy: fallback?.caseStudy || { client: '', segmento: '', metric: '', resultado: '' },
    categoriaId: cat.categoriaId,
    categoriaNome: cat.categoriaNome,
  }
}
