import { For } from "solid-js";

import type { GridCardComponent } from "./gridCard.types";

const GridCard: GridCardComponent = (props) => {
  return (
    <>
      <div class="line-clamp-2">{props.title}</div>
      <For each={props.items}>
        {(item) => <div class="text-xs text-slate-400 mt-1">{item}</div>}
      </For>
    </>
  );
};

export default GridCard;
