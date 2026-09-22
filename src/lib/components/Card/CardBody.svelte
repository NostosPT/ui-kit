<script>
  let { padding = "md", class: klass = "", children, ...rest } = $props();
</script>

<div class="ui-card-body {klass}" data-padding={padding} {...rest}>
  {@render children?.()}
</div>

<style>
  .ui-card-body[data-padding="none"] { padding: 0; }
  .ui-card-body[data-padding="sm"] { padding: var(--ui-space-6) var(--ui-space-7); }
  .ui-card-body[data-padding="md"] { padding: var(--ui-space-6) var(--ui-space-8); }
  .ui-card-body[data-padding="lg"] { padding: var(--ui-space-10) var(--ui-space-12); }
</style>
