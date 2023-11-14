import { useHost } from "../context/hostProvider";
import { useSocket } from "../context/socketProvider";
import Button from "../core/button";
import FullscreenMessage from "../core/fullscreenMessage";
import Heading from "../core/heading";
import OrderedList from "../core/orderedList";
import HostSummary from "./hostSummary";
import type { ConnectionErrorComponent } from "./connectionError.types";

const ConnectionError: ConnectionErrorComponent = () => {
  const [state, { clear }] = useHost();
  const [, { reconnect }] = useSocket();

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
      <hr class="mb-5" />
      <p class="mb-2">We tried to connect you to:</p>
      <HostSummary host={state.host} />
      <div class="my-5">
        <Button onClick={clear}>Try a different host</Button>
      </div>
    </FullscreenMessage>
  );
};

export default ConnectionError;
