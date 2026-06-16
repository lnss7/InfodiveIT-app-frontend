import { render, screen } from "@testing-library/react";
import { CardContent } from "../card";

describe("CardContent", () => {
  it("renderiza children corretamente", () => {
    render(<CardContent>Content</CardContent>);
    expect(screen.getByText("Content")).toBeInTheDocument();
  });

  it("aceita className adicional", () => {
    render(<CardContent className="custom-content">Content</CardContent>);
    const content = screen.getByText("Content");
    expect(content).toHaveClass("custom-content");
  });

  it("aplica padding padrão p-6 pt-0", () => {
    render(<CardContent>Content</CardContent>);
    const content = screen.getByText("Content");
    expect(content).toHaveClass("p-6");
    expect(content).toHaveClass("pt-0");
  });

  it("renderiza como div", () => {
    render(<CardContent>Content</CardContent>);
    const content = screen.getByText("Content");
    expect(content.tagName).toBe("DIV");
  });
});

// Made with Bob
