import "./index.css";

import { useRoutes } from "@solidjs/router";
import type { Component } from "solid-js";

import IntersectionObserverProvider from "./components/context/intersectionObserver";
import Connection from "./components/root/connection";
import Host from "./components/root/host";
import routes from "./routes";

const App: Component = () => {
  const Routes = useRoutes(routes);

  return (
    <IntersectionObserverProvider>
      <Host>
        <Connection>
          <Routes />
        </Connection>
      </Host>
    </IntersectionObserverProvider>
  );
};

export default App;
