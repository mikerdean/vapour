export const toStringOf = (
  count: number | null | undefined,
  type = "item",
  typePlural = "items",
): string | undefined => {
  if (count === undefined || count === null) {
    return;
  }

  return `${count} ${count === 1 ? type : typePlural}`;
};
