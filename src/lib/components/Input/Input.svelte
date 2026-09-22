<script>
  import InputFrame from "../Field/InputFrame.svelte";
  import Icon from "../Icon/Icon.svelte";

  /**
   * Single-line text control. Everything visual comes from InputFrame; this
   * file only adds the native input, the icon conveniences and a clear button.
   *
   * `start` / `end` snippets escape into the frame for anything richer than an
   * icon — an inline "Send invite" button, a unit select, a copy action.
   */
  let {
    value = $bindable(""),
    type = "text",
    size = "md",
    placeholder = undefined,
    icon = undefined,
    trailingIcon = undefined,
    invalid = false,
    disabled = false,
    readonly = false,
    clearable = false,
    id = undefined,
    class: klass = "",
    frameClass = "",
    start,
    end,
    oninput,
    onchange,
    ...rest
  } = $props();

  const showClear = $derived(clearable && !disabled && !readonly && String(value ?? "").length > 0);

  function clear(event) {
    event.preventDefault();
    value = "";
    // Hand focus back so clearing doesn't drop the user out of the field.
    event.currentTarget.closest(".ui-frame")?.querySelector("input")?.focus();
  }
</script>

<InputFrame {size} {invalid} {disabled} {readonly} class={frameClass}>
  {#snippet start()}
    {#if icon}<Icon name={icon} size={size === "lg" ? 18 : 16} />{/if}
  {/snippet}

  <input
    class="ui-input {klass}"
    {type}
    {id}
    {placeholder}
    {disabled}
    {readonly}
    bind:value
    aria-invalid={invalid || undefined}
    {oninput}
    {onchange}
    {...rest}
  />

  {#snippet end()}
    {#if showClear}
      <button class="ui-input__clear" type="button" onclick={clear} aria-label="Clear">
        <Icon name="x" size={14} />
      </button>
    {/if}
    {#if trailingIcon}<Icon name={trailingIcon} size={size === "lg" ? 18 : 16} />{/if}
  {/snippet}
</InputFrame>

<style>
  .ui-input {
    flex: 1;
    min-width: 0;
    height: var(--frame-h);
    padding-inline: var(--frame-px);
    border: none;
    background: none;
    outline: none;
    font-size: var(--frame-fs);
    letter-spacing: var(--ui-tracking-snug);
    color: inherit;
  }
  /* When an icon or slot precedes the input the frame has already paid for the
     gutter, so the input drops its own — otherwise the text sits too far in. */
  :global(.ui-frame__slot--start:not(:empty)) + .ui-frame__control .ui-input {
    padding-inline-start: 0;
  }

  .ui-input::placeholder {
    color: var(--ui-fg-faint);
  }
  .ui-input:disabled {
    cursor: not-allowed;
  }

  /* Native affordances that fight the design language. */
  .ui-input[type="search"]::-webkit-search-cancel-button {
    -webkit-appearance: none;
    appearance: none;
  }
  .ui-input[type="number"] {
    -moz-appearance: textfield;
    appearance: textfield;
  }
  .ui-input[type="number"]::-webkit-outer-spin-button,
  .ui-input[type="number"]::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  .ui-input__clear {
    display: grid;
    place-items: center;
    width: 18px;
    height: 18px;
    border-radius: var(--ui-radius-full);
    color: var(--ui-fg-faint);
    background: transparent;
    transition: background-color var(--ui-duration-fast) var(--ui-ease-out);
  }
  .ui-input__clear:hover {
    background: var(--ui-bg-muted);
    color: var(--ui-fg-default);
  }
</style>
