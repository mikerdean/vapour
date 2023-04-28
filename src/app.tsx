import "./index.css";

import { useRoutes } from "@solidjs/router";
import type { Component } from "solid-js";

import IntersectionObserverProvider from "./components/context/intersectionObserver";
import SocketProvider from "./components/context/socket";
import Connection from "./components/root/connection";
import Host from "./components/root/host";
import routes from "./routes";

const App: Component = () => {
  const Routes = useRoutes(routes);

  return (
    <IntersectionObserverProvider>
      <Host>
        <SocketProvider>
          <Connection>
            <Routes />
          </Connection>
        </SocketProvider>
      </Host>
    </IntersectionObserverProvider>
  );
};

export default App;
