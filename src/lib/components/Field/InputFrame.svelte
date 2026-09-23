<script>
  /**
   * The bordered box every text-like control lives inside.
   *
   * Pulling this out is the single most load-bearing decision in the forms
   * layer: Input, Select, TagInput, PhoneInput, CurrencyInput and Textarea all
   * render *into* this, so they cannot drift on height, radius, focus ring or
   * invalid styling. Focus is detected with :focus-within, which means the
   * frame lights up for whatever control a consumer nests in it — including
   * ones this kit doesn't ship.
   *
   * `start` / `end` snippets sit flush inside the border, for currency
   * prefixes, unit suffixes and inline submit buttons.
   */
  let {
    size = "md",
    invalid = false,
    disabled = false,
    readonly = false,
    multiline = false,
    unstyled = false,
    class: klass = "",
    start,
    end,
    children,
    ...rest
  } = $props();
</script>

<div
  class="ui-frame {klass}"
  data-size={size}
  data-invalid={invalid || undefined}
  data-disabled={disabled || undefined}
  data-readonly={readonly || undefined}
  data-multiline={multiline || undefined}
  data-unstyled={unstyled || undefined}
  {...rest}
>
  {#if start}<div class="ui-frame__slot ui-frame__slot--start">{@render start()}</div>{/if}
  <div class="ui-frame__control">{@render children?.()}</div>
  {#if end}<div class="ui-frame__slot ui-frame__slot--end">{@render end()}</div>{/if}
</div>

<style>
  .ui-frame {
    display: flex;
    align-items: stretch;
    /* Separates a start/end slot from the control. Empty slots are never
       rendered, so this never adds phantom space to a plain input. */
    gap: var(--frame-gap);
    width: 100%;
    min-width: 0;
    background: var(--ui-bg-surface);
    border: 1px solid var(--ui-border-default);
    border-radius: var(--frame-radius);
    box-shadow: var(--ui-shadow-sm);
    color: var(--ui-fg-default);
    min-height: var(--frame-h);
    box-sizing: border-box;
    transition:
      border-color var(--ui-duration-fast) var(--ui-ease-out),
      box-shadow var(--ui-duration-fast) var(--ui-ease-out),
      background-color var(--ui-duration-fast) var(--ui-ease-out);
  }

  /* Same four numbers a Button of the same size resolves, from the same
     tokens — a field and the button next to it are the same object. */
  .ui-frame[data-size="xs"] {
    --frame-h: var(--ui-control-h-xs);
    --frame-px: var(--ui-control-px-xs);
    --frame-fs: var(--ui-text-xs);
    --frame-radius: var(--ui-control-radius-xs);
    --frame-gap: var(--ui-control-gap-xs);
  }
  .ui-frame[data-size="sm"] {
    --frame-h: var(--ui-control-h-sm);
    --frame-px: var(--ui-control-px-sm);
    --frame-fs: var(--ui-text-sm);
    --frame-radius: var(--ui-control-radius-sm);
    --frame-gap: var(--ui-control-gap-sm);
  }
  .ui-frame[data-size="md"] {
    --frame-h: var(--ui-control-h-md);
    --frame-px: var(--ui-control-px-md);
    --frame-fs: var(--ui-text-md);
    --frame-radius: var(--ui-control-radius-md);
    --frame-gap: var(--ui-control-gap-md);
  }
  .ui-frame[data-size="lg"] {
    --frame-h: var(--ui-control-h-lg);
    --frame-px: var(--ui-control-px-lg);
    --frame-fs: var(--ui-text-base);
    --frame-radius: var(--ui-control-radius-lg);
    --frame-gap: var(--ui-control-gap-lg);
  }

  .ui-frame:hover:not([data-disabled]):not(:focus-within) {
    border-color: var(--ui-border-strong);
  }

  .ui-frame:focus-within {
    border-color: var(--ui-accent-solid);
    box-shadow: 0 0 0 var(--ui-ring-width) var(--ui-accent-ring), var(--ui-shadow-xs);
  }

  .ui-frame[data-invalid] {
    border-color: var(--ui-danger-solid);
  }
  .ui-frame[data-invalid]:focus-within {
    box-shadow: 0 0 0 var(--ui-ring-width)
      oklch(from var(--ui-danger-solid) l c h / 0.28), var(--ui-shadow-xs);
  }

  .ui-frame[data-disabled] {
    background: var(--ui-bg-muted);
    border-color: var(--ui-border-default);
    box-shadow: none;
    opacity: 0.7;
    cursor: not-allowed;
  }
  /* Readonly still reads as a real field — it holds a value the user may want
     to copy — so only the fill softens, not the contrast. */
  .ui-frame[data-readonly] {
    background: var(--ui-bg-sunken);
  }

  .ui-frame[data-multiline] {
    align-items: stretch;
  }

  .ui-frame[data-unstyled] {
    background: none;
    border-color: transparent;
    box-shadow: none;
  }
  .ui-frame[data-unstyled]:focus-within {
    border-color: transparent;
    box-shadow: none;
  }

  .ui-frame__control {
    flex: 1;
    min-width: 0;
    display: flex;
    align-items: center;
    gap: var(--frame-gap);
  }

  .ui-frame__slot {
    display: flex;
    align-items: center;
    flex: none;
    color: var(--ui-fg-subtle);
    font-size: var(--frame-fs);
  }
  /* Slots pad themselves rather than the frame, so a slot holding a flush
     button can cancel that padding without fighting a parent rule. */
  .ui-frame__slot--start { padding-inline-start: var(--frame-px); }
  .ui-frame__slot--end { padding-inline-end: var(--frame-px); }
  .ui-frame__slot:has(> :global(.ui-frame-flush)) {
    padding: 0;
  }
</style>
