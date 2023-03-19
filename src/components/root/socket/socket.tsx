import { Match, Switch, onCleanup, onMount } from "solid-js";

import { useSocket } from "../../../state/socket";
import { ConnectionState } from "../../../state/socket/types";
import { LoadingFullscreen } from "../../core/loading";
import SocketError from "../socketError";
import type { SocketComponent } from "./types";

const Socket: SocketComponent = (props) => {
  const { connect, connectionState, disconnect } = useSocket();

  onMount(() => {
    connect();
  });

  onCleanup(() => {
    disconnect();
  });

  return (
    <Switch fallback={<SocketError />}>
      <Match when={connectionState() === ConnectionState.Connected}>
        {props.children}
      </Match>
      <Match when={connectionState() === ConnectionState.Connecting}>
        <LoadingFullscreen textVisible={true} text="Connecting..." />
      </Match>
    </Switch>
  );
};

export default Socket;
