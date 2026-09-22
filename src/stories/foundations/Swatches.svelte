<script>
  let { title, prefix, steps = [], note = undefined } = $props();
</script>

<section class="ramp">
  <header>
    <h4>{title}</h4>
    {#if note}<p>{note}</p>{/if}
  </header>
  <div class="ramp__row">
    {#each steps as step (step)}
      <div class="ramp__swatch">
        <span class="ramp__chip" style:background="var(--ui-{prefix}-{step})"></span>
        <span class="ramp__step">{step}</span>
      </div>
    {/each}
  </div>
</section>

<style>
  .ramp {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  header h4 {
    margin: 0;
    font-size: var(--ui-text-md);
    font-weight: var(--ui-weight-semibold);
    letter-spacing: var(--ui-tracking-snug);
  }
  header p {
    margin: 2px 0 0;
    font-size: var(--ui-text-sm);
    color: var(--ui-fg-muted);
  }
  .ramp__row {
    display: flex;
    gap: 4px;
    flex-wrap: wrap;
  }
  .ramp__swatch {
    display: flex;
    flex-direction: column;
    gap: 4px;
    align-items: center;
    min-width: 54px;
  }
  .ramp__chip {
    width: 100%;
    height: 44px;
    border-radius: var(--ui-radius-md);
    box-shadow: inset 0 0 0 1px oklch(0% 0 0 / 0.08);
  }
  .ramp__step {
    font-size: var(--ui-text-2xs);
    color: var(--ui-fg-faint);
    font-variant-numeric: tabular-nums;
  }
</style>
