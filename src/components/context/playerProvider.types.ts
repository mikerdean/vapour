import type { ParentComponent } from "solid-js";

import { ThumbnailType } from "../images/thumbnail.types";

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

export type PlayerStore = {
  playingItem: NowPlayingItem | undefined;
};

export type PlayerContextType = [PlayerStore];

export type PlayerProviderComponent = ParentComponent;

export type NowPlayingMessage = {
  id: number;
  type: "unknown" | "movie" | "episode" | "song" | "picture" | "channel";
};
