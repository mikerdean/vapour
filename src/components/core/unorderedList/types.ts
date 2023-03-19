import type { FlowProps, JSX } from "solid-js";

export type OrderedListProps<T> = FlowProps<
  { each: T[] },
  (item: T, index: () => number) => JSX.Element
>;
