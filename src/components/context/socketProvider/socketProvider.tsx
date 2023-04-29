import { createContext, useContext } from "solid-js";
import { createStore } from "solid-js/store";

import {
  addToQueue,
  getFromQueue,
  removeFromQueue,
} from "../../../socket/queue";
import { isKodiError, isKodiResponse } from "../../../socket/typeguards";
import type { KodiRequest } from "../../../socket/types";
import { useHost } from "../hostProvider";
import type { SocketContext, SocketProviderComponent } from "./types";
import { ConnectionState } from "./types";

const socketContext = createContext<SocketContext>([
  { connectionState: ConnectionState.Connecting },
  {
    connect() {
      // do nothing
    },
    disconnect() {
      // do nothing
    },
    reconnect() {
      // do nothing
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    send<TRequest, TResponse>() {
      return Promise.resolve({} as TResponse);
    },
  },
]);

const timeout = 5000;

const SocketProvider: SocketProviderComponent = (props) => {
  let socket: WebSocket | undefined;

  const [state, setState] = createStore({
    connectionState: ConnectionState.Connecting,
  });

  const [host] = useHost();

  const connect = (): void => {
    const url = host.websocketUrl;
    if (socket || !url) {
      return;
    }

    socket = new WebSocket(url);

    socket.onopen = () => {
      setState("connectionState", ConnectionState.Connected);
    };

    socket.onmessage = (ev: MessageEvent<string>) => {
      try {
        const message = JSON.parse(ev.data);
        if (isKodiResponse(message)) {
          const callback = getFromQueue(message.id);
          if (callback) {
            callback(message);
          }
        }
      } catch (err) {
        console.error("Error from socket: ", err);
      }
    };

    socket.onclose = () => {
      setTimeout(() => {
        setState("connectionState", ConnectionState.NotConnected);
        socket = undefined;
      }, 250);
    };
  };

  const reconnect = (): void => {
    setState("connectionState", ConnectionState.Connecting);
    socket = undefined;
    connect();
  };

  const send = async <TRequest, TResponse>(
    request: KodiRequest<TRequest>
  ): Promise<TResponse> =>
    new Promise((resolve, reject) => {
      if (!socket) {
        return reject(Error("Socket not currently connected. Command failed."));
      }

      const { id } = request;

      const timer = setTimeout(() => {
        removeFromQueue(id);
        return reject(
          Error(`Message ${id} exceeded the timeout value (${timeout})`)
        );
      }, timeout);

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
        socket.send(JSON.stringify(request));
      } catch (err) {
        return reject(err);
      }
    });

  const disconnect = () => {
    if (socket) {
      socket.close(1001);
    }
  };

  return (
    <socketContext.Provider
      value={[state, { connect, disconnect, reconnect, send }]}
    >
      {props.children}
    </socketContext.Provider>
  );
};

const useSocket = () => useContext(socketContext);

export default SocketProvider;
export { useSocket };
