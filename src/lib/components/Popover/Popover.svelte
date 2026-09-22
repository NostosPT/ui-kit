<script>
  import { anchorPosition, trackAnchor, getContainingBlock } from "../../internal/position.js";

  /**
   * Anchored floating surface. Menu, Listbox, Tooltip and DatePicker are all
   * this plus content.
   *
   * It renders the trigger through a snippet that receives the props the
   * trigger must carry, rather than wrapping it in an extra element — an extra
   * wrapper breaks flex and grid layouts in ways that are miserable to debug.
   */
  let {
    open = $bindable(false),
    placement = "bottom-start",
    offset = 6,
    matchWidth = false,
    closeOnOutside = true,
    closeOnEscape = true,
    role = "dialog",
    ariaLabel = undefined,
    padded = true,
    anchor = undefined,
    class: klass = "",
    trigger,
    children,
    onopenchange,
    ...rest
  } = $props();

  let anchorEl = $state(null);
  let floatEl = $state(null);
  let pos = $state({ x: 0, y: 0, side: "bottom", width: undefined, ready: false });

  export function close() {
    if (!open) return;
    open = false;
    onopenchange?.(false);
  }
  export function show() {
    if (open) return;
    open = true;
    onopenchange?.(true);
  }
  export function toggle() {
    open ? close() : show();
  }

  $effect(() => {
    if (!open || !floatEl) return;

    // Anchor resolution:
    // 1. Explicit anchor prop (can be Element, {x, y} mouse coords, or DOMRect)
    // 2. Element inside trigger snippet
    // 3. Fallback to anchorEl wrapper
    const anchorTarget = anchor ?? anchorEl?.firstElementChild ?? anchorEl;
    if (!anchorTarget) return;

    const cb = getContainingBlock(floatEl);

    const update = () => {
      const box = floatEl.getBoundingClientRect();
      const next = anchorPosition(anchorTarget, box, {
        placement,
        offset,
        matchWidth,
        containingBlock: cb
      });
      pos = { ...next, ready: true };
    };

    return trackAnchor(anchorTarget, floatEl, update);
  });

  $effect(() => {
    if (!open) {
      pos = { ...pos, ready: false };
      return;
    }

    const onPointerDown = (event) => {
      if (!closeOnOutside) return;
      // Clicks on the trigger are the trigger's business — letting them fall
      // through here would close and immediately reopen the surface.
      const anchorNode = anchor instanceof Element ? anchor : (anchorEl?.contains(event.target) ? anchorEl : null);
      if (floatEl?.contains(event.target) || anchorNode?.contains(event.target)) return;
      close();
    };
    const onKeyDown = (event) => {
      if (closeOnEscape && event.key === "Escape") {
        event.stopPropagation();
        close();
        const focusTarget = anchor instanceof Element ? anchor : anchorEl;
        focusTarget?.querySelector?.("button, [tabindex]")?.focus?.() ?? focusTarget?.focus?.();
      }
    };

    document.addEventListener("pointerdown", onPointerDown, true);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown, true);
      document.removeEventListener("keydown", onKeyDown);
    };
  });
</script>

{#if trigger}
  <div bind:this={anchorEl} class="ui-popover__anchor">
    {@render trigger?.({ toggle, show, close, open })}
  </div>
{/if}

{#if open}
  <div
    bind:this={floatEl}
    class="ui-popover {klass}"
    {role}
    aria-label={ariaLabel}
    data-side={pos.side}
    data-ready={pos.ready || undefined}
    data-padded={padded || undefined}
    style:left="{pos.x}px"
    style:top="{pos.y}px"
    style:width={pos.width ? `${pos.width}px` : undefined}
    {...rest}
  >
    {@render children?.({ close })}
  </div>
{/if}

<style>
  .ui-popover__anchor {
    display: contents;
  }

  .ui-popover {
    position: fixed;
    z-index: var(--ui-z-dropdown);
    min-width: 160px;
    max-width: min(92vw, 420px);
    background: var(--ui-bg-raised);
    border: 1px solid var(--ui-border-default);
    border-radius: var(--ui-radius-2xl);
    box-shadow: var(--ui-shadow-lg);
    color: var(--ui-fg-default);
    /* Hidden until the first measurement lands, otherwise the surface paints
       at 0,0 for a frame before snapping to the anchor. */
    opacity: 0;
  }
  .ui-popover[data-padded] {
    padding: var(--ui-space-3);
  }
  .ui-popover[data-ready] {
    opacity: 1;
    animation: ui-popover-in var(--ui-duration-fast) var(--ui-ease-out);
  }

  /* Grows away from the anchor, so the motion reads as the surface emerging
     from the control that spawned it. */
  .ui-popover[data-side="bottom"] { transform-origin: top center; }
  .ui-popover[data-side="top"] { transform-origin: bottom center; }
  .ui-popover[data-side="left"] { transform-origin: center right; }
  .ui-popover[data-side="right"] { transform-origin: center left; }

  @keyframes ui-popover-in {
    from {
      opacity: 0;
      transform: scale(0.97);
    }
  }
  @media (prefers-reduced-motion: reduce) {
    .ui-popover[data-ready] { animation: none; }
  }
</style>
