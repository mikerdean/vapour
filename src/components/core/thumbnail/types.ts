import { Component } from "solid-js";

export enum ThumbnailType {
  Artist,
  Album,
  Song,
  Genre,
  Movie,
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
