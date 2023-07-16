import { describe, expect, it } from "vitest";

import { getSongDuration, getVideoDuration } from "./duration";

describe("Duration utilities", () => {
  describe("getSongDuration", () => {
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
        const outcome = getSongDuration(input);
        expect(outcome).toEqual(expected);
      },
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
        const outcome = getSongDuration(input);
        expect(outcome).toEqual(expected);
      },
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
        const outcome = getSongDuration(input);
        expect(outcome).toEqual(expected);
      },
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
        const outcome = getSongDuration(input);
        expect(outcome).toEqual(expected);
      },
    );
  });

  describe("getVideoDuration", () => {
    it.each([
      [1, "1 sec"],
      [5, "5 secs"],
      [17, "17 secs"],
      [28, "28 secs"],
      [30, "30 secs"],
      [59, "59 secs"],
    ])(
      "returns a simplified value for values under 60 seconds (%d)",
      (input, expected) => {
        const outcome = getVideoDuration(input);
        expect(outcome).toEqual(expected);
      },
    );
  });

  it.each([
    [60, "1 min"],
    [120, "2 mins"],
    [180, "3 mins"],
    [240, "4 mins"],
    [300, "5 mins"],
    [600, "10 mins"],
    [1500, "25 mins"],
  ])("should render exact minute counts (%d)", (input, expected) => {
    const outcome = getVideoDuration(input);
    expect(outcome).toEqual(expected);
  });

  it.each([
    [76, "1 min and 16 secs"],
    [155, "2 mins and 35 secs"],
    [203, "3 mins and 23 secs"],
    [292, "4 mins and 52 secs"],
    [341, "5 mins and 41 secs"],
    [601, "10 mins and 1 sec"],
    [1530, "25 mins and 30 secs"],
  ])(
    "should render minute counts and seconds counts (%d)",
    (input, expected) => {
      const outcome = getVideoDuration(input);
      expect(outcome).toEqual(expected);
    },
  );

  it.each([
    [3600, "1 hr"],
    [3660, "1 hr and 1 min"],
    [3720, "1 hr and 2 mins"],
    [3735, "1 hr and 2 mins"],
    [7200, "2 hrs"],
    [7260, "2 hrs and 1 min"],
    [7320, "2 hrs and 2 mins"],
    [7335, "2 hrs and 2 mins"],
    [82800, "23 hrs"],
    [86400, "24 hrs"],
  ])(
    "should render rounded hour and minutes counts when a time exceeds an hour (%d)",
    (input, expected) => {
      const outcome = getVideoDuration(input);
      expect(outcome).toEqual(expected);
    },
  );
});
