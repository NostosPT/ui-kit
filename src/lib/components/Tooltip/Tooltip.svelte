<script>
  import { anchorPosition, trackAnchor } from "../../internal/position.js";
  import { uid } from "../../internal/utils.js";

  /**
   * Hover/focus label. Two details that matter:
   *
   *   • It opens on focus as well as hover, so keyboard users get it too.
   *   • The open delay is skipped while another tooltip was recently shown,
   *     which is what makes scanning a row of icon buttons feel responsive
   *     instead of making you wait at every stop.
   */
  let {
    content = undefined,
    placement = "top-center",
    offset = 8,
    delay = 350,
    disabled = false,
    class: klass = "",
    children,
    ...rest
  } = $props();

  const id = uid("tip");
  let anchorEl = $state(null);
  let tipEl = $state(null);
  let open = $state(false);
  let pos = $state({ x: 0, y: 0, side: "top", ready: false });
  let timer = 0;

  // Module-scoped in effect: shared across every tooltip on the page.
  let lastClosed = $state(0);

  function show() {
    if (disabled || !content) return;
    clearTimeout(timer);
    const warm = Date.now() - lastClosed < 400;
    timer = setTimeout(() => (open = true), warm ? 0 : delay);
  }
  function hide() {
    clearTimeout(timer);
    if (open) lastClosed = Date.now();
    open = false;
  }

  $effect(() => {
    if (!open || !anchorEl || !tipEl) return;
    return trackAnchor(anchorEl, tipEl, () => {
      const next = anchorPosition(
        anchorEl.getBoundingClientRect(),
        tipEl.getBoundingClientRect(),
        { placement, offset, padding: 6 }
      );
      pos = { ...next, ready: true };
    });
  });

  $effect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && hide();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  });
</script>

<span
  bind:this={anchorEl}
  class="ui-tooltip__anchor"
  aria-describedby={open ? id : undefined}
  onpointerenter={show}
  onpointerleave={hide}
  onfocusin={show}
  onfocusout={hide}
  {...rest}
>
  {@render children?.()}
</span>

{#if open && content}
  <div
    bind:this={tipEl}
    {id}
    role="tooltip"
    class="ui-tooltip {klass}"
    data-side={pos.side}
    data-ready={pos.ready || undefined}
    style:left="{pos.x}px"
    style:top="{pos.y}px"
  >
    {content}
  </div>
{/if}

<style>
  .ui-tooltip__anchor {
    display: inline-flex;
  }

  .ui-tooltip {
    position: fixed;
    z-index: var(--ui-z-tooltip);
    max-width: 260px;
    padding: var(--ui-space-3) var(--ui-space-5);
    border-radius: var(--ui-radius-lg);
    background: var(--ui-bg-inverse);
    color: var(--ui-fg-inverse);
    font-size: var(--ui-text-sm);
    line-height: var(--ui-leading-snug);
    letter-spacing: var(--ui-tracking-snug);
    box-shadow: var(--ui-shadow-md);
    /* Never let a tooltip swallow the pointer — it sits over the very control
       the user is trying to click. */
    pointer-events: none;
    opacity: 0;
  }
  .ui-tooltip[data-ready] {
    opacity: 1;
    animation: ui-tooltip-in var(--ui-duration-fast) var(--ui-ease-out);
  }
  @keyframes ui-tooltip-in {
    from { opacity: 0; transform: scale(0.96); }
  }
  @media (prefers-reduced-motion: reduce) {
    .ui-tooltip[data-ready] { animation: none; }
  }
</style>
