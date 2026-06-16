import "@testing-library/jest-dom";

// Mock environment variables for tests
process.env.NEXT_PUBLIC_API_URL = "http://localhost:8080/api";

// O jsdom não implementa estas APIs de browser usadas por framer-motion
// (whileInView / useInView), GSAP (matchMedia) e pelo SelectField
// (reposicionamento no scroll/resize). Os mocks abaixo são no-op apenas para
// permitir que os componentes montem sem erro durante os testes unitários.

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  }),
});

class MockObserver {
  observe = jest.fn();
  unobserve = jest.fn();
  disconnect = jest.fn();
  takeRecords = jest.fn(() => []);
}

global.IntersectionObserver =
  MockObserver as unknown as typeof IntersectionObserver;
global.ResizeObserver = MockObserver as unknown as typeof ResizeObserver;

window.scrollTo = jest.fn();

// Made with Bob
