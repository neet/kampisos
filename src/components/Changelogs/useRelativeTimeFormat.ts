const rtf = new Intl.RelativeTimeFormat("ja", { numeric: "auto" });

export const useRelativeTimeFormat = (date: Date): string => {
  const diff = date.getTime() - Date.now();

  const relativeDate = rtf.format(
    Math.round(diff / 1000 / 60 / 60 / 24),
    "day",
  );

  return relativeDate;
};
