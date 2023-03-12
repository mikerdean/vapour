import { Component, JSX } from "solid-js";

export type LoadingProps = {
  text?: JSX.Element;
  textVisible?: boolean;
};

export type LoadingComponent = Component<LoadingProps>;
