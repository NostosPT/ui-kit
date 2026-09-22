<script>
  /**
   * Keyboard hint. Accepts either children or a `keys` array — the array form
   * inserts the separators for you, which is what you want for the
   * "⌘ + ⇧" affordance that sits inside send buttons.
   */
  let { keys = undefined, separator = "+", size = "md", class: klass = "", children, ...rest } = $props();
</script>

<span class="ui-kbd-set {klass}" data-size={size} {...rest}>
  {#if keys}
    {#each keys as key, i (key + i)}
      {#if i > 0}<span class="ui-kbd-set__sep" aria-hidden="true">{separator}</span>{/if}
      <kbd class="ui-kbd">{key}</kbd>
    {/each}
  {:else}
    <kbd class="ui-kbd">{@render children?.()}</kbd>
  {/if}
</span>

<style>
  .ui-kbd-set {
    display: inline-flex;
    align-items: center;
    gap: var(--ui-space-1);
    vertical-align: middle;
  }
  .ui-kbd {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: var(--kbd-size);
    height: var(--kbd-size);
    padding-inline: var(--ui-space-2);
    border: 1px solid var(--ui-border-default);
    /* The bottom border reads as the key's edge — one pixel of skeuomorphism
       that makes a kbd unmistakable at 11px. */
    border-bottom-width: 1.5px;
    border-radius: var(--ui-radius-sm);
    background: var(--ui-bg-surface);
    color: var(--ui-fg-muted);
    font-family: var(--ui-font-sans);
    font-size: var(--kbd-fs);
    font-weight: var(--ui-label-weight);
    line-height: 1;
  }
  .ui-kbd-set[data-size="sm"] { --kbd-size: 16px; --kbd-fs: var(--ui-text-2xs); }
  .ui-kbd-set[data-size="md"] { --kbd-size: 20px; --kbd-fs: var(--ui-text-xs); }
  .ui-kbd-set[data-size="lg"] { --kbd-size: 24px; --kbd-fs: var(--ui-text-sm); }

  .ui-kbd-set__sep {
    font-size: var(--kbd-fs);
    color: var(--ui-fg-faint);
    padding-inline: 1px;
  }
</style>
