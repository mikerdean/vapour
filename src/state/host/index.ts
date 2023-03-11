import { createRoot, createSignal } from "solid-js";

import { Host } from "./types";

export const createHost = () => {
  /*
  {
    hostname: window.location.hostname,
    httpPort: 8080,
    tcpPort: 9090,
  }
  */

  const [host, setHost] = createSignal<Host | undefined>(undefined);

  return { host, setHost };
};

const hostRoot = createRoot(createHost);

export const useHost = () => hostRoot;
