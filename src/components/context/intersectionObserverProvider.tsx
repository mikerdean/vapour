import { createContext, createEffect, onCleanup, useContext } from "solid-js";

import type {
  IntersectionEntryCallback,
  IntersectionObserverContextType,
  IntersectionObserverProviderComponent,
} from "./intersectionObserverProvider.types";

const IntersectionObserverContext =
  createContext<IntersectionObserverContextType>(
    {} as IntersectionObserverContextType,
  );

const IntersectionObserverProvider: IntersectionObserverProviderComponent = (
  props,
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
    <IntersectionObserverContext.Provider value={{ add, remove }}>
      {props.children}
    </IntersectionObserverContext.Provider>
  );
};

const useIntersectionObserver = () => useContext(IntersectionObserverContext);

export default IntersectionObserverProvider;
export { useIntersectionObserver };
