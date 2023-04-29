import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "@solidjs/router";
import { For, JSX, createMemo } from "solid-js";

import Thumbnail from "../core/thumbnail";
import { ThumbnailType } from "../core/thumbnail/types";
import FontAwesomeIcon from "../images/fontAwesomeIcon";
import type { GridItem, GridProps } from "./types";
import { createUrl } from "./utils";

const Grid = <T extends GridItem>(props: GridProps<T>): JSX.Element => {
  const tallThumbnail = createMemo(() => {
    const type = props.thumbnailType;

    return (
      type === ThumbnailType.Movie ||
      type === ThumbnailType.MovieSet ||
      type === ThumbnailType.Season ||
      type === ThumbnailType.TVShow
    );
  });

  return (
    <ol class="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-3">
      <For each={props.each}>
        {(item, i) => (
          <li>
            <NavLink
              class="flex flex-row items-center"
              href={createUrl(props.thumbnailType, item.id)}
            >
              <div
                class="w-20 min-w-[5rem] h-20 mr-3 border-2 border-cyan-900 rounded-lg overflow-hidden"
                classList={{
                  "h-20": !tallThumbnail(),
                  "h-28": tallThumbnail(),
                }}
              >
                <div class="flex items-center h-full">
                  <Thumbnail
                    alt={""}
                    played={item.played}
                    type={props.thumbnailType}
                    uri={item.thumbnail}
                  />
                </div>
              </div>
              <div class="flex-grow">{props.children(item, i)}</div>
              <div>
                <button
                  type="button"
                  class="p-2"
                  onClick={(e) => {
                    e.preventDefault();
                  }}
                >
                  <FontAwesomeIcon icon={faEllipsisVertical} />
                  <span class="sr-only">{`Options for ${item.label}`}</span>
                </button>
              </div>
            </NavLink>
          </li>
        )}
      </For>
    </ol>
  );
};

export default Grid;
