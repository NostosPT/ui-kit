<script>
  /**
   * Storybook decorator shell. Every story renders inside one of these panes,
   * and the pane is the only thing that carries theme state — no component in
   * the kit reads a global. That is the constraint being demonstrated: swap
   * four custom properties here and the entire surface re-skins.
   *
   * In side-by-side mode the story snippet is rendered twice, producing two
   * genuinely independent component instances rather than a cloned DOM copy.
   */
  let { themes = ["light"], vars = {}, children } = $props();

  const style = $derived(
    Object.entries(vars)
      .map(([k, v]) => `${k}:${v}`)
      .join(";")
  );
</script>

<div class="sb-theme-host" data-split={themes.length > 1}>
  {#each themes as theme (theme)}
    <div class="ui-root sb-theme-pane" data-ui-theme={theme} {style}>
      {@render children?.()}
    </div>
  {/each}
</div>
