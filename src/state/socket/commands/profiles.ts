import {
  KodiCommand,
  ProfileDetails,
  ProfileDetailsPaged,
  ProfileDetailsQuery,
} from "../types";
import { createRequest, createResponse } from "../utils";

export const getCurrentProfile = (): KodiCommand<
  ProfileDetailsQuery,
  ProfileDetails
> => [
  createRequest("Profiles.GetCurrentProfile", {
    properties: ["lockmode", "thumbnail"],
  }),
  createResponse({ label: "Example" }),
];

export const getProfiles = (): KodiCommand<
  ProfileDetailsQuery,
  ProfileDetailsPaged
> => [
  createRequest("Profiles.GetProfiles", {
    properties: ["lockmode", "thumbnail"],
  }),
  createResponse({ limits: { total: 0 }, profiles: [] }),
];
