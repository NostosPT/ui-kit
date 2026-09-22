<script>
  import InputFrame from "../Field/InputFrame.svelte";
  import Icon from "../Icon/Icon.svelte";

  /**
   * Single-line text control. Everything visual comes from InputFrame; this
   * file only adds the native input, the icon conveniences and a clear button.
   *
   * `start` / `end` snippets escape into the frame for anything richer than an
   * icon — an inline "Send invite" button, a unit select, a copy action. Give
   * such a child the `ui-frame-flush` class and the frame drops its padding so
   * the control can sit hard against the border.
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

  let inputEl = $state(null);

  const iconSize = $derived({ sm: 16, md: 18, lg: 20 }[size] ?? 18);
  const showClear = $derived(
    clearable && !disabled && !readonly && String(value ?? "").length > 0
  );
  const hasStart = $derived(Boolean(icon || start));

  function clear() {
    value = "";
    inputEl?.focus(); // don't drop the user out of the field
  }
</script>

{#snippet frameStart()}
  {#if icon}<Icon name={icon} size={iconSize} />{/if}
  {@render start?.()}
{/snippet}

{#snippet frameEnd()}
  {#if showClear}
    <button class="ui-input__clear" type="button" onclick={clear} aria-label="Clear">
      <Icon name="x" size={15} />
    </button>
  {/if}
  {#if trailingIcon}<Icon name={trailingIcon} size={iconSize} />{/if}
  {@render end?.()}
{/snippet}

<InputFrame
  {size}
  {invalid}
  {disabled}
  {readonly}
  class={frameClass}
  start={hasStart ? frameStart : undefined}
  end={showClear || trailingIcon || end ? frameEnd : undefined}
>
  <input
    bind:this={inputEl}
    class="ui-input {klass}"
    data-has-start={hasStart || undefined}
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
  /* When something precedes the input the frame already paid for that gutter,
     so the input drops its own — otherwise the text sits twice too far in. */
  .ui-input[data-has-start] {
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
    width: 20px;
    height: 20px;
    border-radius: var(--ui-radius-full);
    color: var(--ui-fg-faint);
    background: transparent;
    transition:
      background-color var(--ui-duration-fast) var(--ui-ease-out),
      color var(--ui-duration-fast) var(--ui-ease-out);
  }
  .ui-input__clear:hover {
    background: var(--ui-bg-muted);
    color: var(--ui-fg-default);
  }
</style>
