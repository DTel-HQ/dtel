/** @type {import('ts-jest').JestConfigWithTsJest} */

const { pathsToModuleNameMapper } = require("ts-jest");
const { compilerOptions } = require("./tsconfig.json");
module.exports = {
	preset: "ts-jest",
	testEnvironment: "node",
	testMatch: ["**/*.test.[jt](s|sx)"],
	moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
		prefix: "<rootDir>/",
	}),
	resolver: "ts-jest-resolver",
	setupFiles: ["jest-date-mock"],
	setupFilesAfterEnv: ["<rootDir>/src/mocks/prisma.test.ts", "<rootDir>/src/mocks/DiscordClient.test.ts"],
	clearMocks: true,
	moduleFileExtensions: ["js", "jsx", "json", "ts", "tsx"],
	transform: { "^.+\\.(js|ts|tsx)$": "ts-jest" },
};
