import { describe, expect, it } from "vitest";

import { serialize } from "./serialize";

describe("Serialize utility", () => {
  it.each([
    ["a", `"a"`],
    ["bb", `"bb"`],
    ["ccc", `"ccc"`],
    ["dddd", `"dddd"`],
    ["eeeee", `"eeeee"`],
  ])("should serialize a string (%s)", (input: string, expected: string) => {
    const result = serialize(input);
    expect(result).toEqual(expected);
  });

  it.each([
    [1, "1"],
    [100, "100"],
    [10000, "10000"],
    [1234567, "1234567"],
  ])("should serialize an integer (%i)", (input: number, expected: string) => {
    const result = serialize(input);
    expect(result).toEqual(expected);
  });

  it.each([
    [1.2345, "1.2345"],
    [532.23214, "532.23214"],
    [43454.23423453, "43454.23423453"],
    [743.1, "743.1"],
  ])(
    "should serialize a floating point number (%f)",
    (input: number, expected: string) => {
      const result = serialize(input);
      expect(result).toEqual(expected);
    },
  );

  it.each([
    [false, "false"],
    [true, "true"],
  ])("should serialize a boolean (%s)", (input: boolean, expected: string) => {
    const result = serialize(input);
    expect(result).toEqual(expected);
  });

  it("should serialize an object with a single string key", () => {
    const result = serialize({ test: "value" });
    const expected = `{"test":"value"}`;
    expect(result).toEqual(expected);
  });

  it("should serialize an object with multiple string keys and put the keys in the correct order", () => {
    const result = serialize({ test2: "value2", test1: "value1" });
    const expected = `{"test1":"value1","test2":"value2"}`;
    expect(result).toEqual(expected);
  });

  it("should serialize an object within an object and put the keys in the correct order", () => {
    const result = serialize({
      test2: "value2",
      test3: { test4: "value4", test5: "value5" },
      test1: "value1",
    });

    const expected = `{"test1":"value1","test2":"value2","test3":{"test4":"value4","test5":"value5"}}`;
    expect(result).toEqual(expected);
  });

  it("should serialize an object within an array and put the keys in the correct order", () => {
    const result = serialize([
      { test4: false, test1: true, test3: true },
      null,
      { test2: true, test3: true, test1: false },
    ]);

    const expected = `[{"test1":true,"test3":true,"test4":false},null,{"test1":false,"test2":true,"test3":true}]`;
    expect(result).toEqual(expected);
  });
});
