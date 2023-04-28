import type { ParentComponent } from "solid-js";

import type { KodiRequest } from "../../../state/socket/types";

export enum ConnectionState {
  NotConnected,
  Connecting,
  Connected,
}

export type SocketContext = [
  { connectionState: ConnectionState },
  {
    connect: () => void;
    disconnect: () => void;
    reconnect: () => void;
    send: <TRequest, TResponse>(
      request: KodiRequest<TRequest>
    ) => Promise<TResponse>;
  }
];

export type SocketProviderComponent = ParentComponent;
