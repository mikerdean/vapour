import { For, Show, createMemo, createSignal } from "solid-js";
import type { CastComponent, CastMember } from "./cast.types";
import Thumbnail from "../../core/thumbnail";
import { ThumbnailType } from "../../core/thumbnail.types";
import Button from "../../core/button";

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
      <div class="grid grid-cols-6 gap-3">
        <For each={cast()}>
          {(actor) => (
            <div class="border-2 border-cyan-900 rounded-lg overflow-hidden">
              <Thumbnail
                type={ThumbnailType.Actor}
                uri={actor.thumbnail}
                alt={actor.name}
              />
            </div>
          )}
        </For>
      </div>
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
