import { createMemo, type Accessor } from "solid-js";

import { useHost } from "../components/context/hostProvider";

const createKodiImageUrl = (
  uri: Accessor<string | undefined>,
): Accessor<string | undefined> => {
  const [host] = useHost();

  const imageUrl = createMemo<string | undefined>(() => {
    const baseUrl = host.httpUrl;
    const kodiUri = uri();
    if (!baseUrl || !kodiUri) {
      return;
    }

    const encoded = encodeURIComponent(kodiUri);
    const url = new URL(`image/${encoded}`, baseUrl);
    return url.toString();
  });

  return imageUrl;
};

export default createKodiImageUrl;
