import "./index.css";

import { useRoutes } from "@solidjs/router";
import type { Component } from "solid-js";

import HostProvider from "./components/context/hostProvider";
import IntersectionObserverProvider from "./components/context/intersectionObserverProvider";
import SocketProvider from "./components/context/socket";
import Connection from "./components/root/connection";
import Host from "./components/root/host";
import routes from "./routes";

const App: Component = () => {
  const Routes = useRoutes(routes);

  return (
    <IntersectionObserverProvider>
      <HostProvider>
        <Host>
          <SocketProvider>
            <Connection>
              <Routes />
            </Connection>
          </SocketProvider>
        </Host>
      </HostProvider>
    </IntersectionObserverProvider>
  );
};

export default App;
