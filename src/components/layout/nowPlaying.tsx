import { faPlayCircle } from "@fortawesome/free-solid-svg-icons";
import { useLocation, useNavigate } from "@solidjs/router";
import { createMemo, For, Show } from "solid-js";

import { usePlayer } from "../context/playerProvider";
import FontAwesomeIcon from "../images/fontAwesomeIcon";
import Thumbnail from "../images/thumbnail";
import { ThumbnailType } from "../images/thumbnail.types";
import type { NowPlayingComponent } from "./nowPlaying.types";

const NowPlaying: NowPlayingComponent = () => {
  const [player] = usePlayer();
  const location = useLocation();
  const navigate = useNavigate();

  const showNowPlaying = createMemo(
    () => player.item && location.pathname !== "/",
  );

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
                type={player.item?.type || ThumbnailType.Season}
                uri={player.item?.thumbnailUrl}
              />
            </div>
            <div>
              <p class="line-clamp-1">{player.item?.title}</p>
              <For each={player.item?.metadata}>
                {(metadata) => (
                  <p class="line-clamp-1 text-slate-400 text-xs">
                    {metadata.value}
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
