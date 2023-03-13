import { ItemDetailsBase, Properties } from "./base";

import { KodiMessageLimitsReturned } from "./message";

export type ProfileDetails = ItemDetailsBase & {
  lockmode?: number;
  thumbnail?: string;
};

export type ProfileDetailsPaged = {
  limits: KodiMessageLimitsReturned;
  profiles: ProfileDetails[];
};

export type ProfileDetailsQuery = Properties<ProfileDetails>;
