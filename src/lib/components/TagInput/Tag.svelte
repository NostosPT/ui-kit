<script>
  import Icon from "../Icon/Icon.svelte";

  /** Removable chip. Also useful on its own for filters and applied facets. */
  let {
    label = undefined,
    size = "md",
    tone = "neutral",
    variant = "surface",
    removable = false,
    disabled = false,
    icon = undefined,
    avatar = undefined,
    image = undefined,
    class: klass = "",
    leading,
    children,
    onremove,
    ...rest
  } = $props();

  const avatarSrc = $derived(typeof avatar === "string" ? avatar : avatar?.src ?? (typeof image === "string" ? image : undefined));
  const iconSize = $derived(size === "sm" ? 11 : size === "lg" ? 15 : 13);
</script>

<span
  class="ui-tag {klass}"
  data-size={size}
  data-tone={tone}
  data-variant={variant}
  data-disabled={disabled || undefined}
  {...rest}
>
  {#if leading}
    <span class="ui-tag__leading">{@render leading()}</span>
  {:else if avatarSrc}
    <img class="ui-tag__avatar" src={avatarSrc} alt="" />
  {:else if icon}
    <Icon name={icon} size={iconSize} />
  {/if}
  <span class="ui-tag__label">{label}{@render children?.()}</span>
  {#if removable}
    <button
      type="button"
      class="ui-tag__remove"
      aria-label={`Remove ${label ?? "item"}`}
      {disabled}
      onclick={(e) => {
        e.stopPropagation();
        onremove?.();
      }}
    >
      <Icon name="x" size={size === "sm" ? 10 : 12} strokeWidth={2.5} />
    </button>
  {/if}
</span>

<style>
  .ui-tag {
    display: inline-flex;
    align-items: center;
    gap: var(--tag-gap);
    height: var(--tag-h);
    padding-inline: var(--tag-px);
    border: 1px solid var(--ui-border-default);
    border-radius: var(--ui-radius-md);
    background: var(--ui-bg-surface);
    color: var(--ui-fg-default);
    font-size: var(--tag-fs);
    font-weight: var(--ui-label-weight);
    letter-spacing: var(--ui-tracking-snug);
    line-height: 1;
    max-width: 100%;
    box-shadow: var(--ui-shadow-xs);
  }
  .ui-tag[data-size="sm"] { --tag-h: 22px; --tag-px: var(--ui-space-4); --tag-fs: var(--ui-text-xs); --tag-gap: var(--ui-space-2); }
  .ui-tag[data-size="md"] { --tag-h: 28px; --tag-px: var(--ui-space-5); --tag-fs: var(--ui-text-sm); --tag-gap: var(--ui-space-3); }
  .ui-tag[data-size="lg"] { --tag-h: 32px; --tag-px: var(--ui-space-6); --tag-fs: var(--ui-text-md); --tag-gap: var(--ui-space-3); }

  .ui-tag[data-tone="accent"] {
    background: var(--ui-accent-soft);
    border-color: var(--ui-accent-border);
    color: var(--ui-accent-text);
  }
  .ui-tag[data-variant="solid"][data-tone="accent"] {
    background: var(--ui-accent-solid);
    border-color: transparent;
    color: #ffffff;
  }
  .ui-tag[data-variant="solid"][data-tone="accent"] .ui-tag__remove {
    color: #ffffff;
    opacity: 0.8;
  }
  .ui-tag[data-variant="solid"][data-tone="accent"] .ui-tag__remove:hover:not(:disabled) {
    background: rgba(255, 255, 255, 0.2);
    color: #ffffff;
    opacity: 1;
  }
  .ui-tag[data-tone="muted"] {
    background: var(--ui-bg-muted);
    border-color: transparent;
    box-shadow: none;
  }
  .ui-tag[data-disabled] {
    opacity: 0.6;
  }

  .ui-tag__leading {
    display: flex;
    align-items: center;
    /* Pull an avatar flush with the chip's rounded edge. */
    margin-inline-start: calc(var(--tag-px) * -0.5);
  }
  .ui-tag__avatar {
    width: calc(var(--tag-h) - 8px);
    height: calc(var(--tag-h) - 8px);
    border-radius: var(--ui-radius-full);
    object-fit: cover;
    margin-inline-start: -2px;
  }
  .ui-tag__label {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .ui-tag__remove {
    display: grid;
    place-items: center;
    width: calc(var(--tag-h) - 10px);
    height: calc(var(--tag-h) - 10px);
    margin-inline-end: -2px;
    border-radius: var(--ui-radius-xs);
    color: var(--ui-fg-faint);
    transition:
      background-color var(--ui-duration-fast) var(--ui-ease-out),
      color var(--ui-duration-fast) var(--ui-ease-out);
  }
  .ui-tag__remove:hover:not(:disabled) {
    background: var(--ui-bg-emphasis);
    color: var(--ui-fg-default);
  }
</style>
