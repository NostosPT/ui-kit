<script>
  import InputFrame from "../Field/InputFrame.svelte";
  import Icon from "../Icon/Icon.svelte";
  import { clamp } from "../../internal/utils.js";

  /**
   * Stepper. The text field stays editable — steppers that only accept button
   * clicks are miserable for entering 250 — and the typed value is clamped on
   * blur rather than on every keystroke, so typing "5" on the way to "50"
   * doesn't get snapped to the minimum under the user's fingers.
   *
   * Numerical stepping features an ultra-smooth 3D flip-and-blur transition,
   * simulating a physical digital tumbler with concurrent exit and entry animations.
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
  let lastValue = $state(value);

  // Animation state for concurrent 3D flip & blur
  let prevDisplay = $state("");
  let currDisplay = $state("");
  let animDirection = $state(1); // 1 = up, -1 = down
  let animKey = $state(0);
  let animating = $state(false);
  let animTimer = null;

  const effectiveLayout = $derived(variant ?? layout);
  const effectiveAlign = $derived(
    align ?? (effectiveLayout === "controls-end" || effectiveLayout === "vertical" ? "start" : "center")
  );

  const decimals = $derived(
    precision ?? (String(step).split(".")[1]?.length ?? 0)
  );
  const atMin = $derived(value <= min);
  const atMax = $derived(value >= max);

  const iconSize = $derived(
    size === "xs" ? 12 : size === "sm" ? 14 : size === "lg" ? 18 : 16
  );
  const vertIconSize = $derived(
    size === "xs" ? 9 : size === "sm" ? 10 : size === "lg" ? 13 : 11
  );

  function format(n) {
    if (n == null || Number.isNaN(n)) return "";
    return decimals ? Number(n).toFixed(decimals) : String(n);
  }

  // Sync draft when value changes externally and trigger animation if not editing
  $effect(() => {
    if (value !== lastValue) {
      const oldVal = lastValue;
      lastValue = value;
      if (!editing) {
        const oldDisplay = format(oldVal);
        const newDisplay = format(value);
        draft = newDisplay;
        if (oldDisplay !== newDisplay) {
          triggerMotion(oldDisplay, newDisplay, value > oldVal ? 1 : -1);
        }
      }
    }
  });

  function triggerMotion(oldText, newText, dir) {
    prevDisplay = oldText;
    currDisplay = newText;
    animDirection = dir;
    animKey += 1;
    animating = true;

    if (animTimer) clearTimeout(animTimer);
    animTimer = setTimeout(() => {
      animating = false;
    }, 320);
  }

  function commit(next, explicitDirection) {
    const clamped = clamp(Number(next), min, max);
    const rounded = decimals ? Number(clamped.toFixed(decimals)) : clamped;
    if (rounded === value) return;

    const oldDisplay = format(value);
    const newDisplay = format(rounded);
    const dir = explicitDirection ?? (rounded > value ? 1 : -1);

    value = rounded;
    lastValue = rounded;
    draft = newDisplay;

    if (!editing && oldDisplay !== newDisplay) {
      triggerMotion(oldDisplay, newDisplay, dir);
    }
    onchange?.(rounded);
  }

  function nudge(direction) {
    if (disabled || readonly) return;
    const current = Number(value) || 0;
    const next = current + direction * step;
    commit(next, direction);
  }

  function onblur() {
    editing = false;
    const parsed = parseFloat(draft);
    if (Number.isNaN(parsed)) {
      draft = format(value);
    } else {
      commit(parsed);
    }
  }

  function onkeydown(event) {
    if (event.key === "ArrowUp") {
      event.preventDefault();
      editing = false;
      nudge(1);
    } else if (event.key === "ArrowDown") {
      event.preventDefault();
      editing = false;
      nudge(-1);
    } else if (event.key === "Enter") {
      event.currentTarget.blur();
    }
  }

  function handleAnimationEnd(event) {
    if (event.target.classList.contains("ui-number__digit--curr")) {
      animating = false;
    }
  }
</script>

{#snippet stepButton(direction, icon, label, atLimit, customClass)}
  <button
    type="button"
    class="ui-number__step {customClass ?? ''}"
    aria-label={label}
    disabled={disabled || readonly || atLimit}
    onclick={() => nudge(direction)}
    tabindex="-1"
  >
    <Icon name={icon} size={iconSize} />
  </button>
{/snippet}

{#snippet frameStart()}
  {@render stepButton(-1, "minus", "Decrease", atMin, "ui-number__step--start ui-frame-flush")}
{/snippet}

{#snippet frameEnd()}
  {@render stepButton(1, "plus", "Increase", atMax, "ui-number__step--end ui-frame-flush")}
{/snippet}

{#snippet controlsEnd()}
  <div class="ui-number__actions ui-frame-flush">
    {@render stepButton(-1, "minus", "Decrease", atMin, "ui-number__action-btn")}
    {@render stepButton(1, "plus", "Increase", atMax, "ui-number__action-btn")}
  </div>
{/snippet}

{#snippet verticalControls()}
  <div class="ui-number__vertical ui-frame-flush">
    <button
      type="button"
      class="ui-number__vert-btn"
      aria-label="Increase"
      disabled={disabled || readonly || atMax}
      onclick={() => nudge(1)}
      tabindex="-1"
    >
      <Icon name="chevron-up" size={vertIconSize} />
    </button>
    <button
      type="button"
      class="ui-number__vert-btn"
      aria-label="Decrease"
      disabled={disabled || readonly || atMin}
      onclick={() => nudge(-1)}
      tabindex="-1"
    >
      <Icon name="chevron-down" size={vertIconSize} />
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
  <div class="ui-number__field" data-editing={editing || undefined} data-layout={effectiveLayout}>
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
      oninput={() => {
        editing = true;
        animating = false;
      }}
      {onblur}
      {onkeydown}
      {...rest}
    />
    {#if !editing}
      <div
        class="ui-number__display"
        data-align={effectiveAlign}
        data-layout={effectiveLayout}
        aria-hidden="true"
      >
        {#if animating}
          {#key animKey}
            <div
              class="ui-number__motion"
              data-direction={animDirection > 0 ? "up" : "down"}
              onanimationend={handleAnimationEnd}
            >
              <span class="ui-number__digit ui-number__digit--prev">{prevDisplay}</span>
              <span class="ui-number__digit ui-number__digit--curr">{currDisplay}</span>
            </div>
          {/key}
        {:else}
          <span class="ui-number__digit ui-number__digit--static">{format(value)}</span>
        {/if}
      </div>
    {/if}
  </div>
</InputFrame>

<style>
  :global(.ui-number) {
    width: fit-content;
    gap: 0;
  }

  /* Proportional input width scale */
  :global(.ui-number[data-size="xs"]) { --number-w: 48px; }
  :global(.ui-number[data-size="sm"]) { --number-w: 54px; }
  :global(.ui-number[data-size="md"]) { --number-w: 60px; }
  :global(.ui-number[data-size="lg"]) { --number-w: 72px; }

  :global(.ui-number[data-layout="controls-end"][data-size="xs"]),
  :global(.ui-number[data-layout="vertical"][data-size="xs"]) { --number-w: 42px; }
  :global(.ui-number[data-layout="controls-end"][data-size="sm"]),
  :global(.ui-number[data-layout="vertical"][data-size="sm"]) { --number-w: 48px; }
  :global(.ui-number[data-layout="controls-end"][data-size="md"]),
  :global(.ui-number[data-layout="vertical"][data-size="md"]) { --number-w: 52px; }
  :global(.ui-number[data-layout="controls-end"][data-size="lg"]),
  :global(.ui-number[data-layout="vertical"][data-size="lg"]) { --number-w: 64px; }

  /* The separated layout reads as three controls rather than one field */
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

  .ui-number__field {
    position: relative;
    display: flex;
    align-items: center;
    height: 100%;
    min-width: 0;
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
    letter-spacing: var(--ui-tracking-snug);
    color: inherit;
    padding-inline: var(--ui-space-2);
    box-sizing: border-box;
  }
  .ui-number__input[data-layout="controls-end"],
  .ui-number__input[data-layout="vertical"] {
    padding-inline-start: var(--ui-space-4);
    padding-inline-end: var(--ui-space-2);
  }

  /* Hide raw input text while tumbler is presenting the number */
  .ui-number__field:not([data-editing]) .ui-number__input {
    color: transparent;
    caret-color: var(--ui-fg-default);
  }

  /* Display presentation layer with 3D tumbler perspective */
  .ui-number__display {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    padding-inline: var(--ui-space-2);
    pointer-events: none;
    overflow: hidden;
    perspective: 280px;
    perspective-origin: center;
    box-sizing: border-box;
  }
  .ui-number__display[data-align="start"] {
    justify-content: flex-start;
  }
  .ui-number__display[data-align="end"] {
    justify-content: flex-end;
  }
  .ui-number__display[data-layout="controls-end"],
  .ui-number__display[data-layout="vertical"] {
    padding-inline-start: var(--ui-space-4);
    padding-inline-end: var(--ui-space-2);
  }

  .ui-number__motion {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: inherit;
    transform-style: preserve-3d;
  }

  .ui-number__digit {
    position: absolute;
    display: inline-flex;
    align-items: center;
    justify-content: inherit;
    font-size: var(--frame-fs);
    font-variant-numeric: tabular-nums;
    font-weight: var(--ui-label-weight);
    letter-spacing: var(--ui-tracking-snug);
    color: inherit;
    user-select: none;
    white-space: nowrap;
    backface-visibility: hidden;
    transform-origin: 50% 50% -8px;
    will-change: transform, filter, opacity;
  }

  .ui-number__digit--static {
    position: relative;
  }

  /* --- Motion: Concurrent 3D Flip & Blur --- */
  .ui-number__motion[data-direction="up"] .ui-number__digit--prev {
    animation: ui-flip-blur-exit-up 240ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }
  .ui-number__motion[data-direction="up"] .ui-number__digit--curr {
    animation: ui-flip-blur-enter-up 240ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }

  .ui-number__motion[data-direction="down"] .ui-number__digit--prev {
    animation: ui-flip-blur-exit-down 240ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }
  .ui-number__motion[data-direction="down"] .ui-number__digit--curr {
    animation: ui-flip-blur-enter-down 240ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }

  @keyframes ui-flip-blur-exit-up {
    0% {
      transform: translateY(0) rotateX(0deg);
      filter: blur(0px);
      opacity: 1;
    }
    100% {
      transform: translateY(-85%) rotateX(-55deg);
      filter: blur(4px);
      opacity: 0;
    }
  }

  @keyframes ui-flip-blur-enter-up {
    0% {
      transform: translateY(85%) rotateX(55deg);
      filter: blur(4px);
      opacity: 0;
    }
    100% {
      transform: translateY(0) rotateX(0deg);
      filter: blur(0px);
      opacity: 1;
    }
  }

  @keyframes ui-flip-blur-exit-down {
    0% {
      transform: translateY(0) rotateX(0deg);
      filter: blur(0px);
      opacity: 1;
    }
    100% {
      transform: translateY(85%) rotateX(55deg);
      filter: blur(4px);
      opacity: 0;
    }
  }

  @keyframes ui-flip-blur-enter-down {
    0% {
      transform: translateY(-85%) rotateX(-55deg);
      filter: blur(4px);
      opacity: 0;
    }
    100% {
      transform: translateY(0) rotateX(0deg);
      filter: blur(0px);
      opacity: 1;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .ui-number__digit--prev,
    .ui-number__digit--curr {
      animation: none !important;
      transform: none !important;
      filter: none !important;
      opacity: 1 !important;
    }
  }

  /* --- Action Controls & Sizing --- */
  .ui-number__actions {
    display: flex;
    align-items: center;
    height: 100%;
    border-inline-start: 1px solid var(--ui-border-default);
  }

  .ui-number__action-btn {
    display: grid;
    place-items: center;
    width: calc(var(--frame-h) * 0.72);
    height: var(--frame-h);
    border: none;
    background: transparent;
    color: var(--ui-fg-muted);
    cursor: pointer;
    padding: 0;
    transition:
      background-color var(--ui-duration-fast) var(--ui-ease-out),
      color var(--ui-duration-fast) var(--ui-ease-out),
      transform var(--ui-duration-instant) var(--ui-ease-out);
  }
  .ui-number__action-btn:last-child {
    border-inline-start: 1px solid var(--ui-border-default);
    border-start-end-radius: calc(var(--frame-radius) - 1px);
    border-end-end-radius: calc(var(--frame-radius) - 1px);
  }
  .ui-number__action-btn:hover:not(:disabled) {
    background: var(--ui-bg-hover);
    color: var(--ui-fg-default);
  }
  .ui-number__action-btn:active:not(:disabled) {
    background: var(--ui-bg-sunken);
    transform: scale(0.92);
  }
  .ui-number__action-btn:disabled {
    color: var(--ui-fg-faint);
    cursor: not-allowed;
  }

  .ui-number__vertical {
    display: flex;
    flex-direction: column;
    height: var(--frame-h);
    width: 26px;
    border-inline-start: 1px solid var(--ui-border-default);
    border-start-end-radius: calc(var(--frame-radius) - 1px);
    border-end-end-radius: calc(var(--frame-radius) - 1px);
    overflow: hidden;
  }
  :global(.ui-number[data-size="xs"]) .ui-number__vertical { width: 22px; }
  :global(.ui-number[data-size="sm"]) .ui-number__vertical { width: 24px; }
  :global(.ui-number[data-size="md"]) .ui-number__vertical { width: 26px; }
  :global(.ui-number[data-size="lg"]) .ui-number__vertical { width: 30px; }

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
  .ui-number__vert-btn:active:not(:disabled) {
    background: var(--ui-bg-sunken);
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
    border: none;
    background: transparent;
    color: var(--ui-fg-muted);
    border-radius: inherit;
    cursor: pointer;
    transition:
      background-color var(--ui-duration-fast) var(--ui-ease-out),
      color var(--ui-duration-fast) var(--ui-ease-out),
      transform var(--ui-duration-instant) var(--ui-ease-out);
  }
  :global(.ui-number[data-layout="attached"]) .ui-number__step--start {
    border-inline-end: 1px solid var(--ui-border-default);
    border-start-start-radius: calc(var(--frame-radius) - 1px);
    border-end-start-radius: calc(var(--frame-radius) - 1px);
  }
  :global(.ui-number[data-layout="attached"]) .ui-number__step--end {
    border-inline-start: 1px solid var(--ui-border-default);
    border-start-end-radius: calc(var(--frame-radius) - 1px);
    border-end-end-radius: calc(var(--frame-radius) - 1px);
  }
  .ui-number__step:hover:not(:disabled) {
    background: var(--ui-bg-hover);
    color: var(--ui-fg-default);
  }
  .ui-number__step:active:not(:disabled) {
    background: var(--ui-bg-sunken);
    transform: scale(0.92);
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
  :global(.ui-number[data-layout="separated"]) .ui-number__input:focus {
    border-color: var(--ui-accent-solid);
    box-shadow: 0 0 0 var(--ui-ring-width) var(--ui-accent-ring), var(--ui-shadow-xs);
  }
</style>
