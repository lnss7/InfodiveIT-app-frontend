import { render, screen } from "@testing-library/react";
import { BlogArtigos } from "../artigos";

describe("BlogArtigos", () => {
  it('marca "Todos" como pill ativa por padrão', () => {
    render(<BlogArtigos />);
    const todos = screen.getByRole("button", { name: "Todos" });
    expect(todos).toHaveClass("bg-brand");
    expect(todos).toHaveClass("text-white");
  });
});
