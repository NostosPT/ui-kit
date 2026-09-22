<script>
  import InputFrame from "../Field/InputFrame.svelte";
  import Icon from "../Icon/Icon.svelte";

  /**
   * A real <select> inside the shared frame. It gets the platform's own
   * dropdown — correct on touch devices, correct with a screen reader, correct
   * when the list is 300 items long — at the cost of not rendering rich rows.
   * Reach for Listbox when options need avatars, descriptions or icons.
   */
  let {
    value = $bindable(undefined),
    options = [],
    placeholder = undefined,
    size = "md",
    icon = undefined,
    invalid = false,
    disabled = false,
    id = undefined,
    class: klass = "",
    onchange,
    ...rest
  } = $props();

  const items = $derived(
    options.map((o) => (typeof o === "object" ? o : { value: o, label: String(o) }))
  );
  const iconSize = $derived(size === "lg" ? 18 : 16);
</script>

{#snippet frameStart()}
  {#if icon}<Icon name={icon} size={iconSize} />{/if}
{/snippet}

{#snippet frameEnd()}
  <Icon name="chevron-vertical" size={size === "sm" ? 12 : 14} />
{/snippet}

<InputFrame
  {size}
  {invalid}
  {disabled}
  start={icon ? frameStart : undefined}
  end={frameEnd}
>
  <select
    class="ui-select {klass}"
    data-has-start={icon ? true : undefined}
    data-placeholder={value == null || value === "" ? true : undefined}
    {id}
    {disabled}
    bind:value
    aria-invalid={invalid || undefined}
    {onchange}
    {...rest}
  >
    {#if placeholder}
      <option value="" disabled selected={value == null || value === ""}>{placeholder}</option>
    {/if}
    {#each items as item (item.value)}
      {#if item.options}
        <optgroup label={item.label}>
          {#each item.options as sub (sub.value)}
            <option value={sub.value} disabled={sub.disabled}>{sub.label}</option>
          {/each}
        </optgroup>
      {:else}
        <option value={item.value} disabled={item.disabled}>{item.label}</option>
      {/if}
    {/each}
  </select>
</InputFrame>

<style>
  .ui-select {
    flex: 1;
    min-width: 0;
    height: var(--frame-h);
    padding-inline: var(--frame-px);
    /* The frame draws its own chevron, so the native one has to go — and with
       it the platform padding reserved for it. */
    padding-inline-end: 0;
    appearance: none;
    -webkit-appearance: none;
    border: none;
    background: none;
    outline: none;
    font-size: var(--frame-fs);
    letter-spacing: var(--ui-tracking-snug);
    color: inherit;
    cursor: pointer;
  }
  .ui-select[data-has-start] {
    padding-inline-start: 0;
  }
  .ui-select[data-placeholder] {
    color: var(--ui-fg-faint);
  }
  .ui-select:disabled {
    cursor: not-allowed;
  }
  /* Option lists are painted by the OS; only the colours are ours to set. */
  .ui-select option {
    color: var(--ui-fg-default);
    background: var(--ui-bg-surface);
  }
</style>
