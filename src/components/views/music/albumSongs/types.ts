import { Component } from "solid-js";

export type AlbumSongsComponent = Component<{
  artist: string;
  album: string;
  year: number;
}>;
