<script>
  import Popover from "../Popover/Popover.svelte";
  import InputFrame from "../Field/InputFrame.svelte";
  import Icon from "../Icon/Icon.svelte";
  import Avatar from "../Avatar/Avatar.svelte";
  import { uid } from "../../internal/utils.js";

  /**
   * Rich single-select — the "Jane Brown ⌃⌄" control in the reference, where
   * each option carries an avatar and a secondary line that a native <option>
   * cannot render.
   *
   * That expressiveness costs you the platform picker, so use `Select` unless
   * the options genuinely need the extra structure. What is *not* optional is
   * the keyboard contract, which is implemented here in full: type-ahead,
   * arrows, Home/End, Enter/Space, Escape, and `aria-activedescendant` so the
   * focused option is announced while focus stays on the button.
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
    option: optionSnippet,
    selected: selectedSnippet,
    onchange,
    ...rest
  } = $props();

  const listId = uid("listbox");
  let open = $state(false);
  let activeIndex = $state(-1);
  let query = $state("");
  let listEl = $state(null);
  let typeahead = { buffer: "", timer: 0 };

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

  /**
   * One handler for every key, bound to whichever element actually holds
   * focus: the trigger button when the list is plain, the search field when
   * it isn't. An earlier version put this on the popover surface, where it
   * never fired at all — focus stays on the combobox, so the panel receives
   * no key events.
   */
  function handleKeys(event, show, close) {
    if (!open) {
      if (["ArrowDown", "ArrowUp", "Enter", " "].includes(event.key)) {
        event.preventDefault();
        show();
        // Open onto the current selection rather than the top of the list.
        queueMicrotask(() => moveTo(Math.max(0, visible.findIndex((o) => o.value === value))));
        return;
      }
      // Closed-state type-ahead cycles the value without opening, matching a
      // native <select>.
      if (event.key.length === 1 && /\S/.test(event.key)) {
        clearTimeout(typeahead.timer);
        typeahead.buffer += event.key.toLowerCase();
        typeahead.timer = setTimeout(() => (typeahead.buffer = ""), 500);
        const match = items.find((o) => !o.disabled && o.label.toLowerCase().startsWith(typeahead.buffer));
        if (match) {
          value = match.value;
          onchange?.(match.value);
        }
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
      case " ":
        // In a searchable list, space is part of the query.
        if (searchable) return;
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
      class="ui-listbox__trigger"
      {id}
      {disabled}
      role="combobox"
      aria-haspopup="listbox"
      aria-expanded={open}
      aria-controls={listId}
      aria-activedescendant={open && visible[activeIndex] ? `${listId}-${activeIndex}` : undefined}
      aria-invalid={invalid || undefined}
      aria-label={ariaLabel}
      onclick={toggle}
      onkeydown={(e) => handleKeys(e, show, close)}
      {...rest}
    >
      <InputFrame {size} {invalid} {disabled} class="ui-listbox__frame {klass}" end={frameEnd}>
        <span class="ui-listbox__value" data-placeholder={!current || undefined}>
          {#if current && selectedSnippet}
            {@render selectedSnippet(current)}
          {:else if current}
            {#if current.avatar || current.name}
              <Avatar size="xs" src={current.avatar} name={current.name ?? current.label} />
            {:else if current.icon}
              <Icon name={current.icon} size={15} />
            {/if}
            <span class="ui-listbox__label">{current.label}</span>
          {:else}
            <span class="ui-listbox__label">{placeholder}</span>
          {/if}
        </span>
      </InputFrame>
    </button>
  {/snippet}

  {#snippet children({ close })}
    <div class="ui-listbox__panel">
      {#if searchable}
        <div class="ui-listbox__search">
          <Icon name="search" size={14} />
          <!-- svelte-ignore a11y_autofocus -->
          <input
            type="text"
            placeholder="Search…"
            bind:value={query}
            autofocus
            oninput={() => moveTo(0)}
            onkeydown={(e) => handleKeys(e, () => {}, close)}
            aria-controls={listId}
          />
        </div>
      {/if}

      <ul class="ui-listbox__list" bind:this={listEl} id={listId} role="listbox" aria-label={ariaLabel}>
        {#each visible as option, i (option.value)}
          <!-- svelte-ignore a11y_click_events_have_key_events -->
          <li
            id={`${listId}-${i}`}
            class="ui-listbox__option"
            role="option"
            aria-selected={option.value === value}
            aria-disabled={option.disabled || undefined}
            data-active={i === activeIndex || undefined}
            onpointerenter={() => (activeIndex = i)}
            onclick={() => choose(option, close)}
          >
            {#if optionSnippet}
              {@render optionSnippet(option)}
            {:else}
              {#if option.avatar || option.name}
                <Avatar size="sm" src={option.avatar} name={option.name ?? option.label} />
              {:else if option.icon}
                <Icon name={option.icon} size={16} />
              {/if}
              <span class="ui-listbox__option-text">
                <span class="ui-listbox__option-label">{option.label}</span>
                {#if option.description}
                  <span class="ui-listbox__option-desc">{option.description}</span>
                {/if}
              </span>
              {#if option.value === value}<Icon name="check" size={15} />{/if}
            {/if}
          </li>
        {:else}
          <li class="ui-listbox__empty">No matches</li>
        {/each}
      </ul>
    </div>
  {/snippet}
</Popover>

<style>
  .ui-listbox__trigger {
    display: block;
    width: 100%;
    text-align: start;
    border-radius: var(--ui-control-radius-xs);
  }
  .ui-listbox__trigger:focus-visible {
    outline: none;
  }
  /* Focus lives on the button but the ring belongs on the frame, which is the
     thing that looks like a field. */
  .ui-listbox__trigger:focus-visible :global(.ui-listbox__frame) {
    border-color: var(--ui-accent-solid);
    box-shadow: 0 0 0 var(--ui-ring-width) var(--ui-accent-ring);
  }

  .ui-listbox__value {
    display: flex;
    align-items: center;
    gap: var(--ui-space-4);
    height: var(--frame-h);
    padding-inline: var(--frame-px);
    min-width: 0;
    font-size: var(--frame-fs);
    color: var(--ui-fg-default);
  }
  .ui-listbox__value[data-placeholder] {
    color: var(--ui-fg-faint);
  }
  .ui-listbox__label {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .ui-listbox__panel {
    display: flex;
    flex-direction: column;
    max-height: 288px;
  }
  .ui-listbox__search {
    display: flex;
    align-items: center;
    gap: var(--ui-space-4);
    padding: var(--ui-space-5) var(--ui-space-6);
    border-bottom: 1px solid var(--ui-border-subtle);
    color: var(--ui-fg-faint);
  }
  .ui-listbox__search input {
    flex: 1;
    min-width: 0;
    border: none;
    background: none;
    outline: none;
    font-size: var(--ui-text-md);
    color: var(--ui-fg-default);
  }

  .ui-listbox__list {
    list-style: none;
    margin: 0;
    padding: var(--ui-space-3);
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 1px;
  }

  .ui-listbox__option {
    display: flex;
    align-items: center;
    gap: var(--ui-space-5);
    padding: var(--ui-space-4) var(--ui-space-5);
    border-radius: var(--ui-control-radius-xs);
    font-size: var(--ui-text-md);
    cursor: pointer;
    min-width: 0;
  }
  .ui-listbox__option[data-active] {
    background: var(--ui-bg-hover);
  }
  .ui-listbox__option[aria-selected="true"] {
    color: var(--ui-accent-text);
  }
  .ui-listbox__option[aria-disabled] {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .ui-listbox__option-text {
    display: flex;
    flex-direction: column;
    gap: 1px;
    flex: 1;
    min-width: 0;
  }
  .ui-listbox__option-label {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .ui-listbox__option-desc {
    font-size: var(--ui-text-sm);
    color: var(--ui-fg-subtle);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .ui-listbox__empty {
    padding: var(--ui-space-8);
    text-align: center;
    font-size: var(--ui-text-md);
    color: var(--ui-fg-subtle);
  }
</style>
