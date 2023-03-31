import { For } from "solid-js";

import type { GridCardComponent } from "./types";

const GridCard: GridCardComponent = (props) => {
  return (
    <>
      <div>{props.title}</div>
      <For each={props.items}>
        {(item) => <div class="text-xs text-slate-400 mt-1">{item}</div>}
      </For>
    </>
  );
};

export default GridCard;
