<script>
  import { getSidebarContext } from "./Sidebar.svelte";
  import Icon from "../Icon/Icon.svelte";
  import Tooltip from "../Tooltip/Tooltip.svelte";

  let {
    icon = undefined,
    label = undefined,
    badge = undefined,
    badgeTone = "neutral",
    active = false,
    href = undefined,
    depth = 0,
    collapsible = false,
    open = $bindable(false),
    class: klass = "",
    action,
    children,
    onclick,
    ...rest
  } = $props();

  const ctx = getSidebarContext();
  const collapsed = $derived(ctx?.collapsed ?? false);
  const variant = $derived(ctx?.variant ?? "subtle");
  const tag = $derived(href ? "a" : "button");

  function handleClick(event) {
    if (collapsible) {
      open = !open;
    }
    onclick?.(event);
  }
</script>

<div
  class="ui-sidebar-item-wrap {klass}"
  data-collapsed={collapsed || undefined}
  data-active={active || undefined}
  data-depth={depth > 0 ? depth : undefined}
>
  {#if collapsed}
    <Tooltip content={label ?? ""} placement="right">
      <svelte:element
        this={tag}
        class="ui-sidebar-item ui-sidebar-item--rail"
        data-active={active || undefined}
        data-variant={variant}
        href={tag === "a" ? href : undefined}
        type={tag === "button" ? "button" : undefined}
        onclick={handleClick}
        aria-label={label}
        {...rest}
      >
        {#if icon}<Icon name={icon} size={18} />{/if}
        {#if badge != null}
          <span class="ui-sidebar-item__dot-badge" aria-hidden="true"></span>
        {/if}
      </svelte:element>
    </Tooltip>
  {:else}
    <svelte:element
      this={tag}
      class="ui-sidebar-item"
      data-active={active || undefined}
      data-variant={variant}
      style:padding-inline-start={depth > 0 ? `calc(var(--ui-space-3) + ${depth * 14}px)` : undefined}
      href={tag === "a" ? href : undefined}
      type={tag === "button" ? "button" : undefined}
      onclick={handleClick}
      {...rest}
    >
      {#if collapsible}
        <span class="ui-sidebar-item__chevron" aria-hidden="true">
          <Icon name={open ? "chevron-down" : "chevron-right"} size={13} />
        </span>
      {/if}

      {#if icon}
        <span class="ui-sidebar-item__icon">
          <Icon name={icon} size={16} />
        </span>
      {/if}

      <span class="ui-sidebar-item__label">{label}</span>

      {#if badge != null}
        <span class="ui-sidebar-item__badge" data-tone={badgeTone}>{badge}</span>
      {/if}

      {#if action}
        <span
          class="ui-sidebar-item__action"
          role="presentation"
          onclick={(e) => e.stopPropagation()}
        >
          {@render action()}
        </span>
      {/if}
    </svelte:element>
  {/if}

  {#if !collapsed && children && (open || !collapsible)}
    <div class="ui-sidebar-item__children">
      {@render children()}
    </div>
  {/if}
</div>

<style>
  .ui-sidebar-item-wrap {
    display: flex;
    flex-direction: column;
    width: 100%;
  }

  .ui-sidebar-item {
    display: flex;
    align-items: center;
    gap: var(--ui-space-3);
    width: 100%;
    height: var(--ui-control-h-sm);
    padding-inline: var(--ui-space-3);
    border-radius: var(--ui-control-radius-sm);
    font-size: var(--ui-text-sm);
    font-weight: var(--ui-label-weight);
    letter-spacing: var(--ui-tracking-snug);
    color: var(--ui-fg-muted);
    text-decoration: none;
    background: transparent;
    border: none;
    cursor: pointer;
    box-sizing: border-box;
    position: relative;
    transition: background-color var(--ui-duration-fast) var(--ui-ease-out),
                color var(--ui-duration-fast) var(--ui-ease-out);
  }

  .ui-sidebar-item:hover {
    background: var(--ui-bg-hover);
    color: var(--ui-fg-default);
  }

  /* Active states across the variants */
  .ui-sidebar-item[data-active] {
    color: var(--ui-fg-default);
    font-weight: var(--ui-weight-bold);
  }

  /* Subtle active variant (SaaS standard, matching Images 4 & 7) */
  .ui-sidebar-item[data-variant="subtle"][data-active] {
    background: var(--ui-bg-sunken);
  }

  /* Solid active variant (matching Image 6 Variant A) */
  .ui-sidebar-item[data-variant="solid"][data-active] {
    background: var(--ui-bg-inverse);
    color: var(--ui-fg-inverse);
  }
  .ui-sidebar-item[data-variant="solid"][data-active] .ui-sidebar-item__icon,
  .ui-sidebar-item[data-variant="solid"][data-active] .ui-sidebar-item__label {
    color: var(--ui-fg-inverse);
  }

  /* Raised active variant (white pill with shadow on gray canvas) */
  .ui-sidebar-item[data-variant="raised"][data-active] {
    background: var(--ui-bg-surface);
    box-shadow: var(--ui-shadow-xs);
    border: 1px solid var(--ui-border-default);
  }

  /* Collapsed mini-rail mode */
  .ui-sidebar-item--rail {
    justify-content: center;
    padding: 0;
    width: 100%;
    height: var(--ui-control-h-md);
    margin-block: 2px;
  }

  .ui-sidebar-item__icon {
    display: flex;
    align-items: center;
    flex: none;
    color: var(--ui-fg-muted);
  }
  .ui-sidebar-item:hover .ui-sidebar-item__icon,
  .ui-sidebar-item[data-active] .ui-sidebar-item__icon {
    color: currentColor;
  }

  .ui-sidebar-item__chevron {
    display: flex;
    align-items: center;
    color: var(--ui-fg-subtle);
    flex: none;
  }

  .ui-sidebar-item__label {
    flex: 1;
    min-width: 0;
    text-align: start;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .ui-sidebar-item__badge {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 18px;
    height: 18px;
    padding-inline: var(--ui-space-2);
    border-radius: var(--ui-radius-full);
    font-size: var(--ui-text-2xs);
    font-weight: var(--ui-label-weight);
    line-height: 1;
    background: var(--ui-bg-muted);
    color: var(--ui-fg-default);
    margin-inline-start: auto;
  }

  .ui-sidebar-item__dot-badge {
    position: absolute;
    top: 8px;
    right: 14px;
    width: 6px;
    height: 6px;
    border-radius: var(--ui-radius-full);
    background: var(--ui-accent-solid);
  }

  .ui-sidebar-item__action {
    display: flex;
    align-items: center;
    margin-inline-start: auto;
    color: var(--ui-fg-muted);
    opacity: 0;
    transition: opacity var(--ui-duration-fast) var(--ui-ease-out);
  }
  .ui-sidebar-item:hover .ui-sidebar-item__action,
  .ui-sidebar-item[data-active] .ui-sidebar-item__action {
    opacity: 1;
  }

  .ui-sidebar-item__action :global(button) {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 22px;
    height: 22px;
    border-radius: var(--ui-radius-sm);
    background: none;
    border: none;
    color: inherit;
    cursor: pointer;
  }
  .ui-sidebar-item__action :global(button:hover) {
    background: var(--ui-bg-hover);
    color: var(--ui-fg-default);
  }

  .ui-sidebar-item__children {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }
</style>
