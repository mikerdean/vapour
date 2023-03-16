import { useParams } from "@solidjs/router";
import { Accessor, createMemo } from "solid-js";
import z, { ZodTypeAny } from "zod";

type ParamsResult<T extends ZodTypeAny> = Accessor<z.infer<T>>;

const useTypedParams = <T extends ZodTypeAny>(schema: T): ParamsResult<T> => {
  const routeParams = useParams();
  const params = createMemo<z.infer<T>>(() => {
    const result = schema.safeParse(routeParams);
    if (result.success) {
      return result.data;
    }

    return schema.parse(undefined);
  });

  return params;
};

export default useTypedParams;
