import { describe, expect, it } from "vitest";

import { getTextDuration } from "./duration";

describe("Duration utilities", () => {
  describe("getTextDuration", () => {
    it.each([
      [1, "1s"],
      [5, "5s"],
      [17, "17s"],
      [28, "28s"],
      [30, "30s"],
      [59, "59s"],
    ])(
      "returns a simplified value for values under 60 seconds (%d)",
      (input, expected) => {
        const outcome = getTextDuration(input);
        expect(outcome).toEqual(expected);
      }
    );

    it.each([
      [60, "01:00"],
      [120, "02:00"],
      [180, "03:00"],
      [240, "04:00"],
      [300, "05:00"],
      [600, "10:00"],
      [1500, "25:00"],
    ])(
      "should render exact minute counts with correct padding (%d)",
      (input, expected) => {
        const outcome = getTextDuration(input);
        expect(outcome).toEqual(expected);
      }
    );

    it.each([
      [66, "01:06"],
      [70, "01:10"],
      [82, "01:22"],
      [128, "02:08"],
      [139, "02:19"],
      [603, "10:03"],
      [624, "10:24"],
      [1505, "25:05"],
      [1520, "25:20"],
    ])(
      "should render exact minute and second counts with correct padding (%d)",
      (input, expected) => {
        const outcome = getTextDuration(input);
        expect(outcome).toEqual(expected);
      }
    );

    it.each([
      [3600, "01:00:00"],
      [3660, "01:01:00"],
      [3735, "01:02:15"],
      [7200, "02:00:00"],
      [82800, "23:00:00"],
      [86400, "24:00:00"],
    ])(
      "should render exact hour, minute and second counts with correct padding",
      (input, expected) => {
        const outcome = getTextDuration(input);
        expect(outcome).toEqual(expected);
      }
    );
  });
});
