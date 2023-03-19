import type { Component, JSX } from "solid-js";

export type GridCardComponent = Component<{
  title: JSX.Element;
  items?: JSX.Element[];
}>;
