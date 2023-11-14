export const calculateStart = (
  currentPage: number,
  totalPages: number,
  maxPages: number,
): number => {
  if (totalPages < maxPages) {
    return 1;
  }

  const midMax = Math.floor(maxPages / 2);
  const min = currentPage - midMax;
  const max = totalPages - midMax;

  if (min > 1 && currentPage <= max) {
    return min;
  }

  if (currentPage > max) {
    return totalPages - maxPages + 1;
  }

  return 1;
};
