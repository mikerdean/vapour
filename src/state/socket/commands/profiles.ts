import {
  ProfileDetails,
  ProfileDetailsPaged,
  ProfileDetailsQuery,
} from "../types";
import { createQueryHook } from "./utils";

export const useCurrentProfile = createQueryHook<
  ProfileDetailsQuery,
  ProfileDetails
>("Profiles.GetCurrentProfile", {
  properties: ["lockmode", "thumbnail"],
});

export const useProfiles = createQueryHook<
  ProfileDetailsQuery,
  ProfileDetailsPaged
>("Profiles.GetProfiles", {
  properties: ["lockmode", "thumbnail"],
});
