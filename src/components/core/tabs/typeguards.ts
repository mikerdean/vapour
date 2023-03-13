import { ButtonTabItem, RouteTabItem, TabItem } from "./types";

export const isButtonTabItem = (item: TabItem): item is ButtonTabItem =>
  "onClick" in item;

export const isRouteTabItem = (item: TabItem): item is RouteTabItem =>
  "path" in item;