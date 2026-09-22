<script>
  import Menu from "./Menu.svelte";

  /**
   * Context Menu. Opens a floating Menu at pointer coordinates on right-click
   * (contextmenu event) or on keyboard contextmenu activation.
   */
  let {
    open = $bindable(false),
    offset = 2,
    placement = "bottom-start",
    ariaLabel = "Context menu",
    class: klass = "",
    disabled = false,
    trigger,
    children,
    ...rest
  } = $props();

  let anchor = $state(null);
  let menuComp = $state(null);

  export function close() {
    menuComp?.close();
  }
  export function show() {
    menuComp?.show();
  }
  export function openAt(coordsOrEvent) {
    menuComp?.openAt(coordsOrEvent);
  }

  function oncontextmenu(event) {
    if (disabled) return;
    event.preventDefault();
    event.stopPropagation();
    anchor = { x: event.clientX, y: event.clientY };
    open = true;
  }
</script>

<div class="ui-context-menu-trigger" role="none" {oncontextmenu}>
  {@render trigger?.()}
</div>

<Menu
  bind:this={menuComp}
  bind:open
  {anchor}
  {offset}
  {placement}
  {ariaLabel}
  class="ui-context-menu {klass}"
  {...rest}
>
  {#snippet children({ close })}
    {@render children?.({ close })}
  {/snippet}
</Menu>

<style>
  .ui-context-menu-trigger {
    display: contents;
  }
</style>
