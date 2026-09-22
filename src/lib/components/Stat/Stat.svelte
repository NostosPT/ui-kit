<script>
  import Icon from "../Icon/Icon.svelte";
  import Price from "../Price/Price.svelte";

  /**
   * The metric block from the reference's dashboard cards: a quiet label, a
   * headline figure, an optional delta beside it, and whatever the card wants
   * underneath — breakdown rows, a sparkline, a link.
   *
   * The figure goes through Price rather than being rendered here, so a
   * currency mark lands on the baseline the same way in a metric card as it
   * does in a checkout total. `value` therefore accepts what Price accepts,
   * and `mark` / `unit` pass straight through.
   *
   * The `action` snippet is a corner slot rather than a prop pair, because in
   * the reference that corner holds three different things across four cards —
   * a button, an icon tile, a bare link — and none of them is the component's
   * business.
   */
  let {
    label = undefined,
    value = undefined,
    mark = undefined,
    unit = undefined,
    hint = undefined,
    size = "md",
    align = "start",
    class: klass = "",
    action,
    trend,
    children,
    ...rest
  } = $props();

  const priceSize = $derived({ sm: "md", md: "lg", lg: "xl" }[size] ?? "lg");
</script>

<div class="ui-stat {klass}" data-size={size} data-align={align} {...rest}>
  {#if label || action}
    <div class="ui-stat__head">
      {#if label}
        <span class="ui-stat__label">
          {label}
          {#if hint}
            <span class="ui-stat__hint" title={hint}>
              <Icon name="info" size={14} />
            </span>
          {/if}
        </span>
      {/if}
      {#if action}<span class="ui-stat__action">{@render action()}</span>{/if}
    </div>
  {/if}

  <div class="ui-stat__figure">
    {#if value !== undefined}
      <Price
        {mark}
        {unit}
        amount={value}
        size={priceSize}
        markPlacement={mark ? "detached" : "attached"}
      />
    {/if}
    {#if trend}<span class="ui-stat__trend">{@render trend()}</span>{/if}
  </div>

  {#if children}
    <div class="ui-stat__body">{@render children()}</div>
  {/if}
</div>

<style>
  .ui-stat {
    display: flex;
    flex-direction: column;
    gap: var(--stat-gap);
    min-width: 0;
  }
  .ui-stat[data-align="center"] { align-items: center; text-align: center; }

  .ui-stat[data-size="sm"] { --stat-gap: var(--ui-space-3); }
  .ui-stat[data-size="md"] { --stat-gap: var(--ui-space-4); }
  .ui-stat[data-size="lg"] { --stat-gap: var(--ui-space-5); }

  .ui-stat__head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--ui-space-6);
    min-height: var(--ui-control-h-xs);
  }
  .ui-stat__label {
    display: inline-flex;
    align-items: center;
    gap: var(--ui-space-3);
    font-size: var(--ui-text-md);
    font-weight: var(--ui-label-weight);
    letter-spacing: var(--ui-tracking-snug);
    color: var(--ui-fg-default);
    min-width: 0;
  }
  .ui-stat__hint {
    display: inline-grid;
    place-items: center;
    color: var(--ui-fg-faint);
    cursor: help;
  }
  .ui-stat__action { flex: none; }

  /* Baseline, not centre: the delta is set much smaller than the figure, and
     centring it makes it float somewhere around the figure's waist. */
  .ui-stat__figure {
    display: flex;
    align-items: baseline;
    flex-wrap: wrap;
    gap: var(--ui-space-5);
    min-width: 0;
  }
  .ui-stat__trend { flex: none; }

  .ui-stat__body {
    display: flex;
    flex-direction: column;
    gap: var(--ui-space-4);
    min-width: 0;
  }
</style>
