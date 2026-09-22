<script>
  import Icon from "../Icon/Icon.svelte";
  import Button from "../Button/Button.svelte";
  import { uid } from "../../internal/utils.js";

  /**
   * Sleek single-line file upload bar:
   * [ 📎 Drop file(s) here…             [Browse] ]
   */
  let {
    files = $bindable([]),
    placeholder = "Drop file(s) here…",
    browseLabel = "Browse",
    icon = "paperclip",
    accept = undefined,
    multiple = false,
    disabled = false,
    invalid = false,
    size = "md",
    id = undefined,
    class: klass = "",
    onfiles,
    ...rest
  } = $props();

  const fallbackId = uid("upload");
  const inputId = $derived(id ?? fallbackId);
  let inputEl = $state(null);
  let isDragging = $state(false);

  const displayLabel = $derived(
    files.length === 0
      ? placeholder
      : files.length === 1
      ? files[0].name
      : `${files.length} files selected`
  );

  function handleFiles(list) {
    const arr = Array.from(list ?? []);
    if (!arr.length) return;
    files = multiple ? arr : arr.slice(0, 1);
    onfiles?.(files);
  }

  function ondrop(e) {
    e.preventDefault();
    isDragging = false;
    if (disabled) return;
    handleFiles(e.dataTransfer?.files);
  }

  function ondragover(e) {
    e.preventDefault();
    if (disabled) return;
    isDragging = true;
  }

  function ondragleave() {
    isDragging = false;
  }
</script>

<div
  class="ui-fileupload {klass}"
  data-size={size}
  data-dragging={isDragging || undefined}
  data-disabled={disabled || undefined}
  data-invalid={invalid || undefined}
  {ondrop}
  {ondragover}
  {ondragleave}
  onclick={() => !disabled && inputEl?.click()}
  role="presentation"
  {...rest}
>
  <input
    bind:this={inputEl}
    type="file"
    class="ui-fileupload__input"
    id={inputId}
    {accept}
    {multiple}
    {disabled}
    onchange={(e) => {
      handleFiles(e.currentTarget.files);
      e.currentTarget.value = "";
    }}
  />

  <div class="ui-fileupload__start">
    <Icon name={icon} size={18} />
    <span class="ui-fileupload__label" data-placeholder={files.length === 0 || undefined}>
      {displayLabel}
    </span>
  </div>

  <div class="ui-fileupload__action">
    <Button
      size="sm"
      variant="secondary"
      {disabled}
      onclick={(e) => {
        e.stopPropagation();
        inputEl?.click();
      }}
    >
      {browseLabel}
    </Button>
  </div>
</div>

<style>
  .ui-fileupload {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--ui-space-3);
    height: var(--ui-control-h-md);
    padding-inline: var(--ui-space-4) var(--ui-space-2);
    border: 1px solid var(--ui-border-default);
    border-radius: var(--ui-control-radius-md);
    background: var(--ui-bg-surface);
    box-shadow: var(--ui-shadow-xs);
    cursor: pointer;
    user-select: none;
    transition:
      border-color var(--ui-duration-fast) var(--ui-ease-out),
      background-color var(--ui-duration-fast) var(--ui-ease-out),
      box-shadow var(--ui-duration-fast) var(--ui-ease-out);
  }
  .ui-fileupload[data-size="sm"] {
    height: var(--ui-control-h-sm);
  }
  .ui-fileupload[data-size="lg"] {
    height: var(--ui-control-h-lg);
  }

  .ui-fileupload__input {
    position: absolute;
    opacity: 0;
    pointer-events: none;
    width: 0;
    height: 0;
  }

  .ui-fileupload__start {
    display: flex;
    align-items: center;
    gap: var(--ui-space-3);
    color: var(--ui-fg-muted);
    min-width: 0;
    flex: 1;
  }

  .ui-fileupload__label {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: var(--ui-text-sm);
    color: var(--ui-fg-default);
  }
  .ui-fileupload__label[data-placeholder] {
    color: var(--ui-fg-faint);
  }

  .ui-fileupload:hover:not([data-disabled]) {
    border-color: var(--ui-border-strong);
  }
  .ui-fileupload[data-dragging] {
    border-color: var(--ui-accent-solid);
    background: var(--ui-accent-soft);
  }
  .ui-fileupload[data-invalid] {
    border-color: var(--ui-danger-solid);
  }
  .ui-fileupload[data-disabled] {
    opacity: 0.6;
    cursor: not-allowed;
    background: var(--ui-bg-muted);
  }
</style>
