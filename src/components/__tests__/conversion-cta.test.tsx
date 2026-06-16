import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ConversionCTA } from "../conversion-cta";

describe("ConversionCTA", () => {
  it("renderiza título e subtítulo", () => {
    render(<ConversionCTA title="Vamos conversar" subtitle="Fale com a equipe" />);
    expect(
      screen.getByRole("heading", { name: "Vamos conversar" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Fale com a equipe")).toBeInTheDocument();
  });

  it("usa o label de CTA padrão", () => {
    render(<ConversionCTA title="T" subtitle="S" />);
    expect(
      screen.getByText("Falar com especialista"),
    ).toBeInTheDocument();
  });

  it("aceita um label de CTA customizado", () => {
    render(<ConversionCTA title="T" subtitle="S" ctaLabel="Ver catálogo" />);
    expect(screen.getByText("Ver catálogo")).toBeInTheDocument();
  });

  it("renderiza um link quando href é fornecido", () => {
    render(<ConversionCTA title="T" subtitle="S" href="/contato" />);
    expect(screen.getByRole("link")).toHaveAttribute("href", "/contato");
  });

  it("chama onCtaClick ao clicar quando não há href", async () => {
    const onCtaClick = jest.fn();
    const user = userEvent.setup();
    render(<ConversionCTA title="T" subtitle="S" onCtaClick={onCtaClick} />);

    await user.click(screen.getByRole("button"));

    expect(onCtaClick).toHaveBeenCalledTimes(1);
  });
});
