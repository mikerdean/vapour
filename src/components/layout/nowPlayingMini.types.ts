import type { Component } from "solid-js";

import type { ThumbnailType } from "../images/thumbnail.types";

export type NowPlayingComponent = Component;

export type NowPlayingItem = {
  id: number;
  backgroundUrl?: string;
  metadata: NowPlayingItemMetadata[];
  thumbnailUrl?: string;
  title: string;
  type: ThumbnailType;
};

export type NowPlayingItemMetadata = {
  title: string;
  value?: string;
};
