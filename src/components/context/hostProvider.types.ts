import type { ParentComponent } from "solid-js";

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

export type HostMethods = {
  clear: () => void;
  update: (host: Host) => void;
};

export type HostContextType = [HostStore, HostMethods];

export type HostProviderComponent = ParentComponent<{
  host?: Host;
}>;
