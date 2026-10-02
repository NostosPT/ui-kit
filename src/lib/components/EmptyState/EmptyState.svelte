<script>
  import Icon from "../Icon/Icon.svelte";

  /** Zero-state panel: icon, headline, one sentence, one or two actions. */
  let {
    icon = "folder",
    title = "Nothing here yet",
    description = undefined,
    size = "md",
    bordered = false,
    class: klass = "",
    actions,
    children,
    ...rest
  } = $props();
</script>

<div class="ui-empty {klass}" data-size={size} data-bordered={bordered || undefined} {...rest}>
  {#if icon}
    <span class="ui-empty__icon"><Icon name={icon} size={size === "sm" ? 18 : 22} /></span>
  {/if}
  <p class="ui-empty__title">{title}</p>
  {#if description}<p class="ui-empty__desc">{description}</p>{/if}
  {@render children?.()}
  {#if actions}<div class="ui-empty__actions">{@render actions()}</div>{/if}
</div>

<style>
  .ui-empty {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: var(--ui-space-2);
    padding: var(--empty-pad);
    min-width: 0;
  }
  .ui-empty[data-size="sm"] { --empty-pad: var(--ui-space-10) var(--ui-space-8); }
  .ui-empty[data-size="md"] { --empty-pad: var(--ui-space-20) var(--ui-space-12); }
  .ui-empty[data-size="lg"] { --empty-pad: var(--ui-space-32) var(--ui-space-12); }

  .ui-empty[data-bordered] {
    border: 1px dashed var(--ui-border-strong);
    border-radius: var(--ui-radius-2xl);
    background: var(--ui-bg-sunken);
  }

  .ui-empty__icon {
    display: grid;
    place-items: center;
    width: 44px;
    height: 44px;
    margin-bottom: var(--ui-space-4);
    border-radius: var(--ui-radius-2xl);
    background: var(--ui-bg-muted);
    color: var(--ui-fg-subtle);
  }
  .ui-empty__title {
    margin: 0;
    font-family: var(--ui-font-heading);
    font-size: var(--ui-text-base);
    font-weight: var(--ui-heading-weight);
    letter-spacing: var(--ui-tracking-snug);
  }
  .ui-empty__desc {
    margin: 0;
    /* Roughly 60 characters — past that a zero-state stops being scannable. */
    max-width: 38ch;
    font-size: var(--ui-text-md);
    line-height: var(--ui-leading-relaxed);
    color: var(--ui-fg-muted);
  }
  .ui-empty__actions {
    display: flex;
    gap: var(--ui-space-4);
    margin-top: var(--ui-space-6);
  }
</style>
