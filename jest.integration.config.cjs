/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",
  resolver: "ts-jest-resolver",
  testEnvironment: "node",
  testTimeout: 100000,
  collectCoverage: true,
  clearMocks: true,
  testMatch: ["**/tests/**/*.test.ts", "**/tests/**/*.i-test.ts"],
  coveragePathIgnorePatterns: ["<rootDir>/node-modules/", "<rootDir>/tests/", "<rootDir>/src/runtime/browser/"],
  /*roots: ["<rootDir>"],
  modulePaths: [compilerOptions.baseUrl], // <-- This will be set to 'baseUrl' value*/
  // moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: "/" }),
  moduleNameMapper: { "^~/(.*)$": "<rootDir>/src/$1" },
};
