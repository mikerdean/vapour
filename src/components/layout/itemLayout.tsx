import { Show } from "solid-js";

import Heading from "../core/heading";
import Fanart from "../images/fanart";
import Thumbnail from "../images/thumbnail";
import type { ItemLayoutComponent } from "./itemLayout.types";

const ItemLayout: ItemLayoutComponent = (props) => {
  return (
    <div>
      <Fanart uri={props.backgroundArtUrl} />
      <Heading level={1}>{props.title}</Heading>
      <div class="sm:flex">
        <Show when={props.thumbnailUrl}>
          <div class="mb-5 sm:mr-5 sm:max-w-sm">
            <Thumbnail
              type={props.thumbnailType}
              uri={props.thumbnailUrl}
              alt=""
            />
          </div>
        </Show>
        <div class="w-full max-w-lg">{props.children}</div>
      </div>
    </div>
  );
};

export default ItemLayout;
