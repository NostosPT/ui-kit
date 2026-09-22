<script>
  /**
   * Joins adjacent buttons into one control — the "Documents / Export / ⋯"
   * toolbar in the reference.
   *
   * It styles its children through :global rather than cloning them with new
   * props, so anything button-shaped can be dropped in, including a plain
   * <button> or a third-party control, as long as it carries `.ui-btn`.
   */
  let {
    attached = true,
    size = undefined,
    ariaLabel = undefined,
    class: klass = "",
    children,
    ...rest
  } = $props();
</script>

<div
  class="ui-btn-group {klass}"
  role="group"
  aria-label={ariaLabel}
  data-attached={attached || undefined}
  data-size={size}
  {...rest}
>
  {@render children?.()}
</div>

<style>
  .ui-btn-group {
    display: inline-flex;
    align-items: center;
  }
  .ui-btn-group:not([data-attached]) {
    gap: var(--ui-space-4);
  }

  /* Overlap by exactly one pixel so the shared edge is a single line rather
     than two stacked borders. Works with direct buttons and popover anchors. */
  .ui-btn-group[data-attached] > :global(.ui-btn + .ui-btn),
  .ui-btn-group[data-attached] > :global(.ui-btn + * .ui-btn),
  .ui-btn-group[data-attached] > :global(* + * .ui-btn) {
    margin-inline-start: -1px;
  }
  .ui-btn-group[data-attached] > :global(.ui-btn:not(:first-child):not(:last-child)),
  .ui-btn-group[data-attached] > :global(*:not(:first-child):not(:last-child) .ui-btn) {
    border-radius: 0;
  }
  .ui-btn-group[data-attached] > :global(.ui-btn:first-child:not(:last-child)),
  .ui-btn-group[data-attached] > :global(*:first-child:not(:last-child) .ui-btn) {
    border-start-end-radius: 0;
    border-end-end-radius: 0;
  }
  .ui-btn-group[data-attached] > :global(.ui-btn:last-child:not(:first-child)),
  .ui-btn-group[data-attached] > :global(*:last-child:not(:first-child) .ui-btn) {
    border-start-start-radius: 0;
    border-end-start-radius: 0;
  }
  /* Hover and focus must win the overlap, or the neighbour's border paints
     over the highlighted edge. */
  .ui-btn-group[data-attached] > :global(.ui-btn:hover),
  .ui-btn-group[data-attached] > :global(.ui-btn:focus-visible),
  .ui-btn-group[data-attached] > :global(*:hover .ui-btn),
  .ui-btn-group[data-attached] > :global(*:focus-within .ui-btn) {
    position: relative;
    z-index: 1;
  }
</style>
