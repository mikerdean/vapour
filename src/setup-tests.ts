import "./i18n";

import { cleanup } from "@solidjs/testing-library";
import matchers from "@testing-library/jest-dom/matchers";
import { afterEach, expect } from "vitest";

expect.extend(matchers);

afterEach(() => {
  cleanup();
});
