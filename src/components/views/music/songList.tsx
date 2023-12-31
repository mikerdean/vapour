import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { For } from "solid-js";

import { getSongDuration } from "../../../utils/duration";
import FontAwesomeIcon from "../../images/fontAwesomeIcon";
import type { SongListComponent } from "./songList.types";

const SongList: SongListComponent = (props) => {
  return (
    <ol class="text-sm">
      <For each={props.songs}>
        {(song, i) => (
          <li
            class="p-2"
            classList={{
              "bg-slate-800": i() % 2 !== 0,
            }}
          >
            <div class="flex items-center">
              <button type="button" class="flex w-full">
                <span>{song.disc !== undefined && `${song.disc}.`}</span>
                <span class="mr-3">{String(song.track).padStart(2, "0")}</span>
                <span class="grow text-left mr-3">{song.title}</span>
                {song.duration && <span>{getSongDuration(song.duration)}</span>}
              </button>
              <button class="pl-3">
                <FontAwesomeIcon icon={faEllipsisVertical} />
                <span class="sr-only">Options for {song.label}</span>
              </button>
            </div>
          </li>
        )}
      </For>
    </ol>
  );
};

export default SongList;
