export type Pages = {
  value: number[];
  hasMore: {
    head: boolean;
    tail: boolean;
  };
};

export const createPages = (
  current: number,
  total: number,
  maxToShow: number,
): Pages => {
  const pages = Array.from({ length: total }, (_, i) => i);

  if (total <= maxToShow) {
    return {
      value: pages,
      hasMore: {
        head: false,
        tail: false,
      },
    };
  }

  const start = Math.max(0, current - Math.floor(maxToShow / 2));
  const end = Math.min(total, start + maxToShow);

  return {
    value: pages.slice(start, end),
    hasMore: {
      head: start > 0,
      tail: end < total,
    },
  };
};
