import solid from "vite-plugin-solid";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [solid()],
  test: {
    css: true,
    deps: {
      optimizer: {
        web: {
          enabled: false,
        },
      },
    },
    environment: "jsdom",
    globals: false,
    setupFiles: ["./src/setup-tests.ts"],
  },
});
