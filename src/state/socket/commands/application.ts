import { ApplicationProperties, ApplicationPropertiesQuery } from "../types";
import { createQueryHook } from "./utils";

export const applicationPropertiesAtom = createQueryHook<
  ApplicationPropertiesQuery,
  ApplicationProperties
>("Application.GetProperties", {
  properties: ["language", "muted", "name", "sorttokens", "version", "volume"],
});
