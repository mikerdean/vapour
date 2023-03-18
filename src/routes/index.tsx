import { RouteDefinition } from "@solidjs/router";

import Layout from "../components/layout";
import Movies from "../components/views/movies";
import MoviesByTitle from "../components/views/movies/moviesByTitle";
import RecentMovies from "../components/views/movies/recentMovies";
import Music from "../components/views/music";
import Album from "../components/views/music/album";
import Albums from "../components/views/music/albums";
import Artist from "../components/views/music/artist";
import Artists from "../components/views/music/artists";
import Genre from "../components/views/music/genre";
import Genres from "../components/views/music/genres";
import RecentAlbums from "../components/views/music/recentAlbums";
import Songs from "../components/views/music/songs";
import Remote from "../components/views/remote";
import Settings from "../components/views/settings";
import TV from "../components/views/tv";

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
            component: Genres,
            path: "/genres",
          },
          {
            component: Genre,
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
