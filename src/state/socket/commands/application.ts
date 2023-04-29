import type {
  ApplicationProperties,
  ApplicationPropertiesQuery,
} from "../types";
import { createQueryHook } from "./utils";

export const useGetApplicationsQuery = createQueryHook<
  ApplicationPropertiesQuery,
  ApplicationProperties
>("Application.GetProperties", {
  properties: ["language", "muted", "name", "sorttokens", "version", "volume"],
});
