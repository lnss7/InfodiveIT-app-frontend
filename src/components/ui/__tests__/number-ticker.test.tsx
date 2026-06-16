import { render, screen } from "@testing-library/react";
import { NumberTicker } from "../number-ticker";

describe("NumberTicker", () => {
  it("renderiza com o valor inicial (startValue padrão 0)", () => {
    render(<NumberTicker value={100} />);
    expect(screen.getByText("0")).toBeInTheDocument();
  });

  it("renderiza com startValue customizado", () => {
    render(<NumberTicker value={100} startValue={42} />);
    expect(screen.getByText("42")).toBeInTheDocument();
  });

  it("renderiza como elemento <span>", () => {
    render(<NumberTicker value={10} />);
    expect(screen.getByText("0").tagName).toBe("SPAN");
  });

  it("aceita className adicional", () => {
    render(<NumberTicker value={10} className="custom-ticker" />);
    expect(screen.getByText("0")).toHaveClass("custom-ticker");
  });
});
