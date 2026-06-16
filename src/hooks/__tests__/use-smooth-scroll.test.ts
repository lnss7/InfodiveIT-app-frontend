import { renderHook } from "@testing-library/react";
import { useSmoothScroll } from "../use-smooth-scroll";

describe("useSmoothScroll", () => {
  afterEach(() => {
    delete (window as { lenis?: unknown }).lenis;
    jest.restoreAllMocks();
  });

  it("usa window.lenis.scrollTo quando o Lenis está ativo", () => {
    const lenisScrollTo = jest.fn();
    (window as unknown as { lenis: { scrollTo: jest.Mock } }).lenis = {
      scrollTo: lenisScrollTo,
    };
    const el = document.createElement("div");
    el.id = "alvo";
    document.body.appendChild(el);

    const { result } = renderHook(() => useSmoothScroll());
    const ok = result.current.scrollTo("alvo");

    expect(ok).toBe(true);
    expect(lenisScrollTo).toHaveBeenCalledWith(el, { duration: 1.2 });

    document.body.removeChild(el);
  });

  it("repassa a duração customizada para o Lenis", () => {
    const lenisScrollTo = jest.fn();
    (window as unknown as { lenis: { scrollTo: jest.Mock } }).lenis = {
      scrollTo: lenisScrollTo,
    };
    const el = document.createElement("div");
    document.body.appendChild(el);

    const { result } = renderHook(() => useSmoothScroll());
    result.current.scrollTo(el, { duration: 1.4 });

    expect(lenisScrollTo).toHaveBeenCalledWith(el, { duration: 1.4 });

    document.body.removeChild(el);
  });

  it("cai no scrollIntoView nativo quando o Lenis não está ativo", () => {
    const el = document.createElement("div");
    // jsdom não implementa scrollIntoView; injeta-se um mock direto.
    const intoView = jest.fn();
    el.scrollIntoView = intoView;
    document.body.appendChild(el);

    const { result } = renderHook(() => useSmoothScroll());
    const ok = result.current.scrollTo(el);

    expect(ok).toBe(true);
    expect(intoView).toHaveBeenCalledWith({ behavior: "smooth" });

    document.body.removeChild(el);
  });

  it("retorna false quando o id não existe no DOM", () => {
    const { result } = renderHook(() => useSmoothScroll());
    expect(result.current.scrollTo("nao-existe")).toBe(false);
  });
});
