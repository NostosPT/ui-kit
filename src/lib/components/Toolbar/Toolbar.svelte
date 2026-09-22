<script>
  /**
   * Horizontal action bar. `Toolbar.Spacer` is expressed as the `spacer`
   * utility class rather than a component, so a consumer can drop
   * `<div class="ui-toolbar__spacer" />` anywhere without another import.
   */
  let {
    variant = "plain",
    size = "md",
    wrap = false,
    ariaLabel = undefined,
    class: klass = "",
    children,
    ...rest
  } = $props();
</script>

<div
  class="ui-toolbar {klass}"
  role="toolbar"
  aria-label={ariaLabel}
  data-variant={variant}
  data-size={size}
  data-wrap={wrap || undefined}
  {...rest}
>
  {@render children?.()}
</div>

<style>
  .ui-toolbar {
    display: flex;
    align-items: center;
    gap: var(--tb-gap);
    min-width: 0;
  }
  .ui-toolbar[data-wrap] { flex-wrap: wrap; }
  .ui-toolbar[data-size="sm"] { --tb-gap: var(--ui-space-3); --tb-pad: var(--ui-space-3); }
  .ui-toolbar[data-size="md"] { --tb-gap: var(--ui-space-4); --tb-pad: var(--ui-space-4); }
  .ui-toolbar[data-size="lg"] { --tb-gap: var(--ui-space-6); --tb-pad: var(--ui-space-5); }

  .ui-toolbar[data-variant="card"] {
    padding: var(--tb-pad);
    background: var(--ui-bg-surface);
    border: 1px solid var(--ui-border-default);
    border-radius: var(--ui-radius-xl);
    box-shadow: var(--ui-shadow-sm);
  }
  /* A floating toolbar is the overlay treatment — heavier shadow, no border,
     meant to sit over content rather than in the flow. */
  .ui-toolbar[data-variant="floating"] {
    padding: var(--tb-pad);
    background: var(--ui-bg-raised);
    border-radius: var(--ui-radius-full);
    box-shadow: var(--ui-shadow-lg);
  }

  .ui-toolbar :global(.ui-toolbar__spacer) {
    flex: 1;
    min-width: var(--ui-space-4);
  }
  .ui-toolbar :global(.ui-toolbar__divider) {
    width: 1px;
    align-self: stretch;
    margin-block: var(--ui-space-2);
    margin-inline: var(--ui-space-2);
    background: var(--ui-border-default);
    flex: none;
  }
</style>
