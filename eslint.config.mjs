// @ts-check
import withNuxt from "./.nuxt/eslint.config.mjs"
import eslintConfigPrettier from "eslint-config-prettier"

export default withNuxt({
  ignores: [
    "**/node_modules/**",
    "**/dist/**",
    "**/.nuxt/**",
    "**/.output/**",
    // Конфигурационные файлы
    "*.config.js",
    "*.config.ts",
    "tailwind.config.js",
    // Библиотечные компоненты
    "app/components/ui/**",
    "app/lib/**",
  ],
}).append(eslintConfigPrettier)
