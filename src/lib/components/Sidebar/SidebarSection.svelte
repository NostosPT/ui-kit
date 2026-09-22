<script>
  import { getSidebarContext } from "./Sidebar.svelte";
  import Icon from "../Icon/Icon.svelte";

  let {
    title = undefined,
    collapsible = false,
    open = $bindable(true),
    class: klass = "",
    action,
    children,
    ...rest
  } = $props();

  const ctx = getSidebarContext();
  const collapsed = $derived(ctx?.collapsed ?? false);

  function toggleOpen() {
    if (collapsible) {
      open = !open;
    }
  }
</script>

<div
  class="ui-sidebar-section {klass}"
  data-collapsed={collapsed || undefined}
  data-open={open || undefined}
  {...rest}
>
  {#if !collapsed && title}
    <div class="ui-sidebar-section__header">
      {#if collapsible}
        <button
          type="button"
          class="ui-sidebar-section__toggle"
          onclick={toggleOpen}
          aria-expanded={open}
        >
          <Icon name={open ? "chevron-down" : "chevron-right"} size={13} />
          <span class="ui-sidebar-section__title">{title}</span>
        </button>
      {:else}
        <span class="ui-sidebar-section__title">{title}</span>
      {/if}

      {#if action}
        <div class="ui-sidebar-section__action">
          {@render action()}
        </div>
      {/if}
    </div>
  {:else if collapsed}
    <div class="ui-sidebar-section__divider" aria-hidden="true"></div>
  {/if}

  {#if open}
    <div class="ui-sidebar-section__content">
      {@render children?.()}
    </div>
  {/if}
</div>

<style>
  .ui-sidebar-section {
    display: flex;
    flex-direction: column;
    margin-top: var(--ui-space-3);
  }

  .ui-sidebar-section__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: var(--ui-space-2) var(--ui-space-3);
    min-height: 28px;
  }

  .ui-sidebar-section__toggle {
    display: flex;
    align-items: center;
    gap: var(--ui-space-2);
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;
    color: inherit;
    font: inherit;
  }

  .ui-sidebar-section__title {
    font-size: var(--ui-text-xs);
    font-weight: var(--ui-label-weight);
    letter-spacing: var(--ui-tracking-snug);
    color: var(--ui-fg-subtle);
    text-transform: none;
  }

  .ui-sidebar-section__action {
    display: flex;
    align-items: center;
    gap: var(--ui-space-1);
    color: var(--ui-fg-muted);
  }

  .ui-sidebar-section__action :global(button) {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
    border-radius: var(--ui-radius-sm);
    background: none;
    border: none;
    color: var(--ui-fg-muted);
    cursor: pointer;
    transition: background-color var(--ui-duration-fast) var(--ui-ease-out),
                color var(--ui-duration-fast) var(--ui-ease-out);
  }
  .ui-sidebar-section__action :global(button:hover) {
    background: var(--ui-bg-hover);
    color: var(--ui-fg-default);
  }

  .ui-sidebar-section__divider {
    height: 1px;
    background: var(--ui-border-subtle);
    margin-block: var(--ui-space-3);
  }

  .ui-sidebar-section__content {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }
</style>
