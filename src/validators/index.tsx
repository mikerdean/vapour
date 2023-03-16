import { z } from "zod";

export const albumValidator = z
  .object({ albumId: z.coerce.number().int().gte(1) })
  .default({ albumId: 0 });

export const artistValidator = z
  .object({ artistId: z.coerce.number().int().gte(1) })
  .default({ artistId: 0 });

export const genreValidator = z
  .object({ genre: z.string().min(1) })
  .default({ genre: "" });

export const pageValidator = z
  .object({ page: z.coerce.number().int().gte(1) })
  .default({ page: 1 });
