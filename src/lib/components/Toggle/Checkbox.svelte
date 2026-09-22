<script>
  import Icon from "../Icon/Icon.svelte";
  import { uid } from "../../internal/utils.js";

  /**
   * The native input stays in the DOM, visually hidden but focusable, and the
   * painted box is a sibling. That keeps form submission, label clicks, the
   * indeterminate flag and assistive tech behaviour entirely native — the CSS
   * only ever reacts to `:checked`, `:focus-visible` and `:disabled`.
   */
  let {
    checked = $bindable(false),
    indeterminate = false,
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

  const fallbackId = uid("cb");
  const inputId = $derived(id ?? fallbackId);
  let el = $state(null);

  // `indeterminate` has no HTML attribute — it only exists as a DOM property.
  $effect(() => {
    if (el) el.indeterminate = indeterminate && !checked;
  });
</script>

<div
  class="ui-check {klass}"
  data-size={size}
  data-disabled={disabled || undefined}
  data-invalid={invalid || undefined}
>
  <input
    bind:this={el}
    class="ui-check__input"
    type="checkbox"
    id={inputId}
    {name}
    {value}
    {disabled}
    bind:checked
    aria-invalid={invalid || undefined}
    {onchange}
    {...rest}
  />
  <span class="ui-check__box" aria-hidden="true">
    <Icon name={indeterminate && !checked ? "minus" : "check"} size={size === "sm" ? 10 : 12} strokeWidth={3} />
  </span>

  {#if label || description || children}
    <label class="ui-check__text" for={inputId}>
      {#if label}<span class="ui-check__label">{label}</span>{/if}
      {@render children?.()}
      {#if description}<span class="ui-check__desc">{description}</span>{/if}
    </label>
  {/if}
</div>

<style>
  .ui-check {
    display: inline-grid;
    grid-template-columns: auto 1fr;
    align-items: start;
    gap: var(--check-gap);
    position: relative;
  }
  .ui-check[data-size="sm"] { --check-size: 16px; --check-gap: var(--ui-space-4); --check-fs: var(--ui-text-sm); }
  .ui-check[data-size="md"] { --check-size: 20px; --check-gap: var(--ui-space-5); --check-fs: var(--ui-text-md); }
  .ui-check[data-size="lg"] { --check-size: 22px; --check-gap: var(--ui-space-5); --check-fs: var(--ui-text-base); }

  .ui-check__input {
    position: absolute;
    width: var(--check-size);
    height: var(--check-size);
    margin: 0;
    opacity: 0;
    cursor: pointer;
    z-index: 1;
  }
  .ui-check__input:disabled {
    cursor: not-allowed;
  }

  .ui-check__box {
    display: grid;
    place-items: center;
    width: var(--check-size);
    height: var(--check-size);
    border: 1.5px solid var(--ui-border-default);
    border-radius: 5px;
    background: var(--ui-bg-surface);
    color: transparent;
    box-shadow: var(--ui-shadow-xs);
    transition:
      background-color var(--ui-duration-fast) var(--ui-ease-out),
      border-color var(--ui-duration-fast) var(--ui-ease-out),
      color var(--ui-duration-fast) var(--ui-ease-out),
      box-shadow var(--ui-duration-fast) var(--ui-ease-out);
    /* Optical alignment with the first line of the label text. */
    margin-top: calc((1lh - var(--check-size)) / 2);
  }

  .ui-check__input:hover:not(:disabled) + .ui-check__box {
    border-color: var(--ui-accent-solid);
  }
  .ui-check__input:checked + .ui-check__box,
  .ui-check__input:indeterminate + .ui-check__box {
    background: var(--ui-accent-solid);
    border-color: var(--ui-accent-solid);
    color: #ffffff;
  }
  .ui-check__input:focus-visible + .ui-check__box {
    border-color: var(--ui-accent-solid);
    box-shadow: 0 0 0 var(--ui-ring-width) var(--ui-accent-ring);
  }
  .ui-check[data-invalid] .ui-check__box {
    border-color: var(--ui-danger-solid);
  }
  .ui-check__input:disabled + .ui-check__box {
    background: var(--ui-bg-muted);
    border-color: var(--ui-border-default);
    box-shadow: none;
  }
  .ui-check__input:disabled:checked + .ui-check__box {
    color: var(--ui-fg-faint);
  }

  .ui-check__text {
    display: flex;
    flex-direction: column;
    gap: var(--ui-space-1);
    cursor: pointer;
    min-width: 0;
  }
  .ui-check[data-disabled] .ui-check__text {
    cursor: not-allowed;
    opacity: 0.6;
  }
  .ui-check__label {
    font-size: var(--check-fs);
    font-weight: var(--ui-weight-medium);
    line-height: var(--ui-leading-snug);
    color: var(--ui-fg-default);
  }
  .ui-check__desc {
    font-size: var(--ui-text-sm);
    line-height: var(--ui-leading-snug);
    color: var(--ui-fg-subtle);
  }
</style>
