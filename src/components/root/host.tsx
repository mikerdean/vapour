import { Show } from "solid-js";

import { useHost } from "../context/hostProvider";
import FullscreenMessage from "../core/fullscreenMessage";
import type { HostComponent } from "./host.types";
import HostForm from "./hostForm";

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
