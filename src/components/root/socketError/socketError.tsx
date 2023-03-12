import { Show } from "solid-js";

import { useHost } from "../../../state/host";
import { useSocket } from "../../../state/socket";
import Button from "../../core/button";
import FullscreenMessage from "../../core/fullscreenMessage";
import Heading from "../../core/heading";
import OrderedList from "../../core/orderedList";
import { SocketErrorComponent } from "./types";

const SocketError: SocketErrorComponent = () => {
  const { host, setHost } = useHost();
  const { reconnect } = useSocket();

  return (
    <FullscreenMessage>
      <Heading level={1}>Connection error</Heading>
      <p class="mb-5">
        <strong>The connection to Kodi failed.</strong>
      </p>
      <p class="mb-2">Please ensure that:</p>
      <OrderedList
        each={[
          "Kodi is running",
          "You have enabled Settings > Services > Control > Allow Remote Control via HTTP",
          "You have enabled Settings > Services > Control > Allow Remote Control from applications on this system",
        ]}
      >
        {(item) => item}
      </OrderedList>
      <div class="my-5">
        <Button onClick={reconnect}>Retry connection</Button>
      </div>
      <Show when={host()}>
        <hr class="mb-2" />
        <p>We tried to connect you to:</p>
        <p>[host here]</p>
        <div class="my-5">
          <Button onClick={() => setHost(undefined)}>
            Try a different host
          </Button>
        </div>
      </Show>
    </FullscreenMessage>
  );
};

export default SocketError;
