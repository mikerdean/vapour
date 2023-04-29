import type { Component } from "solid-js";

import type { AudioDetailsSong } from "../../../../socket/types";

export type SongListComponent = Component<{
  songs: AudioDetailsSong[];
}>;
