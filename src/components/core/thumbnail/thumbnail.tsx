import { Show, createMemo, createSignal, onCleanup, onMount } from "solid-js";

import { useHost } from "../../context/hostProvider";
import { useIntersectionObserver } from "../../context/intersectionObserverProvider";
import FontAwesomeIcon from "../../images/fontAwesomeIcon";
import ThumbnailPlayed from "./thumbnailPlayed";
import type { ThumbnailComponent } from "./types";
import { getIconByType } from "./utils";

const Thumbnail: ThumbnailComponent = (props) => {
  let el: HTMLDivElement | undefined;

  const [host] = useHost();
  const { add, remove } = useIntersectionObserver();
  const [isVisible, setIsVisible] = createSignal(false, {
    equals(prev, next) {
      if (prev) {
        return true;
      }

      return next === prev;
    },
  });

  const imageUrl = createMemo<string | undefined>(() => {
    const baseUrl = host.httpUrl;
    if (!baseUrl || !props.uri) {
      return;
    }

    const encoded = encodeURIComponent(props.uri);
    const url = new URL(`image/${encoded}`, baseUrl);
    return url.toString();
  });

  onMount(() => {
    if (!el) {
      return;
    }

    add(el, (entry) => {
      setIsVisible(entry.isIntersecting);
    });
  });

  onCleanup(() => {
    if (!el) {
      return;
    }

    remove(el);
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
          {props.played && (
            <div class="relative w-full h-full">
              <ThumbnailPlayed />
            </div>
          )}
        </>
      }
    >
      <div ref={el} class="relative">
        <img
          src={isVisible() ? imageUrl() : undefined}
          alt={props.alt}
          class="w-full h-auto"
        />
        {props.played && <ThumbnailPlayed />}
      </div>
    </Show>
  );
};

export default Thumbnail;
