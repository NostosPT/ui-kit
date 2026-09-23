<script>
  /**
   * Title block with an optional trailing action slot. The divider is opt-in:
   * headers that sit above padded prose usually read better without one.
   */
  let {
    title = undefined,
    description = undefined,
    divided = false,
    compact = false,
    class: klass = "",
    actions,
    children,
    ...rest
  } = $props();
</script>

<header
  class="ui-card-header {klass}"
  data-divided={divided || undefined}
  data-compact={compact || undefined}
  {...rest}
>
  <div class="ui-card-header__text">
    {#if title}<h3 class="ui-card-header__title">{title}</h3>{/if}
    {#if description}<p class="ui-card-header__desc">{description}</p>{/if}
    {@render children?.()}
  </div>
  {#if actions}
    <div class="ui-card-header__actions">{@render actions()}</div>
  {/if}
</header>

<style>
  .ui-card-header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: var(--ui-space-8);
    padding: var(--ui-space-10) var(--ui-space-12) var(--ui-space-6);
  }
  .ui-card-header[data-compact] {
    padding: var(--ui-space-6) var(--ui-space-8) var(--ui-space-5);
  }
  .ui-card-header[data-divided] {
    border-bottom: 1px solid var(--ui-border-subtle);
    padding-bottom: var(--ui-space-7);
  }

  .ui-card-header__text {
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: var(--ui-space-2);
  }
  .ui-card-header__title {
    margin: 0;
    font-size: var(--ui-text-base);
    font-weight: var(--ui-heading-weight);
    letter-spacing: var(--ui-tracking-snug);
    line-height: var(--ui-leading-snug);
  }
  .ui-card-header__desc {
    margin: 0;
    font-size: var(--ui-text-md);
    color: var(--ui-fg-muted);
    line-height: var(--ui-leading-normal);
  }
  .ui-card-header__actions {
    display: flex;
    align-items: center;
    gap: var(--ui-space-4);
    flex: none;
  }
</style>
