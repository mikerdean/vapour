import type { Component } from "solid-js";

export enum ThumbnailType {
  Actor,
  Artist,
  Album,
  Song,
  MusicGenre,
  Movie,
  MovieSet,
  MovieGenre,
  TVShow,
  TVShowGenre,
  Season,
  Episode,
}

export type ThumbnailComponent = Component<{
  alt?: string;
  played?: boolean;
  type: ThumbnailType;
  uri?: string;
}>;
