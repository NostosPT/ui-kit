<script>
  import Popover from "../Popover/Popover.svelte";
  import InputFrame from "../Field/InputFrame.svelte";
  import Icon from "../Icon/Icon.svelte";
  import Avatar from "../Avatar/Avatar.svelte";
  import { uid } from "../../internal/utils.js";

  /**
   * Rich dropdown / select component supporting avatars, icons, country flags, and search.
   */
  let {
    value = $bindable(undefined),
    options = [],
    placeholder = "Select…",
    size = "md",
    searchable = false,
    invalid = false,
    disabled = false,
    matchWidth = true,
    id = undefined,
    ariaLabel = undefined,
    class: klass = "",
    onchange,
    ...rest
  } = $props();

  const listId = uid("dropdown");
  let open = $state(false);
  let activeIndex = $state(-1);
  let query = $state("");
  let listEl = $state(null);

  const items = $derived(
    options.map((o) => (typeof o === "object" ? o : { value: o, label: String(o) }))
  );
  const visible = $derived(
    !searchable || !query
      ? items
      : items.filter((o) =>
          `${o.label} ${o.description ?? ""}`.toLowerCase().includes(query.toLowerCase())
        )
  );
  const current = $derived(items.find((o) => o.value === value));

  function choose(option, close) {
    if (option.disabled) return;
    value = option.value;
    onchange?.(option.value);
    query = "";
    close?.();
  }

  function moveTo(index) {
    const n = visible.length;
    if (!n) return;
    let next = ((index % n) + n) % n;
    for (let i = 0; i < n; i += 1) {
      if (!visible[next].disabled) break;
      next = (next + 1) % n;
    }
    activeIndex = next;
    listEl?.children[next]?.scrollIntoView({ block: "nearest" });
  }

  function handleKeys(event, show, close) {
    if (!open) {
      if (["ArrowDown", "ArrowUp", "Enter", " "].includes(event.key)) {
        event.preventDefault();
        show();
        queueMicrotask(() => moveTo(Math.max(0, visible.findIndex((o) => o.value === value))));
        return;
      }
      return;
    }

    switch (event.key) {
      case "ArrowDown": event.preventDefault(); moveTo(activeIndex + 1); break;
      case "ArrowUp": event.preventDefault(); moveTo(activeIndex - 1); break;
      case "Home": event.preventDefault(); moveTo(0); break;
      case "End": event.preventDefault(); moveTo(visible.length - 1); break;
      case "Enter":
        event.preventDefault();
        if (visible[activeIndex]) choose(visible[activeIndex], close);
        break;
      case "Escape":
        event.preventDefault();
        close();
        break;
      case "Tab":
        close();
        break;
    }
  }
</script>

{#snippet frameEnd()}
  <Icon name="chevron-vertical" size={size === "sm" ? 12 : 14} />
{/snippet}

<Popover bind:open placement="bottom-start" offset={4} {matchWidth} padded={false} ariaLabel={ariaLabel}>
  {#snippet trigger({ toggle, show, close })}
    <button
      type="button"
      class="ui-dropdown__trigger {klass}"
      {id}
      {disabled}
      role="combobox"
      aria-haspopup="listbox"
      aria-expanded={open}
      aria-controls={listId}
      aria-invalid={invalid || undefined}
      aria-label={ariaLabel}
      onclick={toggle}
      onkeydown={(e) => handleKeys(e, show, close)}
      {...rest}
    >
      <InputFrame {size} {invalid} {disabled} class="ui-dropdown__frame" end={frameEnd}>
        <span class="ui-dropdown__value" data-placeholder={!current || undefined}>
          {#if current}
            {#if current.avatar}
              <img class="ui-dropdown__avatar" src={current.avatar} alt="" />
            {:else if current.flag}
              <span class="ui-dropdown__flag" aria-hidden="true">{current.flag}</span>
            {:else if current.icon}
              <Icon name={current.icon} size={16} />
            {/if}
            <span class="ui-dropdown__label">{current.label}</span>
          {:else}
            <span class="ui-dropdown__label">{placeholder}</span>
          {/if}
        </span>
      </InputFrame>
    </button>
  {/snippet}

  {#snippet children({ close })}
    <div class="ui-dropdown__panel">
      {#if searchable}
        <div class="ui-dropdown__search">
          <Icon name="search" size={14} />
          <input
            type="text"
            placeholder="Search…"
            bind:value={query}
            oninput={() => moveTo(0)}
            onkeydown={(e) => handleKeys(e, () => {}, close)}
          />
        </div>
      {/if}

      <ul class="ui-dropdown__list" bind:this={listEl} id={listId} role="listbox" aria-label={ariaLabel}>
        {#each visible as option, i (option.value)}
          <!-- svelte-ignore a11y_click_events_have_key_events -->
          <li
            id={`${listId}-${i}`}
            class="ui-dropdown__option"
            role="option"
            aria-selected={option.value === value}
            aria-disabled={option.disabled || undefined}
            data-active={i === activeIndex || undefined}
            onpointerenter={() => (activeIndex = i)}
            onclick={() => choose(option, close)}
          >
            {#if option.avatar}
              <img class="ui-dropdown__avatar" src={option.avatar} alt="" />
            {:else if option.flag}
              <span class="ui-dropdown__flag" aria-hidden="true">{option.flag}</span>
            {:else if option.icon}
              <Icon name={option.icon} size={16} />
            {/if}
            <span class="ui-dropdown__option-text">
              <span class="ui-dropdown__option-label">{option.label}</span>
              {#if option.description}
                <span class="ui-dropdown__option-desc">{option.description}</span>
              {/if}
            </span>
            {#if option.value === value}
              <Icon name="check" size={15} />
            {/if}
          </li>
        {:else}
          <li class="ui-dropdown__empty">No matches</li>
        {/each}
      </ul>
    </div>
  {/snippet}
</Popover>

<style>
  .ui-dropdown__trigger {
    display: block;
    width: 100%;
    text-align: start;
    border: none;
    background: none;
    padding: 0;
    cursor: pointer;
  }
  .ui-dropdown__trigger:focus-visible {
    outline: none;
  }
  .ui-dropdown__trigger:focus-visible :global(.ui-dropdown__frame) {
    border-color: var(--ui-accent-solid);
    box-shadow: 0 0 0 var(--ui-ring-width) var(--ui-accent-ring);
  }

  .ui-dropdown__value {
    display: flex;
    align-items: center;
    gap: var(--ui-space-3);
    height: var(--frame-h);
    padding-inline: var(--frame-px);
    min-width: 0;
    font-size: var(--frame-fs);
    color: var(--ui-fg-default);
  }
  .ui-dropdown__value[data-placeholder] {
    color: var(--ui-fg-faint);
  }
  .ui-dropdown__label {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-weight: var(--ui-weight-medium);
  }

  .ui-dropdown__avatar {
    width: 22px;
    height: 22px;
    border-radius: var(--ui-radius-full);
    object-fit: cover;
    flex: none;
  }
  .ui-dropdown__flag {
    font-size: 1.15em;
    line-height: 1;
    flex: none;
  }

  .ui-dropdown__panel {
    display: flex;
    flex-direction: column;
    max-height: 288px;
    background: var(--ui-bg-surface);
  }
  .ui-dropdown__search {
    display: flex;
    align-items: center;
    gap: var(--ui-space-3);
    padding: var(--ui-space-3) var(--ui-space-4);
    border-bottom: 1px solid var(--ui-border-default);
    color: var(--ui-fg-faint);
  }
  .ui-dropdown__search input {
    flex: 1;
    min-width: 0;
    border: none;
    background: none;
    outline: none;
    font-size: var(--ui-text-sm);
    color: var(--ui-fg-default);
  }

  .ui-dropdown__list {
    list-style: none;
    margin: 0;
    padding: var(--ui-space-2);
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 1px;
  }
  .ui-dropdown__option {
    display: flex;
    align-items: center;
    gap: var(--ui-space-3);
    padding: var(--ui-space-3) var(--ui-space-4);
    border-radius: var(--ui-control-radius-xs);
    font-size: var(--ui-text-sm);
    cursor: pointer;
    min-width: 0;
  }
  .ui-dropdown__option[data-active] {
    background: var(--ui-bg-hover);
  }
  .ui-dropdown__option[aria-selected="true"] {
    color: var(--ui-accent-text);
  }
  .ui-dropdown__option[aria-disabled] {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .ui-dropdown__option-text {
    display: flex;
    flex-direction: column;
    gap: 1px;
    flex: 1;
    min-width: 0;
  }
  .ui-dropdown__option-label {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .ui-dropdown__option-desc {
    font-size: var(--ui-text-xs);
    color: var(--ui-fg-subtle);
  }

  .ui-dropdown__empty {
    padding: var(--ui-space-6);
    text-align: center;
    font-size: var(--ui-text-sm);
    color: var(--ui-fg-subtle);
  }
</style>
