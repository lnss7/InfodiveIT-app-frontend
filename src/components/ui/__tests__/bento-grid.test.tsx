import { render, screen } from "@testing-library/react";
import { Server } from "lucide-react";
import { BentoGrid, BentoCard } from "../bento-grid";

describe("BentoGrid", () => {
  it("renderiza os filhos", () => {
    render(
      <BentoGrid>
        <div>Filho</div>
      </BentoGrid>,
    );
    expect(screen.getByText("Filho")).toBeInTheDocument();
  });

  it("aplica as classes de grid e className adicional", () => {
    const { container } = render(
      <BentoGrid className="custom-grid">
        <div>Filho</div>
      </BentoGrid>,
    );
    const root = container.firstChild as HTMLElement;
    expect(root).toHaveClass("grid");
    expect(root).toHaveClass("custom-grid");
  });
});

describe("BentoCard", () => {
  function renderCard() {
    return render(
      <BentoCard
        name="Infraestrutura"
        className="col-span-1"
        background={<div>fundo</div>}
        Icon={Server}
        description="Servidores e redes resilientes."
        href="/solucoes/infraestrutura"
        cta="Saiba mais"
      />,
    );
  }

  it("renderiza nome, descrição e CTA", () => {
    renderCard();
    expect(screen.getByText("Infraestrutura")).toBeInTheDocument();
    expect(
      screen.getByText("Servidores e redes resilientes."),
    ).toBeInTheDocument();
    expect(screen.getByText("Saiba mais")).toBeInTheDocument();
  });

  it("renderiza o link com href correto", () => {
    renderCard();
    expect(screen.getByRole("link", { name: /saiba mais/i })).toHaveAttribute(
      "href",
      "/solucoes/infraestrutura",
    );
  });

  it("renderiza o background fornecido", () => {
    renderCard();
    expect(screen.getByText("fundo")).toBeInTheDocument();
  });
});
