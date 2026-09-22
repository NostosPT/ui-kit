/**
 * Date helpers for the Calendar. Everything here works on local-time Date
 * objects normalised to midnight, because a calendar grid is a *civil* date
 * question — "is this the 21st?" — and comparing timestamps across a DST
 * boundary otherwise produces off-by-one days.
 */

export const startOfDay = (d) => new Date(d.getFullYear(), d.getMonth(), d.getDate());

export const isSameDay = (a, b) =>
  Boolean(a && b) &&
  a.getFullYear() === b.getFullYear() &&
  a.getMonth() === b.getMonth() &&
  a.getDate() === b.getDate();

export const isSameMonth = (a, b) =>
  Boolean(a && b) && a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth();

export const addDays = (d, n) => new Date(d.getFullYear(), d.getMonth(), d.getDate() + n);
export const addMonths = (d, n) => new Date(d.getFullYear(), d.getMonth() + n, 1);

/**
 * Six weeks of days covering `month`, padded with neighbouring months.
 * Always six rows: a grid that changes height as you page through months is
 * the single most jarring thing a date picker can do.
 */
export function monthGrid(month, weekStartsOn = 1) {
  const first = new Date(month.getFullYear(), month.getMonth(), 1);
  const offset = (first.getDay() - weekStartsOn + 7) % 7;
  const start = addDays(first, -offset);

  return Array.from({ length: 6 }, (_, w) =>
    Array.from({ length: 7 }, (_, d) => addDays(start, w * 7 + d))
  );
}

/** Localised weekday initials in the order the grid renders them. */
export function weekdayLabels(locale, weekStartsOn = 1, format = "short") {
  const fmt = new Intl.DateTimeFormat(locale, { weekday: format });
  // 2024-01-07 is a Sunday, so index 0 lines up with getDay() === 0.
  return Array.from({ length: 7 }, (_, i) =>
    fmt.format(new Date(2024, 0, 7 + ((i + weekStartsOn) % 7)))
  );
}

export const clampDate = (d, min, max) => {
  if (min && d < min) return min;
  if (max && d > max) return max;
  return d;
};
