import { test, expect } from "@playwright/test";

/**
 * Cobertura E2E dos três carrosséis/seções de animação pesada da home
 * (excluídos da cobertura unitária do Jest): garante que renderizam e, nos casos
 * interativos, que respondem aos controles.
 */
test.describe("Carrosséis e seções de animação da home", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("dashboard carousel (hero) renderiza os slides de showcase", async ({
    page,
  }) => {
    // Os slides do hero têm alt descritivo (SHOWCASE_SLIDES).
    await expect(
      page.getByAltText("Dashboard de monitoramento Infodive").first(),
    ).toBeVisible();
  });

  test("cases carousel avança ao clicar em 'Próximo caso'", async ({ page }) => {
    const cases = page.locator("#cases");
    await cases.scrollIntoViewIfNeeded();

    const next = page.getByRole("button", { name: "Próximo caso" });
    // Hover pausa o autoplay (onMouseEnter no container), tornando o teste determinístico.
    await next.hover();

    await expect(cases.getByText("Banco Regional")).toBeVisible();
    await next.click();
    await expect(cases.getByText("Rede Cosmos")).toBeVisible();
  });

  test("cases carousel volta ao clicar em 'Caso anterior'", async ({ page }) => {
    const cases = page.locator("#cases");
    await cases.scrollIntoViewIfNeeded();

    const prev = page.getByRole("button", { name: "Caso anterior" });
    await prev.hover();

    await expect(cases.getByText("Banco Regional")).toBeVisible();
    await prev.click();
    // Volta de forma circular para o último caso.
    await expect(cases.getByText("Vesta Manufatura")).toBeVisible();
  });

  test("bento grid de soluções renderiza a seção", async ({ page }) => {
    const solutions = page.locator("#solutions");
    await solutions.scrollIntoViewIfNeeded();

    await expect(solutions.getByText("portfólio completo")).toBeVisible();
    await expect(
      solutions.getByRole("link", { name: /ver todas as soluções/i }),
    ).toBeVisible();
  });
});
