export interface Metric {
  value: string;
  label: string;
}

export interface SolutionFeature {
  title: string;
  description: string;
  tag: string;
}

export interface Solution {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  overview: string;
  iconName:
    | "infraestrutura"
    | "armazenamento"
    | "protecao-de-dados"
    | "seguranca"
    | "observability"
    | "virtualizacao"
    | "cloud"
    | "inteligencia-artificial"
    | "endpoints";
  metrics: Metric[];
  features: SolutionFeature[];
  vendors: string[];
  vendorObjects?: Array<{ nome: string; logoUrl?: string }>;
  caseStudy: {
    client: string;
    segmento: string;
    metric: string;
    resultado: string;
  };
  categoriaId?: string;
  categoriaNome?: string;
  imageUrl?: string;
  fabricantesTitulo?: string;
  fabricantesDescricao?: string;
  recursosChave?: string[];
}

export const SOLUTIONS: Solution[] = [];
