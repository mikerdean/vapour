import type { Properties } from "./base";

export type Player = {
  playerid: number;
  type: "internal" | "external" | "remote";
};

export type PlayerItem = {
  id: number;
  type: string;
};

export type GetActivePlayers = Player[];

export type GetPlayerItemQuery = Properties<PlayerItem> & {
  playerid: number;
};

export type GetPlayerItem = {
  item: PlayerItem;
};
