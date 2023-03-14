import {
  ProfileDetails,
  ProfileDetailsPaged,
  ProfileDetailsQuery,
} from "../types";
import { createQueryHook } from "./utils";

const defaultQuery: ProfileDetailsQuery = {
  properties: ["lockmode", "thumbnail"],
};

export const useGetCurrentProfileQuery = createQueryHook<
  ProfileDetailsQuery,
  ProfileDetails
>("Profiles.GetCurrentProfile", defaultQuery);

export const useGetProfilesQuery = createQueryHook<
  ProfileDetailsQuery,
  ProfileDetailsPaged
>("Profiles.GetProfiles", defaultQuery);
