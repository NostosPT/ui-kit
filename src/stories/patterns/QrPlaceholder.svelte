<script>
  import { hashIndex } from "../../lib/internal/utils.js";

  /**
   * Decorative stand-in for a QR code, so the share pattern can be shown
   * without pulling in an encoder. Deterministic from `seed` so it doesn't
   * shimmer between renders. Not scannable, and marked aria-hidden.
   */
  let { seed = "nostos", size = 68 } = $props();

  const CELLS = 11;
  const grid = $derived(
    Array.from({ length: CELLS * CELLS }, (_, i) => {
      const r = Math.floor(i / CELLS);
      const c = i % CELLS;
      // Keep the three finder squares clear so it reads as a QR at a glance.
      const finder = (r < 3 && c < 3) || (r < 3 && c > CELLS - 4) || (r > CELLS - 4 && c < 3);
      return finder ? 0 : hashIndex(`${seed}-${r}-${c}`, 5) > 1 ? 1 : 0;
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
    width: 26%;
    height: 26%;
    border: 2.5px solid var(--ui-fg-default);
    border-radius: 2px;
  }
  .qr__finder--tl { top: 6%; left: 6%; }
  .qr__finder--tr { top: 6%; right: 6%; }
  .qr__finder--bl { bottom: 6%; left: 6%; }
</style>
