import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { For } from "solid-js";

import { getTextDuration } from "../../../../utils/duration";
import FontAwesomeIcon from "../../../images/fontAwesomeIcon";
import { SongListComponent } from "./types";

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
                <span class="grow-0">
                  {song.disc !== undefined && `${song.disc}.`}
                </span>
                <span class="grow-0 mr-2">
                  {String(song.track).padStart(2, "0")}
                </span>
                <span class="grow text-left">{song.title}</span>
                {song.duration && <span>{getTextDuration(song.duration)}</span>}
              </button>
              <button class="pl-3">
                <FontAwesomeIcon icon={faEllipsisVertical} />
              </button>
            </div>
          </li>
        )}
      </For>
    </ol>
  );
};

export default SongList;
