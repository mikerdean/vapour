import { Match, Switch, onMount } from "solid-js";

import { useSocket } from "../../../state/socket";
import { ConnectionState } from "../../../state/socket/types";
import FullscreenMessage from "../../core/fullscreenMessage";
import SocketError from "../socketError";
import { SocketComponent } from "./types";

const Socket: SocketComponent = (props) => {
  const { connect, connectionState } = useSocket();

  onMount(() => {
    connect();
  });

  return (
    <Switch fallback={<SocketError />}>
      <Match when={connectionState() === ConnectionState.Connected}>
        {props.children}
      </Match>
      <Match when={connectionState() === ConnectionState.Connecting}>
        <FullscreenMessage>
          <span>Connecting...</span>
        </FullscreenMessage>
      </Match>
    </Switch>
  );
};

export default Socket;
