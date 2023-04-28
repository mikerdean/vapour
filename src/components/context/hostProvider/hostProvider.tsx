import { createContext, useContext } from "solid-js";
import { createStore } from "solid-js/store";

import { Host, HostContext, HostProviderComponent, HostStore } from "./types";

const hostContext = createContext<HostContext>([
  {
    host: undefined,
    get httpUrl() {
      return undefined;
    },
    get websocketUrl() {
      return undefined;
    },
  },
  {
    clear() {
      // do nothing
    },
    update() {
      // do nothing
    },
  },
]);

const HostProvider: HostProviderComponent = (props) => {
  const [state, setState] = createStore<HostStore>({
    host: {
      hostname: window.location.hostname,
      httpPort: 8080,
      tcpPort: 9090,
    },
    get httpUrl() {
      if (!this.host) {
        return undefined;
      }

      const { hostname, httpPort } = this.host;
      const protocol = window.location.protocol;
      const url = new URL(`${protocol}//${hostname}:${httpPort}`);
      return url.toString();
    },
    get websocketUrl() {
      if (!this.host) {
        return undefined;
      }

      const { hostname, tcpPort } = this.host;
      const protocol = window.location.protocol === "https:" ? "wss" : "ws";
      const url = new URL(`${protocol}://${hostname}:${tcpPort}`);
      return url.toString();
    },
  });

  const clear = (): void => {
    setState("host", undefined);
  };

  const update = (host: Host): void => {
    setState("host", host);
  };

  return (
    <hostContext.Provider value={[state, { clear, update }]}>
      {props.children}
    </hostContext.Provider>
  );
};

const useHost = () => useContext(hostContext);

export default HostProvider;
export { useHost };
