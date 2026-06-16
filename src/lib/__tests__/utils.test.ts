import { cn } from "../utils";

describe("cn()", () => {
  it("concatena classes simples", () => {
    expect(cn("foo", "bar")).toBe("foo bar");
  });

  it("resolve conflitos de classes Tailwind (mantém a última)", () => {
    expect(cn("px-2", "px-4")).toBe("px-4");
    expect(cn("text-sm", "text-lg")).toBe("text-lg");
  });

  it("ignora valores falsy (undefined, null, false)", () => {
    expect(cn("foo", undefined, "bar")).toBe("foo bar");
    expect(cn("foo", null, "bar")).toBe("foo bar");
    expect(cn("foo", false, "bar")).toBe("foo bar");
    expect(cn("foo", "", "bar")).toBe("foo bar");
  });

  it("aceita arrays de classes", () => {
    expect(cn(["foo", "bar"])).toBe("foo bar");
    expect(cn(["foo", "bar"], "baz")).toBe("foo bar baz");
  });

  it("aceita objetos condicionais", () => {
    expect(cn({ foo: true, bar: false })).toBe("foo");
    expect(cn({ foo: true, bar: true })).toBe("foo bar");
    expect(cn("base", { active: true, disabled: false })).toBe("base active");
  });

  it("combina múltiplos tipos de entrada", () => {
    expect(
      cn("base", ["foo", "bar"], { active: true, disabled: false }, "extra"),
    ).toBe("base foo bar active extra");
  });

  it("resolve conflitos complexos de Tailwind", () => {
    expect(cn("bg-red-500", "bg-blue-500")).toBe("bg-blue-500");
    expect(cn("hover:bg-red-500", "hover:bg-blue-500")).toBe(
      "hover:bg-blue-500",
    );
    expect(cn("md:px-4", "md:px-8")).toBe("md:px-8");
  });

  it("mantém classes não conflitantes", () => {
    expect(cn("px-4", "py-2")).toBe("px-4 py-2");
    expect(cn("text-sm", "font-bold")).toBe("text-sm font-bold");
  });

  it("retorna string vazia quando não há classes", () => {
    expect(cn()).toBe("");
    expect(cn(undefined, null, false)).toBe("");
  });

  it("remove espaços extras", () => {
    expect(cn("  foo  ", "  bar  ")).toBe("foo bar");
  });
});

// Made with Bob
