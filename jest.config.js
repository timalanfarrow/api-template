module.exports = {
	collectCoverageFrom: [
		"src/**/*.ts",
	],
	coverageDirectory: "coverage",
	testMatch: [
		"<rootDir>/src/lib/**/?(*.)(spec|test).(js|ts)",
		"<rootDir>/src/helpers/**/?(*.)(spec|test).(js|ts)",
	],
	reporters: process.env.CI ? undefined : ["jest-spec-reporter"],
	rootDir: ".",
	moduleFileExtensions: [
		"ts",
		"js",
	],
	transform: {
		"^.+\\.ts$": "ts-jest",
	},
	testEnvironment: "node",
	setupFilesAfterEnv: ["<rootDir>/setupTests.ts"],
};
