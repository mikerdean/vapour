import { Show, createMemo } from "solid-js";

import { useHost } from "../../../state/host";
import FontAwesomeIcon from "../../images/fontAwesomeIcon";
import ThumbnailPlayed from "./thumbnailPlayed";
import type { ThumbnailComponent } from "./types";
import { getIconByType } from "./utils";

const Thumbnail: ThumbnailComponent = (props) => {
  const { httpUrl } = useHost();

  const imageUrl = createMemo<string | undefined>(() => {
    const baseUrl = httpUrl();
    if (!baseUrl || !props.uri) {
      return;
    }

    const encoded = encodeURIComponent(props.uri);
    const url = new URL(`image/${encoded}`, baseUrl);
    return url.toString();
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
      <div class="relative">
        <img src={imageUrl()} alt={props.alt} class="w-full h-auto" />
        {props.played && <ThumbnailPlayed />}
      </div>
    </Show>
  );
};

export default Thumbnail;
