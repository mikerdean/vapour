import type { Component } from "solid-js";

export type CastMember = {
  name: string;
  thumbnail?: string;
};

export type CastComponent = Component<{
  cast: CastMember[];
}>;
