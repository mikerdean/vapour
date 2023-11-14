import { NavLink } from "@solidjs/router";
import { For, Show } from "solid-js";

import { isButtonTabItem, isRouteTabItem } from "./tabs.typeguards";
import type { TabsComponent } from "./tabs.types";

const Tabs: TabsComponent = (props) => {
  return (
    <nav class="overflow-x-auto">
      <ul role="tablist" class="flex">
        <For each={props.items}>
          {(item) => (
            <li role="tab" class="px-3 py-2">
              <Show when={isRouteTabItem(item) && item} keyed>
                {(routeItem) => (
                  <NavLink
                    activeClass="border-b-2 border-fuchsia-500 text-slate-100"
                    class="pb-1"
                    href={routeItem.path}
                    end={true}
                  >
                    {routeItem.label}
                  </NavLink>
                )}
              </Show>
              <Show when={isButtonTabItem(item) && item} keyed>
                {(buttonItem) => (
                  <button onClick={() => buttonItem.onClick()}>
                    {buttonItem.label}
                  </button>
                )}
              </Show>
            </li>
          )}
        </For>
      </ul>
    </nav>
  );
};

export default Tabs;
