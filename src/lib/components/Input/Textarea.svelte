<script>
  import InputFrame from "../Field/InputFrame.svelte";

  /**
   * Multi-line text, optionally auto-growing to fit its content, with
   * character count, hint, and refined resize grip geometry.
   */
  let {
    value = $bindable(""),
    size = "md",
    rows = 3,
    maxRows = undefined,
    maxLength = undefined,
    showCount = false,
    hint = undefined,
    placeholder = undefined,
    invalid = false,
    disabled = false,
    readonly = false,
    resize = "vertical",
    autogrow = false,
    id = undefined,
    class: klass = "",
    oninput,
    onchange,
    ...rest
  } = $props();

  let el = $state(null);

  const effectiveMaxLength = $derived(maxLength ?? rest.maxlength);
  const count = $derived(String(value ?? "").length);
  const isOver = $derived(effectiveMaxLength != null && count > effectiveMaxLength);
  const isInvalid = $derived(invalid || isOver);

  // Measuring requires collapsing the height first; otherwise scrollHeight can
  // only ever report the current (larger) box and the field never shrinks.
  $effect(() => {
    if (!autogrow || !el) return;
    void value;
    el.style.height = "auto";
    const lineHeight = parseFloat(getComputedStyle(el).lineHeight) || 20;
    const cap = maxRows ? maxRows * lineHeight + 16 : Infinity;
    el.style.height = `${Math.min(el.scrollHeight, cap)}px`;
    el.style.overflowY = el.scrollHeight > cap ? "auto" : "hidden";
  });
</script>

<div class="ui-textarea-wrap">
  <InputFrame
    {size}
    invalid={isInvalid}
    {disabled}
    {readonly}
    multiline
    class="ui-textarea-frame"
  >
    <div class="ui-textarea-container" data-size={size}>
      <textarea
        bind:this={el}
        class="ui-textarea {klass}"
        style:resize={autogrow ? "none" : resize}
        {id}
        {rows}
        maxlength={effectiveMaxLength}
        {placeholder}
        {disabled}
        {readonly}
        bind:value
        aria-invalid={isInvalid || undefined}
        {oninput}
        {onchange}
        {...rest}
      ></textarea>
      {#if resize !== "none" && !autogrow && !disabled && !readonly}
        <span class="ui-textarea__resizer" aria-hidden="true">
          <svg viewBox="0 0 7 7" width="7" height="7">
            <path d="M7 0 L7 7 L0 7 Z" fill="currentColor" />
          </svg>
        </span>
      {/if}
    </div>
  </InputFrame>

  {#if hint || showCount}
    <div class="ui-textarea__footer">
      {#if hint}
        <span class="ui-textarea__hint">{hint}</span>
      {:else}
        <span></span>
      {/if}
      {#if showCount && effectiveMaxLength != null}
        <span class="ui-textarea__count" data-over={isOver || undefined}>
          {count} / {effectiveMaxLength}
        </span>
      {:else if showCount}
        <span class="ui-textarea__count">{count}</span>
      {/if}
    </div>
  {/if}
</div>

<style>
  .ui-textarea-wrap {
    display: flex;
    flex-direction: column;
    gap: var(--ui-space-2);
    width: 100%;
    min-width: 0;
  }

  .ui-textarea-container {
    position: relative;
    width: 100%;
    display: flex;
    flex: 1;
    min-width: 0;
  }

  :global(.ui-textarea-frame) {
    min-height: 72px;
    padding: 0;
  }
  :global(.ui-textarea-frame[data-size="xs"]) {
    min-height: 52px;
  }
  :global(.ui-textarea-frame[data-size="sm"]) {
    min-height: 60px;
  }
  :global(.ui-textarea-frame[data-size="md"]) {
    min-height: 72px;
  }
  :global(.ui-textarea-frame[data-size="lg"]) {
    min-height: 88px;
  }

  .ui-textarea {
    flex: 1;
    min-width: 0;
    width: 100%;
    padding: var(--ui-space-5) var(--frame-px);
    border: none;
    background: none;
    outline: none;
    font-family: inherit;
    font-size: var(--frame-fs);
    line-height: var(--ui-leading-normal);
    letter-spacing: var(--ui-tracking-snug);
    color: inherit;
    display: block;
    box-sizing: border-box;
  }
  .ui-textarea::placeholder {
    color: var(--ui-fg-faint);
  }
  .ui-textarea:disabled {
    cursor: not-allowed;
  }
  .ui-textarea::-webkit-resizer {
    background: transparent;
  }

  .ui-textarea__resizer {
    position: absolute;
    right: 5px;
    bottom: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    pointer-events: none;
    color: var(--ui-border-strong);
    transition: color var(--ui-duration-fast) var(--ui-ease-out);
  }

  :global(.ui-frame:hover) .ui-textarea__resizer {
    color: var(--ui-fg-subtle);
  }
  :global(.ui-frame:focus-within) .ui-textarea__resizer {
    color: var(--ui-accent-solid);
  }

  .ui-textarea__footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: var(--ui-text-sm);
    line-height: var(--ui-leading-snug);
    color: var(--ui-fg-subtle);
    padding-inline: var(--ui-space-1);
    gap: var(--ui-space-4);
  }
  .ui-textarea__count {
    font-variant-numeric: tabular-nums;
    margin-left: auto;
  }
  .ui-textarea__count[data-over] {
    color: var(--ui-danger-text);
  }
</style>
