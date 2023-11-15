import { Accessor, createMemo } from "solid-js";

import useTypedSearchParams from "../../hooks/useTypedSearchParams";
import type { KodiMessageLimits } from "../../socket/types";
import { pageValidator } from "../../validators";

const useSearchPagination = (
  pageSize: number,
): [
  Accessor<{ limits: KodiMessageLimits }>,
  Accessor<{ page: number }>,
  (params: { page: number }) => void,
] => {
  const [searchParams, setSearchParams] = useTypedSearchParams(pageValidator, {
    page: 1,
  });

  const query = createMemo(() => {
    const params = searchParams();
    const start = (params.page - 1) * pageSize;
    const end = start + pageSize;

    return { limits: { start, end } };
  });

  return [query, searchParams, setSearchParams];
};

export default useSearchPagination;
