import { hashIntegration, Router } from "@solidjs/router";
import { render } from "solid-js/web";

import App from "./app";

const root = document.getElementById("root");
if (!root) {
  throw Error("Root node not found");
}

render(
  () => (
    <Router source={hashIntegration()}>
      <App />
    </Router>
  ),
  root,
);
