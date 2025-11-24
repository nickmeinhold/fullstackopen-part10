// https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require("eslint/config");
const expoConfig = require("eslint-config-expo/flat");

module.exports = defineConfig([
  expoConfig,
  {
    ignores: ["dist/*"],
    overrides: [
      {
        files: ["src/__tests__/**/*.js", "src/__tests__/**/*.ts"],
        env: { jest: true },
      },
    ],
  },
]);
