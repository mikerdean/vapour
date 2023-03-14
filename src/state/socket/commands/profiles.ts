import {
  ProfileDetails,
  ProfileDetailsPaged,
  ProfileDetailsQuery,
} from "../types";
import { createQueryHook } from "./utils";

const defaultQuery: ProfileDetailsQuery = {
  properties: ["lockmode", "thumbnail"],
};

export const useCurrentProfile = createQueryHook<
  ProfileDetailsQuery,
  ProfileDetails
>("Profiles.GetCurrentProfile", defaultQuery);

export const useProfiles = createQueryHook<
  ProfileDetailsQuery,
  ProfileDetailsPaged
>("Profiles.GetProfiles", defaultQuery);
