import { Duration } from "luxon";

export const getTextDuration = (seconds: number): string | undefined => {
  if (seconds < 0) {
    return undefined;
  }

  const d = Duration.fromObject({ seconds }).shiftTo(
    "hours",
    "minutes",
    "seconds"
  );

  if (d.hours > 0) {
    return d.toFormat("hh:mm:ss");
  } else if (d.minutes > 0) {
    return d.toFormat("mm:ss");
  } else {
    return `${d.seconds}s`;
  }
};
