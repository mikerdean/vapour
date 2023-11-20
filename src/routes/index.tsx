import type { RouteDefinition } from "@solidjs/router";

import Layout from "../components/layout";
import Movies from "../components/views/movies";
import Movie from "../components/views/movies/movie";
import MovieGenre from "../components/views/movies/movieGenre";
import MovieGenres from "../components/views/movies/movieGenres";
import MoviesByTitle from "../components/views/movies/moviesByTitle";
import MovieSet from "../components/views/movies/movieSet";
import MovieSets from "../components/views/movies/movieSets";
import RecentMovies from "../components/views/movies/recentMovies";
import Music from "../components/views/music";
import Album from "../components/views/music/album";
import Albums from "../components/views/music/albums";
import Artist from "../components/views/music/artist";
import Artists from "../components/views/music/artists";
import MusicGenre from "../components/views/music/musicGenre";
import MusicGenres from "../components/views/music/musicGenres";
import RecentAlbums from "../components/views/music/recentAlbums";
import Songs from "../components/views/music/songs";
import Remote from "../components/views/remote";
import Settings from "../components/views/settings";
import TV from "../components/views/tv";
import TVInProgress from "../components/views/tv/tvInProgress";
import TVShow from "../components/views/tv/tvShow";

const routes: RouteDefinition[] = [
  {
    component: Layout,
    path: "/",
    children: [
      {
        component: Remote,
        path: "/",
      },
      {
        component: Music,
        path: "music",
        children: [
          {
            component: RecentAlbums,
            path: "/",
          },
          {
            component: Artists,
            path: "/artists",
          },
          {
            component: Artist,
            path: "/artists/:artistId",
          },
          {
            component: Albums,
            path: "/albums",
          },
          {
            component: Album,
            path: "/albums/:albumId",
          },
          {
            component: MusicGenres,
            path: "/genres",
          },
          {
            component: MusicGenre,
            path: "/genres/:genre",
          },
          {
            component: Songs,
            path: "/songs",
          },
        ],
      },
      {
        component: TV,
        path: "tv",
        children: [
          {
            component: TVInProgress,
            path: "/",
          },
          {
            component: TVShow,
            path: "/:tvShowId",
          },
        ],
      },
      {
        component: Movies,
        path: "movies",
        children: [
          {
            component: RecentMovies,
            path: "/",
          },
          {
            component: MoviesByTitle,
            path: "/titles",
          },
          {
            component: MovieSets,
            path: "/sets",
          },
          {
            component: MovieSet,
            path: "/sets/:setId",
          },
          {
            component: MovieGenres,
            path: "/genres",
          },
          {
            component: MovieGenre,
            path: "/genres/:genre",
          },
          {
            component: Movie,
            path: "/:movieId",
          },
        ],
      },
      {
        component: Settings,
        path: "settings",
      },
    ],
  },
];

export default routes;
