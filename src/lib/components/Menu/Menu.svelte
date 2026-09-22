<script>
  import Popover from "../Popover/Popover.svelte";

  /**
   * Dropdown menu. Wraps Popover and adds the menu keyboard contract:
   * Arrow keys move a roving focus, Home/End jump, typing a letter jumps to
   * the next item starting with it, Enter/Space activate.
   *
   * Focus management is done by querying the rendered items rather than by
   * keeping a parallel list in state — menu contents are frequently
   * conditional, and a derived index goes stale the moment an item hides.
   */
  let {
    open = $bindable(false),
    placement = "bottom-end",
    offset = 6,
    matchWidth = false,
    ariaLabel = "Menu",
    class: klass = "",
    trigger,
    children,
    ...rest
  } = $props();

  let surfaceEl = $state(null);
  let typeahead = { buffer: "", timer: 0 };

  const enabledItems = () =>
    Array.from(surfaceEl?.querySelectorAll("[role='menuitem']:not([aria-disabled='true'])") ?? []);

  function focusAt(index) {
    const items = enabledItems();
    if (!items.length) return;
    const wrapped = (index + items.length) % items.length;
    items[wrapped].focus();
  }

  function onkeydown(event) {
    const items = enabledItems();
    const current = items.indexOf(document.activeElement);

    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        focusAt(current + 1);
        return;
      case "ArrowUp":
        event.preventDefault();
        focusAt(current - 1);
        return;
      case "Home":
        event.preventDefault();
        focusAt(0);
        return;
      case "End":
        event.preventDefault();
        focusAt(items.length - 1);
        return;
      case "Tab":
        // A menu is a modal-ish surface; tabbing out should dismiss it rather
        // than leave an orphaned popup behind the focus ring.
        open = false;
        return;
    }

    if (event.key.length === 1 && /\S/.test(event.key)) {
      clearTimeout(typeahead.timer);
      typeahead.buffer += event.key.toLowerCase();
      typeahead.timer = setTimeout(() => (typeahead.buffer = ""), 500);

      const from = current + 1;
      const ordered = [...items.slice(from), ...items.slice(0, from)];
      const match = ordered.find((el) =>
        el.textContent.trim().toLowerCase().startsWith(typeahead.buffer)
      );
      if (match) {
        event.preventDefault();
        match.focus();
      }
    }
  }

  // Opening with the keyboard should land focus on the first item; opening
  // with a pointer should not steal it from the page.
  $effect(() => {
    if (!open || !surfaceEl) return;
    const id = requestAnimationFrame(() => {
      if (surfaceEl?.contains(document.activeElement)) return;
      enabledItems()[0]?.focus({ preventScroll: true });
    });
    return () => cancelAnimationFrame(id);
  });
</script>

<Popover
  bind:open
  {placement}
  {offset}
  {matchWidth}
  role="menu"
  {ariaLabel}
  class="ui-menu {klass}"
  {trigger}
  {...rest}
>
  {#snippet children({ close })}
    <div bind:this={surfaceEl} class="ui-menu__list" role="none" {onkeydown}>
      {@render children?.({ close })}
    </div>
  {/snippet}
</Popover>

<style>
  :global(.ui-menu) {
    min-width: 180px;
  }
  .ui-menu__list {
    display: flex;
    flex-direction: column;
    gap: 1px;
  }
</style>
