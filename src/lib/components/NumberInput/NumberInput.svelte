<script>
  import InputFrame from "../Field/InputFrame.svelte";
  import Icon from "../Icon/Icon.svelte";
  import { clamp } from "../../internal/utils.js";

  /**
   * Stepper. The text field stays editable — steppers that only accept button
   * clicks are miserable for entering 250 — and the typed value is clamped on
   * blur rather than on every keystroke, so typing "5" on the way to "50"
   * doesn't get snapped to the minimum under the user's fingers.
   */
  let {
    value = $bindable(0),
    min = -Infinity,
    max = Infinity,
    step = 1,
    precision = undefined,
    size = "md",
    align = undefined,
    layout = "attached",
    variant = undefined,
    invalid = false,
    disabled = false,
    readonly = false,
    id = undefined,
    class: klass = "",
    onchange,
    ...rest
  } = $props();

  let draft = $state(String(value ?? ""));
  let editing = $state(false);

  const effectiveLayout = $derived(variant ?? layout);
  const effectiveAlign = $derived(
    align ?? (effectiveLayout === "controls-end" || effectiveLayout === "vertical" ? "start" : "center")
  );

  // While the user is typing, the field owns the text; otherwise the value
  // owns it. Without this guard, formatting fights the caret.
  $effect(() => {
    if (!editing) draft = format(value);
  });

  const decimals = $derived(
    precision ?? (String(step).split(".")[1]?.length ?? 0)
  );
  const atMin = $derived(value <= min);
  const atMax = $derived(value >= max);

  function format(n) {
    if (n == null || Number.isNaN(n)) return "";
    return decimals ? Number(n).toFixed(decimals) : String(n);
  }

  function commit(next) {
    const clamped = clamp(Number(next), min, max);
    const rounded = decimals ? Number(clamped.toFixed(decimals)) : clamped;
    if (rounded === value) return;
    value = rounded;
    onchange?.(rounded);
  }

  function nudge(direction) {
    if (disabled || readonly) return;
    commit((Number(value) || 0) + direction * step);
  }

  function onblur() {
    editing = false;
    const parsed = parseFloat(draft);
    if (Number.isNaN(parsed)) draft = format(value);
    else commit(parsed);
  }

  function onkeydown(event) {
    if (event.key === "ArrowUp") {
      event.preventDefault();
      nudge(1);
    } else if (event.key === "ArrowDown") {
      event.preventDefault();
      nudge(-1);
    } else if (event.key === "Enter") {
      event.currentTarget.blur();
    }
  }
</script>

{#snippet stepButton(direction, icon, label, atLimit)}
  <button
    type="button"
    class="ui-number__step ui-frame-flush"
    aria-label={label}
    disabled={disabled || readonly || atLimit}
    onclick={() => nudge(direction)}
    tabindex="-1"
  >
    <Icon name={icon} size={size === "lg" ? 18 : 16} />
  </button>
{/snippet}

{#snippet frameStart()}
  {@render stepButton(-1, "minus", "Decrease", atMin)}
{/snippet}

{#snippet frameEnd()}
  {@render stepButton(1, "plus", "Increase", atMax)}
{/snippet}

{#snippet controlsEnd()}
  <div class="ui-number__actions">
    {@render stepButton(-1, "minus", "Decrease", atMin)}
    {@render stepButton(1, "plus", "Increase", atMax)}
  </div>
{/snippet}

{#snippet verticalControls()}
  <div class="ui-number__vertical">
    <button
      type="button"
      class="ui-number__vert-btn"
      aria-label="Increase"
      disabled={disabled || readonly || atMax}
      onclick={() => nudge(1)}
      tabindex="-1"
    >
      <Icon name="chevron-up" size={11} />
    </button>
    <button
      type="button"
      class="ui-number__vert-btn"
      aria-label="Decrease"
      disabled={disabled || readonly || atMin}
      onclick={() => nudge(-1)}
      tabindex="-1"
    >
      <Icon name="chevron-down" size={11} />
    </button>
  </div>
{/snippet}

<InputFrame
  {size}
  {invalid}
  {disabled}
  {readonly}
  class="ui-number {klass}"
  data-layout={effectiveLayout}
  start={effectiveLayout === "attached" || effectiveLayout === "separated" ? frameStart : undefined}
  end={effectiveLayout === "vertical" ? verticalControls : effectiveLayout === "controls-end" ? controlsEnd : frameEnd}
>
  <input
    class="ui-number__input"
    data-layout={effectiveLayout}
    type="text"
    inputmode="decimal"
    role="spinbutton"
    style:text-align={effectiveAlign}
    {id}
    {disabled}
    {readonly}
    bind:value={draft}
    aria-valuenow={value}
    aria-valuemin={min === -Infinity ? undefined : min}
    aria-valuemax={max === Infinity ? undefined : max}
    aria-invalid={invalid || undefined}
    onfocus={() => (editing = true)}
    {onblur}
    {onkeydown}
    {...rest}
  />
</InputFrame>

<style>
  :global(.ui-number) {
    width: fit-content;
    gap: 0;
  }
  /* The separated layout reads as three controls rather than one field —
     the treatment used for quantity next to a price in the reference. */
  :global(.ui-number[data-layout="separated"]) {
    background: none;
    border-color: transparent;
    box-shadow: none;
    gap: var(--ui-space-2);
  }
  :global(.ui-number[data-layout="separated"]:focus-within) {
    box-shadow: none;
    border-color: transparent;
  }

  .ui-number__input {
    width: var(--number-w, 60px);
    height: var(--frame-h);
    min-width: 0;
    border: none;
    background: none;
    outline: none;
    font-size: var(--frame-fs);
    font-variant-numeric: tabular-nums;
    font-weight: var(--ui-label-weight);
    color: inherit;
    padding-inline: var(--ui-space-2);
  }
  .ui-number__input[data-layout="controls-end"],
  .ui-number__input[data-layout="vertical"] {
    padding-inline-start: var(--ui-space-4);
    width: var(--number-w, 48px);
  }

  .ui-number__actions {
    display: flex;
    align-items: center;
    height: 100%;
  }

  .ui-number__vertical {
    display: flex;
    flex-direction: column;
    height: var(--frame-h);
    width: 26px;
    border-inline-start: 1px solid var(--ui-border-default);
  }
  .ui-number__vert-btn {
    flex: 1;
    display: grid;
    place-items: center;
    border: none;
    background: transparent;
    color: var(--ui-fg-muted);
    cursor: pointer;
    padding: 0;
    transition:
      background-color var(--ui-duration-fast) var(--ui-ease-out),
      color var(--ui-duration-fast) var(--ui-ease-out);
  }
  .ui-number__vert-btn:first-child {
    border-bottom: 1px solid var(--ui-border-default);
  }
  .ui-number__vert-btn:hover:not(:disabled) {
    background: var(--ui-bg-hover);
    color: var(--ui-fg-default);
  }
  .ui-number__vert-btn:disabled {
    color: var(--ui-fg-faint);
    cursor: not-allowed;
  }

  .ui-number__step {
    display: grid;
    place-items: center;
    width: var(--frame-h);
    height: var(--frame-h);
    color: var(--ui-fg-muted);
    border-radius: inherit;
    transition:
      background-color var(--ui-duration-fast) var(--ui-ease-out),
      color var(--ui-duration-fast) var(--ui-ease-out);
  }
  .ui-number__step:hover:not(:disabled) {
    background: var(--ui-bg-hover);
    color: var(--ui-fg-default);
  }
  .ui-number__step:disabled {
    color: var(--ui-fg-faint);
    cursor: not-allowed;
  }

  :global(.ui-number[data-layout="separated"]) .ui-number__step {
    border: 1px solid var(--ui-border-default);
    border-radius: var(--frame-radius);
    background: var(--ui-bg-surface);
    box-shadow: var(--ui-shadow-sm);
  }
  :global(.ui-number[data-layout="separated"]) .ui-number__input {
    border: 1px solid var(--ui-border-default);
    border-radius: var(--frame-radius);
    background: var(--ui-bg-surface);
    box-shadow: var(--ui-shadow-sm);
  }
</style>
