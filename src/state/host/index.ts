import { createRoot, createSignal } from "solid-js";

import { Host } from "./types";

export const createHost = () => {
  const [host, setHost] = createSignal<Host | undefined>({
    hostname: window.location.hostname,
    httpPort: 8080,
    tcpPort: 9090,
  });

  return { host, setHost };
};

const hostRoot = createRoot(createHost);

export const useHost = () => hostRoot;
