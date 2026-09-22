<script>
  /**
   * A currency amount set the way the reference sets one: the mark small and
   * quiet, the number large and bold, the period quiet again.
   *
   *   $ 611.37          $2.99 /year
   *   ^ mark            ^ amount ^ unit
   *
   * The reason this is a component rather than three spans at the call site is
   * the alignment. A `$` at the same size as a 36px figure sits far too heavy
   * and drags the optical baseline down; set smaller it has to be raised to
   * the cap line by hand. Getting that wrong is the most common way a price
   * looks amateur, and it is not something a caller should have to remember.
   */
  let {
    amount,
    mark = undefined,
    unit = undefined,
    size = "lg",
    markPlacement = "attached",
    tone = "default",
    class: klass = "",
    ...rest
  } = $props();

  const text = $derived(
    typeof amount === "number" ? amount.toLocaleString() : String(amount ?? "")
  );
</script>

<span
  class="ui-price {klass}"
  data-size={size}
  data-tone={tone}
  data-mark-placement={markPlacement}
  {...rest}
>
  {#if mark}<span class="ui-price__mark">{mark}</span>{/if}
  <span class="ui-price__amount">{text}</span>
  {#if unit}<span class="ui-price__unit">{unit}</span>{/if}
</span>

<style>
  .ui-price {
    display: inline-flex;
    align-items: baseline;
    gap: var(--price-gap);
    color: var(--ui-fg-default);
    letter-spacing: var(--ui-tracking-tight);
    line-height: var(--ui-leading-tight);
    white-space: nowrap;
  }
  .ui-price[data-tone="muted"] { color: var(--ui-fg-subtle); }
  .ui-price[data-tone="accent"] { color: var(--ui-accent-text); }

  .ui-price[data-size="sm"] { --price-fs: var(--ui-text-lg); --price-gap: 2px; }
  .ui-price[data-size="md"] { --price-fs: var(--ui-text-2xl); --price-gap: 3px; }
  .ui-price[data-size="lg"] { --price-fs: var(--ui-text-3xl); --price-gap: 4px; }
  .ui-price[data-size="xl"] { --price-fs: var(--ui-text-4xl); --price-gap: 5px; }
  .ui-price[data-size="2xl"] { --price-fs: var(--ui-text-5xl); --price-gap: 6px; }

  .ui-price__amount {
    font-size: var(--price-fs);
    font-weight: var(--ui-numeric-weight);
    font-variant-numeric: tabular-nums;
  }

  /* Attached: "$2.99" — the mark rides at full size, tight against the
     figures, which is how a price reads in running text and in a checkout
     total. */
  .ui-price[data-mark-placement="attached"] {
    --price-gap: 0;
  }
  .ui-price[data-mark-placement="attached"] .ui-price__mark {
    font-size: var(--price-fs);
    font-weight: var(--ui-numeric-weight);
  }

  /* Detached: "$ 611.37" — the dashboard treatment. The mark drops two steps
     and goes quiet, and `align-items: baseline` on the row is what keeps it
     sitting on the figures' baseline instead of floating. */
  .ui-price[data-mark-placement="detached"] {
    --price-gap: var(--ui-space-3);
  }
  .ui-price[data-mark-placement="detached"] .ui-price__mark {
    font-size: calc(var(--price-fs) * 0.52);
    font-weight: var(--ui-numeric-weight);
    color: var(--ui-fg-subtle);
  }

  .ui-price__unit {
    font-size: var(--ui-text-md);
    font-weight: var(--ui-weight-normal);
    letter-spacing: var(--ui-tracking-normal);
    color: var(--ui-fg-subtle);
    margin-inline-start: var(--ui-space-2);
  }
</style>
