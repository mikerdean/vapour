import type { ParentComponent } from "solid-js";

export type IntersectionObserverProviderComponent = ParentComponent<
  Partial<IntersectionObserverInit>
>;

export type IntersectionEntryCallback = (
  entry: IntersectionObserverEntry
) => void;

export type IntersectionObserverContext = {
  add: (element: Element, callback: IntersectionEntryCallback) => void;
  remove: (element: Element) => void;
};
