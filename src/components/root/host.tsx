import { Show } from "solid-js";

import { useHost } from "../context/hostProvider";
import FullscreenMessage from "../core/fullscreenMessage";
import HostForm from "./hostForm";
import type { HostComponent } from "./host.types";

const Host: HostComponent = (props) => {
  const [state] = useHost();

  return (
    <Show
      when={state.host}
      fallback={
        <FullscreenMessage>
          <HostForm />
        </FullscreenMessage>
      }
    >
      {props.children}
    </Show>
  );
};

export default Host;
