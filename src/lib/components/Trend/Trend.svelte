<script>
  import Icon from "../Icon/Icon.svelte";

  /**
   * The delta that sits next to a metric — "↗ 2.6%", "↘ 7.0%".
   *
   * Two decisions carry this component:
   *
   * 1. Direction is derived from the number by default, so a caller passing a
   *    live value never has to keep a sign and an arrow in sync. Passing
   *    `direction` explicitly is still allowed for the cases where the arrow
   *    means something the number doesn't — a forecast, say.
   *
   * 2. `goodWhen` separates *which way the number moved* from *whether that is
   *    good news*. Revenue up is green; churn up is red; the arrow points the
   *    same way in both. Without that split every cost metric in a dashboard
   *    ends up hand-coloured at the call site, which is exactly where a design
   *    system leaks.
   */
  let {
    value = 0,
    direction = "auto",
    goodWhen = "up",
    format = undefined,
    variant = "plain",
    size = "md",
    showArrow = true,
    class: klass = "",
    children,
    ...rest
  } = $props();

  const dir = $derived(
    direction !== "auto"
      ? direction
      : value > 0
        ? "up"
        : value < 0
          ? "down"
          : "flat"
  );

  /* neutral when flat, or when the caller says neither way is news */
  const tone = $derived(
    dir === "flat" || goodWhen === "neither"
      ? "neutral"
      : (dir === goodWhen ? "positive" : "negative")
  );

  const arrow = $derived(
    { up: "trending-up", down: "trending-down", flat: "minus" }[dir]
  );
  const iconSize = $derived({ sm: 13, md: 15, lg: 17 }[size] ?? 15);

  /* The sign lives in the arrow, so the text drops it — "↘ 7.0%", not
     "↘ -7.0%". A caller wanting the sign back passes its own `format`. */
  const text = $derived(
    format ? format(value) : `${Math.abs(value).toFixed(1)}%`
  );
</script>

<span
  class="ui-trend {klass}"
  data-tone={tone}
  data-variant={variant}
  data-size={size}
  data-direction={dir}
  {...rest}
>
  {#if showArrow}<Icon name={arrow} size={iconSize} />{/if}
  <span class="ui-trend__value">
    {#if children}{@render children()}{:else}{text}{/if}
  </span>
</span>

<style>
  .ui-trend {
    --trend-fg: var(--ui-fg-muted);
    --trend-bg: var(--ui-bg-muted);

    display: inline-flex;
    align-items: center;
    gap: var(--trend-gap);
    color: var(--trend-fg);
    font-size: var(--trend-fs);
    font-weight: var(--ui-label-weight);
    font-variant-numeric: tabular-nums;
    letter-spacing: var(--ui-tracking-snug);
    line-height: 1;
    white-space: nowrap;
    vertical-align: middle;
  }

  .ui-trend[data-size="sm"] { --trend-fs: var(--ui-text-xs); --trend-gap: var(--ui-space-2); --trend-h: 20px; --trend-px: var(--ui-space-4); }
  .ui-trend[data-size="md"] { --trend-fs: var(--ui-text-sm); --trend-gap: var(--ui-space-2); --trend-h: 26px; --trend-px: var(--ui-space-5); }
  .ui-trend[data-size="lg"] { --trend-fs: var(--ui-text-md); --trend-gap: var(--ui-space-3); --trend-h: 30px; --trend-px: var(--ui-space-6); }

  .ui-trend[data-tone="positive"] {
    --trend-fg: var(--ui-success-text);
    --trend-bg: var(--ui-success-soft);
  }
  .ui-trend[data-tone="negative"] {
    --trend-fg: var(--ui-danger-text);
    --trend-bg: var(--ui-danger-soft);
  }

  /* The soft variant is the badge form the reference uses beside a headline
     number; plain is for table cells, where a filled pill in every row turns
     the column into wallpaper. */
  .ui-trend[data-variant="soft"] {
    height: var(--trend-h);
    padding-inline: var(--trend-px);
    border-radius: var(--ui-radius-full);
    background: var(--trend-bg);
  }
</style>
