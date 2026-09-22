<script>
  import Icon from "../Icon/Icon.svelte";

  /**
   * Inline message. `role` defaults to "status" (polite) and switches to
   * "alert" (assertive) for the danger tone — interrupting a screen-reader
   * user for a success confirmation is rude, but not telling them an action
   * failed is worse.
   */
  const DEFAULT_ICONS = {
    success: "check-circle",
    warning: "alert-triangle",
    danger: "alert-circle",
    info: "info",
    accent: "sparkles",
    neutral: "info"
  };

  let {
    tone = "info",
    variant = "soft",
    title = undefined,
    icon = undefined,
    hideIcon = false,
    dismissible = false,
    role = undefined,
    class: klass = "",
    actions,
    children,
    ondismiss,
    ...rest
  } = $props();

  const glyph = $derived(icon ?? DEFAULT_ICONS[tone] ?? "info");
  const liveRole = $derived(role ?? (tone === "danger" ? "alert" : "status"));
</script>

<div class="ui-alert {klass}" role={liveRole} data-tone={tone} data-variant={variant} {...rest}>
  {#if !hideIcon}
    <span class="ui-alert__icon"><Icon name={glyph} size={16} /></span>
  {/if}

  <div class="ui-alert__body">
    {#if title}<p class="ui-alert__title">{title}</p>{/if}
    {#if children}<div class="ui-alert__text">{@render children()}</div>{/if}
    {#if actions}<div class="ui-alert__actions">{@render actions()}</div>{/if}
  </div>

  {#if dismissible}
    <button type="button" class="ui-alert__close" aria-label="Dismiss" onclick={() => ondismiss?.()}>
      <Icon name="x" size={14} />
    </button>
  {/if}
</div>

<style>
  .ui-alert {
    --alert-soft: var(--ui-info-soft);
    --alert-border: var(--ui-info-border);
    --alert-text: var(--ui-info-text);
    --alert-solid: var(--ui-info-solid);

    display: flex;
    align-items: flex-start;
    gap: var(--ui-space-5);
    padding: var(--ui-space-7) var(--ui-space-8);
    border: 1px solid transparent;
    border-radius: var(--ui-radius-2xl);
    font-size: var(--ui-text-md);
    line-height: var(--ui-leading-snug);
  }

  .ui-alert[data-tone="success"] {
    --alert-soft: var(--ui-success-soft);
    --alert-border: var(--ui-success-border);
    --alert-text: var(--ui-success-text);
    --alert-solid: var(--ui-success-solid);
  }
  .ui-alert[data-tone="warning"] {
    --alert-soft: var(--ui-warning-soft);
    --alert-border: var(--ui-warning-border);
    --alert-text: var(--ui-warning-text);
    --alert-solid: var(--ui-warning-solid);
  }
  .ui-alert[data-tone="danger"] {
    --alert-soft: var(--ui-danger-soft);
    --alert-border: var(--ui-danger-border);
    --alert-text: var(--ui-danger-text);
    --alert-solid: var(--ui-danger-solid);
  }
  .ui-alert[data-tone="accent"] {
    --alert-soft: var(--ui-accent-soft);
    --alert-border: var(--ui-accent-border);
    --alert-text: var(--ui-accent-text);
    --alert-solid: var(--ui-accent-solid);
  }
  .ui-alert[data-tone="neutral"] {
    --alert-soft: var(--ui-bg-muted);
    --alert-border: var(--ui-border-default);
    --alert-text: var(--ui-fg-default);
    --alert-solid: var(--ui-bg-inverse);
  }

  .ui-alert[data-variant="soft"] {
    background: var(--alert-soft);
    border-color: var(--alert-border);
    color: var(--alert-text);
  }
  .ui-alert[data-variant="outline"] {
    background: var(--ui-bg-surface);
    border-color: var(--ui-border-default);
    color: var(--ui-fg-default);
    box-shadow: var(--ui-shadow-xs);
  }
  .ui-alert[data-variant="outline"] .ui-alert__icon {
    color: var(--alert-solid);
  }
  .ui-alert[data-variant="solid"] {
    background: var(--alert-solid);
    color: oklch(from var(--alert-solid) var(--ui-auto-fg-l) var(--ui-auto-fg-c) h);
  }
  /* A left accent bar reads as "this belongs to the thing above it" — useful
     for validation summaries pinned to a form section. */
  .ui-alert[data-variant="bar"] {
    background: var(--alert-soft);
    border-radius: var(--ui-radius-md);
    border-inline-start: 3px solid var(--alert-solid);
    color: var(--alert-text);
  }

  .ui-alert__icon {
    display: flex;
    flex: none;
    /* Optically centres the glyph on the first line of text. */
    margin-top: calc((1lh - 16px) / 2);
  }

  .ui-alert__body {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: var(--ui-space-2);
  }
  .ui-alert__title {
    margin: 0;
    font-weight: var(--ui-label-weight);
    letter-spacing: var(--ui-tracking-snug);
  }
  .ui-alert__text {
    opacity: 0.85;
  }
  .ui-alert__text :global(p) {
    margin: 0;
  }
  .ui-alert__actions {
    display: flex;
    gap: var(--ui-space-4);
    margin-top: var(--ui-space-3);
  }

  .ui-alert__close {
    display: grid;
    place-items: center;
    width: 24px;
    height: 24px;
    flex: none;
    margin: -2px -4px 0 0;
    border-radius: var(--ui-radius-md);
    color: currentColor;
    opacity: 0.6;
    transition: opacity var(--ui-duration-fast) var(--ui-ease-out);
  }
  .ui-alert__close:hover {
    opacity: 1;
    background: color-mix(in oklab, currentColor 12%, transparent);
  }
</style>
