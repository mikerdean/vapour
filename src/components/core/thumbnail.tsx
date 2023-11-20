import { createSignal, onCleanup, onMount, Show } from "solid-js";

import createKodiImageUrl from "../../hooks/createKodiImageUrl";
import { useIntersectionObserver } from "../context/intersectionObserverProvider";
import FontAwesomeIcon from "../images/fontAwesomeIcon";
import type { ThumbnailComponent } from "./thumbnail.types";
import { getIconByType } from "./thumbnail.utils";
import ThumbnailPlayed from "./thumbnailPlayed";

const Thumbnail: ThumbnailComponent = (props) => {
  let el: HTMLDivElement | undefined;

  const { add, remove } = useIntersectionObserver();

  const [isLoaded, setIsLoaded] = createSignal(false);

  const [isVisible, setIsVisible] = createSignal(false, {
    equals(prev, next) {
      if (prev) {
        return true;
      }

      return next === prev;
    },
  });

  const imageUrl = createKodiImageUrl(() => props.uri);

  onMount(() => {
    if (el) {
      add(el, (entry) => {
        setIsVisible(entry.isIntersecting);
      });
    }
  });

  onCleanup(() => {
    if (el) {
      remove(el);
    }
  });

  return (
    <Show
      when={imageUrl()}
      fallback={
        <>
          <FontAwesomeIcon
            class="max-w-full h-auto p-2"
            icon={getIconByType(props.type)}
          />
          <Show when={props.played}>
            <div class="relative w-full h-full" title="Played">
              <ThumbnailPlayed />
            </div>
          </Show>
        </>
      }
    >
      <div
        ref={el}
        class="relative"
        data-testid="thumbnail-placeholder"
        title={props.played ? "Played" : undefined}
      >
        <img
          src={isVisible() ? imageUrl() : undefined}
          alt={props.alt}
          class="w-full h-auto transition-opacity opacity-0 ease-in duration-300"
          classList={{
            "opacity-100": isVisible() && isLoaded(),
          }}
          onLoad={() => setIsLoaded(true)}
        />
        <Show when={props.played}>
          <ThumbnailPlayed />
        </Show>
      </div>
    </Show>
  );
};

export default Thumbnail;
