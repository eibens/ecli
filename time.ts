const formats = [
  ".SSS",
  ":ss",
  ":mm",
  "THH",
  "-dd",
  "-MM",
  "yyyy",
];

const intervals = [
  "millisecond",
  "second",
  "minute",
  "hour",
  "day",
  "month",
  "year",
];

export type Interval = (typeof intervals)[number];

export type Options = {
  min?: Interval;
  max?: Interval;
};

export function format(opts: Options = {}) {
  const min = intervals.indexOf(opts.min || "millisecond");
  const max = intervals.indexOf(opts.max || "year");
  if (max < min) throw new Error("min is greater than max");
  return formats.slice(min, max + 1).reverse().join("");
}
