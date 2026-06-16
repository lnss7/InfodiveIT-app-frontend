import { render, screen } from "@testing-library/react";
import { Badge } from "../badge";

describe("Badge", () => {
  it("renderiza com texto correto", () => {
    render(<Badge>Test Badge</Badge>);
    expect(screen.getByText("Test Badge")).toBeInTheDocument();
  });

  it("aplica variante default (fundo brand, texto branco)", () => {
    render(<Badge>Default</Badge>);
    const badge = screen.getByText("Default");
    expect(badge).toHaveClass("bg-brand");
    expect(badge).toHaveClass("text-white");
  });

  it("aplica variante brand (fundo brand/5, texto brand)", () => {
    render(<Badge variant="brand">Brand</Badge>);
    const badge = screen.getByText("Brand");
    expect(badge).toHaveClass("bg-brand/5");
    expect(badge).toHaveClass("text-brand");
  });

  it("aplica variante secondary (fundo ink-50, texto ink-600)", () => {
    render(<Badge variant="secondary">Secondary</Badge>);
    const badge = screen.getByText("Secondary");
    expect(badge).toHaveClass("bg-ink-50");
    expect(badge).toHaveClass("text-ink-600");
  });

  it("aplica variante outline (sem fundo, borda ink-200)", () => {
    render(<Badge variant="outline">Outline</Badge>);
    const badge = screen.getByText("Outline");
    expect(badge).toHaveClass("border-ink-200");
    expect(badge).toHaveClass("text-ink-700");
  });

  it("aceita className adicional", () => {
    render(<Badge className="custom-class">Custom</Badge>);
    const badge = screen.getByText("Custom");
    expect(badge).toHaveClass("custom-class");
  });

  it("mantém classes base independente da variante", () => {
    render(<Badge variant="brand">Badge</Badge>);
    const badge = screen.getByText("Badge");
    expect(badge).toHaveClass("inline-flex");
    expect(badge).toHaveClass("items-center");
    expect(badge).toHaveClass("rounded-full");
    expect(badge).toHaveClass("px-2.5");
    expect(badge).toHaveClass("py-0.5");
    expect(badge).toHaveClass("text-[11px]");
    expect(badge).toHaveClass("font-semibold");
  });
});

// Made with Bob
