import { For } from "solid-js";

import type { DefinitionListComponent } from "./definitionList.types";

const DefinitionList: DefinitionListComponent = (props) => {
  return (
    <dl aria-label={props.label} class="grid grid-cols-2 mb-3" role="list">
      <For each={props.each}>
        {(item) => (
          <>
            <dt class="font-bold" role="listitem">
              {item.header}
            </dt>
            <dd>{item.description}</dd>
          </>
        )}
      </For>
    </dl>
  );
};

export default DefinitionList;
