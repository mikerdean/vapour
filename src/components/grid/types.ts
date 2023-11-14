import type { FlowProps, JSX } from "solid-js";

import type { ThumbnailType } from "../core/thumbnail.types";

export type GridItem = {
  id: string | number;
  label: string;
  played?: boolean;
  thumbnail?: string;
};

export type GridItemOf<T> = GridItem & T;

export type GridProps<T> = FlowProps<
  {
    each: T[];
    thumbnailType: ThumbnailType;
  },
  (item: T, index: () => number) => JSX.Element
>;
