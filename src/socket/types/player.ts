import type { Properties } from "./base";
import type { NotificationItemType } from "./notifications";

export type PlayerType = "internal" | "external" | "remote";

export type MediaType = "all" | "audio" | "video";

export type ActivePlayer = {
  playerid: number;
  type: PlayerType;
};

export type Player = {
  name: string;
  playsaudio: boolean;
  playsvideo: boolean;
  type: PlayerType;
};

export type PlayerItem = {
  id: number;
  type: NotificationItemType;
};

export type GetActivePlayers = ActivePlayer[];

export type GetPlayersQuery = {
  media: MediaType;
};

export type GetPlayers = {
  items: Player[];
};

export type GetPlayerItemQuery = Properties<PlayerItem> & {
  playerid: number;
};

export type GetPlayerItem = {
  item: PlayerItem;
};
