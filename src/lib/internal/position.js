/**
 * Minimal anchored positioning: place a floating box against a trigger, flip
 * it when it would overflow the viewport, and slide it back in when it would
 * spill sideways.
 *
 * Deliberately not a dependency on a full positioning engine. The kit needs
 * four placements with flip and shift, which is ~80 lines; a library would add
 * far more surface than the components here use.
 */

const OPPOSITE = { top: "bottom", bottom: "top", left: "right", right: "left" };

/**
 * Detects whether an element has a containing block other than the viewport
 * for `position: fixed`.
 *
 * According to CSS spec, an ancestor creates a containing block for fixed
 * descendants if it has a non-default transform, perspective, filter,
 * backdrop-filter, or certain contain/will-change properties.
 *
 * @param {Element | null} element
 * @returns {Element | null}
 */
export function getContainingBlock(element) {
  if (typeof window === "undefined" || !element) return null;
  let el = element.parentElement;
  while (el && el !== document.documentElement && el !== document.body) {
    const style = window.getComputedStyle(el);
    if (
      style.transform !== "none" ||
      style.perspective !== "none" ||
      style.filter !== "none" ||
      style.backdropFilter !== "none" ||
      (style.contain && /paint|layout|strict|content/.test(style.contain)) ||
      (style.willChange && /transform|perspective|filter/.test(style.willChange))
    ) {
      return el;
    }
    el = el.parentElement;
  }
  return null;
}

function resolveAnchorRect(anchor) {
  if (!anchor) {
    return { top: 0, bottom: 0, left: 0, right: 0, width: 0, height: 0 };
  }
  if (typeof anchor.getBoundingClientRect === "function") {
    return anchor.getBoundingClientRect();
  }
  if (typeof anchor.x === "number" || typeof anchor.clientX === "number") {
    const x = anchor.x ?? anchor.clientX ?? 0;
    const y = anchor.y ?? anchor.clientY ?? 0;
    return { top: y, bottom: y, left: x, right: x, width: 0, height: 0 };
  }
  return {
    top: anchor.top ?? 0,
    bottom: anchor.bottom ?? (anchor.top ?? 0) + (anchor.height ?? 0),
    left: anchor.left ?? 0,
    right: anchor.right ?? (anchor.left ?? 0) + (anchor.width ?? 0),
    width: anchor.width ?? 0,
    height: anchor.height ?? 0
  };
}

/**
 * @param {DOMRect | { x: number, y: number } | Element} anchor  trigger rect, element or coords
 * @param {{width:number,height:number}} floating  measured floating box
 * @param {object} [options]
 * @param {string} [options.placement]  "<side>" or "<side>-<start|end>"
 * @param {number} [options.offset]     gap between trigger and floating box
 * @param {number} [options.padding]    minimum distance from the viewport edge
 * @param {boolean} [options.flip]
 * @param {boolean} [options.matchWidth]
 * @param {Element | null} [options.containingBlock]
 */
export function anchorPosition(anchor, floating, options = {}) {
  const {
    placement = "bottom-start",
    offset = 6,
    padding = 8,
    flip = true,
    matchWidth = false,
    containingBlock = null
  } = options;

  const anchorRect = resolveAnchorRect(anchor);
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const width = matchWidth ? anchorRect.width : floating.width;
  const height = floating.height;

  let [side, align = "start"] = placement.split("-");

  // Flip to the opposite side when the preferred one can't fit but the other
  // can. Falling back only when the opposite side is genuinely roomier avoids
  // the jitter you get from flipping on every scroll pixel.
  if (flip) {
    const room = {
      top: anchorRect.top - padding,
      bottom: vh - anchorRect.bottom - padding,
      left: anchorRect.left - padding,
      right: vw - anchorRect.right - padding
    };
    const needed = side === "top" || side === "bottom" ? height + offset : width + offset;
    if (room[side] < needed && room[OPPOSITE[side]] > room[side]) {
      side = OPPOSITE[side];
    }
  }

  let x;
  let y;

  if (side === "bottom" || side === "top") {
    y = side === "bottom" ? anchorRect.bottom + offset : anchorRect.top - height - offset;
    x =
      align === "end"
        ? anchorRect.right - width
        : align === "center"
          ? anchorRect.left + anchorRect.width / 2 - width / 2
          : anchorRect.left;
  } else {
    x = side === "right" ? anchorRect.right + offset : anchorRect.left - width - offset;
    y =
      align === "end"
        ? anchorRect.bottom - height
        : align === "center"
          ? anchorRect.top + anchorRect.height / 2 - height / 2
          : anchorRect.top;
  }

  // Shift back inside the viewport. Clamping the low edge last means a box
  // taller than the viewport pins to the top rather than scrolling off it.
  x = Math.min(Math.max(x, padding), Math.max(padding, vw - width - padding));
  y = Math.min(Math.max(y, padding), Math.max(padding, vh - height - padding));

  // If a containing block for fixed positioning exists, translate viewport coordinates
  // to containing block local coordinates.
  if (containingBlock) {
    const cbRect = containingBlock.getBoundingClientRect();
    x -= (cbRect.left + containingBlock.clientLeft);
    y -= (cbRect.top + containingBlock.clientTop);
  }

  return { x, y, side, align, width: matchWidth ? width : undefined };
}

/**
 * Re-run `update` whenever the anchor could have moved: scroll on any
 * ancestor, viewport resize, or a size change on either element.
 * Returns a teardown function.
 */
export function trackAnchor(anchor, floatingEl, update) {
  update();
  const opts = { passive: true, capture: true };
  window.addEventListener("scroll", update, opts);
  window.addEventListener("resize", update, opts);

  const ro = new ResizeObserver(update);
  if (anchor && typeof anchor.nodeType === "number") {
    ro.observe(anchor);
  }
  if (floatingEl) ro.observe(floatingEl);

  return () => {
    window.removeEventListener("scroll", update, opts);
    window.removeEventListener("resize", update, opts);
    ro.disconnect();
  };
}
