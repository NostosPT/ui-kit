<script>
  import { getSidebarContext } from "./Sidebar.svelte";
  import Avatar from "../Avatar/Avatar.svelte";
  import Icon from "../Icon/Icon.svelte";
  import Tooltip from "../Tooltip/Tooltip.svelte";

  let {
    user = undefined,
    class: klass = "",
    action,
    children,
    ...rest
  } = $props();

  const ctx = getSidebarContext();
  const collapsed = $derived(ctx?.collapsed ?? false);
</script>

<div class="ui-sidebar-footer {klass}" data-collapsed={collapsed || undefined} {...rest}>
  {#if children}
    <div class="ui-sidebar-footer__links">
      {@render children()}
    </div>
  {/if}

  {#if user}
    {#if collapsed}
      <div class="ui-sidebar-footer__user-rail">
        <Tooltip content={user.name ?? "User profile"} placement="right">
          <Avatar
            size="sm"
            src={user.avatar}
            name={user.name}
            presence={user.presence ?? "online"}
          />
        </Tooltip>
      </div>
    {:else}
      <div class="ui-sidebar-footer__user-card">
        <Avatar
          size="sm"
          src={user.avatar}
          name={user.name}
          presence={user.presence ?? "online"}
        />
        <div class="ui-sidebar-footer__user-info">
          {#if user.name}
            <span class="ui-sidebar-footer__user-name">{user.name}</span>
          {/if}
          {#if user.email}
            <span class="ui-sidebar-footer__user-email">{user.email}</span>
          {/if}
        </div>

        {#if action}
          <div class="ui-sidebar-footer__user-action">
            {@render action()}
          </div>
        {:else}
          <button type="button" class="ui-sidebar-footer__user-menu-btn" aria-label="User menu">
            <Icon name="more-vertical" size={15} />
          </button>
        {/if}
      </div>
    {/if}
  {/if}
</div>

<style>
  .ui-sidebar-footer {
    display: flex;
    flex-direction: column;
    gap: var(--ui-space-2);
    margin-top: auto;
    padding-top: var(--ui-space-3);
    border-top: 1px solid var(--ui-border-subtle);
  }

  .ui-sidebar-footer__links {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .ui-sidebar-footer__user-card {
    display: flex;
    align-items: center;
    gap: var(--ui-space-3);
    padding: var(--ui-space-2);
    border-radius: var(--ui-control-radius-sm);
    background: transparent;
    transition: background-color var(--ui-duration-fast) var(--ui-ease-out);
  }
  .ui-sidebar-footer__user-card:hover {
    background: var(--ui-bg-hover);
  }

  .ui-sidebar-footer__user-info {
    display: flex;
    flex-direction: column;
    min-width: 0;
    flex: 1;
  }
  .ui-sidebar-footer__user-name {
    font-size: var(--ui-text-sm);
    font-weight: var(--ui-label-weight);
    color: var(--ui-fg-default);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .ui-sidebar-footer__user-email {
    font-size: var(--ui-text-xs);
    color: var(--ui-fg-muted);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .ui-sidebar-footer__user-action,
  .ui-sidebar-footer__user-menu-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--ui-fg-muted);
    background: none;
    border: none;
    padding: var(--ui-space-1);
    border-radius: var(--ui-radius-sm);
    cursor: pointer;
  }
  .ui-sidebar-footer__user-menu-btn:hover {
    color: var(--ui-fg-default);
  }

  .ui-sidebar-footer__user-rail {
    display: flex;
    justify-content: center;
    padding-block: var(--ui-space-2);
  }
</style>
