import { render, screen } from "@testing-library/react";
import { ProductCard } from "../product-card";
import { PRODUCTS } from "@/lib/products-data";

const product = PRODUCTS[0];

describe("ProductCard", () => {
  it("renderiza o nome do produto", () => {
    render(<ProductCard product={product} />);
    expect(
      screen.getByRole("heading", { name: product.nome }),
    ).toBeInTheDocument();
  });

  it("renderiza a subcategoria e a descrição curta", () => {
    render(<ProductCard product={product} />);
    expect(screen.getByText(product.subcategoria)).toBeInTheDocument();
    expect(screen.getByText(product.descricaoCurta)).toBeInTheDocument();
  });

  it("renderiza o badge com a categoria", () => {
    render(<ProductCard product={product} />);
    expect(screen.getByText(product.categoria)).toBeInTheDocument();
  });

  it("aponta o link para a página de detalhe do produto", () => {
    render(<ProductCard product={product} />);
    expect(screen.getByRole("link")).toHaveAttribute(
      "href",
      `/produtos/${product.slug}`,
    );
  });

  it("usa o fabricante como alt da imagem do logo", () => {
    render(<ProductCard product={product} />);
    expect(screen.getByAltText(product.fabricante)).toBeInTheDocument();
  });

  it("aceita className adicional", () => {
    render(<ProductCard product={product} className="custom-card" />);
    expect(screen.getByRole("link")).toHaveClass("custom-card");
  });
});
