import { type Solution } from "@/lib/solutions-data"
import { type SolucaoDTO, normalizeImageUrl } from "@/lib/api"

export function categoriaToSolution(cat: SolucaoDTO): Solution {
  return {
    slug: cat.slug,
    title: cat.nome || '',
    subtitle: cat.subtituloCurto || '',
    description: cat.descricaoCurta || '',
    overview: cat.descricaoCompleta || '',
    imageUrl: normalizeImageUrl(cat.imagemUrl),
    fabricantesTitulo: cat.fabricantesTitulo || '',
    fabricantesDescricao: cat.fabricantesDescricao || '',
    iconName: (cat.icone as any) || 'infraestrutura',
    metrics: [],
    features: cat.features
      ? cat.features.map(f => ({ title: f.titulo, description: f.descricao, tag: f.tag || '' }))
      : [],
    vendors: cat.fabricantes
      ? cat.fabricantes.map(f => f.nome)
      : [],
    vendorObjects: cat.fabricantes
      ? cat.fabricantes.map(f => ({ nome: f.nome, logoUrl: f.logoUrl }))
      : [],
    caseStudy: { client: '', segmento: '', metric: '', resultado: '' },
    categoriaId: cat.categoriaId,
    categoriaNome: cat.categoriaNome,
    recursosChave: (cat.recursosChave && cat.recursosChave.length > 0)
      ? cat.recursosChave
      : ([cat.recursoChave1, cat.recursoChave2, cat.recursoChave3].filter(Boolean) as string[]),
  }
}
