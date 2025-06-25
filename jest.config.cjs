module.exports = {
  testEnvironment: "jest-environment-jsdom",
  transform: {
    "^.+\\.[jt]sx?$": "babel-jest",
  },
  transformIgnorePatterns: [
    "/node_modules/(?!(next-auth|@auth/core|@panva/hkdf)/)",
  ],
  extensionsToTreatAsEsm: [".jsx"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
  },
  setupFilesAfterEnv: ["<rootDir>/jest.setup.cjs"],
};
