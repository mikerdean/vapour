import { For, JSX } from "solid-js";

import type { UnorderedListProps } from "./types";

const OrderedList = function <T>(props: UnorderedListProps<T>): JSX.Element {
  return (
    <ol class="list-decimal list-inside ml-2">
      <For each={props.each}>
        {(item, i) => <li class="mb-1">{props.children(item, i)}</li>}
      </For>
    </ol>
  );
};

export default OrderedList;
