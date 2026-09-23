<script>
  import Icon from "../Icon/Icon.svelte";

  /** Removable chip. Also useful on its own for filters and applied facets. */
  let {
    label = undefined,
    size = "md",
    tone = "neutral",
    variant = "surface",
    pill = false,
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
  data-pill={pill || undefined}
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
    border-radius: var(--ui-control-radius-xs);
    background: var(--ui-bg-surface);
    color: var(--ui-fg-default);
    font-size: var(--tag-fs);
    font-weight: var(--ui-label-weight);
    letter-spacing: var(--ui-tracking-snug);
    line-height: 1;
    max-width: 100%;
    box-shadow: var(--ui-shadow-sm);
  }
  .ui-tag[data-size="sm"] { --tag-h: 22px; --tag-px: var(--ui-space-4); --tag-fs: var(--ui-text-xs); --tag-gap: var(--ui-space-2); }
  .ui-tag[data-size="md"] { --tag-h: 28px; --tag-px: var(--ui-space-5); --tag-fs: var(--ui-text-sm); --tag-gap: var(--ui-space-3); }
  .ui-tag[data-size="lg"] { --tag-h: 32px; --tag-px: var(--ui-space-6); --tag-fs: var(--ui-text-md); --tag-gap: var(--ui-space-3); }

  .ui-tag[data-pill] {
    border-radius: var(--ui-radius-full);
  }
  .ui-tag[data-pill] .ui-tag__remove {
    border-radius: var(--ui-radius-full);
  }
  .ui-tag[draggable="true"] {
    cursor: grab;
    user-select: none;
  }
  .ui-tag[draggable="true"]:active {
    cursor: grabbing;
  }

  .ui-tag[data-variant="outline"] {
    background: var(--ui-bg-surface);
  }
  .ui-tag[data-tone="accent"],
  .ui-tag[data-variant="soft"][data-tone="accent"] {
    background: var(--ui-accent-soft);
    border-color: var(--ui-accent-border);
    color: var(--ui-accent-text);
  }
  .ui-tag[data-variant="outline"][data-tone="accent"] {
    background: var(--ui-bg-surface);
    border-color: var(--ui-accent-border);
    color: var(--ui-accent-text);
  }
  .ui-tag[data-variant="solid"] {
    background: var(--ui-bg-inverse);
    border-color: transparent;
    color: var(--ui-fg-on-solid, #ffffff);
    box-shadow: var(--ui-shadow-xs);
  }
  .ui-tag[data-variant="solid"] .ui-tag__remove {
    color: var(--ui-fg-on-solid, #ffffff);
    opacity: 0.85;
  }
  .ui-tag[data-variant="solid"] .ui-tag__remove:hover:not(:disabled) {
    background: hsl(0 0% 100% / 0.2);
    color: var(--ui-fg-on-solid, #ffffff);
    opacity: 1;
  }
  .ui-tag[data-variant="solid"][data-tone="accent"] {
    background: linear-gradient(
      180deg,
      oklch(from var(--ui-accent-solid) calc(l + 0.035) c h) 0%,
      var(--ui-accent-solid) 100%
    );
    border-color: transparent;
    color: var(--ui-fg-on-solid);
    box-shadow:
      inset 0 1px 0 hsl(0 0% 100% / 0.22),
      0 1px 2px oklch(from var(--ui-accent-solid) calc(l - 0.2) c h / 0.25);
  }
  .ui-tag[data-variant="solid"][data-tone="accent"] .ui-tag__remove {
    color: var(--ui-fg-on-solid);
    opacity: 0.8;
  }
  .ui-tag[data-variant="solid"][data-tone="accent"] .ui-tag__remove:hover:not(:disabled) {
    background: hsl(0 0% 100% / 0.2);
    color: var(--ui-fg-on-solid);
    opacity: 1;
  }
  .ui-tag[data-tone="accent"] .ui-tag__remove {
    color: var(--ui-accent-text);
  }
  .ui-tag[data-tone="accent"] .ui-tag__remove:hover:not(:disabled) {
    background: var(--ui-accent-border);
    color: var(--ui-accent-text);
  }
  .ui-tag[data-tone="muted"] {
    background: var(--ui-bg-muted);
    border-color: transparent;
    box-shadow: none;
  }
  .ui-tag[data-tone="success"] {
    background: var(--ui-success-soft);
    border-color: var(--ui-success-border);
    color: var(--ui-success-text);
  }
  .ui-tag[data-tone="warning"] {
    background: var(--ui-warning-soft);
    border-color: var(--ui-warning-border);
    color: var(--ui-warning-text);
  }
  .ui-tag[data-tone="danger"] {
    background: var(--ui-danger-soft);
    border-color: var(--ui-danger-border);
    color: var(--ui-danger-text);
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
    transform: translateY(-0.5px);
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
