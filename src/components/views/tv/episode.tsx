import { createResource, Show } from "solid-js";

import useTypedParams from "../../../hooks/useTypedParams";
import { episodeValidator } from "../../../validators";
import { useSocket } from "../../context/socketProvider";
import DefinitionList from "../../core/definitionList";
import Heading from "../../core/heading";
import Rating from "../../core/rating";
import { ThumbnailType } from "../../images/thumbnail.types";
import ItemLayout from "../../layout/itemLayout";
import Cast from "../movies/cast";
import { EpisodeComponent } from "./episode.types";

const Episode: EpisodeComponent = () => {
  const [, { getEpisodeById }] = useSocket();
  const params = useTypedParams(episodeValidator);

  const [episodeData] = createResource(
    () => params().episodeId,
    getEpisodeById,
  );

  return (
    <ItemLayout
      backgroundArtUrl={episodeData()?.episodedetails.art?.fanart}
      thumbnailType={ThumbnailType.Episode}
      thumbnailUrl={episodeData()?.episodedetails.art?.thumb}
      title={episodeData()?.episodedetails.showtitle || "Loading..."}
    >
      <DefinitionList
        label="Movie details"
        each={[
          {
            header: "Episode title",
            description: episodeData()?.episodedetails.title,
          },
          {
            header: "Season",
            description: episodeData()?.episodedetails.season,
          },
          {
            header: "Episode",
            description: episodeData()?.episodedetails.episode,
          },
          {
            header: "Date aired",
            description: episodeData()?.episodedetails.firstaired,
          },
        ]}
      />
      <Show when={episodeData()?.episodedetails.plot}>
        <p class="mb-3">{episodeData()?.episodedetails.plot}</p>
      </Show>
      <Show when={episodeData()?.episodedetails.rating}>
        <div class="mb-3">
          <Heading level={2}>Rating</Heading>
          <Rating value={episodeData()?.episodedetails.rating} />
        </div>
      </Show>
      <Show when={(episodeData()?.episodedetails.cast?.length || 0) > 0}>
        <Heading level={2}>Cast</Heading>
        <Cast cast={episodeData()?.episodedetails.cast || []} />
      </Show>
    </ItemLayout>
  );
};

export default Episode;
