<script>
  /**
   * Container for ListItem rows. Handles the separators and the rounded ends
   * so individual rows stay dumb.
   */
  let {
    divided = true,
    bordered = false,
    inset = false,
    as = "div",
    class: klass = "",
    children,
    ...rest
  } = $props();
</script>

<svelte:element
  this={as}
  class="ui-list {klass}"
  data-divided={divided || undefined}
  data-bordered={bordered || undefined}
  data-inset={inset || undefined}
  {...rest}
>
  {@render children?.()}
</svelte:element>

<style>
  .ui-list {
    display: flex;
    flex-direction: column;
    min-width: 0;
  }
  .ui-list[data-bordered] {
    border: 1px solid var(--ui-border-default);
    border-radius: var(--ui-radius-xl);
    background: var(--ui-bg-surface);
    overflow: hidden;
  }
  .ui-list[data-divided] > :global(* + *) {
    border-top: 1px solid var(--ui-border-subtle);
  }
  /* Inset rules stop short of the container edge, which reads as a tighter
     grouping — the treatment used for file libraries in the reference. */
  .ui-list[data-inset][data-divided] > :global(* + *) {
    border-top: none;
    position: relative;
  }
  .ui-list[data-inset][data-divided] > :global(* + *)::before {
    content: "";
    position: absolute;
    top: 0;
    left: var(--ui-space-8);
    right: var(--ui-space-8);
    height: 1px;
    background: var(--ui-border-subtle);
  }
</style>
