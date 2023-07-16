import { useSearchParams } from "@solidjs/router";
import { Accessor, createMemo } from "solid-js";
import z, { ZodTypeAny } from "zod";

type SearchParamsResult<T extends ZodTypeAny> = [
  Accessor<z.infer<T>>,
  (value: z.infer<T>) => void,
];

const useTypedSearchParams = <T extends ZodTypeAny>(
  schema: T,
): SearchParamsResult<T> => {
  const [searchParams, setSearchParams] = useSearchParams();

  const params = createMemo<z.infer<T>>(() => {
    const result = schema.safeParse(searchParams);
    if (result.success) {
      return result.data;
    }

    return schema.parse(undefined);
  });

  const setParams = (value: z.infer<T>): void => {
    const result = schema.safeParse(value);
    if (result.success) {
      setSearchParams(result.data);
    }
  };

  return [params, setParams];
};

export default useTypedSearchParams;
