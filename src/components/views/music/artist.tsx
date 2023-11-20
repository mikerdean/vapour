import { createMemo, Show } from "solid-js";

import useTypedParams from "../../../hooks/useTypedParams";
import { useGetArtistQuery } from "../../../socket/query";
import type { AudioDetailsArtist } from "../../../socket/types";
import { artistValidator } from "../../../validators";
import Heading from "../../core/heading";
import Thumbnail from "../../core/thumbnail";
import { ThumbnailType } from "../../core/thumbnail.types";
import type { ArtistComponent } from "./artist.types";
import ArtistAlbums from "./artistAlbums";

const Artist: ArtistComponent = () => {
  const params = useTypedParams(artistValidator);

  const [artistData] = useGetArtistQuery(() => ({
    artistid: params().artistId,
  }));

  const artist = createMemo<AudioDetailsArtist | undefined>(() => {
    const result = artistData();
    if (!result) {
      return;
    }

    return result.artistdetails;
  });

  return (
    <Show when={artist()} keyed>
      {(artist) => (
        <div>
          <Heading level={1}>{artist.label}</Heading>
          {artist.thumbnail && (
            <Thumbnail
              type={ThumbnailType.Artist}
              uri={artist.thumbnail}
              alt=""
            />
          )}
          {artist.description && <p>{artist.description}</p>}
          <Heading level={2}>Albums</Heading>
          <ArtistAlbums artist={artist.artist} />
        </div>
      )}
    </Show>
  );
};

export default Artist;
