import { useSearchParams, type SetParams } from "@solidjs/router";
import { Accessor, createMemo } from "solid-js";
import { safeParse, type BaseSchema } from "valibot";

type SearchParamsResult<T> = [Accessor<T>, (value: T) => void];

const useTypedSearchParams = <T extends SetParams>(
  schema: BaseSchema<T>,
  defaultValue: T,
): SearchParamsResult<T> => {
  const [searchParams, setSearchParams] = useSearchParams();

  const params = createMemo<T>(() => {
    const result = safeParse(schema, searchParams);
    if (result.success) {
      return result.output;
    }

    return defaultValue;
  });

  const setParams = (value: T): void => {
    const result = safeParse(schema, value);
    if (result.success) {
      setSearchParams(result.output);
    }
  };

  return [params, setParams];
};

export default useTypedSearchParams;
