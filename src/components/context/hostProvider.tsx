import { createContext, useContext } from "solid-js";
import { createStore } from "solid-js/store";

import type {
  Host,
  HostContextType,
  HostMethods,
  HostProviderComponent,
  HostStore,
} from "./hostProvider.types";

const HostContext = createContext<HostContextType>([
  {} as HostStore,
  {} as HostMethods,
]);

const HostProvider: HostProviderComponent = (props) => {
  const [state, setState] = createStore<HostStore>({
    host: props.host, // eslint-disable-line solid/reactivity
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
    <HostContext.Provider value={[state, { clear, update }]}>
      {props.children}
    </HostContext.Provider>
  );
};

const useHost = () => useContext(HostContext);

export default HostProvider;
export { useHost };
