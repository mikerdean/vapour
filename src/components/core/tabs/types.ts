import type { Component } from "solid-js";

export type DefaultTabItem = {
  label: string;
};

export type RouteTabItem = DefaultTabItem & {
  path: string;
};

export type ButtonTabItem = DefaultTabItem & {
  onClick: () => void;
};

export type TabItem = RouteTabItem | ButtonTabItem;

export type TabsComponent = Component<{
  items: TabItem[];
}>;
