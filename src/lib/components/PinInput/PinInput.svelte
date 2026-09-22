<script>
  import { clamp } from "../../internal/utils.js";

  /**
   * Fixed-length code entry — the "4 8 5 · 3 _ _" field in the reference.
   *
   * One real input per cell rather than one hidden input with fake boxes. The
   * hidden-input trick looks identical and breaks the moment anyone uses it:
   * a password manager has nothing to fill, iOS one-time-code autofill has
   * nothing to target, and tapping the fourth box puts the caret at the end of
   * the string instead of in the fourth box. Real inputs cost the paste and
   * arrow-key handling below, and are worth it.
   *
   * `autocomplete="one-time-code"` sits on the first cell only — repeating it
   * makes iOS offer the suggestion six times.
   */
  let {
    value = $bindable(""),
    length = 6,
    size = "md",
    type = "text",
    separatorAfter = undefined,
    disabled = false,
    invalid = false,
    autofocus = false,
    id = undefined,
    ariaLabel = "Verification code",
    class: klass = "",
    oncomplete,
    onchange,
    ...rest
  } = $props();

  let cells = $state([]);

  /* Focused in an effect rather than with the `autofocus` attribute: the
     attribute fires before hydration finishes and moves the viewport on
     mobile, and every linter flags it for exactly that reason. */
  $effect(() => {
    if (autofocus) cells[0]?.focus();
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
    const clean = text.replace(/\s/g, "");
    if (!clean) return;
    const chars = value.padEnd(length, " ").split("");
    for (let i = 0; i < clean.length && index + i < length; i += 1) {
      chars[index + i] = clean[i];
    }
    commit(chars.join("").trimEnd());
    focusCell(index + clean.length);
  }

  function oninput(event, index) {
    const el = event.currentTarget;
    const typed = el.value;
    el.value = ""; // the cell is redrawn from `value`, never from itself
    write(index, typed);
  }

  function onkeydown(event, index) {
    const { key } = event;
    if (key === "Backspace") {
      event.preventDefault();
      const chars = value.padEnd(length, " ").split("");
      /* Backspace on an empty cell deletes the one before it and moves there,
         which is what every OTP field on the web does. */
      const target = chars[index] !== " " && chars[index] !== undefined ? index : index - 1;
      if (target < 0) return;
      chars[target] = " ";
      commit(chars.join("").trimEnd());
      focusCell(target);
    } else if (key === "ArrowLeft") {
      event.preventDefault();
      focusCell(index - 1);
    } else if (key === "ArrowRight") {
      event.preventDefault();
      focusCell(index + 1);
    } else if (key === "Home") {
      event.preventDefault();
      focusCell(0);
    } else if (key === "End") {
      event.preventDefault();
      focusCell(length - 1);
    }
  }

  function onpaste(event, index) {
    event.preventDefault();
    write(index, event.clipboardData?.getData("text") ?? "");
  }
</script>

<div
  class="ui-pin {klass}"
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
      class="ui-pin__cell"
      id={i === 0 ? id : undefined}
      type={type === "password" ? "password" : "text"}
      inputmode={type === "number" ? "numeric" : "text"}
      pattern={type === "number" ? "[0-9]*" : undefined}
      autocomplete={i === 0 ? "one-time-code" : "off"}
      maxlength="1"
      {disabled}
      aria-label="{ariaLabel}, character {i + 1} of {length}"
      aria-invalid={invalid || undefined}
      value={char}
      data-filled={char ? true : undefined}
      oninput={(e) => oninput(e, i)}
      onkeydown={(e) => onkeydown(e, i)}
      onpaste={(e) => onpaste(e, i)}
      onfocus={(e) => e.currentTarget.select()}
    />
    {#if separatorAfter === i + 1 && i + 1 < length}
      <span class="ui-pin__separator" aria-hidden="true">·</span>
    {/if}
  {/each}
</div>

<style>
  .ui-pin {
    display: inline-flex;
    align-items: center;
    gap: var(--pin-gap);
  }
  .ui-pin[data-size="sm"] { --pin-size: var(--ui-control-h-sm); --pin-fs: var(--ui-text-md); --pin-gap: var(--ui-space-3); --pin-radius: var(--ui-control-radius-sm); }
  .ui-pin[data-size="md"] { --pin-size: var(--ui-control-h-md); --pin-fs: var(--ui-text-lg); --pin-gap: var(--ui-space-4); --pin-radius: var(--ui-control-radius-md); }
  .ui-pin[data-size="lg"] { --pin-size: var(--ui-control-h-lg); --pin-fs: var(--ui-text-xl); --pin-gap: var(--ui-space-4); --pin-radius: var(--ui-control-radius-lg); }

  .ui-pin__cell {
    width: var(--pin-size);
    height: var(--pin-size);
    padding: 0;
    text-align: center;
    border: 1px solid var(--ui-border-default);
    border-radius: var(--pin-radius);
    background: var(--ui-bg-surface);
    box-shadow: var(--ui-shadow-xs);
    color: var(--ui-fg-default);
    font-size: var(--pin-fs);
    font-weight: var(--ui-numeric-weight);
    font-variant-numeric: tabular-nums;
    outline: none;
    transition:
      border-color var(--ui-duration-fast) var(--ui-ease-out),
      box-shadow var(--ui-duration-fast) var(--ui-ease-out);
  }
  .ui-pin__cell:hover:not(:disabled):not(:focus) {
    border-color: var(--ui-border-strong);
  }
  .ui-pin__cell:focus {
    border-color: var(--ui-accent-solid);
    box-shadow: 0 0 0 var(--ui-ring-width) var(--ui-accent-ring);
  }
  .ui-pin__cell:disabled {
    background: var(--ui-bg-muted);
    color: var(--ui-fg-faint);
    box-shadow: none;
    cursor: not-allowed;
  }
  .ui-pin[data-invalid] .ui-pin__cell {
    border-color: var(--ui-danger-solid);
  }
  .ui-pin[data-invalid] .ui-pin__cell:focus {
    box-shadow: 0 0 0 var(--ui-ring-width)
      oklch(from var(--ui-danger-solid) l c h / 0.28);
  }

  .ui-pin__separator {
    color: var(--ui-fg-faint);
    font-size: var(--pin-fs);
    font-weight: var(--ui-numeric-weight);
    padding-inline: var(--ui-space-1);
    user-select: none;
  }
</style>
