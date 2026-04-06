import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
    ],
  }, {
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',        // Allow using `any`
      '@typescript-eslint/no-unused-vars': ['warn', {
        argsIgnorePattern: '^_',                           // Ignore variables starting with _
        varsIgnorePattern: '^_'
      }],
      'prefer-const': 'warn',                             // Prefer using const
      'no-var': 'warn',                                   // Don't use var
    }
  },
];

export default eslintConfig;
