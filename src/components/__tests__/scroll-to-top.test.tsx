import { render } from "@testing-library/react";
import { usePathname } from "next/navigation";
import { ScrollToTop } from "../scroll-to-top";

jest.mock("next/navigation", () => ({
  usePathname: jest.fn(),
}));

const mockedUsePathname = usePathname as jest.Mock;

describe("ScrollToTop", () => {
  beforeEach(() => {
    (window.scrollTo as jest.Mock).mockClear();
    mockedUsePathname.mockReturnValue("/produtos");
  });

  it("não renderiza nenhum elemento visível", () => {
    const { container } = render(<ScrollToTop />);
    expect(container).toBeEmptyDOMElement();
  });

  it("rola para o topo ao montar quando não há hash na URL", () => {
    render(<ScrollToTop />);
    expect(window.scrollTo).toHaveBeenCalledWith(0, 0);
  });

  it("define scrollRestoration como manual quando suportado", () => {
    // jsdom só implementa history.scrollRestoration se for previamente definido.
    window.history.scrollRestoration = "auto";
    render(<ScrollToTop />);
    expect(window.history.scrollRestoration).toBe("manual");
  });
});
