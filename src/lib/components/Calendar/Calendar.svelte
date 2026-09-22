<script>
  import Icon from "../Icon/Icon.svelte";
  import {
    startOfDay, isSameDay, isSameMonth, addDays, addMonths, monthGrid, weekdayLabels, clampDate
  } from "../../internal/date.js";

  /**
   * Month grid. Supports a single date or a range.
   *
   * Keyboard handling follows the grid pattern: arrows move by day and week,
   * PageUp/PageDown by month, Home/End to the ends of the week. Only one cell
   * is in the tab order at a time, so tabbing past a calendar takes one press
   * rather than forty-two.
   */
  let {
    value = $bindable(undefined),
    month = $bindable(undefined),
    mode = "single",
    min = undefined,
    max = undefined,
    weekStartsOn = 1,
    locale = undefined,
    isDisabled = undefined,
    showOutsideDays = true,
    size = "md",
    class: klass = "",
    onchange,
    ...rest
  } = $props();

  const today = startOfDay(new Date());

  let view = $state(startOfDay(month ?? (Array.isArray(value) ? value[0] : value) ?? today));
  let focused = $state(startOfDay((Array.isArray(value) ? value[0] : value) ?? today));
  let gridEl = $state(null);

  const weeks = $derived(monthGrid(view, weekStartsOn));
  const labels = $derived(weekdayLabels(locale, weekStartsOn, "narrow"));
  const monthLabel = $derived(
    new Intl.DateTimeFormat(locale, { month: "long", year: "numeric" }).format(view)
  );
  const range = $derived(mode === "range" ? (Array.isArray(value) ? value : []) : []);

  const disabledFor = (d) =>
    (min && d < startOfDay(min)) || (max && d > startOfDay(max)) || Boolean(isDisabled?.(d));

  function isSelected(d) {
    if (mode === "range") return range.some((r) => isSameDay(d, r));
    return isSameDay(d, value);
  }
  function inRange(d) {
    if (mode !== "range" || range.length < 2) return false;
    const [a, b] = range;
    return d > a && d < b;
  }

  function pick(d) {
    if (disabledFor(d)) return;

    if (mode === "range") {
      // A complete range starts over; an open range completes, ordering the
      // ends so a backwards selection still produces [start, end].
      const next = range.length === 1 ? [range[0], d].sort((x, y) => x - y) : [d];
      value = next;
    } else {
      value = d;
    }
    if (!isSameMonth(d, view)) view = new Date(d.getFullYear(), d.getMonth(), 1);
    focused = d;
    onchange?.(value);
  }

  function onkeydown(event) {
    const moves = {
      ArrowLeft: () => addDays(focused, -1),
      ArrowRight: () => addDays(focused, 1),
      ArrowUp: () => addDays(focused, -7),
      ArrowDown: () => addDays(focused, 7),
      PageUp: () => addDays(focused, -28),
      PageDown: () => addDays(focused, 28),
      Home: () => addDays(focused, -((focused.getDay() - weekStartsOn + 7) % 7)),
      End: () => addDays(focused, 6 - ((focused.getDay() - weekStartsOn + 7) % 7))
    };

    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      pick(focused);
      return;
    }
    const move = moves[event.key];
    if (!move) return;

    event.preventDefault();
    const next = clampDate(move(), min && startOfDay(min), max && startOfDay(max));
    focused = next;
    if (!isSameMonth(next, view)) view = new Date(next.getFullYear(), next.getMonth(), 1);

    // The grid re-renders around the new month, so wait a tick before hunting
    // for the cell to focus.
    queueMicrotask(() => gridEl?.querySelector("[tabindex='0']")?.focus());
  }
</script>

<div class="ui-calendar {klass}" data-size={size} {...rest}>
  <div class="ui-calendar__header">
    <button
      type="button"
      class="ui-calendar__nav"
      aria-label="Previous month"
      onclick={() => (view = addMonths(view, -1))}
    >
      <Icon name="chevron-left" size={16} />
    </button>

    <span class="ui-calendar__month" aria-live="polite">{monthLabel}</span>

    <button
      type="button"
      class="ui-calendar__nav"
      aria-label="Next month"
      onclick={() => (view = addMonths(view, 1))}
    >
      <Icon name="chevron-right" size={16} />
    </button>
  </div>

  <div
    bind:this={gridEl}
    class="ui-calendar__grid"
    role="grid"
    tabindex="-1"
    aria-label={monthLabel}
    {onkeydown}
  >
    <div class="ui-calendar__weekdays" role="row">
      {#each labels as label, i (i)}
        <span class="ui-calendar__weekday" role="columnheader" aria-label={label}>{label}</span>
      {/each}
    </div>

    {#each weeks as week, w (w)}
      <div class="ui-calendar__week" role="row">
        {#each week as day (day.getTime())}
          {@const outside = !isSameMonth(day, view)}
          {@const selected = isSelected(day)}
          {@const disabled = disabledFor(day)}
          <button
            type="button"
            role="gridcell"
            class="ui-calendar__day"
            data-outside={outside || undefined}
            data-today={isSameDay(day, today) || undefined}
            data-selected={selected || undefined}
            data-in-range={inRange(day) || undefined}
            aria-selected={selected}
            aria-label={day.toDateString()}
            {disabled}
            tabindex={isSameDay(day, focused) ? 0 : -1}
            hidden={outside && !showOutsideDays}
            onclick={() => pick(day)}
            onfocus={() => (focused = day)}
          >
            {day.getDate()}
          </button>
        {/each}
      </div>
    {/each}
  </div>
</div>

<style>
  .ui-calendar {
    display: flex;
    flex-direction: column;
    gap: var(--ui-space-4);
    /* Fixed width keeps the popover from resizing between months. */
    width: fit-content;
    user-select: none;
  }
  .ui-calendar[data-size="sm"] { --cal-cell: 32px; --cal-fs: var(--ui-text-sm); }
  .ui-calendar[data-size="md"] { --cal-cell: 38px; --cal-fs: var(--ui-text-md); }
  .ui-calendar[data-size="lg"] { --cal-cell: 44px; --cal-fs: var(--ui-text-base); }

  .ui-calendar__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--ui-space-4);
    padding-inline: var(--ui-space-2);
  }
  .ui-calendar__month {
    font-size: var(--ui-text-base);
    font-weight: var(--ui-weight-semibold);
    letter-spacing: var(--ui-tracking-snug);
  }
  /* Bordered, like every other month-stepper in the reference — a bare glyph
     in the header reads as decoration rather than as something to press. */
  .ui-calendar__nav {
    display: grid;
    place-items: center;
    width: var(--ui-control-h-xs);
    height: var(--ui-control-h-xs);
    border: 1px solid var(--ui-border-default);
    border-radius: var(--ui-control-radius-xs);
    background: var(--ui-bg-surface);
    box-shadow: var(--ui-shadow-xs);
    color: var(--ui-fg-muted);
    transition:
      background-color var(--ui-duration-fast) var(--ui-ease-out),
      border-color var(--ui-duration-fast) var(--ui-ease-out),
      color var(--ui-duration-fast) var(--ui-ease-out);
  }
  .ui-calendar__nav:hover {
    background: var(--ui-bg-hover);
    border-color: var(--ui-border-strong);
    color: var(--ui-fg-default);
  }

  /* No gap: a range is drawn as one continuous band across the days it
     covers, and a 2px gutter cuts it into stripes. */
  .ui-calendar__weekdays,
  .ui-calendar__week {
    display: grid;
    grid-template-columns: repeat(7, var(--cal-cell));
    gap: 0;
  }
  .ui-calendar__weekday {
    display: grid;
    place-items: center;
    height: 30px;
    font-size: var(--ui-text-sm);
    font-weight: var(--ui-weight-medium);
    color: var(--ui-fg-subtle);
  }

  .ui-calendar__day {
    display: grid;
    place-items: center;
    width: var(--cal-cell);
    height: var(--cal-cell);
    border: 1px solid transparent;
    border-radius: var(--ui-control-radius-sm);
    font-size: var(--cal-fs);
    font-weight: var(--ui-weight-medium);
    font-variant-numeric: tabular-nums;
    color: var(--ui-fg-default);
    transition:
      background-color var(--ui-duration-fast) var(--ui-ease-out),
      color var(--ui-duration-fast) var(--ui-ease-out),
      border-color var(--ui-duration-fast) var(--ui-ease-out);
  }
  .ui-calendar__day:hover:not(:disabled):not([data-selected]) {
    background: var(--ui-bg-hover);
  }
  .ui-calendar__day[data-outside] {
    color: var(--ui-fg-faint);
  }
  .ui-calendar__day:disabled {
    color: var(--ui-fg-faint);
    opacity: 0.5;
    cursor: not-allowed;
  }
  /* Today is a ring, selected is a fill — so a selected today still reads as
     selected rather than as two competing markers. */
  .ui-calendar__day[data-today]:not([data-selected]) {
    border-color: var(--ui-border-strong);
    font-weight: var(--ui-weight-semibold);
  }
  .ui-calendar__day[data-in-range] {
    background: var(--ui-accent-soft);
    border-radius: 0;
  }
  .ui-calendar__day[data-selected] {
    background: var(--ui-accent-solid);
    color: oklch(from var(--ui-accent-solid) var(--ui-auto-fg-l) var(--ui-auto-fg-c) h);
    font-weight: var(--ui-weight-semibold);
  }
  .ui-calendar__day:focus-visible {
    outline: 2px solid var(--ui-accent-solid);
    outline-offset: 1px;
  }
</style>
