import { render, screen } from "@testing-library/react";
import { ProductCard } from "../product-card";
import type { Product } from "@/lib/products-data";

const mockProduct: Product = {
  slug: "ibm-guardium",
  nome: "IBM Guardium",
  fabricante: "IBM",
  fabricanteSlug: "ibm",
  logo: "https://infodive.com.br/logos/ibm.svg",
  logoClass: "h-5",
  categoria: "Segurança",
  categoriaSlug: "seguranca",
  subcategoria: "Segurança de Dados",
  descricaoCurta: "Descoberta, monitoramento e proteção de dados sensíveis em tempo real.",
  descricaoCompleta: "Descrição completa de teste",
  destaque: true,
  diferenciais: [],
  casosDeUso: [],
  servicos: [],
};

describe("ProductCard", () => {
  it("renderiza o nome do produto", () => {
    render(<ProductCard product={mockProduct} />);
    expect(
      screen.getByRole("heading", { name: mockProduct.nome }),
    ).toBeInTheDocument();
  });

  it("renderiza a subcategoria e a descrição curta", () => {
    render(<ProductCard product={mockProduct} />);
    expect(screen.getByText(mockProduct.subcategoria)).toBeInTheDocument();
    expect(screen.getByText(mockProduct.descricaoCurta)).toBeInTheDocument();
  });

  it("renderiza o badge com a categoria", () => {
    render(<ProductCard product={mockProduct} />);
    expect(screen.getByText(mockProduct.categoria)).toBeInTheDocument();
  });

  it("aponta o link para a página de detalhe do produto", () => {
    render(<ProductCard product={mockProduct} />);
    expect(screen.getByRole("link")).toHaveAttribute(
      "href",
      `/produtos/${mockProduct.slug}`,
    );
  });

  it("usa o fabricante como alt da imagem do logo", () => {
    render(<ProductCard product={mockProduct} />);
    expect(screen.getByAltText(mockProduct.fabricante)).toBeInTheDocument();
  });

  it("aceita className adicional", () => {
    render(<ProductCard product={mockProduct} className="custom-card" />);
    expect(screen.getByRole("link")).toHaveClass("custom-card");
  });
});
