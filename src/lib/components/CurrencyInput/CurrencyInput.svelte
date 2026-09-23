<script>
  import InputFrame from "../Field/InputFrame.svelte";
  import Icon from "../Icon/Icon.svelte";

  /**
   * Money field: symbol on the left, currency picker on the right.
   *
   * It keeps `value` as a plain number and only formats on blur. Formatting on
   * every keystroke is the classic bug here — it fights the caret the moment
   * a thousands separator appears, and makes deleting a digit unpredictable.
   */
  let {
    value = $bindable(null),
    currency = $bindable("USD"),
    currencies = ["USD", "EUR", "GBP", "BRL", "JPY"],
    locale = undefined,
    size = "md",
    placeholder = "0.00",
    precision = 2,
    invalid = false,
    disabled = false,
    readonly = false,
    id = undefined,
    class: klass = "",
    onchange,
    ...rest
  } = $props();

  let draft = $state("");
  let editing = $state(false);

  const symbols = { USD: "$", EUR: "€", GBP: "£", BRL: "R$", JPY: "¥" };
  const symbol = $derived(symbols[currency] ?? currency);

  const formatter = $derived(
    new Intl.NumberFormat(locale, {
      minimumFractionDigits: precision,
      maximumFractionDigits: precision
    })
  );

  $effect(() => {
    if (!editing) draft = value == null ? "" : formatter.format(value);
  });

  function onfocus(event) {
    editing = true;
    // Strip grouping so the raw number is what the user edits.
    draft = value == null ? "" : String(value);
    queueMicrotask(() => event.target.select());
  }

  function onblur() {
    editing = false;
    const parsed = parseFloat(draft.replace(/[^0-9.\-]/g, ""));
    const next = Number.isNaN(parsed) ? null : Number(parsed.toFixed(precision));
    if (next !== value) {
      value = next;
      onchange?.({ value: next, currency });
    }
    draft = next == null ? "" : formatter.format(next);
  }
</script>

{#snippet frameStart()}
  <span class="ui-currency__symbol">{symbol}</span>
{/snippet}

{#snippet frameEnd()}
  <div class="ui-currency__unit">
    <span>{currency}</span>
    <Icon name="chevron-vertical" size={12} />
    <select
      class="ui-currency__select"
      bind:value={currency}
      {disabled}
      aria-label="Currency"
      onchange={() => onchange?.({ value, currency })}
    >
      {#each currencies as c (c)}<option value={c}>{c}</option>{/each}
    </select>
  </div>
{/snippet}

<InputFrame
  {size}
  {invalid}
  {disabled}
  {readonly}
  class="ui-currency {klass}"
  start={frameStart}
  end={currencies.length > 1 ? frameEnd : undefined}
>
  <input
    class="ui-currency__input"
    type="text"
    inputmode="decimal"
    {id}
    {placeholder}
    {disabled}
    {readonly}
    bind:value={draft}
    aria-invalid={invalid || undefined}
    {onfocus}
    {onblur}
    {...rest}
  />
</InputFrame>

<style>
  :global(.ui-currency) .ui-frame__slot--end {
    padding-inline-end: 0;
  }

  .ui-currency__symbol {
    color: var(--ui-fg-subtle);
    font-weight: var(--ui-label-weight);
    font-size: var(--frame-fs);
  }

  .ui-currency__input {
    flex: 1;
    min-width: 0;
    height: var(--frame-h);
    border: none;
    background: none;
    outline: none;
    font-size: var(--frame-fs);
    font-variant-numeric: tabular-nums;
    letter-spacing: var(--ui-tracking-snug);
    color: inherit;
  }
  .ui-currency__input::placeholder {
    color: var(--ui-fg-faint);
  }

  .ui-currency__unit {
    position: relative;
    display: flex;
    align-items: center;
    gap: var(--ui-space-2);
    height: var(--frame-h);
    padding-inline: var(--frame-px);
    color: var(--ui-fg-muted);
    font-size: var(--frame-fs);
    font-weight: var(--ui-label-weight);
    border-radius: inherit;
    cursor: pointer;
  }
  .ui-currency__unit:hover {
    background: var(--ui-bg-hover);
  }
  .ui-currency__select {
    position: absolute;
    inset: 0;
    opacity: 0;
    width: 100%;
    height: 100%;
    border: none;
    appearance: none;
    cursor: pointer;
  }
  .ui-currency__unit:has(.ui-currency__select:focus-visible) {
    outline: 2px solid var(--ui-accent-solid);
    outline-offset: -2px;
  }
</style>
