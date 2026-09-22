<script>
  let { class: klass = "", children, ...rest } = $props();
</script>

<div class="ui-menu-label {klass}" role="presentation" {...rest}>
  {@render children?.()}
</div>

<style>
  .ui-menu-label {
    padding: var(--ui-space-4) var(--ui-space-5) var(--ui-space-2);
    font-size: var(--ui-text-xs);
    font-weight: var(--ui-weight-medium);
    color: var(--ui-fg-faint);
    letter-spacing: var(--ui-tracking-wide);
  }
</style>
