<script>
  import Icon from "../Icon/Icon.svelte";

  /**
   * One row of a DataList.
   *
   * `variant` covers the three the reference actually uses:
   *
   *   default  Subtotal                        $2.99
   *   sub      · Payments ⓘ                   -$7.74   (indented, quieter)
   *   total    Payout total                   $74.85   (ruled off, heavier)
   *
   * The dotted leader is drawn with a repeating radial gradient on a flexible
   * middle cell, not with `border-bottom: dotted` on the label. A dotted
   * border renders at the label's width, so it stops dead where the text stops
   * instead of running to the number — which is the whole point of a leader.
   */
  let {
    label = undefined,
    value = undefined,
    variant = "default",
    hint = undefined,
    muted = false,
    class: klass = "",
    children,
    valueSlot,
    ...rest
  } = $props();
</script>

<div
  class="ui-datalist-row {klass}"
  data-variant={variant}
  data-muted={muted || undefined}
  {...rest}
>
  <dt class="ui-datalist-row__label">
    {#if variant === "sub"}<span class="ui-datalist-row__bullet" aria-hidden="true">·</span>{/if}
    <span class="ui-datalist-row__text">{label}{@render children?.()}</span>
    {#if hint}
      <span class="ui-datalist-row__hint" title={hint}><Icon name="info" size={14} /></span>
    {/if}
  </dt>
  <span class="ui-datalist-row__leader" aria-hidden="true"></span>
  <dd class="ui-datalist-row__value">
    {#if valueSlot}{@render valueSlot()}{:else}{value}{/if}
  </dd>
</div>

<style>
  .ui-datalist-row {
    display: flex;
    align-items: baseline;
    gap: var(--ui-space-4);
    min-width: 0;
  }

  .ui-datalist-row__label {
    display: inline-flex;
    align-items: baseline;
    gap: var(--ui-space-3);
    min-width: 0;
    color: var(--ui-fg-muted);
  }
  .ui-datalist-row__text {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .ui-datalist-row__hint {
    color: var(--ui-fg-faint);
    cursor: help;
    /* The icon is a block element, so it needs pulling back onto the text
       baseline it is sitting beside. */
    transform: translateY(2px);
  }
  .ui-datalist-row__bullet {
    color: var(--ui-fg-faint);
    flex: none;
  }

  .ui-datalist-row__value {
    margin: 0;
    flex: none;
    color: var(--ui-fg-default);
    font-weight: var(--ui-label-weight);
    font-variant-numeric: tabular-nums;
  }

  /* Hidden until the list asks for it, so a plain summary has no leader and a
     priced-out breakdown does. */
  .ui-datalist-row__leader {
    display: none;
    flex: 1;
    min-width: var(--ui-space-8);
    height: 1px;
    transform: translateY(-3px);
  }
  :global(.ui-datalist[data-leader]) .ui-datalist-row__leader {
    display: block;
    background-image: radial-gradient(
      circle closest-side,
      var(--ui-border-strong) 99%,
      transparent 100%
    );
    background-size: 5px 1px;
    background-repeat: repeat-x;
    background-position: 0 center;
  }
  /* Without a leader the value still has to sit hard right. */
  :global(.ui-datalist:not([data-leader])) .ui-datalist-row__leader {
    display: block;
    flex: 1;
  }

  .ui-datalist-row[data-variant="sub"] {
    padding-inline-start: var(--ui-space-4);
    font-size: 0.93em;
  }
  .ui-datalist-row[data-variant="sub"] .ui-datalist-row__value {
    font-weight: var(--ui-weight-medium);
    color: var(--ui-fg-muted);
  }

  .ui-datalist-row[data-variant="total"] {
    padding-top: var(--ui-space-5);
    border-top: 1px solid var(--ui-border-default);
    font-size: var(--ui-text-lg);
  }
  .ui-datalist-row[data-variant="total"] .ui-datalist-row__label {
    color: var(--ui-fg-default);
    font-weight: var(--ui-heading-weight);
  }
  .ui-datalist-row[data-variant="total"] .ui-datalist-row__value {
    font-weight: var(--ui-numeric-weight);
  }
  .ui-datalist-row[data-variant="total"] .ui-datalist-row__leader {
    background-image: none;
  }

  .ui-datalist-row[data-muted] .ui-datalist-row__value {
    color: var(--ui-fg-faint);
    font-weight: var(--ui-weight-normal);
  }
</style>
