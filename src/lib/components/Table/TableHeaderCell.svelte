<script>
  import Icon from "../Icon/Icon.svelte";

  /**
   * Header cell with optional sorting. When `sortable`, the whole cell becomes
   * a button and `aria-sort` reflects the current direction, which is what
   * screen readers announce — the arrow alone communicates nothing.
   */
  let {
    sortable = false,
    direction = undefined,
    align = undefined,
    numeric = false,
    width = undefined,
    class: klass = "",
    children,
    onsort,
    ...rest
  } = $props();

  const ariaSort = $derived(
    !sortable ? undefined : direction === "asc" ? "ascending" : direction === "desc" ? "descending" : "none"
  );
</script>

<th
  class="ui-th {klass}"
  scope="col"
  aria-sort={ariaSort}
  data-numeric={numeric || undefined}
  style:text-align={align ?? (numeric ? "end" : undefined)}
  style:width
  {...rest}
>
  {#if sortable}
    <button
      type="button"
      class="ui-th__sort"
      onclick={() => onsort?.(direction === "asc" ? "desc" : "asc")}
    >
      <span>{@render children?.()}</span>
      <Icon
        name={direction === "asc" ? "chevron-up" : direction === "desc" ? "chevron-down" : "chevron-vertical"}
        size={12}
      />
    </button>
  {:else}
    {@render children?.()}
  {/if}
</th>

<style>
  .ui-th[data-numeric] {
    font-variant-numeric: tabular-nums;
  }
  .ui-th__sort {
    display: inline-flex;
    align-items: center;
    gap: var(--ui-space-2);
    color: inherit;
    font: inherit;
    /* Extends the hit area over the cell's padding without changing layout. */
    margin: calc(var(--ui-space-2) * -1) calc(var(--ui-space-3) * -1);
    padding: var(--ui-space-2) var(--ui-space-3);
    border-radius: var(--ui-radius-sm);
    transition: color var(--ui-duration-fast) var(--ui-ease-out);
  }
  .ui-th__sort:hover {
    color: var(--ui-fg-default);
    background: var(--ui-bg-hover);
  }
  .ui-th[aria-sort="ascending"] .ui-th__sort,
  .ui-th[aria-sort="descending"] .ui-th__sort {
    color: var(--ui-fg-default);
  }
</style>
