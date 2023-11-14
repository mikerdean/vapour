import type { ParentComponent } from "solid-js";

export type ButtonComponent = ParentComponent<{
  disabled?: boolean;
  onClick?: () => void;
  type?: "submit" | "reset" | "button";
}>;
