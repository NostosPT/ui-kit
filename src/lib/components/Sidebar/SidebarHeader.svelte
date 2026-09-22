<script>
  import { getSidebarContext } from "./Sidebar.svelte";
  import Icon from "../Icon/Icon.svelte";

  let {
    title = undefined,
    subtitle = undefined,
    logo = undefined,
    collapsible = true,
    trafficLights = false,
    class: klass = "",
    action,
    children,
    ...rest
  } = $props();

  const ctx = getSidebarContext();
  const collapsed = $derived(ctx?.collapsed ?? false);
</script>

<div class="ui-sidebar-header {klass}" data-collapsed={collapsed || undefined} {...rest}>
  {#if trafficLights}
    <div class="ui-sidebar-header__traffic" aria-hidden="true">
      <span class="traffic-dot traffic-dot--close"></span>
      <span class="traffic-dot traffic-dot--min"></span>
      <span class="traffic-dot traffic-dot--max"></span>
    </div>
  {/if}

  <div class="ui-sidebar-header__row">
    {#if logo}
      <div class="ui-sidebar-header__logo">
        {#if typeof logo === "function"}
          {@render logo()}
        {:else if typeof logo === "string"}
          <Icon name={logo} size={20} />
        {/if}
      </div>
    {/if}

    {#if !collapsed}
      <div class="ui-sidebar-header__info">
        {#if title}<span class="ui-sidebar-header__title">{title}</span>{/if}
        {#if subtitle}<span class="ui-sidebar-header__subtitle">{subtitle}</span>{/if}
        {@render children?.()}
      </div>
    {/if}

    {#if action && !collapsed}
      <div class="ui-sidebar-header__action">
        {@render action()}
      </div>
    {:else if collapsible}
      <button
        type="button"
        class="ui-sidebar-header__toggle"
        onclick={() => ctx?.toggleCollapsed?.()}
        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        <Icon name="sidebar-toggle" size={16} />
      </button>
    {/if}
  </div>
</div>

<style>
  .ui-sidebar-header {
    display: flex;
    flex-direction: column;
    gap: var(--ui-space-3);
    padding: var(--ui-space-3) var(--ui-space-2);
    margin-bottom: var(--ui-space-2);
  }

  .ui-sidebar-header__traffic {
    display: flex;
    align-items: center;
    gap: 6px;
    margin-bottom: var(--ui-space-2);
  }
  .traffic-dot {
    width: 10px;
    height: 10px;
    border-radius: var(--ui-radius-full);
  }
  .traffic-dot--close { background: #ff5f56; }
  .traffic-dot--min { background: #ffbd2e; }
  .traffic-dot--max { background: #27c93f; }

  .ui-sidebar-header__row {
    display: flex;
    align-items: center;
    gap: var(--ui-space-3);
    min-height: var(--ui-control-h-sm);
  }

  .ui-sidebar-header__logo {
    display: flex;
    align-items: center;
    justify-content: center;
    width: var(--ui-control-h-sm);
    height: var(--ui-control-h-sm);
    border-radius: var(--ui-radius-lg);
    background: var(--ui-accent-solid);
    color: var(--ui-fg-on-accent);
    flex: none;
  }

  .ui-sidebar-header__info {
    display: flex;
    flex-direction: column;
    min-width: 0;
    flex: 1;
  }
  .ui-sidebar-header__title {
    font-size: var(--ui-text-md);
    font-weight: var(--ui-heading-weight);
    letter-spacing: var(--ui-tracking-snug);
    color: var(--ui-fg-default);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .ui-sidebar-header__subtitle {
    font-size: var(--ui-text-xs);
    color: var(--ui-fg-muted);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .ui-sidebar-header__toggle,
  .ui-sidebar-header__action {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-inline-start: auto;
    color: var(--ui-fg-muted);
    background: none;
    border: none;
    padding: var(--ui-space-2);
    border-radius: var(--ui-radius-md);
    cursor: pointer;
    transition: background-color var(--ui-duration-fast) var(--ui-ease-out),
                color var(--ui-duration-fast) var(--ui-ease-out);
  }
  .ui-sidebar-header__toggle:hover {
    background: var(--ui-bg-hover);
    color: var(--ui-fg-default);
  }
  .ui-sidebar-header[data-collapsed] .ui-sidebar-header__row {
    justify-content: center;
  }
  .ui-sidebar-header[data-collapsed] .ui-sidebar-header__toggle {
    margin: 0;
  }
</style>
