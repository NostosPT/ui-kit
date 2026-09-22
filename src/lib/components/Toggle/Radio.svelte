<script>
  import { uid } from "../../internal/utils.js";

  /** Same hidden-native-input approach as Checkbox; only the mark differs. */
  let {
    group = $bindable(undefined),
    value = undefined,
    name = undefined,
    label = undefined,
    description = undefined,
    size = "md",
    disabled = false,
    invalid = false,
    id = undefined,
    class: klass = "",
    children,
    onchange,
    ...rest
  } = $props();

  const fallbackId = uid("radio");
  const inputId = $derived(id ?? fallbackId);
</script>

<div
  class="ui-radio {klass}"
  data-size={size}
  data-disabled={disabled || undefined}
  data-invalid={invalid || undefined}
>
  <input
    class="ui-radio__input"
    type="radio"
    id={inputId}
    {name}
    {value}
    {disabled}
    bind:group
    {onchange}
    {...rest}
  />
  <span class="ui-radio__dot" aria-hidden="true"></span>

  {#if label || description || children}
    <label class="ui-radio__text" for={inputId}>
      {#if label}<span class="ui-radio__label">{label}</span>{/if}
      {@render children?.()}
      {#if description}<span class="ui-radio__desc">{description}</span>{/if}
    </label>
  {/if}
</div>

<style>
  .ui-radio {
    display: inline-grid;
    grid-template-columns: auto 1fr;
    align-items: start;
    gap: var(--radio-gap);
    position: relative;
  }
  .ui-radio[data-size="sm"] { --radio-size: 16px; --radio-gap: var(--ui-space-4); --radio-fs: var(--ui-text-sm); }
  .ui-radio[data-size="md"] { --radio-size: 20px; --radio-gap: var(--ui-space-5); --radio-fs: var(--ui-text-md); }
  .ui-radio[data-size="lg"] { --radio-size: 22px; --radio-gap: var(--ui-space-5); --radio-fs: var(--ui-text-base); }

  .ui-radio__input {
    position: absolute;
    width: var(--radio-size);
    height: var(--radio-size);
    margin: 0;
    opacity: 0;
    cursor: pointer;
    z-index: 1;
  }
  .ui-radio__input:disabled { cursor: not-allowed; }

  .ui-radio__dot {
    display: grid;
    place-items: center;
    width: var(--radio-size);
    height: var(--radio-size);
    border: 1.5px solid var(--ui-border-strong);
    border-radius: var(--ui-radius-full);
    background: var(--ui-bg-surface);
    box-shadow: var(--ui-shadow-xs);
    margin-top: calc((1lh - var(--radio-size)) / 2);
    transition:
      border-color var(--ui-duration-fast) var(--ui-ease-out),
      background-color var(--ui-duration-fast) var(--ui-ease-out),
      box-shadow var(--ui-duration-fast) var(--ui-ease-out);
  }
  /* The mark is an inner dot that scales in — a filled circle with a white
     centre would shift by a pixel as the border width changes. */
  .ui-radio__dot::after {
    content: "";
    width: calc(var(--radio-size) * 0.4);
    height: calc(var(--radio-size) * 0.4);
    border-radius: var(--ui-radius-full);
    background: var(--ui-bg-surface);
    transform: scale(0);
    transition: transform var(--ui-duration-fast) var(--ui-ease-spring);
  }

  .ui-radio__input:hover:not(:disabled) + .ui-radio__dot {
    border-color: var(--ui-accent-solid);
  }
  .ui-radio__input:checked + .ui-radio__dot {
    background: var(--ui-accent-solid);
    border-color: var(--ui-accent-solid);
  }
  .ui-radio__input:checked + .ui-radio__dot::after {
    transform: scale(1);
  }
  .ui-radio__input:focus-visible + .ui-radio__dot {
    border-color: var(--ui-accent-solid);
    box-shadow: 0 0 0 var(--ui-ring-width) var(--ui-accent-ring);
  }
  .ui-radio[data-invalid] .ui-radio__dot { border-color: var(--ui-danger-solid); }
  .ui-radio__input:disabled + .ui-radio__dot {
    background: var(--ui-bg-muted);
    border-color: var(--ui-border-default);
    box-shadow: none;
  }
  .ui-radio__input:disabled:checked + .ui-radio__dot::after { background: var(--ui-fg-faint); }

  .ui-radio__text {
    display: flex;
    flex-direction: column;
    gap: var(--ui-space-1);
    cursor: pointer;
    min-width: 0;
  }
  .ui-radio[data-disabled] .ui-radio__text { cursor: not-allowed; opacity: 0.6; }
  .ui-radio__label {
    font-size: var(--radio-fs);
    line-height: var(--ui-leading-snug);
  }
  .ui-radio__desc {
    font-size: var(--ui-text-sm);
    line-height: var(--ui-leading-snug);
    color: var(--ui-fg-subtle);
  }
</style>
