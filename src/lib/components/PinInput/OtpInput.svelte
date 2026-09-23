<script>
  import { clamp } from "../../internal/utils.js";

  /**
   * One-Time Password (OTP) / PIN input component:
   * [ 4 ] [ 8 ] [ 5 ] · [ 3 ] [   ] [   ]
   *
   * Features:
   * - 6-digit entry by default with middle dot separator
   * - Keyboard navigation (arrow keys, backspace, delete)
   * - Full paste support
   * - Focus halo ring matching reference screenshot
   */
  let {
    value = $bindable(""),
    length = 6,
    separatorAfter = 3,
    size = "md",
    disabled = false,
    invalid = false,
    autofocus = false,
    focusIndex = undefined,
    id = undefined,
    ariaLabel = "OTP code",
    class: klass = "",
    oncomplete,
    onchange,
    ...rest
  } = $props();

  let cells = $state([]);

  $effect(() => {
    if (focusIndex != null && cells[focusIndex]) {
      cells[focusIndex].focus();
    } else if (autofocus) {
      cells[0]?.focus();
    }
  });

  const chars = $derived(
    Array.from({ length }, (_, i) => value[i] ?? "")
  );

  function focusCell(i) {
    const el = cells[clamp(i, 0, length - 1)];
    el?.focus();
    el?.select();
  }

  function commit(next) {
    const clipped = next.slice(0, length);
    if (clipped === value) return;
    value = clipped;
    onchange?.(clipped);
    if (clipped.length === length) oncomplete?.(clipped);
  }

  function write(index, text) {
    const clean = text.replace(/\D/g, "");
    if (!clean) return;
    const nextChars = value.padEnd(length, " ").split("");
    for (let i = 0; i < clean.length && index + i < length; i += 1) {
      nextChars[index + i] = clean[i];
    }
    commit(nextChars.join("").trimEnd());
    focusCell(index + clean.length);
  }

  function oninput(event, index) {
    const el = event.currentTarget;
    const typed = el.value;
    el.value = "";
    write(index, typed);
  }

  function onkeydown(event, index) {
    const { key } = event;
    if (key === "Backspace") {
      event.preventDefault();
      const nextChars = value.padEnd(length, " ").split("");
      const target = nextChars[index] !== " " && nextChars[index] !== undefined ? index : index - 1;
      if (target < 0) return;
      nextChars[target] = " ";
      commit(nextChars.join("").trimEnd());
      focusCell(target);
    } else if (key === "ArrowLeft") {
      event.preventDefault();
      focusCell(index - 1);
    } else if (key === "ArrowRight") {
      event.preventDefault();
      focusCell(index + 1);
    }
  }

  function onpaste(event, index) {
    event.preventDefault();
    write(index, event.clipboardData?.getData("text") ?? "");
  }
</script>

<div
  class="ui-otp {klass}"
  role="group"
  aria-label={ariaLabel}
  data-size={size}
  data-invalid={invalid || undefined}
  data-disabled={disabled || undefined}
  {...rest}
>
  {#each chars as char, i (i)}
    <input
      bind:this={cells[i]}
      class="ui-otp__cell"
      id={i === 0 ? id : undefined}
      type="text"
      inputmode="numeric"
      pattern="[0-9]*"
      autocomplete={i === 0 ? "one-time-code" : "off"}
      maxlength="1"
      {disabled}
      aria-label="{ariaLabel}, digit {i + 1} of {length}"
      aria-invalid={invalid || undefined}
      value={char}
      data-filled={char ? true : undefined}
      data-focused={focusIndex === i || undefined}
      oninput={(e) => oninput(e, i)}
      onkeydown={(e) => onkeydown(e, i)}
      onpaste={(e) => onpaste(e, i)}
      onfocus={(e) => e.currentTarget.select()}
    />
    {#if separatorAfter === i + 1 && i + 1 < length}
      <span class="ui-otp__separator" aria-hidden="true">·</span>
    {/if}
  {/each}
</div>

<style>
  .ui-otp {
    display: inline-flex;
    align-items: center;
    gap: var(--otp-gap);
  }
  .ui-otp[data-size="sm"] {
    --otp-size: 34px;
    --otp-fs: var(--ui-text-md);
    --otp-gap: 6px;
    --otp-radius: var(--ui-control-radius-sm);
  }
  .ui-otp[data-size="md"] {
    --otp-size: 44px;
    --otp-fs: var(--ui-text-lg);
    --otp-gap: 8px;
    --otp-radius: var(--ui-control-radius-md);
  }
  .ui-otp[data-size="lg"] {
    --otp-size: 50px;
    --otp-fs: var(--ui-text-xl);
    --otp-gap: 10px;
    --otp-radius: var(--ui-control-radius-lg);
  }

  .ui-otp__cell {
    width: var(--otp-size);
    height: var(--otp-size);
    padding: 0;
    text-align: center;
    border: 1px solid var(--ui-border-default);
    border-radius: var(--otp-radius);
    background: var(--ui-bg-surface);
    box-shadow: var(--ui-shadow-sm);
    color: var(--ui-fg-default);
    font-size: var(--otp-fs);
    font-weight: var(--ui-weight-medium);
    font-variant-numeric: tabular-nums;
    outline: none;
    box-sizing: border-box;
    transition:
      border-color var(--ui-duration-fast) var(--ui-ease-out),
      box-shadow var(--ui-duration-fast) var(--ui-ease-out);
  }
  .ui-otp__cell:hover:not(:disabled):not(:focus) {
    border-color: var(--ui-border-strong);
  }
  .ui-otp__cell:focus,
  .ui-otp__cell[data-focused] {
    border-color: var(--ui-accent-solid);
    box-shadow: 0 0 0 var(--ui-ring-width) var(--ui-accent-ring), var(--ui-shadow-xs);
  }
  .ui-otp__cell:disabled {
    background: var(--ui-bg-muted);
    color: var(--ui-fg-faint);
    box-shadow: none;
    cursor: not-allowed;
  }
  .ui-otp[data-invalid] .ui-otp__cell {
    border-color: var(--ui-danger-solid);
  }
  .ui-otp[data-invalid] .ui-otp__cell:focus {
    box-shadow: 0 0 0 var(--ui-ring-width) oklch(from var(--ui-danger-solid) l c h / 0.28), var(--ui-shadow-xs);
  }

  .ui-otp__separator {
    color: var(--ui-fg-subtle);
    font-size: var(--otp-fs);
    font-weight: var(--ui-weight-bold);
    padding-inline: 2px;
    user-select: none;
  }
</style>
