import { Component } from "solid-js";

export enum ThumbnailType {
  Artist,
  Album,
  Song,
  MusicGenre,
  Movie,
  MovieSet,
  MovieGenre,
  TVShow,
  Season,
  Episode,
}

export type ThumbnailComponent = Component<{
  alt?: string;
  played?: boolean;
  type: ThumbnailType;
  uri?: string;
}>;
