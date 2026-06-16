import { render, screen } from "@testing-library/react";
import { usePathname } from "next/navigation";
import { BackToHome } from "../back-to-home";

jest.mock("next/navigation", () => ({
  usePathname: jest.fn(),
}));

const mockedUsePathname = usePathname as jest.Mock;

describe("BackToHome", () => {
  afterEach(() => jest.clearAllMocks());

  it.each(["/solucoes", "/produtos", "/produto", "/sobre", "/blog"])(
    "exibe o botão de voltar na rota %s",
    (pathname) => {
      mockedUsePathname.mockReturnValue(pathname);
      render(<BackToHome />);
      expect(
        screen.getByRole("link", { name: /voltar para a home/i }),
      ).toHaveAttribute("href", "/");
    },
  );

  it("não renderiza nada na home", () => {
    mockedUsePathname.mockReturnValue("/");
    const { container } = render(<BackToHome />);
    expect(container).toBeEmptyDOMElement();
  });

  it("não renderiza nada em páginas de detalhe (slug)", () => {
    mockedUsePathname.mockReturnValue("/produtos/ibm-guardium");
    const { container } = render(<BackToHome />);
    expect(container).toBeEmptyDOMElement();
  });
});
