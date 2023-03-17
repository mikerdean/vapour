import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { delay } from "./delay";

beforeEach(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  vi.useRealTimers();
});

describe("delay utility", () => {
  it.each([0, 1, 5, 25, 100, 150, 250, 500, 750, 1000, 10000, 100000])(
    "should delay execution by %d milliseconds",
    async (ms) => {
      const promise = delay(ms);
      let delayed = false;

      promise.then(() => (delayed = true));

      await vi.advanceTimersByTimeAsync(ms);
      expect(delayed).toEqual(true);
    }
  );
});
