import { useSearchParams } from "@solidjs/router";
import { createMemo } from "solid-js";
import z, { ZodTypeAny } from "zod";

type SearchParamsResult<T extends ZodTypeAny> = [
  z.infer<T>,
  (value: z.infer<T>) => void
];

const useTypedParams = <T extends ZodTypeAny>(
  schema: T
): SearchParamsResult<T> => {
  const [searchParams, setSearchParams] = useSearchParams();

  const params = createMemo<z.infer<T>>(() => schema.parse(searchParams));

  const setParams = (value: z.infer<T>): void => {
    const result = schema.safeParse(value);
    if (result.success) {
      setSearchParams(result.data);
    }
  };

  return [params, setParams];
};

export default useTypedParams;
