import { createMemo, createSignal, For, Show } from "solid-js";

import Button from "../../core/button";
import Thumbnail from "../../images/thumbnail";
import { ThumbnailType } from "../../images/thumbnail.types";
import type { CastComponent, CastMember } from "./cast.types";

const Cast: CastComponent = (props) => {
  const castPerPage = 6;
  const [castPage, setCastPage] = createSignal(1);

  const maxCast = createMemo<number>(() => {
    return castPage() * castPerPage;
  });

  const cast = createMemo<CastMember[]>(() => {
    return props.cast.filter((actor) => actor.thumbnail).slice(0, maxCast());
  });

  const castShowMore = createMemo<boolean>(() => {
    const filteredCast = props.cast.filter((actor) => actor.thumbnail);
    return maxCast() < filteredCast.length;
  });

  return (
    <>
      <ul class="grid grid-cols-6 gap-3">
        <For each={cast()}>
          {(actor) => (
            <li class="border-2 border-cyan-900 rounded-lg overflow-hidden">
              <Thumbnail
                type={ThumbnailType.Actor}
                uri={actor.thumbnail}
                alt={actor.name}
              />
            </li>
          )}
        </For>
      </ul>
      <Show when={castShowMore()}>
        <div class="my-5">
          <Button onClick={() => setCastPage((prev) => prev + 1)}>
            Show more cast...
          </Button>
        </div>
      </Show>
    </>
  );
};

export default Cast;
