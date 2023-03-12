import { FlowProps, JSX } from "solid-js";

export type UnorderedListProps<T> = FlowProps<
  { each: T[] },
  (item: T, index: () => number) => JSX.Element
>;
