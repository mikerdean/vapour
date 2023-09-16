import { useParams } from "@solidjs/router";
import { type Accessor, createMemo } from "solid-js";
import { type BaseSchema, parse } from "valibot";

const useTypedParams = <T>(schema: BaseSchema<T>): Accessor<T> => {
  const routeParams = useParams();
  const params = createMemo<T>(() => parse(schema, routeParams));
  return params;
};

export default useTypedParams;
