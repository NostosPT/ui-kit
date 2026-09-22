<script>
  import InputFrame from "../Field/InputFrame.svelte";

  /**
   * Multi-line text box with character counter, max length, and resize support.
   */
  let {
    value = $bindable(""),
    placeholder = undefined,
    rows = 4,
    maxLength = undefined,
    showCount = false,
    hint = undefined,
    size = "md",
    invalid = false,
    disabled = false,
    readonly = false,
    resize = "vertical",
    id = undefined,
    class: klass = "",
    oninput,
    onchange,
    ...rest
  } = $props();

  const count = $derived(String(value ?? "").length);
  const isOver = $derived(maxLength != null && count > maxLength);
</script>

<div class="ui-textbox-wrap">
  <InputFrame {size} invalid={invalid || isOver} {disabled} {readonly} multiline class="ui-textbox-frame">
    <textarea
      class="ui-textbox {klass}"
      style:resize
      {id}
      {rows}
      maxlength={maxLength}
      {placeholder}
      {disabled}
      {readonly}
      bind:value
      aria-invalid={invalid || isOver || undefined}
      {oninput}
      {onchange}
      {...rest}
    ></textarea>
  </InputFrame>

  {#if hint || showCount}
    <div class="ui-textbox__footer">
      {#if hint}
        <span class="ui-textbox__hint">{hint}</span>
      {/if}
      {#if showCount && maxLength != null}
        <span class="ui-textbox__count" data-over={isOver || undefined}>
          {count} / {maxLength}
        </span>
      {:else if showCount}
        <span class="ui-textbox__count">{count}</span>
      {/if}
    </div>
  {/if}
</div>

<style>
  .ui-textbox-wrap {
    display: flex;
    flex-direction: column;
    gap: var(--ui-space-2);
    width: 100%;
  }

  :global(.ui-textbox-frame) {
    min-height: 100px;
    padding: 0;
  }

  .ui-textbox {
    flex: 1;
    min-width: 0;
    width: 100%;
    min-height: 90px;
    padding: var(--ui-space-4) var(--frame-px);
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
  .ui-textbox::placeholder {
    color: var(--ui-fg-faint);
  }

  .ui-textbox__footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: var(--ui-text-sm);
    color: var(--ui-fg-subtle);
    padding-inline: var(--ui-space-1);
  }
  .ui-textbox__count[data-over] {
    color: var(--ui-danger-text);
  }
</style>
