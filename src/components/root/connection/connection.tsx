import { Match, Switch, onCleanup, onMount } from "solid-js";

import { ConnectionState } from "../../../socket/types";
import { useSocket } from "../../context/socketProvider";
import { LoadingFullscreen } from "../../core/loading";
import ConnectionError from "../connectionError";
import type { ConnectionComponent } from "./types";

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
