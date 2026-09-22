<script>
  import Icon from "../Icon/Icon.svelte";
  import { uid } from "../../internal/utils.js";

  /**
   * A choice that is a whole row rather than a word next to a dot — the
   * payment-method and plan pickers in the reference.
   *
   * The entire card is the `<label>`, so the hit target is the card, not the
   * 20px control. The input itself is visually hidden but never `display:
   * none` — a hidden-that-way radio drops out of the tab order and out of the
   * form, which is the classic way this pattern breaks.
   *
   * `control` selects radio or checkbox semantics. They differ in more than
   * the glyph: a radio group is one tab stop with arrow keys between options,
   * a set of checkboxes is one tab stop each, and the browser gives us both
   * for free as long as the real inputs are present and share a `name`.
   */
  let {
    group = $bindable(undefined),
    checked = $bindable(false),
    value = undefined,
    name = undefined,
    control = "radio",
    icon = undefined,
    title = undefined,
    description = undefined,
    disabled = false,
    align = "center",
    class: klass = "",
    media,
    titleSlot,
    action,
    children,
    onchange,
    ...rest
  } = $props();

  const inputId = uid("option");
  const selected = $derived(control === "radio" ? group === value : checked);

  function onchangeInternal(event) {
    if (control === "radio") group = value;
    else checked = event.currentTarget.checked;
    onchange?.(control === "radio" ? value : event.currentTarget.checked);
  }
</script>

<label
  class="ui-option {klass}"
  for={inputId}
  data-selected={selected || undefined}
  data-disabled={disabled || undefined}
  data-align={align}
  {...rest}
>
  <input
    id={inputId}
    class="ui-option__input"
    type={control}
    {name}
    {value}
    {disabled}
    checked={selected}
    onchange={onchangeInternal}
  />

  <span class="ui-option__control" aria-hidden="true">
    {#if control === "checkbox"}<Icon name="check" size={13} strokeWidth={3.2} />{/if}
  </span>

  {#if media}
    <span class="ui-option__media">{@render media()}</span>
  {:else if icon}
    <span class="ui-option__media ui-option__media--icon"><Icon name={icon} size={18} /></span>
  {/if}

  <!-- Title first, description second, extras last. `titleSlot` exists
       because a title routinely carries a trailing glyph (a verified mark, a
       plan badge) and threading that through a string prop would mean the
       caller building markup out of `{@html}`. -->
  <span class="ui-option__text">
    {#if titleSlot}
      <span class="ui-option__title">{@render titleSlot()}</span>
    {:else if title}
      <span class="ui-option__title">{title}</span>
    {/if}
    {#if description}<span class="ui-option__desc">{description}</span>{/if}
    {@render children?.()}
  </span>

  {#if action}
    <!-- Not inside the label's activation area: a button here would toggle
         the radio on its way to firing its own handler. -->
    <span
      class="ui-option__action"
      onclick={(e) => e.preventDefault()}
      onkeydown={(e) => e.stopPropagation()}
      role="presentation"
    >
      {@render action()}
    </span>
  {/if}
</label>

<style>
  .ui-option {
    position: relative;
    display: flex;
    align-items: var(--option-align);
    gap: var(--ui-space-6);
    padding: var(--ui-space-7) var(--ui-space-8);
    border: 1px solid var(--ui-border-default);
    border-radius: var(--ui-radius-2xl);
    background: var(--ui-bg-surface);
    box-shadow: var(--ui-shadow-xs);
    cursor: pointer;
    min-width: 0;
    transition:
      border-color var(--ui-duration-fast) var(--ui-ease-out),
      background-color var(--ui-duration-fast) var(--ui-ease-out),
      box-shadow var(--ui-duration-fast) var(--ui-ease-out);
  }
  .ui-option[data-align="center"] { --option-align: center; }
  .ui-option[data-align="start"] { --option-align: flex-start; }

  .ui-option:hover:not([data-disabled]) {
    border-color: var(--ui-border-strong);
  }
  .ui-option[data-selected] {
    border-color: var(--ui-accent-solid);
    background: var(--ui-bg-selected);
  }
  .ui-option[data-disabled] {
    opacity: 0.55;
    cursor: not-allowed;
    box-shadow: none;
  }

  /* Present and focusable, just not painted. */
  .ui-option__input {
    position: absolute;
    width: 1px;
    height: 1px;
    margin: -1px;
    padding: 0;
    border: 0;
    clip-path: inset(50%);
    overflow: hidden;
    white-space: nowrap;
  }
  .ui-option__input:focus-visible ~ .ui-option__control {
    border-color: var(--ui-accent-solid);
    box-shadow: 0 0 0 var(--ui-ring-width) var(--ui-accent-ring);
  }

  .ui-option__control {
    display: grid;
    place-items: center;
    width: 20px;
    height: 20px;
    flex: none;
    border: 1.5px solid var(--ui-border-strong);
    background: var(--ui-bg-surface);
    color: transparent;
    transition:
      border-color var(--ui-duration-fast) var(--ui-ease-out),
      background-color var(--ui-duration-fast) var(--ui-ease-out),
      color var(--ui-duration-fast) var(--ui-ease-out);
  }
  .ui-option:has(.ui-option__input[type="radio"]) .ui-option__control {
    border-radius: var(--ui-radius-full);
  }
  .ui-option:has(.ui-option__input[type="checkbox"]) .ui-option__control {
    border-radius: 6px;
  }

  .ui-option[data-selected] .ui-option__control {
    border-color: var(--ui-accent-solid);
    background: var(--ui-accent-solid);
    color: oklch(from var(--ui-accent-solid) var(--ui-auto-fg-l) var(--ui-auto-fg-c) h);
  }
  /* The radio's dot is drawn as an inset ring rather than a child element, so
     the markup stays the same for both control types. */
  .ui-option[data-selected]:has(.ui-option__input[type="radio"]) .ui-option__control {
    box-shadow: inset 0 0 0 4px var(--ui-bg-surface);
    background: var(--ui-accent-solid);
  }

  .ui-option__media {
    display: grid;
    place-items: center;
    flex: none;
    color: var(--ui-fg-muted);
  }
  .ui-option__media--icon {
    width: var(--ui-control-h-sm);
    height: var(--ui-control-h-sm);
    border-radius: var(--ui-control-radius-sm);
    background: var(--ui-bg-muted);
  }

  .ui-option__text {
    display: flex;
    flex-direction: column;
    gap: 2px;
    flex: 1;
    min-width: 0;
  }
  .ui-option__title {
    display: inline-flex;
    align-items: center;
    gap: var(--ui-space-3);
    font-size: var(--ui-text-md);
    font-weight: var(--ui-label-weight);
    letter-spacing: var(--ui-tracking-snug);
    color: var(--ui-fg-default);
  }
  .ui-option__desc {
    font-size: var(--ui-text-sm);
    line-height: var(--ui-leading-snug);
    color: var(--ui-fg-subtle);
  }

  .ui-option__action {
    flex: none;
    cursor: auto;
  }
</style>
