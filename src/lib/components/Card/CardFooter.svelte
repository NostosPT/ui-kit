<script>
  /** Action bar. Defaults to right-aligned — the dominant pattern in the kit. */
  let {
    align = "end",
    divided = true,
    muted = false,
    compact = false,
    class: klass = "",
    children,
    ...rest
  } = $props();
</script>

<footer
  class="ui-card-footer {klass}"
  data-align={align}
  data-divided={divided || undefined}
  data-muted={muted || undefined}
  data-compact={compact || undefined}
  {...rest}
>
  {@render children?.()}
</footer>

<style>
  .ui-card-footer {
    display: flex;
    align-items: center;
    gap: var(--ui-space-4);
    padding: var(--ui-space-6) var(--ui-space-8);
  }
  .ui-card-footer[data-compact] {
    padding: var(--ui-space-5) var(--ui-space-7);
  }
  .ui-card-footer[data-divided] {
    border-top: 1px solid var(--ui-border-subtle);
  }
  /* A muted footer tints the action bar so it separates from the content even
     when the card is edge-to-edge inside a larger panel. */
  .ui-card-footer[data-muted] {
    background: var(--ui-bg-sunken);
    border-bottom-left-radius: inherit;
    border-bottom-right-radius: inherit;
  }
  .ui-card-footer[data-align="end"] { justify-content: flex-end; }
  .ui-card-footer[data-align="start"] { justify-content: flex-start; }
  .ui-card-footer[data-align="between"] { justify-content: space-between; }
  .ui-card-footer[data-align="center"] { justify-content: center; }
</style>
