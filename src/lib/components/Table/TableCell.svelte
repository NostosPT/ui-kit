<script>
  /** A body cell. `numeric` switches to tabular figures and end alignment. */
  let {
    align = undefined,
    numeric = false,
    truncate = false,
    width = undefined,
    muted = false,
    depth = 0,
    class: klass = "",
    children,
    ...rest
  } = $props();
</script>

<td
  class="ui-td {klass}"
  data-numeric={numeric || undefined}
  data-truncate={truncate || undefined}
  data-muted={muted || undefined}
  data-depth={depth > 0 ? depth : undefined}
  style:text-align={align ?? (numeric ? "end" : undefined)}
  style:width
  style:padding-inline-start={depth > 0 ? `calc(var(--row-px) + ${depth * 20}px)` : undefined}
  {...rest}
>
  {#if truncate}
    <span class="ui-td__truncate">{@render children?.()}</span>
  {:else}
    {@render children?.()}
  {/if}
</td>

<style>
  .ui-td[data-numeric] {
    font-variant-numeric: tabular-nums;
  }
  .ui-td[data-muted] {
    color: var(--ui-fg-muted);
  }
  /* Truncation needs a block box with a width; a table cell won't shrink on
     its own, so the ellipsis lives on an inner element. */
  .ui-td[data-truncate] {
    max-width: 0;
  }
  .ui-td__truncate {
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
</style>
