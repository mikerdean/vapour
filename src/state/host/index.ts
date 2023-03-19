import { createMemo, createRoot, createSignal } from "solid-js";

import type { Host } from "./types";

export const createHost = () => {
  const [host, setHost] = createSignal<Host | undefined>({
    hostname: window.location.hostname,
    httpPort: 8080,
    tcpPort: 9090,
  });

  const httpUrl = createMemo((): string | undefined => {
    const currentHost = host();
    if (!currentHost) {
      return undefined;
    }

    const { hostname, httpPort } = currentHost;
    const protocol = window.location.protocol;
    const url = new URL(`${protocol}//${hostname}:${httpPort}`);
    return url.toString();
  });

  const websocketUrl = createMemo((): string | undefined => {
    const currentHost = host();
    if (!currentHost) {
      return undefined;
    }

    const { hostname, tcpPort } = currentHost;
    const protocol = window.location.protocol === "https:" ? "wss" : "ws";
    const url = new URL(`${protocol}://${hostname}:${tcpPort}`);
    return url.toString();
  });

  return { host, httpUrl, websocketUrl, setHost };
};

const hostRoot = createRoot(createHost);

export const useHost = () => hostRoot;
