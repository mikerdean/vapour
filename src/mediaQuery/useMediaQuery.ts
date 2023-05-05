import { Accessor, createSignal, onCleanup, onMount } from "solid-js";

const useMediaQuery = (query: string): [Accessor<boolean>] => {
  const mediaQuery = window.matchMedia(query);
  const [isMatching, setIsMatching] = createSignal(mediaQuery.matches);

  const mediaQueryCallback = (event: MediaQueryListEvent): void => {
    setIsMatching(event.matches);
  };

  onMount(() => {
    mediaQuery.addEventListener("change", mediaQueryCallback);
  });

  onCleanup(() => {
    mediaQuery.removeEventListener("change", mediaQueryCallback);
  });

  return [isMatching];
};

export default useMediaQuery;
