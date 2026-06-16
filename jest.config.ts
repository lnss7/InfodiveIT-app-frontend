import type { Config } from "jest";
import nextJest from "next/jest.js";

const createJestConfig = nextJest({ dir: "./" });

const config: Config = {
  coverageProvider: "v8",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  collectCoverageFrom: [
    "src/components/**/*.{ts,tsx}",
    "src/hooks/**/*.{ts,tsx}",
    "src/lib/**/*.{ts,tsx}",
    "!src/**/*.stories.{ts,tsx}",
    "!src/**/*.d.ts",
    "!src/components/animations/**",
    "!src/components/ui/border-beam.tsx",
    "!src/components/ui/magic-card.tsx",
    "!src/components/ui/orbiting-circles.tsx",
    "!src/components/ui/tracing-beam.tsx",
    "!src/components/ui/text-reveal.tsx",
    "!src/components/smooth-scroll.tsx",
    "!src/components/GsapMenu.tsx",
    "!src/components/cases-carousel.tsx",
    "!src/components/dashboard-carousel.tsx",
    "!src/components/bento-grid-solutions.tsx",
  ],
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 75,
      lines: 75,
      statements: 75,
    },
  },
  testMatch: ["**/__tests__/**/*.test.{ts,tsx}", "**/*.test.{ts,tsx}"],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
  testPathIgnorePatterns: ["/node_modules/", "/.next/", "/e2e/"],
  transformIgnorePatterns: [
    "/node_modules/",
    "^.+\\.module\\.(css|sass|scss)$",
  ],
};

export default createJestConfig(config);

// Made with Bob
