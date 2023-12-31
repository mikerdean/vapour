import { Match, onCleanup, onMount, Switch } from "solid-js";

import { ConnectionState } from "../../socket/types";
import { useSocket } from "../context/socketProvider";
import { LoadingFullscreen } from "../core/loading";
import type { ConnectionComponent } from "./connection.types";
import ConnectionError from "./connectionError";

const Connection: ConnectionComponent = (props) => {
  const [state, { connect, disconnect }] = useSocket();

  onMount(() => {
    connect();
  });

  onCleanup(() => {
    disconnect();
  });

  return (
    <Switch fallback={<ConnectionError />}>
      <Match when={state.connectionState === ConnectionState.Connected}>
        {props.children}
      </Match>
      <Match when={state.connectionState === ConnectionState.Connecting}>
        <LoadingFullscreen textVisible={true} text="Connecting..." />
      </Match>
    </Switch>
  );
};

export default Connection;
