<script>
  let { gap = 10, align = "center", wrap = true, children } = $props();
</script>

<div
  class="row"
  style:gap="{gap}px"
  style:align-items={align}
  style:flex-wrap={wrap ? "wrap" : "nowrap"}
>
  {@render children?.()}
</div>

<style>
  .row {
    display: flex;
  }
</style>
