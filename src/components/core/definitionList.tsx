import { For } from "solid-js";

import type { DefinitionListComponent } from "./definitionList.types";

const DefinitionList: DefinitionListComponent = (props) => {
  return (
    <dl
      aria-label={props.label}
      class="grid grid-cols-2 md:grid-cols-4 mb-2"
      role="list"
    >
      <For each={props.each}>
        {(item) => (
          <>
            <dt class="font-bold" role="listitem">
              {item.header}
            </dt>
            <dd class="md:col-span-3">{item.description}</dd>
          </>
        )}
      </For>
    </dl>
  );
};

export default DefinitionList;
