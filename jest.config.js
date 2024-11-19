module.exports = {
  testEnvironment: "jest-environment-jsdom",
  roots: ["<rootDir>/tests"],
  setupFilesAfterEnv: ["@testing-library/jest-dom/extend-expect"],
  moduleFileExtensions: ["js", "jsx", "ts", "tsx"],
  transform: {
    "^.+\\.(ts|tsx|js|jsx)$": "ts-jest",
  },
  setupFilesAfterEnv: ["@testing-library/jest-dom"],
  globals: {
    window: {},
  },
};
