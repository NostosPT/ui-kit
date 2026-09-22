<script>
  import InputFrame from "../Field/InputFrame.svelte";
  import Icon from "../Icon/Icon.svelte";
  import { COUNTRIES, flagOf } from "./countries.js";

  /**
   * Country selector plus a number field in one frame.
   *
   * The selector is a real <select> with a transparent overlay rather than a
   * custom listbox: it keeps the platform picker on mobile — which is far
   * better than anything a web widget does on a phone — while the visible
   * flag, dial code and chevron stay ours to style.
   */
  let {
    value = $bindable(""),
    country = $bindable("US"),
    countries = COUNTRIES,
    size = "md",
    placeholder = "Phone number",
    invalid = false,
    disabled = false,
    id = undefined,
    class: klass = "",
    onchange,
    ...rest
  } = $props();

  const current = $derived(countries.find((c) => c.iso === country) ?? countries[0]);
</script>

{#snippet frameStart()}
  <div class="ui-phone__country">
    <span class="ui-phone__flag" aria-hidden="true">{flagOf(current.iso)}</span>
    <span class="ui-phone__dial">{current.iso} {current.dial}</span>
    <Icon name="chevron-vertical" size={12} />

    <select
      class="ui-phone__select"
      bind:value={country}
      {disabled}
      aria-label="Country"
      onchange={() => onchange?.({ country, value })}
    >
      {#each countries as c (c.iso + c.dial)}
        <option value={c.iso}>{flagOf(c.iso)} {c.name} ({c.dial})</option>
      {/each}
    </select>
  </div>
  <span class="ui-phone__rule" aria-hidden="true"></span>
{/snippet}

<InputFrame {size} {invalid} {disabled} class="ui-phone {klass}" start={frameStart}>
  <input
    class="ui-phone__input"
    type="tel"
    inputmode="tel"
    autocomplete="tel-national"
    {id}
    {placeholder}
    {disabled}
    bind:value
    aria-invalid={invalid || undefined}
    onchange={() => onchange?.({ country, value })}
    {...rest}
  />
</InputFrame>

<style>
  :global(.ui-phone) {
    --frame-gap: 0;
  }
  :global(.ui-phone) .ui-frame__slot--start {
    padding-inline-start: 0;
  }

  .ui-phone__country {
    position: relative;
    display: flex;
    align-items: center;
    gap: var(--ui-space-3);
    height: var(--frame-h);
    padding-inline: var(--frame-px);
    color: var(--ui-fg-muted);
    font-size: var(--frame-fs);
    font-weight: var(--ui-weight-medium);
    white-space: nowrap;
    border-radius: inherit;
    cursor: pointer;
  }
  .ui-phone__country:hover {
    background: var(--ui-bg-hover);
  }

  /* The native select covers the whole cell and is invisible; every visible
     pixel is the markup above it. */
  .ui-phone__select {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    cursor: pointer;
    border: none;
    appearance: none;
  }
  .ui-phone__select:focus-visible + :global(*),
  .ui-phone__country:has(.ui-phone__select:focus-visible) {
    outline: 2px solid var(--ui-accent-solid);
    outline-offset: -2px;
  }

  .ui-phone__flag {
    font-size: 1.15em;
    line-height: 1;
    /* Emoji flags render with their own metrics and ride high otherwise. */
    transform: translateY(-0.5px);
  }
  .ui-phone__dial {
    font-variant-numeric: tabular-nums;
  }

  .ui-phone__rule {
    width: 1px;
    align-self: center;
    height: 60%;
    background: var(--ui-border-default);
  }

  .ui-phone__input {
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
  .ui-phone__input::placeholder {
    color: var(--ui-fg-faint);
  }
</style>
