<script>
  import Avatar from "./Avatar.svelte";

  /**
   * Overlapping stack with an overflow counter. `items` is a plain array of
   * `{ src, name }` so this works straight off an API response.
   */
  let {
    items = [],
    max = 4,
    size = "md",
    overlap = 0.3,
    class: klass = "",
    ...rest
  } = $props();

  const shown = $derived(items.slice(0, max));
  const extra = $derived(Math.max(0, items.length - max));
</script>

<div class="ui-avatar-group {klass}" style:--overlap={overlap} {...rest}>
  {#each shown as item, i (item.id ?? item.name ?? i)}
    <Avatar {...item} {size} ring />
  {/each}
  {#if extra}
    <span class="ui-avatar-group__more" data-size={size}>+{extra}</span>
  {/if}
</div>

<style>
  .ui-avatar-group {
    display: inline-flex;
    align-items: center;
    /* Negative margin on every child but the first; `isolation` keeps the
       stacking order local so a later sibling can't paint over the page. */
    isolation: isolate;
  }
  .ui-avatar-group > :global(* + *) {
    margin-inline-start: calc(var(--avatar-size, 32px) * var(--overlap) * -1);
  }
  /* Earlier avatars sit on top, so the stack reads left-to-right like text. */
  .ui-avatar-group > :global(*) {
    position: relative;
  }
  .ui-avatar-group > :global(*:nth-child(1)) { z-index: 6; }
  .ui-avatar-group > :global(*:nth-child(2)) { z-index: 5; }
  .ui-avatar-group > :global(*:nth-child(3)) { z-index: 4; }
  .ui-avatar-group > :global(*:nth-child(4)) { z-index: 3; }
  .ui-avatar-group > :global(*:nth-child(5)) { z-index: 2; }

  .ui-avatar-group__more {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    z-index: 1;
    border-radius: var(--ui-radius-full);
    background: var(--ui-bg-muted);
    color: var(--ui-fg-muted);
    border: 2px solid var(--ui-bg-surface);
    font-weight: var(--ui-weight-semibold);
    letter-spacing: var(--ui-tracking-tight);
    --avatar-size: 32px;
    width: var(--avatar-size);
    height: var(--avatar-size);
    font-size: calc(var(--avatar-size) * 0.33);
  }
  .ui-avatar-group__more[data-size="xs"] { --avatar-size: 20px; }
  .ui-avatar-group__more[data-size="sm"] { --avatar-size: 24px; }
  .ui-avatar-group__more[data-size="lg"] { --avatar-size: 40px; }
  .ui-avatar-group__more[data-size="xl"] { --avatar-size: 56px; }
</style>
