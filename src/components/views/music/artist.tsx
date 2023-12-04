import { createResource, Show } from "solid-js";

import useTypedParams from "../../../hooks/useTypedParams";
import { artistValidator } from "../../../validators";
import { useSocket } from "../../context/socketProvider";
import Heading from "../../core/heading";
import Fanart from "../../images/fanart";
import type { ArtistComponent } from "./artist.types";
import ArtistAlbums from "./artistAlbums";

const Artist: ArtistComponent = () => {
  const params = useTypedParams(artistValidator);
  const [, { getArtistById }] = useSocket();

  const [artistData] = createResource(() => params().artistId, getArtistById);

  return (
    <>
      <Fanart uri={artistData()?.artistdetails.art?.fanart} />
      <Heading level={1}>{artistData()?.artistdetails.label}</Heading>
      <Show when={artistData()?.artistdetails.description}>
        <p>{artistData()?.artistdetails.description}</p>
      </Show>
      <Heading level={2}>Albums</Heading>
      <ArtistAlbums artist={artistData()?.artistdetails.artist} />
    </>
  );
};

export default Artist;
