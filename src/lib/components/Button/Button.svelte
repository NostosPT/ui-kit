<script>
  import Icon from "../Icon/Icon.svelte";

  /**
   * Two independent axes instead of a flat list of variants:
   *
   *   variant — how much surface the button occupies (solid / soft / outline /
   *             ghost / link)
   *   tone    — what it means (accent / neutral / success / warning / danger)
   *
   * Every combination is valid, which is why the CSS below resolves a tone to
   * a handful of local custom properties first and then lets each variant pick
   * from them. Adding a tone is six lines and zero new variant code.
   */
  let {
    variant = "solid",
    tone = "accent",
    size = "md",
    type = "button",
    href = undefined,
    disabled = false,
    loading = false,
    block = false,
    iconOnly = false,
    icon = undefined,
    trailingIcon = undefined,
    label = undefined,
    class: klass = "",
    children,
    onclick,
    ...rest
  } = $props();

  const iconSize = $derived(
    { xs: 14, sm: 16, md: 18, lg: 20 }[size] ?? 18
  );
  const inert = $derived(disabled || loading);
  const tag = $derived(href && !inert ? "a" : "button");
</script>

<svelte:element
  this={tag}
  class="ui-btn ui-focus-ring {klass}"
  data-variant={variant}
  data-tone={tone}
  data-size={size}
  data-block={block || undefined}
  data-icon-only={iconOnly || undefined}
  data-loading={loading || undefined}
  href={tag === "a" ? href : undefined}
  type={tag === "button" ? type : undefined}
  disabled={tag === "button" ? inert : undefined}
  aria-disabled={inert || undefined}
  aria-busy={loading || undefined}
  aria-label={iconOnly ? label : undefined}
  onclick={inert ? undefined : onclick}
  {...rest}
>
  {#if loading}
    <span class="ui-btn__spinner"><Icon name="loader" size={iconSize} /></span>
  {/if}
  <span class="ui-btn__body">
    {#if icon}<Icon name={icon} size={iconSize} />{/if}
    {#if !iconOnly}
      <span class="ui-btn__label">{@render children?.()}</span>
    {/if}
    {#if trailingIcon}<Icon name={trailingIcon} size={iconSize} />{/if}
  </span>
</svelte:element>

<style>
  .ui-btn {
    /* --- tone resolution (overridden per data-tone below) ---------------- */
    --btn-solid: var(--ui-accent-solid);
    --btn-solid-hover: var(--ui-accent-solid-hover);
    --btn-solid-active: var(--ui-accent-solid-active);
    --btn-soft: var(--ui-accent-soft);
    --btn-soft-hover: var(--ui-accent-soft-hover);
    --btn-text: var(--ui-accent-text);
    --btn-border: var(--ui-accent-border);

    /* Icons sit a step below the label in contrast. This is measured, not a
       preference: in the reference a leading icon reads around neutral-600
       while its label is effectively black, and matching them makes the whole
       row look heavier and flatter than the source. Solid and link buttons
       opt out — there the icon and label are the same ink. */
    --btn-icon: var(--ui-fg-muted);

    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: var(--btn-gap);
    height: var(--btn-h);
    padding-inline: var(--btn-px);
    border: 1px solid transparent;
    border-radius: var(--btn-radius);
    font-size: var(--btn-fs);
    font-weight: var(--ui-control-weight);
    letter-spacing: var(--ui-tracking-snug);
    line-height: 1;
    white-space: nowrap;
    text-decoration: none;
    cursor: pointer;
    user-select: none;
    transition:
      background-color var(--ui-duration-fast) var(--ui-ease-out),
      border-color var(--ui-duration-fast) var(--ui-ease-out),
      color var(--ui-duration-fast) var(--ui-ease-out),
      box-shadow var(--ui-duration-fast) var(--ui-ease-out),
      transform var(--ui-duration-instant) var(--ui-ease-out);
  }

  /* --- sizes ------------------------------------------------------------
     Height, padding, gap and radius all come from the shared control scale
     rather than from spacing steps picked per component. That is what keeps a
     Button, an Input and a Select the same object at the same size — and it
     is the thing the reference gets right and a hand-tuned kit gets wrong the
     moment one of the three is edited on its own. */
  .ui-btn[data-size="xs"] {
    --btn-h: var(--ui-control-h-xs);
    --btn-px: var(--ui-control-px-xs);
    --btn-fs: var(--ui-text-xs);
    --btn-gap: var(--ui-control-gap-xs);
    --btn-radius: var(--ui-control-radius-xs);
  }
  .ui-btn[data-size="sm"] {
    --btn-h: var(--ui-control-h-sm);
    --btn-px: var(--ui-control-px-sm);
    --btn-fs: var(--ui-text-sm);
    --btn-gap: var(--ui-control-gap-sm);
    --btn-radius: var(--ui-control-radius-sm);
  }
  .ui-btn[data-size="md"] {
    --btn-h: var(--ui-control-h-md);
    --btn-px: var(--ui-control-px-md);
    --btn-fs: var(--ui-text-md);
    --btn-gap: var(--ui-control-gap-md);
    --btn-radius: var(--ui-control-radius-md);
  }
  .ui-btn[data-size="lg"] {
    --btn-h: var(--ui-control-h-lg);
    --btn-px: var(--ui-control-px-lg);
    --btn-fs: var(--ui-text-base);
    --btn-gap: var(--ui-control-gap-lg);
    --btn-radius: var(--ui-control-radius-lg);
  }

  .ui-btn[data-icon-only] {
    width: var(--btn-h);
    padding-inline: 0;
  }
  .ui-btn[data-block] {
    display: flex;
    width: 100%;
  }

  /* --- tones ------------------------------------------------------------ */
  .ui-btn[data-tone="neutral"] {
    --btn-solid: var(--ui-bg-inverse);
    --btn-solid-hover: var(--ui-neutral-800);
    --btn-solid-active: var(--ui-neutral-700);
    --btn-soft: var(--ui-bg-muted);
    --btn-soft-hover: var(--ui-bg-emphasis);
    --btn-text: var(--ui-fg-default);
    --btn-border: var(--ui-border-default);
  }
  .ui-btn[data-tone="success"] {
    --btn-solid: var(--ui-success-solid);
    --btn-solid-hover: var(--ui-success-700);
    --btn-solid-active: var(--ui-success-900);
    --btn-soft: var(--ui-success-soft);
    --btn-soft-hover: var(--ui-success-100);
    --btn-text: var(--ui-success-text);
    --btn-border: var(--ui-success-border);
  }
  .ui-btn[data-tone="warning"] {
    --btn-solid: var(--ui-warning-solid);
    --btn-solid-hover: var(--ui-warning-700);
    --btn-solid-active: var(--ui-warning-900);
    --btn-soft: var(--ui-warning-soft);
    --btn-soft-hover: var(--ui-warning-100);
    --btn-text: var(--ui-warning-text);
    --btn-border: var(--ui-warning-border);
  }
  .ui-btn[data-tone="danger"] {
    --btn-solid: var(--ui-danger-solid);
    --btn-solid-hover: var(--ui-danger-700);
    --btn-solid-active: var(--ui-danger-900);
    --btn-soft: var(--ui-danger-soft);
    --btn-soft-hover: var(--ui-danger-100);
    --btn-text: var(--ui-danger-text);
    --btn-border: var(--ui-danger-border);
  }

  /* --- variants --------------------------------------------------------- */
  .ui-btn[data-variant="solid"],
  .ui-btn[data-variant="soft"],
  .ui-btn[data-variant="link"] {
    --btn-icon: currentColor;
  }

  .ui-btn[data-variant="solid"] {
    background: var(--btn-solid);
    /* Derived from the fill itself, so an amber or lime accent flips to a
       dark label automatically instead of shipping white-on-yellow. */
    color: oklch(from var(--btn-solid) var(--ui-auto-fg-l) var(--ui-auto-fg-c) h);
    /* Shadow tinted from the fill, not the neutral grey ladder: a blue
       button casting a grey shadow is the tell that separates a kit from the
       reference. The one-pixel inner highlight stops the flat fill from
       looking like a coloured rectangle. */
    box-shadow:
      0 1px 2px oklch(from var(--btn-solid) l c h / 0.24),
      0 2px 6px -1px oklch(from var(--btn-solid) l c h / 0.2),
      var(--ui-shadow-inset);
  }
  .ui-btn[data-variant="solid"]:hover:not([aria-disabled="true"]) {
    background: var(--btn-solid-hover);
  }
  .ui-btn[data-variant="solid"]:active:not([aria-disabled="true"]) {
    background: var(--btn-solid-active);
  }

  .ui-btn[data-variant="soft"] {
    background: var(--btn-soft);
    color: var(--btn-text);
  }
  .ui-btn[data-variant="soft"]:hover:not([aria-disabled="true"]) {
    background: var(--btn-soft-hover);
  }

  .ui-btn[data-variant="outline"] {
    background: var(--ui-bg-surface);
    border-color: var(--ui-border-default);
    color: var(--ui-fg-default);
    box-shadow: var(--ui-shadow-xs);
  }
  .ui-btn[data-variant="outline"]:hover:not([aria-disabled="true"]) {
    background: var(--ui-bg-hover);
    border-color: var(--ui-border-strong);
  }
  .ui-btn[data-variant="outline"]:active:not([aria-disabled="true"]) {
    background: var(--ui-bg-active);
  }
  /* A toned outline button keeps the white surface but borrows the tone for
     its text and border — the "Following" / destructive-secondary pattern.
     Accent is deliberately excluded: in this design language the brand colour
     on a white surface reads as a link, so every secondary action in the
     reference — Copy link, Login, Documents, Export, Cancel, Forward — carries
     a near-black label and a neutral border, and the accent appears only as a
     fill. A blue-on-white outline button is the single change that makes a
     row of buttons stop looking like the reference. */
  .ui-btn[data-variant="outline"]:not([data-tone="neutral"]):not([data-tone="accent"]) {
    color: var(--btn-text);
    border-color: var(--btn-border);
  }

  .ui-btn[data-variant="ghost"] {
    background: transparent;
    color: var(--ui-fg-default);
  }
  .ui-btn[data-variant="ghost"]:not([data-tone="neutral"]) {
    color: var(--btn-text);
  }
  .ui-btn[data-variant="ghost"]:hover:not([aria-disabled="true"]) {
    background: var(--ui-bg-hover);
    color: var(--ui-fg-default);
  }
  .ui-btn[data-variant="ghost"]:not([data-tone="neutral"]):hover:not([aria-disabled="true"]) {
    background: var(--btn-soft);
    color: var(--btn-text);
  }

  .ui-btn[data-variant="link"] {
    background: transparent;
    color: var(--btn-text);
    height: auto;
    padding: 0;
    --btn-h: auto;
  }
  .ui-btn[data-variant="link"]:hover:not([aria-disabled="true"]) {
    text-decoration: underline;
    text-underline-offset: 3px;
  }

  /* --- states ----------------------------------------------------------- */
  .ui-btn[aria-disabled="true"] {
    opacity: 0.5;
    cursor: not-allowed;
    box-shadow: none;
  }
  .ui-btn:active:not([aria-disabled="true"]):not([data-variant="link"]) {
    transform: translateY(0.5px);
  }

  .ui-btn__body {
    display: inline-flex;
    align-items: center;
    gap: inherit;
  }
  .ui-btn__body :global(.ui-icon) {
    color: var(--btn-icon);
  }
  /* An icon-only button has no label to contrast against, so the icon carries
     the full weight of the control. */
  .ui-btn[data-icon-only] {
    --btn-icon: currentColor;
  }
  .ui-btn[data-loading] .ui-btn__body {
    /* Hidden rather than removed so the button keeps its width mid-request. */
    visibility: hidden;
  }
  .ui-btn__spinner {
    position: absolute;
    inset: 0;
    display: grid;
    place-items: center;
    animation: ui-btn-spin 700ms linear infinite;
  }
  @keyframes ui-btn-spin {
    to {
      transform: rotate(360deg);
    }
  }
  @media (prefers-reduced-motion: reduce) {
    .ui-btn__spinner {
      animation-duration: 1800ms;
    }
  }
</style>
