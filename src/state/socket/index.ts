import { createRoot, createSignal, untrack } from "solid-js";

import { useHost } from "../host";
import { addToQueue, getFromQueue, removeFromQueue } from "./queue";
import { isKodiError, isKodiResponse } from "./typeguards";
import { ConnectionState, KodiRequest } from "./types";

const defaultTimeout = 5000;

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

  const send = async <TRequest, TResponse>(
    request: KodiRequest<TRequest>
  ): Promise<TResponse> =>
    new Promise((resolve, reject) => {
      const currentSocket = untrack(socket);
      if (!currentSocket) {
        return reject(Error("Socket not currently connected. Command failed."));
      }

      const { id } = request;

      const timer = setTimeout(() => {
        removeFromQueue(id);
        return reject(
          Error(`Message ${id} exceeded the timeout value (${defaultTimeout})`)
        );
      }, defaultTimeout);

      addToQueue(id, (message) => {
        clearTimeout(timer);
        if (isKodiResponse<TResponse>(message)) {
          return resolve(message.result);
        }

        if (isKodiError(message)) {
          return reject(
            Error(
              `Message {${id} response returned an error from JSONRPC: ${message.error.message}`
            )
          );
        }

        return reject(Error(`Message ${id} response was not processed`));
      });

      try {
        currentSocket.send(JSON.stringify(request));
      } catch (err) {
        return reject(err);
      }
    });

  const disconnect = () => {
    const currentSocket = socket();
    if (currentSocket) {
      currentSocket.close(1001);
    }
  };

  return { connectionState, connect, disconnect, reconnect, send };
};

const socketRoot = createRoot(createSocket);

export const useSocket = () => socketRoot;
