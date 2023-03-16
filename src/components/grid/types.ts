import { FlowProps, JSX } from "solid-js";

import { ThumbnailType } from "../core/thumbnail/types";

export type GridItem = {
  id: string | number;
  label: string;
  thumbnail?: string;
};

export type GridItemOf<T> = GridItem & T;

export type GridProps<T> = FlowProps<
  {
    each: T[];
    fallback?: JSX.Element;
    thumbnailType: ThumbnailType;
  },
  (item: T, index: () => number) => JSX.Element
>;
