<script>
  let {
    class: klass = "",
    children,
    ...rest
  } = $props();
</script>

<nav class="ui-sidebar-nav {klass}" {...rest}>
  {@render children?.()}
</nav>

<style>
  .ui-sidebar-nav {
    display: flex;
    flex-direction: column;
    gap: var(--ui-space-1);
    flex: 1;
    min-height: 0;
    overflow-y: auto;
    overflow-x: hidden;
    scrollbar-width: thin;
    scrollbar-color: var(--ui-border-default) transparent;
    padding-inline: 2px;
  }

  .ui-sidebar-nav::-webkit-scrollbar {
    width: 4px;
  }
  .ui-sidebar-nav::-webkit-scrollbar-thumb {
    background: var(--ui-border-default);
    border-radius: var(--ui-radius-full);
  }
</style>
