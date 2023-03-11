import { Show } from "solid-js";

import { useHost } from "../../../state/host";
import FullscreenMessage from "../../core/fullscreenMessage";
import HostForm from "../hostForm";
import { HostComponent } from "./types";

const Host: HostComponent = (props) => {
  const { host } = useHost();

  return (
    <Show
      when={host()}
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
