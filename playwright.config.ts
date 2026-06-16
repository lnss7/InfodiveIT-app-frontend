import { defineConfig, devices } from "@playwright/test";

/**
 * Configuração do Playwright para os testes E2E (regressão visual/comportamental
 * dos componentes de animação pesada, como os carrosséis, que ficam de fora da
 * cobertura unitária do Jest). Os specs ficam em `e2e/` e usam a extensão
 * `.spec.ts` para não colidir com o Jest (que coleta `*.test.ts`).
 */
export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: "list",
  use: {
    baseURL: "http://localhost:3000",
    trace: "on-first-retry",
  },
  projects: [
    { name: "chromium", use: { ...devices["Desktop Chrome"] } },
  ],
  webServer: {
    command: "npm run dev",
    url: "http://localhost:3000",
    timeout: 120_000,
    reuseExistingServer: !process.env.CI,
  },
});
