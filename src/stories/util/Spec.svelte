<script>
  /** A labelled specimen row: caption in a fixed gutter, sample beside it. */
  let { label = "", gutter = 92, gap = 10, align = "center", children } = $props();
</script>

<div class="spec" style:--gutter="{gutter}px">
  <span class="spec__label">{label}</span>
  <div class="spec__body" style:gap="{gap}px" style:align-items={align}>
    {@render children?.()}
  </div>
</div>

<style>
  .spec {
    display: grid;
    grid-template-columns: var(--gutter) 1fr;
    align-items: center;
    gap: 16px;
  }
  .spec__label {
    font-size: var(--ui-text-xs);
    font-weight: var(--ui-weight-medium);
    color: var(--ui-fg-faint);
    text-align: right;
    letter-spacing: var(--ui-tracking-wide);
  }
  .spec__body {
    display: flex;
    flex-wrap: wrap;
  }
</style>
