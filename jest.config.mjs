/** @type {import('ts-jest').JestConfigWithTsJest} **/
export default {
  testEnvironment: "jsdom",
  testMatch: ["<rootDir>/test/**/*.ts"],
  transform: {
    "^.+.tsx?$": ["ts-jest", {}],
  },
};