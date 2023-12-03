import type { ParentComponent } from "solid-js";

export type ConfigurationStore = {
  pageSize: number;
};

export type ConfigurationMethods = {
  setPageSize: (pageSize: number) => void;
};

export type ConfigurationContextType = [
  ConfigurationStore,
  ConfigurationMethods,
];

export type ConfigurationProviderComponent = ParentComponent;
