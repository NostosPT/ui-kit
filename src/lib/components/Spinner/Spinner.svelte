<script>
  /**
   * Indeterminate ring. Drawn as a stroked arc rather than the eight-spoke
   * icon so it stays smooth at small sizes.
   */
  let { size = 16, thickness = 2, label = "Loading", class: klass = "", ...rest } = $props();
</script>

<span
  class="ui-spinner {klass}"
  role="status"
  aria-label={label}
  style:--spinner-size="{size}px"
  style:--spinner-thickness="{thickness}px"
  {...rest}
></span>

<style>
  .ui-spinner {
    display: inline-block;
    width: var(--spinner-size);
    height: var(--spinner-size);
    border-radius: var(--ui-radius-full);
    /* A full ring at low opacity plus one opaque quadrant: the gap is what
       communicates rotation, and a conic gradient would band at these sizes. */
    border: var(--spinner-thickness) solid currentColor;
    border-top-color: transparent;
    opacity: 0.85;
    animation: ui-spinner-rotate 640ms linear infinite;
    vertical-align: middle;
  }
  @keyframes ui-spinner-rotate {
    to { transform: rotate(360deg); }
  }
  @media (prefers-reduced-motion: reduce) {
    .ui-spinner { animation-duration: 1800ms; }
  }
</style>
