import {
  PRODUCTS,
  PRODUCT_CATEGORIES,
  PRODUCT_FABRICANTES,
  PRODUCT_STATS,
  getProductBySlug,
  getRelatedProducts,
} from "../products-data";

describe("products-data", () => {
  describe("integridade dos dados", () => {
    it("possui ao menos um produto", () => {
      expect(PRODUCTS.length).toBeGreaterThan(0);
    });

    it("garante slugs únicos", () => {
      const slugs = PRODUCTS.map((p) => p.slug);
      expect(new Set(slugs).size).toBe(slugs.length);
    });

    it("garante os campos obrigatórios em todos os produtos", () => {
      for (const product of PRODUCTS) {
        expect(product.slug).toBeTruthy();
        expect(product.nome).toBeTruthy();
        expect(product.fabricante).toBeTruthy();
        expect(product.categoria).toBeTruthy();
        expect(product.descricaoCurta).toBeTruthy();
      }
    });
  });

  describe("PRODUCT_CATEGORIES", () => {
    it('começa com "Todos"', () => {
      expect(PRODUCT_CATEGORIES[0]).toBe("Todos");
    });

    it("não possui categorias duplicadas", () => {
      expect(new Set(PRODUCT_CATEGORIES).size).toBe(PRODUCT_CATEGORIES.length);
    });
  });

  describe("PRODUCT_FABRICANTES", () => {
    it("é uma lista única e ordenada de fabricantes", () => {
      expect(new Set(PRODUCT_FABRICANTES).size).toBe(
        PRODUCT_FABRICANTES.length,
      );
      const ordenado = [...PRODUCT_FABRICANTES].sort();
      expect(PRODUCT_FABRICANTES).toEqual(ordenado);
    });
  });

  describe("PRODUCT_STATS", () => {
    it("reflete a contagem de produtos, fabricantes e categorias", () => {
      expect(PRODUCT_STATS.produtos).toBe(PRODUCTS.length);
      expect(PRODUCT_STATS.fabricantes).toBe(PRODUCT_FABRICANTES.length);
      expect(PRODUCT_STATS.categorias).toBe(PRODUCT_CATEGORIES.length - 1);
    });
  });

  describe("getProductBySlug()", () => {
    it("retorna o produto correspondente ao slug", () => {
      const target = PRODUCTS[0];
      expect(getProductBySlug(target.slug)).toBe(target);
    });

    it("retorna undefined para slug inexistente", () => {
      expect(getProductBySlug("nao-existe")).toBeUndefined();
    });
  });

  describe("getRelatedProducts()", () => {
    it("exclui o próprio produto do resultado", () => {
      const base = PRODUCTS[0];
      const related = getRelatedProducts(base);
      expect(related.every((p) => p.slug !== base.slug)).toBe(true);
    });

    it("retorna apenas produtos da mesma categoria ou fabricante", () => {
      const base = PRODUCTS[0];
      const related = getRelatedProducts(base);
      expect(
        related.every(
          (p) =>
            p.categoriaSlug === base.categoriaSlug ||
            p.fabricanteSlug === base.fabricanteSlug,
        ),
      ).toBe(true);
    });

    it("respeita o limite informado", () => {
      const base = PRODUCTS[0];
      expect(getRelatedProducts(base, 1).length).toBeLessThanOrEqual(1);
    });
  });
});
