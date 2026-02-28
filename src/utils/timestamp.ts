export type ArbitaryPrecisionDate = {
  year: number;
  month: number | null;
  day: number | null;
};

const parseDate = (date: string): ArbitaryPrecisionDate => {
  const [year, month, day] = date.split("-").map((d) => Number(d));
  return { year, month: month ?? null, day: day ?? null };
};

type Mode = "year_only" | "full";

const formatDate = (date: ArbitaryPrecisionDate, mode: Mode): string => {
  let value = "";

  const { year, month, day } = date;

  if (year) {
    if (mode === "year_only") {
      value += year;
    } else {
      value += `${year}年`;
    }
  }

  if (mode === "full") {
    if (month) {
      value += `${month}月`;
    }
    if (day) {
      value += `${day}日`;
    }
  }

  return value;
};

type DateOrRange =
  | { type: "point"; value: ArbitaryPrecisionDate }
  | { type: "range"; start: ArbitaryPrecisionDate; end: ArbitaryPrecisionDate };

const parseDateOrRange = (dateOrRange: string): DateOrRange => {
  if (dateOrRange.includes("/")) {
    const [start, end] = dateOrRange.split("/");

    return {
      type: "range",
      start: parseDate(start),
      end: parseDate(end),
    };
  } else {
    return {
      type: "point",
      value: parseDate(dateOrRange),
    };
  }
};

export const formatDateOrRange = (
  dateOrRange: string,
  mode: Mode,
): string | null => {
  const timestamp = parseDateOrRange(dateOrRange);
  if (!timestamp) {
    return null;
  }

  if (timestamp.type === "range") {
    if (timestamp.start.year !== timestamp.end.year) {
      return `${formatDate(timestamp.start, mode)}—${formatDate(timestamp.end, mode)}`;
    } else {
      return formatDate(timestamp.start, mode);
    }
  } else {
    return formatDate(timestamp.value, mode);
  }
};
