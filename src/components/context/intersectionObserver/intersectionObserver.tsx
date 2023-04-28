import { createContext, createEffect, onCleanup, useContext } from "solid-js";

import type {
  IntersectionEntryCallback,
  IntersectionObserverContext,
  IntersectionObserverProviderComponent,
} from "./types";

const intersectionObserverContext = createContext<IntersectionObserverContext>({
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

  let observer: IntersectionObserver;

  createEffect(() => {
    observer = new IntersectionObserver(observerCallback, props);

    onCleanup(() => {
      observer.disconnect();
    });
  });

  const add = (element: Element, callback: IntersectionEntryCallback): void => {
    observer.observe(element);
    elementMap.set(element, callback);
  };

  const remove = (element: Element): void => {
    observer.unobserve(element);
    elementMap.delete(element);
  };

  return (
    <intersectionObserverContext.Provider value={{ add, remove }}>
      {props.children}
    </intersectionObserverContext.Provider>
  );
};

const useIntersectionObserver = () => useContext(intersectionObserverContext);

export default IntersectionObserverProvider;
export { useIntersectionObserver };
