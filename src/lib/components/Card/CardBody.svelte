<script>
  let { padding = "md", class: klass = "", children, ...rest } = $props();
</script>

<div class="ui-card-body {klass}" data-padding={padding} {...rest}>
  {@render children?.()}
</div>

<style>
  .ui-card-body[data-padding="none"] { padding: 0; }
  /* The reference sets a panel's gutter at 24px and never lets the content
     touch a corner radius that large; 12/16 made the card look like a table
     row with rounded corners. */
  .ui-card-body[data-padding="sm"] { padding: var(--ui-space-8); }
  .ui-card-body[data-padding="md"] { padding: var(--ui-space-10) var(--ui-space-12); }
  .ui-card-body[data-padding="lg"] { padding: var(--ui-space-14) var(--ui-space-16); }
</style>
