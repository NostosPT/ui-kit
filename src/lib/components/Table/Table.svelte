<script>
  /**
   * Thin styling over real table semantics. Sorting, selection and pagination
   * are the consumer's state — this layer owns presentation only, which is
   * what keeps it usable with a server-driven data source.
   *
   * The horizontal scroll container lives here rather than around the table,
   * so a sticky header still works: `position: sticky` needs the scroll port
   * to be an ancestor of the header, not a sibling.
   */
  let {
    density = "comfortable",
    stickyHeader = false,
    bordered = false,
    hoverable = true,
    layout = "auto",
    class: klass = "",
    children,
    ...rest
  } = $props();
</script>

<div
  class="ui-table-scroll {klass}"
  data-sticky={stickyHeader || undefined}
  data-bordered={bordered || undefined}
>
  <table
    class="ui-table"
    data-density={density}
    data-hoverable={hoverable || undefined}
    style:table-layout={layout}
    {...rest}
  >
    {@render children?.()}
  </table>
</div>

<style>
  .ui-table-scroll {
    width: 100%;
    overflow-x: auto;
    /* Needed for sticky headers: the sticky element must scroll inside this
       box, and a max-height turns it into the vertical scroll port too. */
    position: relative;
  }
  .ui-table-scroll[data-bordered] {
    border: 1px solid var(--ui-border-default);
    border-radius: var(--ui-radius-2xl);
    background: var(--ui-bg-surface);
  }

  .ui-table {
    width: 100%;
    border-collapse: separate;
    border-spacing: 0;
    font-size: var(--ui-text-md);
    color: var(--ui-fg-default);
  }

  .ui-table[data-density="compact"] { --row-py: var(--ui-space-4); --row-px: var(--ui-space-6); }
  .ui-table[data-density="comfortable"] { --row-py: var(--ui-space-6); --row-px: var(--ui-space-7); }
  .ui-table[data-density="spacious"] { --row-py: var(--ui-space-8); --row-px: var(--ui-space-8); }

  :global(.ui-table thead th) {
    position: relative;
    padding: var(--ui-space-5) var(--row-px);
    background: var(--ui-bg-sunken);
    font-size: var(--ui-text-sm);
    font-weight: var(--ui-weight-medium);
    color: var(--ui-fg-subtle);
    text-align: start;
    letter-spacing: var(--ui-tracking-snug);
    white-space: nowrap;
    border-bottom: 1px solid var(--ui-border-default);
  }
  .ui-table-scroll[data-sticky] :global(thead th) {
    position: sticky;
    top: 0;
    z-index: var(--ui-z-sticky);
  }

  :global(.ui-table tbody td) {
    padding: var(--row-py) var(--row-px);
    border-bottom: 1px solid var(--ui-border-subtle);
    vertical-align: middle;
  }
  :global(.ui-table tbody tr:last-child td) {
    border-bottom: none;
  }
</style>
