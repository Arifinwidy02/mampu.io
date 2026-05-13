import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1",
    "^@dotlottie/react-player$": "<rootDir>/tests/__mocks__/dotlottie-react-player.ts",
    "^@dotlottie/react-player/dist/index\\.css$": "<rootDir>/tests/__mocks__/styleMock.ts",
    "\\.css$": "<rootDir>/tests/__mocks__/styleMock.ts",
  },
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  transform: {
    "^.+\\.tsx?$": ["ts-jest", { tsconfig: "tsconfig.json" }],
  },
};

export default config;
