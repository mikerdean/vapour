import { defineConfig } from "vitest/config";
import solid from "vite-plugin-solid"

export default defineConfig({
  plugins: [solid()],
  test: {
    css: true,
    environment: "jsdom",
    globals: false,
    setupFiles: ["./src/setup-tests.ts"],
  },
});
