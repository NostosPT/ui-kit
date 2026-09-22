<script>
  import Icon from "../Icon/Icon.svelte";

  /**
   * Status chips. The reference design uses four distinct treatments for what
   * is conceptually the same object, so they are variants rather than separate
   * components:
   *
   *   soft     tinted pill        — "Paid", "Cancelled"
   *   outline  bordered pill      — "Invited"
   *   solid    filled pill        — counts and emphasis
   *   dot      coloured dot only  — "• Monthly" in a dense table cell, where a
   *                                 pill would out-shout the row it describes
   */
  let {
    tone = "neutral",
    variant = "soft",
    size = "md",
    icon = undefined,
    image = undefined,
    avatar = undefined,
    removable = false,
    dot = false,
    pill = true,
    toneText = undefined,
    class: klass = "",
    imageSnippet,
    children,
    onremove,
    ...rest
  } = $props();

  const iconSize = $derived(size === "sm" ? 11 : size === "lg" ? 15 : 13);
  const showDot = $derived(dot || variant === "dot");
  const isTonedText = $derived(toneText ?? (variant === "dot" && tone !== "neutral"));
  const avatarSrc = $derived(typeof avatar === "string" ? avatar : avatar?.src ?? (typeof image === "string" ? image : undefined));
</script>

<span
  class="ui-badge {klass}"
  data-tone={tone}
  data-variant={variant}
  data-size={size}
  data-pill={pill || undefined}
  data-tone-text={isTonedText || undefined}
  data-removable={removable || undefined}
  {...rest}
>
  {#if showDot}<span class="ui-badge__dot"></span>{/if}
  {#if avatarSrc}
    <img class="ui-badge__avatar" src={avatarSrc} alt="" />
  {:else if imageSnippet}
    {@render imageSnippet()}
  {:else if icon}
    <Icon name={icon} size={iconSize} />
  {/if}
  <span class="ui-badge__label">{@render children?.()}</span>
  {#if removable}
    <button
      type="button"
      class="ui-badge__remove"
      aria-label="Remove"
      onclick={(e) => {
        e.stopPropagation();
        onremove?.();
      }}
    >
      <Icon name="x" size={Math.max(10, iconSize - 2)} strokeWidth={2.5} />
    </button>
  {/if}
</span>

<style>
  .ui-badge {
    --badge-soft: var(--ui-neutral-soft);
    --badge-text: var(--ui-neutral-text);
    --badge-border: var(--ui-border-default);
    --badge-solid: var(--ui-bg-inverse);
    --badge-dot: var(--ui-neutral-dot);

    display: inline-flex;
    align-items: center;
    gap: var(--badge-gap);
    height: var(--badge-h);
    padding-inline: var(--badge-px);
    border: 1px solid transparent;
    border-radius: var(--ui-radius-md);
    font-size: var(--badge-fs);
    font-weight: var(--ui-label-weight);
    letter-spacing: var(--ui-tracking-snug);
    line-height: 1;
    white-space: nowrap;
    vertical-align: middle;
  }
  .ui-badge[data-pill] {
    border-radius: var(--ui-radius-full);
  }

  .ui-badge[data-size="sm"] {
    --badge-h: 22px;
    --badge-px: var(--ui-space-3);
    --badge-fs: var(--ui-text-2xs);
    --badge-gap: var(--ui-space-2);
  }
  .ui-badge[data-size="md"] {
    --badge-h: 28px;
    --badge-px: var(--ui-space-4);
    --badge-fs: var(--ui-text-xs);
    --badge-gap: var(--ui-space-3);
  }
  .ui-badge[data-size="lg"] {
    --badge-h: 34px;
    --badge-px: var(--ui-space-5);
    --badge-fs: var(--ui-text-sm);
    --badge-gap: var(--ui-space-3);
  }

  .ui-badge[data-tone="neutral"] {
    --badge-solid: var(--ui-neutral-500);
  }
  .ui-badge[data-tone="accent"] {
    --badge-soft: var(--ui-accent-soft);
    --badge-text: var(--ui-accent-text);
    --badge-border: var(--ui-accent-border);
    --badge-solid: var(--ui-accent-solid);
    --badge-dot: var(--ui-accent-solid);
  }
  .ui-badge[data-tone="success"] {
    --badge-soft: var(--ui-success-soft);
    --badge-text: var(--ui-success-text);
    --badge-border: var(--ui-success-border);
    --badge-solid: var(--ui-success-solid);
    --badge-dot: var(--ui-success-dot);
  }
  .ui-badge[data-tone="warning"] {
    --badge-soft: var(--ui-warning-soft);
    --badge-text: var(--ui-warning-text);
    --badge-border: var(--ui-warning-border);
    --badge-solid: var(--ui-warning-solid);
    --badge-dot: var(--ui-warning-dot);
  }
  .ui-badge[data-tone="orange"] {
    --badge-soft: oklch(95% 0.05 45);
    --badge-text: oklch(45% 0.18 45);
    --badge-border: oklch(88% 0.08 45);
    --badge-solid: oklch(62% 0.20 45);
    --badge-dot: oklch(65% 0.20 45);
  }
  .ui-badge[data-tone="danger"] {
    --badge-soft: var(--ui-danger-soft);
    --badge-text: var(--ui-danger-text);
    --badge-border: var(--ui-danger-border);
    --badge-solid: var(--ui-danger-solid);
    --badge-dot: var(--ui-danger-dot);
  }
  .ui-badge[data-tone="info"] {
    --badge-soft: var(--ui-info-soft);
    --badge-text: var(--ui-info-text);
    --badge-border: var(--ui-info-border);
    --badge-solid: var(--ui-info-solid);
    --badge-dot: var(--ui-info-dot);
  }
  .ui-badge[data-tone="purple"] {
    --badge-soft: var(--ui-purple-soft);
    --badge-text: var(--ui-purple-text);
    --badge-border: var(--ui-purple-border);
    --badge-solid: var(--ui-purple-solid);
    --badge-dot: var(--ui-purple-dot);
  }

  .ui-badge[data-variant="soft"] {
    background: var(--badge-soft);
    border-color: var(--badge-border);
    color: var(--badge-text);
  }
  .ui-badge[data-variant="outline"] {
    background: var(--ui-bg-surface);
    border-color: var(--badge-border);
    color: var(--badge-text);
  }
  .ui-badge[data-variant="surface"] {
    background: var(--ui-bg-surface);
    border-color: var(--ui-border-default);
    color: var(--ui-fg-default);
    box-shadow: var(--ui-shadow-xs);
  }
  .ui-badge[data-variant="solid"] {
    background: var(--badge-solid);
    color: #ffffff;
  }
  /* The dot variant carries no chrome at all — it is a coloured marker plus
     ordinary body text, for use inside table cells and dense lists. */
  .ui-badge[data-variant="dot"] {
    background: transparent;
    color: var(--ui-fg-muted);
    padding-inline: 0;
    font-weight: var(--ui-weight-medium);
  }
  .ui-badge[data-variant="dot"][data-tone-text] {
    color: var(--badge-text);
    font-weight: var(--ui-label-weight);
  }

  .ui-badge__dot {
    width: 7px;
    height: 7px;
    border-radius: var(--ui-radius-full);
    background: var(--badge-dot);
    flex: none;
  }
  .ui-badge__avatar {
    width: calc(var(--badge-h) - 6px);
    height: calc(var(--badge-h) - 6px);
    border-radius: var(--ui-radius-full);
    object-fit: cover;
    margin-inline-start: -3px;
  }
  .ui-badge__remove {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    border: none;
    padding: 0;
    margin-inline-end: -2px;
    margin-inline-start: 2px;
    color: currentColor;
    opacity: 0.75;
    cursor: pointer;
    border-radius: var(--ui-radius-full);
    transition: opacity var(--ui-duration-fast) var(--ui-ease-out);
  }
  .ui-badge__remove:hover {
    opacity: 1;
  }
  .ui-badge__label {
    /* Nudges the cap-height back onto the optical centre of the pill. */
    transform: translateY(-0.5px);
  }
</style>
