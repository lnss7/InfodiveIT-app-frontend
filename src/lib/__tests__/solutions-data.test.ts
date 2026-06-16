import { SOLUTIONS, SOLUTION_ICONS } from "../solutions-data";

describe("solutions-data", () => {
  describe("integridade dos dados", () => {
    it("possui ao menos uma solução", () => {
      expect(SOLUTIONS.length).toBeGreaterThan(0);
    });

    it("garante slugs únicos", () => {
      const slugs = SOLUTIONS.map((s) => s.slug);
      expect(new Set(slugs).size).toBe(slugs.length);
    });

    it("garante campos obrigatórios em todas as soluções", () => {
      for (const solution of SOLUTIONS) {
        expect(solution.slug).toBeTruthy();
        expect(solution.title).toBeTruthy();
        expect(solution.description).toBeTruthy();
        expect(Array.isArray(solution.metrics)).toBe(true);
        expect(Array.isArray(solution.features)).toBe(true);
        expect(Array.isArray(solution.vendors)).toBe(true);
      }
    });

    it("referencia um ícone válido em SOLUTION_ICONS", () => {
      for (const solution of SOLUTIONS) {
        expect(SOLUTION_ICONS[solution.iconName]).toBeDefined();
      }
    });

    it("inclui um case study completo em cada solução", () => {
      for (const solution of SOLUTIONS) {
        expect(solution.caseStudy.client).toBeTruthy();
        expect(solution.caseStudy.resultado).toBeTruthy();
      }
    });
  });
});
