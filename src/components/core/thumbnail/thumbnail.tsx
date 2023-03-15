import { Match, Switch, createMemo } from "solid-js";

import { useHost } from "../../../state/host";
import FontAwesomeIcon from "../../images/fontAwesomeIcon";
import { ThumbnailComponent } from "./types";
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
    <figure>
      <Switch>
        <Match when={imageUrl()}>
          <img src={imageUrl()} alt={props.alt} class="w-full h-auto" />
        </Match>
        <Match when={!imageUrl()}>
          <FontAwesomeIcon
            icon={getIconByType(props.type)}
            class="max-w-full h-auto p-2"
          />
        </Match>
      </Switch>
    </figure>
  );
};

export default Thumbnail;
