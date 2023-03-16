import { useParams } from "@solidjs/router";
import { createMemo } from "solid-js";
import z, { ZodTypeAny } from "zod";

type ParamsResult<T extends ZodTypeAny> = z.infer<T>;

const useTypedParams = <T extends ZodTypeAny>(schema: T): ParamsResult<T> => {
  const routeParams = useParams();
  const params = createMemo<z.infer<T>>(() => schema.parse(routeParams));

  return params;
};

export default useTypedParams;
