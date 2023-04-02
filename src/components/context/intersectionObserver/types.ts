import { ParentComponent } from "solid-js";

export type IntersectionObserverProviderComponent = ParentComponent;

export type IntersectionEntryCallback = (
  entry: IntersectionObserverEntry
) => void;

export type IntersectionObserverContext = {
  add: (element: Element, callback: IntersectionEntryCallback) => void;
  remove: (element: Element) => void;
};
