// @ts-check
import withNuxt from "./.nuxt/eslint.config.mjs"
import prettier from "eslint-plugin-prettier"
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
}).append(
  // Добавляем конфигурацию Prettier
  eslintConfigPrettier,
  {
    plugins: {
      prettier: prettier,
    },
    rules: {
      // Это правило запускает Prettier как правило ESLint.
      // Оно опционально, но помогает увидеть ошибки форматирования как ошибки линтинга.
      "prettier/prettier": "error",
    },
  },
)
