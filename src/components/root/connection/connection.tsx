import { Match, Switch, onCleanup, onMount } from "solid-js";

import { useSocket } from "../../../state/socket";
import { ConnectionState } from "../../../state/socket/types";
import { LoadingFullscreen } from "../../core/loading";
import ConnectionError from "../connectionError";
import type { ConnectionComponent } from "./types";

const Connection: ConnectionComponent = (props) => {
  const { connect, connectionState, disconnect } = useSocket();

  onMount(() => {
    connect();
  });

  onCleanup(() => {
    disconnect();
  });

  return (
    <Switch fallback={<ConnectionError />}>
      <Match when={connectionState() === ConnectionState.Connected}>
        {props.children}
      </Match>
      <Match when={connectionState() === ConnectionState.Connecting}>
        <LoadingFullscreen textVisible={true} text="Connecting..." />
      </Match>
    </Switch>
  );
};

export default Connection;
