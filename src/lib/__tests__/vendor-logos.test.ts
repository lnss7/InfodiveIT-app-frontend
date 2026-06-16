import { VENDOR_LOGOS } from "../vendor-logos";

describe("vendor-logos", () => {
  it("expõe os fabricantes principais", () => {
    const esperados = [
      "AWS",
      "Acronis",
      "Apple",
      "Dell Technologies",
      "IBM",
      "Lenovo",
      "Microsoft",
      "Red Hat",
      "SUSE",
      "Veeam",
      "Virtuozzo",
    ];
    for (const nome of esperados) {
      expect(VENDOR_LOGOS[nome]).toBeTruthy();
    }
  });

  it("possui um logo definido para cada chave", () => {
    for (const logo of Object.values(VENDOR_LOGOS)) {
      expect(logo).toBeTruthy();
    }
  });

  it("não possui chaves duplicadas", () => {
    const chaves = Object.keys(VENDOR_LOGOS);
    expect(new Set(chaves).size).toBe(chaves.length);
  });
});
