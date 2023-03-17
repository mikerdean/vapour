import { Component } from "solid-js";

import { AudioDetailsSong } from "../../../../state/socket/types";

export type SongListComponent = Component<{
  songs: AudioDetailsSong[];
}>;
