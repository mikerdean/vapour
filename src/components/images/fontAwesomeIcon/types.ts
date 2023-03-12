import { IconDefinition } from "@fortawesome/fontawesome-common-types";
import { Component } from "solid-js";

export type IconSize =
  | "2xs"
  | "xs"
  | "sm"
  | "lg"
  | "xl"
  | "2xl"
  | "1x"
  | "2x"
  | "3x"
  | "4x"
  | "5x"
  | "6x"
  | "7x"
  | "8x"
  | "9x"
  | "10x";

export type IconRotation = 0 | 90 | 180 | 270;

export type FontAwesomeIconComponent = Component<{
  class?: string;
  classList?: Record<string, boolean | undefined>;
  fixedWidth?: boolean;
  icon: IconDefinition;
  rotate?: IconRotation;
  size?: IconSize;
}>;
