<script module>
  import { getContext, setContext } from "svelte";
  const KEY = Symbol("ui-sidebar");
  export const getSidebarContext = () => getContext(KEY);
  export const setSidebarContext = (ctx) => setContext(KEY, ctx);
</script>

<script>
  /**
   * Application navigation sidebar.
   *
   * Supports:
   * - Expanded (260px) and Collapsed / Mini-rail (64px) modes
   * - Smooth transition between states
   * - Variants: subtle (default SaaS look), solid, raised
   * - Full keyboard accessibility and semantic landmarks
   */
  let {
    collapsed = $bindable(false),
    variant = "subtle",
    width = "260px",
    collapsedWidth = "64px",
    class: klass = "",
    children,
    ...rest
  } = $props();

  function toggleCollapsed() {
    collapsed = !collapsed;
  }

  setSidebarContext({
    get collapsed() {
      return collapsed;
    },
    toggleCollapsed,
    get variant() {
      return variant;
    }
  });
</script>

<aside
  class="ui-sidebar {klass}"
  data-collapsed={collapsed || undefined}
  data-variant={variant}
  style:--sidebar-w={width}
  style:--sidebar-cw={collapsedWidth}
  {...rest}
>
  {@render children?.()}
</aside>

<style>
  .ui-sidebar {
    --sb-w: var(--sidebar-w, 260px);
    --sb-pad: var(--ui-space-3);
    --sb-bg: var(--ui-bg-surface);
    --sb-border: var(--ui-border-default);

    display: flex;
    flex-direction: column;
    width: var(--sb-w);
    min-width: var(--sb-w);
    height: 100%;
    min-height: 100vh;
    padding: var(--sb-pad);
    background: var(--sb-bg);
    border-inline-end: 1px solid var(--sb-border);
    box-sizing: border-box;
    transition: width var(--ui-duration-normal) var(--ui-ease-out),
                min-width var(--ui-duration-normal) var(--ui-ease-out);
    position: relative;
    user-select: none;
  }

  .ui-sidebar[data-collapsed] {
    --sb-w: var(--sidebar-cw, 64px);
    padding-inline: var(--ui-space-2);
  }

  .ui-sidebar[data-variant="subtle"] {
    --sb-bg: var(--ui-bg-surface);
  }

  .ui-sidebar[data-variant="raised"] {
    --sb-bg: var(--ui-bg-raised);
    box-shadow: var(--ui-shadow-sm);
  }

  .ui-sidebar[data-variant="solid"] {
    --sb-bg: var(--ui-bg-sunken);
  }
</style>
