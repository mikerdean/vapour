import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "@solidjs/router";
import { For, JSX } from "solid-js";

import Thumbnail from "../core/thumbnail";
import FontAwesomeIcon from "../images/fontAwesomeIcon";
import { GridItem, GridProps } from "./types";
import { createUrl } from "./utils";

const Grid = function <T extends GridItem>(props: GridProps<T>): JSX.Element {
  return (
    <ol class="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-3">
      <For each={props.each}>
        {(item, i) => (
          <li class="flex flex-row items-center">
            <div class="w-20 min-w-[5rem] h-20 mr-3 border-2 border-cyan-900 rounded-lg overflow-hidden">
              <NavLink
                href={createUrl(props.thumbnailType, item.id)}
                class="flex items-center h-full"
              >
                <Thumbnail
                  uri={item.thumbnail}
                  type={props.thumbnailType}
                  alt={`Thumbnail for ${item.label}`}
                />
              </NavLink>
            </div>
            <div class="flex-grow">
              <NavLink href={createUrl(props.thumbnailType, item.id)}>
                {props.children(item, i)}
              </NavLink>
            </div>
            <div>
              <button type="button" class="p-2">
                <FontAwesomeIcon icon={faEllipsisVertical} />
                <span class="sr-only">{`Options for ${item.label}`}</span>
              </button>
            </div>
          </li>
        )}
      </For>
    </ol>
  );
};

export default Grid;
