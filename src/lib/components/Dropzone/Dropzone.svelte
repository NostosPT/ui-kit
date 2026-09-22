<script>
  import Icon from "../Icon/Icon.svelte";
  import Button from "../Button/Button.svelte";
  import { uid } from "../../internal/utils.js";

  /**
   * File drop target. Two shapes for the two jobs the reference design gives
   * it: a tall `zone` for "Add image / or drag and drop", and a control-height
   * `inline` row for "Drop file(s) here… [Browse]".
   *
   * Drag state is tracked with a counter rather than a boolean. dragenter and
   * dragleave both fire when the pointer crosses a *child* element, so a
   * boolean flickers off the moment the cursor passes over the icon.
   */
  let {
    variant = "zone",
    accept = undefined,
    multiple = true,
    disabled = false,
    title = "Add image",
    hint = "or drag and drop",
    icon = "image",
    browseLabel = "Browse",
    placeholder = "Drop file(s) here…",
    invalid = false,
    id = undefined,
    class: klass = "",
    children,
    onfiles,
    ...rest
  } = $props();

  const fallbackId = uid("drop");
  const inputId = $derived(id ?? fallbackId);
  let depth = $state(0);
  let inputEl = $state(null);

  const dragging = $derived(depth > 0);

  function emit(list) {
    const files = Array.from(list ?? []);
    if (files.length) onfiles?.(multiple ? files : files.slice(0, 1));
  }

  function ondrop(event) {
    event.preventDefault();
    depth = 0;
    if (disabled) return;
    emit(event.dataTransfer?.files);
  }

  function ondragover(event) {
    // Without this the browser navigates to the dropped file.
    event.preventDefault();
    if (event.dataTransfer) event.dataTransfer.dropEffect = "copy";
  }
</script>

<div
  class="ui-dropzone {klass}"
  data-variant={variant}
  data-dragging={dragging || undefined}
  data-disabled={disabled || undefined}
  data-invalid={invalid || undefined}
  {ondrop}
  {ondragover}
  ondragenter={() => !disabled && (depth += 1)}
  ondragleave={() => (depth = Math.max(0, depth - 1))}
  {...rest}
>
  <input
    bind:this={inputEl}
    class="ui-sr-only"
    type="file"
    id={inputId}
    {accept}
    {multiple}
    {disabled}
    onchange={(e) => {
      emit(e.currentTarget.files);
      e.currentTarget.value = ""; // allow re-picking the same file
    }}
  />

  {#if children}
    {@render children({ browse: () => inputEl?.click(), dragging })}
  {:else if variant === "zone"}
    <label class="ui-dropzone__zone" for={inputId}>
      <span class="ui-dropzone__icon"><Icon name={icon} size={20} /></span>
      <span class="ui-dropzone__title">{title}</span>
      <span class="ui-dropzone__hint">{hint}</span>
    </label>
  {:else}
    <div class="ui-dropzone__inline">
      <Icon name="file" size={16} />
      <span class="ui-dropzone__placeholder">{placeholder}</span>
      <Button
        size="sm"
        variant="outline"
        {disabled}
        onclick={() => inputEl?.click()}
      >
        {browseLabel}
      </Button>
    </div>
  {/if}
</div>

<style>
  .ui-dropzone {
    position: relative;
    border-radius: var(--ui-radius-2xl);
    transition:
      border-color var(--ui-duration-fast) var(--ui-ease-out),
      background-color var(--ui-duration-fast) var(--ui-ease-out);
  }
  .ui-dropzone[data-disabled] {
    opacity: 0.6;
    pointer-events: none;
  }

  /* --- zone -------------------------------------------------------------- */
  .ui-dropzone[data-variant="zone"] {
    border: 1.5px dashed var(--ui-border-strong);
    background: var(--ui-bg-sunken);
  }
  .ui-dropzone__zone {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: var(--ui-space-2);
    min-height: 132px;
    padding: var(--ui-space-10) var(--ui-space-8);
    cursor: pointer;
    text-align: center;
  }
  .ui-dropzone__icon {
    display: grid;
    place-items: center;
    width: var(--ui-control-h-md);
    height: var(--ui-control-h-md);
    margin-bottom: var(--ui-space-2);
    border-radius: var(--ui-control-radius-md);
    background: var(--ui-bg-surface);
    border: 1px solid var(--ui-border-default);
    box-shadow: var(--ui-shadow-xs);
    color: var(--ui-fg-muted);
  }
  .ui-dropzone__title {
    font-size: var(--ui-text-md);
    font-weight: var(--ui-label-weight);
    color: var(--ui-fg-default);
  }
  .ui-dropzone__hint {
    font-size: var(--ui-text-sm);
    color: var(--ui-fg-subtle);
  }

  /* --- inline ------------------------------------------------------------ */
  .ui-dropzone[data-variant="inline"] {
    border: 1px solid var(--ui-border-default);
    background: var(--ui-bg-surface);
    box-shadow: var(--ui-shadow-xs);
    border-radius: var(--ui-radius-md);
  }
  .ui-dropzone__inline {
    display: flex;
    align-items: center;
    gap: var(--ui-space-4);
    height: var(--ui-control-h-md);
    padding-inline: var(--ui-space-5) var(--ui-space-2);
    color: var(--ui-fg-subtle);
  }
  .ui-dropzone__placeholder {
    flex: 1;
    min-width: 0;
    font-size: var(--ui-text-md);
    color: var(--ui-fg-faint);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  /* --- states ------------------------------------------------------------ */
  .ui-dropzone:hover:not([data-disabled]) {
    border-color: var(--ui-accent-solid);
  }
  .ui-dropzone[data-dragging] {
    border-color: var(--ui-accent-solid);
    background: var(--ui-accent-soft);
  }
  .ui-dropzone[data-dragging] .ui-dropzone__icon {
    border-color: var(--ui-accent-border);
    color: var(--ui-accent-text);
  }
  .ui-dropzone[data-invalid] {
    border-color: var(--ui-danger-solid);
  }
  .ui-dropzone:has(:focus-visible) {
    border-color: var(--ui-accent-solid);
    box-shadow: 0 0 0 var(--ui-ring-width) var(--ui-accent-ring);
  }
</style>
