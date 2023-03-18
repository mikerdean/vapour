import { Component } from "solid-js";

export enum ThumbnailType {
  Artist,
  Album,
  Song,
  Genre,
  Movie,
  MovieSet,
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
