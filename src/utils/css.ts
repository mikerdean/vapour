export const css = (...args: (string | string[])[]): string => {
  return args.flat().join(" ");
};
