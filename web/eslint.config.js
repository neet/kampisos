import { defineConfig } from "eslint/config";
import eslintConfigPrettier from "eslint-config-prettier/flat";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

export default defineConfig(
  nextVitals,
  nextTs,
  {
    plugins: {
      "simple-import-sort": simpleImportSort,
    },
  },
  eslintConfigPrettier,
);
