<script>
  /**
   * Key/value rows — order summaries, payout breakdowns, spec tables.
   *
   * Rendered as a real `<dl>` rather than a stack of divs. That is not
   * pedantry: a screen reader announces "Subtotal, $2.99" as a pair from a
   * definition list and as two unrelated strings from divs, and this is the
   * component that carries the numbers a user is about to agree to.
   *
   * The `<dl>` keeps its rows in `<div>` wrappers, which is the one grouping
   * the spec allows inside a definition list and the only way to lay a row out
   * with flex without breaking the dt/dd association.
   */
  let {
    size = "md",
    leader = false,
    dividers = false,
    class: klass = "",
    children,
    ...rest
  } = $props();
</script>

<dl
  class="ui-datalist {klass}"
  data-size={size}
  data-leader={leader || undefined}
  data-dividers={dividers || undefined}
  {...rest}
>
  {@render children?.()}
</dl>

<style>
  .ui-datalist {
    display: flex;
    flex-direction: column;
    gap: var(--dl-gap);
    margin: 0;
    min-width: 0;
    font-size: var(--dl-fs);
  }
  .ui-datalist[data-size="sm"] { --dl-gap: var(--ui-space-4); --dl-fs: var(--ui-text-sm); }
  .ui-datalist[data-size="md"] { --dl-gap: var(--ui-space-5); --dl-fs: var(--ui-text-md); }
  .ui-datalist[data-size="lg"] { --dl-gap: var(--ui-space-6); --dl-fs: var(--ui-text-base); }

  .ui-datalist[data-dividers] {
    gap: 0;
  }
  .ui-datalist[data-dividers] :global(.ui-datalist-row + .ui-datalist-row) {
    border-top: 1px solid var(--ui-border-subtle);
  }
  .ui-datalist[data-dividers] :global(.ui-datalist-row) {
    padding-block: var(--dl-gap);
  }
</style>
