import { createContext, useContext } from "solid-js";
import { createStore } from "solid-js/store";

import { addToQueue, dequeue, removeFromQueue } from "../../socket/queue";
import {
  isKodiError,
  isKodiNotification,
  isKodiResponse,
} from "../../socket/typeguards";
import type { KodiRequest } from "../../socket/types";
import type { NotificationMap } from "../../socket/types/notifications";
import { useHost } from "./hostProvider";
import {
  ConnectionState,
  type NotificationEventListener,
  type SocketContextType,
  type SocketMethods,
  type SocketProviderComponent,
  type SocketState,
} from "./socketProvider.types";

const SocketContext = createContext<SocketContextType>([
  {} as SocketState,
  {} as SocketMethods,
]);

const timeout = 5000;

const SocketProvider: SocketProviderComponent = (props) => {
  let socket: WebSocket | undefined;

  const listeners = new Map<string, Set<NotificationEventListener>>();

  const [state, setState] = createStore<SocketState>({
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

    socket.onmessage = (ev: MessageEvent<string>): void => {
      try {
        const message = JSON.parse(ev.data);

        if (isKodiResponse(message)) {
          const callback = dequeue(message.id);
          if (callback) {
            callback(message);
          }

          return;
        }

        if (isKodiNotification(message)) {
          const callbacks = listeners.get(message.method);
          if (callbacks) {
            for (const callback of callbacks) {
              callback(message);
            }

            return;
          }
        }
      } catch (err) {
        // TODO: add dynamic logging output
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
    request: KodiRequest<TRequest>,
  ): Promise<TResponse> =>
    new Promise((resolve, reject) => {
      if (!socket) {
        return reject(Error("Socket not currently connected. Command failed."));
      }

      const { id } = request;

      const timer = setTimeout(() => {
        removeFromQueue(id);
        return reject(
          Error(`Message ${id} exceeded the timeout value (${timeout})`),
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
              `Message {${id} response returned an error from JSONRPC: ${message.error.message}`,
            ),
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

  const subscribe = <T extends keyof NotificationMap>(
    type: T,
    listener: (message: NotificationMap[T]) => void,
  ): void => {
    let set = listeners.get(type);
    if (!set) {
      set = new Set<NotificationEventListener>();
      listeners.set(type, set);
    }

    set.add(listener as NotificationEventListener);
  };

  const unsubscribe = <T extends keyof NotificationMap>(
    type: T,
    listener: (message: NotificationMap[T]) => void,
  ): void => {
    const set = listeners.get(type);
    if (set) {
      set.delete(listener as NotificationEventListener);
    }
  };

  return (
    <SocketContext.Provider
      value={[
        state,
        { connect, disconnect, reconnect, send, subscribe, unsubscribe },
      ]}
    >
      {props.children}
    </SocketContext.Provider>
  );
};

const useSocket = () => useContext(SocketContext);

export default SocketProvider;
export { useSocket };
