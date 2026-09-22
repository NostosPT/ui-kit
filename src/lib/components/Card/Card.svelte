<script>
  /**
   * The surface everything else sits on. Elevation and border are separate
   * props because the reference design uses both independently: panels inside
   * a page get a border and no shadow, floating panels get both.
   */
  let {
    elevation = "sm",
    bordered = true,
    radius = "xl",
    padding = "none",
    interactive = false,
    as = "div",
    class: klass = "",
    children,
    ...rest
  } = $props();
</script>

<svelte:element
  this={as}
  class="ui-card {klass}"
  data-elevation={elevation}
  data-bordered={bordered || undefined}
  data-radius={radius}
  data-padding={padding}
  data-interactive={interactive || undefined}
  {...rest}
>
  {@render children?.()}
</svelte:element>

<style>
  .ui-card {
    position: relative;
    background: var(--ui-bg-surface);
    border: 1px solid transparent;
    color: var(--ui-fg-default);
  }
  .ui-card[data-bordered] {
    border-color: var(--ui-border-default);
  }

  .ui-card[data-radius="md"] { border-radius: var(--ui-radius-md); }
  .ui-card[data-radius="lg"] { border-radius: var(--ui-radius-lg); }
  .ui-card[data-radius="xl"] { border-radius: var(--ui-radius-xl); }
  .ui-card[data-radius="2xl"] { border-radius: var(--ui-radius-2xl); }

  .ui-card[data-elevation="none"] { box-shadow: none; }
  .ui-card[data-elevation="xs"] { box-shadow: var(--ui-shadow-xs); }
  .ui-card[data-elevation="sm"] { box-shadow: var(--ui-shadow-sm); }
  .ui-card[data-elevation="md"] { box-shadow: var(--ui-shadow-md); }
  .ui-card[data-elevation="lg"] { box-shadow: var(--ui-shadow-lg); }
  .ui-card[data-elevation="xl"] { box-shadow: var(--ui-shadow-xl); }

  .ui-card[data-padding="sm"] { padding: var(--ui-space-6); }
  .ui-card[data-padding="md"] { padding: var(--ui-space-8); }
  .ui-card[data-padding="lg"] { padding: var(--ui-space-12); }

  .ui-card[data-interactive] {
    cursor: pointer;
    transition:
      border-color var(--ui-duration-fast) var(--ui-ease-out),
      box-shadow var(--ui-duration-fast) var(--ui-ease-out),
      transform var(--ui-duration-fast) var(--ui-ease-out);
  }
  .ui-card[data-interactive]:hover {
    border-color: var(--ui-border-strong);
    box-shadow: var(--ui-shadow-md);
  }
</style>
