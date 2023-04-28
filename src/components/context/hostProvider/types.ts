import { ParentComponent } from "solid-js";

export type Host = {
  hostname: string;
  httpPort: number;
  tcpPort: number;
};

export type HostStore = {
  host: Host | undefined;
  get httpUrl(): string | undefined;
  get websocketUrl(): string | undefined;
};

export type HostContext = [
  HostStore,
  {
    clear: () => void;
    update: (host: Host) => void;
  }
];

export type HostProviderComponent = ParentComponent;
