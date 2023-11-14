import type { Component } from "solid-js";

import type { Host } from "../context/hostProvider.types";

export type HostSummaryComponent = Component<{
  host?: Host;
}>;
