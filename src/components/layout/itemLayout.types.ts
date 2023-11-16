import type { ParentComponent } from "solid-js";
import type { ThumbnailType } from "../core/thumbnail.types";

export type ItemLayoutComponent = ParentComponent<{
  backgroundArtUrl?: string;
  title: string;
  thumbnailType: ThumbnailType;
  thumbnailUrl?: string;
}>;
