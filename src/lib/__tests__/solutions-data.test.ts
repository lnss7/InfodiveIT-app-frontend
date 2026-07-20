import { SOLUTIONS } from "../solutions-data";

describe("solutions-data", () => {
  describe("integridade dos dados", () => {
    it("é inicializado como array de soluções", () => {
      expect(Array.isArray(SOLUTIONS)).toBe(true);
    });
  });
});
