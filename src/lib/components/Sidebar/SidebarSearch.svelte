<script>
  import { getSidebarContext } from "./Sidebar.svelte";
  import Icon from "../Icon/Icon.svelte";
  import Kbd from "../Kbd/Kbd.svelte";

  let {
    value = $bindable(""),
    placeholder = "Search…",
    shortcut = "⌘K",
    mic = false,
    class: klass = "",
    onsearch,
    onclick,
    ...rest
  } = $props();

  const ctx = getSidebarContext();
  const collapsed = $derived(ctx?.collapsed ?? false);
</script>

{#if collapsed}
  <button
    type="button"
    class="ui-sidebar-search-btn {klass}"
    onclick={onclick}
    aria-label={placeholder}
    title={placeholder}
    {...rest}
  >
    <Icon name="search" size={16} />
  </button>
{:else}
  <div class="ui-sidebar-search {klass}" {...rest}>
    <Icon name="search" size={15} class="ui-sidebar-search__icon" />
    <input
      type="text"
      class="ui-sidebar-search__input"
      {placeholder}
      bind:value
      oninput={(e) => onsearch?.(e.currentTarget.value)}
      {onclick}
    />
    {#if mic}
      <button type="button" class="ui-sidebar-search__mic" aria-label="Voice search">
        <Icon name="mic" size={14} />
      </button>
    {:else if shortcut}
      <Kbd size="xs">{shortcut}</Kbd>
    {/if}
  </div>
{/if}

<style>
  .ui-sidebar-search {
    display: flex;
    align-items: center;
    gap: var(--ui-space-3);
    height: var(--ui-control-h-sm);
    padding-inline: var(--ui-space-3);
    background: var(--ui-bg-sunken);
    border: 1px solid var(--ui-border-default);
    border-radius: var(--ui-control-radius-sm);
    color: var(--ui-fg-muted);
    margin-bottom: var(--ui-space-3);
    transition: border-color var(--ui-duration-fast) var(--ui-ease-out),
                box-shadow var(--ui-duration-fast) var(--ui-ease-out);
  }
  .ui-sidebar-search:focus-within {
    border-color: var(--ui-accent-solid);
    box-shadow: 0 0 0 var(--ui-ring-width) var(--ui-accent-ring);
    color: var(--ui-fg-default);
  }

  .ui-sidebar-search__icon {
    flex: none;
    color: var(--ui-fg-subtle);
  }

  .ui-sidebar-search__input {
    flex: 1;
    min-width: 0;
    border: none;
    background: transparent;
    font-size: var(--ui-text-sm);
    color: var(--ui-fg-default);
    outline: none;
  }
  .ui-sidebar-search__input::placeholder {
    color: var(--ui-fg-faint);
  }

  .ui-sidebar-search__mic {
    background: none;
    border: none;
    padding: 0;
    color: var(--ui-fg-subtle);
    cursor: pointer;
    display: flex;
    align-items: center;
  }

  .ui-sidebar-search-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: var(--ui-control-h-sm);
    border: 1px solid var(--ui-border-default);
    border-radius: var(--ui-control-radius-sm);
    background: var(--ui-bg-surface);
    color: var(--ui-fg-muted);
    cursor: pointer;
    margin-bottom: var(--ui-space-3);
    transition: background-color var(--ui-duration-fast) var(--ui-ease-out),
                color var(--ui-duration-fast) var(--ui-ease-out);
  }
  .ui-sidebar-search-btn:hover {
    background: var(--ui-bg-hover);
    color: var(--ui-fg-default);
  }
</style>
