import { Accessor, createMemo } from "solid-js";

import type { KodiMessageLimitsReturned } from "../../socket/types";
import type { GridItemOf } from "./grid.types";

const useGridData = <T extends { limits: KodiMessageLimitsReturned }, TItem>(
  data: Accessor<T | undefined>,
  select: (data: T) => TItem[],
  transform: (item: TItem) => GridItemOf<TItem>,
): [Accessor<GridItemOf<TItem>[]>, Accessor<number>] => {
  const emptyArray: GridItemOf<TItem>[] = [];

  const filtered = createMemo<GridItemOf<TItem>[]>(() => {
    const result = data();
    if (!result) {
      return emptyArray;
    }

    const selected = select(result);
    if (!selected) {
      return emptyArray;
    }

    return selected.map(transform);
  });

  const total = createMemo<number>(() => {
    const result = data();
    if (!result) {
      return 0;
    }

    return result.limits.total;
  });

  return [filtered, total];
};

export default useGridData;
