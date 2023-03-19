type CssArgument = string | undefined | null;

export const css = (...args: (CssArgument | CssArgument[])[]): string => {
  return args
    .flat()
    .filter((arg) => arg)
    .join(" ");
};
