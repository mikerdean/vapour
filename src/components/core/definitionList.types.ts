import type { Component, JSX } from "solid-js";

export type DefinitionListItem = {
  header: JSX.Element;
  description: JSX.Element;
};

export type DefinitionListComponent = Component<{
  each: DefinitionListItem[];
  label: string;
}>;
