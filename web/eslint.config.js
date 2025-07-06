import js from "@eslint/js";
import globals from "globals";
import parser from "@typescript-eslint/parser";
import tseslint from "typescript-eslint";

import react from "eslint-plugin-react";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import reactRefreshPlugin from "eslint-plugin-react-refresh";
import prettierPlugin from "eslint-plugin-prettier";
import tanstackQuery from "@tanstack/eslint-plugin-query";

reactHooksPlugin.meta.name = "react-hooks";
reactRefreshPlugin.meta.name = "react-refresh";
prettierPlugin.meta.name = "prettier";

export default [
  {
    ignores: ["dist", "build", "node_modules"],
  },
  {
    files: ["**/*.{js,ts,jsx,tsx}"],
    languageOptions: {
      parser,
      ecmaVersion: "latest",
      sourceType: "module",
      globals: globals.browser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: [react, reactHooksPlugin, reactRefreshPlugin, prettierPlugin],
    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
      ...js.configs.recommended.rules,
      ...tseslint.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...reactHooksPlugin.configs.recommended.rules,
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
      "prettier/prettier": "warn",
    },
  },
  {
    ...tanstackQuery.configs.recommended,
  },
];
