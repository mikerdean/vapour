import type { Component } from "solid-js";

import type { AudioDetailsSong } from "../../../../state/socket/types";

export type SongListComponent = Component<{
  songs: AudioDetailsSong[];
}>;
