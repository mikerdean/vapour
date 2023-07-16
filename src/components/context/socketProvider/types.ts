import type { ParentComponent } from "solid-js";

import type { KodiRequest } from "../../../socket/types";
import { NotificationMap } from "../../../socket/types/notifications";

export enum ConnectionState {
  NotConnected,
  Connecting,
  Connected,
}

export type NotificationEventListener = (message: unknown) => void;

export type SocketState = {
  connectionState: ConnectionState;
};

export type SocketMethods = {
  connect: () => void;
  disconnect: () => void;
  reconnect: () => void;
  send: <TRequest, TResponse>(
    request: KodiRequest<TRequest>,
  ) => Promise<TResponse>;
  subscribe: <T extends keyof NotificationMap>(
    type: T,
    listener: (message: NotificationMap[T]) => void,
  ) => void;
  unsubscribe: <T extends keyof NotificationMap>(
    type: T,
    listener: (message: NotificationMap[T]) => void,
  ) => void;
};

export type SocketContextType = [SocketState, SocketMethods];

export type SocketProviderComponent = ParentComponent;
