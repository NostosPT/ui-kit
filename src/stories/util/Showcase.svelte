<script>
  /** Story-only layout helper. Never exported from the kit. */
  let { gap = 20, width = undefined, children } = $props();
</script>

<div class="showcase" style:gap="{gap}px" style:width>
  {@render children?.()}
</div>

<style>
  .showcase {
    display: flex;
    flex-direction: column;
    align-items: stretch;
  }
</style>
