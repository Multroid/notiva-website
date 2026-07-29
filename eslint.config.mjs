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
      "archive/**",          // Pre-launch: not built or served (see archive/README.md)
      "tailwind.config.js",  // Config file uses CommonJS require
      "postcss.config.mjs",  // Config file
    ],
  },
  {
    files: ['**/src/lib/middleware/api-helpers.ts', '**/src/lib/middleware/plan-enforcement.ts', '**/src/lib/webhook-logger.ts', '**/src/lib/stripe-webhook-handlers.ts', '**/src/app/admin/users/*/page.tsx', '**/src/app/api/admin/users/*/stripe/route.ts', '**/src/app/dashboard/settings/billing/page.tsx'],
    rules: {
      // Allow 'any' type in middleware helpers and admin pages where Next.js/Stripe framework compatibility requires it
      '@typescript-eslint/no-explicit-any': 'off',
      // Allow unused variables with underscore prefix (e.g., _req for required API signatures)
      '@typescript-eslint/no-unused-vars': ['error', { 
        'argsIgnorePattern': '^_',
        'varsIgnorePattern': '^_'
      }],
    },
  },
];

export default eslintConfig;
