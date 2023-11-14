import type { HeadingLevel } from "./heading.types";

const headingClasses: Record<HeadingLevel, string> = {
  [1]: "text-xl border-b-2 border-slate-600 text-cyan-400 mb-4",
  [2]: "text-lg text-cyan-500 mb-3 underline underline-offset-4 decoration-2 decoration-cyan-900",
  [3]: "",
  [4]: "",
  [5]: "",
  [6]: "",
};

export const getHeadingClass = (level: HeadingLevel): string =>
  headingClasses[level];
