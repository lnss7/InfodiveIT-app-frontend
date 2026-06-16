import { render, screen } from "@testing-library/react";
import { Marquee } from "../marquee";

describe("Marquee", () => {
  it("duplica os filhos para o loop contínuo", () => {
    render(
      <Marquee>
        <span>Logo</span>
      </Marquee>,
    );
    // O componente renderiza os children duas vezes.
    expect(screen.getAllByText("Logo")).toHaveLength(2);
  });

  it("aplica a duração via CSS var --duration", () => {
    const { container } = render(
      <Marquee duration="40s">
        <span>Item</span>
      </Marquee>,
    );
    const root = container.firstChild as HTMLElement;
    expect(root.style.getPropertyValue("--duration")).toBe("40s");
  });

  it("aplica a classe de pausa no hover quando pauseOnHover", () => {
    const { container } = render(
      <Marquee pauseOnHover>
        <span>Item</span>
      </Marquee>,
    );
    expect(container.innerHTML).toContain("group-hover:[animation-play-state:paused]");
  });

  it("inverte a direção quando reverse", () => {
    const { container } = render(
      <Marquee reverse>
        <span>Item</span>
      </Marquee>,
    );
    expect(container.innerHTML).toContain("[animation-direction:reverse]");
  });

  it("aceita className adicional no container", () => {
    const { container } = render(
      <Marquee className="custom-marquee">
        <span>Item</span>
      </Marquee>,
    );
    expect(container.firstChild).toHaveClass("custom-marquee");
  });
});
