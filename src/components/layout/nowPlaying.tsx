import { faPlayCircle } from "@fortawesome/free-solid-svg-icons";
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
import FontAwesomeIcon from "../images/fontAwesomeIcon";
import Thumbnail from "../images/thumbnail";
import { ThumbnailType } from "../images/thumbnail.types";
import type { NowPlayingComponent, NowPlayingItem } from "./nowPlaying.types";
import { createPlayingItem } from "./nowPlaying.utils";

const NowPlaying: NowPlayingComponent = () => {
  const [, methods] = useSocket();
  const location = useLocation();
  const navigate = useNavigate();

  const [playingItem, setPlayingItem] = createSignal<
    NowPlayingItem | undefined
  >();

  const showNowPlaying = createMemo(
    () => playingItem() && location.pathname !== "/",
  );

  const getCurrentPlayingItemOnMount = async (): Promise<void> => {
    const players = await methods.getActivePlayers();
    if (players.length === 0) {
      return;
    }

    const { item } = await methods.getPlayerItem(players[0].playerid);
    const playingItem = await createPlayingItem(methods, item);
    setPlayingItem(playingItem);
  };

  onMount(() => {
    getCurrentPlayingItemOnMount();

    const subscriptions = [
      methods.subscribe("Player.OnPlay", async (message) => {
        const item = await createPlayingItem(methods, message.data.item);
        setPlayingItem(item);
      }),
      methods.subscribe("Player.OnStop", () => {
        setPlayingItem(undefined);
      }),
    ];

    onCleanup(() => {
      for (const unsubcribe of subscriptions) {
        unsubcribe();
      }
    });
  });

  return (
    <Show when={showNowPlaying()}>
      <aside class="fixed bottom-20 w-full">
        <div class="flex justify-center h-full">
          <button
            class="flex items-center bg-slate-800 border-2 border-sky-900 p-3 pt-5 rounded text-left min-w-[16rem] transition-colors"
            onClick={() => navigate("/")}
          >
            <div class="absolute bg-slate-900 border-2 border-inherit rounded pl-2 pr-4 text-xs top-[-.5rem] text-cyan-400 font-semibold">
              <FontAwesomeIcon icon={faPlayCircle} class="mr-2" />
              Now Playing
            </div>
            <div class="flex-none w-12 mr-3">
              <Thumbnail
                type={playingItem()?.type || ThumbnailType.Season}
                uri={playingItem()?.thumbnailUrl}
              />
            </div>
            <div>
              <p class="line-clamp-1">{playingItem()?.title}</p>
              <For each={playingItem()?.metadata}>
                {(item) => (
                  <p class="line-clamp-1 text-slate-400 text-xs">
                    {item.value}
                  </p>
                )}
              </For>
            </div>
          </button>
        </div>
      </aside>
    </Show>
  );
};

export default NowPlaying;
