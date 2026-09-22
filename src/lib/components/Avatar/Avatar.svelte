<script>
  import { initials as toInitials, hashIndex } from "../../internal/utils.js";

  /**
   * Image with a typographic fallback. The fallback colour is hashed from the
   * name so the same person is the same colour everywhere without anyone
   * storing an avatar colour — and the hash only picks a *hue offset*, with
   * lightness and chroma fixed, so a directory of fallbacks still reads as one
   * palette rather than a bag of sweets.
   */
  let {
    src = undefined,
    name = "",
    alt = undefined,
    size = "md",
    shape = "circle",
    presence = undefined,
    ring = false,
    palette = "spectrum",
    class: klass = "",
    children,
    ...rest
  } = $props();

  const px = $derived(
    { "2xs": 16, xs: 20, sm: 24, md: 32, lg: 40, xl: 56, "2xl": 72 }[size] ?? 32
  );
  const label = $derived(toInitials(name));
  const failed = $state({ v: false });

  // 12 evenly spaced hues keeps adjacent avatars visibly distinct; anchoring
  // to the accent hue keeps the set inside the host theme's family.
  const hue = $derived(
    palette === "accent"
      ? "var(--ui-accent-h)"
      : `calc(var(--ui-accent-h) + ${hashIndex(name || "?", 12) * 30})`
  );
</script>

<span
  class="ui-avatar {klass}"
  data-shape={shape}
  data-ring={ring || undefined}
  style:--avatar-size="{px}px"
  style:--avatar-h={hue}
  {...rest}
>
  {#if src && !failed.v}
    <img {src} alt={alt ?? name} onerror={() => (failed.v = true)} />
  {:else if children}
    {@render children()}
  {:else if label}
    <span class="ui-avatar__initials" aria-hidden="true">{label}</span>
    <span class="ui-sr-only">{name}</span>
  {/if}

  {#if presence}
    <span class="ui-avatar__presence" data-presence={presence}>
      <span class="ui-sr-only">{presence}</span>
    </span>
  {/if}
</span>

<style>
  .ui-avatar {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex: none;
    width: var(--avatar-size);
    height: var(--avatar-size);
    border-radius: var(--ui-radius-full);
    overflow: visible;
    background: oklch(93% 0.045 var(--avatar-h));
    color: oklch(42% 0.09 var(--avatar-h));
    user-select: none;
  }
  .ui-avatar[data-shape="square"] {
    /* Scales with the avatar so a 20px chip and a 72px profile tile keep the
       same corner-to-size ratio. */
    border-radius: calc(var(--avatar-size) * 0.28);
  }

  .ui-avatar img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: inherit;
    display: block;
  }

  .ui-avatar[data-ring]::after {
    content: "";
    position: absolute;
    inset: -2px;
    border-radius: inherit;
    border: 2px solid var(--ui-bg-surface);
    /* Sits outside the image so the ring reads as separation from whatever is
       behind it, which is what makes overlapping stacks legible. */
    box-shadow: 0 0 0 1px var(--ui-border-default);
  }

  .ui-avatar__initials {
    font-size: calc(var(--avatar-size) * 0.38);
    font-weight: var(--ui-weight-semibold);
    letter-spacing: var(--ui-tracking-tight);
    line-height: 1;
  }

  .ui-avatar__presence {
    position: absolute;
    right: 0;
    bottom: 0;
    width: calc(var(--avatar-size) * 0.3);
    height: calc(var(--avatar-size) * 0.3);
    min-width: 6px;
    min-height: 6px;
    border-radius: var(--ui-radius-full);
    border: 2px solid var(--ui-bg-surface);
    box-sizing: content-box;
    transform: translate(12%, 12%);
  }
  .ui-avatar[data-shape="circle"] .ui-avatar__presence {
    transform: translate(4%, 4%);
  }
  .ui-avatar__presence[data-presence="online"] {
    background: var(--ui-success-dot);
  }
  .ui-avatar__presence[data-presence="busy"] {
    background: var(--ui-danger-dot);
  }
  .ui-avatar__presence[data-presence="away"] {
    background: var(--ui-warning-dot);
  }
  .ui-avatar__presence[data-presence="offline"] {
    background: var(--ui-neutral-dot);
  }

  :global([data-ui-theme="dark"]) .ui-avatar {
    background: oklch(32% 0.05 var(--avatar-h));
    color: oklch(86% 0.07 var(--avatar-h));
  }
</style>
