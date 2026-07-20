import type { StaticImageData } from "next/image";
import type { LucideIcon } from "lucide-react";

export interface ProductDifferential {
  title: string;
  description: string;
}

export interface ProductUseCase {
  title: string;
  description: string;
}

export interface ProductService {
  nome: string;
  icon: LucideIcon | string;
}

export interface Product {
  slug: string;
  nome: string;
  fabricante: string;
  fabricanteSlug: string;
  logo: StaticImageData | string;
  logoClass: string;
  categoria: string;
  categoriaSlug: string;
  solucaoSlug?: string;
  solucaoTitle?: string;
  subcategoria: string;
  descricaoCurta: string;
  descricaoCompleta: string;
  destaque: boolean;
  diferenciais: ProductDifferential[];
  casosDeUso: ProductUseCase[];
  servicos: ProductService[];
  imageUrl?: string;
  linkOficial?: string;
  servicosEyebrow?: string;
  servicosTitulo?: string;
  servicosDescricao?: string;
}

export const PRODUCTS: Product[] = [];
