import { ParentComponent } from "solid-js";

export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

export type HeadingComponent = ParentComponent<{
  id?: string;
  level: HeadingLevel;
}>;
