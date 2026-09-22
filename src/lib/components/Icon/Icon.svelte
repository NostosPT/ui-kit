<script>
  import { icons, fillableIcons } from "../../icons.js";

  /**
   * @typedef {Object} Props
   * @property {string} name  Key from the icon registry.
   * @property {number|string} [size]  Rendered box in px. Icons are drawn on a
   *   24-unit grid, so the stroke thins proportionally as size drops.
   * @property {number} [strokeWidth]  In viewBox units, not px.
   * @property {boolean} [filled]  Render solid instead of outlined. Only
   *   meaningful for glyphs in `fillableIcons`.
   */
  let {
    name,
    size = 16,
    strokeWidth = 2,
    filled = false,
    class: klass = "",
    ...rest
  } = $props();

  const markup = $derived(icons[name] ?? "");
  const solid = $derived(filled && fillableIcons.has(name));
</script>

{#if markup}
  <svg
    class="ui-icon {klass}"
    viewBox="0 0 24 24"
    width={size}
    height={size}
    fill={solid ? "currentColor" : "none"}
    stroke="currentColor"
    stroke-width={solid ? 0 : strokeWidth}
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
    focusable="false"
    {...rest}
  >
    {@html markup}
  </svg>
{/if}

<style>
  .ui-icon {
    display: block;
    flex: none;
    /* Icons sit next to text constantly; without this they ride the baseline
       and knock the line box taller than the control height. */
    vertical-align: middle;
  }
</style>
