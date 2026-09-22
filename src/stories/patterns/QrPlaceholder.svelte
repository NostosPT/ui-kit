<script>
  /**
   * Decorative stand-in for a QR code, so the share pattern can be shown
   * without pulling in an encoder. Deterministic from `seed` so it doesn't
   * shimmer between renders. Not scannable, and marked aria-hidden.
   */
  let { seed = "nostos", size = 68 } = $props();

  const CELLS = 13;

  /**
   * A plain string hash correlates across neighbouring cells and comes out as
   * diagonal banding rather than noise. Mixing the index through an integer
   * hash (xorshift + a large odd multiplier) decorrelates adjacent cells,
   * which is what makes it read as a QR code at a glance.
   */
  function noise(n) {
    let x = n | 0;
    x ^= x << 13;
    x ^= x >>> 17;
    x ^= x << 5;
    return ((x >>> 0) % 1000) / 1000;
  }

  const seedNum = $derived(
    [...seed].reduce((h, ch) => (Math.imul(h, 2654435761) + ch.charCodeAt(0)) | 0, 7)
  );

  const grid = $derived(
    Array.from({ length: CELLS * CELLS }, (_, i) => {
      const r = Math.floor(i / CELLS);
      const c = i % CELLS;
      // Leave the three finder corners clear; they're drawn as rings on top.
      const finder =
        (r < 4 && c < 4) || (r < 4 && c > CELLS - 5) || (r > CELLS - 5 && c < 4);
      return finder ? 0 : noise(seedNum + Math.imul(r + 1, 73856093) + Math.imul(c + 1, 19349663)) > 0.48 ? 1 : 0;
    })
  );
</script>

<div class="qr" style:--qr-size="{size}px" style:--qr-cells={CELLS} aria-hidden="true">
  {#each grid as on, i (i)}
    <span class:on></span>
  {/each}
  <span class="qr__finder qr__finder--tl"></span>
  <span class="qr__finder qr__finder--tr"></span>
  <span class="qr__finder qr__finder--bl"></span>
</div>

<style>
  .qr {
    position: relative;
    display: grid;
    grid-template-columns: repeat(var(--qr-cells), 1fr);
    width: var(--qr-size);
    height: var(--qr-size);
    padding: 3px;
    background: var(--ui-bg-surface);
    border: 1px solid var(--ui-border-default);
    border-radius: var(--ui-radius-md);
  }
  .qr > span {
    aspect-ratio: 1;
  }
  .qr > span.on {
    background: var(--ui-fg-default);
  }
  .qr__finder {
    position: absolute;
    width: 23%;
    height: 23%;
    border: 2px solid var(--ui-fg-default);
    border-radius: 2px;
    background:
      radial-gradient(var(--ui-fg-default) 0 44%, transparent 45%) center / 100% 100% no-repeat;
  }
  .qr__finder--tl { top: 5%; left: 5%; }
  .qr__finder--tr { top: 5%; right: 5%; }
  .qr__finder--bl { bottom: 5%; left: 5%; }
</style>
