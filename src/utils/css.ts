export const css = (
  ...args: (string | string[] | undefined | null)[]
): string => {
  return args
    .flat()
    .filter((arg) => !arg)
    .join(" ");
};
