import { render, screen, fireEvent } from "@testing-library/react";
import {
  handleGlowMove,
  GlowBorderOverlay,
  GlowBorder,
} from "../glow-border";

describe("handleGlowMove", () => {
  it("grava a posição do cursor em CSS vars (--glow-x / --glow-y)", () => {
    const { container } = render(
      <div data-testid="alvo" onMouseMove={handleGlowMove}>
        conteúdo
      </div>,
    );
    const el = container.firstChild as HTMLElement;

    // jsdom retorna getBoundingClientRect zerado, então a var é igual ao clientX/Y.
    fireEvent.mouseMove(el, { clientX: 50, clientY: 30 });

    expect(el.style.getPropertyValue("--glow-x")).toBe("50px");
    expect(el.style.getPropertyValue("--glow-y")).toBe("30px");
  });
});

describe("GlowBorderOverlay", () => {
  it("renderiza um span decorativo aria-hidden", () => {
    const { container } = render(<GlowBorderOverlay />);
    const span = container.querySelector("span");
    expect(span).toBeInTheDocument();
    expect(span).toHaveAttribute("aria-hidden");
  });

  it("aceita className adicional", () => {
    const { container } = render(<GlowBorderOverlay className="custom-glow" />);
    expect(container.querySelector("span")).toHaveClass("custom-glow");
  });
});

describe("GlowBorder", () => {
  it("renderiza um botão com os children", () => {
    render(<GlowBorder>Clique aqui</GlowBorder>);
    expect(
      screen.getByRole("button", { name: /clique aqui/i }),
    ).toBeInTheDocument();
  });

  it("aplica group/relative para o efeito de hover", () => {
    render(<GlowBorder>Botão</GlowBorder>);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("group");
    expect(button).toHaveClass("relative");
  });
});
