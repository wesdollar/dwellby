module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  type: "module",
  moduleNameMapper: {
    "^~/(.*)$": "<rootDir>/src/$1",
  },
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
  roots: ["<rootDir>/app"],
};
