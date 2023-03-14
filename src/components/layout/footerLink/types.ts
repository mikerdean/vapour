import { IconDefinition } from "@fortawesome/fontawesome-common-types";
import { Component } from "solid-js";

export type FooterLinkComponent = Component<{
  end?: boolean;
  icon: IconDefinition;
  label: string;
  path: string;
}>;
