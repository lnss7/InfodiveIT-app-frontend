import { PRODUCTS } from "../products-data";

describe("products-data", () => {
  describe("integridade dos dados", () => {
    it("é inicializado como array de produtos", () => {
      expect(Array.isArray(PRODUCTS)).toBe(true);
    });
  });
});
