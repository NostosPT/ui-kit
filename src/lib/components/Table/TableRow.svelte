<script>
  let {
    selected = false,
    disabled = false,
    interactive = false,
    class: klass = "",
    children,
    onclick,
    ...rest
  } = $props();
</script>

<tr
  class="ui-tr {klass}"
  data-selected={selected || undefined}
  data-disabled={disabled || undefined}
  data-clickable={interactive || Boolean(onclick) || undefined}
  aria-selected={selected || undefined}
  onclick={disabled ? undefined : onclick}
  {...rest}
>
  {@render children?.()}
</tr>

<style>
  .ui-tr {
    transition: background-color var(--ui-duration-fast) var(--ui-ease-out);
  }
  .ui-tr[data-clickable] {
    cursor: pointer;
  }
  :global(.ui-table[data-hoverable]) .ui-tr:hover > :global(td) {
    background: var(--ui-bg-hover);
  }
  /* Painting the tint on the cells rather than the row means it survives the
     sticky/positioned cells that selection controls usually sit in. */
  .ui-tr[data-selected] > :global(td) {
    background: var(--ui-bg-selected);
  }
  .ui-tr[data-disabled] {
    opacity: 0.55;
  }
  .ui-tr:focus-visible {
    outline: 2px solid var(--ui-accent-solid);
    outline-offset: -2px;
  }
</style>
