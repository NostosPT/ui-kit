<script>
  import InputFrame from "../Field/InputFrame.svelte";
  import Tag from "./Tag.svelte";

  /**
   * Chips plus a text field, sharing one frame — the "Users: Jack × Ann ×"
   * control in the reference.
   *
   * Two behaviours matter more than they look:
   *   • Backspace on an empty field removes the last chip, which is how every
   *     token field people have used before behaves.
   *   • `max` disables the text field instead of hiding it, so the control
   *     doesn't change height when the limit is reached.
   */
  let {
    value = $bindable([]),
    inputValue = $bindable(""),
    placeholder = "Add…",
    size = "md",
    max = undefined,
    separators = [",", "Enter", "Tab"],
    allowDuplicates = false,
    tone = "neutral",
    reorderable = true,
    invalid = false,
    disabled = false,
    id = undefined,
    class: klass = "",
    onchange,
    ...rest
  } = $props();

  let inputEl = $state(null);
  let draggedIndex = $state(null);
  let dragOverIndex = $state(null);

  const full = $derived(max != null && value.length >= max);
  const tagSize = $derived(size === "lg" ? "md" : size === "sm" ? "sm" : "md");

  function add(raw) {
    const text = raw.trim();
    if (!text || full) return;
    if (!allowDuplicates && value.some((v) => label(v).toLowerCase() === text.toLowerCase())) {
      inputValue = "";
      return;
    }
    value = [...value, text];
    inputValue = "";
    onchange?.(value);
  }

  function removeAt(index) {
    value = value.filter((_, i) => i !== index);
    onchange?.(value);
  }

  function ondragstart(e, index) {
    if (disabled || !reorderable) return;
    draggedIndex = index;
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", String(index));
  }

  function ondragover(e, index) {
    if (disabled || !reorderable || draggedIndex === null) return;
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    dragOverIndex = index;
  }

  function ondragleave(index) {
    if (dragOverIndex === index) {
      dragOverIndex = null;
    }
  }

  function ondrop(e, targetIndex) {
    e.preventDefault();
    if (disabled || !reorderable || draggedIndex === null || draggedIndex === targetIndex) {
      draggedIndex = null;
      dragOverIndex = null;
      return;
    }
    const next = [...value];
    const [moved] = next.splice(draggedIndex, 1);
    next.splice(targetIndex, 0, moved);
    value = next;
    onchange?.(value);
    draggedIndex = null;
    dragOverIndex = null;
  }

  function ondragend() {
    draggedIndex = null;
    dragOverIndex = null;
  }

  const label = (item) => (typeof item === "string" ? item : (item.label ?? item.value ?? ""));

  function onkeydown(event) {
    if (separators.includes(event.key)) {
      // Tab only commits when there is something to commit, so an empty field
      // still moves focus the way the user expects.
      if (event.key === "Tab" && !inputValue.trim()) return;
      event.preventDefault();
      add(inputValue);
      return;
    }
    if (event.key === "Backspace" && !inputValue && value.length) {
      removeAt(value.length - 1);
    }
  }

  function oninput(event) {
    const text = event.currentTarget.value;
    const sep = separators.find((s) => s.length === 1 && text.includes(s));
    if (sep) {
      // Handles paste of "a, b, c" as well as typing a comma.
      for (const part of text.split(sep)) add(part);
      inputValue = "";
    }
  }
</script>

<InputFrame
  {size}
  {invalid}
  {disabled}
  multiline
  class="ui-taginput {klass}"
  onclick={() => inputEl?.focus()}
  {...rest}
>
  <div class="ui-taginput__wrap">
    {#each value as item, i (label(item) + i)}
      <span
        class="ui-taginput__item"
        data-dragging={draggedIndex === i || undefined}
        data-drag-over={dragOverIndex === i || undefined}
        draggable={!disabled && reorderable && value.length > 1}
        ondragstart={(e) => ondragstart(e, i)}
        ondragover={(e) => ondragover(e, i)}
        ondragleave={() => ondragleave(i)}
        ondrop={(e) => ondrop(e, i)}
        ondragend={ondragend}
        role="group"
        aria-label={`Tag ${label(item)}`}
      >
        <Tag
          size={tagSize}
          {tone}
          label={label(item)}
          removable
          {disabled}
          onremove={() => removeAt(i)}
        />
      </span>
    {/each}

    <input
      bind:this={inputEl}
      class="ui-taginput__input"
      type="text"
      {id}
      placeholder={value.length ? "" : placeholder}
      disabled={disabled || full}
      bind:value={inputValue}
      aria-invalid={invalid || undefined}
      {onkeydown}
      {oninput}
      onblur={() => add(inputValue)}
    />
  </div>
</InputFrame>

<style>
  :global(.ui-taginput) {
    cursor: text;
    padding-block: var(--ui-space-2);
  }
  .ui-taginput__wrap {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: var(--ui-space-3);
    width: 100%;
    min-height: calc(var(--frame-h) - var(--ui-space-4));
    padding-inline: var(--frame-px);
  }
  .ui-taginput__item {
    display: inline-flex;
    align-items: center;
    cursor: grab;
    transition:
      transform var(--ui-duration-fast) var(--ui-ease-out),
      opacity var(--ui-duration-fast) var(--ui-ease-out);
  }
  .ui-taginput__item:active {
    cursor: grabbing;
  }
  .ui-taginput__item[data-dragging] {
    opacity: 0.4;
    transform: scale(0.96);
  }
  .ui-taginput__item[data-drag-over] {
    outline: 2px dashed var(--ui-accent-solid);
    outline-offset: 2px;
    border-radius: var(--ui-radius-xs);
  }
  .ui-taginput__input {
    flex: 1;
    /* Small enough to sit on the tail of a row of chips, but still grows to
       fill a line of its own. */
    min-width: 80px;
    height: 28px;
    border: none;
    background: none;
    outline: none;
    font-size: var(--frame-fs);
    letter-spacing: var(--ui-tracking-snug);
    color: inherit;
  }
  .ui-taginput__input::placeholder {
    color: var(--ui-fg-faint);
  }
</style>
