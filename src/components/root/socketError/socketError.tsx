import { Show } from "solid-js";

import { useHost } from "../../../state/host";
import { useSocket } from "../../../state/socket";
import Button from "../../core/button";
import FullscreenMessage from "../../core/fullscreenMessage";
import Heading from "../../core/heading";
import { SocketErrorComponent } from "./types";

const SocketError: SocketErrorComponent = () => {
  const { host, setHost } = useHost();
  const { reconnect } = useSocket();

  return (
    <FullscreenMessage>
      <Heading level={1}>Connection error</Heading>
      <p class="mb-5">The connection to Kodi failed.</p>
      <p class="mb-2">Please ensure that:</p>
      <ol>
        <li>[List of things go here]</li>
      </ol>
      <div class="mt-3 mb-5">
        <Button onClick={reconnect}>Retry connection</Button>
      </div>
      <Show when={host()}>
        <hr class="mb-2" />
        <p>We tried to connect you to:</p>
        <p>[host here]</p>
        <div class="mt-3 mb-5">
          <Button onClick={() => setHost(undefined)}>
            Try a different host
          </Button>
        </div>
      </Show>
    </FullscreenMessage>
  );
};

export default SocketError;
