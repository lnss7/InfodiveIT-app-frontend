import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BlogArtigos } from "../artigos";
import { ARTIGOS } from "@/lib/blog-data";

// Cada ArtigoCard é um link para /blog/[slug]; contar os links = contar os
// artigos visíveis no grid após cada filtro.
function contarCards() {
  return screen.getAllByRole("link").length;
}

describe("BlogArtigos (filtro)", () => {
  it('exibe todos os artigos quando o filtro "Todos" está ativo', () => {
    render(<BlogArtigos />);
    expect(contarCards()).toBe(ARTIGOS.length);
  });

  it('marca "Todos" como pill ativa por padrão (fundo brand, texto branco)', () => {
    render(<BlogArtigos />);
    const todos = screen.getByRole("button", { name: "Todos" });
    expect(todos).toHaveClass("bg-brand");
    expect(todos).toHaveClass("text-white");
  });

  it("filtra os artigos por tipo ao clicar em uma pill", async () => {
    const user = userEvent.setup();
    render(<BlogArtigos />);

    const esperado = ARTIGOS.filter((a) => a.tipo === "artigo").length;
    await user.click(screen.getByRole("button", { name: "Artigos" }));

    expect(contarCards()).toBe(esperado);
  });

  it("transfere o estilo de ativo para a pill clicada", async () => {
    const user = userEvent.setup();
    render(<BlogArtigos />);

    await user.click(screen.getByRole("button", { name: "Artigos" }));

    const artigos = screen.getByRole("button", { name: "Artigos" });
    expect(artigos).toHaveClass("bg-brand");
    expect(artigos).toHaveClass("text-white");
    expect(screen.getByRole("button", { name: "Todos" })).not.toHaveClass(
      "bg-brand",
    );
  });
});
