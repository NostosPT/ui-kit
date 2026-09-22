<script>
  import Popover from "../Popover/Popover.svelte";
  import InputFrame from "../Field/InputFrame.svelte";
  import Icon from "../Icon/Icon.svelte";
  import Badge from "../Badge/Badge.svelte";
  import { uid } from "../../internal/utils.js";

  /**
   * Multi-select dropdown with dismissible badges (solid, soft, avatar badges)
   * and popover option list with checkmarks.
   */
  let {
    value = $bindable([]),
    options = [],
    placeholder = "Select…",
    size = "md",
    badgeTone = "accent",
    badgeVariant = "solid",
    badgePill = true,
    max = undefined,
    invalid = false,
    disabled = false,
    matchWidth = true,
    id = undefined,
    ariaLabel = undefined,
    class: klass = "",
    onchange,
    ...rest
  } = $props();

  const listId = uid("multiselect");
  let open = $state(false);
  let query = $state("");
  let inputEl = $state(null);

  const items = $derived(
    options.map((o) => (typeof o === "object" ? o : { value: o, label: String(o) }))
  );
  const selectedItems = $derived(
    value.map((v) => items.find((item) => item.value === v) ?? { value: v, label: String(v) })
  );
  const visible = $derived(
    !query
      ? items
      : items.filter((o) =>
          `${o.label} ${o.description ?? ""}`.toLowerCase().includes(query.toLowerCase())
        )
  );

  function toggle(option) {
    if (disabled || option.disabled) return;
    const exists = value.includes(option.value);
    if (exists) {
      value = value.filter((v) => v !== option.value);
    } else {
      if (max != null && value.length >= max) return;
      value = [...value, option.value];
    }
    onchange?.(value);
    query = "";
  }

  function remove(val) {
    if (disabled) return;
    value = value.filter((v) => v !== val);
    onchange?.(value);
  }

  function onkeydown(e) {
    if (e.key === "Backspace" && !query && value.length) {
      remove(value[value.length - 1]);
    }
  }
</script>

{#snippet frameEnd()}
  <Icon name="chevron-vertical" size={size === "sm" ? 12 : 14} />
{/snippet}

<Popover bind:open placement="bottom-start" offset={4} {matchWidth} padded={false} ariaLabel={ariaLabel}>
  {#snippet trigger({ toggle: toggleOpen, show })}
    <div
      class="ui-multiselect__wrap {klass}"
      role="combobox"
      aria-expanded={open}
      aria-controls={listId}
      aria-haspopup="listbox"
      tabindex="-1"
      onclick={() => {
        show();
        inputEl?.focus();
      }}
      onkeydown={onkeydown}
    >
      <InputFrame {size} {invalid} {disabled} multiline class="ui-multiselect__frame" end={frameEnd}>
        <div class="ui-multiselect__chips">
          {#each selectedItems as item (item.value)}
            <Badge
              size={size === "lg" ? "md" : "sm"}
              tone={item.tone ?? badgeTone}
              variant={item.variant ?? badgeVariant}
              pill={item.pill ?? badgePill}
              icon={item.icon}
              avatar={item.avatar}
              removable={!disabled}
              onremove={() => remove(item.value)}
            >
              {item.label}
            </Badge>
          {/each}

          <input
            bind:this={inputEl}
            type="text"
            class="ui-multiselect__input"
            placeholder={value.length === 0 ? placeholder : (max != null && value.length >= max ? "" : placeholder)}
            disabled={disabled || (max != null && value.length >= max)}
            bind:value={query}
            onfocus={() => show()}
            {id}
            {...rest}
          />
        </div>
      </InputFrame>
    </div>
  {/snippet}

  {#snippet children({ close })}
    <div class="ui-multiselect__panel">
      <ul class="ui-multiselect__list" id={listId} role="listbox" aria-multiselectable="true">
        {#each visible as option (option.value)}
          {@const isSelected = value.includes(option.value)}
          <!-- svelte-ignore a11y_click_events_have_key_events -->
          <li
            class="ui-multiselect__option"
            role="option"
            aria-selected={isSelected}
            aria-disabled={option.disabled || (max != null && value.length >= max && !isSelected) || undefined}
            data-selected={isSelected || undefined}
            onclick={() => toggle(option)}
          >
            {#if option.avatar}
              <img class="ui-multiselect__avatar" src={option.avatar} alt="" />
            {:else if option.icon}
              <Icon name={option.icon} size={16} />
            {/if}
            <span class="ui-multiselect__option-label">{option.label}</span>
            {#if isSelected}
              <span class="ui-multiselect__check"><Icon name="check" size={14} /></span>
            {/if}
          </li>
        {:else}
          <li class="ui-multiselect__empty">No options</li>
        {/each}
      </ul>
    </div>
  {/snippet}
</Popover>

<style>
  .ui-multiselect__wrap {
    display: block;
    width: 100%;
    cursor: text;
  }
  .ui-multiselect__wrap:focus-within :global(.ui-multiselect__frame) {
    border-color: var(--ui-accent-solid);
    box-shadow: 0 0 0 var(--ui-ring-width) var(--ui-accent-ring);
  }

  :global(.ui-multiselect__frame) {
    min-height: var(--frame-h);
    padding-block: var(--ui-space-2);
  }

  .ui-multiselect__chips {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: var(--ui-space-2);
    flex: 1;
    min-width: 0;
    padding-inline-start: var(--frame-px);
  }

  .ui-multiselect__input {
    flex: 1;
    min-width: 90px;
    height: 28px;
    border: none;
    background: none;
    outline: none;
    font-family: inherit;
    font-size: var(--frame-fs);
    color: var(--ui-fg-default);
    padding: 0;
  }
  .ui-multiselect__input::placeholder {
    color: var(--ui-fg-faint);
  }

  .ui-multiselect__panel {
    display: flex;
    flex-direction: column;
    max-height: 260px;
    background: var(--ui-bg-surface);
  }
  .ui-multiselect__list {
    list-style: none;
    margin: 0;
    padding: var(--ui-space-2);
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 1px;
  }
  .ui-multiselect__option {
    display: flex;
    align-items: center;
    gap: var(--ui-space-3);
    padding: var(--ui-space-3) var(--ui-space-4);
    border-radius: var(--ui-control-radius-xs);
    font-size: var(--ui-text-sm);
    cursor: pointer;
    min-width: 0;
  }
  .ui-multiselect__option:hover {
    background: var(--ui-bg-hover);
  }
  .ui-multiselect__option[data-selected] {
    color: var(--ui-accent-text);
    font-weight: var(--ui-weight-medium);
  }
  .ui-multiselect__option[aria-disabled] {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .ui-multiselect__avatar {
    width: 20px;
    height: 20px;
    border-radius: var(--ui-radius-full);
    object-fit: cover;
    flex: none;
  }
  .ui-multiselect__option-label {
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .ui-multiselect__check {
    color: var(--ui-accent-solid);
    display: flex;
    align-items: center;
  }
  .ui-multiselect__empty {
    padding: var(--ui-space-6);
    text-align: center;
    font-size: var(--ui-text-sm);
    color: var(--ui-fg-subtle);
  }
</style>
