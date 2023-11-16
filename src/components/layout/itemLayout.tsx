import { Show } from "solid-js";
import Heading from "../core/heading";
import type { ItemLayoutComponent } from "./itemLayout.types";
import Thumbnail from "../core/thumbnail";

const ItemLayout: ItemLayoutComponent = (props) => {
  return (
    <div>
      <Show when={props.backgroundArtUrl}>
        <div class="hidden sm:block absolute top-0 left-0 w-screen h-screen -z-10 opacity-10">
          <img
            src={props.backgroundArtUrl}
            alt=""
            class="object-cover w-full h-full"
          />
        </div>
      </Show>
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
