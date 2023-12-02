import { useLocation, useNavigate } from "@solidjs/router";
import {
  createMemo,
  createSignal,
  For,
  onCleanup,
  onMount,
  Show,
} from "solid-js";

import { useSocket } from "../context/socketProvider";
import Thumbnail from "../images/thumbnail";
import { ThumbnailType } from "../images/thumbnail.types";
import { NowPlayingComponent, NowPlayingItem } from "./nowPlaying.types";
import { createPlayingItem } from "./nowPlaying.utils";

const NowPlaying: NowPlayingComponent = () => {
  const [, { subscribe }] = useSocket();
  const location = useLocation();
  const navigate = useNavigate();

  const [playingItem, setPlayingItem] = createSignal<
    NowPlayingItem | undefined
  >({
    id: 10000,
    metadata: [
      { title: "Album", value: "Origin" },
      { title: "Artist", value: "Evanescence" },
    ],
    title: "Where Will You Go",
    thumbnailUrl:
      "image://%2fstorage%2fflac%2fE%2fEvanescence%2f(2000)%20Origin%2fcover.jpg/",
    type: ThumbnailType.Episode,
  });

  const showNowPlaying = createMemo(
    () => playingItem() && location.pathname !== "/",
  );

  onMount(() => {
    const onPlaySubscribe = subscribe("Player.OnPlay", async (message) => {
      const item = await createPlayingItem(message.data.item);
      setPlayingItem(item);
    });

    const onStopUnsubscribe = subscribe("Player.OnStop", () => {
      setPlayingItem(undefined);
    });

    onCleanup(() => {
      onPlaySubscribe();
      onStopUnsubscribe();
    });
  });

  return (
    <Show when={showNowPlaying()}>
      <aside class="fixed bottom-20 w-full">
        <div class="flex justify-center h-full">
          <button
            class="flex items-center bg-slate-800 border border-sky-900 p-3 rounded text-left"
            onClick={() => navigate("/")}
          >
            <div class="w-12 mr-3">
              <Thumbnail
                type={playingItem()?.type || ThumbnailType.Season}
                uri={playingItem()?.thumbnailUrl}
              />
            </div>
            <div>
              <p class="text-sm">{playingItem()?.title}</p>
              <For each={playingItem()?.metadata}>
                {(item) => <p class="text-xs">{item.value}</p>}
              </For>
            </div>
          </button>
        </div>
      </aside>
    </Show>
  );
};

export default NowPlaying;
