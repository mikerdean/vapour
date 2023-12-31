import { createSignal, Show } from "solid-js";

import createKodiImageUrl from "../../hooks/createKodiImageUrl";
import type { FanartComponent } from "./fanart.types";

const Fanart: FanartComponent = (props) => {
  const fanartUrl = createKodiImageUrl(() => props.uri);
  const [isLoaded, setIsLoaded] = createSignal(false);

  return (
    <Show when={fanartUrl()}>
      <div class="hidden sm:block absolute top-0 left-0 w-screen h-screen -z-10 opacity-10">
        <img
          src={fanartUrl()}
          alt=""
          class="object-cover w-full h-full transition-opacity opacity-0 ease-in duration-100"
          classList={{
            "opacity-100": fanartUrl() && isLoaded() ? true : false,
          }}
          onLoad={() => setIsLoaded(true)}
          data-testid="fanart"
        />
      </div>
    </Show>
  );
};

export default Fanart;
