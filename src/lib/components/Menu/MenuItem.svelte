<script>
  import Icon from "../Icon/Icon.svelte";

  /**
   * A single command. `closeOnSelect` defaults to true because that is what a
   * command menu should do; set it false for items that toggle state and are
   * meant to be clicked repeatedly.
   */
  let {
    icon = undefined,
    shortcut = undefined,
    tone = "neutral",
    disabled = false,
    selected = false,
    href = undefined,
    closeOnSelect = true,
    close = undefined,
    class: klass = "",
    children,
    onselect,
    ...rest
  } = $props();

  const tag = $derived(href && !disabled ? "a" : "button");

  function activate(event) {
    if (disabled) {
      event.preventDefault();
      return;
    }
    onselect?.(event);
    if (closeOnSelect) close?.();
  }

  function onkeydown(event) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      activate(event);
    }
  }
</script>

<svelte:element
  this={tag}
  class="ui-menu-item {klass}"
  role="menuitem"
  data-tone={tone}
  data-selected={selected || undefined}
  aria-disabled={disabled || undefined}
  tabindex={disabled ? -1 : 0}
  href={tag === "a" ? href : undefined}
  type={tag === "button" ? "button" : undefined}
  onclick={activate}
  {onkeydown}
  {...rest}
>
  {#if icon}<Icon name={icon} size={15} />{/if}
  <span class="ui-menu-item__label">{@render children?.()}</span>
  {#if shortcut}<span class="ui-menu-item__shortcut">{shortcut}</span>{/if}
  {#if selected}<Icon name="check" size={16} />{/if}
</svelte:element>

<style>
  .ui-menu-item {
    display: flex;
    align-items: center;
    gap: var(--ui-space-5);
    width: 100%;
    min-height: var(--ui-control-h-md);
    padding: var(--ui-space-3) var(--ui-space-6);
    border-radius: var(--ui-control-radius-xs);
    font-size: var(--ui-text-md);
    letter-spacing: var(--ui-tracking-snug);
    color: var(--ui-fg-default);
    text-align: start;
    text-decoration: none;
    cursor: pointer;
    transition: background-color var(--ui-duration-instant) var(--ui-ease-out);
  }
  /* Hover and keyboard focus deliberately look identical — a menu has one
     "current item", however the user got there. */
  .ui-menu-item:hover:not([aria-disabled="true"]),
  .ui-menu-item:focus-visible {
    background: var(--ui-bg-hover);
    outline: none;
  }
  .ui-menu-item[data-tone="danger"] {
    color: var(--ui-danger-text);
  }
  .ui-menu-item[data-tone="danger"]:hover:not([aria-disabled="true"]),
  .ui-menu-item[data-tone="danger"]:focus-visible {
    background: var(--ui-danger-soft);
  }
  .ui-menu-item[aria-disabled="true"] {
    color: var(--ui-fg-faint);
    cursor: not-allowed;
  }

  .ui-menu-item__label {
    flex: 1;
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .ui-menu-item__shortcut {
    font-size: var(--ui-text-xs);
    color: var(--ui-fg-faint);
    letter-spacing: var(--ui-tracking-wide);
  }
</style>
