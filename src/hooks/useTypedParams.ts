import { useParams } from "@solidjs/router";
import { createMemo, type Accessor } from "solid-js";
import { parse, type BaseSchema } from "valibot";

const useTypedParams = <T>(schema: BaseSchema<T>): Accessor<T> => {
  const routeParams = useParams();
  const params = createMemo<T>(() => parse(schema, routeParams));
  return params;
};

export default useTypedParams;
