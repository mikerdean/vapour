import { createRoot, createSignal } from "solid-js";

import { useHost } from "../host";
import { getFromQueue } from "./queue";
import { isKodiResponse } from "./typeguards";
import { ConnectionState } from "./types";

export const createSocket = () => {
  const [socket, setSocket] = createSignal<WebSocket | undefined>();

  const [connectionState, setConnectionState] = createSignal<ConnectionState>(
    ConnectionState.Connecting
  );

  const connect = (): void => {
    const { websocketUrl } = useHost();

    const currentSocket = socket();
    const url = websocketUrl();

    if (currentSocket || !url) {
      return;
    }

    const newSocket = new WebSocket(url);

    newSocket.onopen = () => {
      setConnectionState(ConnectionState.Connected);
    };

    newSocket.onmessage = (ev: MessageEvent<string>) => {
      try {
        const message = JSON.parse(ev.data);
        if (isKodiResponse(message)) {
          const callback = getFromQueue(message.id);
          if (callback) {
            callback(message);
          }
        }
      } catch (err) {
        console.log("Error from socket: ", err);
      }
    };

    newSocket.onclose = () => {
      setTimeout(() => {
        setConnectionState(ConnectionState.NotConnected);
        setSocket(undefined);
      }, 250);
    };

    setSocket(newSocket);
  };

  const reconnect = (): void => {
    setSocket(undefined);
    setConnectionState(ConnectionState.Connecting);
    connect();
  };

  return { connectionState, connect, reconnect };
};

const socketRoot = createRoot(createSocket);

export const useSocket = () => socketRoot;
