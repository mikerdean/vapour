import "@testing-library/jest-dom/vitest";

import { cleanup } from "@solidjs/testing-library";
import { afterEach, vi } from "vitest";

import {
  MockIntersectionObserver,
  resetIntersectionMocking,
} from "./utils/intersectionObserver";

vi.stubGlobal("IntersectionObserver", MockIntersectionObserver);

afterEach(() => {
  cleanup();
  resetIntersectionMocking();
});
