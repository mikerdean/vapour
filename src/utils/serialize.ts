const isPrimitive = (value: unknown): boolean =>
  typeof value === "string" ||
  typeof value === "boolean" ||
  typeof value === "number";

const isPlainObject = (value: unknown): value is Record<string, unknown> =>
  !!value && typeof value === "object" && value.constructor === Object;

const reorder = (value: unknown): unknown => {
  if (isPrimitive(value)) {
    return value;
  }

  if (isPlainObject(value)) {
    const keys = Object.keys(value).sort();
    const reordered: Record<string, unknown> = {};

    for (const key of keys) {
      reordered[key] = reorder(value[key]);
    }

    return reordered;
  }

  if (Array.isArray(value)) {
    return value.map(reorder);
  }

  return undefined;
};

export const serialize = (value: unknown): string => {
  const ordered = reorder(value);
  return JSON.stringify(ordered);
};
