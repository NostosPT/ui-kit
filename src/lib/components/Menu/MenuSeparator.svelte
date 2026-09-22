<script>
  let { class: klass = "", ...rest } = $props();
</script>

<div class="ui-menu-sep {klass}" role="separator" {...rest}></div>

<style>
  .ui-menu-sep {
    height: 1px;
    background: var(--ui-border-subtle);
    /* Negative inline margin lets the rule span the popover's padding, which
       is what makes it read as a divider rather than an underline. */
    margin: var(--ui-space-3) calc(var(--ui-space-3) * -1);
  }
</style>
