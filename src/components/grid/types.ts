import { FlowProps, JSX } from "solid-js";

import { QueryHook } from "../../state/socket/commands/types";
import { ThumbnailType } from "../core/thumbnail/types";

export type GridItem = {
  id: string | number;
  label: string;
  thumbnail?: string;
};

export type GridProps<TRequest, TResponse, TResponseItem> = FlowProps<
  {
    fallback?: JSX.Element;
    hook: QueryHook<TRequest, TResponse>;
    selectFromResult: (response: TResponse) => TResponseItem[];
    thumbnailType: ThumbnailType;
  },
  (item: TResponseItem, index: () => number) => JSX.Element
>;
