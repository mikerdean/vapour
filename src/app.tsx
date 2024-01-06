import "./index.css";

import { HashRouter } from "@solidjs/router";
import type { Component } from "solid-js";

import ConfigurationProvider from "./components/context/configurationProvider";
import HostProvider from "./components/context/hostProvider";
import IntersectionObserverProvider from "./components/context/intersectionObserverProvider";
import PlayerProvider from "./components/context/playerProvider";
import SocketProvider from "./components/context/socketProvider";
import Connection from "./components/root/connection";
import Host from "./components/root/host";
import routes from "./routes";

const App: Component = () => {
  return (
    <ConfigurationProvider>
      <IntersectionObserverProvider>
        <HostProvider
          host={{
            hostname: window.location.hostname,
            httpPort: 8080,
            tcpPort: 9090,
          }}
        >
          <Host>
            <SocketProvider>
              <Connection>
                <PlayerProvider>
                  <HashRouter>{routes}</HashRouter>
                </PlayerProvider>
              </Connection>
            </SocketProvider>
          </Host>
        </HostProvider>
      </IntersectionObserverProvider>
    </ConfigurationProvider>
  );
};

export default App;
