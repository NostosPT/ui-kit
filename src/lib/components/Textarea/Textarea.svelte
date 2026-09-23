<script>
  import InputFrame from "../Field/InputFrame.svelte";

  /**
   * Multi-line text, optionally auto-growing to fit its content, with
   * character count, hint, and refined rounded resize grip geometry.
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
  let isDragging = $state(false);

  const effectiveMaxLength = $derived(maxLength ?? rest.maxlength);
  const count = $derived(String(value ?? "").length);
  const isOver = $derived(effectiveMaxLength != null && count > effectiveMaxLength);
  const isInvalid = $derived(invalid || isOver);

  function startResize(e) {
    if (disabled || readonly || autogrow || resize === "none") return;
    if (e.button !== 0 && e.pointerType === "mouse") return;
    e.preventDefault();
    e.stopPropagation();

    const startY = e.clientY;
    const startX = e.clientX;
    const startHeight = el ? el.offsetHeight : 0;
    const startWidth = el ? el.offsetWidth : 0;
    const allowH = resize === "horizontal" || resize === "both";
    const allowV = resize === "vertical" || resize === "both";

    isDragging = true;
    document.body.style.userSelect = "none";
    document.body.style.cursor = allowH && allowV ? "se-resize" : allowH ? "ew-resize" : "ns-resize";

    function onPointerMove(moveEvent) {
      if (!el) return;
      if (allowV) {
        const deltaY = moveEvent.clientY - startY;
        const minHeight = { xs: 44, sm: 52, md: 64, lg: 80 }[size] ?? 64;
        const newHeight = Math.max(minHeight, startHeight + deltaY);
        el.style.height = `${newHeight}px`;
      }
      if (allowH) {
        const deltaX = moveEvent.clientX - startX;
        const newWidth = Math.max(120, startWidth + deltaX);
        el.style.width = `${newWidth}px`;
      }
    }

    function onPointerUp() {
      isDragging = false;
      document.body.style.userSelect = "";
      document.body.style.cursor = "";
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("pointercancel", onPointerUp);
    }

    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
    window.addEventListener("pointercancel", onPointerUp);
  }

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

<div class="ui-textarea-wrap" data-dragging={isDragging || undefined}>
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
        <button
          type="button"
          class="ui-textarea__resizer"
          aria-hidden="true"
          tabindex="-1"
          onpointerdown={startResize}
        >
          <svg viewBox="0 0 10 10" width="8" height="8" aria-hidden="true">
            <path
              d="M8.5 2.2c0-.6-.7-1-1.2-.6L2.2 6.7c-.5.4-.2 1.3.5 1.3h5c.4 0 .8-.4.8-.8V2.2z"
              fill="currentColor"
            />
          </svg>
        </button>
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
    resize: none !important;
  }
  .ui-textarea::placeholder {
    color: var(--ui-fg-faint);
  }
  .ui-textarea:disabled {
    cursor: not-allowed;
  }

  .ui-textarea__resizer {
    position: absolute;
    right: 5px;
    bottom: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    background: transparent;
    padding: 0;
    margin: 0;
    color: var(--ui-border-strong);
    cursor: ns-resize;
    user-select: none;
    touch-action: none;
    transition: color var(--ui-duration-fast) var(--ui-ease-out);
  }

  .ui-textarea__resizer:hover,
  .ui-textarea-wrap[data-dragging] .ui-textarea__resizer {
    color: var(--ui-fg-default);
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
