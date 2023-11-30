import type { ParentComponent } from "solid-js";

import type { ThumbnailType } from "../images/thumbnail.types";

export type ItemLayoutComponent = ParentComponent<{
  backgroundArtUrl?: string;
  title: string;
  thumbnailType: ThumbnailType;
  thumbnailUrl?: string;
}>;
