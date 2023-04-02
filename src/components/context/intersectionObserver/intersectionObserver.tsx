import { createContext, onCleanup, useContext } from "solid-js";

import type {
  IntersectionEntryCallback,
  IntersectionObserverContext,
  IntersectionObserverProviderComponent,
} from "./types";

const IntersectionObserverContext = createContext<IntersectionObserverContext>({
  add() {
    // do nothing,
  },
  remove() {
    // do nothing
  },
});

const IntersectionObserverProvider: IntersectionObserverProviderComponent = (
  props
) => {
  const elementMap = new WeakMap<Element, IntersectionEntryCallback>();

  const observerCallback = (entries: IntersectionObserverEntry[]): void => {
    for (const entry of entries) {
      const mapped = elementMap.get(entry.target);
      if (mapped) {
        mapped(entry);
      }
    }
  };

  const observer = new IntersectionObserver(observerCallback);

  const add = (element: Element, callback: IntersectionEntryCallback): void => {
    observer.observe(element);
    elementMap.set(element, callback);
  };

  const remove = (element: Element): void => {
    observer.unobserve(element);
    elementMap.delete(element);
  };

  onCleanup(() => {
    observer.disconnect();
  });

  return (
    <IntersectionObserverContext.Provider value={{ add, remove }}>
      {props.children}
    </IntersectionObserverContext.Provider>
  );
};

const useIntersectionObserver = () => useContext(IntersectionObserverContext);

export default IntersectionObserverProvider;
export { useIntersectionObserver };
