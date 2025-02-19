import parser from "@typescript-eslint/parser";
import plugin from "@typescript-eslint/eslint-plugin";

export default [
  {
    // Files and extensions to validate
    files: [
      "src/**/*.{js,mjs,cjs,ts,tsx}",
      "tests/**/*.{ts,js}",
      "data/**/*.{ts,js}",
      "helpers/**/*.{ts,js}",
    ],
    languageOptions: {
      parser: parser,
      parserOptions: {
        project: true,
        tsconfigRootDir: ".",
      },
    },
    plugins: {
      "@typescript-eslint": plugin,
    },
    rules: {
      "@typescript-eslint/no-unused-expressions": "error",
      "@typescript-eslint/no-unused-vars": "error",
      "@typescript-eslint/naming-convention": [
        "error",
        { selector: "variable", format: ["camelCase"] },
        { selector: "method", format: ["camelCase"] },
        { selector: "class", format: ["PascalCase"] },
      ],
      indent: ["error", 2],
    },
  },
];
