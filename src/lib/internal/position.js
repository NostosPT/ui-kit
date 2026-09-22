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
 * @param {DOMRect} anchor    trigger rect, viewport-relative
 * @param {{width:number,height:number}} floating  measured floating box
 * @param {object} [options]
 * @param {string} [options.placement]  "<side>" or "<side>-<start|end>"
 * @param {number} [options.offset]     gap between trigger and floating box
 * @param {number} [options.padding]    minimum distance from the viewport edge
 * @param {boolean} [options.flip]
 * @param {boolean} [options.matchWidth]
 */
export function anchorPosition(anchor, floating, options = {}) {
  const {
    placement = "bottom-start",
    offset = 6,
    padding = 8,
    flip = true,
    matchWidth = false
  } = options;

  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const width = matchWidth ? anchor.width : floating.width;
  const height = floating.height;

  let [side, align = "start"] = placement.split("-");

  // Flip to the opposite side when the preferred one can't fit but the other
  // can. Falling back only when the opposite side is genuinely roomier avoids
  // the jitter you get from flipping on every scroll pixel.
  if (flip) {
    const room = {
      top: anchor.top - padding,
      bottom: vh - anchor.bottom - padding,
      left: anchor.left - padding,
      right: vw - anchor.right - padding
    };
    const needed = side === "top" || side === "bottom" ? height + offset : width + offset;
    if (room[side] < needed && room[OPPOSITE[side]] > room[side]) {
      side = OPPOSITE[side];
    }
  }

  let x;
  let y;

  if (side === "bottom" || side === "top") {
    y = side === "bottom" ? anchor.bottom + offset : anchor.top - height - offset;
    x =
      align === "end"
        ? anchor.right - width
        : align === "center"
          ? anchor.left + anchor.width / 2 - width / 2
          : anchor.left;
  } else {
    x = side === "right" ? anchor.right + offset : anchor.left - width - offset;
    y =
      align === "end"
        ? anchor.bottom - height
        : align === "center"
          ? anchor.top + anchor.height / 2 - height / 2
          : anchor.top;
  }

  // Shift back inside the viewport. Clamping the low edge last means a box
  // taller than the viewport pins to the top rather than scrolling off it.
  x = Math.min(Math.max(x, padding), Math.max(padding, vw - width - padding));
  y = Math.min(Math.max(y, padding), Math.max(padding, vh - height - padding));

  return { x, y, side, align, width: matchWidth ? width : undefined };
}

/**
 * Re-run `update` whenever the anchor could have moved: scroll on any
 * ancestor, viewport resize, or a size change on either element.
 * Returns a teardown function.
 */
export function trackAnchor(anchorEl, floatingEl, update) {
  update();
  const opts = { passive: true, capture: true };
  window.addEventListener("scroll", update, opts);
  window.addEventListener("resize", update, opts);

  const ro = new ResizeObserver(update);
  if (anchorEl) ro.observe(anchorEl);
  if (floatingEl) ro.observe(floatingEl);

  return () => {
    window.removeEventListener("scroll", update, opts);
    window.removeEventListener("resize", update, opts);
    ro.disconnect();
  };
}
