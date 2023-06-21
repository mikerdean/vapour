import { renderHook } from "@solidjs/testing-library";
import { createSignal } from "solid-js";
import { describe, expect, it } from "vitest";

import { KodiMessageLimitsReturned } from "../../socket/types";
import useGridData from "./useGridData";

type TestItem = {
  id: number;
  title: string;
  description: string;
};

type TestData = {
  items: TestItem[];
  limits: KodiMessageLimitsReturned;
};

describe("useGridData hook", () => {
  it("should return an empty array with no result data", () => {
    const [data] = createSignal<TestData | undefined>(undefined);

    const { result } = renderHook(() =>
      useGridData(
        data,
        (data) => data.items,
        (item) => ({ ...item, id: item.id, label: item.title })
      )
    );

    const [filtered, total] = result;
    expect(filtered()).toEqual([]);
    expect(total()).toEqual(0);
  });

  it("should return a correctly mapped result", () => {
    const [data] = createSignal<TestData>({
      items: [
        {
          id: 1,
          title: "Some movie #1",
          description: "A movie about something awful.",
        },
        {
          id: 2,
          title: "Some movie #2",
          description: "A movie about something cool.",
        },
        {
          id: 3,
          title: "Some movie #3",
          description: "A movie about something shameful.",
        },
      ],
      limits: {
        start: 0,
        end: 3,
        total: 3,
      },
    });

    const { result } = renderHook(() =>
      useGridData(
        data,
        (data) => data.items,
        (item) => ({ ...item, id: item.id, label: item.title, played: true })
      )
    );

    const [filtered, total] = result;
    expect(filtered()).toEqual([
      {
        id: 1,
        title: "Some movie #1",
        label: "Some movie #1",
        played: true,
        description: "A movie about something awful.",
      },
      {
        id: 2,
        title: "Some movie #2",
        label: "Some movie #2",
        played: true,
        description: "A movie about something cool.",
      },
      {
        id: 3,
        title: "Some movie #3",
        label: "Some movie #3",
        played: true,
        description: "A movie about something shameful.",
      },
    ]);
    expect(total()).toEqual(3);
  });
});
