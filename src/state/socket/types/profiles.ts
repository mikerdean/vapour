import type { ItemDetailsBase, Properties } from "./base";
import type { KodiMessageLimitsReturned } from "./message";

export type ProfileDetails = ItemDetailsBase & {
  lockmode?: number;
  thumbnail?: string;
};

export type ProfileDetailsPaged = {
  limits: KodiMessageLimitsReturned;
  profiles: ProfileDetails[];
};

export type ProfileDetailsQuery = Properties<ProfileDetails>;
