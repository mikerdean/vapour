import {
  coerce,
  integer,
  minLength,
  minValue,
  number,
  object,
  string,
} from "valibot";

const idPipeline = coerce(number([integer(), minValue(1)]), Number);

export const albumValidator = object({
  albumId: idPipeline,
});

export const artistValidator = object({
  artistId: idPipeline,
});

export const genreValidator = object({
  genre: string([minLength(1)]),
});

export const movieValidator = object({
  movieId: idPipeline,
});

export const movieSetValidator = object({
  setId: idPipeline,
});

export const tvShowValidator = object({
  tvShowId: idPipeline,
});

export const seasonValidator = object({
  seasonId: idPipeline,
});

export const pageValidator = object({
  page: idPipeline,
});
