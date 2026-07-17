import { type Solution } from "@/lib/solutions-data"
import { type SolucaoDTO } from "@/lib/api"

export function categoriaToSolution(cat: SolucaoDTO, fallback?: Solution): Solution {
  return {
    slug: cat.slug,
    title: cat.nome || fallback?.title || '',
    subtitle: cat.subtituloCurto || fallback?.subtitle || '',
    description: cat.descricaoCurta || fallback?.description || '',
    overview: cat.descricaoCompleta || fallback?.overview || '',
    imageUrl: cat.imagemUrl || fallback?.imageUrl || '',
    fabricantesTitulo: cat.fabricantesTitulo || fallback?.fabricantesTitulo || '',
    fabricantesDescricao: cat.fabricantesDescricao || fallback?.fabricantesDescricao || '',
    iconName: (cat.icone as any) || fallback?.iconName || 'infraestrutura',
    metrics: fallback?.metrics || [],
    features: cat.features
      ? cat.features.map(f => ({ title: f.titulo, description: f.descricao, tag: f.tag }))
      : (fallback?.features || []),
    vendors: cat.fabricantes
      ? cat.fabricantes.map(f => f.nome)
      : (fallback?.vendors || []),
    vendorObjects: cat.fabricantes
      ? cat.fabricantes.map(f => ({ nome: f.nome, logoUrl: f.logoUrl }))
      : [],
    caseStudy: fallback?.caseStudy || { client: '', segmento: '', metric: '', resultado: '' },
    categoriaId: cat.categoriaId,
    categoriaNome: cat.categoriaNome,
    recursosChave: (cat.recursosChave && cat.recursosChave.length > 0)
      ? cat.recursosChave
      : ([cat.recursoChave1, cat.recursoChave2, cat.recursoChave3].filter(Boolean) as string[]),
  }
}
