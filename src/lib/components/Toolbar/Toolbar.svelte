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
  .ui-toolbar[data-size="xs"] {
    --tb-gap: var(--ui-space-2);
    --tb-pad: var(--ui-space-2);
    --btn-h: var(--ui-control-h-xs);
    --btn-px: var(--ui-control-px-xs);
    --btn-fs: var(--ui-text-xs);
    --btn-gap: var(--ui-control-gap-xs);
    --btn-radius: var(--ui-control-radius-xs);
  }
  .ui-toolbar[data-size="sm"] {
    --tb-gap: var(--ui-space-3);
    --tb-pad: var(--ui-space-3);
    --btn-h: var(--ui-control-h-sm);
    --btn-px: var(--ui-control-px-sm);
    --btn-fs: var(--ui-text-sm);
    --btn-gap: var(--ui-control-gap-sm);
    --btn-radius: var(--ui-control-radius-sm);
  }
  .ui-toolbar[data-size="md"] {
    --tb-gap: var(--ui-space-4);
    --tb-pad: var(--ui-space-4);
    --btn-h: var(--ui-control-h-md);
    --btn-px: var(--ui-control-px-md);
    --btn-fs: var(--ui-text-md);
    --btn-gap: var(--ui-control-gap-md);
    --btn-radius: var(--ui-control-radius-md);
  }
  .ui-toolbar[data-size="lg"] {
    --tb-gap: var(--ui-space-6);
    --tb-pad: var(--ui-space-5);
    --btn-h: var(--ui-control-h-lg);
    --btn-px: var(--ui-control-px-lg);
    --btn-fs: var(--ui-text-base);
    --btn-gap: var(--ui-control-gap-lg);
    --btn-radius: var(--ui-control-radius-lg);
  }

  .ui-toolbar[data-variant="card"] {
    padding: var(--tb-pad);
    background: var(--ui-bg-surface);
    border: 1px solid var(--ui-border-default);
    border-radius: var(--ui-radius-2xl);
    box-shadow: var(--ui-shadow-sm);
  }
  /* A floating toolbar is the overlay treatment — elevated surface with crisp border
     and inner highlight, meant to sit over content rather than in the flow. */
  .ui-toolbar[data-variant="floating"] {
    padding: var(--tb-pad);
    background: var(--ui-bg-raised);
    border: 1px solid var(--ui-border-default);
    border-radius: var(--ui-radius-full);
    box-shadow:
      inset 0 1px 0 hsl(0 0% 100% / 0.18),
      var(--ui-shadow-lg);
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
