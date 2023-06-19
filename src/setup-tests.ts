import { cleanup } from "@solidjs/testing-library";
import matchers from "@testing-library/jest-dom/matchers";
import { afterEach, expect, vi } from "vitest";

import {
  MockIntersectionObserver,
  resetIntersectionMocking,
} from "./utils/intersectionObserver";

expect.extend(matchers);

vi.stubGlobal("IntersectionObserver", MockIntersectionObserver);

afterEach(() => {
  cleanup();
  resetIntersectionMocking();
});
