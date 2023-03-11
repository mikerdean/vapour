import { ParentComponent, Show } from "solid-js";

import FullscreenMessage from "../../core/fullscreenMessage";

const Host: ParentComponent = (props) => {
  const host = null;

  return (
    <Show
      when={host}
      fallback={
        <FullscreenMessage>
          <p>Add a connection</p>
        </FullscreenMessage>
      }
    >
      {props.children}
    </Show>
  );
};

export default Host;
