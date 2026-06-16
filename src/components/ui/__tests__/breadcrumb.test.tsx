import { render, screen } from "@testing-library/react";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../breadcrumb";

describe("Breadcrumb", () => {
  function renderTrail() {
    return render(
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Produtos</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>,
    );
  }

  it("renderiza um nav com aria-label breadcrumb", () => {
    renderTrail();
    expect(
      screen.getByRole("navigation", { name: "breadcrumb" }),
    ).toBeInTheDocument();
  });

  it("renderiza o link com href correto", () => {
    renderTrail();
    const link = screen.getByRole("link", { name: "Home" });
    expect(link).toHaveAttribute("href", "/");
  });

  it("marca a página atual com aria-current", () => {
    renderTrail();
    const page = screen.getByText("Produtos");
    expect(page).toHaveAttribute("aria-current", "page");
    expect(page).toHaveAttribute("aria-disabled", "true");
  });

  it("renderiza o separador com aria-hidden", () => {
    const { container } = renderTrail();
    const separator = container.querySelector('[role="presentation"]');
    expect(separator).toBeInTheDocument();
    expect(separator).toHaveAttribute("aria-hidden");
  });

  it("aceita className adicional na lista", () => {
    render(
      <BreadcrumbList className="custom-list">
        <BreadcrumbItem>Item</BreadcrumbItem>
      </BreadcrumbList>,
    );
    expect(screen.getByRole("list")).toHaveClass("custom-list");
  });
});
