import {
  ARTIGOS,
  FILTROS,
  TIPO_CONFIG,
  getArtigoBySlug,
  getArtigosRelacionados,
  type TipoConteudo,
} from "../blog-data";

const TIPOS: TipoConteudo[] = [
  "artigo",
  "whitepaper",
  "case",
  "datasheet",
  "video",
];

describe("blog-data", () => {
  describe("integridade dos dados", () => {
    it("possui ao menos um artigo", () => {
      expect(ARTIGOS.length).toBeGreaterThan(0);
    });

    it("garante slugs únicos", () => {
      const slugs = ARTIGOS.map((a) => a.slug);
      expect(new Set(slugs).size).toBe(slugs.length);
    });

    it("garante campos obrigatórios e tipo válido em todos os artigos", () => {
      for (const artigo of ARTIGOS) {
        expect(artigo.slug).toBeTruthy();
        expect(artigo.titulo).toBeTruthy();
        expect(artigo.descricao).toBeTruthy();
        expect(TIPOS).toContain(artigo.tipo);
        expect(Array.isArray(artigo.conteudo)).toBe(true);
      }
    });
  });

  describe("TIPO_CONFIG", () => {
    it("cobre todos os tipos de conteúdo", () => {
      for (const tipo of TIPOS) {
        expect(TIPO_CONFIG[tipo]).toBeDefined();
        expect(TIPO_CONFIG[tipo].label).toBeTruthy();
        expect(TIPO_CONFIG[tipo].icon).toBeDefined();
      }
    });
  });

  describe("FILTROS", () => {
    it('inclui o filtro "todos" como primeira opção', () => {
      expect(FILTROS[0]).toEqual({ label: "Todos", value: "todos" });
    });

    it("possui um filtro para cada tipo de conteúdo", () => {
      const valores = FILTROS.map((f) => f.value);
      for (const tipo of TIPOS) {
        expect(valores).toContain(tipo);
      }
    });
  });

  describe("getArtigoBySlug()", () => {
    it("retorna o artigo correspondente ao slug", () => {
      const target = ARTIGOS[0];
      expect(getArtigoBySlug(target.slug)).toBe(target);
    });

    it("retorna undefined para slug inexistente", () => {
      expect(getArtigoBySlug("nao-existe")).toBeUndefined();
    });
  });

  describe("getArtigosRelacionados()", () => {
    it("exclui o artigo atual", () => {
      const base = ARTIGOS[0];
      const relacionados = getArtigosRelacionados(base.slug);
      expect(relacionados.every((a) => a.slug !== base.slug)).toBe(true);
    });

    it("respeita o limite informado", () => {
      expect(getArtigosRelacionados(ARTIGOS[0].slug, 2).length).toBeLessThanOrEqual(
        2,
      );
    });
  });
});
