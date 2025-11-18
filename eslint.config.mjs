import js from "@eslint/js";
import globals from "globals";
import pluginReact from "eslint-plugin-react";
import pluginReactNative from "eslint-plugin-react-native";
import { createRequire } from "module";
import { defineConfig } from "eslint/config";

const require = createRequire(import.meta.url);
const babelParser = require("@babel/eslint-parser");

export default defineConfig([
  // Base recommended JS rules from @eslint/js
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    plugins: { js },
    extends: ["js/recommended"],
    languageOptions: { globals: globals.browser },
  },
  // plugin-react flat recommendations
  pluginReact.configs.flat.recommended,
  // React Native app specific configs (parser, plugin, settings, rules)
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    plugins: { react: pluginReact, "react-native": pluginReactNative },
    languageOptions: {
      parser: babelParser,
      parserOptions: {
        requireConfigFile: false,
        ecmaVersion: 2022,
        sourceType: "module",
        ecmaFeatures: { jsx: true },
      },
      globals: {
        ...globals.browser,
        ...pluginReactNative.environments["react-native"].globals,
      },
    },
    settings: { react: { version: "detect" } },
    rules: {
      "react/prop-types": "off",
      "react/react-in-jsx-scope": "off",
    },
  },
]);
