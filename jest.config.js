/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  "roots": [
    "<rootDir>/tests"
  ],
  "testTimeout": 5400000,
  "testMatch": ["**/?*.ts"],
  "transform": {
    "^.+\\.(ts|tsx)$": "ts-jest"
  },
  "transformIgnorePatterns": ["<rootDir>/node_modules/"],
  "reporters": [
    "default",
    ["./node_modules/jest-html-reporter", {
      "pageTitle": `Test Report`,
      "outputPath": "out/report.html",
      "includeFailureMsg": true,
      "includeConsoleLog": false,
    }]
  ],
  "verbose": false,
}